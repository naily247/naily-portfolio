'use client';

import {
  useMemo,
  useState,
  type CSSProperties,
  type ElementType,
} from 'react';
import { motion } from 'motion/react';
import {
  Braces,
  Boxes,
  Code2,
  Database,
  FileCode2,
  FlaskConical,
  Layers3,
  Network,
  Package,
  ServerCog,
  Smartphone,
  TerminalSquare,
  Wrench,
} from 'lucide-react';
import {
  SiAndroid,
  SiAxios,
  SiBootstrap,
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiPhp,
  SiPostman,
  SiRabbitmq,
  SiReact,
} from 'react-icons/si';

import {
  toolkitSecondaryGroups,
} from './toolkit.data';
import { ToolkitIndexField } from './ToolkitIndexField';

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

type BrandIcon = ElementType<{
  className?: string;
  style?: CSSProperties;
}>;

type TechnologyVisual = {
  icon: BrandIcon;
  color: string;
  softColor: string;
  label?: string;
};

/* -------------------------------------------------------------------------- */
/*                         TECHNOLOGY VISUAL MAP                              */
/* -------------------------------------------------------------------------- */

const fallbackVisual: TechnologyVisual = {
  icon: Code2,
  color: '#7568d8',
  softColor:
    'rgba(117, 104, 216, 0.12)',
};

const technologyVisuals: Record<
  string,
  TechnologyVisual
