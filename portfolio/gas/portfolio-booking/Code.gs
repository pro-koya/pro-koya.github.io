/**
 * portfolio-booking — Google カレンダーベースの予約 Web アプリ
 *
 * GET  ?action=slots  -> 空き枠を JSON で返す（営業時間 × 枠長 から予定とかぶる枠を除外）
 * GET  ?action=config -> 公開してよい設定（方式ラベル・枠長など）を返す
 * POST {json}         -> 枠をロックして二重予約を防ぎつつ、カレンダーに予定を書き込み、招待＋確認メール送信
 *
 * フロントは静的サイト（Next.js export）。CORS で読めるように:
 *  - GET は通常のクエリ取得
 *  - POST は Content-Type: text/plain で送ってもらい e.postData.contents を JSON.parse する
 *    （application/json だと preflight が走り GAS が弾くため）
 *
 * Meet リンクの自動生成には「Calendar」拡張サービス（advanced service）が必要。
 * appsscript.json の enabledAdvancedServices を参照。
 */

const BOOKING_CONFIG = {
  // 空き判定の元にするカレンダー（ここの予定と重なる枠は出さない）
  availabilityCalendarIds: ["primary"],
  // 予約を書き込むカレンダー
  writeCalendarId: "primary",

  timeZone: "Asia/Tokyo",

  // 受付時間（毎日 07:00〜20:00 / 枠 60 分 / 1 時間刻み）
  openHour: 7,        // 最初の枠の開始時刻
  closeHour: 20,      // 最後の枠の終了時刻（= 19:00 開始が最後）
  slotMinutes: 60,    // 1 枠の長さ
  slotStepMinutes: 60,// 枠の開始間隔
  weekdays: [0, 1, 2, 3, 4, 5, 6], // 0=日 ... 6=土（毎日受付）

  minLeadHours: 12,   // 「今から minLeadHours 後」以降のみ予約可
  // 提示する範囲は「翌月末日まで」（例: 5月なら6月末、6月なら7月末）。horizonEnd_() を参照

  // 会話方式
  methods: {
    meet: { label: "Google Meet" }, // 予約確定時に Meet リンクを自動生成
    // Zoom は無効化中（無料Basicは40分上限のため Meet+対面のみ運用）。
    // 再開する場合: 下の zoom を methods に戻し、フロントの METHODS にも 'zoom' を追加する。
    // Zoom API 連携コード（createZoomMeeting_ 等）と Script Properties はそのまま残してある。
    // zoom: {
    //   label: "Zoom",
    //   url: "https://zoom.us/j/REPLACE_WITH_YOUR_ZOOM_ROOM", // API未設定時のフォールバック
    // },
    inperson: {
      label: "対面",
      location: "大阪近辺（確定後に詳細をご連絡します）",
    },
  },

  notifyTo: "koyablog.1104@gmail.com",
  serviceName: "Miyabayashi Koya",
  replySignature: "koya",

  // 予約履歴の記録先（contact と同じスプレッドシートの別シート）
  spreadsheetId: "19lo6oGAP8qwBXxLchIYx6m9rC4lGhVq5l3KeNvMDiVo",
  sheetName: "bookings",
};

const MINUTE_MS = 60 * 1000;

/* ── Entry points ─────────────────────────────── */

function doGet(e) {
  const action = getParam_(e, "action");
  try {
    if (action === "slots") {
      return buildJson_({ status: "success", slots: buildAvailableDays_() });
    }
    if (action === "config") {
      return buildJson_({ status: "success", config: publicConfig_() });
    }
    return buildJson_({ status: "success", message: "portfolio-booking ok" });
  } catch (error) {
    console.error(error);
    return buildJson_({ status: "error", message: errorMessage_(error) });
  }
}

function doPost(e) {
  try {
    const payload = parsePostBody_(e);
    validateBookingPayload_(payload);
    const booking = createBooking_(payload);
    return buildJson_({ status: "success", booking: booking });
  } catch (error) {
    console.error(error);
    return buildJson_({ status: "error", message: errorMessage_(error) });
  }
}

