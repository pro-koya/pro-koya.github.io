import type { Metadata } from 'next';
import '../legal.css';

export const metadata: Metadata = {
  title: 'コエファーム サポート',
  description: 'iOSアプリ「コエファーム」のサポート・よくある質問・お問い合わせ。',
};

export default function KoeFarmSupport() {
  return (
    <main className="kf-legal">
      <nav className="kf-nav">
        <a href="/koefarm/support/">サポート</a>
        <a href="https://koefarm.pages.dev/privacy">プライバシーポリシー</a>
        <a href="https://koefarm.pages.dev/terms">利用規約</a>
        <a href="https://koefarm.pages.dev/tokushoho">特定商取引法</a>
      </nav>

      <h1>コエファーム サポート</h1>
      <p className="kf-meta">iOSアプリ「コエファーム — 話すだけ農業記録」のサポートページです。</p>

      <h2>お問い合わせ</h2>
      <p>
        不具合のご報告・ご要望・ご質問は、下記メールアドレスへお送りください。通常2〜3営業日以内に返信します。
      </p>
      <p>
        みや小屋（宮林幸也）<br />
        メール: <a href="mailto:koya@miya-koya.com">koya@miya-koya.com</a>
      </p>
      <p>
        不具合のご報告の際は、お使いの機種（例: iPhone 15）・iOSバージョン・発生した操作の順序を添えていただけると、調査がスムーズです。
      </p>

      <h2>よくある質問</h2>

      <h3>音声がうまく認識されません</h3>
      <ul>
        <li>設定アプリ → コエファーム → マイクと音声認識が許可されているかご確認ください。</li>
        <li>強風時やトラクター稼働中など騒音が大きい場面では、口元にマイクを近づけるか、AirPods等のマイク付きイヤホンのご利用をおすすめします。</li>
        <li>作物名・農薬名は、先にアプリ内で圃場・作付・資材を登録しておくと認識精度が上がります。</li>
      </ul>

      <h3>電波の弱い畑でも使えますか</h3>
      <p>
        使えます。記録は端末内に保存されるため、圏外でも音声記録・閲覧が可能です。天気の取得やAI解析など通信が必要な機能は、電波のある場所で自動的に更新されます。
      </p>

      <h3>データはどこに保存されますか</h3>
      <p>
        農作業記録・売上経費・圃場情報は、原則としてお使いの端末内にのみ保存されます。設定画面からCSV／JSON／標準形式（OCSM JSON-LD）でいつでも書き出せます。詳細は<a href="https://koefarm.pages.dev/privacy">プライバシーポリシー</a>をご覧ください。
      </p>

      <h3>プレミアム（サブスクリプション）の解約方法</h3>
      <p>
        iPhoneの「設定」→ 一番上のApple ID → 「サブスクリプション」→ コエファーム から解約できます。現在の期間の終了24時間前までに解約すると、次回の請求は発生しません。解約後も期間終了までは有料機能をご利用いただけます。
      </p>

      <h3>無料トライアル中に解約した場合はどうなりますか</h3>
      <p>
        トライアル期間の終了24時間前までに解約すれば、料金は発生しません。トライアル終了までは引き続きプレミアム機能をご利用いただけます。
      </p>

      <h3>機種変更時にデータを移行できますか</h3>
      <p>
        設定画面のバックアップ（書き出し）機能でデータを書き出し、新しい端末で読み込んでください。iCloudバックアップからの復元でも移行できます。
      </p>

      <p className="kf-foot">コエファーム（みや小屋） ／ <a href="mailto:koya@miya-koya.com">koya@miya-koya.com</a></p>
    </main>
  );
}
