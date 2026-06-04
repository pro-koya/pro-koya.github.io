'use client';

import { Fragment, Suspense, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';

// GAS Web アプリ（portfolio-booking）のデプロイ URL に置き換える
const GAS_BOOKING_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzBJro9jmJaKgHmydg6pKAqWF8Vfuwd5agzfYjQbs9lBLQ7zzqzSx-4Ghr8eDCno6pV/exec';

// エンドポイント未設定のうちは、サンプルの空き枠でUIを確認できるプレビューモードで動く
const IS_PREVIEW = GAS_BOOKING_ENDPOINT.includes('REPLACE_WITH');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 5000;
const SLOT_MINUTES = 60;

const METHODS = [
  { key: 'meet', label: 'Google Meet', note: 'ご予約の確定後に、Meetのリンクをカレンダーとメールでお送りします。' },
  { key: 'inperson', label: '対面', note: '大阪近辺を想定しています。場所はメールで調整させてください。' },
] as const;

type MethodKey = (typeof METHODS)[number]['key'];

type Slot = { start: number; label: string; available?: boolean };
type Day = { date: string; label: string; weekday: string; slots: Slot[] };

type LoadState = 'loading' | 'ready' | 'empty' | 'error';
type Status = 'idle' | 'pending' | 'success' | 'error';

type BookingResult = {
  dateLabel: string;
  methodLabel: string;
  joinInfo: string;
};

const WEEKDAYS_JP = ['日', '月', '火', '水', '木', '金', '土'];

/** "07:00" + 60分 -> "08:00"（表示用、サーバのJSTラベル基準でtz非依存） */
function endLabel(start: string): string {
  const [h, m] = start.split(':').map(Number);
  const total = h * 60 + m + SLOT_MINUTES;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(hh)}:${pad(mm)}`;
}

/** プレビュー用のサンプル空き枠を生成（クライアントのみ） */
function buildSampleDays(): Day[] {
  const days: Day[] = [];
  const now = new Date();
  const earliest = now.getTime() + 12 * 60 * 60 * 1000;
  // 翌月末日まで（例: 5月なら6月末、6月なら7月末）
  const horizonEnd = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let d = today; d.getTime() < horizonEnd.getTime(); d = addDays(d, 1)) {
    const slots: Slot[] = [];
    for (let h = 7; h <= 19; h++) {
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h).getTime();
      const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
      // それらしく所々埋める（リードタイム前 or サンプルの埋まり枠は available:false）
      const available = start >= earliest && (d.getDate() + h) % 3 !== 0;
      slots.push({ start, label: `${pad(h)}:00`, available });
    }
    if (!slots.some((s) => s.available)) continue;
    days.push({
      date: `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`,
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      weekday: WEEKDAYS_JP[d.getDay()],
      slots,
    });
  }
  return days;
}

function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function fmtDate(d: Date): string {
  const p = (n: number) => `${n}`.padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

type DayCell = { date: string; dayNum: number; weekdayIdx: number; available: boolean };
type Week = { label: string; cells: DayCell[] };

/** 空き日のある週だけを日曜始まりの7列で組み立てる */
function buildWeeks(days: Day[]): Week[] {
  if (days.length === 0) return [];
  const available = new Set(days.map((d) => d.date));
  const times = days.map((d) => parseDate(d.date).getTime());
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let start = new Date(Math.min(today.getTime(), ...times));
  let end = new Date(Math.max(...times));
  start = addDays(start, -start.getDay()); // 日曜へ
  end = addDays(end, 6 - end.getDay()); // 土曜へ

  const weeks: Week[] = [];
  for (let cur = start; cur.getTime() <= end.getTime(); cur = addDays(cur, 7)) {
    const cells: DayCell[] = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(cur, i);
      const ds = fmtDate(d);
      cells.push({ date: ds, dayNum: d.getDate(), weekdayIdx: d.getDay(), available: available.has(ds) });
    }
    if (cells.some((c) => c.available)) {
      const last = addDays(cur, 6);
      weeks.push({
        label: `${cur.getMonth() + 1}/${cur.getDate()} – ${last.getMonth() + 1}/${last.getDate()}`,
        cells,
      });
    }
  }
  return weeks;
}

type MatrixColumn = {
  date: string;
  weekdayIdx: number;
  dayNum: number;
  month: number;
  hasAvailability: boolean;
  day?: Day;
  slotsByLabel: Record<string, Slot>;
  availableCount: number;
};
type WeekMatrix = { columns: MatrixColumn[]; rowLabels: string[] };

/** その週を「時間(行) × 曜日(列)」のマトリクスに組み立てる。行ラベルは空き日の枠から導出。 */
function buildWeekMatrix(week: Week | undefined, days: Day[]): WeekMatrix | null {
  if (!week) return null;
  const byDate = new Map(days.map((d) => [d.date, d]));

  const columns: MatrixColumn[] = week.cells.map((c) => {
    const day = byDate.get(c.date);
    const slotsByLabel: Record<string, Slot> = {};
    let availableCount = 0;
    if (day) {
      for (const s of day.slots) {
        slotsByLabel[s.label] = s;
        if (s.available !== false) availableCount++;
      }
    }
    return {
      date: c.date,
      weekdayIdx: c.weekdayIdx,
      dayNum: c.dayNum,
      month: parseDate(c.date).getMonth() + 1,
      hasAvailability: c.available,
      day,
      slotsByLabel,
      availableCount,
    };
  });

  // 行ラベル（時間帯）は、空き枠データを持つ最初の列から取得する（全日同じ営業時間帯）
  const ref = columns.find((col) => col.day);
  const rowLabels = ref && ref.day ? ref.day.slots.map((s) => s.label) : [];
  return { columns, rowLabels };
}

function BookingInner() {
  const [method, setMethod] = useState<MethodKey | ''>('');
  const [days, setDays] = useState<Day[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [slotStart, setSlotStart] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);

  const startedAt = useRef(new Date().toISOString());

  useEffect(() => {
    let cancelled = false;

    if (IS_PREVIEW) {
      const sample = buildSampleDays();
      setDays(sample);
      setLoadState(sample.length > 0 ? 'ready' : 'empty');
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${GAS_BOOKING_ENDPOINT}?action=slots`);
        const data = await res.json();
        if (cancelled) return;
        if (data.status !== 'success' || !Array.isArray(data.slots)) {
          setLoadState('error');
          return;
        }
        const list = data.slots as Day[];
        setDays(list);
        setLoadState(list.length === 0 ? 'empty' : 'ready');
      } catch {
        if (!cancelled) setLoadState('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedSlot = useMemo(() => {
    for (const d of days) {
      const found = d.slots.find((s) => s.start === slotStart);
      if (found) return { day: d, slot: found };
    }
    return null;
  }, [days, slotStart]);

  const weeks = useMemo(() => buildWeeks(days), [days]);
  const [weekIdx, setWeekIdx] = useState(0);
  const safeWeekIdx = Math.min(weekIdx, Math.max(0, weeks.length - 1));
  const activeWeek = weeks[safeWeekIdx];
  const weekMatrix = useMemo(() => buildWeekMatrix(activeWeek, days), [activeWeek, days]);

  const gotoWeek = (idx: number) => {
    if (!weeks[idx]) return;
    setWeekIdx(idx);
    setSlotStart(null);
  };

  const selectedMethod = METHODS.find((m) => m.key === method);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!method) return fail('会話の方式を選んでください。');
    if (slotStart === null || !selectedSlot) return fail('日時を選んでください。');
    if (!trimmedName) return fail('お名前を入力してください。');
    if (!EMAIL_RE.test(trimmedEmail)) return fail('メールアドレスの形式を確認してください。');
    if (trimmedMessage.length > MESSAGE_MAX) {
      return fail(`相談内容は${MESSAGE_MAX.toLocaleString()}文字以内で入力してください。`);
    }

    setStatus('pending');
    setStatusMsg('ご予約を確定しています...');
    setSubmitting(true);

    // プレビューモード: 通信せず確定画面のイメージを表示
    if (IS_PREVIEW) {
      const { day, slot } = selectedSlot;
      setResult({
        dateLabel: `${day.date.replace(/-/g, '/')}（${day.weekday}）${slot.label}`,
        methodLabel: selectedMethod?.label ?? '',
        joinInfo:
          method === 'meet'
            ? 'Meetリンクは予約確定時に自動発行されます（プレビュー）'
            : '大阪近辺（確定後に詳細をご連絡します）',
      });
      setStatus('success');
      setStatusMsg('');
      setSubmitting(false);
      return;
    }

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      method,
      start: String(slotStart),
      message: trimmedMessage,
      website,
      startedAt: startedAt.current,
      requestId: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    };

    try {
      // text/plain にして preflight を避ける（GAS で読めるようにする）
      const res = await fetch(GAS_BOOKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === 'success' && data.booking) {
        setResult({
          dateLabel: data.booking.dateLabel,
          methodLabel: data.booking.methodLabel,
          joinInfo: data.booking.joinInfo,
        });
        setStatus('success');
        setStatusMsg('');
      } else {
        fail(data.message || '予約に失敗しました。時間を置いてお試しください。');
        refreshSlots();
      }
    } catch {
      fail('通信に失敗しました。時間を置いてもう一度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  const fail = (msg: string) => {
    setStatus('error');
    setStatusMsg(msg);
  };

  const refreshSlots = async () => {
    if (IS_PREVIEW) return;
    try {
      const res = await fetch(`${GAS_BOOKING_ENDPOINT}?action=slots`);
      const data = await res.json();
      if (data.status === 'success' && Array.isArray(data.slots)) {
        setDays(data.slots);
        setSlotStart(null);
      }
    } catch {
      /* no-op: 既存表示を維持 */
    }
  };

  const statusClass =
    status === 'pending' ? ' is-pending'
    : status === 'error' ? ' is-error'
    : '';

  if (status === 'success' && result) {
    return (
      <>
        <Nav />
        <main>
          <section className="sec-hero">
            <div className="eyebrow">Booking</div>
            <h1 className="display page-title" style={{ marginTop: 18 }}>BOOKED</h1>
            <div className="booking-confirm reveal in">
              <div className="booking-confirm-badge">Confirmed ✓</div>
              <p className="booking-confirm-lead">ご予約を受け付けました。</p>
              <dl className="booking-confirm-list">
                <div><dt>日時</dt><dd className="is-strong">{result.dateLabel}</dd></div>
                <div><dt>方式</dt><dd>{result.methodLabel}</dd></div>
                <div><dt>参加情報</dt><dd>{result.joinInfo}</dd></div>
              </dl>
              <p className="booking-confirm-note">
                {IS_PREVIEW
                  ? 'これはプレビュー表示です。実際のご予約では、確認メールとGoogleカレンダーのご招待が届きます。'
                  : '確認メールとGoogleカレンダーのご招待をお送りしました。ご変更が必要な場合は、そのメールにご返信ください。'}
              </p>
            </div>
          </section>
          <div style={{ height: 100 }} className="page-spacer" />
        </main>
        <Footer />
        <RevealObserver />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main>
        <section className="sec-hero">
          <div className="eyebrow">Booking · 日程予約</div>
          <h1 className="display page-title" style={{ marginTop: 18 }}>BOOKING</h1>
          <h2 className="display contact-page-subtitle">
            ご都合に合わせて、<br />お話しできれば。
          </h2>
          <p className="contact-page-desc">
            ここでは、Google Meet・対面で<strong style={{ fontWeight: 600 }}>直接お話しする日時</strong>をご予約いただけます。ご希望の方法と日時をお選びいただき、必要な情報をご入力のうえ、ご予約ください。ご相談されたいことやご質問があれば、あわせてお書き添えいただけるとうれしいです。<br />
            ご予約の確定後に、Googleカレンダーのご招待と参加情報をメールでお送りします。
          </p>
          <p className="contact-page-desc" style={{ marginTop: 16 }}>
            まずは文章で伝えたい・軽く聞いてみたい場合は、<a href="/contact/" style={{ textDecoration: 'underline' }}>お問い合わせ</a> からでも受け付けています。
          </p>
        </section>

        <section className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form-grid" noValidate>
            {/* 01 方式 */}
            <div className="reveal">
              <div className="form-label">01 / ご希望の方法</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {METHODS.map((m) => (
                  <button key={m.key} type="button"
                    className={`topic-pill ${method === m.key ? 'selected' : ''}`}
                    onClick={() => setMethod(method === m.key ? '' : m.key)}>
                    {m.label}
                  </button>
                ))}
              </div>
              {selectedMethod && <p className="booking-method-note">{selectedMethod.note}</p>}
            </div>

            {/* 02 日時 */}
            <div className="reveal">
              <div className="form-label">02 / ご希望の日時</div>

              {loadState === 'loading' && <p className="booking-hint">空き状況を読み込んでいます...</p>}
              {loadState === 'error' && (
                <p className="booking-hint">
                  空き状況をうまく取得できませんでした。お手数ですが、時間をおいて再読み込みいただくか、
                  <a href="/contact/" style={{ textDecoration: 'underline' }}>お問い合わせ</a>からご連絡ください。
                </p>
              )}
              {loadState === 'empty' && (
                <p className="booking-hint">
                  ただいまご案内できる空き枠がございません。お手数ですが、
                  <a href="/contact/" style={{ textDecoration: 'underline' }}>お問い合わせ</a>からご連絡ください。
                </p>
              )}

              {loadState === 'ready' && activeWeek && weekMatrix && (
                <>
                  <div className="booking-week-nav">
                    <button type="button" className="booking-week-btn"
                      aria-label="前の週" disabled={safeWeekIdx === 0}
                      onClick={() => gotoWeek(safeWeekIdx - 1)}>‹</button>
                    <span className="booking-week-range">{activeWeek.label}</span>
                    <button type="button" className="booking-week-btn"
                      aria-label="次の週" disabled={safeWeekIdx >= weeks.length - 1}
                      onClick={() => gotoWeek(safeWeekIdx + 1)}>›</button>
                  </div>

                  <div className="booking-matrix-meta">
                    {IS_PREVIEW && <span className="preview-tag">Preview · サンプル</span>}
                    <span>この週の空き枠から選べます</span>
                    <span>1枠 {SLOT_MINUTES}分</span>
                  </div>

                  {/* 時間(行) × 曜日(列) のマトリクス（PC・モバイル共通で週を一望） */}
                  <div className="booking-matrix" role="grid" aria-label="週間の空き枠">
                    <div className="bm-corner" aria-hidden="true" />
                    {weekMatrix.columns.map((col) => (
                      <div key={col.date} role="columnheader"
                        className={`bm-colhead ${col.hasAvailability ? '' : 'is-dim'}`}>
                        <span className="bm-col-wd">{WEEKDAYS_JP[col.weekdayIdx]}</span>
                        <span className="bm-col-date">{col.month}/{col.dayNum}</span>
                      </div>
                    ))}

                    {weekMatrix.rowLabels.map((label) => (
                      <Fragment key={label}>
                        <div className="bm-rowhead">{label}</div>
                        {weekMatrix.columns.map((col) => {
                          const slot = col.slotsByLabel[label];
                          const available = !!slot && slot.available !== false;
                          if (!available || !slot) {
                            return <div key={col.date} className="bm-cell is-empty" aria-hidden="true" />;
                          }
                          const selected = slotStart === slot.start;
                          return (
                            <button key={col.date} type="button"
                              className={`bm-cell ${selected ? 'selected' : ''}`}
                              aria-label={`${WEEKDAYS_JP[col.weekdayIdx]} ${col.month}/${col.dayNum} ${label}〜${endLabel(label)} を選択`}
                              aria-pressed={selected}
                              onClick={() => setSlotStart(slot.start)}>
                              <span className="bm-dot" aria-hidden="true" />
                            </button>
                          );
                        })}
                      </Fragment>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 03 連絡先 */}
            <label className="form-field reveal">
              <div className="form-label">03 / お名前</div>
              <input type="text" className="form-input" placeholder="Your name"
                value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
            </label>

            <label className="form-field reveal">
              <div className="form-label">04 / メールアドレス</div>
              <input type="email" className="form-input" placeholder="name@domain"
                value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={160} />
            </label>

            <label className="form-field reveal">
              <div className="form-label">05 / ご相談内容・ご質問（任意）</div>
              <textarea className="form-textarea" placeholder="ご相談されたいことやご質問があれば、こちらにご記入ください。" rows={4}
                value={message} onChange={(e) => setMessage(e.target.value)} maxLength={MESSAGE_MAX} />
            </label>

            <input
              type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={website} onChange={(e) => setWebsite(e.target.value)}
              style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }}
            />

            {selectedSlot && (
              <div className="booking-ticket">
                <div className="booking-ticket-accent" aria-hidden="true" />
                <div className="booking-ticket-body">
                  <div className="booking-ticket-eyebrow">選択中のご予約</div>
                  <div className="booking-ticket-main">
                    {selectedSlot.day.label}（{selectedSlot.day.weekday}） {selectedSlot.slot.label}–{endLabel(selectedSlot.slot.label)}
                  </div>
                  <div className="booking-ticket-sub">
                    {selectedMethod
                      ? `${selectedMethod.label} / ${SLOT_MINUTES}分`
                      : `方式（01）を選ぶと予約できます · ${SLOT_MINUTES}分`}
                  </div>
                </div>
              </div>
            )}

            <div className="reveal contact-form-actions">
              <button type="submit" className="btn btn-fill" style={{ padding: '20px 32px' }}
                disabled={submitting || loadState !== 'ready'}>
                {submitting ? '予約中...' : 'この内容で予約する'} <span className="arrow" />
              </button>
            </div>

            {statusMsg && (
              <p className={`contact-status${statusClass}`} aria-live="polite" style={{ marginTop: 16 }}>
                {statusMsg}
              </p>
            )}
          </form>
        </section>

        <div style={{ height: 100 }} className="page-spacer" />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingInner />
    </Suspense>
  );
}
