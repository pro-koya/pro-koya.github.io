import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import { PageTransitionProvider } from '@/components/PageTransition';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Miyabayasi Koya | よく動き、よく食べ、よくつくる。',
  description:
    '身体を動かし、土に触れ、日々の実感を発信する。ときどき、Webサービスやアプリ、システムにもしている Miyabayasi Koya の個人サイトです。',
  openGraph: {
    title: 'Miyabayasi Koya',
    description:
      'よく動き、よく食べ、よくつくる。AI時代に、身体でわかることを大事にする個人サイト。',
    locale: 'ja_JP',
    type: 'website',
  },
  // ブラウザアイコンは個人マーク（/icon.*）。/favicon.svg はナビのブランドマーク(mask)用に維持。
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#14130f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansJP.variable}`}
    >
      <body>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