/* ── Public config ────────────────────────────── */

function publicConfig_() {
  const methods = Object.keys(BOOKING_CONFIG.methods).map(function (key) {
    return { key: key, label: BOOKING_CONFIG.methods[key].label };
  });
  return {
    slotMinutes: BOOKING_CONFIG.slotMinutes,
    timeZone: BOOKING_CONFIG.timeZone,
    methods: methods,
  };
}

/* ── Availability ─────────────────────────────── */

/** 提示範囲の排他的上限 = 翌々月1日0時（=翌月末日まで含む） */
function horizonEnd_() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 2, 1, 0, 0, 0);
}

function buildAvailableDays_() {
  const tz = BOOKING_CONFIG.timeZone;
  const now = new Date();
  const earliest = now.getTime() + BOOKING_CONFIG.minLeadHours * 60 * MINUTE_MS;

  const windowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const windowEnd = horizonEnd_(); // 翌月末日まで
  const busy = getBusyIntervals_(windowStart, windowEnd);

  const days = [];
  for (
    let day = new Date(windowStart.getTime());
    day.getTime() < windowEnd.getTime();
    day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
  ) {
    if (BOOKING_CONFIG.weekdays.indexOf(day.getDay()) === -1) continue;

    // 営業時間内の全枠を返し、各枠に available フラグを付ける（埋まり枠はフロントでグレー表示）
    const slots = [];
    let availableCount = 0;
    const open = BOOKING_CONFIG.openHour * 60;
    const close = BOOKING_CONFIG.closeHour * 60;
    for (let minutes = open; minutes + BOOKING_CONFIG.slotMinutes <= close; minutes += BOOKING_CONFIG.slotStepMinutes) {
      const hh = Math.floor(minutes / 60);
      const mm = minutes % 60;
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hh, mm, 0).getTime();
      const end = start + BOOKING_CONFIG.slotMinutes * MINUTE_MS;
      const available = start >= earliest && !overlapsBusy_(start, end, busy);
      if (available) availableCount++;
      slots.push({ start: start, label: pad2_(hh) + ":" + pad2_(mm), available: available });
    }

    // 空きが1枠も無い日は出さない（週カレンダー側で「予約不可日」として淡色表示）
    if (availableCount === 0) continue;
    days.push({
      date: Utilities.formatDate(day, tz, "yyyy-MM-dd"),
      label: Utilities.formatDate(day, tz, "M/d"),
      weekday: WEEKDAYS_JP[day.getDay()],
      slots: slots,
    });
  }
  return days;
}

const WEEKDAYS_JP = ["日", "月", "火", "水", "木", "金", "土"];

function getBusyIntervals_(start, end) {
  const items = BOOKING_CONFIG.availabilityCalendarIds.map(function (id) {
    return { id: id };
  });
  const resp = Calendar.Freebusy.query({
    timeMin: toIso_(start),
    timeMax: toIso_(end),
    timeZone: BOOKING_CONFIG.timeZone,
    items: items,
  });

  const busy = [];
  const calendars = resp.calendars || {};
  Object.keys(calendars).forEach(function (id) {
    (calendars[id].busy || []).forEach(function (b) {
      busy.push({
        start: new Date(b.start).getTime(),
        end: new Date(b.end).getTime(),
      });
    });
  });
  return busy;
}

function overlapsBusy_(start, end, busy) {
  for (let i = 0; i < busy.length; i++) {
    if (start < busy[i].end && end > busy[i].start) return true;
  }
  return false;
}

/* ── Booking ──────────────────────────────────── */

