'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import './business.css';

const SUPABASE_URL = 'https://elyrisnjmrhqaxzfhygw.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseXJpc25qbXJocWF4emZoeWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMzM4MDMsImV4cCI6MjA5ODgwOTgwM30.XW5VmZZeAvP2ZoOjD0AK4PVYCsjFNFAYIHsKBIi8Zq4';

type WorkersBand = '1-4' | '5-9' | '10-29' | '30+';
type Status = 'idle' | 'sending' | 'done' | 'error';

/* ── 流入計測 ──────────────────────────────────────────────
   「事前登録0件」が“誰も来ていない”のか“来たが登録しなかった”のかを
   判別できないと打ち手が決まらない（LP-BUSINESS-DESIGN §9）。
   個人を特定する情報は送らない。session_id は毎訪問の乱数で個人と紐付かない。 */
type LpEvent =
  | 'view' | 'scroll_25' | 'scroll_50' | 'scroll_75' | 'scroll_90'
  | 'cta_click' | 'form_start' | 'form_submit' | 'form_success';

type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
};

const ATTRIBUTION_KEY = 'kf-lp-attr';
const SESSION_KEY = 'kf-lp-sid';

/** UTMは初回訪問時に確保し、回遊・再訪でも保持する（着地時のパラメータが真の流入元）。 */
function readAttribution(): Attribution {
  const fallback: Attribution = { utm_source: 'direct', utm_medium: '', utm_campaign: '', referrer: '' };
  if (typeof window === 'undefined') return fallback;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('utm_source');
    if (fromUrl) {
      const attr: Attribution = {
        utm_source: fromUrl.slice(0, 60),
        utm_medium: (params.get('utm_medium') ?? '').slice(0, 60),
        utm_campaign: (params.get('utm_campaign') ?? '').slice(0, 100),
        referrer: document.referrer.slice(0, 200),
      };
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attr));
      return attr;
    }
    const saved = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (saved) return { ...fallback, ...(JSON.parse(saved) as Partial<Attribution>) };
    // パラメータ無し＝直接流入。外部リンク経由なら参照元だけ残す。
    const attr: Attribution = { ...fallback, referrer: document.referrer.slice(0, 200) };
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attr));
    return attr;
  } catch {
    return fallback;
  }
}

function sessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) return saved;
    const sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, sid);
    return sid;
  } catch {
    return 'nostorage' + Date.now().toString(36);
  }
}

