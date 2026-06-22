import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 導入事例（顧客インタビュー記事）。
// src/content/works/ に Markdown を追加するだけで記事が増えます。
const works = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),                 // 記事タイトル
      client: z.string(),                // 顧客名（社名・屋号）
      industry: z.string(),             // 業種
      area: z.string().optional(),       // エリア
      summary: z.string(),               // 一覧用の要約
      services: z.array(z.string()).default([]), // 提供したサービス
      result: z.string().optional(),     // 成果の一言（例：転記作業を月20時間削減）
      interviewee: z.string().optional(),// 話し手（役職・お名前）
      date: z.coerce.date(),             // 公開日
      heroImage: image().optional(),     // メイン画像（src/content/works/ 配下の相対パス）
      draft: z.boolean().default(false), // true の間は本番公開されません
    }),
});

export const collections = { works };
