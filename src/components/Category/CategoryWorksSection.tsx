import Image from 'next/image';
import { TransitionLink as Link } from '@/components/TransitionLink';
import { getWorksByCategory } from '@/data/works';
import type { Work } from '@/data/works';

interface Props {
  category: Work['category'];
  headingNote: string;
}

export function CategoryWorksSection({ category, headingNote }: Props) {
  const works = getWorksByCategory(category);

  return (
    <section className="section section--works">
      <div className="container">
        <div className="section-heading section-heading--editorial reveal">
          <div>
            <span className="eyebrow">Works In This Category</span>
            <h2 className="section-title">掲載している実績</h2>
          </div>
          <p className="section-note">{headingNote}</p>
        </div>

        <div className="works-feed">
          {works.map((work, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <article className="works-entry reveal" key={work.slug}>
                <div className="works-entry__number">{number}</div>
                <div className="works-entry__body">
                  <div className="works-entry__kicker">
                    {work.categoryLabel} / {work.focusLabel}
                  </div>
                  <h3 className="works-entry__title">{work.title}</h3>
                  <p className="works-entry__summary">{work.summary}</p>
                  <p className="works-entry__excerpt">{work.excerpt}</p>
                  <div className="works-entry__stack">
                    {work.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link className="text-link" href={work.detailPath}>
                    詳細を見る
                  </Link>
                </div>
                <Link className="works-entry__media" href={work.detailPath}>
                  <Image
                    src={work.thumbnail}
                    alt={`${work.title}のサムネイル`}
                    width={480}
                    height={330}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
