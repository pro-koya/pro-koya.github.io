/**
 * Calm Blokku マーケティングサイト - 日英切り替え
 * URL パラメータ: ?lang=ja | ?lang=en（未指定時は ja）
 */
(function () {
  'use strict';

  var translations = {
    ja: {
      'meta.title': 'Calm Blokku - 毎日届く、大人のブロックパズル',
      'meta.description': 'Calm Blokku - 落ち着いた配色の禅パズル。毎日届くデイリーパズルで頭のストレッチ。',
      'nav.features': '特長',
      'nav.howto': '遊び方',
      'nav.privacy': 'プライバシー',
      'nav.contact': 'お問い合わせ',
      'hero.badge': 'デイリーブロックパズル',
      'hero.tagline': '毎日届く、落ち着いた大人のためのブロックパズル。\n通勤中やリラックスタイムに、頭のストレッチを。',
      'hero.appStore': 'App Store でダウンロード',
      'features.title': '毎日の習慣になる、シンプルなパズル',
      'features.desc': '派手さはいらない。静かに集中できるブロックパズルを、毎日あなたに届けます。',
      'features.f1.title': '毎日届くデイリーパズル',
      'features.f1.desc': '毎日1〜3問の新しいパズルが届きます。世界中のプレイヤーが同じ問題に挑戦。難易度はEASY・MEDIUM・HARDの3段階。',
      'features.f2.title': 'エンドレスモード',
      'features.f2.desc': 'デイリーを解き終えたら、エンドレスモードへ。失敗するまで次々と出題され、レベルが上がるほど難しくなります。',
      'features.f3.title': '落ち着いた禅デザイン',
      'features.f3.desc': '温かみのあるクリーム背景にミュートトーンの配色。大人が心地よく使える、静かで美しいデザインです。',
      'features.f4.title': 'ストリーク記録',
      'features.f4.desc': '毎日プレイして連続記録を伸ばそう。カレンダーで達成状況を一覧でき、過去1週間分の問題にも挑戦できます。',
      'howto.title': '遊び方',
      'howto.desc': 'シンプルなルール、奥深いパズル。',
      'howto.s1.title': 'ピースを選ぶ',
      'howto.s1.desc': '画面下のピースをタップして選択するか、ドラッグしてボードに直接配置します。',
      'howto.s2.title': 'ボードに置く',
      'howto.s2.desc': '8×8のボードにピースを配置。有効な場所はハイライトされるので、迷いません。',
      'howto.s3.title': 'ラインを消す',
      'howto.s3.desc': '横一列または縦一列を埋めるとラインが消去。複数ライン同時消去でコンボボーナス。',
      'howto.s4.title': '全ピースを置けばクリア',
      'howto.s4.desc': 'すべてのピースを配置できればクリア。置けなくなっても、広告視聴で1回だけ復活できます。',
      'privacy.title': 'プライバシーポリシー',
      'privacy.updated': '最終更新日: 2026年3月25日',
      'privacy.overview.title': '概要',
      'privacy.overview.p1': 'Calm Blokku（以下「本アプリ」）は、お客様のプライバシーを尊重し、個人情報の保護に努めます。本ポリシーでは、本アプリにおけるデータの取り扱いについて説明します。',
      'privacy.local.title': 'ローカルデータの保存',
      'privacy.local.p1': '本アプリは以下のデータを端末内（AsyncStorage）にのみ保存します。これらのデータは外部サーバーに送信されることはありません。',
      'privacy.local.items': 'ゲームの進捗状況（スコア、クリア履歴）|連続プレイ日数（ストリーク）|アプリ設定（バイブレーション・効果音のON/OFF）|エンドレスモードのスコア履歴',
      'privacy.ads.title': '広告配信について',
      'privacy.ads.p1': '本アプリは Google AdMob を利用して広告を表示します。AdMob は広告配信の最適化のため、以下のデータを収集する場合があります。',
      'privacy.ads.items': 'デバイスの広告識別子（IDFA）|広告の表示・クリックに関するデータ|デバイス情報（OS バージョン、デバイスモデル等）',
      'privacy.ads.p2': 'iOS では、広告トラッキングの前に App Tracking Transparency（ATT）ダイアログを表示し、お客様の同意を求めます。トラッキングを許可しない場合でも、アプリは正常にご利用いただけます。',
      'privacy.ads.p3': 'Google AdMob のプライバシーポリシーについては、以下をご参照ください。',
      'privacy.ads.link': 'Google プライバシーポリシー',
      'privacy.collection.title': '個人情報の収集',
      'privacy.collection.p1': '本アプリはアカウント登録・ログイン機能を提供しておらず、お客様の氏名、メールアドレス、電話番号等の個人情報を収集することはありません。',
      'privacy.children.title': '子供のプライバシー',
      'privacy.children.p1': '本アプリは13歳未満のお子様から意図的に個人情報を収集することはありません。',
      'privacy.changes.title': 'ポリシーの変更',
      'privacy.changes.p1': '本ポリシーは予告なく変更される場合があります。変更があった場合は、本ページにて更新日を更新します。',
      'contact.title': 'お問い合わせ',
      'contact.desc': 'ご質問・ご要望・不具合の報告は以下のフォームよりお送りください。',
      'contact.btn': 'お問い合わせフォームを開く',
      'footer.features': '特長',
      'footer.howto': '遊び方',
      'footer.privacy': 'プライバシー',
      'footer.contact': 'お問い合わせ',
      'footer.copyright': '© Calm Blokku',
      'lang.ja': '日本語',
      'lang.en': 'English',
      urls: {
        appStore: 'https://apps.apple.com/us/app/calm-blokku/id6761009357',
        contactForm: 'https://forms.gle/kwtwF2FkEDE12ZcX8'
      }
    },
    en: {
      'meta.title': 'Calm Blokku - A Daily Block Puzzle for Adults',
      'meta.description': 'Calm Blokku - A calm, zen-themed block puzzle. Stretch your mind with daily puzzles.',
      'nav.features': 'Features',
      'nav.howto': 'How to Play',
      'nav.privacy': 'Privacy',
      'nav.contact': 'Contact',
      'hero.badge': 'Daily Block Puzzle',
      'hero.tagline': 'A calm block puzzle for adults, delivered daily.\nPerfect for your commute or quiet time.',
      'hero.appStore': 'Download on the App Store',
      'features.title': 'A simple puzzle that becomes a daily habit',
      'features.desc': 'No flashy effects. Just a calm, focused block puzzle delivered to you every day.',
      'features.f1.title': 'Daily Puzzles',
      'features.f1.desc': '1 to 3 new puzzles every day. Everyone in the world gets the same puzzles. Three difficulty levels: Easy, Medium, and Hard.',
      'features.f2.title': 'Endless Mode',
      'features.f2.desc': 'Done with today\'s puzzles? Try Endless Mode. Puzzles keep coming until you fail, getting harder as you level up.',
      'features.f3.title': 'Calm Zen Design',
      'features.f3.desc': 'Warm cream background with muted tones. A quiet, beautiful design that adults enjoy.',
      'features.f4.title': 'Streak Tracking',
      'features.f4.desc': 'Play every day to build your streak. View your progress on the calendar and replay puzzles from the past week.',
      'howto.title': 'How to Play',
      'howto.desc': 'Simple rules, deep puzzles.',
      'howto.s1.title': 'Select a Piece',
      'howto.s1.desc': 'Tap a piece at the bottom to select it, or drag it directly onto the board.',
      'howto.s2.title': 'Place on the Board',
      'howto.s2.desc': 'Place pieces on the 8×8 board. Valid positions are highlighted so you know where to go.',
      'howto.s3.title': 'Clear Lines',
      'howto.s3.desc': 'Fill a complete row or column to clear it. Clear multiple lines at once for combo bonuses.',
      'howto.s4.title': 'Place All Pieces to Win',
      'howto.s4.desc': 'Place every piece to complete the puzzle. If you get stuck, watch an ad to revive once.',
      'privacy.title': 'Privacy Policy',
      'privacy.updated': 'Last updated: March 25, 2026',
      'privacy.overview.title': 'Overview',
      'privacy.overview.p1': 'Calm Blokku ("the App") respects your privacy and is committed to protecting your personal information. This policy explains how data is handled within the App.',
      'privacy.local.title': 'Local Data Storage',
      'privacy.local.p1': 'The App stores the following data only on your device (AsyncStorage). This data is never transmitted to external servers.',
      'privacy.local.items': 'Game progress (scores, completion history)|Consecutive play days (streak)|App settings (vibration and sound on/off)|Endless mode score history',
      'privacy.ads.title': 'Advertising',
      'privacy.ads.p1': 'The App uses Google AdMob to display ads. AdMob may collect the following data to optimize ad delivery.',
      'privacy.ads.items': 'Device advertising identifier (IDFA)|Ad display and click data|Device information (OS version, device model, etc.)',
      'privacy.ads.p2': 'On iOS, an App Tracking Transparency (ATT) dialog is shown before any ad tracking, requesting your consent. You can use the App normally even if you decline tracking.',
      'privacy.ads.p3': 'For Google AdMob\'s privacy policy, please refer to:',
      'privacy.ads.link': 'Google Privacy Policy',
      'privacy.collection.title': 'Personal Information',
      'privacy.collection.p1': 'The App does not provide account registration or login features, and does not collect personal information such as name, email address, or phone number.',
      'privacy.children.title': 'Children\'s Privacy',
      'privacy.children.p1': 'The App does not intentionally collect personal information from children under 13.',
      'privacy.changes.title': 'Policy Changes',
      'privacy.changes.p1': 'This policy may be updated without prior notice. When changes are made, the update date on this page will be revised.',
      'contact.title': 'Contact',
      'contact.desc': 'For questions, feedback, or bug reports, please use the form below.',
      'contact.btn': 'Open contact form',
      'footer.features': 'Features',
      'footer.howto': 'How to Play',
      'footer.privacy': 'Privacy',
      'footer.contact': 'Contact',
      'footer.copyright': '© Calm Blokku',
      'lang.ja': '日本語',
      'lang.en': 'English',
      urls: {
        appStore: 'https://apps.apple.com/us/app/calm-blokku/id6761009357',
        contactForm: 'https://forms.gle/kwtwF2FkEDE12ZcX8'
      }
    }
  };

  var supportedLangs = ['ja', 'en'];
  var defaultLang = 'ja';

  function getLangFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var lang = (params.get('lang') || '').toLowerCase();
    return supportedLangs.indexOf(lang) >= 0 ? lang : defaultLang;
  }

  function getLangUrl(lang) {
    var url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    return url.pathname + url.search;
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function applyLang(lang) {
    var t = translations[lang];
    document.documentElement.lang = lang;
    document.title = t['meta.title'];
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t['meta.description']);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t[key];
      if (val == null) return;
      if (val.indexOf('\n') >= 0) {
        el.innerHTML = val.split('\n').map(escapeHtml).join('<br>');
      } else {
        el.textContent = val;
      }
    });

    // List items (pipe-separated)
    document.querySelectorAll('[data-i18n-list]').forEach(function (ul) {
      var key = ul.getAttribute('data-i18n-list');
      var val = t[key];
      if (!val) return;
      var items = val.split('|');
      ul.innerHTML = items.map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      }).join('');
    });

    // URLs
    if (t.urls) {
      document.querySelectorAll('[data-i18n-href]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-href');
        var val = t.urls[key];
        if (val) el.setAttribute('href', val);
      });
    }

    // Lang switcher
    document.querySelectorAll('[data-lang-link]').forEach(function (el) {
      var linkLang = el.getAttribute('data-lang-link');
      el.setAttribute('href', getLangUrl(linkLang));
      el.classList.toggle('is-active', linkLang === lang);
    });
  }

  function init() {
    applyLang(getLangFromUrl());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