> = {
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

  Mongoose: {
    icon: SiMongodb,
    color: '#47A248',
    softColor:
      'rgba(71, 162, 72, 0.11)',
  },

  Bootstrap: {
    icon: SiBootstrap,
    color: '#7952B3',
    softColor:
      'rgba(121, 82, 179, 0.11)',
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

  'React Hook Form': {
    icon: SiReact,
    color: '#EC5990',
    softColor:
      'rgba(236, 89, 144, 0.10)',
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

  Postman: {
    icon: SiPostman,
    color: '#FF6C37',
    softColor:
      'rgba(255, 108, 55, 0.11)',
  },

  Git: {
    icon: SiGit,
    color: '#F05032',
    softColor:
      'rgba(240, 80, 50, 0.10)',
  },

  GitHub: {
    icon: SiGithub,
    color: '#181717',
    softColor:
      'rgba(24, 23, 23, 0.075)',
  },

  Docker: {
    icon: SiDocker,
    color: '#2496ED',
    softColor:
      'rgba(36, 150, 237, 0.10)',
  },
};

/* -------------------------------------------------------------------------- */
/*                         CATEGORY FALLBACK ICONS                            */
/* -------------------------------------------------------------------------- */

const categoryIcons = [
  TerminalSquare,
  Package,
  Boxes,
  FlaskConical,
];

/* -------------------------------------------------------------------------- */
/*                           TECHNOLOGY CELL                                  */
/* -------------------------------------------------------------------------- */

function TechnologyCell({
  technology,
  index,
}: {
  technology: string;
  index: number;
}) {
  const visual =
    technologyVisuals[
      technology
    ] ?? fallbackVisual;

  const Icon = visual.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        duration: 0.42,
        delay:
          Math.min(
            index * 0.025,
            0.18,
          ),
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      whileHover={{
        y: -2,
      }}
      className="group/tool relative min-w-0 overflow-hidden rounded-xl border border-soft-violet/[0.11] bg-white/[0.24] px-3 py-3 backdrop-blur-[3px] transition-[border-color,background-color,box-shadow] duration-300 hover:border-soft-violet/30 hover:bg-white/[0.40] hover:shadow-[0_10px_30px_rgba(95,78,177,0.07)]"
    >
      {/* brand-colour wash */}
      <span
        aria-hidden="true"
        style={{
          background:
            visual.softColor,
        }}
        className="pointer-events-none absolute -left-8 -top-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-400 group-hover/tool:opacity-100"
      />

      {/* violet system line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-soft-violet/65 via-soft-violet/25 to-transparent transition-transform duration-500 ease-out group-hover/tool:scale-x-100"
      />

      <div className="relative flex items-center gap-3">
        <div
          style={{
            background:
              visual.softColor,
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.035] transition-transform duration-300 group-hover/tool:scale-[1.06]"
        >
          <Icon
            className="h-[18px] w-[18px]"
            style={{
              color:
                visual.color,
            }}
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold tracking-[-0.01em] text-foreground/72 transition-colors duration-300 group-hover/tool:text-foreground">
            {technology}
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-soft-violet/35 transition-[background-color,box-shadow] duration-300 group-hover/tool:bg-soft-violet group-hover/tool:shadow-[0_0_6px_rgba(124,108,242,0.45)]" />

            <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-muted-foreground/28 transition-colors duration-300 group-hover/tool:text-soft-violet/55">
              capability
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               TOOLKIT INDEX                                */
/* -------------------------------------------------------------------------- */

export function ToolkitIndex() {
  const [activeGroup, setActiveGroup] =
    useState<number | null>(
      null,
    );

  const totalSignals = useMemo(
    () =>
      toolkitSecondaryGroups.reduce(
        (total, group) =>
          total +
          group.technologies
            .length,
        0,
      ),
    [],
  );

  return (
    <div className="relative">
      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div className="flex flex-col gap-5 border-b border-soft-violet/[0.13] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 scale-[2] rounded-full bg-soft-violet/[0.10]" />

              <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet/70 shadow-[0_0_7px_rgba(124,108,242,0.30)]" />
            </span>

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-soft-violet">
              Extended toolkit
            </p>

            <span className="h-px w-7 bg-gradient-to-r from-soft-violet/45 to-transparent" />
          </div>

          <h3 className="mt-3 font-serif text-[1.8rem] tracking-[-0.04em] text-foreground sm:text-[2rem]">
            Broader technical
            exposure.
          </h3>
        </div>

        <div className="max-w-md sm:text-right">
          <p className="text-xs leading-6 text-muted-foreground">
            Languages, libraries,
            platforms, infrastructure,
            and development tools across
            the wider engineering
            workflow.
          </p>

          <div className="mt-2 flex items-center gap-2 sm:justify-end">
            <span className="h-1 w-1 rounded-full bg-soft-violet/45" />

            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/35">
              {totalSignals}{' '}
              capabilities indexed
            </span>
          </div>
        </div>
      </div>

    {/* ====================================================== */}
    {/* FULL-WIDTH CAPABILITY FIELD                            */}
    {/* ====================================================== */}

    <div className="relative mt-7 overflow-hidden border-y border-soft-violet/[0.12]">
      {/* Three.js substrate now belongs directly to the page field */}
      <ToolkitIndexField
        activeGroup={activeGroup}
      />

      {/* atmosphere above canvas, below content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* restrained depth — no enclosing card */}
        <div className="absolute left-[4%] top-[8%] h-64 w-80 rounded-full bg-soft-violet/[0.035] blur-[115px]" />

        <div className="absolute bottom-[5%] right-[5%] h-64 w-80 rounded-full bg-cool-blue/[0.022] blur-[120px]" />

        {/* horizontal system trace across the entire capability field */}
        <div className="absolute left-1/2 top-1/2 h-px w-[92%] -translate-x-1/2 bg-gradient-to-r from-transparent via-soft-violet/[0.10] to-transparent" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2">
          {toolkitSecondaryGroups.map(
            (
              group,
              groupIndex,
            ) => {
              const CategoryIcon =
                categoryIcons[
                  groupIndex
                ] ?? Code2;

              const isActive =
                activeGroup ===
                groupIndex;

              const anotherActive =
                activeGroup !==
                  null &&
                !isActive;

              return (
                <motion.section
                  key={group.id}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.18,
                  }}
                  transition={{
                    duration: 0.58,
                    delay:
                      groupIndex *
                      0.055,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  onMouseEnter={() =>
                    setActiveGroup(
                      groupIndex,
                    )
                  }
                  onMouseLeave={() =>
                    setActiveGroup(
                      null,
                    )
                  }
                className={[
                  'group/index relative min-w-0 px-3 py-7 transition-[background-color,opacity] duration-500 sm:px-5 sm:py-8 lg:px-8 lg:py-9 xl:px-10',
                  groupIndex % 2 === 1
                    ? 'lg:border-l lg:border-soft-violet/[0.10]'
                    : '',
                  groupIndex >= 2
                    ? 'border-t border-soft-violet/[0.10]'
                    : groupIndex === 1
                      ? 'border-t border-soft-violet/[0.10] lg:border-t-0'
                      : '',
                  isActive
                    ? 'bg-white/[0.20]'
                    : '',
                  anotherActive
                    ? 'opacity-[0.78]'
                    : 'opacity-100',
                ].join(' ')}
                >
                  {/* active category atmosphere */}
                  <span
                    aria-hidden="true"
                    className={[
                      'pointer-events-none absolute inset-0 bg-gradient-to-br from-soft-violet/[0.055] via-transparent to-cool-blue/[0.025] transition-opacity duration-500',
                      isActive
                        ? 'opacity-100'
                        : 'opacity-0',
                    ].join(' ')}
                  />

                  {/* active rail */}
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute left-0 top-7 h-12 w-px bg-gradient-to-b from-soft-violet/80 via-soft-violet/35 to-transparent transition-[opacity,height] duration-500',
                      isActive
                        ? 'h-20 opacity-100'
                        : 'opacity-0',
                    ].join(' ')}
                  />

                  <div className="relative">
                    {/* category header */}
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-soft-violet/[0.12] bg-soft-violet/[0.045] text-soft-violet/55 transition-[border-color,background-color,color,transform,box-shadow] duration-400 group-hover/index:-translate-y-px group-hover/index:border-soft-violet/28 group-hover/index:bg-soft-violet/[0.075] group-hover/index:text-soft-violet group-hover/index:shadow-[0_8px_24px_rgba(124,108,242,0.08)]">
                          <CategoryIcon
                            size={16}
                            strokeWidth={
                              1.45
                            }
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[8px] font-semibold text-soft-violet/45">
                              {String(
                                groupIndex +
                                  1,
                              ).padStart(
                                2,
                                '0',
                              )}
                            </span>

                            <span className="h-px w-5 bg-soft-violet/18" />
                          </div>

                          <h4 className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-foreground/62 transition-colors duration-400 group-hover/index:text-soft-violet">
                            {
                              group.label
                            }
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            'h-1.5 w-1.5 rounded-full transition-[background-color,box-shadow,transform] duration-400',
                            isActive
                              ? 'scale-110 bg-soft-violet shadow-[0_0_9px_rgba(124,108,242,0.55)]'
                              : 'bg-soft-violet/25',
                          ].join(
                            ' ',
                          )}
                        />

                        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30">
                          {String(
                            group
                              .technologies
                              .length,
                          ).padStart(
                            2,
                            '0',
                          )}{' '}
                          nodes
                        </span>
                      </div>
                    </div>

                    {/* technology grid */}
                    <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {group.technologies.map(
                        (
                          technology,
                          technologyIndex,
                        ) => (
                          <TechnologyCell
                            key={
                              technology
                            }
                            technology={
                              technology
                            }
                            index={
                              technologyIndex
                            }
                          />
                        ),
                      )}
                    </div>

                    {/* category footer */}
                    <div className="mt-5 flex items-center gap-2">
                      <span
                        className={[
                          'h-px transition-[width,background-color] duration-500',
                          isActive
                            ? 'w-12 bg-soft-violet/45'
                            : 'w-7 bg-soft-violet/16',
                        ].join(
                          ' ',
                        )}
                      />

                      <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-muted-foreground/25">
                        capability cluster
                      </span>
                    </div>
                  </div>
                </motion.section>
              );
            },
          )}
        </div>

      {/* system footer */}
      <div className="relative z-10 flex flex-col gap-3 border-t border-soft-violet/[0.10] px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-8 xl:px-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 scale-[2.4] rounded-full bg-soft-violet/[0.07]" />

            <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet/55" />
          </span>

          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/32">
            Hover a cluster to wake the underlying system
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/28">
          <span>DOM / identity</span>

          <span className="h-3 w-px bg-soft-violet/12" />

          <span>THREE / signal field</span>
        </div>
      </div>
      </div>
    </div>
  );
}