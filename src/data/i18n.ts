import type { Lang } from '../contexts/LanguageContext';

const translations: Record<string, { ko: string; en: string }> = {
  'hero.greeting': { ko: '안녕하세요', en: "Hello, I'm" },
  'contact.desc': {
    ko: '프로젝트 협업이나 채용 관련 문의는 편하게 연락해 주세요.',
    en: 'Feel free to reach out for project collaboration or job inquiries.',
  },
  'contact.github.desc': {
    ko: '프로젝트 소스 코드와 개인 작업물을 확인하실 수 있습니다.',
    en: 'Check out my project source code and personal works.',
  },
  'contact.send': { ko: '이메일 보내기', en: 'Send Email' },
  'contact.copied': { ko: '클립보드에 복사되었습니다!', en: 'Copied to clipboard!' },
  'about.education': { ko: '학력', en: 'Education' },
  'about.graduated': { ko: '졸업', en: 'Graduated' },
  'modal.details': { ko: '상세 내용', en: 'Details' },
  'modal.features': { ko: '주요 기능', en: 'Features' },
  'modal.tech': { ko: '기술 스택', en: 'Tech Stack' },
  'modal.demo': { ko: '라이브 데모', en: 'Live Demo' },
  'footer.built': {
    ko: 'React, TypeScript, Tailwind CSS, Framer Motion으로 제작되었습니다. Vercel을 통해 배포됩니다.',
    en: 'Built with React, TypeScript, Tailwind CSS & Framer Motion. Deployed on Vercel.',
  },
};

export function tr(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}
