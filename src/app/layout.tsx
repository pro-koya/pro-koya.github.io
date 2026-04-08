import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope, Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'koya | Webアプリ開発・業務自動化のポートフォリオ',
  description:
    '要件整理から設計・実装・改善まで一貫して伴走するWebエンジニアのポートフォリオ。実績と現在の対応領域を、静かな余白のある構成で整理しています。',
};

export const viewport: Viewport = {
  themeColor: '#111111',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${manrope.variable} ${notoSerifJP.variable} ${notoSansJP.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="page-home">
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
