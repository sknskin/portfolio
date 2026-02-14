import {
  Code2,
  Database,
  Globe,
  Server,
  GitBranch,
  type LucideIcon,
} from 'lucide-react';

export type Bi = { ko: string; en: string };

export interface Skill {
  name: string;
  icon: LucideIcon;
  items: string[];
}

export interface Project {
  title: string;
  description: Bi;
  techs: string[];
  github?: string;
  demo?: string;
  period?: string;
  role?: Bi;
  details?: Bi[];
  features?: Bi[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export const profile = {
  name: { ko: '한도희', en: 'Han Do Hee'} as Bi,
  role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' } as Bi,
  tagline: {
    ko: '깔끔한 코드와 사용자 경험을 중시하는 개발자입니다.',
    en: 'A developer who values clean code and great user experience.',
  } as Bi,
  about: {
    ko:
      '안녕하세요! 저는 웹 개발에 열정을 가진 풀스택 개발자입니다. ' +
      'Java, Vue.js, Jsp를 주로 사용하며, ' +
      '사용자 중심의 서비스를 만드는 것을 좋아합니다. ' +
      '새로운 기술을 배우고 적용하는 것에 항상 즐거움을 느낍니다.',
    en:
      'Hello! I am a full-stack developer passionate about web development. ' +
      'I primarily work with Java, Vue.js, and JSP, ' +
      'and I enjoy building user-centered services. ' +
      'I always find joy in learning and applying new technologies.',
  } as Bi,
  email: 'sknskin@naver.com',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/sknskin' },
  { label: 'Velog', url: 'https://velog.io/@dhhan/posts' },
];

export const skills: Skill[] = [
  {
    name: 'Frontend',
    icon: Globe,
    items: ['Vue.js', 'jsp', 'Nexacro', 'xFrame5'],
  },
  {
    name: 'Backend',
    icon: Server,
    items: ['Java', 'Spring', 'Spring Boot', 'Python', 'Node.js'],
  },
  {
    name: 'Database',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle'],
  },
  {
    name: 'DevOps',
    icon: GitBranch,
    items: ['Docker', 'Naver Cloud', 'Jenkins'],
  },
  {
    name: 'Language',
    icon: Code2,
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'],
  },
];

export const projects: Project[] = [
  {
    title: '경기신용보증재단 유지보수',
    description: {
      ko: 'IT전략부에서 경영관리 파트 개발 담당',
      en: 'Responsible for business management module development in the IT Strategy Division',
    },
    techs: ['Spring', 'Nexacro', 'Oracle', 'Jenkins', 'Jeus'],
    period: '2023.04 - 2024.05',
    role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' },
    details: [
      { ko: '화면 수정 및 마감 프로시저 수정 등 기존 프로젝트 유지보수', en: 'Maintained existing project including UI modifications and closing procedure updates' },
      { ko: '차세대 프로젝트 연계 관련 소켓 전문 신규 개발', en: 'Developed new socket messaging system for next-generation project integration' },
      { ko: '지급 명세 항목 추가에 따른 쿠콘 솔루션 연계 개발 및 관련 전문 신규 개발', en: 'Developed Coocon solution integration and new messaging for payment specification additions' },
    ],
    features: [
      { ko: 'REST API 설계 및 구현', en: 'REST API design & implementation' },
      { ko: '실시간 데이터 동기화', en: 'Real-time data synchronization' },
    ],
  },
  {
    title: '동아출판 AI 교과서',
    description: {
      ko: '컨소시엄에서 관리자 BO 개발 담당',
      en: 'Responsible for admin back-office development in the consortium',
    },
    techs: ['Spring Boot', 'Vue.js', 'MySQL', 'MongoDB', 'Naver Cloud', 'Jenkins'],
    period: '2024.06 - 2024.12',
    role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' },
    details: [
      { ko: '교육관리, 문의사항, 통계 등 관리자 화면 전체 개발', en: 'Developed full admin pages including education management, inquiries, and statistics' },
      { ko: '통계 쿼리 튜닝 및 관리자 BO 관련 전체 사후관리', en: 'Statistics query tuning and overall admin back-office post-maintenance' },
    ],
    features: [
      { ko: 'MSA 방식으로 타 시스템과의 연계', en: 'MSA-based integration with external systems' },
      { ko: 'Naver Cloud를 활용한 통계 데이터 제공', en: 'Statistics data delivery via Naver Cloud' },
    ],
  },
  {
    title: '평생교육진흥원 고도화',
    description: {
      ko: '홈페이지 고도화 및 기존 비즈니스 로직 개선',
      en: 'Website upgrade and existing business logic improvements',
    },
    techs: ['eGovFramework', 'JSP', 'Oracle', 'Jeus'],
    period: '2024.12 - 2025.05',
    role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' },
    details: [
      { ko: '서버 증설 등 프로젝트 전체 고도화 및 DB 마이그레이션', en: 'Full project upgrade including server scaling and DB migration' },
      { ko: '이용권 추첨 등 주요 비즈니스 로직 개선', en: 'Improved core business logic such as voucher lottery system' },
    ],
    features: [
      { ko: '반응형 모바일 앱', en: 'Responsive mobile application' },
      { ko: '푸시 알림 시스템', en: 'Push notification system' },
      { ko: '간편인증 등 여러 인증 솔루션 연동', en: 'Integration with multiple authentication solutions including simple auth' },
    ],
  },
  {
    title: '서민금융진흥원 휴면예금 마이데이터 연계',
    description: {
      ko: '마이데이터 연계 구축 및 휴면예금 계정계 고도화',
      en: 'MyData integration development and dormant deposit core banking system upgrade',
    },
    techs: ['Custom Spring Framework', 'Spring Boot', 'xFrame5', 'Vue.js', 'PostgreSQL', 'Oracle', 'Jenkins', 'Jeus'],
    period: '2025.05 - 2025.12',
    role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' },
    details: [
      { ko: '마이데이터 금융결제원 연계 서비스 개발', en: 'Developed MyData integration service with Korea Financial Telecommunications & Clearings Institute' },
      { ko: '마이데이터 개발 관련 휴면예금 계정계 신규 개발 및 고도화', en: 'New development and upgrade of dormant deposit core banking system for MyData' },
      { ko: '휴면예금 계정계 신규 화면 개발', en: 'Developed new UI screens for dormant deposit core banking' },
      { ko: '기타 웹 화면 개선 및 고도화', en: 'General web UI improvements and upgrades' },
    ],
    features: [
      { ko: '내부망 인터페이스 작업', en: 'Internal network interface development' },
      { ko: '배치 및 스케줄러 등 작업', en: 'Batch processing and scheduler implementation' },
      { ko: '타 기관 시스템과의 연계 작업', en: 'Integration with external institutional systems' },
    ],
  },
];

export const navItems = [
  { label: { ko: '소개', en: 'About' } as Bi, href: '#about' },
  { label: { ko: '기술', en: 'Skills' } as Bi, href: '#skills' },
  { label: { ko: '프로젝트', en: 'Projects' } as Bi, href: '#projects' },
  { label: { ko: '연락처', en: 'Contact' } as Bi, href: '#contact' },
];