/** 計測は最善努力。失敗してもLPの動作には一切影響させない。 */
function track(event: LpEvent) {
  if (typeof window === 'undefined') return;
  try {
    const attr = readAttribution();
    const body = JSON.stringify({
      session_id: sessionId(),
      event,
      path: window.location.pathname.slice(0, 200),
      viewport_w: window.innerWidth,
      ...attr,
    });
    void fetch(`${SUPABASE_URL}/rest/v1/koefarm_lp_events`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* noop */
  }
}

const WORKER_BANDS: { value: WorkersBand; label: string }[] = [
  { value: '1-4', label: '〜4人' },
  { value: '5-9', label: '5〜9人' },
  { value: '10-29', label: '10〜29人' },
  { value: '30+', label: '30人以上' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── SVG：紙ごとの罫線（pathLength=1 で描画量を正規化）── */
function DocReport() {
  return (
    <svg className="kfb-paper-svg" viewBox="0 0 60 80" aria-hidden="true">
      <line className="kfb-draw" x1="8" y1="26" x2="52" y2="26" pathLength={1} />
      <line className="kfb-draw" x1="8" y1="38" x2="52" y2="38" pathLength={1} />
      <line className="kfb-draw" x1="8" y1="50" x2="52" y2="50" pathLength={1} />
      <line className="kfb-draw" x1="8" y1="62" x2="52" y2="62" pathLength={1} />
      <line className="kfb-draw" x1="30" y1="26" x2="30" y2="62" pathLength={1} />
    </svg>
  );
}
function DocAttendance() {
  return (
    <svg className="kfb-paper-svg" viewBox="0 0 60 80" aria-hidden="true">
      <circle className="kfb-draw" cx="30" cy="46" r="18" pathLength={1} />
      <line className="kfb-draw" x1="30" y1="30" x2="30" y2="34" pathLength={1} />
      <line className="kfb-draw" x1="30" y1="58" x2="30" y2="62" pathLength={1} />
      <line className="kfb-draw" x1="14" y1="46" x2="18" y2="46" pathLength={1} />
      <line className="kfb-draw" x1="42" y1="46" x2="46" y2="46" pathLength={1} />
      <line className="kfb-draw kfb-draw-green" x1="30" y1="46" x2="30" y2="35" pathLength={1} />
      <line className="kfb-draw kfb-draw-green" x1="30" y1="46" x2="40" y2="50" pathLength={1} />
    </svg>
  );
}
function DocLabor() {
  return (
    <svg className="kfb-paper-svg" viewBox="0 0 60 80" aria-hidden="true">
      <circle className="kfb-draw" cx="30" cy="44" r="16" pathLength={1} />
      <path className="kfb-draw kfb-draw-green" d="M30 44 L30 28 A16 16 0 0 1 44.8 37.9 Z" pathLength={1} />
      <line className="kfb-draw" x1="10" y1="74" x2="50" y2="74" pathLength={1} />
    </svg>
  );
}
function DocLedger() {
  return (
    <svg className="kfb-paper-svg" viewBox="0 0 60 80" aria-hidden="true">
      <line className="kfb-draw" x1="10" y1="30" x2="50" y2="30" pathLength={1} />
      <line className="kfb-draw" x1="30" y1="30" x2="30" y2="66" pathLength={1} />
      <line className="kfb-draw" x1="14" y1="42" x2="26" y2="42" pathLength={1} />
      <line className="kfb-draw" x1="34" y1="42" x2="46" y2="42" pathLength={1} />
      <line className="kfb-draw" x1="14" y1="52" x2="26" y2="52" pathLength={1} />
    </svg>
  );
}

const PAPERS = [
  { tag: '1｜作業日報', Doc: DocReport, token: { text: 'トマト', x: '16%', y: '40%' } },
  { tag: '2｜勤怠', Doc: DocAttendance, token: { text: '3時間', x: '14%', y: '20%' } },
  { tag: '3｜労務費', Doc: DocLabor, token: { text: 'Aハウス', x: '10%', y: '79%' } },
  { tag: '4｜仕訳', Doc: DocLedger, token: null },
];

export default function BusinessLP() {
  const rootRef = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLElement>(null);

  // ── フォーム状態 ──
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [workersBand, setWorkersBand] = useState<'' | WorkersBand>('');
  const [crops, setCrops] = useState('');
  const [message, setMessage] = useState('');
  const [wantsPilot, setWantsPilot] = useState(false);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [emailErr, setEmailErr] = useState('');
  const [consentErr, setConsentErr] = useState(false);

  // ── モーション：JS有効かつ prefers-reduced-motion でない時のみ演出 ──
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // 静止＝完成状態（CSS初期値）

    root.classList.add('kfb-animate');
    const cleanups: Array<() => void> = [];

    // S0 見出し内「話す」の下線を引く
    const underline = root.querySelector('.kfb-underline');
    const t = window.setTimeout(() => underline?.classList.add('kfb-drawn'), 100);
    cleanups.push(() => window.clearTimeout(t));

    // 汎用リビール（IntersectionObserver）
    // threshold 0.16 は「要素の16%が入るまで出さない」ため、背の高いブロックや
    // 小さい画面では画面内にあるのに読めない時間が長く続いていた。
    // 少しでも入ったら出す（threshold 0）＋ 下端に余裕を持たせて先出しする。
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('kfb-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 12% 0px' }
    );
    root.querySelectorAll('.kfb-reveal').forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // ── 流入計測：表示とスクロール到達 ──
    track('view');
    const marks: { ratio: number; event: LpEvent; done: boolean }[] = [
      { ratio: 0.25, event: 'scroll_25', done: false },
      { ratio: 0.5, event: 'scroll_50', done: false },
      { ratio: 0.75, event: 'scroll_75', done: false },
      { ratio: 0.9, event: 'scroll_90', done: false },
    ];
    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        scrollTicking = false;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const depth = window.scrollY / scrollable;
        marks.forEach((m) => {
          if (!m.done && depth >= m.ratio) {
            m.done = true;
            track(m.event);
          }
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    // ── S1：gsap ScrollTrigger スクロールテリング ──
    let ctx: { revert: () => void } | null = null;
    (async () => {
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        const gsap = gsapMod.gsap ?? gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>('.kfb-paper-card');
          const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: s1Ref.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          });

          // 4枚が順に分離・せり上がる（スクロール量→分離進行にマップ）
          cards.forEach((card, i) => {
            const at = i * 0.16;
            tl.from(
              card,
              { autoAlpha: 0, scale: 0.6, yPercent: 26, duration: 0.2 },
              at
            );
            // 各紙の罫線が「書かれる」
            const draws = card.querySelectorAll<SVGElement>('.kfb-draw');
            tl.from(
              draws,
              { strokeDashoffset: 1, duration: 0.16, stagger: 0.015 },
              at + 0.08
            );
          });

          // 接続線が bubble から各紙へ引かれる
          tl.from(
            '.kfb-connectors path',
            { strokeDashoffset: 1, duration: 0.5, stagger: 0.05 },
            0.18
          );

          // 発話の語が点る（同じ語が複数の紙へ）
          tl.to('.kfb-s1-bubble .kfb-tok', { className: 'kfb-tok kfb-tok-on', duration: 0.1, stagger: 0.08 }, 0.2);

          // 各紙に語が入る
          tl.from('.kfb-token', { autoAlpha: 0, y: 4, duration: 0.14, stagger: 0.08 }, 0.4);

          // 4枚そろってラベル
          tl.from('.kfb-s1-label', { autoAlpha: 0, x: -10, duration: 0.16, stagger: 0.06 }, 0.66);
          // 締めの一文
          tl.from('.kfb-s1-close', { autoAlpha: 0, y: 12, duration: 0.2 }, 0.82);
        }, root);

        ScrollTrigger.refresh();
      } catch {
        // gsap 読み込み失敗時は静止（完成状態）のまま
      }
    })();

    cleanups.push(() => ctx?.revert());
    return () => cleanups.forEach((fn) => fn());
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    let ok = true;
    if (!EMAIL_RE.test(email.trim())) {
      setEmailErr(
        email.trim() ? 'アドレスの形をご確認ください（例 you@farm.jp）' : 'ご案内の送り先だけ、教えてください'
      );
      ok = false;
    } else {
      setEmailErr('');
    }
    if (!consent) {
      setConsentErr(true);
      ok = false;
    } else {
      setConsentErr(false);
    }
    if (!ok) return;

    // honeypot：埋まっていたら送らず成功を装う
    if (honeypot.trim() !== '') {
      setStatus('done');
      return;
    }

    setStatus('sending');
    track('form_submit');

    // 流入元を登録レコードにも残す（どのチャネルが実際に登録に至ったかを見るため）。
    const attr = readAttribution();
    const row: Record<string, unknown> = {
      email: email.trim(),
      source: 'lp-business',
      wants_pilot: wantsPilot,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium || null,
      utm_campaign: attr.utm_campaign || null,
      referrer: attr.referrer || null,
    };
    if (contactName.trim()) row.contact_name = contactName.trim();
    if (orgName.trim()) row.org_name = orgName.trim();
    if (workersBand) row.workers_band = workersBand;
    if (crops.trim()) row.crops = crops.trim().slice(0, 200);
    if (message.trim()) row.message = message.trim().slice(0, 1000);

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/koefarm_preregistrations`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(row),
      });

      if (res.ok) {
        track('form_success');
        setStatus('done');
        return;
      }
      // 重複メール（unique 違反）は成功扱い
      let code = '';
      try {
        const body = await res.json();
        code = body?.code ?? '';
      } catch {
        /* noop */
      }
      if (res.status === 409 || code === '23505') {
        track('form_success');
        setStatus('done');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="kfb-root" ref={rootRef}>
      <span className="kfb-rails" aria-hidden="true">
        <span />
      </span>

      {/* 開発中リボン */}
      <p className="kfb-ribbon">
        <b>開発中</b> ／ いま、一緒に育てる農家を数社さがしています
      </p>

      {/* ══ S0 ファーストビュー ══ */}
      <header className="kfb-hero">
        <div className="kfb-hero-field" aria-hidden="true">
          <svg viewBox="0 0 820 340" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="#6e5a44" strokeWidth="1" opacity="0.5">
              <path d="M0 70 C 160 50, 320 90, 500 62 S 780 40, 820 66" />
              <path d="M0 110 C 200 92, 360 128, 540 104 S 800 86, 820 108" />
              <path d="M0 152 C 180 138, 340 168, 520 146 S 790 130, 820 150" strokeDasharray="4 5" />
            </g>
            <g fill="none" stroke="#6e5a44" strokeWidth="1" opacity="0.2">
              <rect x="70" y="276" width="180" height="56" rx="2" />
              <rect x="286" y="276" width="150" height="56" rx="2" />
              <rect x="470" y="276" width="200" height="56" rx="2" />
              <path d="M70 304 H250 M286 304 H436 M470 304 H670" strokeDasharray="3 6" />
            </g>
          </svg>
        </div>

        <div className="kfb-wrap kfb-hero-inner">
          <h1 className="kfb-hero-h1">
            <span className="kfb-line">
              畑で<span className="kfb-underline">話す</span>だけ。
            </span>
            <span className="kfb-line">日報も、勤怠も、帳簿も、</span>
            <span className="kfb-line">もう書かなくていい。</span>
          </h1>
          <p className="kfb-hero-sub">
            作業者はiPhoneに話す。経営者と事務は、Webを開けば
            今日の現場と、圃場ごとのもうけが、そこにある。
            農業法人のための、話す業務ソフト<b>「コエファーム」</b>。
          </p>
          <div className="kfb-cta-row">
            <a className="kfb-cta" href="#kfb-form" onClick={() => track('cta_click')}>
              先行登録する（無料）
            </a>
            <span className="kfb-cta-note">メールアドレスだけ。1分で終わります。</span>
          </div>

          <div className="kfb-bubble kfb-hero-bubble">「Aハウスでトマト収穫、3時間」</div>

          <div className="kfb-scrollcue" aria-hidden="true">
            <span>
              <svg width="16" height="22" viewBox="0 0 16 22" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M8 1 V19 M2 13 L8 20 L14 13" />
              </svg>
            </span>
          </div>
        </div>
      </header>

      {/* ══ S1 主役：1発話→4書類 ══ */}
      <section className="kfb-s1" ref={s1Ref} aria-label="ひと言が、4枚の書類になる">
        <div className="kfb-s1-sticky">
          <h2 className="kfb-s1-head kfb-serif">このひと言が、4枚の書類になる。</h2>

          <div className="kfb-s1-canvas">
            {/*
              等倍スケール（canvas aspect 16/10 = viewBox 160x100）で座標を実レイアウトに一致させる。
              紙: 中心x 16/38.7/61.3/84% → 25.6/61.9/98.1/134.4、上端y = 66% − (19%×4/3÷0.625)/2 = 45.7 → 46
              吹き出し: 中心(50%,12%) → 始点(80,16)は吹き出し(z-index:3)の背後に隠れる
            */}
            <svg className="kfb-connectors" viewBox="0 0 160 100" aria-hidden="true">
              <path d="M80 16 C 72 30, 40 34, 25.6 46" pathLength={1} />
              <path d="M80 16 C 77 30, 64 36, 61.9 46" pathLength={1} />
              <path d="M80 16 C 83 30, 96 36, 98.1 46" pathLength={1} />
              <path d="M80 16 C 88 30, 120 34, 134.4 46" pathLength={1} />
            </svg>

            <div className="kfb-bubble kfb-s1-bubble">
              「Aハウスで<span className="kfb-tok">トマト</span>収穫、<span className="kfb-tok">3時間</span>」
            </div>

            {PAPERS.map((p, i) => (
              <div className="kfb-paper" data-i={i} key={i}>
                <div className="kfb-paper-card">
                  <p.Doc />
                  <span className="kfb-paper-tag">{p.tag}</span>
                  {p.token && (
                    <span className="kfb-token" style={{ left: p.token.x, top: p.token.y }}>
                      {p.token.text}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="kfb-s1-labels">
            <p className="kfb-s1-label">
              <span className="kfb-no">1枚目</span>｜<b>作業日報</b> ── いつ・どこで・何をしたか。GAPや農薬の記録にもそのまま。
            </p>
            <p className="kfb-s1-label">
              <span className="kfb-no">2枚目</span>｜<b>勤怠</b> ── 実働3時間。打刻を忘れても、作業記録から埋まる。
            </p>
            <p className="kfb-s1-label">
              <span className="kfb-no">3枚目</span>｜<b>労務費</b> ── 3時間×時給を、Aハウスのトマトへ自動で振り分け。
            </p>
            <p className="kfb-s1-label">
              <span className="kfb-no">4枚目</span>｜<b>仕訳</b> ── 複式簿記の帳簿へ。月末にまとめて書き写す作業が消える。
            </p>
          </div>

          <p className="kfb-s1-close kfb-serif">
            同じ声から、4枚。
            <br />
            だから、二度書きがない。
          </p>
        </div>
      </section>

      {/* ══ S2 共感：before ══ */}
      <section className="kfb-section kfb-s2">
        <div className="kfb-wrap">
          <h2 className="kfb-tl-head kfb-reveal">いまは、こんな一日ではありませんか。</h2>
          <div className="kfb-timeline">
            <div className="kfb-tl-node kfb-reveal">
              <div className="kfb-tl-time">朝</div>
              <p className="kfb-tl-body">
                誰がどの畑に行くか、ホワイトボードとLINEで割り振る。「言った/言わない」がたまに揉める。
              </p>
            </div>
            <div className="kfb-tl-node kfb-reveal kfb-d1">
              <div className="kfb-tl-time">昼</div>
              <p className="kfb-tl-body">
                畑からLINEに「◯◯終わりました」。写真とメモがバラバラに流れて、あとで探せない。
              </p>
            </div>
            <div className="kfb-tl-node kfb-reveal kfb-d2">
              <div className="kfb-tl-time">夜</div>
              <p className="kfb-tl-body">
                一日の日報を、記憶をたどってExcelに書き写す。勤怠は月末にまた集計。原価は、正直わからない。
              </p>
            </div>
          </div>
          <p className="kfb-tl-foot kfb-reveal">
            紙とExcelとLINE。回ってはいる。でも、同じことを何度も書いている。
          </p>
        </div>
      </section>

      {/* ══ S3 解決：after ══ */}
      <section className="kfb-section kfb-s3">
        <div className="kfb-wrap">
          <h2 className="kfb-tl-head kfb-reveal">コエファームだと、夜にはもう終わっています。</h2>
          <div className="kfb-timeline">
            <div className="kfb-tl-node kfb-reveal">
              <div className="kfb-tl-time">朝</div>
              <p className="kfb-tl-body">
                今日の割り当てをWebで組むと、作業者のiPhoneに今日の仕事が届く。
              </p>
            </div>
            <div className="kfb-tl-node kfb-reveal kfb-d1">
              <div className="kfb-tl-time">昼</div>
              <p className="kfb-tl-body">
                畑で話した記録が、圃場ごとに自動でならぶ。誰が・どこで・何を、が一覧でわかる。
              </p>
            </div>
            <div className="kfb-tl-node kfb-reveal kfb-d2">
              <div className="kfb-tl-time">夜</div>
              <p className="kfb-tl-body">
                日報・勤怠・労務費・仕訳は、もうできている。あなたは、承認ボタンを押すだけ。
              </p>
              <div className="kfb-mock" aria-hidden="true">
                <div className="kfb-mock-bar">
                  <i /><i /><i /><span>コエファーム 管理画面</span>
                </div>
                <div className="kfb-mock-grid">
                  <div className="kfb-mock-plot" style={{ '--f': '0.22' } as CSSProperties} />
                  <div className="kfb-mock-plot" style={{ '--f': '0.42' } as CSSProperties} />
                  <div className="kfb-mock-plot" style={{ '--f': '0.30' } as CSSProperties} />
                  <div className="kfb-mock-plot" style={{ '--f': '0.55' } as CSSProperties} />
                  <div className="kfb-mock-plot" style={{ '--f': '0.18' } as CSSProperties} />
                  <div className="kfb-mock-plot" style={{ '--f': '0.38' } as CSSProperties} />
                </div>
                <div className="kfb-mock-bars">
                  <i style={{ height: '60%' }} />
                  <i style={{ height: '85%' }} />
                  <i style={{ height: '40%' }} />
                  <i style={{ height: '72%' }} />
                </div>
                <div className="kfb-mock-approve">
                  <span className="kfb-mock-check">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6.5 L5 9 L10 3" />
                    </svg>
                  </span>
                  承認しました
                </div>
              </div>
            </div>
          </div>
          <p className="kfb-tl-note kfb-reveal">
            Webを開けば、今日の現場と、圃場ごとのもうけが見えている。
            「トマトのAハウスは、人件費まで入れて黒字か」が、はじめて分かる。
          </p>
        </div>
      </section>

      {/* ══ S4 農業の労務 ══ */}
      <section className="kfb-section">
        <div className="kfb-wrap">
          <h2 className="kfb-tl-head kfb-reveal">農業には、農業の労務がある。それに合わせて作りました。</h2>
          <p className="kfb-lead kfb-reveal">
            農業は、労働基準法41条で労働時間・休憩・休日の規定が適用されません。だから残業や36協定を前提にした普通の勤怠ソフトは、農業に合いません。でも、外してはいけないものもあります。
          </p>

          <div className="kfb-facts">
            <div className="kfb-fact kfb-reveal">
              <span className="kfb-fact-seal">要</span>
              <h3 className="kfb-fact-h">深夜割増だけは、農業でも必要</h3>
              <p className="kfb-fact-b">
                22時〜5時の割増（<span className="kfb-bignum">25</span>%）は農業も対象。時間外や休日の割増とは分けて、深夜分だけを自動で計算します。
              </p>
            </div>
            <div className="kfb-fact kfb-reveal kfb-d1">
              <span className="kfb-fact-seal">義</span>
              <h3 className="kfb-fact-h">有給の「年5日」は、農業も義務</h3>
              <p className="kfb-fact-b">
                <span className="kfb-bignum">2019</span>年から全業種一律。年<span className="kfb-bignum">5</span>日の取得を、誰があと何日か、画面で追えます。
              </p>
            </div>
            <div className="kfb-fact kfb-reveal">
              <span className="kfb-fact-seal">保</span>
              <h3 className="kfb-fact-h">出来高払いの、保障給チェック</h3>
              <p className="kfb-fact-b">
                出来高で払う場合の保障給（労基法27条）。通常の賃金のおおよそ<span className="kfb-bignum">6</span>割を下回っていないか、目安を出します。
              </p>
            </div>
            <div className="kfb-fact kfb-reveal kfb-d1">
              <span className="kfb-fact-seal">別</span>
              <h3 className="kfb-fact-h">技能実習・特定技能を、分けて管理</h3>
              <p className="kfb-fact-b">
                労働者・家族専従者・構成員・外国人材を区分。在留期限や実務経験の証明も、必要なときに書き出せます。
              </p>
            </div>
          </div>

          <p className="kfb-foreign kfb-reveal">
            いま農業で働く人の<span className="kfb-bignum">44</span>人に<span className="kfb-bignum">1</span>人が、外国から来た人です（2022年）。
            ベトナム語で話せば、日本語の記録になる。実習生のハンさんも、iPhoneに話すだけ。
          </p>
          <div className="kfb-han kfb-reveal">
            <span className="kfb-bubble">Cà chua, thu hoạch 3 tiếng</span>
            <span className="kfb-han-arrow" aria-hidden="true">→</span>
            <span className="kfb-han-doc">日本語の作業日報「トマト収穫 3時間」に</span>
          </div>

          <p className="kfb-disclaimer kfb-reveal">
            ※ 給与の確定計算そのものは行いません。集計とCSV書き出しまでを担い、確定は給与ソフトへ渡します。深夜割増・保障給は「参考の計算とアラート」として出します。
          </p>
        </div>
      </section>

      {/* ══ S5 作った人 ══ */}
      <section className="kfb-section kfb-s5">
        <div className="kfb-wrap">
          <h2 className="kfb-tl-head kfb-reveal">農業修行中に直面した課題を、解決するために作りました。</h2>
          <div className="kfb-letter kfb-reveal">
            <div className="kfb-letter-sil" aria-hidden="true">
              <svg width="64" height="84" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 18 Q23 6 40 18" />
                <ellipse cx="23" cy="18" rx="9" ry="5" />
                <path d="M23 23 V44 M23 30 L14 38 M23 30 L32 38 M18 44 L18 58 M28 44 L28 58" />
                <path d="M15 58 h8 M25 58 h8" />
              </svg>
            </div>
            <div className="kfb-letter-body">
              <p>私はいま、師匠の畑で農業を学んでいます。プログラムも書きます。</p>
              <p>米を主軸に、地元の伝統野菜であるなす、それに季節の野菜をつくる畑です。</p>
              <p>人手が増えるほど、畑仕事より、日報と勤怠と記帳の紙仕事に夜がつぶれていました。</p>
              <p>現場は忙しい。パソコンは苦手。だから「話すだけ」にしました。</p>
              <p>まずこの畑でずっと使い、個人向けのアプリとして形にしました。</p>
              <p>その仕組みを、人を雇う農業法人のために作り直しているのが、これです。</p>
            </div>
            <p className="kfb-sign">コエファーム開発 ／ 米と伝統野菜の畑で修行中</p>
          </div>
        </div>
      </section>

      {/* ══ S6 正直なところ ══ */}
      <section className="kfb-section kfb-s6">
        <div className="kfb-wrap">
          <h2 className="kfb-tl-head kfb-reveal">正直に、いまの状態を書きます。</h2>
          <div className="kfb-honest kfb-reveal">
            <div className="kfb-honest-list">
              {[
                'まだ開発中です。だから、導入実績も、お客様の声も、受賞歴も、このページには載せていません。無いものは、書きません。',
                'いま募集しているのは、一緒に使いながら育ててくれる農業法人です。',
                '先行登録していただくと、この3つをお約束します。',
              ].map((txt, i) => (
                <div className="kfb-honest-item" key={i}>
                  <svg className="kfb-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M3 8.5 L6.5 12 L13 4" />
                  </svg>
                  <span>{txt}</span>
                </div>
              ))}
            </div>

            <div className="kfb-promises">
              <div className="kfb-promise">
                <span className="kfb-promise-no">1</span>
                <span className="kfb-promise-t"><b>できたら、まっさきにご案内します。</b></span>
              </div>
              <div className="kfb-promise">
                <span className="kfb-promise-no">2</span>
                <span className="kfb-promise-t">
                  <b>無償のパイロット参加枠<span className="kfb-badge">先着 数社</span></b>。 一緒に現場で試して、仕様に口を出せます。
                </span>
              </div>
              <div className="kfb-promise">
                <span className="kfb-promise-no">3</span>
                <span className="kfb-promise-t"><b>料金を、先にお知らせします。</b> 決めるのは、見てから。</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S7 フォーム ══ */}
      <section className="kfb-section kfb-s7" id="kfb-form">
        <div className="kfb-wrap">
          {status === 'done' ? (
            <div className="kfb-thanks" role="status" aria-live="polite">
              <div className="kfb-thanks-check">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 13.5 L11 19 L21 7" />
                </svg>
              </div>
              <p className="kfb-thanks-body">
                受け取りました。ありがとうございます。
                <br />
                できあがりに向けて、まっさきにご案内します。
                <span className="kfb-thanks-note">
                  （パイロット枠にチェックいただいた方へは、追って個別にご連絡します。）
                </span>
              </p>
            </div>
          ) : (
            <>
              <h2 className="kfb-tl-head kfb-reveal">先行登録する。</h2>
              <p className="kfb-form-lead kfb-reveal">
                メールアドレスだけで登録できます。経営体のことは、答えられる範囲で。あとからでも大丈夫。
              </p>

              <form className="kfb-form" onSubmit={handleSubmit} noValidate>
                {/* honeypot */}
                <div className="kfb-hp" aria-hidden="true">
                  <label>
                    ご記入不要
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </label>
                </div>

                <div className="kfb-field">
                  <label className="kfb-label" htmlFor="kfb-email">
                    メールアドレス<span className="kfb-req">必須</span>
                  </label>
                  <input
                    id="kfb-email"
                    className="kfb-input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="例）you@farm.jp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={emailErr ? 'true' : undefined}
                    aria-describedby="kfb-email-hint"
                  />
                  <span className="kfb-hint" id="kfb-email-hint">ご案内の送り先です</span>
                  {emailErr && <span className="kfb-fielderr" role="alert">{emailErr}</span>}
                </div>

                <div className="kfb-field">
                  <label className="kfb-label" htmlFor="kfb-name">
                    お名前（姓のみで可）<span className="kfb-opt">任意</span>
                  </label>
                  <input
                    id="kfb-name"
                    className="kfb-input"
                    type="text"
                    autoComplete="name"
                    placeholder="例）宮林"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    aria-describedby="kfb-name-hint"
                  />
                  <span className="kfb-hint" id="kfb-name-hint">呼びかけに使います</span>
                </div>

                <div className="kfb-field">
                  <label className="kfb-label" htmlFor="kfb-org">
                    経営体・屋号<span className="kfb-opt">任意</span>
                  </label>
                  <input
                    id="kfb-org"
                    className="kfb-input"
                    type="text"
                    autoComplete="organization"
                    placeholder="例）◯◯ファーム"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>

                <div className="kfb-field">
                  <label className="kfb-label" htmlFor="kfb-workers">
                    従業員の人数<span className="kfb-opt">任意</span>
                  </label>
                  <select
                    id="kfb-workers"
                    className="kfb-select"
                    value={workersBand}
                    onChange={(e) => setWorkersBand(e.target.value as '' | WorkersBand)}
                    aria-describedby="kfb-workers-hint"
                  >
                    <option value="">選択してください</option>
                    {WORKER_BANDS.map((b) => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                  <span className="kfb-hint" id="kfb-workers-hint">パート・実習生も含めて、だいたいで</span>
                </div>

                <div className="kfb-field">
                  <label className="kfb-label" htmlFor="kfb-crops">
                    主な品目<span className="kfb-opt">任意</span>
                  </label>
                  <input
                    id="kfb-crops"
                    className="kfb-input"
                    type="text"
                    maxLength={200}
                    placeholder="例）トマト、なす、水稲"
                    value={crops}
                    onChange={(e) => setCrops(e.target.value)}
                  />
                </div>

                <div className="kfb-field">
                  <label className="kfb-label" htmlFor="kfb-message">
                    いま一番の困りごと<span className="kfb-opt">任意</span>
                  </label>
                  <textarea
                    id="kfb-message"
                    className="kfb-textarea"
                    rows={3}
                    maxLength={1000}
                    placeholder="例）日報の書き写しがつらい／勤怠の集計が月末に地獄／原価がわからない"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <label className="kfb-checkrow">
                  <input
                    type="checkbox"
                    checked={wantsPilot}
                    onChange={(e) => setWantsPilot(e.target.checked)}
                  />
                  <span>無償パイロット枠に興味がある（一緒に現場で試したい方はチェックを）</span>
                </label>

                <label className={`kfb-checkrow${consentErr ? ' kfb-invalid' : ''}`}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked) setConsentErr(false);
                    }}
                    aria-invalid={consentErr ? 'true' : undefined}
                  />
                  <span>
                    <a href="https://koefarm.pages.dev/privacy" target="_blank" rel="noopener" style={{ color: 'var(--kf-green-d)', textDecoration: 'underline' }}>
                      プライバシーポリシー
                    </a>
                    に同意のうえ登録します
                  </span>
                </label>
                {consentErr && (
                  <span className="kfb-fielderr" role="alert">プライバシーポリシーへの同意が必要です</span>
                )}

                <button className="kfb-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? '送信中…' : 'この内容で先行登録する'}
                </button>
                {status === 'error' && (
                  <span className="kfb-formerr" role="alert">
                    送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。
                  </span>
                )}
                <p className="kfb-submit-note">
                  しつこい営業はしません。ご案内が要らなくなれば、メール1通で解除できます。
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ══ S8 フッター ══ */}
      <footer className="kfb-footer">
        <div className="kfb-wrap">
          <div className="kfb-footer-brand">コエファーム ／ 農業法人の、話す業務ソフト（開発中）</div>
          <div className="kfb-footer-links">
            <a href="https://koefarm.pages.dev/privacy">プライバシーポリシー</a>
            <a href="mailto:koyablog.1104@gmail.com">お問い合わせ</a>
            <a href="/koefarm/support/">個人向けアプリ「コエファーム」について</a>
          </div>
          <div className="kfb-footer-org">運営：みや小屋（宮林幸也）</div>
          <div className="kfb-footer-tag">声が、畑の肥（こえ）になる。</div>
        </div>
      </footer>
    </div>
  );
}
