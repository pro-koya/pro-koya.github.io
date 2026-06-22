// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番URL。独立ドメイン miya-koya.com に GitHub Pages で公開する想定。
// ドメイン確定前に GitHub Pages の <user>.github.io/<repo> で確認する場合は
// base を '/<repo>' に変更してください。
export default defineConfig({
  site: 'https://miya-koya.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
