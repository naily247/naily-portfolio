'use client';

import {
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Braces,
  Database,
  Layers3,
  Smartphone,
  Users,
  Workflow,
} from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { WorkSystemField } from '@/components/sections/work/work-system-field';
import { Container } from '@/components/ui/container';
import { projects } from '@/data/projects';

type Project = (typeof projects)[number];

const featuredProjectSlugs = [
  'eventure',
  'eatme',
  'library-hub',
] as const;

const projectSystems = {
  eventure: {
    code: 'EV / 01',
    primary: 'PRODUCT SYSTEM',
    secondary: 'FULL-STACK',
    nodes: [
      {
        label: 'Interface',
        value: 'React',
        icon: Layers3,
      },
      {
        label: 'Application',
        value: 'Express',
        icon: Braces,
      },
      {
        label: 'Data',
        value: 'PostgreSQL',
        icon: Database,
      },
    ],
    center: 'Eventure',
    centerMeta: 'Event workspace',
    previewImage:
      '/images/projects/eventure/plan/event-workspace.png',
    previewType: 'desktop',
  },

  eatme: {
    code: 'EM / 02',
    primary: 'MOBILE SYSTEM',
    secondary: 'COLLABORATIVE',
    nodes: [
      {
        label: 'Experience',
        value: 'Mobile',
        icon: Smartphone,
      },
      {
        label: 'Module',
        value: 'Admin',
        icon: Workflow,
      },
      {
        label: 'Context',
        value: 'Team',
        icon: Users,
      },
    ],
    center: 'EatMe',
    centerMeta: 'Admin module',
    previewImage:
      '/images/projects/eatme/admin-dashboard.jpeg',
    previewType: 'mobile',
  },

  'library-hub': {
    code: 'LH / 03',
    primary: 'ACADEMIC SYSTEM',
    secondary: 'REPORTING',
    nodes: [
      {
        label: 'Workflow',
        value: 'Reports',
        icon: Workflow,
      },
      {
        label: 'Logic',
        value: 'CRUD',
        icon: Braces,
      },
      {
        label: 'Data',
        value: 'Records',
        icon: Database,
      },
    ],
    center: 'Library Hub',
    centerMeta: 'Report management',
    previewImage:
      '/images/projects/library-hub/report-management.jpeg',
    previewType: 'desktop',
  },
} as const;

function ProjectVisual({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  /*
    Pointer-reactive exhibit depth.

    The raw pointer values stay intentionally small.
    Springs remove the mechanical "cursor tracking" feel
    and make the exhibit behave more like a physical object.
  */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const [isSystemActive, setIsSystemActive] =
  useState(false);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 150,
    damping: 22,
    mass: 0.55,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 150,
    damping: 22,
    mass: 0.55,
  });

  const rotateY = useTransform(
    smoothPointerX,
    [-1, 1],
    [-2.6, 2.6],
  );

  const rotateX = useTransform(
    smoothPointerY,
    [-1, 1],
    [2.1, -2.1],
  );

  const lightX = useTransform(
    smoothPointerX,
    [-1, 1],
    ['18%', '82%'],
  );

  const lightY = useTransform(
    smoothPointerY,
    [-1, 1],
    ['18%', '82%'],
  );

const handlePointerMove = (
  event: ReactPointerEvent<HTMLDivElement>,
) => {
  if (reduceMotion) return;

  setIsSystemActive(true);

  const rect =
    event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width;

    const y =
      (event.clientY - rect.top) / rect.height;

    pointerX.set((x - 0.5) * 2);
    pointerY.set((y - 0.5) * 2);
  };

