const PORTFOLIO_CONTACT_CONFIG = {
  spreadsheetId: "19lo6oGAP8qwBXxLchIYx6m9rC4lGhVq5l3KeNvMDiVo",
  sheetName: "contacts",
  notifyTo: "koyablog.1104@gmail.com",
  serviceName: "Miyabayashi Koya",
  replySignature: "koya",
  autoReplyEnabled: true,
};

function doGet() {
  return ContentService.createTextOutput("portfolio-contact ok");
}

function doPost(e) {
  const requestId = getParam_(e, "requestId") || Utilities.getUuid();
  const returnOrigin = normalize_(getParam_(e, "returnOrigin")) || "*";

  try {
    const payload = normalizePayload_(e);
    validatePayload_(payload);

    const sheet = getOrCreateSheet_();
    const submittedAt = new Date();
    const rowIndex = appendRow_(sheet, payload, submittedAt, "pending");
    let autoReplySent = false;

    try {
      autoReplySent = sendEmails_(payload, submittedAt);
      updateAutoReplyStatus_(sheet, rowIndex, autoReplySent ? "sent" : "disabled");
    } catch (emailError) {
      updateAutoReplyStatus_(sheet, rowIndex, "failed");
      throw emailError;
    }

    return buildIframeResponse_({
      source: "portfolio-contact",
      requestId: requestId,
      status: "success",
      message: autoReplySent
        ? "送信ありがとうございました。内容を受け付け、自動返信メールもお送りしました。"
        : "送信ありがとうございました。内容を受け付けました。",
    }, returnOrigin);
  } catch (error) {
    console.error(error);
    return buildIframeResponse_({
      source: "portfolio-contact",
      requestId: requestId,
      status: "error",
      message: error && error.message ? error.message : "送信に失敗しました。",
    }, returnOrigin);
  }
}

function normalizePayload_(e) {
  const payload = {
    name: normalize_(getParam_(e, "name")),
    email: normalize_(getParam_(e, "email")),
    company: normalize_(getParam_(e, "company")),
    inquiryType: normalize_(getParam_(e, "inquiryType")),
    message: normalize_(getParam_(e, "message")),
    pageContext: normalize_(getParam_(e, "pageContext")),
    pageUrl: normalize_(getParam_(e, "pageUrl")),
    startedAt: normalize_(getParam_(e, "startedAt")),
    website: normalize_(getParam_(e, "website")),
    requestId: normalize_(getParam_(e, "requestId")),
  };

  if (payload.website) {
    throw new Error("送信に失敗しました。");
  }

  if (payload.startedAt) {
    const startedAt = new Date(payload.startedAt).getTime();
    if (!Number.isNaN(startedAt) && Date.now() - startedAt < 1500) {
      throw new Error("送信に失敗しました。");
    }
  }

  return payload;
}

function validatePayload_(payload) {
  if (!payload.name || payload.name.length > 120) {
    throw new Error("お名前を確認してください。");
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 160) {
    throw new Error("メールアドレスを確認してください。");
  }

  if (payload.company.length > 160) {
    throw new Error("会社名・屋号が長すぎます。");
  }

  if (payload.inquiryType.length > 120) {
    throw new Error("相談種別を確認してください。");
  }

  if (!payload.message || payload.message.length < 10 || payload.message.length > 5000) {
    throw new Error("相談内容は10文字以上で入力してください。");
  }
}

