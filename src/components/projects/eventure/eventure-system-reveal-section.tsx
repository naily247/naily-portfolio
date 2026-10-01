'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { Container } from '@/components/ui/container';

import { topologyNodes } from './eventure-data';

const DOMAIN_LABELS = [
  'Event state',
  'Marketplace',
  'Commercial',
  'Operations',
] as const;

const RELATIONSHIPS = [
  {
    label: 'Customer',
    eyebrow: 'Customer perspective',
    statement:
      'Planning and discovery become decisions that move into commercial and event state.',
    domains: [0, 1, 2],
    direction: {
      x: -4,
      y: -3,
      rotate: -0.65,
    },
  },
  {
    label: 'Vendor',
    eyebrow: 'Vendor perspective',
    statement:
      'Profiles and packages feed marketplace discovery, quotations and committed work.',
    domains: [1, 2],
    direction: {
      x: 4,
      y: -3,
      rotate: 0.65,
    },
  },
  {
    label: 'Guest',
    eyebrow: 'Guest perspective',
    statement:
      'Invitations expose a focused public experience and return RSVP state to the event.',
    domains: [0],
    direction: {
      x: -4,
      y: 3,
      rotate: 0.65,
    },
  },
  {
    label: 'Admin',
    eyebrow: 'Administrator perspective',
    statement:
      'Trust, payments, support and reporting expose the operational state of the platform.',
    domains: [2, 3],
    direction: {
      x: 4,
      y: 3,
      rotate: -0.65,
    },
  },
] as const;

const PATHS = [
  'M 245 128 C 355 145, 390 215, 500 270',
  'M 755 128 C 645 145, 610 215, 500 270',
  'M 245 414 C 350 392, 395 330, 500 270',
  'M 755 414 C 650 392, 605 330, 500 270',
] as const;

const DESKTOP_POSITIONS = [
  'lg:col-start-1 lg:row-start-1 lg:self-center',
  'lg:col-start-3 lg:row-start-1 lg:self-center',
  'lg:col-start-1 lg:row-start-2 lg:self-center',
  'lg:col-start-3 lg:row-start-2 lg:self-center',
] as const;

