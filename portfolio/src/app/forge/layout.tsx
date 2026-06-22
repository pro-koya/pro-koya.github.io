import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import '../muscle-family.css';
import './forge.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--forge-font-display',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--forge-font-mono',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--forge-font-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Forge — WOD & Hyrox 記録アプリ | Muscle360',
  description:
    'CrossFit と Hyrox を1つで完結。タイマー終了で即記録、3タップで保存、Roxzone を自動算出。iOS 17+ 無料。',
  openGraph: {
    title: 'Forge — WOD & Hyrox',
    description: '鍛えろ。記録しろ。CrossFit / Hyrox 記録アプリ。',
    locale: 'ja_JP',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
};

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${jetBrainsMono.variable} ${notoSansJP.variable} forge-root`}>
      {children}
    </div>
  );
}
