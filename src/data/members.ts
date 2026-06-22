// メンバー（従業員）一覧。人が増えたらこの配列に追加するだけで一覧に並びます。
export interface Member {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  axes: string;        // 一言の軸
  summary: string;     // 一覧カード用
  page?: string;       // 個別ページ（あれば）
  portfolio?: string;  // 外部ポートフォリオ
}

export const MEMBERS: Member[] = [
  {
    slug: "koya",
    name: "宮林 幸也",
    nameEn: "Miyabayasi Koya",
    role: "代表 / System Builder",
    axes: "畑｜身体｜IT",
    summary:
      "大手メーカーの業務システム構築・プロジェクト推進にエンジニアとして従事。その経験を土台に独立し、現場の困りごとを仕組みに変える。",
    page: "/members/koya",
    portfolio: "/members/koya/portfolio/",
  },
];
