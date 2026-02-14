import {
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
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

// ──────────────────────────────────────────────
// 아래 내용을 본인 정보로 수정하세요
// ──────────────────────────────────────────────

export const profile = {
  name: 'Your Name',
  role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' } as Bi,
  tagline: {
    ko: '깔끔한 코드와 사용자 경험을 중시하는 개발자입니다.',
    en: 'A developer who values clean code and great user experience.',
  } as Bi,
  about: {
    ko:
      '안녕하세요! 저는 웹 개발에 열정을 가진 풀스택 개발자입니다. ' +
      'React, TypeScript, Node.js를 주로 사용하며, ' +
      '사용자 중심의 서비스를 만드는 것을 좋아합니다. ' +
      '새로운 기술을 배우고 적용하는 것에 항상 즐거움을 느낍니다.',
    en:
      'Hello! I am a full-stack developer passionate about web development. ' +
      'I primarily work with React, TypeScript, and Node.js, ' +
      'and I enjoy building user-centered services. ' +
      'I always find joy in learning and applying new technologies.',
  } as Bi,
  email: 'your.email@example.com',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/yourusername' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
  { label: 'Blog', url: 'https://yourblog.com' },
];

export const skills: Skill[] = [
  {
    name: 'Frontend',
    icon: Globe,
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Backend',
    icon: Server,
    items: ['Node.js', 'NestJS', 'Express', 'Java', 'Spring Boot'],
  },
  {
    name: 'Database',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    name: 'Mobile',
    icon: Smartphone,
    items: ['React Native', 'Flutter'],
  },
  {
    name: 'DevOps',
    icon: GitBranch,
    items: ['Docker', 'AWS', 'CI/CD', 'Nginx', 'GitHub Actions'],
  },
  {
    name: 'Language',
    icon: Code2,
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'],
  },
];

export const projects: Project[] = [
  {
    title: 'Project One',
    description: {
      ko: '설명을 입력하세요. 이 프로젝트는 어떤 문제를 해결하고, 어떤 기술을 사용했는지 작성합니다.',
      en: 'Enter a description. Write about what problem this project solves and what technologies were used.',
    },
    techs: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
    github: 'https://github.com/yourusername/project-one',
    demo: 'https://project-one.vercel.app',
    period: '2024.06 - 2024.09',
    role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' },
    details: [
      { ko: '프로젝트의 배경과 목적을 설명하세요.', en: 'Describe the background and purpose of the project.' },
      { ko: '어떤 문제를 해결하기 위해 시작했는지 작성하세요.', en: 'Write about what problem you started to solve.' },
      { ko: '기술적으로 도전적이었던 부분과 해결 과정을 설명하세요.', en: 'Explain the technically challenging parts and how you solved them.' },
    ],
    features: [
      { ko: 'JWT 기반 인증 시스템', en: 'JWT-based authentication' },
      { ko: '실시간 데이터 동기화', en: 'Real-time data synchronization' },
      { ko: '반응형 대시보드 UI', en: 'Responsive dashboard UI' },
      { ko: 'REST API 설계 및 구현', en: 'REST API design & implementation' },
    ],
  },
  {
    title: 'Project Two',
    description: {
      ko: '설명을 입력하세요. 이 프로젝트는 어떤 문제를 해결하고, 어떤 기술을 사용했는지 작성합니다.',
      en: 'Enter a description. Write about what problem this project solves and what technologies were used.',
    },
    techs: ['Next.js', 'Tailwind CSS', 'Prisma', 'Vercel'],
    github: 'https://github.com/yourusername/project-two',
    period: '2024.01 - 2024.05',
    role: { ko: '프론트엔드 개발자', en: 'Frontend Developer' },
    details: [
      { ko: '프로젝트의 배경과 목적을 설명하세요.', en: 'Describe the background and purpose of the project.' },
      { ko: '어떤 문제를 해결하기 위해 시작했는지 작성하세요.', en: 'Write about what problem you started to solve.' },
    ],
    features: [
      { ko: 'SSR / SSG 하이브리드 렌더링', en: 'SSR / SSG hybrid rendering' },
      { ko: 'SEO 최적화', en: 'SEO optimization' },
      { ko: 'Prisma ORM 기반 데이터 관리', en: 'Prisma ORM-based data management' },
    ],
  },
  {
    title: 'Project Three',
    description: {
      ko: '설명을 입력하세요. 이 프로젝트는 어떤 문제를 해결하고, 어떤 기술을 사용했는지 작성합니다.',
      en: 'Enter a description. Write about what problem this project solves and what technologies were used.',
    },
    techs: ['React Native', 'Firebase', 'Redux'],
    github: 'https://github.com/yourusername/project-three',
    demo: 'https://project-three.vercel.app',
    period: '2023.08 - 2023.12',
    role: { ko: '모바일 개발자', en: 'Mobile Developer' },
    details: [
      { ko: '프로젝트의 배경과 목적을 설명하세요.', en: 'Describe the background and purpose of the project.' },
      { ko: '어떤 문제를 해결하기 위해 시작했는지 작성하세요.', en: 'Write about what problem you started to solve.' },
    ],
    features: [
      { ko: '크로스 플랫폼 모바일 앱', en: 'Cross-platform mobile app' },
      { ko: 'Firebase 실시간 DB 연동', en: 'Firebase real-time DB integration' },
      { ko: '푸시 알림 시스템', en: 'Push notification system' },
    ],
  },
];

export const navItems = [
  { label: { ko: '소개', en: 'About' } as Bi, href: '#about' },
  { label: { ko: '기술', en: 'Skills' } as Bi, href: '#skills' },
  { label: { ko: '프로젝트', en: 'Projects' } as Bi, href: '#projects' },
  { label: { ko: '연락처', en: 'Contact' } as Bi, href: '#contact' },
];
