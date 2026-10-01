export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  status:
    | 'In development'
    | 'Completed'
    | 'Maintained'
    | 'Details coming soon';
  year: string;
  role: string;
  technologies: string[];
  highlights: string[];
  problem: string;
  approach: string;
  outcome: string;
  repository?: string;
  liveUrl?: string;
  image?: string;
  placeholder?: boolean;
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
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
    ],
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
      'Eventure demonstrates the process of turning a broad product scope into a structured, maintainable full-stack system.',
    repository: 'https://github.com/naily247/event-planning-platform',
  },

  {
    slug: 'eatme',
    title: 'EatMe',
    eyebrow: 'Community food-sharing mobile application',
    summary:
      'A mobile platform designed around food donation, recipient coordination, delivery, and administration workflows.',
    status: 'In development',
    year: '2026',
    role: 'Admin module development',
    technologies: ['React Native', 'TypeScript', 'Node.js'],
    highlights: [
      'Administrative user-management and recipient-approval workflows',
      'Coordinator and driver account-management functionality',
      'Administrative reporting and platform-management workflows',
    ],
    problem:
      'Food-sharing workflows involve several different actors and require clear coordination between donations, recipients, delivery, and administration.',
    approach:
      'The application separates responsibilities by role and provides focused workflows for each participant. My responsibility is the Admin module, covering administrative user and platform-management functionality.',
    outcome:
      'The project demonstrates mobile application development and individual module ownership within a larger multi-role collaborative system.',
    repository: 'https://github.com/ViduraMC/EatMe',
  },

  {
    slug: 'library-hub',
    title: 'Library Hub',
    eyebrow: 'Full-stack school library management system',
    summary:
      'A full-stack school library platform for managing books, borrowing, reservations, fines, e-books, user access, and administrative reporting.',
    status: 'Completed',
    year: '2026',
    role: 'Report Management module development',
    technologies: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
    ],
    highlights: [
      'Built report generation and management workflows for administrators',
      'Implemented report updates, finalization, and CSV export',
      'Supported archive, restore, and permanent deletion workflows',
    ],
    problem:
      'LibraryHub brings core school-library operations into one system, including books, transactions, reservations, fines, e-books, user access, and administrative reporting.',
    approach:
      'My responsibility was the Report Management module. I implemented the report lifecycle across the full stack, including generation, viewing, updating, finalization, CSV export, archiving, restoration, and permanent deletion.',
    outcome:
      'The completed module gave administrators a structured way to generate, manage, export, and maintain library reports within the wider LibraryHub platform.',
    repository: 'https://github.com/ViduraMC/LibraryHub',
  },

  {
    slug: 'health-platform',
    title: 'Health Platform',
    eyebrow: 'AI-enabled healthcare microservices platform',
    summary:
      'An AI-enabled healthcare and telemedicine platform built around independent services for patient care, appointments, consultations, payments, notifications, and supporting healthcare workflows.',
    status: 'Completed',
    year: '2026',
    role: 'Payment & Notification Services',
    technologies: [
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'TypeORM',
      'RabbitMQ',
      'Docker',
      'Kubernetes',
    ],
    highlights: [
      'Contributed the Payment Service within a microservices architecture',
      'Contributed the Notification Service for platform communications',
      'Worked within an asynchronous service architecture using RabbitMQ',
    ],
    problem:
      'Healthcare platforms combine several independent workflows, including appointments, consultations, payments, notifications, and patient and doctor management, while requiring those capabilities to operate as one connected system.',
    approach:
      'The platform uses a microservices architecture with an API gateway and independently structured services. My assigned responsibility covers the Payment and Notification services, while the AI Symptom Checker is a shared team responsibility.',
    outcome:
      'The project provided experience working within a larger service-oriented architecture and contributing focused backend services to a collaborative healthcare platform.',
    repository: 'https://github.com/HarithaCabraal/HealthPlatform',
  },

  {
    slug: 'trendify',
    title: 'Trendify',
    eyebrow: 'Android clothing-store application',
    summary:
      'A Kotlin-based Android clothing-store application covering the shopping journey from onboarding and product discovery to favorites, cart management, payment, and profile features.',
    status: 'Completed',
    year: '2025',
    role: 'Android application development',
    technologies: [
      'Kotlin',
      'Android SDK',
      'XML',
      'Material Design',
      'Gradle',
    ],
    highlights: [
      'Built a connected multi-screen shopping flow using Android Activities and intent-based navigation',
      'Implemented favorites, cart quantity handling, subtotal calculations, and product search',
      'Implemented payment validation, profile and settings flows, and secure logout navigation behavior',
    ],
    problem:
      'The project required a complete mobile shopping experience with consistent product information, predictable navigation, form validation, and connected account and shopping workflows.',
    approach:
      'I developed the application in Kotlin using XML layouts and the Android View system, connecting the required screens through intent-based navigation and implementing the interaction logic for shopping, payment, profile, and settings flows.',
    outcome:
      'The completed application demonstrates native Android development across a substantial multi-screen interface and was successfully built, run, and manually tested on an Android emulator.',
    repository:
      'https://github.com/naily247/Trendify-Android-Clothing-Store',
  },

  {
    slug: 'travelling-platform',
    title: 'Travelling Platform',
    eyebrow: 'MERN tourism management platform',
    summary:
      'A collaborative tourism management platform bringing destinations, adventures, hotels, flights, transport, accessories, bookings, and related travel services into one web application.',
    status: 'Completed',
    year: '2025',
    role: 'Destinations & Adventures subsystem',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    highlights: [
      'Developed destination and adventure management workflows',
      'Supported browsing, search, filtering, reviews, wishlists, and booking flows',
      'Implemented administrative management for destination and adventure content',
    ],
    problem:
      'Tourism services are often spread across separate systems, making it difficult for travellers to discover and manage different parts of a trip through one experience.',
    approach:
      'The group project combined several tourism-management modules within a MERN application. My responsibility was the Destinations and Adventures subsystem, covering user-facing discovery and booking flows alongside administrative management functionality.',
    outcome:
      'The completed subsystem contributed destination and adventure discovery, management, and booking capabilities to the wider tourism platform.',
    repository: 'https://github.com/naily247/tourism-management-system',
  },

  {
    slug: 'careconnect',
    title: 'CareConnect',
    eyebrow: 'Customer care management system',
    summary:
      'A web-based customer care management system for handling customer accounts, support tickets, responses, feedback, and administrative operations.',
    status: 'Completed',
    year: '2025',
    role: 'Admin Management CRUD',
    technologies: [
      'Java',
      'Java Servlets',
      'JSP',
      'JDBC',
      'MySQL',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    highlights: [
      'Created Admin and Agent account-management workflows',
      'Implemented viewing, searching, updating, and deleting administrator records',
      'Added role selection, form validation, password validation, and delete confirmation',
    ],
    problem:
      'CareConnect was developed as a university group project to provide structured customer-care workflows for users and support staff.',
    approach:
      'My assigned responsibility was the Admin Management CRUD module. I implemented administrator and agent account management using the project’s Model → Service → Servlet → JSP structure, with JDBC and MySQL for persistence.',
    outcome:
      'The completed module provided the required CRUD operations for administrator and agent account management within the wider CareConnect system.',
    repository:
      'https://github.com/naily247/CareConnect-Online-Customer-Care-System',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}