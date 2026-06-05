import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const CONTACT_EMAIL = 'koyablog.1104@gmail.com';
const CONTACT_FORM_URL = 'https://forms.gle/7FKcm5zv6F6Ci8Wa6';

export const metadata: Metadata = {
  title: 'サポート | Aruki 歩',
  description: 'iOSアプリ「Aruki（歩）」のサポートページ。使い方・課金・解約・データに関するよくある質問とお問い合わせ窓口です。',
};

const helps = [
  {
    q: 'セッションの音声が鳴りません',
    a: 'iPhoneのサイレントスイッチ（消音モード）と音量をご確認ください。また、設定アプリの「Aruki」で通知が許可されているとフェーズ切り替えの案内が届きます。バックグラウンド再生は他アプリの音楽をダッキング（一時的に音量を下げる）して動作します。',
  },
  {
    q: '心拍やワークアウトがヘルスケアに反映されません',
    a: '「設定 ＞ プライバシーとセキュリティ ＞ ヘルスケア ＞ Aruki」で、心拍の読み取りとワークアウトの書き込みが許可されているかご確認ください。HealthKitは任意のため、未許可でもインターバルタイマー機能はすべて使えます。',
  },
  {
    q: 'Aruki Proを購入したのに反映されません',
    a: 'アプリ内の「設定 ＞ 購入を復元」をお試しください。購入時と同じApple IDでサインインしている必要があります。',
  },
  {
    q: 'サブスクリプションを解約したい',
    a: 'iPhoneの「設定 App ＞ あなたの名前 ＞ サブスクリプション ＞ Aruki」から、いつでも管理・解約できます。年額の無料トライアルは、終了の24時間前までに解約すれば請求されません。',
  },
  {
    q: 'データを削除したい',
    a: 'すべての記録は端末内に保存されています。本アプリを削除するとアプリ内データも削除されます。ヘルスケアに書き込んだワークアウトは「ヘルスケア」アプリから個別に削除できます。',
  },
];

export default function ArukiSupportPage() {
  return (
    <main className="ar-legal aruki-root">
      <nav className="ar-legal__nav" aria-label="Aruki 歩">
        <Link href="/aruki/" className="ar-brand">
          <Image src="/assets/media/aruki/icon.png" alt="" width={34} height={34} />
          <span>Aruki 歩</span>
        </Link>
        <Link href="/aruki/" className="ar-legal__nav-link">
          公式ページへ
        </Link>
      </nav>

      <header className="ar-legal__hero">
        <p className="ar-eyebrow">Support</p>
        <h1 className="ar-mincho">サポート</h1>
        <p>
          「Aruki（歩）」の使い方や、課金・解約・データに関するご案内です。
          下記で解決しない場合は、お気軽にお問い合わせください。
        </p>
      </header>

      <article className="ar-legal__card">
        {helps.map((help) => (
          <section key={help.q}>
            <h2>{help.q}</h2>
            <p>{help.a}</p>
          </section>
        ))}

        <section>
          <h2>お問い合わせ</h2>
          <p>
            上記で解決しない場合は、メール
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            または
            <a href={CONTACT_FORM_URL} target="_blank" rel="noreferrer">
              お問い合わせフォーム
            </a>
            からご連絡ください。通常2〜3営業日以内に返信します。
          </p>
          <p>
            あわせて
            <Link href="/aruki/privacy/">プライバシーポリシー</Link>
            ・
            <Link href="/aruki/terms/">利用規約</Link>
            もご確認いただけます。
          </p>
        </section>
      </article>
    </main>
  );
}
