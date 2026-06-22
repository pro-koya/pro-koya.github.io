'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SUPABASE_URL = 'https://lybgdrxsojuaylnvdmwb.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Ymdkcnhzb2p1YXlsbnZkbXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MTIyMDAsImV4cCI6MjA4NzE4ODIwMH0.v9mvcsp2zdIHtiOzWJKjHFf2Zi1OjJvXte51JOcifDc';

const TRANSLATIONS = {
  ja: {
    metaTitle: 'Liftly - パスワードリセット',
    title: 'パスワードリセット',
    titleExpired: 'リンクの有効期限が切れました',
    lead: 'メールのリンクからこのページにアクセスしました。',
    desc: '新しいパスワードの設定が完了したら、Liftly アプリを開き、設定 → 同期 からログインしてください。このページは閉じてかまいません。',
    expired: 'このリンクは有効期限が切れています。Liftly アプリの 設定 → 同期 で「パスワードを忘れた」から、再度リセット用メールを送信してください。',
    withCode: 'このリンクはアプリから送られたため、このブラウザではそのままパスワードを設定できません。下のフォームで登録済みメールアドレスを入力し、「このブラウザ用のリンクを送信」を押してください。届いたメールのリンクをこのブラウザで開くと、パスワード入力欄が表示されます。',
    requestEmailLabel: '登録済みメールアドレス',
    requestSubmit: 'このブラウザ用のリンクを送信',
    requestSuccess: '送信しました。メールをご確認ください。届いたリンクをこのブラウザで開いてパスワードを設定してください。',
    requestError: '送信に失敗しました。',
    requestErrorLimit: '送信回数の上限に達しました。しばらく時間をおいてからお試しください。',
    formLead: '新しいパスワードを入力してください。',
    newPassword: '新しいパスワード',
    confirmPassword: 'パスワード（確認）',
    submit: 'パスワードを更新',
    updating: '更新中...',
    success: 'パスワードを更新しました。Liftly アプリを開き、設定 → 同期 からログインしてください。',
    back: 'トップページへ戻る',
    formErrorMatch: 'パスワードが一致しません。',
    formErrorShort: '6文字以上で入力してください。',
    updateFailed: '更新に失敗しました。',
    nav: { features: '機能', howto: '使い方', privacy: 'プライバシー', contact: 'お問い合わせ' },
    footer: { features: '機能', howto: '使い方', privacy: 'プライバシー', contact: 'お問い合わせ', copyright: '© Liftly - Simple Fitness Log' },
    lang: { ja: '日本語', en: 'English' },
  },
  en: {
    metaTitle: 'Liftly - Password Reset',
    title: 'Password Reset',
    titleExpired: 'Link expired',
    lead: 'You opened this page from the link in your email.',
    desc: 'After setting your new password, open the Liftly app and sign in from Settings → Sync. You can close this page.',
    expired: 'This link has expired. In the Liftly app, go to Settings → Sync, tap "Forgot password?", and request a new reset email.',
    withCode: 'This link was sent from the app, so you cannot set your password in this browser directly. Enter your registered email below and click "Send link for this browser". When you open the link from the email in this browser, the password form will appear.',
    requestEmailLabel: 'Registered email address',
    requestSubmit: 'Send link for this browser',
    requestSuccess: 'Email sent. Check your inbox and open the link in this browser to set your password.',
    requestError: 'Failed to send.',
    requestErrorLimit: 'Too many requests. Please try again later.',
    formLead: 'Enter your new password below.',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    submit: 'Update password',
    updating: 'Updating...',
    success: 'Password updated. Open the Liftly app and sign in from Settings → Sync.',
    back: 'Back to top',
    formErrorMatch: 'Passwords do not match.',
    formErrorShort: 'Please enter at least 6 characters.',
    updateFailed: 'Update failed.',
    nav: { features: 'Features', howto: 'How to', privacy: 'Privacy', contact: 'Contact' },
    footer: { features: 'Features', howto: 'How to', privacy: 'Privacy', contact: 'Contact', copyright: '© Liftly - Simple Fitness Log' },
    lang: { ja: '日本語', en: 'English' },
  },
} as const;