export function EventureSystemRevealSection() {
  const reduceMotion = useReducedMotion();

  const [activeNode, setActiveNode] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [userInteracting, setUserInteracting] =
    useState(false);

  const interactionTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeRelationship =
    RELATIONSHIPS[activeNode] ?? RELATIONSHIPS[0];

  const pauseForInteraction = useCallback(() => {
    setUserInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      setUserInteracting(false);
    }, 6500);
  }, []);

  const selectNode = useCallback(
    (index: number) => {
      setActiveNode(index);
      pauseForInteraction();
    },
    [pauseForInteraction],
  );

  useEffect(() => {
    if (
      reduceMotion ||
      !autoPlay ||
      userInteracting ||
      topologyNodes.length <= 1
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveNode(
        (current) =>
          (current + 1) % topologyNodes.length,
      );
    }, 3600);

    return () => window.clearInterval(interval);
  }, [
    autoPlay,
    reduceMotion,
    userInteracting,
  ]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="overflow-hidden bg-[#ebe6f7] py-14 sm:py-16 lg:py-20">
      <Container>
        {/* INTRO */}
        <div className="grid gap-7 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                07
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                System reveal
              </span>
            </div>

            <h2 className="mt-4 max-w-md font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              Pull back, and it becomes one system.
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Planning, marketplace activity, guest interactions
            and platform operations are different views of shared
            event and commercial relationships.
          </p>
        </div>

        {/* SYSTEM TOPOLOGY */}
        <motion.div
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
            amount: 0.18,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-9 overflow-hidden rounded-[1.7rem] border border-foreground/[0.09] bg-white/25"
        >
          {/* ATMOSPHERE */}
          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : {
                    backgroundPosition: [
                      '48% 48%',
                      '52% 51%',
                      '48% 48%',
                    ],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(111,93,244,.085),transparent_31%),radial-gradient(circle_at_72%_68%,rgba(109,158,232,.05),transparent_27%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:54px_54px] text-foreground/[0.018]"
          />

          {/* SYSTEM BAR */}
          <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 border-b border-foreground/[0.08] px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.45, 1, 0.45],
                        scale: [1, 1.3, 1],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#6f5df4] shadow-[0_0_12px_rgba(111,93,244,.45)]"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
                Eventure / Shared product system
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
                  {activeRelationship.label}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#6f5df4]/40" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
                  Active relationship
                </span>
              </div>

              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => {
                    setAutoPlay((current) => !current);
                    pauseForInteraction();
                  }}
                  className="rounded-full border border-foreground/[0.09] bg-white/25 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50 transition hover:border-[#6f5df4]/25 hover:text-[#6f5df4]"
                >
                  {autoPlay
                    ? 'Pause motion'
                    : 'Resume motion'}
                </button>
              )}
            </div>
          </div>

          {/* TOPOLOGY */}
          <div className="relative z-10 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
            <div className="relative mx-auto max-w-[1040px]">
              {/* DESKTOP CONNECTION FIELD */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden lg:block"
              >
                <svg
                  viewBox="0 0 1000 540"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="eventure-system-inactive"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="rgba(109,158,232,.07)"
                      />

                      <stop
                        offset="50%"
                        stopColor="rgba(111,93,244,.13)"
                      />

                      <stop
                        offset="100%"
                        stopColor="rgba(111,93,244,.05)"
                      />
                    </linearGradient>

                    <linearGradient
                      id="eventure-system-active"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="rgba(109,158,232,.38)"
                      />

                      <stop
                        offset="50%"
                        stopColor="rgba(111,93,244,.95)"
                      />

                      <stop
                        offset="100%"
                        stopColor="rgba(111,93,244,.38)"
                      />
                    </linearGradient>

                    <filter
                      id="eventure-active-glow"
                      x="-300%"
                      y="-300%"
                      width="600%"
                      height="600%"
                    >
                      <feGaussianBlur
                        stdDeviation="4"
                        result="blur"
                      />

                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {PATHS.map((path, index) => {
                    const isActive =
                      activeNode === index;

                    return (
                      <motion.path
                        key={path}
                        id={`eventure-system-path-${index}`}
                        d={path}
                        fill="none"
                        animate={{
                          opacity: isActive
                            ? 1
                            : 0.32,
                          strokeWidth: isActive
                            ? 2
                            : 1,
                        }}
                        stroke={
                          isActive
                            ? 'url(#eventure-system-active)'
                            : 'url(#eventure-system-inactive)'
                        }
                        transition={{
                          duration: reduceMotion
                            ? 0
                            : 0.45,
                          ease: 'easeOut',
                        }}
                      />
                    );
                  })}

                  {!reduceMotion && (
                    <>
                      <motion.circle
                        key={`signal-${activeNode}`}
                        r="4"
                        fill="#6f5df4"
                        filter="url(#eventure-active-glow)"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 2.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <animateMotion
                          dur="2.1s"
                          repeatCount="indefinite"
                        >
                          <mpath
                            href={`#eventure-system-path-${activeNode}`}
                          />
                        </animateMotion>
                      </motion.circle>

                      <motion.circle
                        key={`signal-trail-${activeNode}`}
                        r="2"
                        fill="#6d9ee8"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: [0, 0.65, 0.65, 0],
                        }}
                        transition={{
                          duration: 2.1,
                          delay: 0.18,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <animateMotion
                          dur="2.1s"
                          begin="0.18s"
                          repeatCount="indefinite"
                        >
                          <mpath
                            href={`#eventure-system-path-${activeNode}`}
                          />
                        </animateMotion>
                      </motion.circle>
                    </>
                  )}
                </svg>
              </div>

              {/* MOBILE CONNECTION SPINE */}
              <div
                aria-hidden="true"
                className="absolute bottom-[12%] left-[23px] top-[12%] w-px bg-gradient-to-b from-[#6d9ee8]/10 via-[#6f5df4]/30 to-[#6d9ee8]/10 lg:hidden"
              />

              {/* NODE GRID */}
              <div className="relative grid gap-3 lg:min-h-[540px] lg:grid-cols-[0.82fr_1.18fr_0.82fr] lg:grid-rows-2 lg:gap-x-16 lg:gap-y-20">
                {topologyNodes.map((node, index) => {
                  const Icon = node.icon;
                  const isActive =
                    activeNode === index;

                  return (
                    <motion.button
                      type="button"
                      key={node.label}
                      onClick={() =>
                        selectNode(index)
                      }
                      onMouseEnter={() => {
                        setActiveNode(index);
                        pauseForInteraction();
                      }}
                      onFocus={() =>
                        selectNode(index)
                      }
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 12,
                              scale: 0.97,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}
                      animate={{
                        opacity: isActive
                          ? 1
                          : 0.68,
                        scale: isActive
                          ? 1.025
                          : 0.985,
                      }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -3,
                            }
                      }
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.38,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`group relative z-10 ml-10 overflow-hidden rounded-[1.15rem] border p-4 text-left shadow-[0_12px_35px_rgba(66,51,105,0.035)] outline-none transition-[border-color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#6f5df4]/35 lg:ml-0 ${
                        isActive
                          ? 'border-[#6f5df4]/30 bg-white/70 shadow-[0_18px_50px_rgba(83,64,142,0.09)]'
                          : 'border-foreground/[0.08] bg-[#f4f0fa]/60 hover:border-[#6f5df4]/20 hover:bg-white/50'
                      } ${
                        DESKTOP_POSITIONS[index] ??
                        ''
                      }`}
                    >
                      <motion.div
                        aria-hidden="true"
                        animate={{
                          opacity: isActive
                            ? 1
                            : 0,
                        }}
                        className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-[#6f5df4]/15 via-[#6f5df4]/80 to-[#6d9ee8]/15"
                      />

                      <motion.div
                        aria-hidden="true"
                        animate={{
                          opacity: isActive
                            ? 1
                            : 0,
                          scale: isActive
                            ? 1
                            : 0.8,
                        }}
                        transition={{
                          duration: 0.4,
                        }}
                        className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#6f5df4]/[0.055] blur-2xl"
                      />

                      <div className="relative flex items-start gap-3">
                        <motion.div
                          animate={{
                            scale: isActive
                              ? 1.08
                              : 1,
                            backgroundColor: isActive
                              ? 'rgba(111,93,244,.11)'
                              : 'rgba(111,93,244,.055)',
                          }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#6f5df4]/15 text-[#6f5df4]"
                        >
                          <Icon size={15} />
                        </motion.div>

                        <div className="min-w-0">
                          <span
                            className={`text-[7px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                              isActive
                                ? 'text-[#6f5df4]/70'
                                : 'text-muted-foreground/35'
                            }`}
                          >
                            Perspective{' '}
                            {String(
                              index + 1,
                            ).padStart(2, '0')}
                          </span>

                          <h3 className="mt-1.5 font-serif text-xl tracking-[-0.025em] text-foreground">
                            {node.label}
                          </h3>
                        </div>
                      </div>

                      <p className="relative mt-4 text-[11px] leading-[1.7] text-muted-foreground">
                        {node.detail}
                      </p>

                      <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-foreground/[0.07] pt-3">
                        <div className="flex items-center gap-2">
                          <motion.span
                            animate={{
                              scale: isActive
                                ? [1, 1.45, 1]
                                : 1,
                              opacity: isActive
                                ? [0.6, 1, 0.6]
                                : 0.35,
                            }}
                            transition={
                              isActive &&
                              !reduceMotion
                                ? {
                                    duration: 1.8,
                                    repeat: Infinity,
                                  }
                                : {
                                    duration: 0.25,
                                  }
                            }
                            className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]"
                          />

                          <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/35">
                            Shared system state
                          </span>
                        </div>

                        {isActive && (
                          <motion.span
                            initial={{
                              opacity: 0,
                              x: -4,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            className="text-[7px] font-semibold uppercase tracking-[0.15em] text-[#6f5df4]/65"
                          >
                            Active
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}

                {/* EVENTURE CORE */}
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.92,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.72,
                    delay: reduceMotion
                      ? 0
                      : 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-20 order-first mb-3 ml-10 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:ml-0 lg:self-center"
                >
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            x: activeRelationship
                              .direction.x,
                            y: activeRelationship
                              .direction.y,
                            rotate:
                              activeRelationship
                                .direction.rotate,
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 110,
                      damping: 18,
                      mass: 0.8,
                    }}
                    className="relative overflow-hidden rounded-[1.45rem] border border-[#6f5df4]/20 bg-[#f4f0fa] p-6 shadow-[0_24px_70px_rgba(74,57,120,0.09)] lg:p-7"
                  >
                    {/* DIRECTIONAL ENERGY */}
                    <motion.div
                      key={`energy-${activeNode}`}
                      aria-hidden="true"
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: [
                          0,
                          0.85,
                          0.42,
                        ],
                        scale: [
                          0.7,
                          1.05,
                          1,
                        ],
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.9,
                        ease: 'easeOut',
                      }}
                      className={`pointer-events-none absolute h-56 w-56 rounded-full blur-3xl ${
                        activeNode === 0
                          ? '-left-24 -top-20 bg-[#6f5df4]/10'
                          : activeNode === 1
                            ? '-right-24 -top-20 bg-[#6d9ee8]/10'
                            : activeNode === 2
                              ? '-bottom-24 -left-24 bg-[#6d9ee8]/10'
                              : '-bottom-24 -right-24 bg-[#6f5df4]/10'
                      }`}
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(111,93,244,.10),transparent_50%)]"
                    />

                    <div className="relative text-center">
                      <motion.div
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                boxShadow: [
                                  '0 8px 30px rgba(111,93,244,.06)',
                                  '0 8px 34px rgba(111,93,244,.14)',
                                  '0 8px 30px rgba(111,93,244,.06)',
                                ],
                              }
                        }
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="mx-auto flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#6f5df4]/20 bg-white/55"
                      >
                        <span className="relative flex h-3 w-3 items-center justify-center">
                          {!reduceMotion && (
                            <motion.span
                              aria-hidden="true"
                              animate={{
                                scale: [
                                  1,
                                  2.15,
                                  1,
                                ],
                                opacity: [
                                  0.25,
                                  0,
                                  0.25,
                                ],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="absolute h-3 w-3 rounded-full border border-[#6f5df4]/50"
                            />
                          )}

                          <span className="relative h-2 w-2 rounded-full bg-[#6f5df4]" />
                        </span>
                      </motion.div>

                      <p className="mt-5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
                        Product system
                      </p>

                      <h3 className="mt-3 font-serif text-3xl tracking-[-0.045em] text-foreground sm:text-4xl">
                        Eventure
                      </h3>

                      <motion.div
                        key={`relationship-copy-${activeNode}`}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 5,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.35,
                        }}
                        className="mx-auto mt-3 min-h-[74px] max-w-[270px]"
                      >
                        <p className="text-[7px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]/65">
                          {
                            activeRelationship.eyebrow
                          }
                        </p>

                        <p className="mt-2 text-[11px] leading-[1.65] text-muted-foreground">
                          {
                            activeRelationship.statement
                          }
                        </p>
                      </motion.div>

                      {/* SYSTEM DOMAINS */}
                      <div className="mx-auto mt-5 grid max-w-[270px] grid-cols-2 gap-2">
                        {DOMAIN_LABELS.map(
                          (label, index) => {
                            const isDomainActive =
                              activeRelationship.domains.includes(
                                index as never,
                              );

                            return (
                              <motion.div
                                key={label}
                                animate={{
                                  opacity:
                                    isDomainActive
                                      ? 1
                                      : 0.38,
                                  scale:
                                    isDomainActive
                                      ? 1
                                      : 0.97,
                                  backgroundColor:
                                    isDomainActive
                                      ? 'rgba(255,255,255,.70)'
                                      : 'rgba(255,255,255,.24)',
                                  borderColor:
                                    isDomainActive
                                      ? 'rgba(111,93,244,.20)'
                                      : 'rgba(24,24,27,.06)',
                                }}
                                transition={{
                                  duration:
                                    reduceMotion
                                      ? 0
                                      : 0.35,
                                }}
                                className="relative overflow-hidden rounded-full border px-3 py-2 text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground"
                              >
                                {isDomainActive &&
                                  !reduceMotion && (
                                    <motion.span
                                      aria-hidden="true"
                                      initial={{
                                        x: '-130%',
                                      }}
                                      animate={{
                                        x: '230%',
                                      }}
                                      transition={{
                                        duration: 1.4,
                                        ease: 'easeInOut',
                                      }}
                                      className="absolute inset-y-0 w-8 -skew-x-12 bg-gradient-to-r from-transparent via-[#6f5df4]/10 to-transparent"
                                    />
                                  )}

                                <span className="relative">
                                  {label}
                                </span>
                              </motion.div>
                            );
                          },
                        )}
                      </div>

                      <div className="mt-6 border-t border-foreground/[0.08] pt-4">
                        <div className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={
                              reduceMotion
                                ? undefined
                                : {
                                    opacity: [
                                      0.4,
                                      1,
                                      0.4,
                                    ],
                                    scale: [
                                      1,
                                      1.3,
                                      1,
                                    ],
                                  }
                            }
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                            }}
                            className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8]"
                          />

                          <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/35">
                            {
                              activeRelationship.label
                            }{' '}
                            ↔ Eventure
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ACTIVE RELATIONSHIP RAIL */}
          <div className="relative z-30 border-t border-foreground/[0.08] px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-[7px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/35">
                  Active relationship
                </p>

                <motion.p
                  key={`footer-${activeNode}`}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 3,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-1.5 text-[11px] text-foreground/65"
                >
                  {activeRelationship.label} ↔
                  Eventure
                </motion.p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {topologyNodes.map(
                  (node, index) => {
                    const isActive =
                      activeNode === index;

                    return (
                      <button
                        type="button"
                        key={node.label}
                        onClick={() =>
                          selectNode(index)
                        }
                        className={`rounded-full border px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.14em] transition ${
                          isActive
                            ? 'border-[#6f5df4]/25 bg-[#6f5df4]/[0.07] text-[#6f5df4]'
                            : 'border-foreground/[0.07] bg-white/20 text-muted-foreground/35 hover:border-[#6f5df4]/20 hover:text-foreground/55'
                        }`}
                      >
                        {node.label}
                      </button>
                    );
                  },
                )}

                <span className="mx-1 hidden h-4 w-px bg-foreground/[0.08] sm:block" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
                  {userInteracting
                    ? 'Manual control'
                    : autoPlay
                      ? 'Auto scanning'
                      : 'Motion paused'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TRANSITION INTO ENGINEERING */}
        <div className="mx-auto mt-7 flex max-w-xl items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground/[0.09]" />

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]/60" />

            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/35">
              Interface → system → engineering
            </span>
          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-foreground/[0.09] to-transparent" />
        </div>
      </Container>
    </section>
  );
}