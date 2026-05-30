'use client';

import { Suspense, useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import { SOCIAL_LINKS } from '@/data/social';

const GAS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwNH3P0TNGcGSGEnp0wzkJws5ezGai6dOapJXPGmmMWp3-x2MmMq6l_VkuNNUEnCq4Wkg/exec';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 5000;

const TOPICS = [
  '業務改善・自動化・AI活用の相談',
  '制作・開発の相談',
  'Webサービス・アプリの相談',
  '業務システムの相談',
  '協業・取材',
  'その他',
] as const;

const TOPIC_BY_KEY: Record<string, (typeof TOPICS)[number]> = {
  build: '業務改善・自動化・AI活用の相談',
  make: '制作・開発の相談',
  web: 'Webサービス・アプリの相談',
  system: '業務システムの相談',
  collab: '協業・取材',
};

type Status = 'idle' | 'pending' | 'success' | 'error';

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const key = searchParams.get('topic');
    if (key && TOPIC_BY_KEY[key]) {
      setTopic(TOPIC_BY_KEY[key]);
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setStatus('error');
      setStatusMsg('お名前を入力してください。');
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setStatus('error');
      setStatusMsg('メールアドレスの形式を確認してください。');
      return;
    }
    if (trimmedMessage.length < 10) {
      setStatus('error');
      setStatusMsg('メッセージは10文字以上で入力してください。');
      return;
    }
    if (trimmedMessage.length > MESSAGE_MAX) {
      setStatus('error');
      setStatusMsg(`メッセージは${MESSAGE_MAX.toLocaleString()}文字以内で入力してください。`);
      return;
    }

    const formData = new FormData();
    formData.set('name', trimmedName);
    formData.set('email', trimmedEmail);
    formData.set('inquiryType', topic);
    formData.set('message', trimmedMessage);
    formData.set('website', website);
    formData.set('pageContext', topic === '業務改善・自動化・AI活用の相談' ? 'build' : 'contact');
    formData.set('pageUrl', window.location.href);
    formData.set(
      'requestId',
      `contact-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    );

    setStatus('pending');
    setStatusMsg('送信しています...');
    setSubmitting(true);

    try {
      await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      setName('');
      setEmail('');
      setTopic('');
      setMessage('');
      setStatus('success');
      setStatusMsg('送信しました。内容を確認のうえ返信します。自動返信メールもご確認ください。');
    } catch {
      setStatus('error');
      setStatusMsg('送信に失敗しました。時間を置いてもう一度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  const statusClass =
    status === 'pending' ? ' is-pending'
    : status === 'success' ? ' is-success'
    : status === 'error' ? ' is-error'
    : '';

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="sec-hero">
          <div className="eyebrow">Contact</div>
          <h1 className="display page-title" style={{ marginTop: 18 }}>CONTACT</h1>
          <h2 className="display contact-page-subtitle">
            関心が重なる<br />相談があれば。
          </h2>
          <p className="contact-page-desc">
            制作、開発、協業、取材など、お気軽にご連絡ください。<br />
            Webサービス、アプリ、業務システム、業務改善・AI活用、農業・食・運動に関わる企画など、関心が重なるテーマだと特にうれしいです。
          </p>
        </section>

        {/* Form */}
        <section className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form-grid" noValidate>
            <label className="form-field reveal">
              <div className="form-label">01 / お名前</div>
              <input type="text" className="form-input" placeholder="Your name"
                value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
            </label>

            <label className="form-field reveal">
              <div className="form-label">02 / メールアドレス</div>
              <input type="email" className="form-input" placeholder="name@domain"
                value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={160} />
            </label>

            <div className="reveal">
              <div className="form-label">03 / 相談内容</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TOPICS.map((t) => (
                  <button key={t} type="button"
                    className={`topic-pill ${topic === t ? 'selected' : ''}`}
                    onClick={() => setTopic(topic === t ? '' : t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="form-field reveal">
              <div className="form-label">04 / メッセージ</div>
              <textarea className="form-textarea" placeholder="ご相談内容をどうぞ。紹介経由の場合は、その旨も添えてください。" rows={6}
                value={message} onChange={(e) => setMessage(e.target.value)} required maxLength={MESSAGE_MAX} />
            </label>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }}
            />

            <div className="reveal contact-form-actions">
              <div className="contact-dm-links">
                DM OK —{' '}
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.shortLabel} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.shortLabel}
                  </a>
                ))}
              </div>
              <button type="submit" className="btn btn-fill" style={{ padding: '20px 32px' }} disabled={submitting}>
                {submitting ? '送信中...' : '送信する'} <span className="arrow" />
              </button>
            </div>

            {statusMsg && (
              <p
                className={`contact-status${statusClass}`}
                aria-live="polite"
                style={{ marginTop: 16 }}
              >
                {statusMsg}
              </p>
            )}
          </form>
        </section>

        <div style={{ height: 100 }} className="page-spacer" />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}
