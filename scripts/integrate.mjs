// みや小屋（Astro, dist/）と 個人ポートフォリオ（Next.js, portfolio/out/）を
// 1つの静的サイトに合成する。
//
//  - portfolio/out → dist/members/koya/portfolio        （サブパス配信）
//  - 画像など bare な絶対参照（/assets 等）はルートにも複製して解決
//  - 旧URL（/forge/privacy 等。App Store等から参照される可能性）→ 新URLへ自動リダイレクト
//
import { existsSync, mkdirSync, cpSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const out = join(root, 'portfolio', 'out');
const SUB = 'members/koya/portfolio';
const target = join(dist, SUB);

if (!existsSync(dist)) throw new Error('dist/ がありません。先に astro build を実行してください。');
if (!existsSync(out)) throw new Error('portfolio/out がありません。先に portfolio をビルドしてください。');

// 1) ポートフォリオ一式をサブパスへ
mkdirSync(target, { recursive: true });
cpSync(out, target, { recursive: true });
console.log(`✓ portfolio/out → dist/${SUB}`);

// 2) bare な絶対参照（プレーン <img src="/assets…"> 等）のためルートにも複製
const rootDupDirs = ['assets', 'manual-images', 'work-style'];
const rootDupFiles = ['toretabe-manual.html', 'toretabe-lp-standalone.html', 'toretabe-icon.png', 'app-ads.txt'];
for (const d of rootDupDirs) {
  const s = join(out, d);
  if (existsSync(s)) { cpSync(s, join(dist, d), { recursive: true }); console.log(`✓ dup /${d}`); }
}
for (const f of rootDupFiles) {
  const s = join(out, f);
  if (existsSync(s)) { cpSync(s, join(dist, f)); console.log(`✓ dup /${f}`); }
}

// 3) 旧URL → 新URL リダイレクト生成
// 会社サイトが使うトップ階層は触らない（会社ページ優先）
const RESERVED = new Set(['about', 'contact', 'works', 'services', 'members', 'privacy', 'build', '404']);

function redirectHtml(to) {
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="0; url=${to}">
<link rel="canonical" href="${to}"><meta name="robots" content="noindex">
<title>ページは移転しました</title>
<script>location.replace(${JSON.stringify(to)});</script>
</head><body style="font-family:sans-serif;padding:2rem">
このページは <a href="${to}">${to}</a> に移転しました。</body></html>`;
}

// portfolio/out 内の index.html を持つルートを列挙
function routes(dir, base = '') {
  const result = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name === '_next') continue;
    const route = base ? `${base}/${name}` : name;
    if (existsSync(join(p, 'index.html'))) result.push(route);
    result.push(...routes(p, route));
  }
  return result;
}

let made = 0, skipped = 0;
for (const route of routes(out)) {
  const top = route.split('/')[0];
  if (RESERVED.has(top)) { skipped++; continue; }
  const destDir = join(dist, ...route.split('/'));
  const destFile = join(destDir, 'index.html');
  if (existsSync(destFile)) { skipped++; continue; } // 会社ページ等が既にある場合は上書きしない
  mkdirSync(destDir, { recursive: true });
  writeFileSync(destFile, redirectHtml(`/${SUB}/${route}/`));
  made++;
}
console.log(`✓ redirects: ${made} 件生成 / ${skipped} 件スキップ（会社ページ優先）`);
console.log('✓ 統合完了');
