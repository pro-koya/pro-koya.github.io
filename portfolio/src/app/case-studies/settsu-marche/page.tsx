import type { Metadata } from 'next';
import CaseStudyPageTemplate from '@/components/CaseStudyPage';
import { getCaseStudy } from '@/data/case-studies';

const cs = getCaseStudy('settsu-marche')!;

export const metadata: Metadata = {
  title: `${cs.title} | Case Study | Miyabayasi Koya`,
  description: cs.oneline,
};

export default function Page() {
  return <CaseStudyPageTemplate cs={cs} />;
}