function sendEmails_(payload, submittedAt) {
  const formattedDate = formatDate_(submittedAt);
  const inquiryType = payload.inquiryType || "未選択";
  const company = payload.company || "未入力";
  const pageContext = payload.pageContext || "portfolio";
  const pageUrl = payload.pageUrl || "";

  const notifySubject = "[Portfolio] " + payload.name + " さんからお問い合わせが届きました";
  const notifyBody = [
    "ポートフォリオサイトからお問い合わせが届きました。",
    "",
    "お名前: " + payload.name,
    "メールアドレス: " + payload.email,
    "会社名・屋号: " + company,
    "相談種別: " + inquiryType,
    "ページ文脈: " + pageContext,
    "送信ページ: " + pageUrl,
    "送信日時: " + formattedDate,
    "",
    "相談内容:",
    payload.message,
  ].join("\n");

  MailApp.sendEmail({
    to: PORTFOLIO_CONTACT_CONFIG.notifyTo,
    subject: notifySubject,
    body: notifyBody,
    name: PORTFOLIO_CONTACT_CONFIG.serviceName,
    replyTo: payload.email,
  });

  if (!PORTFOLIO_CONTACT_CONFIG.autoReplyEnabled) {
    return false;
  }

  const autoReplySubject = "お問い合わせありがとうございます | " + PORTFOLIO_CONTACT_CONFIG.serviceName;
  const autoReplyBody = [
    payload.name + " 様",
    "",
    "お問い合わせありがとうございます。",
    "内容を確認のうえ、通常2営業日以内を目安に返信いたします。",
    "",
    "以下の内容で受け付けました。",
    "",
    "相談種別: " + inquiryType,
    "会社名・屋号: " + company,
    "送信日時: " + formattedDate,
    "",
    "相談内容:",
    payload.message,
    "",
    "このメールに返信して追加情報を送っていただいても大丈夫です。",
    "",
    PORTFOLIO_CONTACT_CONFIG.replySignature,
  ].join("\n");

  MailApp.sendEmail({
    to: payload.email,
    subject: autoReplySubject,
    body: autoReplyBody,
    name: PORTFOLIO_CONTACT_CONFIG.serviceName,
    replyTo: PORTFOLIO_CONTACT_CONFIG.notifyTo,
  });

  return true;
}

function appendRow_(sheet, payload, submittedAt, autoReplyStatus) {
  ensureHeaderRow_(sheet);
  sheet.appendRow([
    submittedAt,
    payload.requestId,
    payload.name,
    payload.email,
    payload.company,
    payload.inquiryType,
    payload.message,
    payload.pageContext,
    payload.pageUrl,
    autoReplyStatus,
  ]);
  return sheet.getLastRow();
}

function updateAutoReplyStatus_(sheet, rowIndex, status) {
  sheet.getRange(rowIndex, 10).setValue(status);
}

function getOrCreateSheet_() {
  if (!PORTFOLIO_CONTACT_CONFIG.spreadsheetId || PORTFOLIO_CONTACT_CONFIG.spreadsheetId === "PASTE_YOUR_SPREADSHEET_ID_HERE") {
    throw new Error("GASの設定で spreadsheetId を指定してください。");
  }

  const spreadsheet = SpreadsheetApp.openById(PORTFOLIO_CONTACT_CONFIG.spreadsheetId);
  let sheet = spreadsheet.getSheetByName(PORTFOLIO_CONTACT_CONFIG.sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(PORTFOLIO_CONTACT_CONFIG.sheetName);
  }

  return sheet;
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    "submitted_at",
    "request_id",
    "name",
    "email",
    "company",
    "inquiry_type",
    "message",
    "page_context",
    "page_url",
    "auto_reply",
  ]);
  sheet.setFrozenRows(1);
}

function buildIframeResponse_(payload, returnOrigin) {
  const safeJson = JSON.stringify(payload).replace(/</g, "\\u003c");
  const safeOrigin = JSON.stringify(returnOrigin || "*");
  const html = [
    "<!DOCTYPE html>",
    "<html>",
    "<body>",
    "<script>",
    "(function(){",
    "var message = " + safeJson + ";",
    "var targetOrigin = " + safeOrigin + ";",
    "function tryPost(target, origin) {",
    "  try { if (target && typeof target.postMessage === 'function') { target.postMessage(message, origin); return true; } } catch (e) {}",
    "  return false;",
    "}",
    "var delivered = false;",
    "if (window.top && window.top.parent && window.top.parent !== window.top) { delivered = tryPost(window.top.parent, targetOrigin) || delivered; }",
    "if (!delivered && window.parent && window.parent.parent && window.parent.parent !== window.parent) { delivered = tryPost(window.parent.parent, targetOrigin) || delivered; }",
    "if (!delivered) { delivered = tryPost(window.parent, '*') || delivered; }",
    "if (!delivered) { delivered = tryPost(window.top, '*') || delivered; }",
    "document.body.innerText = message.message || '';",
    "})();",
    "</script>",
    "</body>",
    "</html>",
  ].join("");

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getParam_(e, key) {
  return e && e.parameter && typeof e.parameter[key] !== "undefined" ? e.parameter[key] : "";
}

function normalize_(value) {
  return String(value || "").trim();
}

function formatDate_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
}