const handlePointerLeave = () => {
  setIsSystemActive(false);

  pointerX.set(0);
  pointerY.set(0);
};

  const system =
    projectSystems[
      project.slug as keyof typeof projectSystems
    ];

  /*
    Keep a graceful fallback in case the data file
    changes before this exhibit configuration does.
  */
  if (!system) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block overflow-hidden rounded-[1.5rem] border border-current/10 bg-current/[0.035]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(109,158,232,.18),transparent_38%),radial-gradient(circle_at_75%_78%,rgba(111,93,244,.13),transparent_40%)]" />

          <div className="absolute inset-[6%] flex items-center justify-center rounded-[1rem] border border-current/10 bg-black/10">
            <p className="font-serif text-5xl opacity-10">
              {project.title}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className="group relative block"
    >
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.965,
                y: 18,
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.38,
        }}
      transition={{
        duration: 0.8,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        reduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
              transformStyle: 'preserve-3d',
            }
      }
      className="relative overflow-hidden rounded-[1.65rem] border border-current/10 bg-current/[0.025] will-change-transform"
    >
      {/* ============================================================ */}
      {/* ATMOSPHERE                                                   */}
      {/* ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {!reduceMotion && (
          <div className="absolute inset-0 z-[1] opacity-90">
<WorkSystemField
  variant={
    project.slug as
      | 'eventure'
      | 'eatme'
      | 'library-hub'
  }
  active={isSystemActive}
  pointerX={smoothPointerX}
  pointerY={smoothPointerY}
/>
          </div>
        )}

        {/* your EXISTING atmosphere/glows/grid continue here */}
<div className="absolute -left-[18%] -top-[25%] h-[70%] w-[70%] rounded-full bg-soft-violet/[0.13] blur-[95px]" />

<div className="absolute -bottom-[30%] right-[-10%] h-[65%] w-[65%] rounded-full bg-soft-violet/[0.085] blur-[100px]" />