type Lang = keyof typeof TRANSLATIONS;
type State = 'default' | 'expired' | 'withCode' | 'form' | 'success';

function getUrlParam(name: string, search: string, hash: string): string {
  const qParts = search.replace(/^\?/, '').split('&');
  const hParts = hash.replace(/^#/, '').split('&');
  for (const part of [...qParts, ...hParts]) {
    const [k, v] = part.split('=');
    if (decodeURIComponent(k) === name) return v ? decodeURIComponent(v.replace(/\+/g, ' ')) : '';
  }
  return '';
}

function ResetCompleteContent() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const lang: Lang = langParam === 'en' ? 'en' : 'ja';
  const t = TRANSLATIONS[lang];

  const [menuOpen, setMenuOpen] = useState(false);
  const [cardState, setCardState] = useState<State>('default');
  const [formError, setFormError] = useState('');
  const [requestError, setRequestError] = useState('');
  const [requestSuccess, setRequestSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);

  const pwRef = useRef<HTMLInputElement>(null);
  const pwConfirmRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const getLangUrl = (l: string) => `?lang=${l}`;

  useEffect(() => {
    const search = window.location.search || '';
    const hash = window.location.hash || '';

    const errorCode = getUrlParam('error_code', search, hash) || getUrlParam('error', search, hash);
    const errorDesc = getUrlParam('error_description', search, hash);
    const isExpired = errorCode === 'otp_expired' || errorDesc.includes('expired');
    const isAccessDenied = getUrlParam('error', search, hash) === 'access_denied';
    const code = getUrlParam('code', search, hash);
    const hashToken = getUrlParam('access_token', search, hash);
    const hashType = getUrlParam('type', search, hash);

    if (isExpired || isAccessDenied) {
      setCardState('expired');
      return;
    }

    if (!code && !hashToken) return;

    const loadSupabase = async () => {
      const { createClient } = await import('@supabase/supabase-js');
      const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

      if (hashToken && hashType === 'recovery') {
        const { data } = await client.auth.getSession();
        if (data.session) {
          setCardState('form');
        } else {
          setCardState('withCode');
        }
        return;
      }

      if (code) {
        try {
          const { error } = await client.auth.exchangeCodeForSession(code);
          if (error) {
            setCardState('withCode');
          } else {
            setCardState('form');
          }
        } catch {
          setCardState('withCode');
        }
      }
    };

    loadSupabase();
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pw = pwRef.current?.value ?? '';
    const pwConfirm = pwConfirmRef.current?.value ?? '';
    setFormError('');

    if (pw.length < 6) { setFormError(t.formErrorShort); return; }
    if (pw !== pwConfirm) { setFormError(t.formErrorMatch); return; }

    setIsSubmitting(true);
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { error } = await client.auth.updateUser({ password: pw });
      if (error) {
        setFormError(error.message || t.updateFailed);
      } else {
        setCardState('success');
        history.replaceState(null, '', window.location.pathname + (window.location.search || ''));
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t.updateFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim() ?? '';
    if (!email) return;
    setRequestError('');
    setRequestSuccess('');
    setIsRequestSubmitting(true);
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const redirectTo = window.location.origin + window.location.pathname;
      const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) {
        const isLimit = error.message.includes('limit') || error.message.includes('Limit');
        setRequestError(isLimit ? t.requestErrorLimit : error.message);
      } else {
        setRequestSuccess(t.requestSuccess);
      }
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : t.requestError);
    } finally {
      setIsRequestSubmitting(false);
    }
  };

  const showLead = cardState === 'default';
  const showDesc = cardState === 'default';
  const isErrorState = cardState === 'expired' || cardState === 'withCode';

  return (
    <>
      <nav className={`nav${menuOpen ? ' is-open' : ''}`} id="nav">
        <div className="nav-inner">
          <Link href="/liftly/" className="nav-logo">Liftly</Link>
          <span className="nav-lang">
            <a href={getLangUrl('ja')} className={`nav-lang-link${lang === 'ja' ? ' is-active' : ''}`}>{t.lang.ja}</a>
            <span className="nav-lang-sep" aria-hidden="true">|</span>
            <a href={getLangUrl('en')} className={`nav-lang-link${lang === 'en' ? ' is-active' : ''}`}>{t.lang.en}</a>
          </span>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            aria-label={menuOpen ? (lang === 'en' ? 'Close menu' : 'メニューを閉じる') : (lang === 'en' ? 'Open menu' : 'メニューを開く')}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
          <div className="nav-right" id="nav-menu">
            <div className="nav-links">
              <Link href="/liftly/#features" onClick={() => setMenuOpen(false)}>{t.nav.features}</Link>
              <Link href="/liftly/#howto" onClick={() => setMenuOpen(false)}>{t.nav.howto}</Link>
              <Link href="/liftly/#privacy" onClick={() => setMenuOpen(false)}>{t.nav.privacy}</Link>
              <Link href="/liftly/#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="auth-reset-section">
          <div className="container">
            <div className="auth-reset-card" id="auth-reset-card">
              {!isErrorState ? (
                <div className="auth-reset-icon auth-reset-icon-success" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
              ) : (
                <div className="auth-reset-icon auth-reset-icon-error" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
              )}

              <h1 className="auth-reset-title">
                {cardState === 'expired' ? t.titleExpired : t.title}
              </h1>

              {showLead && <p className="auth-reset-lead">{t.lead}</p>}
              {showDesc && <p className="auth-reset-desc">{t.desc}</p>}

              {cardState === 'expired' && (
                <div className="auth-reset-error">
                  <p className="auth-reset-desc">{t.expired}</p>
                </div>
              )}

              {cardState === 'withCode' && (
                <div className="auth-reset-error">
                  <p className="auth-reset-desc">{t.withCode}</p>
                  <div className="auth-reset-form-wrap">
                    <form className="auth-reset-form" onSubmit={handleRequestSubmit}>
                      <label htmlFor="auth-reset-email" className="auth-reset-label">{t.requestEmailLabel}</label>
                      <input
                        type="email"
                        id="auth-reset-email"
                        className="auth-reset-input"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        ref={emailRef}
                      />
                      {requestError && <p className="auth-reset-form-error">{requestError}</p>}
                      {requestSuccess && <p className="auth-reset-success">{requestSuccess}</p>}
                      <button
                        type="submit"
                        className="btn-primary auth-reset-submit"
                        disabled={isRequestSubmitting}
                      >
                        {t.requestSubmit}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {cardState === 'form' && (
                <div className="auth-reset-form-wrap">
                  <p className="auth-reset-desc">{t.formLead}</p>
                  <form className="auth-reset-form" onSubmit={handlePasswordSubmit}>
                    <label htmlFor="auth-reset-pw" className="auth-reset-label">{t.newPassword}</label>
                    <input
                      type="password"
                      id="auth-reset-pw"
                      className="auth-reset-input"
                      minLength={6}
                      required
                      autoComplete="new-password"
                      ref={pwRef}
                    />
                    <label htmlFor="auth-reset-pw-confirm" className="auth-reset-label">{t.confirmPassword}</label>
                    <input
                      type="password"
                      id="auth-reset-pw-confirm"
                      className="auth-reset-input"
                      minLength={6}
                      required
                      autoComplete="new-password"
                      ref={pwConfirmRef}
                    />
                    {formError && <p className="auth-reset-form-error">{formError}</p>}
                    <button
                      type="submit"
                      className="btn-primary auth-reset-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t.updating : t.submit}
                    </button>
                  </form>
                </div>
              )}

              {cardState === 'success' && (
                <div className="auth-reset-success">
                  <p className="auth-reset-desc">{t.success}</p>
                </div>
              )}

              <Link href="/liftly/" className="btn-primary auth-reset-btn">{t.back}</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner container">
          <div className="footer-links">
            <Link href="/liftly/#features">{t.footer.features}</Link>
            <Link href="/liftly/#howto">{t.footer.howto}</Link>
            <Link href="/liftly/#privacy">{t.footer.privacy}</Link>
            <Link href="/liftly/#contact">{t.footer.contact}</Link>
          </div>
          <span className="footer-copy">{t.footer.copyright}</span>
        </div>
      </footer>
    </>
  );
}

export default function ResetCompletePage() {
  return (
    <Suspense>
      <ResetCompleteContent />
    </Suspense>
  );
}