function createBooking_(payload) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (lockError) {
    // 20秒待ってもロックを取得できない＝同時アクセスが集中している。
    // 枠を確保せず安全に弾き、わかりやすいメッセージで再試行を促す。
    throw new Error("ただいまアクセスが混み合っています。少し時間をおいて、もう一度お試しください。");
  }
  try {
    const start = Number(payload.start);
    const end = start + BOOKING_CONFIG.slotMinutes * MINUTE_MS;

    assertSlotBookable_(start);

    // 直前の他予約とかぶっていないか最終確認（二重予約防止）
    const busy = getBusyIntervals_(new Date(start - MINUTE_MS), new Date(end + MINUTE_MS));
    if (overlapsBusy_(start, end, busy)) {
      throw new Error("選択した時間は埋まってしまいました。別の枠をお選びください。");
    }

    const method = BOOKING_CONFIG.methods[payload.method];

    // Zoom は予約ごとにミーティングを自動発行（認証情報が設定されている場合）
    let zoomMeeting = null;
    if (payload.method === "zoom" && zoomEnabled_()) {
      zoomMeeting = createZoomMeeting_(payload, start, end);
    }

    // カレンダーへの登録が「予約確定（＝枠の確保）」の確定点。
    // ここが成功した時点で、お客様への Google カレンダー招待も送信済み（sendUpdates:"all"）。
    const created = insertCalendarEvent_(payload, start, end, method, zoomMeeting);
    const joinInfo = joinInfoFor_(payload.method, method, created, zoomMeeting);
    const startedAt = new Date(start);

    // 以降のスプレッドシート記録・確認メールは補助処理。
    // ここで失敗しても確定済みの予約は取り消さない（取り消すと枠だけ空いて二重予約の温床になる）。
    // 失敗はログと管理者通知に残し、お客様には成功として返す。
    safeStep_("予約のスプレッドシート記録", function () {
      recordBooking_(payload, startedAt, joinInfo);
    });
    safeStep_("確認メール送信", function () {
      sendBookingEmails_(payload, method, startedAt, end, joinInfo, created);
    });

    return {
      start: start,
      end: end,
      method: payload.method,
      methodLabel: method.label,
      dateLabel: formatDateLabel_(startedAt),
      joinInfo: joinInfo,
    };
  } finally {
    lock.releaseLock();
  }
}

function insertCalendarEvent_(payload, start, end, method, zoomMeeting) {
  const tz = BOOKING_CONFIG.timeZone;
  const event = {
    summary: "相談（" + method.label + "）— " + payload.name,
    description: buildEventDescription_(payload, method, zoomMeeting),
    start: { dateTime: toIso_(new Date(start)), timeZone: tz },
    end: { dateTime: toIso_(new Date(end)), timeZone: tz },
    attendees: [{ email: payload.email, displayName: payload.name }],
    reminders: { useDefault: true },
  };

  const options = { sendUpdates: "all" };

  if (payload.method === "meet") {
    event.conferenceData = {
      createRequest: {
        requestId: Utilities.getUuid(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    };
    options.conferenceDataVersion = 1;
  } else if (payload.method === "zoom") {
    event.location = zoomMeeting ? zoomMeeting.joinUrl : method.url;
  } else if (payload.method === "inperson") {
    event.location = method.location;
  }

  return Calendar.Events.insert(event, BOOKING_CONFIG.writeCalendarId, options);
}

function joinInfoFor_(methodKey, method, createdEvent, zoomMeeting) {
  if (methodKey === "meet") {
    const link = createdEvent.hangoutLink ||
      (createdEvent.conferenceData &&
        createdEvent.conferenceData.entryPoints &&
        createdEvent.conferenceData.entryPoints[0] &&
        createdEvent.conferenceData.entryPoints[0].uri);
    return link || "Google Meet（カレンダー招待内のリンクをご確認ください）";
  }
  if (methodKey === "zoom") {
    if (zoomMeeting) {
      return zoomMeeting.password
        ? zoomMeeting.joinUrl + "（パスコード: " + zoomMeeting.password + "）"
        : zoomMeeting.joinUrl;
    }
    return method.url;
  }
  if (methodKey === "inperson") return method.location;
  return "";
}

function buildEventDescription_(payload, method, zoomMeeting) {
  const lines = [
    "ポートフォリオサイトの予約フォームから届いた予約です。",
    "",
    "お名前: " + payload.name,
    "メール: " + payload.email,
    "方式: " + method.label,
  ];
  if (zoomMeeting) {
    lines.push("Zoom: " + zoomMeeting.joinUrl);
    if (zoomMeeting.password) lines.push("パスコード: " + zoomMeeting.password);
  }
  if (payload.message) {
    lines.push("", "相談内容:", payload.message);
  }
  return lines.join("\n");
}

/* ── Zoom (Server-to-Server OAuth) ────────────── */
//
// 予約ごとに Zoom ミーティングを自動発行する。
// 認証情報は Code.gs に直書きせず、Script Properties に保存する：
//   ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET （必須）
//   ZOOM_USER_ID （任意。未設定なら "me" = トークン所有者）
// 設定: エディタ左「プロジェクトの設定」→「スクリプト プロパティ」で追加。
// 3つが揃っていない場合は固定URL（methods.zoom.url）にフォールバックする。

function getZoomConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    accountId: props.getProperty("ZOOM_ACCOUNT_ID"),
    clientId: props.getProperty("ZOOM_CLIENT_ID"),
    clientSecret: props.getProperty("ZOOM_CLIENT_SECRET"),
    userId: props.getProperty("ZOOM_USER_ID") || "me",
  };
}