<div className="absolute right-[12%] top-[18%] h-[38%] w-[38%] rounded-full bg-cool-blue/[0.045] blur-[90px]" />

        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{
              left: lightX,
              top: lightY,
              x: '-50%',
              y: '-50%',
            }}
            className="absolute h-[42%] w-[42%] rounded-full bg-soft-violet/[0.10] blur-[65px]"
          />
        )}

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative aspect-[16/10] min-h-[390px] p-5 sm:p-6">
          {/* ========================================================== */}
          {/* EXHIBIT HEADER                                             */}
          {/* ========================================================== */}

          <div className="relative z-20 flex items-center justify-between border-b border-current/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                {!reduceMotion && (
                  <motion.span
                    animate={{
                      scale: [1, 2.2, 1],
                      opacity: [0.45, 0, 0.45],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 rounded-full bg-soft-violet"
                  />
                )}

                <span className="relative h-2 w-2 rounded-full bg-soft-violet shadow-[0_0_10px_rgba(124,108,242,0.45)]" />
              </span>

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] opacity-45">
                {system.primary}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden text-[8px] uppercase tracking-[0.18em] opacity-25 sm:block">
                {system.secondary}
              </span>

              <span className="text-[8px] font-semibold tabular-nums tracking-[0.18em] text-soft-violet">
                {system.code}
              </span>
            </div>
          </div>

          {/* ========================================================== */}
          {/* SYSTEM MAP                                                 */}
          {/* ========================================================== */}

                  <div
          className="absolute inset-x-5 bottom-5 top-[66px] sm:inset-x-6 sm:bottom-6"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
            {/* signal architecture */}

            <svg
              aria-hidden="true"
              viewBox="0 0 800 430"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible [transform:translateZ(5px)]"
            >
              <defs>
                <linearGradient
                  id={`system-line-${project.slug}`}
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                >
                  <stop
                    offset="0%"
                    stopColor="#7c6cf2"
                    stopOpacity="0.10"
                  />

                  <stop
                    offset="50%"
                    stopColor="#8b7cf6"
                    stopOpacity="0.42"
                  />

                  <stop
                    offset="100%"
                    stopColor="#7c6cf2"
                    stopOpacity="0.12"
                  />
                </linearGradient>

                <linearGradient
                  id={`system-pulse-${project.slug}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="#7c6cf2"
                    stopOpacity="0"
                  />

                  <stop
                    offset="50%"
                    stopColor="#9a8cff"
                    stopOpacity="0.9"
                  />

                  <stop
                    offset="100%"
                    stopColor="#6f5df4"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d="
                  M105 105
                  C225 105 235 215 400 215
                  C565 215 575 105 695 105
                "
                fill="none"
                stroke={`url(#system-line-${project.slug})`}
                strokeWidth="1"
              />

              <path
                d="
                  M105 325
                  C235 325 250 215 400 215
                "
                fill="none"
                stroke={`url(#system-line-${project.slug})`}
                strokeWidth="1"
              />

              {!reduceMotion && (
                <>
                  <motion.path
                    d="
                      M105 105
                      C225 105 235 215 400 215
                      C565 215 575 105 695 105
                    "
                    fill="none"
                    stroke={`url(#system-pulse-${project.slug})`}
                    strokeWidth="1.4"
                    strokeDasharray="38 470"
                    animate={{
                      strokeDashoffset: [
                        510,
                        -510,
                      ],
                    }}
                    transition={{
                      duration: 5.8,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.35,
                    }}
                  />

                  <motion.path
                    d="
                      M105 325
                      C235 325 250 215 400 215
                    "
                    fill="none"
                    stroke={`url(#system-pulse-${project.slug})`}
                    strokeWidth="1.4"
                    strokeDasharray="30 300"
                    animate={{
                      strokeDashoffset: [
                        330,
                        -330,
                      ],
                    }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: 'linear',
                      delay:
                        0.7 + index * 0.25,
                    }}
                  />
                </>
              )}
            </svg>

            {/* center product */}

          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.025,
                    y: -2,
                  }
            }
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-1/2 z-10 w-[46%] max-w-[250px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
style={{
  translateZ: reduceMotion ? 0 : 26,
}}
          >
            <div className="group/product relative overflow-hidden rounded-[1.25rem] border border-current/15 bg-[#0d1113]/80 p-2.5 backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-soft-violet/40 hover:shadow-[0_18px_55px_rgba(124,108,242,0.12)]">
              {/* active top signal */}
              <div className="absolute left-1/2 top-0 z-30 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-soft-violet/80 to-transparent" />

              {/* product identity */}
              <div className="relative z-20 flex items-center justify-between gap-3 px-1.5 pb-2.5 pt-1">
                <div className="min-w-0 text-left">
                  <p className="text-[6px] font-semibold uppercase tracking-[0.2em] text-soft-violet/65">
                    {system.previewType === 'mobile'
                      ? 'Mobile product'
                      : 'Product'}
                  </p>

                  <p className="mt-1 truncate font-serif text-[clamp(1rem,1.6vw,1.35rem)] leading-none tracking-[-0.035em]">
                    {system.center}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-cool-blue/65" />
                  <span className="h-px w-4 bg-current/15" />
                  <span className="h-1 w-1 rounded-full bg-soft-violet/80" />
                </div>
              </div>

              {/* real product interface */}
              <div
                className={
                  system.previewType === 'mobile'
                    ? 'relative mx-auto h-[150px] w-[76px] overflow-hidden rounded-[0.8rem] border border-white/10 bg-black/30 shadow-[0_12px_35px_rgba(0,0,0,0.24)]'
                    : 'relative aspect-[16/9] overflow-hidden rounded-[0.8rem] border border-white/10 bg-black/30 shadow-[0_12px_35px_rgba(0,0,0,0.24)]'
                }
              >
                <Image
                  src={system.previewImage}
                  alt={`${system.center} ${system.centerMeta}`}
                  fill
                  sizes={
                    system.previewType === 'mobile'
                      ? '80px'
                      : '(min-width: 1024px) 250px, 40vw'
                  }
                  className={
                    system.previewType === 'mobile'
                      ? 'object-cover object-top opacity-75 saturate-[0.75] transition-[opacity,filter,transform] duration-700 ease-out group-hover/product:scale-[1.025] group-hover/product:opacity-100 group-hover/product:saturate-100'
                      : 'object-cover object-top opacity-70 saturate-[0.7] transition-[opacity,filter,transform] duration-700 ease-out group-hover/product:scale-[1.025] group-hover/product:opacity-100 group-hover/product:saturate-100'
                  }
                />

                {/* keeps the screenshot inside the Works atmosphere */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1113]/35 via-transparent to-soft-violet/[0.04] transition-opacity duration-500 group-hover/product:opacity-40" />

                {/* subtle scan signal */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-soft-violet/60 to-transparent opacity-0 group-hover/product:opacity-100"
                    animate={{
                      top: ['15%', '85%', '15%'],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </div>

              {/* product context */}
              <div className="flex items-center justify-between gap-3 px-1.5 pb-0.5 pt-2.5">
                <p className="text-[6px] font-medium uppercase tracking-[0.17em] opacity-35">
                  {system.centerMeta}
                </p>

                <div className="flex items-center gap-1 text-[6px] font-semibold uppercase tracking-[0.14em] text-soft-violet/45 transition-colors duration-300 group-hover/product:text-soft-violet/80">
                  View
                  <ArrowUpRight
                    size={8}
                    className="transition-transform duration-300 group-hover/product:-translate-y-px group-hover/product:translate-x-px"
                  />
                </div>
              </div>
            </div>
          </motion.div>

            {/* node 01 */}

            {(() => {
              const node = system.nodes[0];
              const Icon = node.icon;

              return (
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -12,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.12,
                  }}
                  className="absolute left-[2%] top-[9%] z-10 [transform:translateZ(12px)]"
                >
                  <SystemNode
                    label={node.label}
                    value={node.value}
                    icon={Icon}
                  />
                </motion.div>
              );
            })()}

            {/* node 02 */}

            {(() => {
              const node = system.nodes[1];
              const Icon = node.icon;

              return (
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 12,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                  }}
                  className="absolute right-[2%] top-[9%] z-10 [transform:translateZ(12px)]"
                >
                  <SystemNode
                    label={node.label}
                    value={node.value}
                    icon={Icon}
                  />
                </motion.div>
              );
            })()}

            {/* node 03 */}

            {(() => {
              const node = system.nodes[2];
              const Icon = node.icon;

              return (
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 10,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.28,
                  }}
                  className="absolute bottom-[5%] left-[2%] z-10 [transform:translateZ(12px)]"
                >
                  <SystemNode
                    label={node.label}
                    value={node.value}
                    icon={Icon}
                  />
                </motion.div>
              );
            })()}

            {/* case-study hint */}

            <div className="absolute bottom-[4%] right-[2%] z-10 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] opacity-30 transition-opacity duration-300 group-hover:opacity-70">
              Explore system
              <ArrowUpRight size={11} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function SystemNode({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
}) {
  return (
    <div className="group/node min-w-[116px] rounded-[0.9rem] border border-current/10 bg-current/[0.025] px-3.5 py-3 backdrop-blur-sm transition duration-300 group-hover/node:border-soft-violet/30 group-hover/node:bg-soft-violet/[0.045]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[7px] uppercase tracking-[0.18em] opacity-30">
          {label}
        </span>

        <Icon
          size={12}
          className="opacity-30"
        />
      </div>

      <p className="mt-2 text-[11px] font-medium opacity-65">
        {value}
      </p>
    </div>
  );
}

