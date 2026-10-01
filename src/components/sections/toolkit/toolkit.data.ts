import type {
  ToolkitCategory,
  ToolkitConnection,
  ToolkitProject,
  ToolkitSecondaryGroup,
  ToolkitTechnology,
} from './toolkit.types';

export const toolkitCategories: ToolkitCategory[] = [
  {
    id: 'interface',
    number: '01',
    label: 'Interface',
    shortLabel: 'Interface',
    description:
      'Interfaces, interaction systems, responsive experiences, and product-facing implementation.',
  },
  {
    id: 'application',
    number: '02',
    label: 'Application',
    shortLabel: 'Application',
    description:
      'Application logic, APIs, authentication, validation, and service architecture.',
  },
  {
    id: 'data',
    number: '03',
    label: 'Data & Services',
    shortLabel: 'Data',
    description:
      'Persistence, data modelling, external services, and application infrastructure.',
  },
  {
    id: 'workflow',
    number: '04',
    label: 'Tools & Workflow',
    shortLabel: 'Workflow',
    description:
      'Development workflow, collaboration, delivery, debugging, and product design.',
  },
];

export const toolkitProjects: ToolkitProject[] = [
  {
    id: 'eventure',
    name: 'Eventure',
    label: 'Full-stack product platform',
  },
  {
    id: 'eatme',
    name: 'EatMe',
    label: 'Mobile food-sharing platform',
  },
  {
    id: 'library-hub',
    name: 'Library Hub',
    label: 'Library management platform',
  },
];

/*
 * Primary system nodes.
 *
 * These are intentionally not every technology Naily has
 * encountered. They represent the technologies that make
 * the interactive architecture readable.
 *
 * The broader technical index lives separately below.
 */
