export interface CaseStudyCredit {
  readonly role: string;
  readonly name: string;
}

export interface CaseStudyMeta {
  readonly k: string;
  readonly v: string;
}

export interface CaseStudyPanel {
  readonly n: string;
  readonly label: string;
  readonly bg: '' | 'dark' | 'green';
  readonly caption: string;
  readonly image?: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly en: string;
  readonly no: string;
  readonly oneline: string;
  readonly problemTitle: string;
  readonly problemTitleItalic: string;
  readonly problem: string;
  readonly approachTitle: string;
  readonly approachTitleItalic: string;
  readonly approach: string;
  readonly creditsTitle: string;
  readonly credits: readonly CaseStudyCredit[];
  readonly meta: readonly CaseStudyMeta[];
  readonly panels: readonly CaseStudyPanel[];
  readonly next: { readonly slug: string; readonly en: string; readonly no: string; readonly subtitle: string };
  readonly links?: readonly { readonly label: string; readonly href: string; readonly external?: boolean }[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'toretabe-app': {
    slug: 'toretabe-app',
    title: 'とれたべ',
    en: 'TORETABE',
    no: '01',
    oneline: '家庭菜園の収穫を、食べるところまでつなげるアプリ。',
    problemTitle: '育てる楽しさと、食べる満足の',
    problemTitleItalic: '間。',
    problem:
      '家庭菜園では、せっかく育てた野菜の食べきれない量が出たり、いつ収穫したかを忘れて鮮度を落としてしまうことがある。育てる楽しさと食べる満足の間に、見えないギャップがある。',
    approachTitle: '判断は人に。道具は',
    approachTitleItalic: '道具のままで。',
    approach:
      '収穫した日と量を、写真とともに気軽に記録できるアプリ。レシピの提案ではなく「今あるもの」と「いつ採れたか」を一覧で並べることに集中した。判断は使う人にまかせる、シンプルな道具を目指した。',
    creditsTitle: 'つくった人と道具。',
    credits: [
      { role: 'Concept / Design / Development', name: 'Miyabayasi Koya' },
      { role: 'Photography', name: 'Self-shot · 自家菜園' },
      { role: 'Stack', name: 'React Native · Supabase' },
    ],
    meta: [
      { k: 'YEAR', v: '2026' },
      { k: 'ROLE', v: 'Solo' },
      { k: 'STATUS', v: 'In Use' },
      { k: 'DOMAIN', v: 'Food / App' },
    ],
    panels: [
      { n: '00', label: 'Hero', bg: 'dark', caption: 'HARVEST · MIDDAY', image: '/assets/media/toretabe/cover.png' },
      { n: '01', label: 'Problem', bg: 'green', caption: 'BASKET · OVERFLOW', image: '/assets/media/toretabe/crops.png' },
      { n: '02', label: 'Approach', bg: '', caption: 'UI · MAIN LOG SCREEN', image: '/assets/media/toretabe/home.png' },
      { n: '03', label: 'Credits', bg: 'dark', caption: 'DESK · BUILD NOTES', image: '/assets/media/toretabe/meal-ai.png' },
    ],
    links: [
      { label: 'Landing Page', href: '/toretabe/' },
    ],
    next: { slug: 'liftly-app', en: 'LIFTLY', no: '02', subtitle: '筋トレの積み重ねを見える化する' },
  },
  'liftly-app': {
    slug: 'liftly-app',
    title: 'Liftly',
    en: 'LIFTLY',
    no: '02',
    oneline: '筋トレの積み重ねを見える化する記録アプリ。',
    problemTitle: '続けているのに、',
    problemTitleItalic: '見えない。',
    problem:
      '筋トレは続けていても、日々の変化が小さくて成長を実感しにくい。記録しても見返す習慣がなく、モチベーションの波に飲まれてしまうことがある。',
    approachTitle: '積み重ねを、',
    approachTitleItalic: '目に見える形に。',
    approach:
      '身体の変化や日々の努力を、自然に残せるように作った記録アプリ。トレーニング記録、成長グラフ、タイマーなどを備え、続けること自体が楽しくなる体験を目指した。',
    creditsTitle: 'つくった人と道具。',
    credits: [
      { role: 'Concept / Design / Development', name: 'Miyabayasi Koya' },
      { role: 'Photography', name: 'Self-shot · ジム' },
      { role: 'Stack', name: 'Flutter · Supabase' },
    ],
    meta: [
      { k: 'YEAR', v: '2026' },
      { k: 'ROLE', v: 'Solo' },
      { k: 'STATUS', v: 'In Use' },
      { k: 'DOMAIN', v: 'Fitness / App' },
    ],
    panels: [
      { n: '00', label: 'Hero', bg: 'dark', caption: 'GYM · MORNING', image: '/assets/media/liftly-page.png' },
      { n: '01', label: 'Problem', bg: '', caption: 'NOTEBOOK · BLANK', image: '/assets/media/liftly-icon.png' },
      { n: '02', label: 'Approach', bg: 'green', caption: 'UI · DASHBOARD', image: '/assets/media/liftly-page.png' },
      { n: '03', label: 'Credits', bg: 'dark', caption: 'DESK · PROTOTYPE', image: '/assets/media/liftly-icon.png' },
    ],
    links: [
      { label: 'Landing Page', href: '/liftly/' },
      { label: 'App Store', href: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075', external: true },
    ],
    next: { slug: 'settsu-marche', en: 'SETTSU MARCHE', no: '03', subtitle: '地域の食材を届けるWebサービス' },
  },
  'settsu-marche': {
    slug: 'settsu-marche',
    title: 'セッツマルシェ',
    en: 'SETTSU MARCHE',
    no: '03',
    oneline: '地域の食材を届けるためのWebサービス。',
    problemTitle: '届けたいのに、',
    problemTitleItalic: '届かない。',
    problem:
      '小さな生産者がつくる良い食材が、流通の仕組みに乗れず、必要とする人に届いていない。地域の食を支える仕組みが足りていなかった。',
    approachTitle: 'つくる人と食べる人を、',
    approachTitleItalic: 'つなぐ仕組み。',
    approach:
      '小さな生産者や地域の食材を、必要とする人につなげるために作ったWebサービス。食材EC、会員機能、承認フロー、決済、帳票出力などを実装し、運用まで伴走した。',
    creditsTitle: 'つくった人と道具。',
    credits: [
      { role: 'Design / Development', name: 'Miyabayasi Koya' },
      { role: 'Photography', name: 'クライアント提供' },
      { role: 'Stack', name: 'Express · PostgreSQL · Stripe' },
    ],
    meta: [
      { k: 'YEAR', v: '2026' },
      { k: 'ROLE', v: 'Lead' },
      { k: 'STATUS', v: 'In Use' },
      { k: 'DOMAIN', v: 'Local / Web' },
    ],
    panels: [
      { n: '00', label: 'Hero', bg: 'green', caption: 'MARKET · PRODUCE', image: '/assets/media/settsu-products.png' },
      { n: '01', label: 'Problem', bg: 'dark', caption: 'FARM · UNSOLD', image: '/assets/media/settsu-home.png' },
      { n: '02', label: 'Approach', bg: '', caption: 'UI · ORDER FLOW', image: '/assets/media/settsu-order-detail.png' },
      { n: '03', label: 'Credits', bg: 'dark', caption: 'DESK · SYSTEM MAP', image: '/assets/media/settsu-products.png' },
    ],
    links: [{ label: 'SITE', href: 'https://settsu-marche.onrender.com/' }],
    next: { slug: 'sorrygains-app', en: 'SORRY GAINS', no: '04', subtitle: '飲んだら筋肉に謝るエンタメ系飲酒記録アプリ' },
  },
  'sorrygains-app': {
    slug: 'sorrygains-app',
    title: '筋肉ごめん',
    en: 'SORRY GAINS',
    no: '04',
    oneline: '飲んだら筋肉に謝る、エンタメ系の飲酒記録アプリ。',
    problemTitle: '筋トレも、飲み会も、',
    problemTitleItalic: '断れない。',
    problem:
      '筋トレを続けているのに、つい飲んでしまう。健康管理アプリは説教くさく、飲酒記録は罪悪感ばかりが残る。続けたい気持ちを折らずに、自分の飲み方と向き合える場所がなかった。',
    approachTitle: '説教はしない。',
    approachTitleItalic: '見なかったことにもしない。',
    approach:
      '飲酒量に応じて筋肉キャラの怒りレベルが5段階で変化する記録アプリ。10秒で終わるシンプルな入力、筋トレ仙人からの一言、翌日のリカバリー行動までを設計し、罪悪感ではなく演出と言葉で飲み方の振り返りを促した。',
    creditsTitle: 'つくった人と道具。',
    credits: [
      { role: 'Concept / Design / Development', name: 'Miyabayasi Koya' },
      { role: 'Character', name: 'Self-directed illustration' },
      { role: 'Stack', name: 'SwiftUI · Supabase · AdMob' },
    ],
    meta: [
      { k: 'YEAR', v: '2026' },
      { k: 'ROLE', v: 'Solo' },
      { k: 'STATUS', v: 'Released' },
      { k: 'DOMAIN', v: 'Fitness / App' },
    ],
    panels: [
      { n: '00', label: 'Hero', bg: 'dark', caption: 'CHARACTER · ANGER LV.1', image: '/assets/media/sorrygains/home-lv1.png' },
      { n: '01', label: 'Problem', bg: 'dark', caption: 'CHARACTER · ANGER LV.5', image: '/assets/media/sorrygains/home-lv5.png' },
      { n: '02', label: 'Approach', bg: 'dark', caption: 'UI · DRINK INPUT', image: '/assets/media/sorrygains/input.png' },
      { n: '03', label: 'Credits', bg: 'dark', caption: 'CHARACTER · SAGE', image: '/assets/media/sorrygains/sage-screen.png' },
    ],
    links: [
      { label: 'Landing Page', href: '/sorrygains/' },
      { label: 'App Store', href: 'https://apps.apple.com/app/id6763986050', external: true },
    ],
    next: { slug: 'forge-app', en: 'FORGE', no: '05', subtitle: 'CrossFitとHyroxの記録をタイマーからつなげる' },
  },
  'forge-app': {
    slug: 'forge-app',
    title: 'Forge',
    en: 'FORGE',
    no: '05',
    oneline: 'CrossFitとHyroxの記録を、タイマーからつなげるアプリ。',
    problemTitle: '追い込んだ直後に、',
    problemTitleItalic: '記録が途切れる。',
    problem:
      'CrossFitやHyroxでは、タイマー、WODの結果、スプリット、PRが別々の場所に散らばりやすい。トレーニング直後の疲れているタイミングほど入力は面倒になり、せっかくの記録が残らない。',
    approachTitle: '止めた瞬間から、',
    approachTitleItalic: '保存まで。',
    approach:
      'タイマー終了から結果入力へ自然につなげ、AMRAP、EMOM、For Time、Tabata、Hyroxレースを一つの履歴にまとめた。Run、Station、Roxzoneの分割やPR判定まで扱い、次の練習で削る場所が見える設計にした。',
    creditsTitle: 'つくった人と道具。',
    credits: [
      { role: 'Concept / Design / Development', name: 'Miyabayasi Koya' },
      { role: 'Product', name: 'Muscle360 · Forge' },
      { role: 'Stack', name: 'SwiftUI · Supabase · StoreKit2' },
    ],
    meta: [
      { k: 'YEAR', v: '2026' },
      { k: 'ROLE', v: 'Solo' },
      { k: 'STATUS', v: 'Released' },
      { k: 'DOMAIN', v: 'Fitness / App' },
    ],
    panels: [
      { n: '00', label: 'Hero', bg: 'dark', caption: 'UI · FORGE HOME', image: '/assets/media/forge/forge-1-home.webp' },
      { n: '01', label: 'Problem', bg: 'dark', caption: 'TIMER · WOD SESSION', image: '/assets/media/forge/forge-2-timer.webp' },
      { n: '02', label: 'Approach', bg: 'dark', caption: 'HYROX · SPLIT LOG', image: '/assets/media/forge/forge-3-hyrox.webp' },
      { n: '03', label: 'Credits', bg: 'dark', caption: 'PROGRESS · TRAINING GRAPH', image: '/assets/media/forge/forge-4-graph.webp' },
    ],
    links: [
      { label: 'Landing Page', href: '/forge/' },
      { label: 'App Store', href: 'https://apps.apple.com/app/id6766134975', external: true },
    ],
    next: { slug: 'dogwalk-app', en: 'DOGWALK', no: '07', subtitle: '毎日の散歩を愛犬の健康記録に変える' },
  },
  'dogwalk-app': {
    slug: 'dogwalk-app',
    title: 'DogWalk',
    en: 'DOGWALK',
    no: '07',
    oneline: '毎日の散歩が、うちの子の健康記録になるアプリ。',
    problemTitle: '犬は不調を、',
    problemTitleItalic: '言葉にできない。',
    problem:
      '犬は体調の変化を言葉で伝えられない。歩いた距離、うんちの状態、水を飲んだ回数——毎日の散歩には健康のサインが詰まっているのに、リードを持つ手はふさがっていて、その場で残すのは難しかった。',
    approachTitle: 'リードを持つ手を、',
    approachTitleItalic: '止めないで。',
    approach:
      '開始ボタンひとつでGPSがルートと距離を自動記録し、うんちや水分はワンタップ、または声で残せるようにした。記録はすべて端末内に保存。続けるほど、直近90日の運動量と健康ログを獣医さんに見せられるPDFになる、散歩のための健康記録アプリ。',
    creditsTitle: 'つくった人と道具。',
    credits: [
      { role: 'Concept / Design / Development', name: 'Miyabayasi Koya' },
      { role: 'Product', name: '自社プロダクト · 犬版Strava' },
      { role: 'Stack', name: 'Flutter · Drift · Riverpod' },
    ],
    meta: [
      { k: 'YEAR', v: '2026' },
      { k: 'ROLE', v: 'Solo' },
      { k: 'STATUS', v: 'Released' },
      { k: 'DOMAIN', v: 'Pet / App' },
    ],
    panels: [
      { n: '00', label: 'Hero', bg: 'green', caption: 'UI · HOME & STREAK', image: '/assets/media/dogwalk/shot-home.png' },
      { n: '01', label: 'Problem', bg: '', caption: 'WALK · ROUTE TRACKING', image: '/assets/media/dogwalk/shot-walk.png' },
      { n: '02', label: 'Approach', bg: 'green', caption: 'UI · WALK DETAIL', image: '/assets/media/dogwalk/shot-detail.png' },
      { n: '03', label: 'Credits', bg: 'dark', caption: 'STATS · STREAK & GRAPH', image: '/assets/media/dogwalk/shot-stats.png' },
    ],
    links: [
      { label: 'Landing Page', href: '/dogwalk/' },
      { label: 'App Store', href: 'https://apps.apple.com/app/id6780091967', external: true },
    ],
    next: { slug: 'toretabe-app', en: 'TORETABE', no: '01', subtitle: '家庭菜園の収穫を食卓へつなげる' },
  },
  'kusahachi-corporate-site': {
    slug: 'kusahachi-corporate-site',
    title: '草八興業株式会社',
    en: 'SOHACHI INC.',
    no: '06',
    oneline: '会社の魅力を伝えるコーポレートサイト。',
    problemTitle: '実力はあるのに、',
    problemTitleItalic: '伝わらない。',
    problem:
      '長年の実績と信頼がある会社なのに、Webでの情報発信が追いついていなかった。事業内容や人柄が外から見えにくく、新しい取引先との接点が限られていた。',
    approachTitle: '信頼を、',
    approachTitleItalic: 'そのまま形に。',
    approach:
      '事業内容や人柄が伝わるように、シンプルで信頼感のある構成を意識して制作した。WordPressで更新しやすい設計にし、お知らせや施工実績を自分たちで発信できる状態をつくった。',
    creditsTitle: 'つくった人と道具。',
    credits: [
      { role: 'Design / Development', name: 'Miyabayasi Koya' },
      { role: 'Photography', name: 'クライアント提供' },
      { role: 'Stack', name: 'WordPress · Custom Theme' },
    ],
    meta: [
      { k: 'YEAR', v: '2026' },
      { k: 'ROLE', v: 'Solo' },
      { k: 'STATUS', v: 'In Use' },
      { k: 'DOMAIN', v: 'Corporate' },
    ],
    panels: [
      { n: '00', label: 'Hero', bg: 'dark', caption: 'OFFICE · FACADE', image: '/assets/media/kouban-home.png' },
      { n: '01', label: 'Problem', bg: '', caption: 'BROCHURE · OLD', image: '/assets/media/kouban-product.png' },
      { n: '02', label: 'Approach', bg: 'green', caption: 'UI · TOP PAGE', image: '/assets/media/kouban-home.png' },
      { n: '03', label: 'Credits', bg: 'dark', caption: 'DESK · WIREFRAME', image: '/assets/media/kouban-product.png' },
    ],
    links: [{ label: 'SITE', href: 'https://kouban.jp/' }],
    next: { slug: 'toretabe-app', en: 'TORETABE', no: '01', subtitle: '家庭菜園の収穫を食卓へつなげる' },
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}
