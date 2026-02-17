# Portfolio

개인 포트폴리오 웹사이트 — 풀스택 개발자 한도희의 경력, 기술 스택, 프로젝트를 소개하는 SPA입니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19, TypeScript 5.9 |
| 빌드 | Vite 7 |
| 스타일링 | Tailwind CSS 4 |
| 애니메이션 | Framer Motion |
| 아이콘 | Lucide React |
| 테스트 | Playwright (E2E) |
| 배포 | Vercel |

## 주요 기능

- **다국어 지원** — 한국어 / English 전환
- **다크/라이트 테마** — localStorage 기반 테마 저장
- **반응형 디자인** — 모바일, 태블릿, 데스크톱 대응
- **스크롤 애니메이션** — Framer Motion 기반 ScrollReveal
- **프로젝트 모달** — 상세 프로젝트 정보를 모달로 표시

## 프로젝트 구조

```
src/
├── App.tsx                    # 메인 컴포넌트
├── main.tsx                   # 엔트리 포인트
├── components/
│   ├── Header.tsx             # 네비게이션 (스크롤 감지, 활성 섹션)
│   ├── Hero.tsx               # 인트로 섹션
│   ├── About.tsx              # 소개
│   ├── Skills.tsx             # 기술 스택 (카테고리별)
│   ├── Projects.tsx           # 프로젝트 목록
│   ├── ProjectModal.tsx       # 프로젝트 상세 모달
│   ├── Contact.tsx            # 연락처
│   ├── ScrollReveal.tsx       # 스크롤 애니메이션 래퍼
│   ├── GlowCard.tsx           # 글로우 효과 카드
│   ├── TechMarquee.tsx        # 기술 마퀴 애니메이션
│   ├── Preloader.tsx          # 로딩 애니메이션
│   └── BackgroundGlow.tsx     # 배경 글로우 효과
├── contexts/
│   ├── ThemeContext.tsx        # 다크/라이트 테마
│   └── LanguageContext.tsx     # 한국어/영어 전환
├── data/
│   ├── portfolio.ts           # 프로필, 스킬, 프로젝트 데이터
│   ├── i18n.ts                # 다국어 번역
│   └── techIcons.ts           # 기술 아이콘 매핑
└── index.css                  # 글로벌 스타일
```

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# E2E 테스트
npx playwright test
```