function ProjectInformation({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const projectNumber = String(
    index + 1,
  ).padStart(2, '0');

  return (
    <div className="group/info relative lg:px-3 xl:px-8">
      {/* ======================================================== */}
      {/* VERY SOFT POINTER / HOVER ATMOSPHERE                     */}
      {/* ======================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 overflow-hidden"
      >
        <div className="absolute left-[18%] top-[22%] h-40 w-40 rounded-full bg-soft-violet/[0.00] blur-[70px] transition-all duration-700 ease-out group-hover/info:bg-soft-violet/[0.055]" />

        <div className="absolute bottom-[12%] right-[12%] h-32 w-32 rounded-full bg-cool-blue/[0.00] blur-[65px] transition-all duration-700 ease-out group-hover/info:bg-cool-blue/[0.035]" />
      </div>

      {/* ======================================================== */}
      {/* PROJECT IDENTITY                                         */}
      {/* ======================================================== */}

      <div className="flex items-center gap-3">
        <span className="relative text-[10px] font-semibold text-soft-violet transition-[filter,transform] duration-500 ease-out group-hover/info:translate-x-0.5 group-hover/info:drop-shadow-[0_0_7px_rgba(124,108,242,0.45)]">
          {projectNumber}
        </span>

        <span className="relative h-px w-8 overflow-hidden bg-current/15 transition-[width,background-color] duration-500 ease-out group-hover/info:w-11 group-hover/info:bg-soft-violet/25">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-soft-violet to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover/info:translate-x-[200%] group-hover/info:opacity-100"
          />
        </span>

        <span className="text-[9px] uppercase tracking-[0.18em] opacity-40 transition-[color,opacity,letter-spacing] duration-500 ease-out group-hover/info:text-[#a99cff] group-hover/info:opacity-70 group-hover/info:tracking-[0.2em]">
          {project.eyebrow}
        </span>
      </div>

      {/* ======================================================== */}
      {/* PROJECT TITLE                                            */}
      {/* ======================================================== */}

<div className="relative mt-5 w-fit">
  {/* permanent title atmosphere */}
  <span
    aria-hidden="true"
    className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 rounded-full bg-soft-violet/[0.07] blur-[28px] transition-[opacity,transform] duration-700 ease-out group-hover/info:scale-110 group-hover/info:opacity-100"
  />

  {/* subtle violet light behind the lower half of the title */}
  <span
    aria-hidden="true"
    className="pointer-events-none absolute bottom-[-4px] left-[5%] h-5 w-[72%] rounded-full bg-gradient-to-r from-soft-violet/[0.14] via-[#a99cff]/[0.10] to-cool-blue/[0.05] blur-xl transition-all duration-700 group-hover/info:w-[92%] group-hover/info:from-soft-violet/[0.22] group-hover/info:via-[#a99cff]/[0.16]"
  />

  <h3 className="relative font-serif text-[clamp(2.5rem,4vw,4.2rem)] leading-[0.95] tracking-[-0.04em] text-[#f8f6ff] drop-shadow-[0_0_18px_rgba(124,108,242,0.10)] transition-[transform,color,filter] duration-500 ease-out group-hover/info:-translate-y-[2px] group-hover/info:text-white group-hover/info:drop-shadow-[0_0_22px_rgba(124,108,242,0.20)]">
    {project.title}
  </h3>

  {/* persistent identity trace */}
  <span
    aria-hidden="true"
    className="absolute -bottom-2 left-0 h-px w-[42%] bg-gradient-to-r from-soft-violet/75 via-[#a99cff]/40 to-transparent transition-[width,opacity] duration-700 ease-out group-hover/info:w-[82%] group-hover/info:opacity-100"
  />

  {/* travelling highlight on hover */}
  <span
    aria-hidden="true"
    className="absolute -bottom-2 left-0 h-px w-12 -translate-x-full bg-gradient-to-r from-transparent via-[#d2ccff] to-transparent opacity-0 transition-[transform,opacity] duration-1000 ease-out group-hover/info:translate-x-[500%] group-hover/info:opacity-90"
  />
</div>

      {/* ======================================================== */}
      {/* SUMMARY                                                  */}
      {/* ======================================================== */}

      <p className="mt-5 max-w-xl text-sm leading-7 opacity-55 transition-[opacity,transform] duration-500 ease-out group-hover/info:translate-x-[2px] group-hover/info:opacity-70">
        {project.summary}
      </p>

      {/* ======================================================== */}
      {/* ROLE / STATUS                                            */}
      {/* ======================================================== */}

      <div className="relative mt-7 grid gap-5 border-y border-current/10 py-5 transition-[border-color] duration-500 group-hover/info:border-soft-violet/15 sm:grid-cols-2">
        {/* travelling system signal */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-px left-0 h-px w-14 -translate-x-full bg-gradient-to-r from-transparent via-soft-violet to-cool-blue opacity-0 shadow-[0_0_8px_rgba(124,108,242,0.25)] transition-[transform,opacity] duration-1000 ease-out group-hover/info:translate-x-[520%] group-hover/info:opacity-80"
        />

        <div className="group/meta">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-soft-violet/55 shadow-[0_0_5px_rgba(124,108,242,0.22)] transition-[background-color,box-shadow,transform] duration-500 group-hover/info:scale-125 group-hover/info:bg-soft-violet group-hover/info:shadow-[0_0_9px_rgba(124,108,242,0.65)]" />
                <p className="text-[8px] uppercase tracking-[0.18em] text-[#a99cff] opacity-50 transition-[color,opacity] duration-500 group-hover/info:text-[#c0b6ff] group-hover/info:opacity-80">
              My role
            </p>
          </div>

          <p className="mt-2 text-sm leading-6 opacity-75 transition-[opacity,transform] duration-500 ease-out group-hover/info:translate-x-1 group-hover/info:opacity-90">
            {project.role}
          </p>
        </div>

        <div className="group/meta">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cool-blue/55 shadow-[0_0_5px_rgba(109,158,232,0.20)] transition-[background-color,box-shadow,transform] duration-500 group-hover/info:scale-125 group-hover/info:bg-cool-blue group-hover/info:shadow-[0_0_9px_rgba(109,158,232,0.60)]" />

            <p className="text-[8px] uppercase tracking-[0.18em] text-[#a8c7f0] opacity-50 transition-[color,opacity] duration-500 group-hover/info:text-[#c2d9f6] group-hover/info:opacity-80">
              Status
            </p>
          </div>

          <p className="mt-2 text-sm opacity-75 transition-[opacity,transform] duration-500 ease-out group-hover/info:translate-x-1 group-hover/info:opacity-90">
            {project.status}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TECHNOLOGY SIGNALS                                       */}
      {/* ======================================================== */}

      {project.technologies.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies
            .slice(0, 5)
            .map((technology, technologyIndex) => (
<span
  key={technology}
  className="group/tech relative overflow-hidden rounded-full border border-soft-violet/[0.12] bg-soft-violet/[0.025] px-2.5 py-1 text-xs text-[#d8d5e6] opacity-60 transition-[opacity,color,border-color,background-color,transform,box-shadow] duration-500 ease-out hover:!-translate-y-0.5 hover:!border-soft-violet/40 hover:!bg-soft-violet/[0.10] hover:!text-[#e1dcff] hover:!opacity-100 hover:!shadow-[0_0_18px_rgba(124,108,242,0.13)] group-hover/info:border-soft-violet/[0.18] group-hover/info:bg-soft-violet/[0.04] group-hover/info:opacity-80"
  style={{
    transitionDelay: `${technologyIndex * 35}ms`,
  }}
>
                <span
                  aria-hidden="true"
                  className="mr-1.5 inline-block h-1 w-1 rounded-full bg-soft-violet/45 align-middle shadow-[0_0_4px_rgba(124,108,242,0.20)] transition-[background-color,box-shadow,transform] duration-500 group-hover/info:bg-soft-violet/75 group-hover/tech:!scale-125 group-hover/tech:!bg-cool-blue group-hover/tech:!shadow-[0_0_7px_rgba(109,158,232,0.50)]"
                  />

                {technology}
              </span>
            ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* PROJECT ACTION                                           */}
      {/* ======================================================== */}

      <Link
        href={`/projects/${project.slug}`}
        className="group/link relative mt-7 inline-flex items-center gap-3 py-2 text-sm font-semibold"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-x-4 -inset-y-2 -z-10 rounded-full bg-soft-violet/[0.08] opacity-0 blur-xl transition-opacity duration-500 group-hover/link:opacity-100"
        />

        <span className="relative flex h-1.5 w-1.5">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-soft-violet"
            initial={false}
            animate={{
              scale: [1, 2.4, 1],
              opacity: [0.65, 0, 0.65],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet shadow-[0_0_10px_rgba(124,108,242,0.6)]" />
        </span>

        <span className="relative transition-[transform,color] duration-500 ease-out group-hover/info:text-[#f8f6ff] group-hover/link:translate-x-1 group-hover/link:text-[#d2ccff]">
          View project

          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-soft-violet via-[#a99cff] to-cool-blue opacity-90 transition-transform duration-500 ease-out group-hover/link:scale-x-100"
          />
        </span>

        <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-current/10 transition-[border-color,background-color,box-shadow,transform] duration-500 group-hover/info:border-soft-violet/20 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 group-hover/link:border-soft-violet/40 group-hover/link:bg-soft-violet/[0.08] group-hover/link:shadow-[0_0_22px_rgba(124,108,242,0.16)]">
          <ArrowUpRight
            size={13}
            className="transition-transform duration-500 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </span>
      </Link>
    </div>
  );
}

function DesktopHorizontalProjects({
  featuredProjects,
}: {
  featuredProjects: Project[];
}) {
  const stageRef =
    useRef<HTMLDivElement>(null);

  const reduceMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll({
      target: stageRef,
      offset: [
        'start start',
        'end end',
      ],
    });

  const smoothProgress =
    useSpring(scrollYProgress, {
      stiffness: 72,
      damping: 26,
      mass: 0.72,
      restDelta: 0.0001,
    });

  /*
    Horizontal choreography — LOCKED.

    0.00 → 0.14  Eventure holds
    0.14 → 0.39  Eventure travels to EatMe
    0.39 → 0.48  EatMe holds
    0.48 → 0.73  EatMe travels to Library Hub
    0.73 → 1.00  Library Hub holds.
  */

  const x = useTransform(
    smoothProgress,
    [
      0,
      0.14,
      0.39,
      0.48,
      0.73,
      1,
    ],
    [
      '0vw',
      '0vw',
      '-78vw',
      '-78vw',
      '-140vw',
      '-140vw',
    ],
  );

  const controlsOpacity =
    useTransform(
      smoothProgress,
      [0.7, 0.76, 1],
      [0, 1, 1],
    );

  const controlsY = useTransform(
    smoothProgress,
    [0.7, 0.76, 1],
    [8, 0, 0],
  );

  return (
    <div
      ref={stageRef}
      className="relative hidden h-[175vh] lg:block"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden pt-[7vh]">
        <motion.div
          style={
            reduceMotion
              ? undefined
              : { x }
          }
          className="flex w-max will-change-transform"
        >
          {featuredProjects.map(
            (project, index) => (
              <article
                key={project.slug}
                className="w-[78vw] shrink-0 px-[3vw]"
              >
                <div className="grid min-h-[62vh] grid-cols-[1.08fr_0.92fr] items-center gap-8 border-r border-current/10 pr-[3vw]">
                  <ProjectVisual
                    project={project}
                    index={index}
                  />

                  <ProjectInformation
                    project={project}
                    index={index}
                  />
                </div>
              </article>
            ),
          )}
        </motion.div>

        {/* ENDING CONTROLS LIVE INSIDE THE STICKY STAGE */}

        <motion.div
          style={
            reduceMotion
              ? undefined
              : {
                  opacity:
                    controlsOpacity,
                  y: controlsY,
                }
          }
          className="absolute inset-x-0 bottom-[22vh] z-20"
        >
          <Container>
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs leading-6 opacity-35">
                Selected projects shown
                above. More work continues
                below.
              </p>

              <a
                href="#more-projects"
                className="inline-flex items-center gap-2 text-xs font-semibold opacity-65 transition-opacity hover:opacity-100"
              >
                Browse more projects

                <ArrowUpRight
                  size={13}
                />
              </a>
            </div>
          </Container>
        </motion.div>
      </div>
    </div>
  );
}

function MobileProjects({
  featuredProjects,
}: {
  featuredProjects: Project[];
}) {
  return (
    <div className="lg:hidden">
      {featuredProjects.map(
        (project, index) => (
          <article
            key={project.slug}
            className="grid gap-8 border-b border-current/10 py-14"
          >
            <ProjectVisual
              project={project}
              index={index}
            />

            <ProjectInformation
              project={project}
              index={index}
            />
          </article>
        ),
      )}

      <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 opacity-35">
          Selected projects shown above.
          More work continues below.
        </p>

        <a
          href="#more-projects"
          className="inline-flex items-center gap-2 text-xs font-semibold opacity-65 transition-opacity hover:opacity-100"
        >
          Browse more projects

          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}

export function FeaturedWork() {
  const featuredProjects =
    featuredProjectSlugs
      .map((slug) =>
        projects.find(
          (project) =>
            project.slug === slug,
        ),
      )
      .filter(
        (
          project,
        ): project is Project =>
          Boolean(project),
      );

  return (
    <section
      id="work"
      className="relative pt-16 sm:pt-20"
    >
      {/* ATMOSPHERIC BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
<div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-soft-violet/[0.11] blur-[145px]" />

<div className="absolute bottom-[8%] right-[-10%] h-[26rem] w-[26rem] rounded-full bg-soft-violet/[0.075] blur-[150px]" />

<div className="absolute left-[46%] top-[34%] h-72 w-72 rounded-full bg-cool-blue/[0.035] blur-[135px]" />
      </div>

      {/* SECTION INTRO */}

      <Container className="relative z-10">
        <div className="grid gap-8 border-b border-current/10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-soft-violet">
              Selected Work / 02
            </p>

            <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.045em]">
              Projects that show

              <span className="block opacity-40">
                how I actually build.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 opacity-50 lg:justify-self-end">
            A selection of projects that
            best represent how I approach
            implementation, product
            thinking, user experience, and
            technical decisions.
          </p>
        </div>
      </Container>

      <DesktopHorizontalProjects
        featuredProjects={
          featuredProjects
        }
      />

      <Container className="relative z-10">
        <MobileProjects
          featuredProjects={
            featuredProjects
          }
        />
      </Container>
    </section>
  );
}