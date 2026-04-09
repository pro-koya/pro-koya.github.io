'use client';

import { useRef, useState } from 'react';

const GAS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwNH3P0TNGcGSGEnp0wzkJws5ezGai6dOapJXPGmmMWp3-x2MmMq6l_VkuNNUEnCq4Wkg/exec';

type Status = 'idle' | 'pending' | 'success' | 'error';

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    formData.set('requestId', `contact-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
    formData.set('pageContext', 'portfolio-home');
    formData.set('pageUrl', window.location.href);

    setStatus('pending');
    setStatusMsg('送信しています...');
    setSubmitting(true);

    try {
      await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      form.reset();
      setStatus('success');
      setStatusMsg('送信しました。内容を確認のうえ返信します。');
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
    <section className="section section--contact" id="contact">
      <div className="container">
        <div className="contact-editorial reveal">
          <div className="contact-layout">
            <div className="contact-copy">
              <span className="eyebrow">Contact</span>
              <h2 className="section-title">
                <span className="title-line">要件がまだ曖昧でも、</span>
                <span className="title-line">まずはご相談ください。</span>
              </h2>
              <p className="section-lead">
                フォームから概要だけ送ってもらえれば、こちらで整理しながら返信します。
                Webアプリ開発、既存改善、要件整理の壁打ちなど、初期段階の相談も歓迎です。
              </p>
              <ul className="contact-points">
                <li>やりたいことがまだ言語化しきれていなくても大丈夫です</li>
                <li>現在の困りごとや、作りたいものの概要だけでも受け付けています</li>
                <li>送信後は自動返信メールをお送りし、その後あらためて個別に返信します</li>
              </ul>
            </div>

            <div className="contact-panel">
              <form
                ref={formRef}
                className="contact-form"
                data-contact-form=""
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-name">お名前</label>
                    <input
                      className="form-input"
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-email">メールアドレス</label>
                    <input
                      className="form-input"
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-company">会社名・屋号</label>
                    <input
                      className="form-input"
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="任意"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-type">相談種別</label>
                    <select className="form-select" id="contact-type" name="inquiryType">
                      <option value="">選択してください</option>
                      <option value="Webアプリ開発">Webアプリ開発</option>
                      <option value="Webサイト制作">Webサイト制作</option>
                      <option value="iOSアプリ">iOSアプリ</option>
                      <option value="既存サービス改善">既存サービス改善</option>
                      <option value="要件整理・壁打ち">要件整理・壁打ち</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                  <div className="form-field form-field--full">
                    <label className="form-label" htmlFor="contact-message">相談内容</label>
                    <textarea
                      className="form-textarea"
                      id="contact-message"
                      name="message"
                      required
                      placeholder="現状の課題、作りたいもの、相談したいことなどを自由に書いてください。"
                    />
                  </div>
                </div>
                {/* Bot trap */}
                <input
                  className="contact-honeypot"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="form-actions">
                  <div className="form-meta">
                    <p className="contact-hint">
                      通常2営業日以内を目安に返信します。<br />送信後、自動返信メールをお送りします。
                    </p>
                    {statusMsg && (
                      <p className={`contact-status${statusClass}`} aria-live="polite">
                        {statusMsg}
                      </p>
                    )}
                  </div>
                  <button className="button button--primary" type="submit" disabled={submitting}>
                    {submitting ? '送信中...' : '送信'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
