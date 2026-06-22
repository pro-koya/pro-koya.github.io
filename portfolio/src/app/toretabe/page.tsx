export default function ToretabePage() {
  return (
    <main className="toretabe-standalone-page" aria-label="とれたべ ランディングページ">
      <nav className="toretabe-topnav" aria-label="サイトナビゲーション">
        <span className="toretabe-topnav__brand">とれたべ</span>
        <div className="toretabe-topnav__links">
          <a href="/members/koya/portfolio/toretabe-manual.html" className="toretabe-topnav__link">
            使い方ガイド
          </a>
          <a href="/members/koya/portfolio/toretabe/terms/" className="toretabe-topnav__link">
            利用規約
          </a>
          <a href="/members/koya/portfolio/toretabe/privacy/" className="toretabe-topnav__link">
            プライバシー
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
