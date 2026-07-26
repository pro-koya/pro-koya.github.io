/**
 * 法人LP S1「4枚の書類」画像の地色を、LP の背景色（--kf-paper #f5f1e8）にそろえる。
 *
 * ChatGPT の生成画像は色を指定しても地色が数段階ずれる（250,246,238 など）うえ、
 * 1枚ごとに微妙に違う。そのまま4枚並べると LP 上で「四角い色ムラ」に見えてしまう。
 * そこで各画像の地色を測り、全画素を同じ量だけ平行移動して地色を #f5f1e8 に合わせる。
 * 乗算ではなく加算オフセットなので、白カード・グレーバー・深緑アイコンの
 * 相対的な色関係は保たれる（ずれは高々 5/255）。
 *
 * 使い方（public/koefarm/business/ の4枚をその場で書き換える）:
 *   node scripts/normalize-koefarm-docs.mjs
 * 冪等。すでに合っている画像は "already aligned" と出るだけで書き換えない。
 */
import { fileURLToPath } from 'node:url';
import { rename, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const TARGET = [0xf5, 0xf1, 0xe8]; // --kf-paper
const FILES = ['doc-report', 'doc-attendance', 'doc-labor', 'doc-ledger'];
const dir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'koefarm',
  'business'
);

/** 画像の外周リング（端から2%）の中央値を地色とみなす */
function sampleBackground(data, width, height, channels) {
  const band = Math.max(2, Math.round(width * 0.02));
  const samples = [[], [], []];
  const push = (x, y) => {
    const o = (y * width + x) * channels;
    for (let c = 0; c < 3; c++) samples[c].push(data[o + c]);
  };
  for (let x = 0; x < width; x += 3) {
    for (let y = 0; y < band; y++) push(x, y);
    for (let y = height - band; y < height; y++) push(x, y);
  }
  for (let y = band; y < height - band; y += 3) {
    for (let x = 0; x < band; x++) push(x, y);
    for (let x = width - band; x < width; x++) push(x, y);
  }
  return samples.map((s) => {
    s.sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  });
}

for (const name of FILES) {
  const file = path.join(dir, `${name}.png`);
  try {
    await access(file);
  } catch {
    console.log(`${name}: missing, skipped`);
    continue;
  }
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const bg = sampleBackground(data, width, height, channels);
  const delta = TARGET.map((t, c) => t - bg[c]);

  if (delta.every((d) => d === 0)) {
    console.log(`${name}: already aligned (${bg.join(',')})`);
    continue;
  }

  for (let i = 0; i < data.length; i += channels) {
    for (let c = 0; c < 3; c++) {
      const v = data[i + c] + delta[c];
      data[i + c] = v < 0 ? 0 : v > 255 ? 255 : v;
    }
  }

  const tmp = `${file}.tmp.png`;
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  await rename(tmp, file);

  console.log(`${name}: ${bg.join(',')} -> ${TARGET.join(',')} (delta ${delta.join(',')})`);
}
