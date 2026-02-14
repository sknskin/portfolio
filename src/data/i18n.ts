import type { Lang } from '../contexts/LanguageContext';

const translations: Record<string, { ko: string; en: string }> = {
  'hero.greeting': { ko: '안녕하세요', en: "Hello, I'm" },
  'contact.desc': {
    ko: '프로젝트 협업이나 채용 관련 문의는 아래 이메일로 연락해 주세요.',
    en: 'Feel free to reach out for project collaboration or job inquiries.',
  },
  'contact.send': { ko: '이메일 보내기', en: 'Send Email' },
  'modal.details': { ko: '상세 내용', en: 'Details' },
  'modal.features': { ko: '주요 기능', en: 'Features' },
  'modal.tech': { ko: '기술 스택', en: 'Tech Stack' },
  'modal.demo': { ko: '라이브 데모', en: 'Live Demo' },
  'footer.built': {
    ko: 'React & Tailwind CSS로 제작되었습니다.',
    en: 'Built with React & Tailwind CSS.',
  },
};

export function tr(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}
