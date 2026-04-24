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
    summary: '食材ECとB2B業務に対応したWebアプリ',
    excerpt: '会員機能、権限、決済、承認フロー、帳票出力まで含めて設計・実装しました。',
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
    excerpt: '収穫物の在庫管理、献立提案、料理記録までをつなぐiOSアプリです。',
    tags: ['SwiftUI', 'SwiftData', '家庭菜園', 'AI献立'],
    thumbnail: '/assets/media/toretabe/lp-capture.png',
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
    excerpt: 'トレーニング記録、成長グラフ、タイマーなどを備えた記録アプリです。',
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
    excerpt: '会社案内、事業内容、商品一覧、お知らせ、問い合わせ導線をWordPressで構築しました。',
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
