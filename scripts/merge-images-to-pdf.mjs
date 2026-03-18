/**
 * PNG 이미지들을 하나의 PDF로 합침 (Playwright 사용)
 * 사용법: node scripts/merge-images-to-pdf.mjs
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('output');
const FINAL_PDF = path.join(OUT_DIR, 'portfolio.pdf');

async function main() {
  const pngFiles = fs.readdirSync(OUT_DIR)
    .filter(f => f.endsWith('.png'))
    .sort()
    .map(f => path.join(OUT_DIR, f));

  if (pngFiles.length === 0) {
    console.error('PNG 파일이 없습니다. 먼저 generate-pdf.mjs를 실행하세요.');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 각 이미지를 페이지로 만드는 HTML 생성
  const imgTags = pngFiles.map((f) => {
    const b64 = fs.readFileSync(f).toString('base64');
    return `<div class="page"><img src="data:image/png;base64,${b64}" /></div>`;
  }).join('\n');

  await page.setContent(`
    <html>
      <style>
        * { margin: 0; padding: 0; }
        @page { margin: 0; }
        .page {
          page-break-after: always;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100vw;
          min-height: 100vh;
          background: #0a0a0f;
        }
        .page:last-child { page-break-after: auto; }
        .page img {
          width: 100%;
          display: block;
        }
      </style>
      <body>${imgTags}</body>
    </html>
  `, { waitUntil: 'load' });

  await page.pdf({
    path: FINAL_PDF,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();

  // 임시 PNG 정리
  for (const f of pngFiles) fs.unlinkSync(f);

  console.log(`✅ PDF 생성 완료: ${FINAL_PDF}`);
}

main().catch(console.error);
