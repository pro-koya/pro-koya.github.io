'use client';

import { useEffect } from 'react';

// 旧・自己完結型LP（約28MB）は配信制限のため廃止。
// /toretabe/ は とれたべの事例ページへ誘導する。
const TARGET = '/members/koya/portfolio/case-studies/toretabe-app/';

export default function ToretabePage() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);

  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        color: '#3a322b',
        background: '#F3F7EF',
      }}
    >
      <p style={{ lineHeight: 1.9 }}>
        とれたべのページへ移動します。
        <br />
        <a href={TARGET} style={{ color: '#6c8a4f', textDecoration: 'underline' }}>
          移動しない場合はこちら
        </a>
      </p>
    </main>
  );
}