function zoomEnabled_() {
  const c = getZoomConfig_();
  return Boolean(c.accountId && c.clientId && c.clientSecret);
}

function getZoomAccessToken_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get("zoom_access_token");
  if (cached) return cached;

  const c = getZoomConfig_();
  const basic = Utilities.base64Encode(c.clientId + ":" + c.clientSecret);
  const url = "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" +
    encodeURIComponent(c.accountId);

  const res = UrlFetchApp.fetch(url, {
    method: "post",
    headers: { Authorization: "Basic " + basic },
    muteHttpExceptions: true,
  });

  const code = res.getResponseCode();
  const body = parseJsonSafe_(res.getContentText());
  if (code !== 200 || !body.access_token) {
    throw new Error("Zoom 認証に失敗しました。時間をおいてお試しください。");
  }

  // トークンは約1時間有効。安全側に倒して 50 分キャッシュ。
  cache.put("zoom_access_token", body.access_token, 3000);
  return body.access_token;
}

function createZoomMeeting_(payload, start, end) {
  const token = getZoomAccessToken_();
  const c = getZoomConfig_();
  const tz = BOOKING_CONFIG.timeZone;
  const durationMin = Math.round((end - start) / MINUTE_MS);

  const requestBody = {
    topic: "相談（Zoom）— " + payload.name,
    type: 2, // scheduled meeting
    start_time: Utilities.formatDate(new Date(start), tz, "yyyy-MM-dd'T'HH:mm:ss"),
    duration: durationMin,
    timezone: tz,
    settings: {
      waiting_room: true,        // 待機室ON（過去参加者の勝手な入室・鉢合わせを防ぐ）
      join_before_host: false,   // ホスト不在時の参加を不可に
      approval_type: 2,
      meeting_authentication: false,
    },
  };

  const res = UrlFetchApp.fetch(
    "https://api.zoom.us/v2/users/" + encodeURIComponent(c.userId) + "/meetings",
    {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + token },
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true,
    },
  );

  const code = res.getResponseCode();
  const body = parseJsonSafe_(res.getContentText());
  if (code !== 201 || !body.join_url) {
    throw new Error("Zoom ミーティングの作成に失敗しました。別の方法をお選びいただくか、時間をおいてお試しください。");
  }

  return {
    joinUrl: body.join_url,
    password: body.password || "",
    meetingId: body.id || "",
  };
}

function parseJsonSafe_(text) {
  try {
    return JSON.parse(text || "{}");
  } catch (e) {
    return {};
  }
}

/* ── Persistence ──────────────────────────────── */

