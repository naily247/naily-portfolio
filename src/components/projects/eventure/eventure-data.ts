import {
  Braces,
  CalendarCheck2,
  CheckCircle2,
  Database,
  FileCheck2,
  Layers3,
  ShieldCheck,
  Store,
  Users,
  Workflow,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                JOURNEY DATA                                */
/* -------------------------------------------------------------------------- */

export type JourneyChapter = {
  number: string;
  verb: string;
  title: string;
  description: string;
};

export const journey: JourneyChapter[] = [
  {
    number: '01',
    verb: 'PLAN',
    title: 'Build the event around one workspace.',
    description:
      'Budget, tasks, documents and operational shortcuts stay attached to the same event instead of becoming separate tools.',
  },
  {
    number: '02',
    verb: 'SHAPE',
    title: 'Turn references into a visual direction.',
    description:
      'Mood boards move inspiration from scattered references into a shared event direction that can inform later vendor decisions.',
  },
  {
    number: '03',
    verb: 'DISCOVER',
    title: 'Evaluate vendors before making a commitment.',
    description:
      'Customers can move from marketplace discovery into verified business profiles, portfolio work and published service packages.',
  },
  {
    number: '04',
    verb: 'COMMIT',
    title: 'Carry one commercial decision through the system.',
    description:
      'A service package becomes a quotation request, proposal, accepted booking, deposit and verified active commitment.',
  },
  {
    number: '05',
    verb: 'INVITE',
    title: 'Extend the product beyond the signed-in workspace.',
    description:
      'Guest records connect to invitations and a public RSVP experience, then return the response to the planner.',
  },
  {
    number: '06',
    verb: 'OPERATE',
    title: 'Give the platform an operational layer.',
    description:
      'Administration connects payment verification, trust and support workflows, reporting and platform-level visibility.',
  },
];

/* -------------------------------------------------------------------------- */
/*                              ENGINEERING DATA                              */
/* -------------------------------------------------------------------------- */

export const engineeringLayers = [
  {
    label: 'Interface',
    title: 'React + TypeScript',
    description:
      'Role-aware interfaces and workflow states for customer, vendor and administrator experiences.',
    icon: Layers3,
  },
  {
    label: 'Application',
    title: 'Node.js + Express',
    description:
      'API routes, validation, permissions and domain rules coordinate behavior beyond the interface.',
    icon: Braces,
  },
  {
    label: 'Data',
    title: 'PostgreSQL + Prisma',
    description:
      'Relational persistence connects events, vendors, quotations, bookings, payments and supporting records.',
    icon: Database,
  },
];

export const engineeringDetails = [
  {
    title: 'Role-aware access',
    description:
      'Customers, vendors and administrators act through different capabilities rather than a generic shared dashboard.',
    icon: Users,
  },
  {
    title: 'Domain validation',
    description:
      'Important workflow rules are enforced at the application boundary instead of relying only on disabled UI controls.',
    icon: FileCheck2,
  },
  {
    title: 'Explicit lifecycle states',
    description:
      'Quotation, booking and payment behavior progresses through controlled states rather than disconnected CRUD actions.',
    icon: Workflow,
  },
  {
    title: 'API testing',
    description:
      'Backend behavior is supported by automated tests alongside manual product testing across the role-specific flows.',
    icon: CheckCircle2,
  },
];

/* -------------------------------------------------------------------------- */
/*                              PRODUCT DECISIONS                             */
/* -------------------------------------------------------------------------- */

export const decisions = [
  {
    number: '01',
    title: 'Model roles around responsibilities.',
    description:
      'Customer, vendor, guest and administrator experiences are separated where their responsibilities differ, while remaining connected by the same domain objects.',
  },
  {
    number: '02',
    title: 'Make state transitions visible.',
    description:
      'Commercial workflows expose what is waiting, accepted, pending verification or active so users can understand what happens next.',
  },
  {
    number: '03',
    title: 'Preserve continuity between sides of the marketplace.',
    description:
      'A package configured by a vendor becomes the service a customer discovers, requests, books and eventually pays for.',
  },
];

/* -------------------------------------------------------------------------- */
/*                                COMMIT DATA                                 */
/* -------------------------------------------------------------------------- */

export const commitSteps = [
  {
    label: 'Request',
    detail: 'Signature Styling selected',
    image: '/images/projects/eventure/commit/quotation-request-create.png',
  },
  {
    label: 'Proposal',
    detail: 'Vendor responds with a quotation',
    image: '/images/projects/eventure/commit/vendor-quotation-sent.png',
  },
  {
    label: 'Accept',
    detail: 'Customer accepts the proposal',
    image: '/images/projects/eventure/commit/quotation-acceptance.png',
  },
  {
    label: 'Book',
    detail: 'Vendor confirms scheduled work',
    image: '/images/projects/eventure/commit/booking-confirmation.png',
  },
  {
    label: 'Verify',
    detail: 'Admin verifies the deposit',
    image:
      '/images/projects/eventure/commit/admin-payment-verification.png',
  },
  {
    label: 'Active',
    detail: 'Commitment becomes active',
    image: '/images/projects/eventure/commit/payment-verified.png',
  },
];

/* -------------------------------------------------------------------------- */
/*                                 SHAPE DATA                                 */
/* -------------------------------------------------------------------------- */

export const shapeViews = [
  {
    id: 'collect',
    number: '01',
    stage: 'Collect',
    eyebrow: 'Inspiration library',
    title: 'Gather the references shaping the event.',
    description:
      'Ideas are collected as individual references with categories, notes and vendor connections before they become part of a shared visual direction.',
    metric: '8 ideas',
    metricLabel: 'Collected references',
    image: '/images/projects/eventure/shape/inspiration-board.png',
    alt: 'Eventure inspiration board with collected event references',
  },
  {
    id: 'organise',
    number: '02',
    stage: 'Organise',
    eyebrow: 'Mood board workspace',
    title: 'Turn separate references into a visual language.',
    description:
      'The mood board keeps inspiration inside the event workflow so references can be reviewed together instead of remaining disconnected ideas.',
    metric: 'Mood board',
    metricLabel: 'Shared direction',
    image: '/images/projects/eventure/shape/mood-board-workspace.png',
    alt: 'Eventure mood board workspace',
  },
  {
    id: 'compose',
    number: '03',
    stage: 'Compose',
    eyebrow: 'Live composition',
    title: 'See the direction come together.',
    description:
      'Collected references resolve into a visual composition that makes the event direction easier to understand before later planning decisions are made.',
    metric: 'Live',
    metricLabel: 'Visual composition',
    image: '/images/projects/eventure/shape/live-mood-board.png',
    alt: 'Live Eventure mood board showing collected visual references',
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                               DISCOVER DATA                                */
/* -------------------------------------------------------------------------- */

export const discoverSteps = [
  {
    label: 'Marketplace',
    eyebrow: '01 / Discover',
    title: 'Start with the service need.',
    description:
      'The customer enters the marketplace without needing to know the provider first, keeping discovery centred on what the event actually needs.',
    image: '/images/projects/eventure/discover/vendor-marketplace.png',
    alt: 'Eventure vendor marketplace',
  },
  {
    label: 'Evaluate',
    eyebrow: '02 / Compare',
    title: 'Turn browsing into evaluation.',
    description:
      'Marketplace results expose the available businesses so the customer can compare options before opening a specific vendor identity.',
    image: '/images/projects/eventure/discover/marketplace-results.png',
    alt: 'Eventure marketplace vendor results',
  },
  {
    label: 'Velvet Moments',
    eyebrow: '03 / Vendor identity',
    title: 'Move from a listing into the business.',
    description:
      'A vendor profile gives the marketplace result a real identity, bringing business information and positioning into the decision.',
    image: '/images/projects/eventure/discover/vendor-profile.png',
    alt: 'Velvet Moments vendor profile in Eventure',
  },
  {
    label: 'Offer',
    eyebrow: '04 / Portfolio + packages',
    title: 'Inspect the work before committing.',
    description:
      'Portfolio work and structured service packages give the customer enough context to understand what the vendor can actually provide.',
    image:
      '/images/projects/eventure/discover/vendor-portfolio-packages.png',
    alt: 'Velvet Moments portfolio and service packages',
  },
];

/* -------------------------------------------------------------------------- */
/*                                  PLAN DATA                                 */
/* -------------------------------------------------------------------------- */

export const planModules = [
  {
    label: 'Budget',
    number: '01',
    eyebrow: 'Financial control',
    title: 'Keep spending attached to the event.',
    description:
      'Budget allocation and spending remain part of the same planning context instead of moving into a disconnected spreadsheet.',
    image: '/images/projects/eventure/plan/budget-workspace.png',
    alt: 'Eventure budget workspace',
    metric: 'LKR 3.5M',
    metricLabel: 'Planned budget',
  },
  {
    label: 'Tasks',
    number: '02',
    eyebrow: 'Execution',
    title: 'Turn planning decisions into action.',
    description:
      'Tasks translate event decisions into trackable work while preserving their connection to the event being planned.',
    image: '/images/projects/eventure/plan/task-workspace.png',
    alt: 'Eventure task workspace',
    metric: 'Plan → Do',
    metricLabel: 'Work progression',
  },
  {
    label: 'Documents',
    number: '03',
    eyebrow: 'Planning assets',
    title: 'Keep important files inside the workflow.',
    description:
      'Schedules, agreements and event documents stay close to the planning context rather than becoming scattered external files.',
    image: '/images/projects/eventure/plan/document-workspace.png',
    alt: 'Eventure document workspace',
    metric: '4 files',
    metricLabel: 'Event documents',
  },
];

/* -------------------------------------------------------------------------- */
/*                                INVITE DATA                                 */
/* -------------------------------------------------------------------------- */

export const inviteSteps = [
  {
    label: 'Guests',
    eyebrow: '01 / Audience',
    title: 'Build the guest list.',
    description:
      'Guest records establish who the event needs to reach before invitation activity begins.',
    image: '/images/projects/eventure/invite/guest-management.png',
    alt: 'Eventure guest management workspace',
  },
  {
    label: 'Invitation',
    eyebrow: '02 / Workspace',
    title: 'Prepare the invitation.',
    description:
      'Invitation management stays connected to the event rather than becoming a disconnected design task.',
    image: '/images/projects/eventure/invite/invitation-workspace.png',
    alt: 'Eventure invitation workspace',
  },
  {
    label: 'Preview',
    eyebrow: '03 / Review',
    title: 'Review before publishing.',
    description:
      'The planner can inspect the invitation experience before it reaches the guest.',
    image: '/images/projects/eventure/invite/invitation-preview.png',
    alt: 'Eventure invitation preview',
  },
];

/* -------------------------------------------------------------------------- */
/*                                OPERATE DATA                                */
/* -------------------------------------------------------------------------- */

export const operateSteps = [
  {
    label: 'Overview',
    eyebrow: '01 / Monitor',
    title: 'See the platform at a glance.',
    description:
      'The administrator gets a platform-level view of users, events, bookings, payments and operational activity.',
    image: '/images/projects/eventure/operate/admin-dashboard.png',
    alt: 'Eventure administrator operations dashboard',
  },
  {
    label: 'Complaints',
    eyebrow: '02 / Trust + support',
    title: 'Give concerns a visible workflow.',
    description:
      'Complaint management keeps platform concerns structured and visible instead of losing them inside an untracked support process.',
    image: '/images/projects/eventure/operate/complaint-management.png',
    alt: 'Eventure complaint management interface',
  },
  {
    label: 'Reporting',
    eyebrow: '03 / Intelligence',
    title: 'Turn activity into usable information.',
    description:
      'Administrative reporting exposes operational data through filtering and report generation.',
    image: '/images/projects/eventure/operate/reporting-workspace.png',
    alt: 'Eventure administrative reporting workspace',
  },
];

/* -------------------------------------------------------------------------- */
/*                              SYSTEM TOPOLOGY                               */
/* -------------------------------------------------------------------------- */

export const topologyNodes = [
  {
    label: 'Customer',
    detail: 'Plan · discover · book · invite',
    icon: Users,
    className: 'lg:col-start-1 lg:row-start-2',
  },
  {
    label: 'Vendor',
    detail: 'Profile · packages · quotations · work',
    icon: Store,
    className: 'lg:col-start-3 lg:row-start-1',
  },
  {
    label: 'Guest',
    detail: 'Invitation · RSVP',
    icon: CalendarCheck2,
    className: 'lg:col-start-3 lg:row-start-3',
  },
  {
    label: 'Admin',
    detail: 'Trust · payments · support · reports',
    icon: ShieldCheck,
    className: 'lg:col-start-1 lg:row-start-4',
  },
];