// =====================================================================
//  みや小屋 サイト共通設定。ここを編集すれば全ページに反映されます。
//  ★「要記入」は宮林さんの実際の情報に差し替えてください。
// =====================================================================

export const SITE = {
  name: "みや小屋",
  nameEn: "MIYA-KOYA",
  tagline: "つくる、そだてる、つながる。",
  service: "業務改善・自動化・AI活用支援",
  promise: "現場の仕事を、使われ続ける仕組みに整えます。",
  mission: "ITが分からない現場に、もう一人の仲間として。",
  representative: "宮林 幸也",
  representativeEn: "Miyabayasi Koya",

  domain: "miya-koya.com",
  url: "https://miya-koya.com",
  email: "contact@miya-koya.com",

  // ★要記入：実際の電話番号・住所に差し替えてください
  tel: "090-XXXX-XXXX",
  telLink: "090-XXXXXXXX",
  address: "大阪府摂津市（番地は要記入）",

  instagram: "https://www.instagram.com/", // ★要記入：実アカウントURL
  line: "https://lin.ee/XXXXXXX", // ★要記入：LINE公式アカウントの友だち追加URL
  // ★任意：オンライン相談の予約ツール（TimeRex / Googleカレンダー予約 等）のURL。
  // 空文字 "" にすると、サイト上の「日程を予約」ボタンは表示されません。
  booking: "",
  portfolio: "/members/koya/portfolio/", // サイト内に統合した個人ポートフォリオ（Next.js）

  // 開業
  founded: "2026年8月",

  // 対応エリア（SEO・信頼用）
  areaServed: ["大阪府", "京都府", "奈良県", "兵庫県"],
} as const;

// お問い合わせフォームの送信先。
// FormSubmit（https://formsubmit.co）はアカウント登録不要で静的サイトから送信可能。
// 初回送信時に contact@miya-koya.com 宛に有効化メールが届くので、リンクを承認してください。
export const FORM_ACTION = "https://formsubmit.co/contact@miya-koya.com";
