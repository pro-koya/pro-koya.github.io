'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FamilyBar, FamilyBand, FamilyFooter } from '../../components/muscle-family';

const CONTACT_FORM_URL = 'https://forms.gle/7FKcm5zv6F6Ci8Wa6';
const APP_STORE_URL = 'https://apps.apple.com/app/id6763986050';

const features = [
  {
    title: '飲酒を記録',
    body: 'ビール、日本酒、ワイン、ハイボールなどを選び、量と度数を入れるだけ。10秒で夜の記録が残せます。',
  },
  {
    title: '怒りレベル',
    body: '飲酒量に応じて筋肉キャラの怒りが5段階で変化。今日のあなたの飲み方を、表情で本音にして返します。',
  },
  {
    title: '翌日リカバリー',
    body: '筋トレ・プロテイン・ストレッチ・睡眠などのお詫び行動を記録するたび、怒りスコアが下がっていきます。',
  },
  {
    title: '筋トレ仙人',
    body: '説教ではなく、少しだけ刺さる言葉でトレーニングとの付き合い方を整える、仙人のひとこと。',
  },
  {
    title: '飲み会モード',
    body: '一晩を丸ごと記録するモード。経過時間・杯数をリアルタイム表示し、終了時にセッションレポートを生成します。',
  },
  {
    title: 'Liftly連携 & Muscle360 Pro',
    body: '任意でLiftlyのトレーニング要約を同期。筋トレした日に飲むと、ダメージ計算がよりリアルになります。Muscle360 Pro バンドルなら、1つの購読で Forge・Liftly・筋肉ごめんの Pro 機能が使えます。',
  },
];

const steps = [
  {
    label: '01',
    title: '飲んだ内容を残す',
    body: 'お酒の種類、量、度数を選んで「筋肉に報告する」。基本記録は端末内に保存されます。',
  },
  {
    label: '02',
    title: '結果を見る',
    body: '怒りレベル・筋トレ成果減少度・影響スコアを確認。数字は医学的判定ではなく、体験演出です。',
  },
  {
    label: '03',
    title: '必要ならデータ同期',
    body: 'Liftly連携を使う場合だけ、認証情報とトレーニング要約をアプリ機能のために扱います。',
  },
];

const faqs = [
  {
    q: '医学的なアドバイスですか？',
    a: 'いいえ。表示される数値や助言はエンターテインメント目的です。健康に関する判断は医師などの専門家にご相談ください。',
  },
  {
    q: '20歳未満でも使えますか？',
    a: '本アプリは20歳以上の方を対象としています。飲酒は節度を持って楽しみましょう。',
  },
  {
    q: 'Liftly連携しなくても使えますか？',
    a: 'はい。飲酒記録、結果表示、リカバリー行動などの基本機能はLiftly連携なしで利用できます。',
  },
  {
    q: 'データは外部に送信されますか？',
    a: '基本記録は端末内に保存されます。任意でLiftly連携を利用する場合のみ、認証とトレーニング要約の取得が発生します。',
  },
];

function AppStoreButton({ className = '' }: { className?: string }) {
  return (
    <a
      className={`sg-button sg-button--primary ${className}`}
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
    >
      App Storeでダウンロード
    </a>
  );
}

function PhoneFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="sg-phone sg-phone--photo" aria-label={alt}>
      <div className="sg-phone__speaker" />
      <div className="sg-phone__screen">
        <Image
          className="sg-phone__shot"
          src={src}
          alt={alt}
          width={1206}
          height={2622}
          sizes="(max-width: 640px) 80vw, 332px"
          priority={priority}
        />
      </div>
    </div>
  );
}

