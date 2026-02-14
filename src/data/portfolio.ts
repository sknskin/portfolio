import {
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  GitBranch,
  type LucideIcon,
} from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  techs: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
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
  role: 'Full-Stack Developer',
  tagline: '깔끔한 코드와 사용자 경험을 중시하는 개발자입니다.',
  about:
    '안녕하세요! 저는 웹 개발에 열정을 가진 풀스택 개발자입니다. ' +
    'React, TypeScript, Node.js를 주로 사용하며, ' +
    '사용자 중심의 서비스를 만드는 것을 좋아합니다. ' +
    '새로운 기술을 배우고 적용하는 것에 항상 즐거움을 느낍니다.',
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
    description:
      '설명을 입력하세요. 이 프로젝트는 어떤 문제를 해결하고, 어떤 기술을 사용했는지 작성합니다.',
    techs: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
    github: 'https://github.com/yourusername/project-one',
    demo: 'https://project-one.vercel.app',
  },
  {
    title: 'Project Two',
    description:
      '설명을 입력하세요. 이 프로젝트는 어떤 문제를 해결하고, 어떤 기술을 사용했는지 작성합니다.',
    techs: ['Next.js', 'Tailwind CSS', 'Prisma', 'Vercel'],
    github: 'https://github.com/yourusername/project-two',
  },
  {
    title: 'Project Three',
    description:
      '설명을 입력하세요. 이 프로젝트는 어떤 문제를 해결하고, 어떤 기술을 사용했는지 작성합니다.',
    techs: ['React Native', 'Firebase', 'Redux'],
    github: 'https://github.com/yourusername/project-three',
    demo: 'https://project-three.vercel.app',
  },
];

export const experiences: Experience[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Company Name',
    period: '2024.01 - Present',
    description: [
      '주요 업무 및 성과를 작성하세요.',
      '기술 스택과 담당 역할을 작성하세요.',
      '정량적 성과가 있다면 포함하세요.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Previous Company',
    period: '2022.06 - 2023.12',
    description: [
      '주요 업무 및 성과를 작성하세요.',
      '기술 스택과 담당 역할을 작성하세요.',
    ],
  },
];

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
