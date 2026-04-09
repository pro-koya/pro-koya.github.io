'use client';

import { useRef, useState } from 'react';

const GAS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwNH3P0TNGcGSGEnp0wzkJws5ezGai6dOapJXPGmmMWp3-x2MmMq6l_VkuNNUEnCq4Wkg/exec';

type Status = 'idle' | 'pending' | 'success' | 'error';

interface InquiryType {
  value: string;
  label: string;
}

interface Props {
  heading: string;
  lead: string;
  pageContext: string;
  idPrefix: string;
  inquiryTypes: InquiryType[];
  messagePlaceholder: string;
}

export function CategoryContactSection({
  heading,
  lead,
  pageContext,
  idPrefix,
  inquiryTypes,
  messagePlaceholder,
}: Props) {
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
    formData.set('pageContext', pageContext);
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
              <h2 className="section-title">{heading}</h2>
              <p className="section-lead">{lead}</p>
            </div>

            <div className="contact-panel">
              <form
                ref={formRef}
                className="contact-form"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label" htmlFor={`${idPrefix}-name`}>お名前</label>
                    <input
                      className="form-input"
                      id={`${idPrefix}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor={`${idPrefix}-email`}>メールアドレス</label>
                    <input
                      className="form-input"
                      id={`${idPrefix}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor={`${idPrefix}-company`}>会社名・屋号</label>
                    <input
                      className="form-input"
                      id={`${idPrefix}-company`}
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="任意"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor={`${idPrefix}-type`}>相談種別</label>
                    <select className="form-select" id={`${idPrefix}-type`} name="inquiryType">
                      <option value="">選択してください</option>
                      {inquiryTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field form-field--full">
                    <label className="form-label" htmlFor={`${idPrefix}-message`}>相談内容</label>
                    <textarea
                      className="form-textarea"
                      id={`${idPrefix}-message`}
                      name="message"
                      required
                      placeholder={messagePlaceholder}
                    />
                  </div>
                </div>
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
