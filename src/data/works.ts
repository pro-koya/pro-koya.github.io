export interface Work {
  slug: string;
  title: string;
  category: 'web' | 'ios';
  categoryLabel: string;
  focusLabel: string;
  summary: string;
  excerpt: string;
  tags: string[];
  thumbnail: string;
  detailPath: string;
  featured: boolean;
  featuredOrder: number;
  categoryOrder: number;
}

export const WORKS: Work[] = [
  {
    slug: 'settsu-marche',
    title: 'セッツマルシェ',
    category: 'web',
    categoryLabel: 'Web App',
    focusLabel: '食材EC / B2B / 業務導線',
    summary: '食材EC + B2B業務要件まで含むプラットフォーム',
    excerpt: '会員機能、権限、決済、承認フロー、帳票までを含む、運用前提のWebアプリ構成です。',
    tags: ['Express 5', 'PostgreSQL', 'Stripe', 'WebAuthn'],
    thumbnail: '/assets/media/settsu-products.png',
    detailPath: '/case-studies/settsu-marche/',
    featured: true,
    featuredOrder: 1,
    categoryOrder: 1,
  },
  {
    slug: 'toretabe-app',
    title: 'とれたべ',
    category: 'ios',
    categoryLabel: 'iOS App',
    focusLabel: '収穫後UX / 家庭菜園 / AI提案',
    summary: '収穫後の迷いを軽くする家庭菜園アプリ',
    excerpt: '栽培、収穫、在庫、献立、使い切りまでをつなぎ、家庭菜園の「採れた」を毎日の食卓へ自然に結びつける体験です。',
    tags: ['SwiftUI', 'SwiftData', '家庭菜園', 'AI献立'],
    thumbnail: '/assets/media/toretabe/cover.png',
    detailPath: '/case-studies/toretabe-app/',
    featured: true,
    featuredOrder: 2,
    categoryOrder: 1,
  },
  {
    slug: 'liftly-app',
    title: 'Liftly',
    category: 'ios',
    categoryLabel: 'iOS App',
    focusLabel: '継続体験 / 記録UI / モバイル設計',
    summary: '継続しやすい筋トレ記録アプリ',
    excerpt: '入力しやすさ、成長グラフ、タイマーなど、日々の継続を支える体験を整理して作ったアプリです。',
    tags: ['Flutter', '記録体験', '成長グラフ', 'App Store'],
    thumbnail: '/assets/media/liftly-page.png',
    detailPath: '/case-studies/liftly-app/',
    featured: true,
    featuredOrder: 3,
    categoryOrder: 2,
  },
  {
    slug: 'kusahachi-corporate-site',
    title: '草八興業株式会社',
    category: 'web',
    categoryLabel: 'Web Site',
    focusLabel: '企業サイト / CMS / 情報整理',
    summary: 'WordPressで構築した製造業コーポレートサイト',
    excerpt: '事業内容、商品一覧、お知らせ、問い合わせ導線までを、更新しやすい形で整理した企業サイトです。',
    tags: ['WordPress', 'カスタムテーマ', 'Contact Form 7', '投稿運用'],
    thumbnail: '/assets/media/kouban-home.png',
    detailPath: '/case-studies/kusahachi-corporate-site/',
    featured: true,
    featuredOrder: 4,
    categoryOrder: 2,
  },
];

export function getFeaturedWorks(): Work[] {
  return [...WORKS]
    .filter((w) => w.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getWorksByCategory(category: Work['category']): Work[] {
  return [...WORKS]
    .filter((w) => w.category === category)
    .sort((a, b) => a.categoryOrder - b.categoryOrder);
}