export default function SorryGainsPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('js');
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gm = await import('gsap');
      const sm = await import('gsap/ScrollTrigger');
      if (cancelled || !root.current) return;
      const gsap = (gm as { gsap?: typeof import('gsap').gsap }).gsap ?? gm.default;
      const ScrollTrigger = (sm as { ScrollTrigger?: unknown }).ScrollTrigger ?? sm.default;
      gsap.registerPlugin(ScrollTrigger as Parameters<typeof gsap.registerPlugin>[0]);

      ctx = gsap.context(() => {
        // playful, bouncy reveals (エンタメ)
        gsap.utils.toArray<HTMLElement>('[data-rv]').forEach((n) => {
          gsap.fromTo(n, { opacity: 0, y: 30, scale: 0.96 }, {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)',
            delay: parseFloat(n.dataset.delay || '0'),
            scrollTrigger: { trigger: n, start: 'top 88%' },
          });
        });

        // signature: anger level rises lv1 → lv3 → lv5 as you scroll
        const anger = el.querySelector<HTMLElement>('[data-anger]');
        if (anger) {
          const lv1 = anger.querySelector('[data-lv="1"]');
          const lv3 = anger.querySelector('[data-lv="3"]');
          const lv5 = anger.querySelector('[data-lv="5"]');
          const gauge = anger.querySelector('[data-gauge]');
          const lvEl = anger.querySelector('[data-anger-lv]');
          const nameEl = anger.querySelector('[data-anger-name]');
          const NAMES: Record<number, string> = { 1: 'ほろ酔い', 3: '反省どき', 5: '大激怒' };
          gsap.set([lv3, lv5], { opacity: 0 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: anger, start: 'top top', end: '+=185%', scrub: 0.5, pin: true, anticipatePin: 1,
              onUpdate: (self: { progress: number }) => {
                const lv = self.progress < 0.36 ? 1 : self.progress < 0.72 ? 3 : 5;
                if (lvEl) lvEl.textContent = `LV.${lv}`;
                if (nameEl) nameEl.textContent = NAMES[lv];
              },
            },
          });
          tl.to(lv1, { opacity: 0, duration: 1 }, 0.9)
            .to(lv3, { opacity: 1, duration: 1 }, 0.9)
            .to(lv3, { opacity: 0, duration: 1 }, 2.3)
            .to(lv5, { opacity: 1, duration: 1 }, 2.3)
            .fromTo(gauge, { width: '12%' }, { width: '100%', duration: 3.3, ease: 'none' }, 0);
        }

        (ScrollTrigger as { refresh: () => void }).refresh();
      }, root);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <>
      <FamilyBar current="sorrygains" />
      <main className="sg-page" ref={root}>
      <nav className="sg-nav" aria-label="サイトナビゲーション">
        <Link href="/sorrygains/" className="sg-brand">
          <Image src="/assets/media/sorrygains/icon.png" alt="" width={34} height={34} />
          <span>筋肉ごめん</span>
        </Link>
        <div className="sg-nav__links">
          <a href="#features">機能</a>
          <a href="#privacy">プライバシー</a>
          <a href="#faq">FAQ</a>
          <Link href="/sorrygains/privacy/">Privacy Policy</Link>
        </div>
      </nav>

      <section className="sg-hero">
        <div className="sg-hero__copy">
          <p className="sg-eyebrow">Entertainment Fitness Log</p>
          <h1>筋肉ごめん</h1>
          <p className="sg-hero__tagline">飲んだ夜の筋肉に、そっと謝る。</p>
          <p className="sg-hero__lead">
            飲酒量に応じて筋肉キャラが怒り出す、エンタメ系の飲酒記録アプリ。
            罪悪感を、少し笑える記録に変えます。App Storeで配信中。
          </p>
          <div className="sg-hero__actions">
            <AppStoreButton />
            <Link className="sg-button sg-button--ghost" href="/sorrygains/privacy/">
              プライバシーポリシー
            </Link>
          </div>
        </div>
        <div className="sg-hero__visual">
          <Image
            className="sg-hero__icon"
            src="/assets/media/sorrygains/icon.png"
            alt=""
            width={360}
            height={360}
            aria-hidden="true"
          />
          <PhoneFrame
            src="/assets/media/sorrygains/home-lv3.png"
            alt="筋肉ごめん ホーム画面 怒りレベル3"
            priority
          />
        </div>
      </section>

      <section className="sg-section sg-concept" id="concept">
        <div className="sg-section__head" data-rv>
          <p className="sg-eyebrow">Concept</p>
          <h2>罪悪感を、ちょっと笑える記録に。</h2>
        </div>
        <p>
          筋肉ごめんは、飲酒とトレーニングの関係をユーモラスに表現するエンターテインメントアプリです。
          健康管理アプリのように説教するのではなく、夜の余韻と翌日のリカバリーを、静かで少し変な数字にします。
        </p>
      </section>

      <section className="sg-anger" data-anger aria-label="怒りレベル">
        <div className="sg-anger__inner">
          <div className="sg-anger__copy">
            <p className="sg-eyebrow">Anger Level</p>
            <h2>飲むほど、<br />筋肉が怒る。</h2>
            <p className="sg-anger__lead">
              その日の飲み方を、5段階の怒りで返す。スクロールして、筋肉を怒らせてみてください。
            </p>
            <div className="sg-gauge"><span className="sg-gauge__fill" data-gauge /></div>
            <div className="sg-anger__label">
              <span className="sg-anger__lv" data-anger-lv>LV.1</span>
              <em className="sg-anger__name" data-anger-name>ほろ酔い</em>
            </div>
          </div>
          <div className="sg-anger__stage" aria-hidden="true">
            <div className="sg-phone sg-phone--photo">
              <div className="sg-phone__speaker" />
              <div className="sg-phone__screen">
                <Image className="sg-anger__shot" data-lv="1" src="/assets/media/sorrygains/home-lv1.png" alt="" width={1206} height={2622} />
                <Image className="sg-anger__shot" data-lv="3" src="/assets/media/sorrygains/home-lv3.png" alt="" width={1206} height={2622} />
                <Image className="sg-anger__shot" data-lv="5" src="/assets/media/sorrygains/home-lv5.png" alt="" width={1206} height={2622} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sg-section" id="features">
        <div className="sg-section__head" data-rv>
          <p className="sg-eyebrow">Features</p>
          <h2>まじめに記録して、まじめに謝る。</h2>
        </div>
        <div className="sg-feature-grid">
          {features.map((feature) => (
            <article className="sg-feature" key={feature.title} data-rv>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sg-section sg-flow">
        <div className="sg-section__head" data-rv>
          <p className="sg-eyebrow">How It Works</p>
          <h2>記録、結果、必要なときだけ同期。</h2>
        </div>
        <div className="sg-steps">
          {steps.map((step) => (
            <article className="sg-step" key={step.label} data-rv>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sg-section sg-showcase" aria-label="画面イメージ">
        <PhoneFrame
          src="/assets/media/sorrygains/input.png"
          alt="筋肉ごめん 飲酒入力画面"
        />
        <div className="sg-showcase__text">
          <p className="sg-eyebrow">App Experience</p>
          <h2>夜の静けさに合う、重めのダークUI。</h2>
          <p>
            深いネイビー、チャコール、琥珀色のアクセントで、酒の温かさと筋トレの損失感を表現。
            お酒の種類・量・度数を選んで「筋肉に報告する」だけ。面白さは派手な装飾ではなく、結果の瞬間とコピーで出します。
          </p>
        </div>
      </section>

      <section className="sg-section sg-privacy" id="privacy">
        <div>
          <p className="sg-eyebrow">Privacy</p>
          <h2>基本記録は端末内。連携は任意。</h2>
        </div>
        <div className="sg-privacy__body">
          <p>
            飲酒記録、体重、週のトレーニング回数、リカバリー行動は端末内に保存されます。
            任意でLiftly連携を利用する場合、Apple/Google/Supabase認証によりメールアドレスとユーザーIDが扱われ、
            Liftlyのトレーニング要約をアプリ機能のために取得します。
          </p>
          <p>本アプリは、ユーザーのデータを第三者広告やトラッキング目的で利用しません。</p>
          <Link className="sg-button sg-button--secondary" href="/sorrygains/privacy/">
            プライバシーポリシーを読む
          </Link>
        </div>
      </section>

      <section className="sg-section" id="faq">
        <div className="sg-section__head" data-rv>
          <p className="sg-eyebrow">FAQ</p>
          <h2>よくある質問</h2>
        </div>
        <div className="sg-faq-list">
          {faqs.map((faq) => (
            <article className="sg-faq" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sg-final">
        <h2>今日の筋肉には、今日のうちに謝っておく。</h2>
        <div className="sg-final__actions">
          <AppStoreButton />
          <a className="sg-button sg-button--ghost" href={CONTACT_FORM_URL} target="_blank" rel="noreferrer">
            お問い合わせ
          </a>
        </div>
      </section>

      </main>
      <FamilyBand current="sorrygains" />
      <FamilyFooter current="sorrygains" privacyHref="/sorrygains/privacy/" />
    </>
  );
}
