'use client';

import { useState, type FormEvent } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import { SOCIAL_LINKS } from '@/data/social';

const TOPICS = [
  '制作・開発の相談',
  'Webサービス・アプリの相談',
  '業務システムの相談',
  '協業・取材',
  'その他',
] as const;

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, email, topic, message });
  };

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
            制作、開発、協業、取材などの相談があればご連絡ください。<br />
            Webサービス、アプリ、業務システム、農業・食・運動に関わる企画など、関心が重なるものは特にうれしいです。
          </p>
        </section>

        {/* Form */}
        <section className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form-grid">
            <label className="form-field reveal">
              <div className="form-label">01 / お名前</div>
              <input type="text" className="form-input" placeholder="Your name"
                value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label className="form-field reveal">
              <div className="form-label">02 / メールアドレス</div>
              <input type="email" className="form-input" placeholder="name@domain"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
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
              <textarea className="form-textarea" placeholder="ご相談内容をどうぞ" rows={6}
                value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>

            <div className="reveal contact-form-actions">
              <div className="contact-dm-links">
                DM OK —{' '}
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.shortLabel} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.shortLabel}
                  </a>
                ))}
              </div>
              <button type="submit" className="btn btn-fill" style={{ padding: '20px 32px' }}>
                送信する <span className="arrow" />
              </button>
            </div>
          </form>
        </section>

        <div style={{ height: 100 }} className="page-spacer" />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
