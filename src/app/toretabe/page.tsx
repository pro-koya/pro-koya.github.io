const APP_STORE_URL =
  'https://apps.apple.com/us/app/%E3%81%A8%E3%82%8C%E3%81%9F%E3%81%B9/id6762575549';

export default function ToretabePage() {
  return (
    <main className="toretabe-standalone-page" aria-label="とれたべ ランディングページ">
      <nav className="toretabe-topnav" aria-label="サイトナビゲーション">
        <span className="toretabe-topnav__brand">とれたべ</span>
        <div className="toretabe-topnav__links">
          <a href="/toretabe-manual.html" className="toretabe-topnav__link">
            使い方ガイド
          </a>
          <a href="/toretabe/terms/" className="toretabe-topnav__link">
            利用規約
          </a>
          <a href="/toretabe/privacy/" className="toretabe-topnav__link">
            プライバシー
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="toretabe-topnav__link toretabe-topnav__link--store"
          >
            App Storeで入手
          </a>
        </div>
      </nav>
      <iframe
        className="toretabe-standalone-page__frame"
        src="/toretabe-lp-standalone.html"
        title="とれたべ — 家庭菜園のための、収穫後アプリ"
      />
    </main>
  );
}
