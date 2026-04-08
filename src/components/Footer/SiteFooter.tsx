export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__links">
          <a href="#works">Works</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="/categories/web-apps/">Web</a>
          <a href="/categories/ios-apps/">iOS</a>
        </div>
        <div className="footer__copy">
          © {new Date().getFullYear()} koya portfolio
        </div>
      </div>
    </footer>
  );
}
