import type { Metadata } from 'next';
import { TransitionLink as Link } from '@/components/TransitionLink';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import { WORKS } from '@/data/works';

export const metadata: Metadata = {
  title: 'Build | Miyabayasi Koya',
  description:
    '業務改善・自動化・AI活用支援。紙・Excel・LINEで回している業務から、既存システムの使いにくさ、AI導入の入り口まで。現場の流れを整理し、続けやすい形に整えます。',
};

const TARGETS = [
  {
    n: '01',
    en: 'Paper & Excel',
    jp: '紙・Excel・LINEで回している業務',
    items: [
      '入力や転記の手作業が多い',
      '受注、予約、問い合わせ、在庫を紙やExcelで管理している',
      '情報がスタッフ間で共有しづらい',
      '欲しい集計が、すぐに出せない',
    ],
  },
  {
    n: '02',
    en: 'Existing System',
    jp: '既存システムに使いにくさがある',
    items: [
      '現場がシステムを使わず、Excelと二重管理になっている',
      '改修したいが、社内で手が回らない',
      'ベンダーに頼むと、高い・遅い・伝わらない',
      '部分的に直したいが、全体が分かる人がいない',
    ],
  },
  {
    n: '03',
    en: 'AI Adoption',
    jp: 'AIを業務に取り入れたい',
    items: [
      '何から始めればいいか、分からない',
      'ChatGPTを試したが、業務に定着しない',
      '文章作成、議事録、問い合わせ対応を効率化したい',
      '既存業務と、AIをどうつなぐか分からない',
    ],
  },
] as const;

const HOW_STEPS = [
  {
    n: '01',
    en: 'OBSERVE',
    title: '聞いて、見にいく',
    body:
      'まずは話を聞きに行きます。実際の作業、画面、現場の人に直接当たり、いまの流れと詰まりをヒアリングします。',
    outcome: '現場メモ / 課題の整理',
    timing: '1〜2週間',
  },
  {
    n: '02',
    en: 'ALIGN',
    title: 'すり合わせる',
    body:
      '何から手をつけて、どんな順番で進めるか、一緒に決めていきます。範囲はある程度固めたうえで、進めながら相談して、柔軟に調整します。費用感も、その都度すり合わせます。',
    outcome: '進め方の方針 / 費用感',
    timing: '1〜2週間',
  },
  {
    n: '03',
    en: 'BUILD',
    title: '早く出して、現場で直す',
    body:
      'まず動くものを出します。現場で触ってもらいながら、毎週単位で直していく。完成品を最後にまとめて渡すのではなく、途中段階を一緒に確認しながら、ずれなく進めます。',
    outcome: 'プロトタイプ → 本実装',
    timing: '4〜12週間',
  },
  {
    n: '04',
    en: 'OPERATE',
    title: '渡して、終わりにしない',
    body:
      '導入したあとの調整、現場からの質問対応、改修まで一緒に動きます。社内で運用できる状態に整えて、伴走します。',
    outcome: '運用サポート / 改善対応',
    timing: '月次（任意）',
  },
] as const;

const PRICING = [
  {
    n: '01',
    name: '相談・現場ヒアリング',
    body: 'まず話を聞き、課題と進め方の見立てを共有します。',
    fee: '初回 無料',
  },
  {
    n: '02',
    name: '業務整理・要件まとめ',
    body: '現場の流れを整理し、何を作るか/作らないかを決めます。',
    fee: '¥80,000〜',
  },
  {
    n: '03',
    name: 'システム構築・自動化・AI導入',
    body: 'Webシステム、業務ツール、自動化、AI活用までを実装します。',
    fee: '¥300,000〜（規模に応じて）',
  },
  {
    n: '04',
    name: '運用・改善のサポート',
    body: '導入後の調整、改修、現場の問い合わせ対応など。',
    fee: '月額 ¥30,000〜',
  },
] as const;

const FEATURED_EXAMPLES_SLUGS = ['settsu-marche', 'toretabe-app'] as const;
const EXAMPLES = WORKS.filter((w) =>
  (FEATURED_EXAMPLES_SLUGS as readonly string[]).includes(w.slug),
);