export const toolkitTechnologies: ToolkitTechnology[] = [
  // -----------------------------------------------------
  // INTERFACE
  // -----------------------------------------------------

  {
    id: 'react',
    name: 'React',
    category: 'interface',
    description:
      'Component-driven interfaces for responsive web products and interactive application experiences.',
    nodeSize: 'primary',
    position: [-3.55, 1.75, 0.34],
    accent: 'violet',
    related: [
      'typescript',
      'tailwind',
      'rest-api',
      'react-hook-form',
    ],
    usedWith: [
      'TypeScript',
      'Tailwind CSS',
      'REST APIs',
      'React Hook Form',
    ],
    projects: ['eventure', 'library-hub'],
    featured: true,
  },

  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'interface',
    description:
      'React-based application architecture for structured, performant web experiences.',
    nodeSize: 'secondary',
    position: [-2.1, 2.55, 0.08],
    accent: 'neutral',
    related: [
      'react',
      'typescript',
      'tailwind',
    ],
    usedWith: [
      'React',
      'TypeScript',
      'Tailwind CSS',
    ],
    projects: [],
  },

  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'interface',
    description:
      'Typed application development for clearer contracts, safer refactoring, and maintainable product code.',
    nodeSize: 'primary',
    position: [-1.45, 1.35, 0.44],
    accent: 'blue',
    related: [
      'react',
      'nodejs',
      'express',
      'react-native',
    ],
    usedWith: [
      'React',
      'Node.js',
      'Express',
      'React Native',
    ],
    projects: [
      'eventure',
      'eatme',
      'library-hub',
    ],
    featured: true,
  },

  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    shortName: 'Tailwind',
    category: 'interface',
    description:
      'Utility-first styling for responsive interfaces, design systems, and rapid visual iteration.',
    nodeSize: 'supporting',
    position: [-4.2, 0.25, -0.05],
    accent: 'blue',
    related: [
      'react',
      'nextjs',
      'typescript',
    ],
    usedWith: [
      'React',
      'Next.js',
      'TypeScript',
    ],
    projects: ['eventure', 'library-hub'],
  },

  {
    id: 'react-native',
    name: 'React Native',
    category: 'interface',
    description:
      'Cross-platform mobile interface development using React-based component patterns.',
    nodeSize: 'secondary',
    position: [-3.15, -1.25, 0.22],
    accent: 'violet',
    related: [
      'typescript',
      'expo',
      'nodejs',
      'rest-api',
    ],
    usedWith: [
      'TypeScript',
      'Expo',
      'Node.js',
      'REST APIs',
    ],
    projects: ['eatme'],
    featured: true,
  },

  {
    id: 'expo',
    name: 'Expo',
    category: 'interface',
    description:
      'Mobile development tooling used to build, run, and iterate on React Native applications.',
    nodeSize: 'supporting',
    position: [-4.45, -2.15, -0.08],
    accent: 'neutral',
    related: [
      'react-native',
      'typescript',
    ],
    usedWith: [
      'React Native',
      'TypeScript',
    ],
    projects: ['eatme'],
  },

  {
    id: 'react-hook-form',
    name: 'React Hook Form',
    shortName: 'RHF',
    category: 'interface',
    description:
      'Form state and validation workflows for structured, interactive product interfaces.',
    nodeSize: 'supporting',
    position: [-1.7, -0.55, -0.18],
    accent: 'violet',
    related: [
      'react',
      'zod',
      'typescript',
    ],
    usedWith: [
      'React',
      'Zod',
      'TypeScript',
    ],
    projects: ['eventure'],
  },

  // -----------------------------------------------------
  // APPLICATION
  // -----------------------------------------------------

  {
    id: 'rest-api',
    name: 'REST APIs',
    shortName: 'REST API',
    category: 'application',
    description:
      'Structured communication between product interfaces, application services, and persisted data.',
    nodeSize: 'primary',
    position: [-0.15, 0.45, 0.56],
    accent: 'violet',
    related: [
      'react',
      'react-native',
      'nodejs',
      'express',
      'jwt',
    ],
    usedWith: [
      'React',
      'React Native',
      'Node.js',
      'Express',
      'JWT',
    ],
    projects: [
      'eventure',
      'eatme',
      'library-hub',
    ],
    featured: true,
  },

  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'application',
    description:
      'Server-side JavaScript runtime used for APIs, application services, and backend product logic.',
    nodeSize: 'primary',
    position: [1.35, 1.65, 0.4],
    accent: 'violet',
    related: [
      'typescript',
      'rest-api',
      'express',
      'jwt',
      'zod',
    ],
    usedWith: [
      'TypeScript',
      'Express',
      'REST APIs',
      'JWT',
      'Zod',
    ],
    projects: [
      'eventure',
      'eatme',
      'library-hub',
    ],
    featured: true,
  },

  {
    id: 'express',
    name: 'Express',
    category: 'application',
    description:
      'Backend routing and middleware for REST services, authentication, validation, and application workflows.',
    nodeSize: 'primary',
    position: [2.65, 0.65, 0.5],
    accent: 'neutral',
    related: [
      'nodejs',
      'rest-api',
      'jwt',
      'zod',
      'prisma',
      'mongoose',
    ],
    usedWith: [
      'Node.js',
      'REST APIs',
      'JWT',
      'Zod',
      'Prisma',
    ],
    projects: [
      'eventure',
      'library-hub',
    ],
    featured: true,
  },

  {
    id: 'jwt',
    name: 'JWT',
    category: 'application',
    description:
      'Token-based authentication used to support protected routes and role-aware application access.',
    nodeSize: 'supporting',
    position: [0.75, -0.45, 0.05],
    accent: 'violet',
    related: [
      'rest-api',
      'nodejs',
      'express',
      'zod',
    ],
    usedWith: [
      'REST APIs',
      'Node.js',
      'Express',
      'Zod',
    ],
    projects: ['eventure'],
  },

  {
    id: 'zod',
    name: 'Zod',
    category: 'application',
    description:
      'Schema validation for safer boundaries between forms, API requests, and application logic.',
    nodeSize: 'supporting',
    position: [1.95, -1.05, -0.12],
    accent: 'blue',
    related: [
      'typescript',
      'express',
      'jwt',
      'react-hook-form',
    ],
    usedWith: [
      'TypeScript',
      'Express',
      'JWT',
      'React Hook Form',
    ],
    projects: ['eventure'],
  },

  {
    id: 'java',
    name: 'Java',
    category: 'application',
    description:
      'Object-oriented application development used across academic software engineering work.',
    nodeSize: 'secondary',
    position: [3.8, 1.8, -0.08],
    accent: 'neutral',
    related: [],
    usedWith: [
      'JDBC',
      'Servlets',
      'JSP',
    ],
    projects: [],
  },

  // -----------------------------------------------------
  // DATA & SERVICES
  // -----------------------------------------------------

  {
    id: 'prisma',
    name: 'Prisma',
    category: 'data',
    description:
      'Typed data access and schema management connecting application logic with relational persistence.',
    nodeSize: 'primary',
    position: [3.3, -0.75, 0.46],
    accent: 'violet',
    related: [
      'express',
      'postgresql',
      'typescript',
    ],
    usedWith: [
      'Express',
      'PostgreSQL',
      'TypeScript',
    ],
    projects: ['eventure'],
    featured: true,
  },

  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'data',
    description:
      'Relational persistence for structured product data, transactional workflows, and application state.',
    nodeSize: 'primary',
    position: [4.35, -1.65, 0.28],
    accent: 'blue',
    related: [
      'prisma',
      'express',
      'sql',
    ],
    usedWith: [
      'Prisma',
      'Express',
      'SQL',
    ],
    projects: ['eventure'],
    featured: true,
  },

  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'data',
    description:
      'Document-oriented persistence used for flexible application data and full-stack project workflows.',
    nodeSize: 'primary',
    position: [2.35, -2.25, 0.22],
    accent: 'violet',
    related: [
      'mongoose',
      'express',
      'nodejs',
    ],
    usedWith: [
      'Mongoose',
      'Express',
      'Node.js',
    ],
    projects: ['library-hub'],
    featured: true,
  },

  {
    id: 'mongoose',
    name: 'Mongoose',
    category: 'data',
    description:
      'MongoDB modelling and application-level data access for Node.js services.',
    nodeSize: 'supporting',
    position: [0.85, -2.35, -0.14],
    accent: 'neutral',
    related: [
      'mongodb',
      'nodejs',
      'express',
    ],
    usedWith: [
      'MongoDB',
      'Node.js',
      'Express',
    ],
    projects: ['library-hub'],
  },

  {
    id: 'sql',
    name: 'SQL',
    category: 'data',
    description:
      'Relational querying and data manipulation across database-driven software projects.',
    nodeSize: 'supporting',
    position: [4.55, -0.15, -0.16],
    accent: 'blue',
    related: [
      'postgresql',
      'prisma',
    ],
    usedWith: [
      'PostgreSQL',
      'Prisma',
    ],
    projects: ['eventure'],
  },

  {
    id: 'cloudinary',
    name: 'Cloudinary',
    category: 'data',
    description:
      'Cloud-based media handling for product uploads and managed application assets.',
    nodeSize: 'supporting',
    position: [4.55, 1.05, -0.2],
    accent: 'blue',
    related: [
      'express',
      'rest-api',
    ],
    usedWith: [
      'Express',
      'REST APIs',
    ],
    projects: ['eventure'],
  },

  {
    id: 'stripe',
    name: 'Stripe',
    category: 'data',
    description:
      'Payment service integration supporting product payment workflows.',
    nodeSize: 'secondary',
    position: [3.65, 2.65, 0.05],
    accent: 'violet',
    related: [
      'express',
      'rest-api',
    ],
    usedWith: [
      'Express',
      'REST APIs',
    ],
    projects: ['eventure'],
  },

  // -----------------------------------------------------
  // WORKFLOW
  // -----------------------------------------------------

  {
    id: 'git',
    name: 'Git',
    category: 'workflow',
    description:
      'Version control for structured development, iteration, branching, and collaborative implementation.',
    nodeSize: 'secondary',
    position: [-3.75, -3.05, -0.15],
    accent: 'neutral',
    related: [
      'github',
      'vercel',
    ],
    usedWith: [
      'GitHub',
      'Vercel',
    ],
    projects: [
      'eventure',
      'eatme',
      'library-hub',
    ],
  },

  {
    id: 'github',
    name: 'GitHub',
    category: 'workflow',
    description:
      'Repository collaboration, version history, branching, pull requests, and shared project development.',
    nodeSize: 'primary',
    position: [-2.1, -3.15, 0.16],
    accent: 'violet',
    related: [
      'git',
      'vercel',
      'docker',
    ],
    usedWith: [
      'Git',
      'Vercel',
      'Docker',
    ],
    projects: [
      'eventure',
      'eatme',
      'library-hub',
    ],
    featured: true,
  },

  {
    id: 'docker',
    name: 'Docker',
    category: 'workflow',
    description:
      'Containerised development environments for consistent application setup and service workflows.',
    nodeSize: 'secondary',
    position: [-0.4, -3.15, 0.08],
    accent: 'blue',
    related: [
      'github',
      'nodejs',
    ],
    usedWith: [
      'GitHub',
      'Node.js',
    ],
    projects: ['eatme'],
  },

  {
    id: 'postman',
    name: 'Postman',
    category: 'workflow',
    description:
      'API exploration and request testing during backend and full-stack development.',
    nodeSize: 'supporting',
    position: [1.2, -3.35, -0.15],
    accent: 'neutral',
    related: [
      'rest-api',
      'express',
    ],
    usedWith: [
      'REST APIs',
      'Express',
    ],
    projects: [
      'eventure',
      'eatme',
      'library-hub',
    ],
  },

  {
    id: 'figma',
    name: 'Figma',
    category: 'workflow',
    description:
      'Interface design, prototyping, workflow exploration, and visual product thinking before implementation.',
    nodeSize: 'primary',
    position: [-4.55, 2.75, 0.18],
    accent: 'violet',
    related: [
      'react',
      'react-native',
      'tailwind',
    ],
    usedWith: [
      'React',
      'React Native',
      'Tailwind CSS',
    ],
    projects: [
      'eventure',
      'eatme',
    ],
    featured: true,
  },

  {
    id: 'vercel',
    name: 'Vercel',
    category: 'workflow',
    description:
      'Web deployment and delivery workflow for modern frontend and full-stack experiences.',
    nodeSize: 'supporting',
    position: [-3.25, 3.3, -0.18],
    accent: 'neutral',
    related: [
      'github',
      'nextjs',
    ],
    usedWith: [
      'GitHub',
      'Next.js',
    ],
    projects: [],
  },

  {
    id: 'vite',
    name: 'Vite',
    category: 'workflow',
    description:
      'Fast frontend development tooling used for modern React application workflows.',
    nodeSize: 'supporting',
    position: [-1.65, 3.25, -0.12],
    accent: 'violet',
    related: [
      'react',
      'typescript',
    ],
    usedWith: [
      'React',
      'TypeScript',
    ],
    projects: ['library-hub'],
  },
];

