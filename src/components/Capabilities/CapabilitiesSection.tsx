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
            現在、責任を持って対応できる領域を中心に掲載しています。
          </p>
        </div>

        <div className="editorial-list">
          <article className="editorial-item reveal">
            <div className="editorial-item__number">01</div>
            <div className="editorial-item__body">
              <h3>要件整理から入る</h3>
              <p>
                まだ固まりきっていない相談を、画面、データ、運用フローに分解して進めます。
              </p>
            </div>
          </article>
          <article className="editorial-item reveal reveal-delay-1">
            <div className="editorial-item__number">02</div>
            <div className="editorial-item__body">
              <h3>運用前提でWebアプリを組み立てる</h3>
              <p>
                会員機能、管理画面、注文導線、権限設計などを、実際の運用に合わせて設計・実装します。
              </p>
            </div>
          </article>
          <article className="editorial-item reveal reveal-delay-2">
            <div className="editorial-item__number">03</div>
            <div className="editorial-item__body">
              <h3>改善しやすい状態まで整える</h3>
              <p>
                後から機能追加や引き継ぎがしやすいよう、構成と実装をシンプルに保ちます。
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
