import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedWorks } from '@/data/works';

export function WorksSection() {
  const featured = getFeaturedWorks();

  return (
    <section className="section section--works" id="works">
      <div className="container">
        <div className="section-heading section-heading--editorial reveal">
          <div>
            <span className="eyebrow">Selected Works</span>
            <h2 className="section-title">実績</h2>
          </div>
          <p className="section-note">
            Webアプリ、iOSアプリ、企業サイトの実績を掲載しています。
          </p>
        </div>

        <div className="featured-works-grid">
          {featured.map((work, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <article className="work-card work-card--featured reveal" key={work.slug}>
                <div className="work-card__number">{number}</div>
                <Link className="work-card__media" href={work.detailPath}>
                  <Image
                    src={work.thumbnail}
                    alt={`${work.title}のサムネイル`}
                    width={480}
                    height={330}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </Link>
                <div className="work-card__body">
                  <div className="work-card__kicker">
                    Selected Work / {number}
                  </div>
                  <h3 className="work-card__title">{work.title}</h3>
                  <p className="work-card__summary">{work.summary}</p>
                  <p className="work-card__excerpt">{work.excerpt}</p>
                  <div className="work-card__meta-line">
                    {work.categoryLabel} / {work.focusLabel}
                  </div>
                  <div className="work-card__stack">
                    {work.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link className="text-link" href={work.detailPath}>
                    詳細を見る
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="category-links reveal reveal-delay-2">
          <Link className="category-link" href="/categories/web-apps/">
            <span className="category-link__label">Category</span>
            <span className="category-link__title">Web Apps</span>
          </Link>
          <Link className="category-link" href="/categories/ios-apps/">
            <span className="category-link__label">Category</span>
            <span className="category-link__title">iOS Apps</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