function recordBooking_(payload, startDate, joinInfo) {
  const sheet = getOrCreateSheet_();
  ensureHeaderRow_(sheet);
  sheet.appendRow([
    new Date(),
    payload.requestId || "",
    payload.name,
    payload.email,
    BOOKING_CONFIG.methods[payload.method].label,
    Utilities.formatDate(startDate, BOOKING_CONFIG.timeZone, "yyyy-MM-dd HH:mm"),
    joinInfo,
    payload.message || "",
  ]);
}

function getOrCreateSheet_() {
  if (!BOOKING_CONFIG.spreadsheetId) {
    throw new Error("GASの設定で spreadsheetId を指定してください。");
  }
  const spreadsheet = SpreadsheetApp.openById(BOOKING_CONFIG.spreadsheetId);
  let sheet = spreadsheet.getSheetByName(BOOKING_CONFIG.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(BOOKING_CONFIG.sheetName);
  return sheet;
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "booked_at", "request_id", "name", "email", "method", "start", "join_info", "message",
  ]);
  sheet.setFrozenRows(1);
}

/* ── Email ────────────────────────────────────── */

function sendBookingEmails_(payload, method, startDate, end, joinInfo, createdEvent) {
  const when = Utilities.formatDate(startDate, BOOKING_CONFIG.timeZone, "yyyy年M月d日(E) HH:mm");
  const endLabel = Utilities.formatDate(new Date(end), BOOKING_CONFIG.timeZone, "HH:mm");
  const span = when + "〜" + endLabel;

  const notifyBody = [
    "新しい予約が入りました。",
    "",
    "お名前: " + payload.name,
    "メール: " + payload.email,
    "方式: " + method.label,
    "日時: " + span,
    "参加情報: " + joinInfo,
    "",
    "相談内容:",
    payload.message || "（未入力）",
  ].join("\n");

  MailApp.sendEmail({
    to: BOOKING_CONFIG.notifyTo,
    subject: "[Portfolio予約] " + payload.name + " さん / " + when,
    body: notifyBody,
    name: BOOKING_CONFIG.serviceName,
    replyTo: payload.email,
  });

  const guestBody = [
    payload.name + " 様",
    "",
    "ご予約ありがとうございます。下記の日程で受け付けました。",
    "Google カレンダーの招待もお送りしています（承諾しておいていただけると安心です）。",
    "",
    "日時: " + span + "（" + BOOKING_CONFIG.timeZone + "）",
    "方式: " + method.label,
    "参加情報: " + joinInfo,
    "",
    "日程の変更・キャンセルが必要になった場合は、このメールにご返信ください。",
    "",
    BOOKING_CONFIG.replySignature,
  ].join("\n");

  MailApp.sendEmail({
    to: payload.email,
    subject: "ご予約を受け付けました | " + BOOKING_CONFIG.serviceName,
    body: guestBody,
    name: BOOKING_CONFIG.serviceName,
    replyTo: BOOKING_CONFIG.notifyTo,
  });
}

/* ── Validation ───────────────────────────────── */

function validateBookingPayload_(payload) {
  if (payload.website) {
    throw new Error("送信に失敗しました。");
  }
  if (payload.startedAt) {
    const startedAt = new Date(payload.startedAt).getTime();
    if (!Number.isNaN(startedAt) && Date.now() - startedAt < 1500) {
      throw new Error("送信に失敗しました。");
    }
  }

  if (!payload.name || payload.name.length > 120) {
    throw new Error("お名前を確認してください。");
  }
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 160) {
    throw new Error("メールアドレスを確認してください。");
  }
  if (!BOOKING_CONFIG.methods[payload.method]) {
    throw new Error("会話の方式を選択してください。");
  }
  if (payload.message && payload.message.length > 5000) {
    throw new Error("相談内容が長すぎます。");
  }
  const start = Number(payload.start);
  if (!start || Number.isNaN(start)) {
    throw new Error("予約する時間を選択してください。");
  }
}

