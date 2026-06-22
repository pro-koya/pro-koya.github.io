'use client';

import { useEffect, useState } from 'react';

export default function AuthCallbackPage() {
  const [status, setStatus] = useState('アプリを開いています...');
  const [error, setError] = useState('');

  useEffect(() => {
    const scheme = 'com.fitnesslog.liftly';
    const host = 'auth';
    const path = '/callback';
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    const appUrl = `${scheme}://${host}${path}${search}${hash}`;

    if (!search && !hash) {
      setStatus('認証コールバック用のパラメータがありません。');
      return;
    }

    try {
      window.location.replace(appUrl);
    } catch (e) {
      setStatus('アプリを開けませんでした。');
      setError(e instanceof Error ? e.message : '');
    }
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0, background: '#fafafa' }}>
      <div style={{ textAlign: 'center', color: '#333' }}>
        <p>{status}</p>
        {error && <p style={{ color: '#b91c1c', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
}
