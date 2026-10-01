'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowUpRight,
  BarChart3,
  ClipboardCheck,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Truck,
  UserCheck,
  UserCog,
  Users,
  UtensilsCrossed,
} from 'lucide-react';

import { Container } from '@/components/ui/container';
import type { Project } from '@/data/projects';

type EatMeCaseStudyProps = {
  project: Project;
};

const productRoles = [
  {
    number: '01',
    title: 'Donor',
    description:
      'Provides available food for donation.',
    icon: UtensilsCrossed,
  },
  {
    number: '02',
    title: 'Recipient',
    description:
      'Receives food through the sharing platform.',
    icon: UserCheck,
  },
  {
    number: '03',
    title: 'Coordinator',
    description:
      'Coordinates confirmed donations and delivery assignments.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'Handles assigned pickup and delivery activity.',
    icon: Truck,
  },
  {
    number: '05',
    title: 'Admin',
    description:
      'Manages users, approvals, reporting, and platform administration.',
    icon: ShieldCheck,
  },
];

const adminAreas = [
  {
    number: '01',
    title: 'Recipient approval',
    description:
      'Review recipient accounts and handle administrative approval.',
    icon: UserCheck,
  },
  {
    number: '02',
    title: 'Staff accounts',
    description:
      'Create and maintain Coordinator and Delivery Person accounts.',
    icon: UserCog,
  },
  {
    number: '03',
    title: 'User management',
    description:
      'View relevant users and support administrative account-management actions.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Report management',
    description:
      'Generate and manage administrative reports through a structured report lifecycle.',
    icon: BarChart3,
  },
];

const adminWorkflows = [
  {
    number: '01',
    label: 'Approval',
    title: 'Recipient review',
    path: ['Pending', 'Review', 'Approve'],
    description:
      'Recipient accounts enter an administrative review flow before approval, keeping access decisions inside the Admin workspace.',
  },
  {
    number: '02',
    label: 'Staff',
    title: 'Managed staff accounts',
    path: ['Create', 'Update', 'Manage'],
    description:
      'Coordinator and Delivery Person accounts are created and maintained through administrator-controlled workflows.',
  },
  {
    number: '03',
    label: 'Lifecycle',
    title: 'Recover before removal',
    path: ['Soft delete', 'Restore', 'Permanent'],
    description:
      'Deletion is lifecycle-aware: records can be soft deleted and restored before eligible records move to permanent deletion.',
  },
  {
    number: '04',
    label: 'Reports',
    title: 'Reports as records',
    path: ['Create', 'Update', 'Finalize'],
    description:
      'Administrative reports move through a managed lifecycle instead of existing only as one-time generated output.',
  },
];

const implementationDecisions = [
  {
    number: '01',
    title: 'Keep individual ownership explicit.',
    description:
      'EatMe is a collaborative product with several role-based modules. My implementation responsibility is the Admin module, so the case study separates the wider system context from the functionality I developed.',
  },
  {
    number: '02',
    title: 'Separate staff account responsibilities.',
    description:
      'Coordinator and Delivery Person accounts are managed through administrator-controlled workflows rather than being treated as the same type of self-managed user account.',
  },
  {
    number: '03',
    title: 'Use lifecycle-aware deletion.',
    description:
      'Administrative deletion supports soft deletion and restoration before eligible records move to permanent deletion, preserving recoverability where the workflow requires it.',
  },
  {
    number: '04',
    title: 'Treat reports as managed records.',
    description:
      'Reporting is not limited to a one-time generate action. Reports move through management operations so administrators can maintain them as part of the wider module.',
  },
];

const showcaseScreens = [
  {
    id: 'dashboard',
    number: '01',
    navLabel: 'Dashboard',
    eyebrow: 'Overview',
    title: 'Admin dashboard',
    src: '/images/projects/eatme/admin-dashboard.jpeg',
    alt: 'EatMe Admin dashboard showing platform overview and administrative activity',
    description:
      'Platform activity, user totals, donation activity, and recent administrative context are surfaced in one role-specific overview.',
  },
  {
    id: 'users',
    number: '02',
    navLabel: 'Users',
    eyebrow: 'User management',
    title: 'User management',
    src: '/images/projects/eatme/user-management.jpeg',
    alt: 'EatMe Admin user management interface',
    description:
      'User records, filtering, account states, and administrative actions are brought together in one management view.',
  },
  {
    id: 'staff',
    number: '03',
    navLabel: 'Staff',
    eyebrow: 'Staff accounts',
    title: 'Create staff account',
    src: '/images/projects/eatme/create-staff-account.jpeg',
    alt: 'EatMe Admin interface for creating Coordinator and Delivery Person accounts',
    description:
      'Coordinator and Delivery Person accounts are created through an administrator-controlled workflow.',
  },
  {
    id: 'reports',
    number: '04',
    navLabel: 'Reports',
    eyebrow: 'Report management',
    title: 'Report management',
    src: '/images/projects/eatme/report-management.jpeg',
    alt: 'EatMe Admin report management interface showing saved reports and statuses',
    description:
      'Saved reports remain visible with their lifecycle status and the administrative actions available for each record.',
  },
  {
    id: 'create',
    number: '05',
    navLabel: 'Create',
    eyebrow: 'Reporting',
    title: 'Create report',
    src: '/images/projects/eatme/create-report.jpeg',
    alt: 'EatMe Admin create report interface',
    description:
      'New reports are created with their report type, reporting period, and supporting information.',
  },
  {
    id: 'finalize',
    number: '06',
    navLabel: 'Finalize',
    eyebrow: 'Report lifecycle',
    title: 'Finalize report',
    src: '/images/projects/eatme/finalize-report.jpeg',
    alt: 'EatMe Admin report finalization confirmation interface',
    description:
      'Finalization is an explicit lifecycle action that locks the report from further editing.',
  },
] as const;

