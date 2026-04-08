import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import '../../liftly/liftly.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Liftly - パスワードリセット',
  description: 'Liftly - パスワードリセット完了。アプリに戻ってログインしてください。',
  robots: 'noindex,nofollow',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function ResetCompleteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`liftly-root ${outfit.variable}`}>
      {children}
    </div>
  );
}
