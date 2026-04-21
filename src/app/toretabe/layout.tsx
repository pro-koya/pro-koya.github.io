import type { Metadata, Viewport } from 'next';
import './toretabe.css';

export const metadata: Metadata = {
  title: 'とれたべ — 家庭菜園のための、収穫後アプリ',
  description:
    '家庭菜園の「収穫したあと」を、やさしく助ける。育てた野菜に、ちゃんとおつきあいするための iOS アプリです。',
  icons: {
    icon: [
      {
        url: '/assets/media/toretabe/icon.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/assets/media/toretabe/icon.png',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#eff7ee',
};

export default function ToretabeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="toretabe-root">{children}</div>;
}