/*
 * Curated architectural relationships.
 *
 * These are what make the scene a technical system rather
 * than a collection of floating technology logos.
 */
export const toolkitConnections: ToolkitConnection[] = [
  // Interface architecture
  {
    id: 'figma-react',
    from: 'figma',
    to: 'react',
    type: 'workflow',
  },
  {
    id: 'next-react',
    from: 'nextjs',
    to: 'react',
    type: 'secondary',
  },
  {
    id: 'typescript-react',
    from: 'typescript',
    to: 'react',
    type: 'primary',
    animated: true,
  },
  {
    id: 'tailwind-react',
    from: 'tailwind',
    to: 'react',
    type: 'secondary',
  },
  {
    id: 'react-hook-form-react',
    from: 'react-hook-form',
    to: 'react',
    type: 'secondary',
  },

  // Mobile architecture
  {
    id: 'typescript-react-native',
    from: 'typescript',
    to: 'react-native',
    type: 'primary',
  },
  {
    id: 'expo-react-native',
    from: 'expo',
    to: 'react-native',
    type: 'secondary',
  },

  // Interface -> API
  {
    id: 'react-rest',
    from: 'react',
    to: 'rest-api',
    type: 'primary',
    animated: true,
  },
  {
    id: 'react-native-rest',
    from: 'react-native',
    to: 'rest-api',
    type: 'primary',
    animated: true,
  },

  // API / backend
  {
    id: 'rest-node',
    from: 'rest-api',
    to: 'nodejs',
    type: 'primary',
    animated: true,
  },
  {
    id: 'node-express',
    from: 'nodejs',
    to: 'express',
    type: 'primary',
    animated: true,
  },
  {
    id: 'jwt-rest',
    from: 'jwt',
    to: 'rest-api',
    type: 'secondary',
  },
  {
    id: 'zod-express',
    from: 'zod',
    to: 'express',
    type: 'secondary',
  },
  {
    id: 'rhf-zod',
    from: 'react-hook-form',
    to: 'zod',
    type: 'secondary',
  },

  // Relational data route
  {
    id: 'express-prisma',
    from: 'express',
    to: 'prisma',
    type: 'primary',
    animated: true,
  },
  {
    id: 'prisma-postgresql',
    from: 'prisma',
    to: 'postgresql',
    type: 'primary',
    animated: true,
  },
  {
    id: 'sql-postgresql',
    from: 'sql',
    to: 'postgresql',
    type: 'secondary',
  },

  // Document data route
  {
    id: 'express-mongoose',
    from: 'express',
    to: 'mongoose',
    type: 'primary',
  },
  {
    id: 'mongoose-mongodb',
    from: 'mongoose',
    to: 'mongodb',
    type: 'primary',
    animated: true,
  },

  // External services
  {
    id: 'express-cloudinary',
    from: 'express',
    to: 'cloudinary',
    type: 'secondary',
  },
  {
    id: 'express-stripe',
    from: 'express',
    to: 'stripe',
    type: 'secondary',
  },

  // Workflow
  {
    id: 'git-github',
    from: 'git',
    to: 'github',
    type: 'workflow',
    animated: true,
  },
  {
    id: 'github-vercel',
    from: 'github',
    to: 'vercel',
    type: 'workflow',
  },
  {
    id: 'github-docker',
    from: 'github',
    to: 'docker',
    type: 'workflow',
  },
  {
    id: 'postman-rest',
    from: 'postman',
    to: 'rest-api',
    type: 'workflow',
  },
];

