export type WorkKind = 'personal' | 'client' | 'hybrid';

export interface Work {
  readonly slug: string;
  readonly title: string;
  readonly en: string;
  readonly tag: string;
  readonly description: string;
  readonly body: string;
  readonly year: string;
  readonly no: string;
  readonly detailPath: string;
  readonly category: 'web' | 'ios';
  readonly kind: WorkKind;
  readonly variant: '' | 'dark' | 'green';
  readonly categoryLabel: string;
  readonly focusLabel: string;
  readonly summary: string;
  readonly excerpt: string;
  readonly tags: readonly string[];
  readonly thumbnail: string;
}

// 一覧から一時的に非表示にしたい slug を入れる。
// サーバー復旧などで再公開する場合はここから slug を取り除くだけで戻る。
const HIDDEN_WORK_SLUGS = new Set<string>(['kusahachi-corporate-site']);

const ALL_WORKS: readonly Work[] = [
  {
    slug: 'toretabe-app',
    title: 'とれたべ',
    en: 'TORETABE',
    tag: 'FOOD · APP',
    description: '家庭菜園の収穫を、食べるところまでつなげるアプリ。',
    body: '収穫した野菜をどう使うか迷う体験から作りました。記録、在庫管理、献立提案、料理記録を通して、育てる楽しさを食べる楽しさにつなげます。',
    year: '2026',
    no: '01',
    detailPath: '/case-studies/toretabe-app/',
    category: 'ios',
    kind: 'personal',
    variant: '',
    categoryLabel: 'iOS App',
    focusLabel: '収穫後UX / 家庭菜園 / AI提案',
    summary: '収穫後の迷いを軽くする家庭菜園アプリ',
    excerpt: '収穫物の在庫管理、献立提案、料理記録までをつなぐiOSアプリです。',
    tags: ['SwiftUI', 'SwiftData', '家庭菜園', 'AI献立'],
    thumbnail: '/assets/media/toretabe/lp-capture.png',
  },
  {
    slug: 'liftly-app',
    title: 'Liftly',
    en: 'LIFTLY',
    tag: 'FITNESS · APP',
    description: '筋トレの積み重ねを見える化する記録アプリ。',
    body: '身体の変化や日々の努力を、自然に残せるように作りました。トレーニング記録、グラフ、タイマーなどを備えています。',
    year: '2026',
    no: '02',
    detailPath: '/case-studies/liftly-app/',
    category: 'ios',
    kind: 'personal',
    variant: 'dark',
    categoryLabel: 'iOS App',
    focusLabel: '継続体験 / 記録UI / モバイル設計',
    summary: '継続しやすい筋トレ記録アプリ',
    excerpt: 'トレーニング記録、成長グラフ、タイマーなどを備えた記録アプリです。',
    tags: ['Flutter', '記録体験', '成長グラフ', 'App Store'],
    thumbnail: '/assets/media/liftly-page.png',
  },
  {
    slug: 'settsu-marche',
    title: 'セッツマルシェ',
    en: 'SETTSU MARCHE',
    tag: 'LOCAL · WEB',
    description: '地域の食材を届けるためのWebサービス。',
    body: '小さな生産者や地域の食材を、必要とする人につなげるために作りました。食材EC、会員機能、承認フロー、決済、帳票出力などを実装しています。',
    year: '2026',
    no: '03',
    detailPath: '/case-studies/settsu-marche/',
    category: 'web',
    kind: 'client',
    variant: 'green',
    categoryLabel: 'Web App',
    focusLabel: '食材EC / B2B / 業務導線',
    summary: '食材ECとB2B業務に対応したWebアプリ',
    excerpt: '会員機能、権限、決済、承認フロー、帳票出力まで含めて設計・実装しました。',
    tags: ['Express 5', 'PostgreSQL', 'Stripe', 'WebAuthn'],
    thumbnail: '/assets/media/settsu-products.png',
  },
  {
    slug: 'sorrygains-app',
    title: '筋肉ごめん',
    en: 'SORRY GAINS',
    tag: 'FITNESS · APP',
    description: '飲んだら筋肉に謝る、エンタメ系の飲酒記録アプリ。',
    body: '飲酒量に応じて筋肉キャラの怒りが変化する記録アプリ。簡単な入力、筋トレ仙人の一言、翌日のリカバリー行動までを通して、続けたい気持ちを折らずに振り返りを促します。',
    year: '2026',
    no: '04',
    detailPath: '/case-studies/sorrygains-app/',
    category: 'ios',
    kind: 'personal',
    variant: 'dark',
    categoryLabel: 'iOS App',
    focusLabel: '飲酒記録 / キャラクター演出 / リカバリーUX',
    summary: '飲酒量で怒るキャラが伴走するエンタメ系記録アプリ',
    excerpt: '怒りレベル5段階のキャラクター、筋トレ仙人、翌日リカバリーまでを備えたiOSアプリです。',
    tags: ['SwiftUI', 'Supabase', 'AdMob', 'キャラクター演出'],
    thumbnail: '/assets/media/sorrygains/home-lv3.png',
  },
  {
    slug: 'forge-app',
    title: 'Forge',
    en: 'FORGE',
    tag: 'FITNESS · APP',
    description: 'CrossFitとHyroxの記録を、タイマーからつなげるアプリ。',
    body: 'WODタイマー、Hyroxスプリット、PR判定、履歴管理までを一つにまとめました。追い込んだ直後でも迷わず残せるように、黒、数字、紅を軸にした硬派な記録体験として設計しています。',
    year: '2026',
    no: '05',
    detailPath: '/case-studies/forge-app/',
    category: 'ios',
    kind: 'personal',
    variant: 'dark',
    categoryLabel: 'iOS App',
    focusLabel: 'WOD記録 / Hyrox / タイマーUX',
    summary: 'CrossFitとHyroxに特化したトレーニング記録アプリ',
    excerpt: 'タイマー終了から結果保存へつなげ、WOD、Hyrox、PR、Roxzoneまで記録できるiOSアプリです。',
    tags: ['SwiftUI', 'Supabase', 'StoreKit2', 'Hyrox'],
    thumbnail: '/assets/media/forge/forge-1-home.webp',
  },
  {
    slug: 'kusahachi-corporate-site',
    title: '草八興業株式会社',
    en: 'SOHACHI INC.',
    tag: 'CORPORATE',
    description: '会社の魅力を伝えるコーポレートサイト。',
    body: '事業内容や人柄が伝わるように、シンプルで信頼感のある構成を意識して制作しました。',
    year: '2026',
    no: '06',
    detailPath: '/case-studies/kusahachi-corporate-site/',
    category: 'web',
    kind: 'client',
    variant: '',
    categoryLabel: 'Web Site',
    focusLabel: '企業サイト / CMS / 情報整理',
    summary: 'WordPressで構築した製造業コーポレートサイト',
    excerpt: '会社案内、事業内容、商品一覧、お知らせ、問い合わせ導線をWordPressで構築しました。',
    tags: ['WordPress', 'カスタムテーマ', 'Contact Form 7', '投稿運用'],
    thumbnail: '/assets/media/kouban-home.png',
  },
] as const;

export const WORKS: readonly Work[] = ALL_WORKS.filter(
  (w) => !HIDDEN_WORK_SLUGS.has(w.slug),
);

export function getFeaturedWorks(): readonly Work[] {
  return WORKS;
}

export function getWorksByCategory(category: Work['category']): readonly Work[] {
  return WORKS.filter((w) => w.category === category);
}

export function getWorksByKind(kind: WorkKind): readonly Work[] {
  return WORKS.filter((w) => w.kind === kind);
}
