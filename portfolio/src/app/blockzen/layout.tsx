import type { Metadata, Viewport } from 'next';
import './blockzen.css';

export const metadata: Metadata = {
  title: 'Calm Blokku - 毎日届く、大人のブロックパズル',
  description: 'Calm Blokku - 落ち着いた配色の禅パズル。毎日届くデイリーパズルで頭のストレッチ。',
};

export const viewport: Viewport = {
  themeColor: '#F5F0E8',
};

export default function BlockzenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blockzen-root">
      {children}
    </div>
  );
}
