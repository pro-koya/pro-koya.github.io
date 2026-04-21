import type { Metadata, Viewport } from 'next';
import './toretabe.css';

export const metadata: Metadata = {
  title: 'とれたべ | 家庭菜園の収穫後を支える iOS アプリ',
  description:
    '家庭菜園の「採れた」を「食べた」につなげる iOS アプリ「とれたべ」のランディングページ。栽培、収穫、在庫、献立、使い切りまでの流れを実際の画面で紹介します。',
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
