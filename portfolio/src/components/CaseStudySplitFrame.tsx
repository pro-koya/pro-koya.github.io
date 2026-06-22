'use client';

import { useEffect, useRef, useState } from 'react';
import type { CaseStudyPanel } from '@/data/case-studies';

interface Props {
  panels: readonly CaseStudyPanel[];
  children: React.ReactNode;
}

export default function CaseStudySplitFrame({ panels, children }: Props) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>('[data-cs-panel]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setActive(Number(target.dataset.csPanel));
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      { threshold: 0.12 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs-split" ref={containerRef}>
      {/* LEFT: sticky image pane */}
      <div className="cs-split-img" aria-hidden="true">
        {panels.map((panel, i) => (
          <div
            key={panel.n}
            className="cs-frame"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {panel.image ? (
              <div className="cs-frame-with-image">
                <img
                  src={panel.image}
                  alt={panel.caption}
                  className="cs-frame-img"
                />
                <div className="cs-frame-overlay">
                  <div className="cs-frame-meta" style={{ color: 'rgba(244,241,234,0.75)' }}>
                    <span>FRAME · {panel.n}</span>
                    <span>{panel.label.toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="cs-frame-label" style={{ color: 'var(--paper)' }}>
                      {panel.label.toUpperCase()}
                    </div>
                    <div className="cs-frame-caption" style={{ color: 'rgba(244,241,234,0.65)' }}>
                      {panel.caption}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`ph ${panel.bg}`}>
                <div
                  className="cs-frame-meta"
                  style={{ color: panel.bg ? 'rgba(244,241,234,0.65)' : 'var(--ink-3)' }}
                >
                  <span>FRAME · {panel.n}</span>
                  <span>{panel.label.toUpperCase()}</span>
                </div>
                <div>
                  <div className="cs-frame-label" style={{ color: panel.bg ? 'var(--paper)' : 'var(--ink)' }}>
                    {panel.label.toUpperCase()}
                  </div>
                  <div className="cs-frame-caption" style={{ color: panel.bg ? 'rgba(244,241,234,0.55)' : 'var(--ink-3)' }}>
                    {panel.caption}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Progress bars */}
        <div className="cs-progress">
          {panels.map((panel, i) => (
            <div
              key={panel.n}
              className="cs-progress-bar"
              style={{
                background: i <= active ? 'var(--rust)' : 'rgba(244,241,234,0.25)',
              }}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: scrolling body */}
      <div>{children}</div>
    </div>
  );
}
