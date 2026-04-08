import type { Point } from './types';

interface ExtractOptions {
  /** SVGをCanvasに描画するサイズ（デフォルト 512） */
  renderSize?: number;
  /** 何pxおきにサンプリングするか（デフォルト 4） */
  sampleStep?: number;
  /** 最大点数（デフォルト 3000） */
  maxPoints?: number;
  /** アルファ閾値：これ以上の透明度の画素を採用（デフォルト 40） */
  alphaThreshold?: number;
}

/**
 * SVG URL → 正規化された点群（x, y: 0〜1, r/g/b: 0〜255）
 *
 * 仕組み：
 *   1. <img> で SVG を読み込む
 *   2. オフスクリーン Canvas に描画
 *   3. getImageData() でピクセルをスキャン
 *   4. alpha > threshold の画素をサンプリング → Point[]
 *   5. シャッフルして maxPoints 件に絞る
 */
export async function extractPointsFromSVG(
  svgUrl: string,
  options: ExtractOptions = {},
): Promise<Point[]> {
  const {
    renderSize = 624,
    sampleStep = 4,
    maxPoints = 3000,
    alphaThreshold = 40,
  } = options;

  return new Promise<Point[]>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = renderSize;
      canvas.height = renderSize;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get 2D context for offscreen canvas'));
        return;
      }

      ctx.drawImage(img, 0, 0, renderSize, renderSize);

      let imageData: ImageData;
      try {
        imageData = ctx.getImageData(0, 0, renderSize, renderSize);
      } catch (e) {
        reject(new Error(`getImageData failed (CORS?): ${e}`));
        return;
      }

      const { data } = imageData;
      const points: Point[] = [];

      for (let y = 0; y < renderSize; y += sampleStep) {
        for (let x = 0; x < renderSize; x += sampleStep) {
          const idx = (y * renderSize + x) * 4;
          const a = data[idx + 3];
          if (a >= alphaThreshold) {
            points.push({
              x: x / renderSize, // 正規化 0〜1
              y: y / renderSize,
              r: data[idx],
              g: data[idx + 1],
              b: data[idx + 2],
            });
          }
        }
      }

      shuffleInPlace(points);
      resolve(points.slice(0, maxPoints));
    };

    img.onerror = () => {
      reject(new Error(`SVG load failed: ${svgUrl}`));
    };

    img.src = svgUrl;
  });
}

/** Fisher-Yates shuffle（in-place） */
function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}
