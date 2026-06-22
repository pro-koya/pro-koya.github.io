import type { NextConfig } from 'next';

// みや小屋サイトのサブパスとして配信する。
//  本番URL: https://miya-koya.com/members/koya/portfolio/
//  （GitHub Pages ユーザーページのため base は常に "/"。サブパスは basePath で表現）
const BASE = '/members/koya/portfolio';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: BASE,
  assetPrefix: BASE,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE,
  },
};

export default nextConfig;