export default function BuildPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="sec-hero">
          <div className="sec-header">
            <div className="eyebrow">Build — Service</div>
            <div
              className="number"
              style={{
                fontSize: 11,
                color: 'var(--ink-3)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              業務改善 / 自動化 / AI活用
            </div>
          </div>
          <h1 className="display page-title" style={{ marginTop: 24 }}>BUILD</h1>
          <div className="grid-4-8" style={{ marginTop: 32 }}>
            <h2 className="display build-page-subtitle">
              現場の面倒を、<br />仕組みに変える。
            </h2>
            <p className="build-page-lead">
              紙・Excel・LINE・口頭でなんとか回している業務から、<br />
              既存システムの使いにくさ、手作業の多さ、情報共有のしづらさまで。<br />
              現場の流れを整理し、Webシステム、業務改善、自動化、AI活用で、<br />
              日々の仕事を続けやすい形に整えます。
            </p>
          </div>
        </section>

        {/* Intent */}
        <section className="sec-main grid-5-7">
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 22 }}>02 — Intent</div>
            <h2 className="display build-intent-title">
              作ることが、<br />ゴールではない。
            </h2>
          </div>
          <div className="reveal delay-1">
            <p className="build-intent-body" style={{ marginBottom: '1.4em' }}>
              ツールを入れただけでは、現場は変わりません。書類が画面に置き換わるだけだと、入力の手間と二重管理が増えるだけになる。
            </p>
            <p className="build-intent-body">
              現場の人が、自分の仕事として使い続けられる形まで整える。そこを軸に、設計と実装、運用まで一貫して伴走します。
            </p>
            <p className="build-intent-quote">
              作って終わりではなく、<br />
              現場で使われ続ける形に整える。
            </p>
          </div>
        </section>

        <div className="rule-strong" />

        {/* For Whom */}
        <section className="sec-main">
          <div className="reveal sec-header" style={{ marginBottom: 60 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>03 — For Whom</div>
              <h2
                className="display"
                style={{ fontSize: 'clamp(36px, 6.8vw, 88px)', lineHeight: 1 }}
              >
                こんな相談
              </h2>
            </div>
            <p
              className="works-page-desc"
              style={{ alignSelf: 'end' }}
            >
              地域の事業者、小さなチーム、ひとり事業の方まで。<br />
              業種や規模より、現場の手触りに合わせて進めます。
            </p>
          </div>
          <div className="build-target-list">
            {TARGETS.map((t) => (
              <div key={t.n} className="reveal build-target-row">
                <div
                  className="number"
                  style={{ fontSize: 13, color: 'var(--ink-3)' }}
                >
                  {t.n}
                </div>
                <div>
                  <div className="build-target-name">{t.en}</div>
                  <div className="build-target-name-jp">{t.jp}</div>
                </div>
                <ul className="build-target-items">
                  {t.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How */}
        <section className="sec-main build-how-section">
          <div className="reveal sec-header build-how-head" style={{ marginBottom: 64 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>04 — How</div>
              <h2 className="display build-how-title">進め方</h2>
            </div>
            <p className="works-page-desc build-how-lead" style={{ alignSelf: 'end' }}>
              いきなり作りません。<br />
              聞いて、すり合わせて、出して、運用まで。<br />
              ラフに進められる形を、ご一緒します。
            </p>
          </div>

          <ol className="build-how-flow reveal delay-1">
            {HOW_STEPS.map((s) => (
              <li key={s.n} className="build-how-row">
                <div className="number build-how-row-num">{s.n}</div>
                <div className="build-how-row-headcol">
                  <div className="build-how-row-en">{s.en}</div>
                  <div className="build-how-row-title">{s.title}</div>
                </div>
                <div className="build-how-row-bodycol">
                  <p className="build-how-row-body">{s.body}</p>
                  <dl className="build-how-row-meta">
                    <div>
                      <dt>Outcome</dt>
                      <dd>{s.outcome}</dd>
                    </div>
                    <div>
                      <dt>Timing</dt>
                      <dd>{s.timing}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>

          <p className="build-how-footnote">
            ※ 期間は、規模や関係者の数によって前後します。<br />
            ※ 範囲は最初にある程度合意したうえで、進めながら相談ベースで調整します。
          </p>
        </section>

        {/* Examples */}
        <section className="sec-main">
          <div className="reveal sec-header" style={{ marginBottom: 60 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>05 — Examples</div>
              <h2
                className="display"
                style={{ fontSize: 'clamp(36px, 6.8vw, 88px)', lineHeight: 1 }}
              >
                関連する事例
              </h2>
            </div>
            <Link href="/works" className="btn">
              すべてのWorks <span className="arrow" />
            </Link>
          </div>
          <div className="grid-2col">
            {EXAMPLES.map((w) => (
              <Link
                key={w.slug}
                href={w.detailPath}
                className="reveal"
                style={{ display: 'block' }}
              >
                <div className="work-card-img-wrap">
                  <img src={w.thumbnail} alt={w.title} className="work-card-thumb" />
                  <div className="work-card-img-overlay">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        fontFamily: 'var(--f-mono)',
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        color: 'rgba(244,241,234,0.75)',
                      }}
                    >
                      <span>N°{w.no} / {w.tag}</span>
                      <span>{w.year}</span>
                    </div>
                    <div className="work-card-en" style={{ color: 'var(--paper)' }}>
                      {w.en}
                    </div>
                  </div>
                </div>
                <div className="work-card-info">
                  <div>
                    <div className="work-card-title">{w.title}</div>
                    <div className="work-card-desc">{w.description}</div>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: 11,
                      letterSpacing: '0.22em',
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="sec-main">
          <div className="reveal sec-header" style={{ marginBottom: 48 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>06 — Pricing</div>
              <h2
                className="display"
                style={{ fontSize: 'clamp(32px, 5.6vw, 72px)', lineHeight: 1 }}
              >
                費用の目安
              </h2>
            </div>
            <p className="works-page-desc" style={{ alignSelf: 'end' }}>
              内容と規模で変わるため、まずは相談から。<br />
              段階的に進められる形をご提案します。
            </p>
          </div>
          <div>
            {PRICING.map((p) => (
              <div key={p.n} className="reveal build-pricing-row">
                <div
                  className="number"
                  style={{ fontSize: 13, color: 'var(--ink-3)' }}
                >
                  {p.n}
                </div>
                <div className="build-pricing-name">{p.name}</div>
                <div className="build-pricing-body">{p.body}</div>
                <div className="build-pricing-fee">{p.fee}</div>
              </div>
            ))}
          </div>
          <p className="build-pricing-note">
            ※ 金額は目安です。範囲と進め方を相談したうえで、見積もりをお出しします。<br />
            ※ 自治体・地域事業者の継続支援については、別途調整します。
          </p>
        </section>

        {/* CTA */}
        <section className="sec-preview" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
          <div className="reveal grid-6-6">
            <div>
              <div
                className="eyebrow"
                style={{ marginBottom: 14, color: 'rgba(244,241,234,0.55)' }}
              >
                07 — Contact
              </div>
              <h2
                className="display"
                style={{
                  fontSize: 'clamp(36px, 6.5vw, 84px)',
                  marginBottom: 24,
                  lineHeight: 1.0,
                }}
              >
                まず、<br />話を聞かせてください。
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 2.0,
                  color: 'rgba(244,241,234,0.78)',
                  maxWidth: 480,
                }}
              >
                初回のヒアリングは無料です。<br />
                いまの困りごとを、整理するところから一緒にやります。
              </p>
            </div>
            <div className="contact-cta-col">
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link
                  href="/booking"
                  className="btn btn-fill"
                  style={{
                    padding: '20px 32px',
                    fontSize: 13,
                    background: 'var(--paper)',
                    color: 'var(--ink)',
                    borderColor: 'var(--paper)',
                  }}
                >
                  日程を予約する <span className="arrow" />
                </Link>
                <Link
                  href="/contact?topic=build"
                  className="btn"
                  style={{
                    padding: '20px 32px',
                    fontSize: 13,
                    color: 'var(--paper)',
                    borderColor: 'var(--paper)',
                  }}
                >
                  相談する <span className="arrow" />
                </Link>
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 11,
                  letterSpacing: '0.24em',
                  color: 'rgba(244,241,234,0.55)',
                  textTransform: 'uppercase',
                }}
              >
                返信 24〜48h 以内
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