/*
 * ============================================================
 * CURATED ARCHITECTURE PATHS
 * ============================================================
 *
 * Connections describe individual relationships.
 *
 * Architecture paths describe how those relationships combine
 * into meaningful product flows.
 *
 * These paths are intentionally curated rather than generated
 * automatically. This prevents the visual system from implying
 * that every related technology participates in the same kind
 * of architectural flow.
 * ============================================================
 */

export type ToolkitArchitecturePath = {
  id: string;
  label: string;
  technologyIds: string[];
  connectionIds: string[];
};

export const toolkitArchitecturePaths: ToolkitArchitecturePath[] = [
  /*
   * ----------------------------------------------------------
   * WEB → RELATIONAL DATA
   *
   * React interface
   * → REST boundary
   * → Node runtime
   * → Express service
   * → Prisma data access
   * → PostgreSQL persistence
   * ----------------------------------------------------------
   */
  {
    id: 'web-relational',
    label: 'Web → relational data',
    technologyIds: [
      'react',
      'rest-api',
      'nodejs',
      'express',
      'prisma',
      'postgresql',
    ],
    connectionIds: [
      'react-rest',
      'rest-node',
      'node-express',
      'express-prisma',
      'prisma-postgresql',
    ],
  },

  /*
   * ----------------------------------------------------------
   * MOBILE → API
   *
   * Expo supports the React Native application layer,
   * which communicates through the REST API into the
   * Node / Express backend.
   * ----------------------------------------------------------
   */
  {
    id: 'mobile-api',
    label: 'Mobile → API',
    technologyIds: [
      'expo',
      'react-native',
      'rest-api',
      'nodejs',
      'express',
    ],
    connectionIds: [
      'expo-react-native',
      'react-native-rest',
      'rest-node',
      'node-express',
    ],
  },

  /*
   * ----------------------------------------------------------
   * WEB → DOCUMENT DATA
   *
   * React interface
   * → REST boundary
   * → Node runtime
   * → Express service
   * → Mongoose modelling
   * → MongoDB persistence
   * ----------------------------------------------------------
   */
  {
    id: 'web-document',
    label: 'Web → document data',
    technologyIds: [
      'react',
      'rest-api',
      'nodejs',
      'express',
      'mongoose',
      'mongodb',
    ],
    connectionIds: [
      'react-rest',
      'rest-node',
      'node-express',
      'express-mongoose',
      'mongoose-mongodb',
    ],
  },

  /*
   * ----------------------------------------------------------
   * VALIDATED FORM FLOW
   *
   * Form state
   * → schema validation
   * → Express application boundary
   * → Prisma
   * → PostgreSQL
   * ----------------------------------------------------------
   */
  {
    id: 'validated-form',
    label: 'Validated form → data',
    technologyIds: [
      'react-hook-form',
      'zod',
      'express',
      'prisma',
      'postgresql',
    ],
    connectionIds: [
      'rhf-zod',
      'zod-express',
      'express-prisma',
      'prisma-postgresql',
    ],
  },

  /*
   * ----------------------------------------------------------
   * WEB DELIVERY
   *
   * Local version control
   * → repository collaboration
   * → web deployment
   * ----------------------------------------------------------
   */
  {
    id: 'web-delivery',
    label: 'Version control → deployment',
    technologyIds: [
      'git',
      'github',
      'vercel',
    ],
    connectionIds: [
      'git-github',
      'github-vercel',
    ],
  },

  /*
   * ----------------------------------------------------------
   * CONTAINER WORKFLOW
   *
   * Local version control
   * → repository collaboration
   * → containerised environment
   * ----------------------------------------------------------
   */
  {
    id: 'container-workflow',
    label: 'Version control → container workflow',
    technologyIds: [
      'git',
      'github',
      'docker',
    ],
    connectionIds: [
      'git-github',
      'github-docker',
    ],
  },
];