function assertSlotBookable_(start) {
  const now = Date.now();
  const earliest = now + BOOKING_CONFIG.minLeadHours * 60 * MINUTE_MS;
  if (start < earliest) {
    throw new Error("直前すぎる時間は予約できません。別の枠をお選びください。");
  }
  if (start >= horizonEnd_().getTime()) {
    throw new Error("予約できる期間（翌月末まで）を過ぎています。別の枠をお選びください。");
  }

  const slot = new Date(start);
  if (BOOKING_CONFIG.weekdays.indexOf(slot.getDay()) === -1) {
    throw new Error("選択できない曜日です。");
  }

  const minutes = slot.getHours() * 60 + slot.getMinutes();
  const open = BOOKING_CONFIG.openHour * 60;
  const close = BOOKING_CONFIG.closeHour * 60;
  if (minutes < open || minutes + BOOKING_CONFIG.slotMinutes > close) {
    throw new Error("受付時間外の時間です。別の枠をお選びください。");
  }
  if ((minutes - open) % BOOKING_CONFIG.slotStepMinutes !== 0) {
    throw new Error("正しくない時間が選択されました。別の枠をお選びください。");
  }
}

/* ── Helpers ──────────────────────────────────── */

function parsePostBody_(e) {
  let raw = {};
  if (e && e.postData && e.postData.contents) {
    try {
      raw = JSON.parse(e.postData.contents);
    } catch (err) {
      throw new Error("送信データを読み取れませんでした。");
    }
  } else if (e && e.parameter) {
    raw = e.parameter;
  }
  return {
    name: normalize_(raw.name),
    email: normalize_(raw.email),
    method: normalize_(raw.method),
    start: normalize_(raw.start),
    message: normalize_(raw.message),
    website: normalize_(raw.website),
    startedAt: normalize_(raw.startedAt),
    requestId: normalize_(raw.requestId),
  };
}

function buildJson_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function toIso_(date) {
  return Utilities.formatDate(date, BOOKING_CONFIG.timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

function formatDateLabel_(date) {
  const tz = BOOKING_CONFIG.timeZone;
  return Utilities.formatDate(date, tz, "yyyy年M月d日") +
    "(" + WEEKDAYS_JP[date.getDay()] + ") " +
    Utilities.formatDate(date, tz, "HH:mm");
}

function getParam_(e, key) {
  return e && e.parameter && typeof e.parameter[key] !== "undefined" ? e.parameter[key] : "";
}

function normalize_(value) {
  return String(value === undefined || value === null ? "" : value).trim();
}

function pad2_(n) {
  return n < 10 ? "0" + n : "" + n;
}

function errorMessage_(error) {
  return error && error.message ? error.message : "処理に失敗しました。";
}

/**
 * 予約確定後の補助処理（記録・メール）を安全に実行する。
 * カレンダー登録で枠は既に確保済みのため、ここでの失敗は予約を無効化しない。
 * 失敗はログに残し、管理者にも通知する（通知自体の失敗は飲み込んでログのみ）。
 */
function safeStep_(label, fn) {
  try {
    fn();
  } catch (error) {
    console.error("[booking] " + label + " に失敗しました: " + errorMessage_(error));
    notifyAdminFailureQuietly_(label, error);
  }
}

/** 後処理エラーを管理者にだけ通知する。MailApp 不調時は通知も諦めてログのみ残す。 */
function notifyAdminFailureQuietly_(label, error) {
  try {
    MailApp.sendEmail({
      to: BOOKING_CONFIG.notifyTo,
      subject: "[Portfolio予約] 後処理エラー: " + label,
      body: [
        "予約自体は成立していますが、後続の「" + label + "」に失敗しました。",
        "",
        "エラー: " + errorMessage_(error),
        "",
        "Google カレンダー（および予約シート）をご確認のうえ、",
        "必要なら手動でフォロー（確認メールの再送など）をお願いします。",
      ].join("\n"),
      name: BOOKING_CONFIG.serviceName,
    });
  } catch (notifyError) {
    console.error("[booking] 管理者への後処理エラー通知も失敗: " + errorMessage_(notifyError));
  }
}
