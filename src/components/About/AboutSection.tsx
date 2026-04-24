export function AboutSection() {
  return (
    <section className="section section--soft" id="about">
      <div className="container">
        <div className="about-editorial">
          <div className="about-editorial__quote reveal">
            <span className="eyebrow">About</span>
            <h2 className="section-title section-title--about">
              <span className="title-line">実装だけでなく、</span>
              <span className="title-line section-title__accent">進め方ごと</span>
              <span className="title-line">整える仕事がしたい。</span>
            </h2>
          </div>

          <div className="about-editorial__body reveal reveal-delay-1">
            <p className="about-editorial__lead">
              最小コストで成果を出すために、作る前の言語化と構造整理を大切にしています。
              AIも活用しながら、速さと品質のバランスを見て進めます。
            </p>
            <ul className="note-list">
              <li>要件が固まりきっていない段階から相談できます</li>
              <li>必要な機能と優先順位を一緒に整理します</li>
              <li>作った後の改善や拡張まで見越して設計します</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
