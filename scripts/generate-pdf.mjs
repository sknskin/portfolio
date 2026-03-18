/**
 * 포트폴리오 → PDF 생성 스크립트
 *
 * 1) 메인 페이지 전체 캡처 (스크린샷)
 * 2) 각 프로젝트 모달 캡처
 * 3) macOS Quartz로 하나의 PDF에 합침
 *
 * 사용법: node scripts/generate-pdf.mjs [URL]
 */
import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const URL = process.argv[2] || 'https://portfolio-ten-rho-to67iagzpy.vercel.app/';
const OUT_DIR = path.resolve('output');
const FINAL_PDF = path.join(OUT_DIR, 'portfolio.pdf');
const VIEWPORT = { width: 1280, height: 900 };

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await (await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: 'ko-KR',
  })).newPage();

  console.log('1) 페이지 로드 중...');
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // Preloader

  // 스크롤로 애니메이션 트리거
  console.log('2) 스크롤 애니메이션 트리거...');
  await autoScroll(page);
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // 메인 페이지 풀스크린 캡처
  console.log('3) 메인 페이지 캡처...');
  await page.screenshot({
    path: path.join(OUT_DIR, '00-main.png'),
    fullPage: true,
  });

  // 프로젝트 모달 캡처
  const cards = await page.locator('#projects .space-y-5 > div').all();
  console.log(`4) 프로젝트 ${cards.length}개 모달 캡처...`);

  for (let i = 0; i < cards.length; i++) {
    await cards[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await cards[i].click();
    await page.waitForTimeout(900); // 모달 오픈 애니메이션

    await page.screenshot({
      path: path.join(OUT_DIR, `0${i + 1}-modal.png`),
      fullPage: false, // 뷰포트만 (모달이 보이는 영역)
    });
    console.log(`   ✓ 프로젝트 ${i + 1} 캡처`);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(700);
  }

  await browser.close();

  // PNG → 하나의 PDF (macOS Quartz 사용)
  console.log('5) PDF 생성 중...');
  const pngFiles = fs.readdirSync(OUT_DIR)
    .filter(f => f.endsWith('.png'))
    .sort()
    .map(f => path.join(OUT_DIR, f));

  imagesToPDF(pngFiles, FINAL_PDF);

  // 임시 PNG 정리
  for (const f of pngFiles) fs.unlinkSync(f);

  console.log(`\n✅ 완료: ${FINAL_PDF}`);
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const t = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(t);
          resolve();
        }
      }, 80);
    });
  });
}

function imagesToPDF(imagePaths, outputPath) {
  const scriptPath = path.resolve('scripts/merge-images-to-pdf.py');
  const result = execSync(
    `python3 ${JSON.stringify(scriptPath)} ${JSON.stringify(JSON.stringify(imagePaths))} ${JSON.stringify(outputPath)}`,
    { encoding: 'utf-8', timeout: 30000 },
  ).trim();

  if (result !== 'OK') {
    throw new Error(`PDF 생성 실패: ${result}`);
  }
}

main().catch(console.error);
