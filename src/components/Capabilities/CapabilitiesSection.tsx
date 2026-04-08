export function CapabilitiesSection() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <div className="section-heading section-heading--editorial reveal">
          <div>
            <span className="eyebrow">Capabilities</span>
            <h2 className="section-title">現在の主な対応領域</h2>
          </div>
          <p className="section-note">
            広く何でもではなく、人や現場の流れの中で、今しっかり責任を持って扱える領域に絞っています。
          </p>
        </div>

        <div className="editorial-list">
          <article className="editorial-item reveal">
            <div className="editorial-item__number">01</div>
            <div className="editorial-item__body">
              <h3>曖昧な相談を、進められる形へ整える</h3>
              <p>
                まだ言葉になりきっていない課題を、画面、データ、運用フローへ分解し、着手できる形まで整理します。
              </p>
            </div>
          </article>
          <article className="editorial-item reveal reveal-delay-1">
            <div className="editorial-item__number">02</div>
            <div className="editorial-item__body">
              <h3>日々の営みの中で使われるWebアプリを組み立てる</h3>
              <p>
                会員機能、管理画面、注文導線、権限設計など、ただ動くだけでなく、日々の流れの中で無理なく使われる前提で設計・実装します。
              </p>
            </div>
          </article>
          <article className="editorial-item reveal reveal-delay-2">
            <div className="editorial-item__number">03</div>
            <div className="editorial-item__body">
              <h3>作って終わりではなく、育てていける状態まで整える</h3>
              <p>
                その場で完成することよりも、あとから機能追加や改善、引き継ぎがしやすく、少しずつ育てていける状態まで意識して仕上げます。
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
