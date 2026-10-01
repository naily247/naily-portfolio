import type {
  CSSProperties,
  ElementType,
} from 'react';

import {
  Braces,
  Cloud,
  Code2,
  Database,
  FileCode2,
  FlaskConical,
  Layers3,
  Network,
  Package,
  ServerCog,
  ShieldCheck,
  Smartphone,
  TerminalSquare,
  Wrench,
} from 'lucide-react';

import {
  SiAndroid,
  SiAxios,
  SiBootstrap,
  SiC,
  SiCloudinary,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiRabbitmq,
  SiReact,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZod,
} from 'react-icons/si';

export type BrandIcon =
  ElementType<{
    className?: string;
    style?: CSSProperties;
  }>;

export type TechnologyVisual = {
  icon: BrandIcon;
  color: string;
  softColor: string;
};

export const fallbackTechnologyVisual: TechnologyVisual =
  {
    icon: Code2,
    color: '#7568d8',
    softColor:
      'rgba(117, 104, 216, 0.12)',
  };

export const technologyVisuals: Record<
  string,
  TechnologyVisual
> = {
  React: {
    icon: SiReact,
    color: '#61DAFB',
    softColor:
      'rgba(97, 218, 251, 0.12)',
  },

  'Next.js': {
    icon: SiNextdotjs,
    color: '#FFFFFF',
    softColor:
      'rgba(255, 255, 255, 0.08)',
  },

  TypeScript: {
    icon: SiTypescript,
    color: '#3178C6',
    softColor:
      'rgba(49, 120, 198, 0.13)',
  },

  Tailwind: {
    icon: SiTailwindcss,
    color: '#06B6D4',
    softColor:
      'rgba(6, 182, 212, 0.12)',
  },

  'React Native': {
    icon: SiReact,
    color: '#61DAFB',
    softColor:
      'rgba(97, 218, 251, 0.12)',
  },

  Expo: {
    icon: SiExpo,
    color: '#FFFFFF',
    softColor:
      'rgba(255, 255, 255, 0.08)',
  },

  'React Hook Form': {
    icon: SiReact,
    color: '#EC5990',
    softColor:
      'rgba(236, 89, 144, 0.11)',
  },

  RHF: {
    icon: SiReact,
    color: '#EC5990',
    softColor:
      'rgba(236, 89, 144, 0.11)',
  },

  'REST APIs': {
    icon: Network,
    color: '#9B8CFF',
    softColor:
      'rgba(155, 140, 255, 0.12)',
  },

  'REST API': {
    icon: Network,
    color: '#9B8CFF',
    softColor:
      'rgba(155, 140, 255, 0.12)',
  },

  'Node.js': {
    icon: SiNodedotjs,
    color: '#5FA04E',
    softColor:
      'rgba(95, 160, 78, 0.12)',
  },

  Express: {
    icon: SiExpress,
    color: '#FFFFFF',
    softColor:
      'rgba(255, 255, 255, 0.08)',
  },

  JWT: {
    icon: SiJsonwebtokens,
    color: '#D8D5FF',
    softColor:
      'rgba(216, 213, 255, 0.11)',
  },

  Zod: {
    icon: SiZod,
    color: '#3E67B1',
    softColor:
      'rgba(62, 103, 177, 0.12)',
  },

  Java: {
    icon: Code2,
    color: '#E76F00',
    softColor:
      'rgba(231, 111, 0, 0.11)',
  },

  Prisma: {
    icon: SiPrisma,
    color: '#8CA6C4',
    softColor:
      'rgba(140, 166, 196, 0.11)',
  },

  PostgreSQL: {
    icon: SiPostgresql,
    color: '#4169E1',
    softColor:
      'rgba(65, 105, 225, 0.12)',
  },

  MongoDB: {
    icon: SiMongodb,
    color: '#47A248',
    softColor:
      'rgba(71, 162, 72, 0.12)',
  },

  Mongoose: {
    icon: SiMongodb,
    color: '#880000',
    softColor:
      'rgba(136, 0, 0, 0.10)',
  },

  SQL: {
    icon: Database,
    color: '#83B7FF',
    softColor:
      'rgba(131, 183, 255, 0.11)',
  },

  Cloudinary: {
    icon: SiCloudinary,
    color: '#3448C5',
    softColor:
      'rgba(52, 72, 197, 0.11)',
  },

  Stripe: {
    icon: SiStripe,
    color: '#635BFF',
    softColor:
      'rgba(99, 91, 255, 0.12)',
  },

  Git: {
    icon: SiGit,
    color: '#F05032',
    softColor:
      'rgba(240, 80, 50, 0.11)',
  },

  GitHub: {
    icon: SiGithub,
    color: '#FFFFFF',
    softColor:
      'rgba(255, 255, 255, 0.08)',
  },

  Docker: {
    icon: SiDocker,
    color: '#2496ED',
    softColor:
      'rgba(36, 150, 237, 0.11)',
  },

  Postman: {
    icon: SiPostman,
    color: '#FF6C37',
    softColor:
      'rgba(255, 108, 55, 0.11)',
  },

  Figma: {
    icon: SiFigma,
    color: '#F24E1E',
    softColor:
      'rgba(242, 78, 30, 0.11)',
  },

  Vercel: {
    icon: SiVercel,
    color: '#FFFFFF',
    softColor:
      'rgba(255, 255, 255, 0.08)',
  },

  Vite: {
    icon: SiVite,
    color: '#A879FF',
    softColor:
      'rgba(168, 121, 255, 0.12)',
  },

  JavaScript: {
    icon: SiJavascript,
    color: '#F7DF1E',
    softColor:
      'rgba(247, 223, 30, 0.13)',
  },

  HTML: {
    icon: SiHtml5,
    color: '#E34F26',
    softColor:
      'rgba(227, 79, 38, 0.11)',
  },

  CSS: {
    icon: SiCss,
    color: '#1572B6',
    softColor:
      'rgba(21, 114, 182, 0.11)',
  },

  Kotlin: {
    icon: SiKotlin,
    color: '#7F52FF',
    softColor:
      'rgba(127, 82, 255, 0.12)',
  },

  C: {
    icon: SiC,
    color: '#A8B9CC',
    softColor:
      'rgba(90, 112, 138, 0.11)',
  },

  'C++': {
    icon: SiCplusplus,
    color: '#00599C',
    softColor:
      'rgba(0, 89, 156, 0.11)',
  },

  PHP: {
    icon: SiPhp,
    color: '#777BB4',
    softColor:
      'rgba(119, 123, 180, 0.12)',
  },

  NestJS: {
    icon: SiNestjs,
    color: '#E0234E',
    softColor:
      'rgba(224, 35, 78, 0.11)',
  },

  TypeORM: {
    icon: Database,
    color: '#F37626',
    softColor:
      'rgba(243, 118, 38, 0.11)',
  },

  Bootstrap: {
    icon: SiBootstrap,
    color: '#7952B3',
    softColor:
      'rgba(121, 82, 179, 0.12)',
  },

  Axios: {
    icon: SiAxios,
    color: '#5A29E4',
    softColor:
      'rgba(90, 41, 228, 0.11)',
  },

  'React Router': {
    icon: SiReact,
    color: '#CA4245',
    softColor:
      'rgba(202, 66, 69, 0.10)',
  },

  'TanStack Query': {
    icon: Network,
    color: '#EF4444',
    softColor:
      'rgba(239, 68, 68, 0.10)',
  },

  JSP: {
    icon: FileCode2,
    color: '#E76F00',
    softColor:
      'rgba(231, 111, 0, 0.10)',
  },

  'Java Servlets': {
    icon: ServerCog,
    color: '#E76F00',
    softColor:
      'rgba(231, 111, 0, 0.10)',
  },

  JDBC: {
    icon: Database,
    color: '#5382A1',
    softColor:
      'rgba(83, 130, 161, 0.10)',
  },

  'Android SDK': {
    icon: SiAndroid,
    color: '#3DDC84',
    softColor:
      'rgba(61, 220, 132, 0.10)',
  },

  XML: {
    icon: Braces,
    color: '#E37933',
    softColor:
      'rgba(227, 121, 51, 0.10)',
  },

  'Material Design': {
    icon: Layers3,
    color: '#757575',
    softColor:
      'rgba(117, 117, 117, 0.10)',
  },

  Gradle: {
    icon: Wrench,
    color: '#02303A',
    softColor:
      'rgba(2, 48, 58, 0.09)',
  },

  RabbitMQ: {
    icon: SiRabbitmq,
    color: '#FF6600',
    softColor:
      'rgba(255, 102, 0, 0.10)',
  },

  Kubernetes: {
    icon: SiKubernetes,
    color: '#326CE5',
    softColor:
      'rgba(50, 108, 229, 0.10)',
  },

  MySQL: {
    icon: SiMysql,
    color: '#4479A1',
    softColor:
      'rgba(68, 121, 161, 0.10)',
  },

  'Oracle Database': {
    icon: Database,
    color: '#F80000',
    softColor:
      'rgba(248, 0, 0, 0.085)',
  },

  Jest: {
    icon: SiJest,
    color: '#C21325',
    softColor:
      'rgba(194, 19, 37, 0.10)',
  },

  Supertest: {
    icon: FlaskConical,
    color: '#5865F2',
    softColor:
      'rgba(88, 101, 242, 0.10)',
  },
};

export const toolkitCategoryIcons = [
  TerminalSquare,
  Package,
  Layers3,
  FlaskConical,
];

export function getTechnologyVisual(
  technology: string,
): TechnologyVisual {
  return (
    technologyVisuals[technology] ??
    fallbackTechnologyVisual
  );
}