import type { Metadata } from 'next';

const EFFECTIVE_DATE = '2026-05-04';
const APP_NAME = 'Forge - WOD & Hyrox';
const BUNDLE_ID = 'com.muscle360.forge';
const OPERATOR = 'Muscle360';
const CONTACT_EMAIL = 'koyablog.1104@gmail.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | Forge — WOD & Hyrox',
  description: 'Forge アプリのプライバシーポリシー。収集する情報、利用目的、第三者提供、ユーザーの権利について明示します。',
  robots: { index: true, follow: true },
};

type DocSectionProps = {
  num: string;
  title: string;
  jp: string;
  children: React.ReactNode;
};

function DocSection({ num, title, jp, children }: DocSectionProps) {
  return (
    <section className="forge-doc-section" aria-labelledby={`policy-section-${num}`}>
      <div className="forge-section-head">
        <span className="forge-section-num">{num}</span>
        <div className="forge-section-title-wrap">
          <h2 id={`policy-section-${num}`}>{title}</h2>
          <p>- {jp}</p>
        </div>
        <span className="forge-rule" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}

const dataTable: Array<[string, string, string, string]> = [
  ['D.01', 'メールアドレス', 'Apple / Google サインインから取得', 'アカウント識別、復旧連絡'],
  ['D.02', '表示名', 'Apple / Google プロフィール（任意）', 'アプリ内表示'],
  ['D.03', 'ユーザーID', 'Supabase が発行する内部 ID', 'トレーニング記録の関連付け'],
  ['D.04', 'トレーニング記録', 'AMRAP / EMOM / For Time / Tabata / Hyrox / 1RM 等', 'PR 判定、履歴、分析の表示'],
  ['D.05', '広告識別子（IDFA）', 'ATT 同意がある場合のみ AdMob が取得', 'パーソナライズ広告配信'],
  ['D.06', '大まかな位置情報', 'AdMob SDK が IP から推定', '広告配信の地域最適化'],
  ['D.07', '購入レシート', 'StoreKit 2 経由（Apple ID は当社では保持しない）', 'Ad-Free サブスクリプション検証'],
  ['D.08', 'クラッシュ / 診断ログ', 'Apple の標準フレームワーク経由', '不具合修正、安定性改善'],
];

const thirdParties: Array<[string, string, string]> = [
  ['T.01', 'Supabase（データベース / 認証）', '記録・アカウント情報の保存と同期'],
  ['T.02', 'Apple（Sign in with Apple / StoreKit 2）', 'サインイン、Ad-Free サブスクの購入処理'],
  ['T.03', 'Google（OAuth ログイン）', 'Google アカウントによるサインイン'],
  ['T.04', 'Google AdMob', '無料版でのバナー広告配信、UMP による同意取得'],
];

const rights: Array<[string, string, string]> = [
  ['R.01', 'アクセス・訂正', '設定画面の「アカウント」から表示・編集できます。'],
  ['R.02', '削除', 'アプリ内「アカウント削除」または下記連絡先からのご依頼で、関連するすべてのデータを 30 日以内に削除します。'],
  ['R.03', 'エクスポート', '履歴画面の共有メニューから JSON / CSV でエクスポートできます。'],
  ['R.04', 'トラッキング停止', 'iOS の設定 →「Forge」→「トラッキング」をオフにすると IDFA 取得は停止します。'],
  ['R.05', '広告非表示', 'Ad-Free サブスクリプション（¥150 / 月）で広告と関連トラッキングを完全に停止できます。'],
];

export default function ForgePrivacyPage() {
  return (
    <main className="forge-page forge-policy-page" id="top">
      <div className="forge-shell">
        <header className="forge-topbar">
          <div>
            <span className="dot">●</span>
            <span>FORGE.PRIVACY / DOC v1.0</span>
          </div>
          <span className="topbar-time">EFFECTIVE {EFFECTIVE_DATE.replace(/-/g, '.')} / TOKYO</span>
          <a href="/forge/">[ ESC ] BACK</a>
        </header>

        <section className="forge-hero policy-hero" aria-labelledby="policy-hero-title">
          <div className="hero-meta">
            <div>
              <p>SECTION P0 - LEGAL</p>
              <div className="forge-mark" aria-label="Forge">
                <span className="forge-mark-block" aria-hidden="true" />
                <span>FORGE</span>
              </div>
            </div>
            <p className="bundle">
              {APP_NAME}<br />
              BUNDLE / {BUNDLE_ID}<br />
              EFFECTIVE / {EFFECTIVE_DATE}
            </p>
          </div>
          <h1 id="policy-hero-title">
            PRIVACY<br />
            <span>POLICY</span>
          </h1>
          <div className="hero-bottom">
            <p>
              {OPERATOR}（以下「当社」）は、{APP_NAME}（以下「本アプリ」）を提供するにあたり、
              利用者から取得する情報を最小限にとどめ、本人の管理下に置き続けることを基本方針とします。
              本ポリシーは、本アプリの利用にあたって取得する情報、利用目的、第三者への提供、
              および利用者の権利について明示するものです。
            </p>
          </div>
        </section>

        <DocSection num="P1" title="OPERATOR" jp="運営者">
          <div className="forge-table">
            <div className="forge-table-head">FIG.P1 - OPERATOR INFORMATION</div>
            <div className="spec-row"><span>OPERATOR</span><strong>{OPERATOR}</strong></div>
            <div className="spec-row"><span>SERVICE</span><strong>{APP_NAME}</strong></div>
            <div className="spec-row"><span>BUNDLE ID</span><strong>{BUNDLE_ID}</strong></div>
            <div className="spec-row"><span>CONTACT</span><strong>{CONTACT_EMAIL}</strong></div>
            <div className="spec-row"><span>EFFECTIVE</span><strong>{EFFECTIVE_DATE}</strong></div>
          </div>
        </DocSection>

        <DocSection num="P2" title="DATA WE COLLECT" jp="取得する情報">
          <div className="forge-table policy-table">
            <div className="forge-table-head">FIG.P2 - COLLECTED DATA TYPES</div>
            <div className="policy-thead">
              <span>ID</span>
              <strong>項目</strong>
              <b>取得元</b>
              <em>利用目的</em>
            </div>
            {dataTable.map(([id, item, source, purpose]) => (
              <div className="policy-trow" key={id}>
                <span>{id}</span>
                <strong>{item}</strong>
                <b>{source}</b>
                <em>{purpose}</em>
              </div>
            ))}
          </div>
          <p className="table-note">
            本アプリは、健康データ（HealthKit）、連絡先、写真、カメラ、マイク、正確な位置情報を取得しません。
            取得する情報は、本アプリの中核機能（記録・PR 判定・同期）と、収益化のための広告配信に必要な範囲に限定されます。
          </p>
        </DocSection>

        <DocSection num="P3" title="HOW WE USE IT" jp="利用目的">
          <div className="principle-grid">
            <article>
              <div><span>P3.01</span><h3>記録の保存と同期</h3></div>
              <p>WOD・Hyrox・1RM 等のトレーニング記録を保存し、複数デバイス間で同期します。オフライン時はローカル保存し、復帰後に同期します。</p>
            </article>
            <article>
              <div><span>P3.02</span><h3>PR 判定と分析</h3></div>
              <p>過去履歴と比較して PR（自己ベスト）を自動判定します。Hyrox の Roxzone（遷移時間）も自動算出します。</p>
            </article>
            <article>
              <div><span>P3.03</span><h3>認証と本人確認</h3></div>
              <p>Sign in with Apple / Google サインインで取得するメールアドレスは、アカウント識別と復旧連絡のみに使用します。</p>
            </article>
            <article>
              <div><span>P3.04</span><h3>広告配信（無料版）</h3></div>
              <p>無料版では Google AdMob によるバナー広告を表示します。タイマー実行中・Hyrox レース中・Apple Watch では広告を表示しません。</p>
            </article>
            <article>
              <div><span>P3.05</span><h3>サブスクリプション管理</h3></div>
              <p>Ad-Free サブスクリプション（¥150 / 月）の購入状態を StoreKit 2 から取得し、広告表示の可否を判定します。</p>
            </article>
            <article>
              <div><span>P3.06</span><h3>不具合の修正</h3></div>
              <p>Apple 標準のクラッシュ / 診断レポート（共有に同意した場合）を、本アプリの安定性改善のために利用します。</p>
            </article>
          </div>
        </DocSection>

        <DocSection num="P4" title="TRACKING & ATT" jp="トラッキングと ATT">
          <div className="forge-table">
            <div className="forge-table-head">FIG.P4 - APP TRACKING TRANSPARENCY</div>
            <div className="spec-row"><span>FRAMEWORK</span><strong>APP TRACKING TRANSPARENCY (ATT)</strong></div>
            <div className="spec-row"><span>CONSENT</span><strong>UMP — GOOGLE USER MESSAGING PLATFORM</strong></div>
            <div className="spec-row"><span>IDFA</span><strong>ONLY IF USER GRANTS</strong></div>
            <div className="spec-row"><span>OPT-OUT</span><strong>iOS 設定 → Forge → トラッキング</strong></div>
            <div className="spec-row"><span>AD-FREE</span><strong>サブスクで完全停止</strong></div>
          </div>
          <p className="table-note">
            本アプリは初回起動時に ATT ダイアログを表示し、利用者の許可がある場合に限り広告識別子（IDFA）を取得します。
            EU / 英国の利用者には UMP（Google User Messaging Platform）による同意フォームを表示し、GDPR に整合する形で同意を取得します。
            同意は iOS の設定からいつでも撤回できます。
          </p>
        </DocSection>

        <DocSection num="P5" title="THIRD PARTIES" jp="第三者提供 / SDK">
          <div className="forge-table policy-table is-three">
            <div className="forge-table-head">FIG.P5 - THIRD-PARTY SERVICES</div>
            <div className="policy-thead">
              <span>ID</span>
              <strong>サービス</strong>
              <em>利用目的</em>
            </div>
            {thirdParties.map(([id, name, purpose]) => (
              <div className="policy-trow" key={id}>
                <span>{id}</span>
                <strong>{name}</strong>
                <em>{purpose}</em>
              </div>
            ))}
          </div>
          <p className="table-note">
            上記以外の第三者にデータを売却・貸与することはありません。各サービスのプライバシー実務は、それぞれの提供事業者のポリシーに従います。
            AdMob のトラッキングドメインは <code>googleads.g.doubleclick.net</code>、<code>googleadservices.com</code>、
            <code>googlesyndication.com</code>、<code>google-analytics.com</code>、<code>doubleclick.net</code> です。
          </p>
        </DocSection>

        <DocSection num="P6" title="STORAGE & RETENTION" jp="保管期間と地域">
          <div className="forge-table">
            <div className="forge-table-head">FIG.P6 - STORAGE</div>
            <div className="spec-row"><span>BACKEND</span><strong>SUPABASE</strong></div>
            <div className="spec-row"><span>REGION</span><strong>AP-NORTHEAST-1 (TOKYO)</strong></div>
            <div className="spec-row"><span>ENCRYPTION</span><strong>TLS IN TRANSIT / AES-256 AT REST</strong></div>
            <div className="spec-row"><span>RETENTION</span><strong>アカウント有効期間中</strong></div>
            <div className="spec-row"><span>DELETION</span><strong>削除依頼から 30 日以内</strong></div>
          </div>
          <p className="table-note">
            記録データはアカウントが有効な間、利用者の閲覧・編集に必要な範囲で保管します。
            アカウント削除を実行した場合、関連する記録・認証情報は 30 日以内に永久に削除されます。
            バックアップ媒体上の残存データは、ローテーションサイクル（最大 90 日）に従って消去されます。
          </p>
        </DocSection>

        <DocSection num="P7" title="YOUR RIGHTS" jp="利用者の権利">
          <div className="forge-table policy-table is-three">
            <div className="forge-table-head">FIG.P7 - USER RIGHTS</div>
            <div className="policy-thead">
              <span>ID</span>
              <strong>権利</strong>
              <em>行使方法</em>
            </div>
            {rights.map(([id, right, how]) => (
              <div className="policy-trow" key={id}>
                <span>{id}</span>
                <strong>{right}</strong>
                <em>{how}</em>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection num="P8" title="CHILDREN" jp="お子様のプライバシー">
          <p className="policy-paragraph">
            本アプリは 13 歳未満（GDPR 域内では 16 歳未満）の利用を想定していません。
            お子様から個人情報を意図して取得することはなく、もしそのような情報を取得していることが判明した場合、
            速やかに該当アカウントとデータを削除します。
          </p>
        </DocSection>

        <DocSection num="P9" title="CHANGES" jp="本ポリシーの変更">
          <p className="policy-paragraph">
            本ポリシーは、法令変更、サービス内容の変更、または安全性向上のために改訂されることがあります。
            重大な変更がある場合は、アプリ内通知または本ページの上部表示によりお知らせします。
            最新版は常に本ページに掲載され、施行日は冒頭の「EFFECTIVE」フィールドに記載されます。
          </p>
        </DocSection>

        <DocSection num="P10" title="CONTACT" jp="お問い合わせ">
          <div className="forge-table">
            <div className="forge-table-head">FIG.P10 - CONTACT</div>
            <div className="spec-row"><span>OPERATOR</span><strong>{OPERATOR}</strong></div>
            <div className="spec-row"><span>EMAIL</span><strong>{CONTACT_EMAIL}</strong></div>
            <div className="spec-row"><span>RESPONSE</span><strong>原則 7 営業日以内</strong></div>
          </div>
          <p className="table-note">
            本ポリシーまたはご自身のデータの取り扱いに関するご質問・ご請求は、上記メールアドレスまでご連絡ください。
            内容により、本人確認のための追加情報をお願いする場合があります。
          </p>
        </DocSection>

        <section className="install-section" aria-labelledby="policy-foot-title">
          <p>P11 - RETURN</p>
          <h2 id="policy-foot-title">$ <span>return</span> forge</h2>
          <pre>{`> privacy policy v1.0
> compiled ${EFFECTIVE_DATE}
> ready.`}</pre>
          <div className="install-actions">
            <a className="policy-back" href="/forge/">RETURN TO FORGE.LP</a>
            <span>無料 / 広告任意 / オフライン完動</span>
          </div>
        </section>

        <footer className="forge-footer">
          <span>FORGE.PRIVACY / DOC v1.0 / COMPILED {EFFECTIVE_DATE.replace(/-/g, '.')}</span>
          <nav aria-label="Forge footer">
            <a href="/forge/">// FORGE.LP</a>
            <a href="/">// PORTFOLIO TOP</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