/*
 * Returns every curated architecture path containing a
 * particular technology.
 */
export const getToolkitArchitecturePathsForTechnology = (
  technologyId: string,
) =>
  toolkitArchitecturePaths.filter((path) =>
    path.technologyIds.includes(technologyId),
  );

/*
 * Chooses one primary architecture path for visual propagation.
 *
 * When a technology participates in multiple paths, the first
 * matching path in toolkitArchitecturePaths becomes the primary
 * visual route.
 *
 * The remaining ordinary connections still stay available as
 * contextual relationships in the scene.
 */
export const getToolkitPrimaryArchitecturePath = (
  technologyId: string,
) =>
  getToolkitArchitecturePathsForTechnology(
    technologyId,
  )[0] ?? null;

/*
 * Secondary capability index.
 *
 * These technologies remain visible in the portfolio without
 * pretending they all occupy the same level of day-to-day use
 * as the primary interactive system.
 */
export const toolkitSecondaryGroups: ToolkitSecondaryGroup[] = [
  {
    id: 'languages',
    label: 'Languages & foundations',
    technologies: [
      'JavaScript',
      'HTML',
      'CSS',
      'Kotlin',
      'C',
      'C++',
      'PHP',
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & libraries',
    technologies: [
      'NestJS',
      'TypeORM',
      'Mongoose',
      'Axios',
      'React Router',
      'TanStack Query',
      'React Hook Form',
      'JSP',
      'Java Servlets',
      'JDBC',
    ],
  },
  {
    id: 'platforms',
    label: 'Platforms & infrastructure',
    technologies: [
      'Android SDK',
      'XML',
      'Material Design',
      'Gradle',
      'RabbitMQ',
      'Kubernetes',
      'MySQL',
      'Oracle Database',
    ],
  },
  {
    id: 'quality',
    label: 'Testing & development',
    technologies: [
      'Jest',
      'Supertest',
      'Postman',
      'Git',
      'GitHub',
      'Docker',
    ],
  },
];

export const toolkitTechnologyMap = new Map(
  toolkitTechnologies.map((technology) => [
    technology.id,
    technology,
  ]),
);

export const getToolkitTechnology = (
  id: string,
) => toolkitTechnologyMap.get(id);

export const getToolkitConnectionsForTechnology = (
  technologyId: string,
) =>
  toolkitConnections.filter(
    (connection) =>
      connection.from === technologyId ||
      connection.to === technologyId,
  );

export const getToolkitRelatedTechnologyIds = (
  technologyId: string,
) => {
  const technology =
    getToolkitTechnology(technologyId);

  if (!technology) {
    return [];
  }

  const connectionIds =
    getToolkitConnectionsForTechnology(
      technologyId,
    ).flatMap((connection) => [
      connection.from,
      connection.to,
    ]);

  return Array.from(
    new Set([
      technologyId,
      ...technology.related,
      ...connectionIds,
    ]),
  );
};