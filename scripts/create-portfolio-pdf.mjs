/**
 * 포트폴리오 데이터 기반 PDF 직접 생성
 * 사용법: node scripts/create-portfolio-pdf.mjs
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('output');
const FINAL_PDF = path.join(OUT_DIR, 'portfolio.pdf');

// ── 포트폴리오 데이터 ──────────────────────────────────────────

const profile = {
  name: '한도희',
  role: '풀스택 개발자',
  tagline: '깔끔한 코드와 사용자 경험을 중시하는 개발자입니다.',
  about:
    '안녕하세요! 저는 웹 개발에 열정을 가진 풀스택 개발자입니다.\n' +
    '사용자 중심의 서비스를 만드는 것을 좋아합니다.\n' +
    '새로운 기술을 배우고 적용하는 것에 항상 즐거움을 느낍니다.',
  email: 'sknskin@naver.com',
  phone: '010-7455-4829',
  address: '경기도 용인시 기흥구 용구대로 2394번길 27 래미안1차 115동 904호',
  github: 'https://github.com/sknskin',
};

const education = [
  { school: '중앙대학교 서울캠퍼스', major: '영어영문학과', period: '2012 - 2021', graduated: true },
  { school: '수지고등학교', period: '2009 - 2011', graduated: true },
];

const skills = [
  { name: 'Frontend', items: ['Vue.js', 'JSP', 'Nexacro', 'xFrame5'] },
  { name: 'Backend', items: ['Java', 'Spring', 'Spring Boot', 'Python', 'Node.js'] },
  { name: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle'] },
  { name: 'DevOps', items: ['Docker', 'Naver Cloud', 'Jenkins', 'Jeus'] },
  { name: 'Language', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'] },
];

const projects = [
  {
    title: '경기신용보증재단 유지보수',
    description: 'IT전략부에서 경영관리 파트 개발 담당',
    techs: ['Spring', 'Nexacro', 'Oracle', 'Jenkins', 'Jeus'],
    period: '2023.04 - 2024.05',
    role: '풀스택 개발자',
    details: [
      '화면 수정 및 마감 프로시저 수정 등 기존 프로젝트 유지보수',
      '차세대 프로젝트 연계 관련 소켓 전문 신규 개발',
      '지급 명세 항목 추가에 따른 쿠콘 솔루션 연계 개발 및 관련 전문 신규 개발',
    ],
    features: [
      'REST API 설계 및 구현',
      '실시간 데이터 동기화',
    ],
  },
  {
    title: '동아출판 AI 교과서',
    description: '컨소시엄에서 관리자 BO 개발 담당',
    techs: ['Spring Boot', 'Vue.js', 'MySQL', 'MongoDB', 'Naver Cloud', 'Jenkins'],
    period: '2024.06 - 2024.12',
    role: '풀스택 개발자',
    details: [
      '교육관리, 문의사항, 통계 등 관리자 화면 전체 개발',
      '통계 쿼리 튜닝 및 관리자 BO 관련 전체 사후관리',
    ],
    features: [
      'MSA 방식으로 타 시스템과의 연계',
      'Naver Cloud를 활용한 통계 데이터 제공',
    ],
  },
  {
    title: '평생교육진흥원 고도화',
    description: '홈페이지 고도화 및 기존 비즈니스 로직 개선',
    techs: ['eGovFramework', 'JSP', 'Oracle', 'Jeus'],
    period: '2024.12 - 2025.05',
    role: '풀스택 개발자',
    details: [
      '서버 증설 등 프로젝트 전체 고도화 및 DB 마이그레이션',
      '이용권 추첨 등 주요 비즈니스 로직 개선',
    ],
    features: [
      '반응형 모바일 앱',
      '푸시 알림 시스템',
      '간편인증 등 여러 인증 솔루션 연동',
    ],
  },
  {
    title: '서민금융진흥원 휴면예금 마이데이터 연계',
    description: '마이데이터 연계 구축 및 휴면예금 계정계 고도화',
    techs: ['Custom Spring Framework', 'Spring Boot', 'xFrame5', 'Vue.js', 'PostgreSQL', 'Oracle', 'Jenkins', 'Jeus'],
    period: '2025.05 - 2025.12',
    role: '풀스택 개발자',
    details: [
      '마이데이터 금융결제원 연계 서비스 개발',
      '마이데이터 개발 관련 휴면예금 계정계 신규 개발 및 고도화',
      '휴면예금 계정계 신규 화면 개발',
      '기타 웹 화면 개선 및 고도화',
    ],
    features: [
      '내부망 인터페이스 작업',
      '배치 및 스케줄러 등 작업',
      '타 기관 시스템과의 연계 작업',
    ],
  },
];

// ── HTML 생성 ──────────────────────────────────────────────────

function buildHTML() {
  const skillsHTML = skills.map(s => `
    <div class="skill-group">
      <h4>${s.name}</h4>
      <div class="tags">${s.items.map(i => `<span class="tag">${i}</span>`).join('')}</div>
    </div>
  `).join('');

  const educationHTML = education.map(e => `
    <div class="edu-item">
      <div class="edu-left">
        <strong>${e.school}</strong>${e.major ? ` — ${e.major}` : ''}
      </div>
      <div class="edu-right">${e.period} ${e.graduated ? '(졸업)' : ''}</div>
    </div>
  `).join('');

  const projectsHTML = projects.map(p => `
    <div class="project">
      <div class="project-header">
        <h3>${p.title}</h3>
        <span class="period">${p.period}</span>
      </div>
      <p class="project-desc">${p.description} · <em>${p.role}</em></p>
      <div class="project-body">
        <div class="project-section">
          <h4>상세 내용</h4>
          <ul>${p.details.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>
        ${p.features.length ? `
        <div class="project-section">
          <h4>주요 기능</h4>
          <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>` : ''}
        <div class="project-section">
          <h4>기술 스택</h4>
          <div class="tags">${p.techs.map(t => `<span class="tag tech">${t}</span>`).join('')}</div>
        </div>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1a1a2e;
    font-size: 10pt;
    line-height: 1.6;
    background: #fff;
  }

  /* Header */
  .header {
    text-align: center;
    padding-bottom: 16px;
    border-bottom: 2px solid #6c63ff;
    margin-bottom: 20px;
  }
  .header h1 {
    font-size: 26pt;
    font-weight: 800;
    color: #6c63ff;
    letter-spacing: -0.5px;
  }
  .header .role {
    font-size: 12pt;
    color: #555;
    margin-top: 2px;
  }
  .header .tagline {
    font-size: 9.5pt;
    color: #777;
    margin-top: 4px;
    font-style: italic;
  }

  /* Contact bar */
  .contact-bar {
    display: flex;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
    font-size: 9pt;
    color: #444;
    margin-bottom: 22px;
  }
  .contact-bar span { white-space: nowrap; }

  /* Section titles */
  .section-title {
    font-size: 13pt;
    font-weight: 700;
    color: #6c63ff;
    border-bottom: 1.5px solid #e0e0e0;
    padding-bottom: 4px;
    margin-bottom: 12px;
    margin-top: 22px;
  }

  /* About */
  .about p {
    white-space: pre-line;
    color: #333;
    font-size: 9.5pt;
  }

  /* Education */
  .edu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
  }
  .edu-right {
    font-size: 9pt;
    color: #666;
    white-space: nowrap;
  }

  /* Skills */
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .skill-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .skill-group h4 {
    font-size: 9.5pt;
    font-weight: 600;
    color: #333;
    min-width: 70px;
    margin-bottom: 0;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .tag {
    display: inline-block;
    background: #f0eeff;
    color: #5a52d5;
    font-size: 8pt;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
  .tag.tech {
    background: #e8f5e9;
    color: #2e7d32;
  }

  /* Projects */
  .project {
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 14px;
    page-break-inside: avoid;
  }
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .project-header h3 {
    font-size: 12pt;
    font-weight: 700;
    color: #1a1a2e;
  }
  .period {
    font-size: 8.5pt;
    color: #888;
    white-space: nowrap;
  }
  .project-desc {
    font-size: 9.5pt;
    color: #555;
    margin: 4px 0 10px;
  }
  .project-section {
    margin-bottom: 8px;
  }
  .project-section h4 {
    font-size: 9pt;
    font-weight: 600;
    color: #6c63ff;
    margin-bottom: 3px;
  }
  .project-section ul {
    padding-left: 16px;
    font-size: 9pt;
    color: #444;
  }
  .project-section li {
    margin-bottom: 2px;
  }

  /* Footer */
  .footer {
    text-align: center;
    font-size: 8pt;
    color: #aaa;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #e0e0e0;
  }
</style>
</head>
<body>

  <div class="header">
    <h1>${profile.name}</h1>
    <div class="role">${profile.role}</div>
    <div class="tagline">${profile.tagline}</div>
  </div>

  <div class="contact-bar">
    <span>📧 ${profile.email}</span>
    <span>📱 ${profile.phone}</span>
    <span>📍 ${profile.address}</span>
    <span>🔗 github.com/sknskin</span>
    <span>🌐 portfolio-ten-rho-to67iagzpy.vercel.app</span>
  </div>

  <div class="section-title">소개</div>
  <div class="about">
    <p>${profile.about}</p>
  </div>

  <div class="section-title">학력</div>
  ${educationHTML}

  <div class="section-title">기술 스택</div>
  <div class="skills-grid">
    ${skillsHTML}
  </div>

  <div class="section-title" style="page-break-before: always;">프로젝트</div>
  ${projectsHTML}


</body>
</html>`;
}

// ── PDF 생성 ──────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // 기존 PNG 정리
  const oldPngs = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'));
  for (const f of oldPngs) fs.unlinkSync(path.join(OUT_DIR, f));

  const html = buildHTML();

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'load' });

  await page.pdf({
    path: FINAL_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
  });

  await browser.close();

  console.log(`✅ PDF 생성 완료: ${FINAL_PDF}`);
}

main().catch(console.error);
