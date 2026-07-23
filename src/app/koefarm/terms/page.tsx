import type { Metadata } from 'next';
import '../legal.css';

/* 法務文書の正本は https://koefarm.pages.dev/（コエファーム公式サイト）に一本化した。
   ここに実文言のコピーを置いていた時期があり、2026-07-12版のまま取り残されて
   本体（こえ丸・端末識別子・越境移転・AI解析の無料枠）と食い違っていた。
   同じ製品について異なるプライバシーポリシーが2つ公開されている状態は事故なので、
   このページは正本への転送だけを行う。**実文言をここに書き戻さないこと。** */

const CANONICAL = 'https://koefarm.pages.dev/terms';

export const metadata: Metadata = {
  title: 'コエファーム 利用規約 — 最新版はコエファーム公式サイトへ',
  description: 'コエファームの法務文書の最新版は https://koefarm.pages.dev/ で公開しています。',
};

export default function KoeFarmLegalRedirect() {
  return (
    <main className="kf-legal">
      <meta httpEquiv="refresh" content={`0; url=${CANONICAL}`} />
      {/* canonical は metadata.alternates ではなくここで出す。
          next.config の trailingSlash:true が alternates を `/privacy/` に正規化してしまい、
          そのURLは koefarm.pages.dev 側で 308 になる（canonical がリダイレクト先を指す弱いシグナルになる）。
          noindex は併用しない——noindex が勝って canonical が無視されるため。 */}
      <link rel="canonical" href={CANONICAL} />
      <h1>ページが移動しました</h1>
      <p>
        コエファームの法務文書（プライバシーポリシー・利用規約・特定商取引法に基づく表記）は、
        コエファーム公式サイトに移動しました。自動で移動しない場合は下のリンクからお進みください。
      </p>
      <p>
        <a href={CANONICAL}>{CANONICAL}</a>
      </p>
      <p className="kf-foot">コエファーム（みや小屋）</p>
    </main>
  );
}
