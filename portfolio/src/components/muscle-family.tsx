/* Muscle360 Family System — shared chrome components.
   全LP共通の「家族感」レイヤー。各アプリ page.tsx から current を渡して使う。
   サーバーコンポーネント（静的リンクのみ・JS不要）。スタイルは muscle-family.css。 */

type AppKey = 'forge' | 'liftly' | 'sorrygains';

const APPS: { key: AppKey; name: string; role: string; sub: string; href: string }[] = [
  { key: 'forge', name: 'Forge', role: '追い込みの記録', sub: 'CrossFit & Hyrox', href: '/forge/' },
  { key: 'liftly', name: 'Liftly', role: '積み上げの記録', sub: '筋トレ記録', href: '/liftly/' },
  { key: 'sorrygains', name: '筋肉ごめん', role: '逆風の可視化', sub: '飲酒 × 筋トレ', href: '/sorrygains/' },
];

export function FamilyBar({ current }: { current?: AppKey }) {
  return (
    <nav className="mf mf-bar" aria-label="Muscle360 ファミリー">
      <a className="mf-bar-home" href="/muscle360/">
        <span className="mf-bar-mark" aria-hidden="true">360</span>
        <span className="mf-bar-name">Muscle360</span>
      </a>
      <div className="mf-bar-apps">
        {APPS.map((a) => (
          <a
            key={a.key}
            href={a.href}
            className={`mf-bar-app is-${a.key}${current === a.key ? ' is-current' : ''}`}
            aria-current={current === a.key ? 'page' : undefined}
          >
            {a.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function FamilyBand({ current }: { current?: AppKey }) {
  return (
    <section className="mf mf-band" aria-labelledby="mf-band-title">
      <div className="mf-band-inner">
        <p className="mf-band-kicker">
          <span className="mf-band-mark">360</span> MUSCLE360 ファミリー
        </p>
        <h2 id="mf-band-title" className="mf-band-title">
          1つの購読で、<em>3アプリ</em>の Pro。
        </h2>
        <p className="mf-band-sub">
          筋トレ・飲酒・記録 — それぞれ単独でも使えるアプリが、共通IDでつながる。
          Muscle360 Pro なら、どれを買っても3アプリすべての Pro 機能が解放されます。
        </p>
        <div className="mf-band-apps">
          {APPS.map((a) => (
            <a key={a.key} href={a.href} className={`mf-band-app is-${a.key}`}>
              {current === a.key ? <span className="mf-band-app-here">今ここ</span> : null}
              <span className={`mf-band-app-dot`} aria-hidden="true" />
              <span className="mf-band-app-name">{a.name}</span>
              <span className="mf-band-app-role">{a.role} · {a.sub}</span>
            </a>
          ))}
        </div>
        <a className="mf-band-more" href="/muscle360/">
          Muscle360 構想を見る <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export function FamilyFooter({ current, privacyHref }: { current?: AppKey; privacyHref?: string }) {
  return (
    <footer className="mf mf-foot">
      <div className="mf-foot-inner">
        <a className="mf-foot-brand" href="/muscle360/">
          <span className="mf-bar-mark" aria-hidden="true">360</span>
          <span className="mf-bar-name">Muscle360</span>
        </a>
        <nav className="mf-foot-links" aria-label="Muscle360 フッター">
          {APPS.map((a) => (
            <a key={a.key} href={a.href} aria-current={current === a.key ? 'page' : undefined}>
              {a.name}
            </a>
          ))}
          <a href="/members/koya/portfolio/muscle360/">構想</a>
          {privacyHref ? <a href={privacyHref}>プライバシー</a> : null}
          <a href="/members/koya/portfolio/">制作者</a>
        </nav>
        <span className="mf-foot-copy">© 2026 Miyabayasi Koya — Muscle360</span>
      </div>
    </footer>
  );
}
