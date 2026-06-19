import type { Metadata, Viewport } from 'next';
import '../muscle-family.css';
import './sorrygains.css';

export const metadata: Metadata = {
  title: '筋肉ごめん — 飲んだ夜の筋肉に、そっと謝る。',
  description:
    '飲酒記録から、筋肉ごめん度・努力回収率・回復目安を楽しく表示するiOSアプリ「筋肉ごめん」の公式ページです。',
  icons: {
    icon: [
      {
        url: '/assets/media/sorrygains/icon.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/assets/media/sorrygains/icon.png',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0e1320',
};

export default function SorryGainsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="sorrygains-root">{children}</div>;
}
