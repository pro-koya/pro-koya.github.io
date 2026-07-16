import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import BusinessLP from './BusinessLP';

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-kf-serif',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-kf-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'コエファーム ── 農業法人の、話す業務ソフト（開発中）',
  description:
    '畑で話すだけ。ひと言の作業記録が、日報・勤怠・労務費・仕訳の4枚に分かれる。農業法人のための、話す業務ソフト「コエファーム」。開発中。いま一緒に育てる農家を数社さがしています。',
  openGraph: {
    title: 'コエファーム ── 農業法人の、話す業務ソフト',
    description:
      '畑で話すだけ。日報も、勤怠も、帳簿も、もう書かなくていい。農業法人のための、話す業務ソフト。開発中・パイロット農家募集中。',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function KoeFarmBusinessPage() {
  return (
    <div className={`${notoSerifJP.variable} ${notoSansJP.variable}`}>
      <BusinessLP />
    </div>
  );
}
