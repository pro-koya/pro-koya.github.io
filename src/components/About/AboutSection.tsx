export function AboutSection() {
  return (
    <section className="section section--soft" id="about">
      <div className="container">
        <div className="about-editorial">
          <div className="about-editorial__quote reveal">
            <span className="eyebrow">About</span>
            <h2 className="section-title section-title--about">
              <span className="title-line">実装だけでなく、</span>
              <span className="title-line section-title__accent">営みの中で息をする形まで</span>
              <span className="title-line">整える仕事がしたい。</span>
            </h2>
          </div>

          <div className="about-editorial__body reveal reveal-delay-1">
            <p className="about-editorial__lead">
              最小コストで成果を出すことを大切にしながら、作る前の言語化と構造整理から入ることを重視しています。
              AIを活用して初速を上げつつ、ただ機能をつくるのではなく、人や現場の流れの中で無理なく使われ続ける形へ整えるのが、今の主なスタイルです。
            </p>
            <ul className="note-list">
              <li>要件が固まりきっていない段階から相談可能</li>
              <li>速さと品質のバランスを見ながら、前に進める形を共に整理</li>
              <li>作った後の改善や拡張まで視野に入れ、使われ続ける前提で設計</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
