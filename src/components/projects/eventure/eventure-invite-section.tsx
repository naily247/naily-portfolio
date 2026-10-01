'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { Container } from '@/components/ui/container';

import { inviteSteps } from './eventure-data';

type RelayState = {
  id: string;
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  direction: 'outbound' | 'return';
  actor: 'planner' | 'bridge' | 'guest';
};

const PUBLIC_RSVP_IMAGE =
  '/images/projects/eventure/invite/public-invitation-rsvp.png';

export function EventureInviteSection() {
  const reduceMotion = useReducedMotion();

  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [userInteracting, setUserInteracting] = useState(false);

  const interactionTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const relayStates = useMemo<RelayState[]>(() => {
    const plannerStates: RelayState[] = inviteSteps.map(
      (step, index) => ({
        id: `planner-${index}`,
        number: String(index + 1).padStart(2, '0'),
        label:
          index === 0
            ? 'Guests'
            : index === 1
              ? 'Create'
              : 'Prepare',
        eyebrow: step.eyebrow,
        title: step.title,
        description: step.description,
        image: step.image,
        alt: step.alt,
        direction: 'outbound',
        actor:
          index === 0
            ? 'planner'
            : 'bridge',
      }),
    );

    return [
      ...plannerStates,
      {
        id: 'public-rsvp',
        number: String(plannerStates.length + 1).padStart(2, '0'),
        label: 'Respond',
        eyebrow: 'Guest experience',
        title: 'The invitation reaches the attendee.',
        description:
          'The guest sees only the event information and RSVP controls they need. Their response then returns to the planner workflow.',
        image: PUBLIC_RSVP_IMAGE,
        alt: 'Public Eventure wedding invitation and RSVP experience',
        direction: 'return',
        actor: 'guest',
      },
    ];
  }, []);

  const activeState =
    relayStates[activeStep] ?? relayStates[0];

  const pauseForInteraction = () => {
    setUserInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      setUserInteracting(false);
    }, 6500);
  };

  const selectStep = (index: number) => {
    setActiveStep(index);
    pauseForInteraction();
  };

  useEffect(() => {
    if (
      reduceMotion ||
      !autoPlay ||
      userInteracting ||
      relayStates.length <= 1
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStep(
        (current) =>
          (current + 1) % relayStates.length,
      );
    }, 4200);

    return () => window.clearInterval(interval);
  }, [
    autoPlay,
    reduceMotion,
    relayStates.length,
    userInteracting,
  ]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const progress =
    relayStates.length > 1
      ? activeStep / (relayStates.length - 1)
      : 0;

  const outbound =
    activeState.direction === 'outbound';

  return (
    <section className="bg-[#ebe6f7] py-12 sm:py-14">
      <Container>
        {/* CHAPTER INTRO */}
        <div className="grid gap-7 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                05
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Invite
              </span>
            </div>

            <h3 className="mt-4 max-w-sm font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              The event expands beyond the planner.
            </h3>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Guest information moves through the planner&apos;s
            workflow before Eventure exposes a focused public RSVP
            experience to the attendee.
          </p>
        </div>

        {/* INVITATION RELAY */}
        <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-foreground/[0.09] bg-white/28">
          {/* SYSTEM BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/[0.08] px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/15" />
                <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
              </span>

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/55">
                Invitation relay
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/35 sm:inline">
                Planner → Guest → Planner
              </span>

              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => {
                    setAutoPlay(
                      (current) => !current,
                    );
                    pauseForInteraction();
                  }}
                  className="rounded-full border border-foreground/[0.09] bg-white/25 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/55 transition hover:border-[#6f5df4]/25 hover:text-[#6f5df4]"
                >
                  {autoPlay
                    ? 'Pause motion'
                    : 'Resume motion'}
                </button>
              )}
            </div>
          </div>

          {/* RELAY NAVIGATION */}
          <div className="relative border-b border-foreground/[0.08] px-4 py-4 sm:px-6">
            <div
              aria-hidden="true"
              className="absolute left-8 right-8 top-[31px] hidden h-px bg-foreground/[0.08] sm:block"
            />

            <div
              aria-hidden="true"
              className="absolute left-8 top-[31px] hidden h-px bg-gradient-to-r from-[#6d9ee8] to-[#6f5df4] transition-[width] duration-700 ease-out sm:block"
              style={{
                width: `calc((100% - 4rem) * ${progress})`,
              }}
            />

            <div
              className="relative grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${relayStates.length}, minmax(0, 1fr))`,
              }}
            >
              {relayStates.map(
                (state, index) => {
                  const active =
                    activeStep === index;
                  const complete =
                    index < activeStep;

                  return (
                    <button
                      key={state.id}
                      type="button"
                      onClick={() =>
                        selectStep(index)
                      }
                      aria-pressed={active}
                      className="group flex min-w-0 flex-col items-center text-center"
                    >
                      <span
                        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[8px] font-semibold transition duration-300 ${
                          active
                            ? 'scale-105 border-[#6f5df4]/35 bg-[#6f5df4] text-white shadow-[0_0_0_5px_rgba(111,93,244,0.07)]'
                            : complete
                              ? 'border-[#6f5df4]/20 bg-[#eee9fb] text-[#6f5df4]'
                              : 'border-foreground/[0.09] bg-[#f0ecf8] text-muted-foreground/35 group-hover:border-[#6f5df4]/20'
                        }`}
                      >
                        {complete ? (
                          <Check size={11} />
                        ) : (
                          state.number
                        )}
                      </span>

                      <span
                        className={`mt-2 truncate text-[8px] font-semibold uppercase tracking-[0.15em] transition ${
                          active
                            ? 'text-[#6f5df4]'
                            : 'text-muted-foreground/40'
                        }`}
                      >
                        {state.label}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* RELAY BODY */}
          <div className="grid lg:grid-cols-[0.31fr_0.69fr]">
            {/* STATE COPY */}
            <div className="flex min-h-[340px] flex-col justify-between border-b border-foreground/[0.08] p-5 sm:p-6 lg:min-h-[460px] lg:border-b-0 lg:border-r">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`invite-copy-${activeStep}`}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: -5,
                        }
                  }
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.3,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                      {activeState.eyebrow}
                    </span>
                  </div>

                  <h4 className="mt-4 max-w-xs font-serif text-2xl tracking-[-0.035em] text-foreground sm:text-[1.7rem] sm:leading-[1.12]">
                    {activeState.title}
                  </h4>

                  <p className="mt-4 max-w-xs text-[12px] leading-[1.75] text-muted-foreground sm:text-[13px]">
                    {activeState.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* ROLE SIGNAL */}
              <div className="mt-8">
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/35">
                  Current boundary
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] transition ${
                      activeState.actor ===
                      'planner'
                        ? 'border-[#6f5df4]/25 bg-[#6f5df4]/[0.07] text-[#6f5df4]'
                        : 'border-foreground/[0.08] text-muted-foreground/35'
                    }`}
                  >
                    Planner
                  </span>

                  <ArrowRight
                    size={10}
                    className="text-foreground/15"
                  />

                  <span
                    className={`rounded-full border px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] transition ${
                      activeState.actor ===
                      'bridge'
                        ? 'border-[#6f5df4]/25 bg-[#6f5df4]/[0.07] text-[#6f5df4]'
                        : 'border-foreground/[0.08] text-muted-foreground/35'
                    }`}
                  >
                    Invitation
                  </span>

                  <ArrowRight
                    size={10}
                    className="text-foreground/15"
                  />

                  <span
                    className={`rounded-full border px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] transition ${
                      activeState.actor ===
                      'guest'
                        ? 'border-[#6f5df4]/25 bg-[#6f5df4]/[0.07] text-[#6f5df4]'
                        : 'border-foreground/[0.08] text-muted-foreground/35'
                    }`}
                  >
                    Guest
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-foreground/[0.08] pt-4">
                  {outbound ? (
                    <>
                      <Send
                        size={12}
                        className="text-[#6f5df4]"
                      />

                      <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                        Outbound experience
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowLeft
                        size={12}
                        className="text-[#6f5df4]"
                      />

                      <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                        RSVP returns inward
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* VISUAL RELAY */}
            <div className="relative min-w-0 overflow-hidden p-3 sm:p-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(111,93,244,.075),transparent_34%),radial-gradient(circle_at_28%_78%,rgba(109,158,232,.06),transparent_32%)]"
              />

              <div className="relative min-h-[390px] overflow-hidden rounded-[1.15rem] border border-foreground/[0.08] bg-[#f4f0fa]/70 sm:min-h-[440px] lg:min-h-[460px]">
                {/* ROLE LABELS */}
                <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-5 sm:right-5">
                  <div className="flex items-center gap-2">
                    <Users
                      size={11}
                      className="text-[#6f5df4]"
                    />

                    <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
                      Planner workspace
                    </span>
                  </div>

                  <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
                    Guest experience
                  </span>
                </div>

                {/* ROUTE */}
                <div
                  aria-hidden="true"
                  className="absolute left-[8%] right-[8%] top-[53%] z-0 h-px bg-foreground/[0.07]"
                />

                <motion.div
                  aria-hidden="true"
                  className="absolute left-[8%] top-[53%] z-0 h-px origin-left bg-gradient-to-r from-[#6d9ee8]/45 via-[#6f5df4]/70 to-[#6f5df4]"
                  animate={{
                    width: outbound
                      ? `${22 + progress * 70}%`
                      : '84%',
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* MOVING SIGNAL */}
                {!reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-[calc(53%-4px)] z-[1] h-2 w-2 rounded-full bg-[#6f5df4] shadow-[0_0_18px_rgba(111,93,244,0.35)]"
                    animate={
                      outbound
                        ? {
                            left: [
                              '9%',
                              `${Math.min(
                                89,
                                26 +
                                  progress * 68,
                              )}%`,
                            ],
                          }
                        : {
                            left: [
                              '89%',
                              '10%',
                            ],
                          }
                    }
                    transition={{
                      duration: outbound
                        ? 1.1
                        : 1.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                )}

                {/* SCREEN WORLD */}
                <div className="absolute inset-x-4 bottom-4 top-12 sm:inset-x-5 sm:bottom-5">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={activeState.id}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x: outbound
                                ? 34
                                : -34,
                              scale: 0.975,
                              rotateY: outbound
                                ? -2
                                : 2,
                            }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        rotateY: 0,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              x: outbound
                                ? -24
                                : 24,
                              scale: 0.985,
                            }
                      }
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        perspective: 1200,
                      }}
                    >
                      <motion.div
                        animate={
                          reduceMotion
                            ? undefined
                            : activeState.actor ===
                                'guest'
                              ? {
                                  x: [
                                    0,
                                    4,
                                    0,
                                  ],
                                }
                              : {
                                  y: [
                                    0,
                                    -2,
                                    0,
                                  ],
                                }
                        }
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className={`relative flex max-h-full items-center justify-center rounded-[1rem] border bg-white/65 p-2 shadow-[0_24px_70px_rgba(72,57,120,0.10)] ${
                          activeState.actor ===
                          'guest'
                            ? 'border-[#6f5df4]/20'
                            : 'border-foreground/[0.09]'
                        }`}
                      >
                        <Image
                          src={activeState.image}
                          alt={activeState.alt}
                          width={1600}
                          height={950}
                          priority={
                            activeStep === 0
                          }
                          className="max-h-[350px] h-auto w-auto max-w-full rounded-[0.72rem] object-contain sm:max-h-[390px]"
                        />

                        {activeState.actor ===
                          'guest' && (
                          <motion.span
                            aria-hidden="true"
                            initial={
                              reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    scale: 0.85,
                                  }
                            }
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#6f5df4]/20 bg-[#f4f0fa] text-[#6f5df4] shadow-sm"
                          >
                            <Check size={13} />
                          </motion.span>
                        )}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* DIRECTION STATUS */}
                <div className="pointer-events-none absolute bottom-3 left-4 z-20 flex items-center gap-2 sm:bottom-4 sm:left-5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      outbound
                        ? 'bg-[#6d9ee8]'
                        : 'bg-[#6f5df4]'
                    }`}
                  />

                  <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    {outbound
                      ? 'Invitation moving outward'
                      : 'Response returning to planner'}
                  </span>
                </div>

                <span className="pointer-events-none absolute bottom-3 right-4 z-20 text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30 sm:bottom-4 sm:right-5">
                  {activeState.number} /{' '}
                  {String(
                    relayStates.length,
                  ).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* RETURN LOOP */}
          <div className="relative overflow-hidden border-t border-foreground/[0.08] px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6f5df4]/15 bg-[#6f5df4]/[0.055] text-[#6f5df4]">
                  <Users size={13} />
                </span>

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-foreground/65">
                    One controlled role boundary
                  </p>

                  <p className="mt-1 text-[10px] text-muted-foreground/50">
                    Internal planning becomes a focused guest experience,
                    then RSVP data returns to the event.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full border border-foreground/[0.08] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Planner
                </span>

                <ArrowRight
                  size={10}
                  className="text-[#6f5df4]/45"
                />

                <span className="rounded-full border border-[#6f5df4]/15 bg-[#6f5df4]/[0.045] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-[#6f5df4]/75">
                  Guest
                </span>

                <ArrowLeft
                  size={10}
                  className="text-[#6f5df4]/45"
                />

                <span className="rounded-full border border-foreground/[0.08] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Event
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* EXIT SIGNAL */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent" />

          <span className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/35">
            Guest response → event operations
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent" />
        </div>
      </Container>
    </section>
  );
}