export function EatMeCaseStudy({
  project,
}: EatMeCaseStudyProps) {
  const [activeShowcaseIndex, setActiveShowcaseIndex] =
  useState(0);

const [showcaseDirection, setShowcaseDirection] =
  useState<1 | -1>(1);

const [isShowcasePlaying, setIsShowcasePlaying] =
  useState(false);

  const [showcaseCompleted, setShowcaseCompleted] =
    useState(false);

  const walkthroughTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const reduceMotion = useReducedMotion();

  const activeShowcaseScreen =
    showcaseScreens[activeShowcaseIndex];

      function getShowcasePosition(index: number) {
    const difference =
      index - activeShowcaseIndex;

    if (difference <= -2) {
      return 'farLeft';
    }

    if (difference === -1) {
      return 'left';
    }

    if (difference === 0) {
      return 'center';
    }

    if (difference === 1) {
      return 'right';
    }

    return 'farRight';
  }

  const showcaseStageVariants = {
    farLeft: {
      x: '-118%',
      z: -180,
      rotateY: 28,
      scale: 0.68,
      opacity: 0,
      filter: 'brightness(0.96)',
    },

    left: {
      x: '-73%',
      z: -95,
      rotateY: 20,
      scale: 0.8,
      opacity: 0.3,
      filter: 'brightness(0.98)',
    },

    center: {
      x: '0%',
      z: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      filter: 'brightness(1)',
    },

    right: {
      x: '73%',
      z: -95,
      rotateY: -20,
      scale: 0.8,
      opacity: 0.3,
      filter: 'brightness(0.98)',
    },

    farRight: {
      x: '118%',
      z: -180,
      rotateY: -28,
      scale: 0.68,
      opacity: 0,
      filter: 'brightness(0.96)',
    },
  } as const;

    useEffect(() => {
  if (!isShowcasePlaying) {
    return;
  }

  walkthroughTimerRef.current = setTimeout(() => {
    setActiveShowcaseIndex((currentIndex) => {
      if (
        currentIndex ===
        showcaseScreens.length - 1
      ) {
        setIsShowcasePlaying(false);
        setShowcaseCompleted(true);

        return currentIndex;
      }

      setShowcaseDirection(1);

      return currentIndex + 1;
    });
  }, 3000);

  return () => {
    if (walkthroughTimerRef.current) {
      clearTimeout(walkthroughTimerRef.current);
    }
  };
}, [
  activeShowcaseIndex,
  isShowcasePlaying,
]);

function selectShowcaseScreen(index: number) {
  if (index === activeShowcaseIndex) {
    setIsShowcasePlaying(false);
    return;
  }

  setShowcaseDirection(
    index > activeShowcaseIndex ? 1 : -1,
  );

  setIsShowcasePlaying(false);
  setShowcaseCompleted(false);
  setActiveShowcaseIndex(index);
}

function toggleShowcasePlayback() {
  if (isShowcasePlaying) {
    setIsShowcasePlaying(false);
    return;
  }

  if (showcaseCompleted) {
    setShowcaseDirection(-1);
    setActiveShowcaseIndex(0);
    setShowcaseCompleted(false);
  } else {
    setShowcaseDirection(1);
  }

  setIsShowcasePlaying(true);
}

  return (
    <>
          {/* PRODUCT CONTEXT */}

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div className="lg:pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f5df4]">
                01 / Product context
              </p>

              <p className="mt-5 max-w-[280px] text-sm leading-7 text-muted">
                EatMe depends on several people completing different parts of one
                food-sharing process.
              </p>
            </div>

            <div>
              <h2 className="max-w-[760px] font-serif text-[2rem] leading-[1.05] tracking-[-0.035em] sm:text-[2.35rem]">
                Food sharing becomes a coordination system.
              </h2>

              <div className="mt-5 max-w-[790px] space-y-4 text-[15px] leading-7 text-muted">
                <p>
                  Food-sharing workflows involve several different actors and
                  require clear coordination between donations, recipients,
                  delivery, and administration.
                </p>

                <p>
                  The application therefore separates responsibilities by role
                  while keeping those responsibilities inside one connected
                  product.
                </p>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-[1.4rem] border border-[#6f5df4]/12 bg-[#6f5df4]/[0.025] px-5 py-5 sm:px-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[8%] right-[8%] top-[31px] hidden h-px bg-gradient-to-r from-foreground/8 via-[#6f5df4]/25 to-[#6f5df4]/40 sm:block"
                />

                <div className="relative grid gap-3 sm:grid-cols-4 sm:gap-0">
                  {[
                    {
                      label: 'Donation',
                      meta: 'Food offered',
                      icon: UtensilsCrossed,
                    },
                    {
                      label: 'Recipient',
                      meta: 'Food received',
                      icon: UserCheck,
                    },
                    {
                      label: 'Delivery',
                      meta: 'Food moved',
                      icon: Truck,
                    },
                    {
                      label: 'Administration',
                      meta: 'System governed',
                      icon: ShieldCheck,
                      active: true,
                    },
                  ].map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.label}
                        className={`relative flex items-center gap-4 rounded-xl px-3 py-3 sm:block sm:px-3 sm:py-0 ${
                          step.active
                            ? 'bg-[#6f5df4]/[0.055] sm:bg-transparent'
                            : ''
                        }`}
                      >
                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-[#ebe6f7] transition-colors ${
                            step.active
                              ? 'border-[#6f5df4]/45 text-[#6f5df4] shadow-[0_0_20px_rgba(111,93,244,0.12)]'
                              : 'border-foreground/12 text-muted'
                          }`}
                        >
                          <Icon size={13} strokeWidth={1.6} />
                        </div>

                        <div className="sm:mt-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                                step.active
                                  ? 'text-[#6f5df4]'
                                  : 'text-muted/55'
                              }`}
                            >
                              0{index + 1}
                            </span>

                            {step.active ? (
                              <span className="rounded-full border border-[#6f5df4]/20 bg-[#6f5df4]/[0.06] px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-[#6f5df4]">
                                Admin context
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-1.5 font-serif text-[17px] leading-none">
                            {step.label}
                          </p>

                          <p className="mt-1.5 text-[10px] leading-4 text-muted">
                            {step.meta}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

           {/* WIDER PRODUCT */}

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.48fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f5df4]">
                02 / Wider product
              </p>

              <h2 className="mt-4 font-serif text-[2rem] leading-[1.05] tracking-[-0.035em] sm:text-[2.3rem]">
                Five roles. Different responsibilities.
              </h2>
            </div>

            <p className="max-w-[360px] text-sm leading-7 text-muted lg:justify-self-end">
              This is the system context around my module — not a claim of
              individual ownership over every role.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.45rem] border border-[#6f5df4]/[0.16] bg-white/45 shadow-[0_14px_42px_rgba(70,58,130,0.03)] backdrop-blur-sm">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5">
              {productRoles.map((role, index) => {
                const Icon = role.icon;
                const isAdmin = role.title === 'Admin';

                return (
                  <motion.article
                    key={role.title}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    className={`group relative min-h-[188px] border-b border-foreground/10 p-5 transition-[background-color,border-color,box-shadow] duration-300 sm:min-h-[196px] lg:border-b-0 lg:border-r last:lg:border-r-0 ${
                      isAdmin
                        ? 'bg-[#6f5df4]/[0.095] shadow-[inset_0_-2px_0_rgba(111,93,244,0.45)]'
                        : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-[8px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                          isAdmin
                            ? 'text-[#6f5df4]'
                            : 'text-muted/50 group-hover:text-[#6f5df4]/75'
                        }`}
                      >
                        0{index + 1}
                      </span>

                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                          isAdmin
                            ? 'border-[#6f5df4]/25 bg-[#6f5df4]/[0.07] text-[#6f5df4]'
                            : 'border-transparent text-muted/45 group-hover:border-[#6f5df4]/15 group-hover:bg-[#6f5df4]/[0.04] group-hover:text-[#6f5df4]'
                        }`}
                      >
                        <Icon size={14} strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="mt-9">
                      <h3 className="font-serif text-xl leading-none">
                        {role.title}
                      </h3>

                      <p className="mt-3 text-[11px] leading-5 text-muted">
                        {role.description}
                      </p>

                      {isAdmin ? (
                        <div className="mt-4 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4] shadow-[0_0_10px_rgba(111,93,244,0.45)]" />
                          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                            My module
                          </span>
                        </div>
                      ) : (
                        <div
                          aria-hidden="true"
                          className="mt-5 h-px w-0 bg-[#6f5df4]/35 transition-all duration-300 group-hover:w-8"
                        />
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

            {/* MY RESPONSIBILITY */}

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f5df4]">
                03 / My responsibility
              </p>

              <h2 className="mt-4 max-w-[390px] font-serif text-[2.25rem] leading-[0.98] tracking-[-0.04em] sm:text-[2.65rem]">
                Platform administration from one mobile workspace.
              </h2>

              <p className="mt-6 max-w-[340px] text-sm leading-7 text-muted">
                My assigned development responsibility is the Admin module and
                its administrative workflows.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6f5df4]/25 bg-[#6f5df4]/[0.06] text-[#6f5df4]">
                  <ShieldCheck size={14} strokeWidth={1.6} />
                </span>

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
                    Admin module
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted">
                    Four connected responsibilities
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[17%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#6f5df4]/22 to-transparent sm:block"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[17%] left-1/2 top-[17%] hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#6f5df4]/22 to-transparent sm:block"
              />

              <div
                aria-hidden="true"
className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6f5df4]/35 bg-[#ebe6f7] shadow-[0_0_22px_rgba(111,93,244,0.22)] sm:block"              >
                <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6f5df4]" />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6f5df4]/[0.045] blur-[45px] sm:block"
              />

              <div className="relative grid gap-3 sm:grid-cols-2">
                {adminAreas.map((area, index) => {
                  const Icon = area.icon;

                  return (
                    <motion.article
  key={area.title}
  whileHover={
    reduceMotion
      ? undefined
      : {
          y: -3,
          scale: 1.008,
        }
  }
  transition={{
    type: 'spring',
    stiffness: 270,
    damping: 24,
  }}
  className="group relative z-20 min-h-[176px] overflow-hidden rounded-[1.3rem] border border-[#6f5df4]/[0.16] bg-white/50 p-5 shadow-[0_14px_40px_rgba(70,58,130,0.035)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#6f5df4]/30 hover:bg-white/68 hover:shadow-[0_18px_48px_rgba(70,58,130,0.07)]"
>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#6f5df4]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#6f5df4]/[0.09]"
                      />

                      <div className="relative flex items-start justify-between">
                        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                          0{index + 1}
                        </span>

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#6f5df4]/15 bg-[#6f5df4]/[0.035] text-[#6f5df4] transition-all duration-300 group-hover:border-[#6f5df4]/30 group-hover:bg-[#6f5df4]/[0.075]">
                          <Icon size={15} strokeWidth={1.55} />
                        </div>
                      </div>

                      <div className="relative mt-7">
                        <h3 className="font-serif text-[1.45rem] leading-none">
                          {area.title}
                        </h3>

                        <p className="mt-3 max-w-[300px] text-[11px] leading-5 text-muted">
                          {area.description}
                        </p>
                      </div>

                      <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#6f5df4]/60 to-transparent transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

                  {/* ADMIN WORKFLOWS */}

      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/20" />
                  <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
                </span>

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f5df4]">
                  04 / Administrative workflows
                </p>
              </div>

              <h2 className="mt-4 max-w-xl font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                Admin actions have their own lifecycle.
              </h2>
            </div>

            <div className="lg:max-w-sm">
              <p className="text-sm leading-7 text-muted">
                Different administrative responsibilities
                require different state transitions rather
                than one generic CRUD pattern.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#6f5df4]/55" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-muted/65">
                  State-aware administration
                </span>
              </div>
            </div>
          </div>

          {/* WORKFLOW MATRIX */}

          <div className="relative mt-9">
            {/* CROSS-SYSTEM CONNECTIONS */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[8%] hidden h-[84%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#6f5df4]/25 to-transparent lg:block"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[5%] right-[5%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#6f5df4]/25 to-transparent lg:block"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#6f5df4]/35 bg-[#ebe6f7] shadow-[0_0_24px_rgba(111,93,244,0.18)] lg:flex"
            >
              <span className="h-1 w-1 rounded-full bg-[#6f5df4]" />
            </div>

            <div className="relative grid gap-3 lg:grid-cols-2">
              {adminWorkflows.map(
                (workflow, workflowIndex) => (
                  <motion.article
                    key={workflow.number}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 18,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.28,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.55,
                      delay: reduceMotion
                        ? 0
                        : workflowIndex * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -3,
                          }
                    }
                    className="group relative overflow-hidden rounded-[1.35rem] border border-[#6f5df4]/[0.18] bg-white/55 p-6 shadow-[0_16px_48px_rgba(70,58,130,0.04)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#6f5df4]/35 hover:bg-white/70 hover:shadow-[0_22px_60px_rgba(70,58,130,0.075)]"
                  >
                    {/* CARD LIGHT */}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-[-4rem] top-[-5rem] h-48 w-48 rounded-full bg-[#6f5df4]/[0.045] blur-[70px] transition-all duration-500 group-hover:bg-[#6f5df4]/[0.09]"
                    />

                    {/* TOP SIGNAL */}

                    <motion.div
                      aria-hidden="true"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              scaleX: 0,
                            }
                      }
                      whileInView={{
                        scaleX: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.4,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.8,
                        delay: reduceMotion
                          ? 0
                          : 0.2 + workflowIndex * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute left-6 top-0 h-px w-16 origin-left bg-gradient-to-r from-[#6f5df4]/75 to-transparent"
                    />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="relative flex h-2 w-2 items-center justify-center">
                            <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/15 transition-transform duration-300 group-hover:scale-[1.7]" />
                            <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
                          </span>

                          <span className="text-[9px] font-semibold text-[#6f5df4]">
                            {workflow.number}
                          </span>
                        </div>

                        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted/60 transition-colors duration-300 group-hover:text-[#6f5df4]/80">
                          {workflow.label}
                        </span>
                      </div>

                      <h3 className="mt-8 font-serif text-2xl text-foreground">
                        {workflow.title}
                      </h3>

                      {/* STATE ROUTE */}

                      <div className="mt-7 flex items-center">
                        {workflow.path.map(
                          (state, index) => (
                            <div
                              key={state}
                              className="flex min-w-0 flex-1 items-center"
                            >
                              <div className="flex min-w-0 flex-1 items-center gap-2">
                                <motion.span
                                  initial={
                                    reduceMotion
                                      ? false
                                      : {
                                          scale: 0.72,
                                          opacity: 0.35,
                                        }
                                  }
                                  whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                  }}
                                  viewport={{
                                    once: true,
                                    amount: 0.5,
                                  }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 230,
                                    damping: 20,
                                    delay: reduceMotion
                                      ? 0
                                      : 0.28 +
                                        workflowIndex * 0.08 +
                                        index * 0.1,
                                  }}
                                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#6f5df4]/35 bg-[#6f5df4]/[0.075] transition-all duration-300 group-hover:border-[#6f5df4]/55 group-hover:shadow-[0_0_15px_rgba(111,93,244,0.16)]"
                                >
                                  <span className="h-1 w-1 rounded-full bg-[#6f5df4]" />
                                </motion.span>

                                <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.1em] text-muted/80 transition-colors duration-300 group-hover:text-foreground/80">
                                  {state}
                                </span>
                              </div>

                              {index <
                                workflow.path.length - 1 && (
                                <div className="mx-3 h-px min-w-4 flex-1 overflow-hidden bg-[#6f5df4]/15">
                                  <motion.div
                                    initial={
                                      reduceMotion
                                        ? false
                                        : {
                                            scaleX: 0,
                                          }
                                    }
                                    whileInView={{
                                      scaleX: 1,
                                    }}
                                    viewport={{
                                      once: true,
                                      amount: 0.5,
                                    }}
                                    transition={{
                                      duration: reduceMotion
                                        ? 0
                                        : 0.55,
                                      delay: reduceMotion
                                        ? 0
                                        : 0.35 +
                                          workflowIndex * 0.08 +
                                          index * 0.1,
                                      ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                      ],
                                    }}
                                    className="h-full w-full origin-left bg-gradient-to-r from-[#6f5df4]/65 via-[#8d7cff]/45 to-[#6f5df4]/20"
                                  />
                                </div>
                              )}
                            </div>
                          ),
                        )}
                      </div>

                      <p className="mt-7 max-w-xl text-[11px] leading-6 text-muted transition-colors duration-300 group-hover:text-muted-foreground">
                        {workflow.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-[#6f5df4]/[0.1] pt-4">
                        <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted/55">
                          EM / ADMIN / {workflow.number}
                        </span>

                        <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]/65 transition-colors duration-300 group-hover:text-[#6f5df4]/80">
                          {workflow.path.length} states
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ),
              )}
            </div>
          </div>

          {/* SYSTEM FOOTER */}

          <div className="mt-5 flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/20" />
                <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
              </span>

              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted/60">
                Role-specific administration · state-aware actions · recoverable
                workflows
              </p>
            </div>

            <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]/60">
              04 workflows / 12 states
            </span>
          </div>
        </Container>
      </section>

            {/* IMPLEMENTATION DECISIONS */}

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f5df4]">
                05 / Implementation decisions
              </p>

              <h2 className="mt-4 max-w-[390px] font-serif text-[2.25rem] leading-[0.98] tracking-[-0.04em] sm:text-[2.6rem]">
                Administrative actions need clear boundaries.
              </h2>

              <p className="mt-6 max-w-[330px] text-sm leading-7 text-muted">
                The Admin module was shaped around responsibility boundaries,
                recoverable actions, and records that move through explicit
                states.
              </p>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-8 left-[15px] top-8 w-px bg-gradient-to-b from-[#6f5df4]/10 via-[#6f5df4]/28 to-[#6f5df4]/10"
              />

              <div className="border-y border-foreground/10">
                {implementationDecisions.map((decision, index) => (
                  <motion.article
                    key={decision.title}
                    initial={false}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            x: 3,
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 26,
                    }}
                    className="group relative grid gap-3 border-b border-foreground/10 py-5 pl-12 last:border-b-0 sm:grid-cols-[0.75fr_1.25fr] sm:gap-7 sm:py-6"
                  >
                    <div
  aria-hidden="true"
  className="absolute left-[10px] top-[25px] z-10 flex h-[11px] w-[11px] items-center justify-center rounded-full border border-[#6f5df4]/35 bg-[#ebe6f7] transition-all duration-300 group-hover:border-[#6f5df4]/65 group-hover:shadow-[0_0_16px_rgba(111,93,244,0.28)] sm:top-[29px]"
>
                      <span className="h-[3px] w-[3px] rounded-full bg-[#6f5df4]" />
                    </div>

                    <div>
                      <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                        0{index + 1}
                      </span>

                      <h3 className="mt-2 max-w-[250px] font-serif text-[1.25rem] leading-[1.15] transition-colors duration-300 group-hover:text-[#4f3fe0]">
                        {decision.title}
                      </h3>
                    </div>

                    <p className="max-w-[460px] text-[12px] leading-6 text-muted">
                      {decision.description}
                    </p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 pl-12">
                <span className="h-px w-8 bg-[#6f5df4]/45" />
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted/55">
                  Boundaries · lifecycle · maintainability
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

                   {/* SELECTED INTERFACES */}

      <section className="py-14 sm:py-16">
        <Container>
          {/* SECTION INTRO */}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/20" />
                  <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
                </span>

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  06 / Selected interfaces
                </p>
              </div>

              <h2 className="mt-4 max-w-xl font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                The Admin module in use.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Explore the implemented Admin module
              manually, or play the walkthrough to move
              through six selected interfaces.
            </p>
          </div>

          {/* ADMIN MODULE THEATRE */}

          <div className="mt-10 overflow-hidden rounded-[1.8rem] border border-[#6f5df4]/[0.15] bg-background shadow-[0_28px_90px_rgba(58,48,120,0.06)]">
            {/* THEATRE HEADER */}

            <div className="flex items-center justify-between gap-4 border-b border-foreground/10 px-5 py-3.5 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span
                    className={`absolute h-2 w-2 rounded-full bg-[#6f5df4]/25 ${
                      isShowcasePlaying
                        ? 'animate-ping'
                        : ''
                    }`}
                  />

                  <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
                </span>

                <span className="text-[8px] font-semibold uppercase tracking-[0.19em] text-[#6f5df4]">
                  EM / Admin module showcase
                </span>
              </div>

              <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/35">
                {activeShowcaseScreen.number} / 06
              </span>
            </div>

            {/* SIX-SCENE NAVIGATION */}

            <div className="relative z-20 border-b border-foreground/10 bg-background px-3 sm:px-5">
              <div className="grid grid-cols-3 sm:grid-cols-6">
                {showcaseScreens.map(
                  (screen, index) => {
                    const active =
                      activeShowcaseIndex === index;

                    return (
                      <button
                        key={screen.id}
                        type="button"
                        onClick={() =>
                          selectShowcaseScreen(index)
                        }
                        aria-current={
                          active ? 'step' : undefined
                        }
                        className={`relative min-w-0 rounded-t-xl px-3 py-3.5 text-left transition-all ${
                          active
                            ? 'bg-[#6f5df4]/[0.06] text-foreground'
                            : 'text-muted-foreground hover:bg-[#6f5df4]/[0.025] hover:text-foreground'
                        }`}
                      >
                        <span
                          className={`block text-[8px] font-semibold ${
                            active
                              ? 'text-[#6f5df4]'
                              : 'text-muted-foreground/35'
                          }`}
                        >
                          {screen.number}
                        </span>

                        <span className="mt-1 block truncate text-[9px] font-semibold uppercase tracking-[0.1em] sm:text-[10px]">
                          {screen.navLabel}
                        </span>

                        {active && (
                          <motion.span
                            layoutId="eatme-showcase-navigation"
                            className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#6f5df4] shadow-[0_0_12px_rgba(111,93,244,0.28)]"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 34,
                            }}
                          />
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

                        {/* THEATRE BODY */}

            <div className="grid lg:grid-cols-[1.5fr_0.5fr]">
                            {/* INTERFACE STAGE */}

              <div className="relative min-w-0 overflow-hidden bg-[#f8f7fc]">
                                {/* QUIET LAVENDER ENVIRONMENT */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(111,93,244,.095)_0%,rgba(111,93,244,.038)_42%,transparent_74%)]"
                />

                {/* TECHNICAL GRID */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(111,93,244,.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,93,244,.018)_1px,transparent_1px)] bg-[size:52px_52px]"
                />

                {/* VERTICAL CENTRE BEAM */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[2%] h-[95%] w-[35%] -translate-x-1/2 rounded-[46%] bg-[linear-gradient(to_bottom,transparent_2%,rgba(111,93,244,.045)_22%,rgba(111,93,244,.12)_48%,rgba(111,93,244,.065)_78%,transparent_98%)] blur-[42px]"
                />

                {/* MAIN CENTRE BLUSH */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[48%] h-[72%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-[#6f5df4]/[0.16] blur-[64px]"
                />

                {/* CONCENTRATED INNER BLUSH */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[47%] h-[59%] w-[29%] -translate-x-1/2 -translate-y-1/2 rounded-[45%] bg-[#806df8]/[0.13] blur-[31px]"
                />

                {/* LOWER VIOLET BLOOM */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[1%] left-1/2 h-[120px] w-[49%] -translate-x-1/2 rounded-[50%] bg-[#6f5df4]/[0.18] blur-[38px]"
                />

                {/* CONCENTRATED FLOOR LIGHT */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[1.5%] left-1/2 h-[52px] w-[34%] -translate-x-1/2 rounded-[50%] bg-[#806df8]/[0.2] blur-[22px]"
                />

                {/* FLOOR HORIZON */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[3.5%] left-1/2 h-px w-[38%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6f5df4]/60 to-transparent"
                />

                {/* PERSISTENT 3D STAGE */}

                <div
                  className="relative flex min-h-[590px] items-center justify-center overflow-hidden px-4 py-5 sm:min-h-[625px] sm:px-8 lg:min-h-[650px] lg:py-5"
                  style={{
                    perspective: '1150px',
                    perspectiveOrigin: '50% 48%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* ALL SIX SCREENS REMAIN IN THE SAME 3D SPACE */}

                  <div
                    className="relative flex h-full w-full items-center justify-center"
                    style={{
                      transformStyle:
                        'preserve-3d',
                    }}
                  >
                    {showcaseScreens.map(
                      (screen, index) => {
                        const position =
                          getShowcasePosition(
                            index,
                          );

                        const isActive =
                          index ===
                          activeShowcaseIndex;

                        const isAdjacent =
                          Math.abs(
                            index -
                              activeShowcaseIndex,
                          ) === 1;

                        return (
                          <motion.div
                            key={screen.id}
                            initial={false}
                            animate={
                              reduceMotion
                                ? {
                                    ...showcaseStageVariants[
                                      position
                                    ],
                                    rotateY: 0,
                                    z: 0,
                                  }
                                : showcaseStageVariants[
                                    position
                                  ]
                            }
                            transition={
                              reduceMotion
                                ? {
                                    duration: 0.15,
                                  }
                                : {
                                    type: 'spring',
                                    stiffness: 105,
                                    damping: 22,
                                    mass: 0.88,
                                  }
                            }
                            aria-hidden={
                              !isActive
                            }
                            className={`absolute w-full max-w-[278px] sm:max-w-[292px] lg:max-w-[298px] ${
                              isActive
                                ? 'z-30'
                                : isAdjacent
                                  ? 'z-20'
                                  : 'z-10'
                            }`}
                            style={{
                              transformStyle:
                                'preserve-3d',
                              transformOrigin:
                                'center center',
                              willChange:
                                'transform, opacity, filter',
                              pointerEvents:
                                isActive
                                  ? 'auto'
                                  : 'none',
                            }}
                          >
                            {/* ACTIVE-SCREEN HALO ONLY */}

                            <motion.div
                              aria-hidden="true"
                              animate={{
                                opacity: isActive
                                  ? 1
                                  : 0,
                                scale: isActive
                                  ? 1
                                  : 0.88,
                              }}
                              transition={{
                                duration:
                                  reduceMotion
                                    ? 0.1
                                    : 0.35,
                              }}
                              className="pointer-events-none absolute -inset-8 rounded-[2.7rem] bg-[#6f5df4]/[0.17] blur-[34px]"
                            />

                            {/* ACTIVE EDGE LIGHT */}

                            <motion.div
                              aria-hidden="true"
                              animate={{
                                opacity: isActive
                                  ? 1
                                  : 0,
                              }}
                              transition={{
                                duration:
                                  reduceMotion
                                    ? 0.1
                                    : 0.3,
                              }}
                              className="pointer-events-none absolute -inset-[2px] rounded-[1.68rem] bg-gradient-to-b from-[#8a79ff]/60 via-[#6f5df4]/20 to-[#6f5df4]/45 shadow-[0_0_26px_rgba(111,93,244,0.22)]"
                            />

                            <Image
                              src={screen.src}
                              alt={
                                isActive
                                  ? screen.alt
                                  : ''
                              }
                              width={1179}
                              height={2556}
                              priority={
                                index === 0
                              }
                              sizes="(max-width: 640px) 82vw, 298px"
                              className={`relative h-auto w-full rounded-[1.55rem] border bg-white transition-[border-color,box-shadow] duration-300 ${
                                isActive
                                  ? 'border-[#6f5df4]/80 shadow-[0_34px_100px_rgba(73,55,165,0.28)]'
                                  : 'border-[#6f5df4]/10 shadow-[0_18px_55px_rgba(13,17,19,0.06)]'
                              }`}
                            />

                            {/* ACTIVE BASE LIGHT */}

                            <motion.div
                              aria-hidden="true"
                              animate={{
                                opacity: isActive
                                  ? 1
                                  : 0,
                                scaleX: isActive
                                  ? 1
                                  : 0.7,
                              }}
                              transition={{
                                duration:
                                  reduceMotion
                                    ? 0.1
                                    : 0.35,
                              }}
                              className="pointer-events-none absolute -bottom-5 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6f5df4]/65 to-transparent"
                            />
                          </motion.div>
                        );
                      },
                    )}
                  </div>

                  {/* STAGE MICRO LABELS */}

                  <span className="absolute bottom-4 left-5 z-40 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]/45 sm:left-7">
                    EM / ADMIN /{' '}
                    {activeShowcaseScreen.number}
                  </span>

                  <span className="absolute bottom-4 right-5 z-40 text-[7px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/30 sm:right-7">
                    Implemented interface
                  </span>
                </div>
              </div>

              {/* SCENE INFORMATION PANEL */}

              <aside className="relative flex min-w-0 flex-col border-t border-foreground/10 bg-[#6f5df4]/[0.038] lg:border-l lg:border-t-0">
                {/* PURPLE PANEL FOCUS */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(111,93,244,.12),transparent_46%)]"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-[13%] h-[28%] w-px bg-gradient-to-b from-transparent via-[#6f5df4]/45 to-transparent"
                />

                {/* CURRENT SCENE */}

                <div className="relative flex flex-1 flex-col px-6 py-6 sm:px-7 lg:px-7 lg:py-7">
                  <AnimatePresence
                    mode="wait"
                    custom={showcaseDirection}
                  >
                    <motion.div
                      key={`${activeShowcaseScreen.id}-information`}
                      custom={showcaseDirection}
                      initial={
                        reduceMotion
                          ? {
                              opacity: 0,
                            }
                          : {
                              opacity: 0,
                              x:
                                showcaseDirection === 1
                                  ? 12
                                  : -12,
                              y: 5,
                            }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                      }}
                      exit={
                        reduceMotion
                          ? {
                              opacity: 0,
                            }
                          : {
                              opacity: 0,
                              x:
                                showcaseDirection === 1
                                  ? -8
                                  : 8,
                              y: -3,
                            }
                      }
                      transition={{
                        duration: reduceMotion
                          ? 0.15
                          : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* SCENE NUMBER */}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-semibold text-[#6f5df4]">
                            {activeShowcaseScreen.number}
                          </span>

                          <p className="mt-2 text-[7px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/40">
                            {activeShowcaseScreen.eyebrow}
                          </p>
                        </div>

                        <span className="font-serif text-5xl leading-none text-[#6f5df4]/[0.09]">
                          {activeShowcaseScreen.number}
                        </span>
                      </div>

                      {/* FOCUS RULE */}

                      <div className="mt-5 flex items-center gap-2">
                        <div className="h-px w-10 bg-[#6f5df4]/55" />
                        <div className="h-1 w-1 rounded-full bg-[#6f5df4]/50" />
                      </div>

                      {/* TITLE */}

                      <h3 className="mt-5 font-serif text-3xl tracking-[-0.04em] text-foreground lg:text-[2rem]">
                        {activeShowcaseScreen.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="mt-3.5 text-[13px] leading-6 text-muted-foreground">
                        {
                          activeShowcaseScreen.description
                        }
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* PLAYBACK AREA */}

                  <div className="relative mt-auto pt-7">
                    {/* SCENE PROGRESS */}

                    <div className="mb-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/35">
                          Scene progress
                        </span>

                        <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]/60">
                          {
                            activeShowcaseScreen.number
                          }{' '}
                          / 06
                        </span>
                      </div>

                      <div className="relative mt-2.5 h-px overflow-hidden bg-foreground/10">
                        <motion.div
                          animate={{
                            width: `${
                              ((activeShowcaseIndex +
                                1) /
                                showcaseScreens.length) *
                              100
                            }%`,
                          }}
                          transition={{
                            duration: reduceMotion
                              ? 0
                              : 0.45,
                            ease: [
                              0.22, 1, 0.36, 1,
                            ],
                          }}
                          className="absolute inset-y-0 left-0 bg-[#6f5df4]"
                        />
                      </div>
                    </div>

                    {/* PLAY CONTROL */}

                    <div className="border-t border-foreground/10 pt-5">
                      <button
                        type="button"
                        onClick={
                          toggleShowcasePlayback
                        }
                        aria-label={
                          isShowcasePlaying
                            ? 'Pause EatMe Admin module walkthrough'
                            : showcaseCompleted
                              ? 'Replay EatMe Admin module walkthrough'
                              : 'Play EatMe Admin module walkthrough'
                        }
                        className="group flex w-full items-center gap-4 text-left"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#6f5df4]/35 bg-background/80 text-[#6f5df4] shadow-[0_10px_30px_rgba(111,93,244,0.1)] transition group-hover:border-[#6f5df4]/55 group-hover:bg-[#6f5df4]/[0.09]">
                          {isShowcasePlaying ? (
                            <Pause
                              size={14}
                              strokeWidth={1.8}
                            />
                          ) : showcaseCompleted ? (
                            <RotateCcw
                              size={14}
                              strokeWidth={1.8}
                            />
                          ) : (
                            <Play
                              size={14}
                              strokeWidth={1.8}
                              className="translate-x-[1px]"
                            />
                          )}
                        </span>

                        <span>
                          <span className="block text-[8px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
                            {isShowcasePlaying
                              ? 'Pause walkthrough'
                              : showcaseCompleted
                                ? 'Replay walkthrough'
                                : 'Play walkthrough'}
                          </span>

                          <span className="mt-1 block text-[10px] leading-4 text-muted-foreground/55">
                            {isShowcasePlaying
                              ? `${activeShowcaseScreen.number} of 06 · playing`
                              : showcaseCompleted
                                ? 'Replay or select another interface'
                                : 'Six implemented interfaces'}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>

            {/* COLLABORATIVE OUTCOME */}

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f5df4]">
                07 / Collaborative outcome
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#6f5df4] shadow-[0_0_14px_rgba(111,93,244,0.3)]" />
                <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted/55">
                  EM / Outcome
                </span>
              </div>
            </div>

            <div>
              <h2 className="max-w-[760px] font-serif text-[2.15rem] leading-[1.02] tracking-[-0.035em] sm:text-[2.55rem]">
                Owning one module inside a larger product.
              </h2>

              <div className="mt-5 max-w-[760px] space-y-4 text-[14px] leading-7 text-muted">
                <p>
                  The project demonstrates mobile application development and
                  individual module ownership within a larger multi-role
                  collaborative system.
                </p>

                <p>
                  The Admin module had to fit into a product shared with other
                  role-based modules, making clear responsibility boundaries and
                  integration with the wider application part of the development
                  process.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-5 border-t border-foreground/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {[
                    'Mobile development',
                    'Module ownership',
                    'Team integration',
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      {index > 0 ? (
                        <span
                          aria-hidden="true"
                          className="hidden h-1 w-1 rounded-full bg-[#6f5df4]/45 sm:block"
                        />
                      ) : null}

                      <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-muted/60">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="https://github.com/ViduraMC/EatMe"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  View EatMe team repository
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
