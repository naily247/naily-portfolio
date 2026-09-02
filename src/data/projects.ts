export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  status: 'In development' | 'Completed' | 'Maintained';
  year: string;
  role: string;
  technologies: string[];
  highlights: string[];
  problem: string;
  approach: string;
  outcome: string;
  repository?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'eventure',
    title: 'Eventure',
    eyebrow: 'Featured full-stack platform',
    summary:
      'An event planning and vendor coordination platform designed around real workflows for customers, vendors, and administrators.',
    status: 'In development',
    year: '2026',
    role: 'Product design, architecture, backend, frontend',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    highlights: [
      'Role-based customer, vendor, and admin workflows',
      'Quotation, booking, payment, complaint, and planning modules',
      'Production-minded validation, permissions, and edge-case handling',
    ],
    problem:
      'Event planning often becomes fragmented across messages, spreadsheets, and disconnected tools. Eventure brings those workflows into one structured product.',
    approach:
      'The platform is being built module by module with explicit domain rules, strong validation, role-aware APIs, and a polished workspace-oriented frontend.',
    outcome:
      'Eventure is the clearest demonstration of my ability to turn a broad product scope into a structured, maintainable full-stack system.',
    repository: 'https://github.com/naily247/event-planning-platform',
  },
  {
    slug: 'trendify',
    title: 'Trendify',
    eyebrow: 'Mobile application',
    summary:
      'A mobile project focused on translating defined requirements into a usable, complete application experience.',
    status: 'Completed',
    year: '2026',
    role: 'Application development and UI implementation',
    technologies: ['Android', 'Java', 'XML'],
    highlights: [
      'Requirement-led implementation',
      'Responsive mobile interface structure',
      'Practical application flow and state handling',
    ],
    problem:
      'The project required a complete mobile experience that matched its functional specification while remaining easy to navigate.',
    approach:
      'I focused on implementing the required flows clearly, keeping screens consistent, and ensuring the application behaved predictably.',
    outcome:
      'The result demonstrates dependable implementation against a defined scope and platform constraints.',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
