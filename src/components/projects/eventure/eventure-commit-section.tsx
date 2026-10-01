'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  CreditCard,
  Pause,
  Play,
  ShieldCheck,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { Container } from '@/components/ui/container';

import { commitSteps } from './eventure-data';
import { EventureCommitScene } from './eventure-commit-scene';

const paymentPaths = [
  {
    id: 'manual',
    number: '01',
    label: 'Manual deposit',
    eyebrow: 'Verification path',
    description:
      'The customer submits payment evidence. The administrator verifies it before the booking becomes active.',
    image: '/images/projects/eventure/commit/payment-submitted.png',
    alt: 'Eventure customer payment submitted for verification',
  },
  {
    id: 'stripe',
    number: '02',
    label: 'Stripe checkout',
    eyebrow: 'Direct checkout',
    description:
      'Stripe provides a direct checkout route while remaining part of the same booking lifecycle.',
    image: '/images/projects/eventure/commit/stripe-checkout.png',
    alt: 'Stripe checkout used by Eventure',
  },
];


export function EventureCommitSection() {
  const reduceMotion = useReducedMotion();

  const [activeCommitStep, setActiveCommitStep] = useState(0);
  const [activePaymentPath, setActivePaymentPath] = useState(0);

  const [autoPlay, setAutoPlay] = useState(true);
  const [userInteracting, setUserInteracting] = useState(false);

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeCommit = commitSteps[activeCommitStep];
  const activePayment = paymentPaths[activePaymentPath];

  useEffect(() => {
    if (
      reduceMotion ||
      !autoPlay ||
      userInteracting ||
      commitSteps.length <= 1
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveCommitStep((current) => (current + 1) % commitSteps.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [autoPlay, reduceMotion, userInteracting]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const pauseForInteraction = () => {
    setUserInteracting(true);

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      setUserInteracting(false);
    }, 7000);
  };

  const selectCommitStep = (index: number) => {
    setActiveCommitStep(index);
    pauseForInteraction();
  };

  const selectPaymentPath = (index: number) => {
    setActivePaymentPath(index);
  };

  return (
    <section className="overflow-hidden bg-[#ebe6f7] py-14 sm:py-16">
      <Container>
        {/* CHAPTER INTRO */}

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                04
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Commit
              </span>
            </div>

            <h3 className="mt-4 max-w-xl font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              Discovery becomes a commercial commitment.
            </h3>
          </div>

          <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
            A vendor decision moves through both sides of the marketplace:
            request, proposal, acceptance, booking, payment verification and an
            active commitment.
          </p>
        </div>

        {/* 3D COMMERCIAL LIFECYCLE */}

        <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-foreground/10 bg-white/20 shadow-[0_24px_80px_rgba(71,55,120,0.06)]">
          {/* SYSTEM BAR */}

          <div className="flex flex-col gap-3 border-b border-foreground/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                {!reduceMotion && autoPlay && !userInteracting && (
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.22, 0, 0.22],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute h-2 w-2 rounded-full bg-[#6f5df4]"
                  />
                )}

                <span className="relative h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />
              </span>

              <span className="text-[8px] font-semibold uppercase tracking-[0.19em] text-muted-foreground/60">
                Commercial lifecycle
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/35 sm:block">
                Customer → Vendor → Admin
              </span>

              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => {
                    setAutoPlay((current) => !current);
                    setUserInteracting(false);
                  }}
                  className="flex items-center gap-2 rounded-full border border-foreground/10 bg-white/30 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition hover:bg-white/50 hover:text-foreground"
                >
                  {autoPlay ? <Pause size={9} /> : <Play size={9} />}

                  {autoPlay ? 'Pause motion' : 'Play motion'}
                </button>
              )}
            </div>
          </div>

          {/* LIFECYCLE TIMELINE */}

          <div className="relative border-b border-foreground/10 px-4 py-5 sm:px-6">
            <div
              aria-hidden="true"
              className="absolute left-[8%] right-[8%] top-[35px] hidden h-px bg-foreground/10 sm:block"
            />

            <motion.div
              aria-hidden="true"
              animate={{
                width: `${
                  (activeCommitStep / Math.max(commitSteps.length - 1, 1)) * 84
                }%`,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-[8%] top-[35px] hidden h-px bg-gradient-to-r from-[#6f5df4] to-[#6d9ee8] sm:block"
            />

            <div className="relative grid grid-cols-3 gap-2 sm:grid-cols-6">
              {commitSteps.map((step, index) => {
                const active = activeCommitStep === index;
                const completed = index < activeCommitStep;

                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => selectCommitStep(index)}
                    aria-pressed={active}
                    className="group relative flex flex-col items-center text-center"
                  >
                    <motion.span
                      animate={{
                        scale: active ? 1.12 : 1,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[7px] font-semibold transition-all duration-300 ${
                        active
                          ? 'border-[#6f5df4]/40 bg-[#6f5df4] text-white shadow-[0_0_0_5px_rgba(111,93,244,0.08)]'
                          : completed
                            ? 'border-[#6f5df4]/20 bg-[#ebe6f7] text-[#6f5df4]'
                            : 'border-foreground/10 bg-[#f3effa] text-muted-foreground/45'
                      }`}
                    >
                      {completed ? (
                        <Check size={10} />
                      ) : (
                        String(index + 1).padStart(2, '0')
                      )}
                    </motion.span>

                    <span
                      className={`mt-2 text-[7px] font-semibold uppercase tracking-[0.14em] transition ${
                        active
                          ? 'text-[#6f5df4]'
                          : 'text-muted-foreground/45 group-hover:text-foreground/60'
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE STATE COPY */}

          <div className="grid gap-4 px-5 pb-2 pt-5 sm:px-6 lg:grid-cols-[0.33fr_0.67fr] lg:items-end">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCommit.label}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -10,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        x: 8,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                    {String(activeCommitStep + 1).padStart(2, '0')}
                  </span>

                  <span className="h-px w-6 bg-[#6f5df4]/30" />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/40">
                    Current state
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-2xl tracking-[-0.035em] text-foreground sm:text-[1.7rem]">
                  {activeCommit.label}
                </h4>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`${activeCommit.label}-detail`}
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
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -4,
                      }
                }
                transition={{
                  duration: 0.28,
                }}
                className="max-w-xl text-[10px] leading-5 text-muted-foreground lg:justify-self-end lg:text-right"
              >
                {activeCommit.detail}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* WEBGL TRANSACTION CORRIDOR */}

<div
  className="relative mx-3 mb-3 mt-3 h-[360px] overflow-hidden rounded-[1.35rem] border border-foreground/10 bg-[#f4f0fa] sm:mx-5 sm:h-[430px] lg:h-[470px]"
  onMouseEnter={() => {
    setUserInteracting(true);
  }}
  onMouseLeave={() => {
    if (autoPlay) {
      pauseForInteraction();
    } else {
      setUserInteracting(false);
    }
  }}
>
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-[70px]"
  />

  <EventureCommitScene
    activeIndex={activeCommitStep}
    onSelect={selectCommitStep}
    reducedMotion={Boolean(reduceMotion)}
  />

  <div className="pointer-events-none absolute bottom-4 left-4 z-30 rounded-full border border-foreground/10 bg-[#ebe6f7]/80 px-3 py-1.5 backdrop-blur-md">
    <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/50">
      WebGL transaction corridor
    </span>
  </div>

  <div className="pointer-events-none absolute bottom-4 right-4 z-30 hidden items-center gap-2 sm:flex">
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        autoPlay && !userInteracting
          ? 'bg-[#6f5df4]'
          : 'bg-foreground/20'
      }`}
    />

    <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
      {autoPlay && !userInteracting
        ? 'Auto progressing'
        : 'Manual control'}
    </span>
  </div>
</div>
        </div>

        {/* PAYMENT RESOLUTION */}

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.34fr_0.66fr] lg:items-stretch">
          {/* EXPLANATION + BRANCH CONTROL */}

          <div className="flex flex-col">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#6f5df4]/15 bg-[#6f5df4]/[0.06] text-[#6f5df4]">
              <CreditCard size={15} />
            </div>

            <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
              Payment resolution
            </p>

            <h4 className="mt-3 max-w-sm font-serif text-2xl tracking-[-0.035em] text-foreground">
              One booking can resolve through two payment paths.
            </h4>

            <p className="mt-3 max-w-sm text-[10px] leading-5 text-muted-foreground">
              Manual deposits introduce an administrator verification step.
              Stripe provides the alternate direct checkout route. Both return
              to the same booking lifecycle.
            </p>

            <div className="mt-6 grid gap-2">
              {paymentPaths.map((path, index) => {
                const active = activePaymentPath === index;

                return (
                  <button
                    key={path.id}
                    type="button"
                    onClick={() => selectPaymentPath(index)}
                    aria-pressed={active}
                    className={`relative overflow-hidden rounded-[1rem] border px-4 py-4 text-left transition-all duration-300 ${
                      active
                        ? 'border-[#6f5df4]/25 bg-white/55 shadow-[0_12px_35px_rgba(71,55,120,0.05)]'
                        : 'border-foreground/10 bg-white/20 hover:bg-white/35'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full border text-[7px] font-semibold ${
                            active
                              ? 'border-[#6f5df4]/20 bg-[#6f5df4]/[0.07] text-[#6f5df4]'
                              : 'border-foreground/10 text-muted-foreground/40'
                          }`}
                        >
                          {path.number}
                        </span>

                        <div>
                          <span className="block text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                            {path.eyebrow}
                          </span>

                          <span
                            className={`mt-1 block text-[10px] font-semibold ${
                              active
                                ? 'text-foreground'
                                : 'text-foreground/60'
                            }`}
                          >
                            {path.label}
                          </span>
                        </div>
                      </div>

                      <ArrowRight
                        size={11}
                        className={
                          active
                            ? 'text-[#6f5df4]'
                            : 'text-muted-foreground/25'
                        }
                      />
                    </div>

                    <motion.span
                      aria-hidden="true"
                      animate={{
                        scaleX: active ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        transformOrigin: 'left center',
                      }}
                      className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#6f5df4] to-[#6d9ee8]"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* PAYMENT BRANCH VISUAL */}

          <div className="relative overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-white/30 p-4 sm:p-5">
            <div
              aria-hidden="true"
              className="absolute right-[10%] top-[10%] h-48 w-48 rounded-full bg-[#6f5df4]/[0.06] blur-[55px]"
            />

            {/* BRANCH MAP */}

            <div className="relative mb-4 flex items-center justify-center gap-2 border-b border-foreground/10 pb-4">
              <span className="rounded-full border border-foreground/10 bg-[#ebe6f7] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/55">
                Booking
              </span>

              <ArrowRight size={10} className="text-[#6f5df4]/40" />

              <span className="rounded-full border border-[#6f5df4]/15 bg-[#6f5df4]/[0.06] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] text-[#6f5df4]">
                Payment
              </span>

              <ArrowRight size={10} className="text-[#6f5df4]/40" />

              <span className="rounded-full border border-foreground/10 bg-[#ebe6f7] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/55">
                Active
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePayment.id}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 18,
                        rotateY: -2,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        x: -12,
                        rotateY: 2,
                      }
                }
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  perspective: '1200px',
                }}
                className="relative"
              >
                <div className="flex h-[270px] items-center justify-center overflow-hidden rounded-[1.05rem] border border-foreground/10 bg-[#f8f6fb] p-2 sm:h-[330px]">
                  <Image
                    src={activePayment.image}
                    alt={activePayment.alt}
                    width={1300}
                    height={820}
                    className="max-h-full h-auto max-w-full w-auto object-contain"
                  />
                </div>

                <div className="flex flex-col gap-3 px-1 pb-1 pt-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
                      {activePayment.eyebrow}
                    </span>

                    <h5 className="mt-1.5 text-sm font-semibold text-foreground">
                      {activePayment.label}
                    </h5>
                  </div>

                  <p className="max-w-sm text-[9px] leading-5 text-muted-foreground sm:text-right">
                    {activePayment.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* MANUAL VERIFICATION SIGNAL */}

            <AnimatePresence initial={false}>
              {activePayment.id === 'manual' && (
                <motion.div
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
                          y: 5,
                        }
                  }
                  transition={{
                    duration: 0.3,
                  }}
                  className="mt-3 flex items-center gap-3 rounded-[0.9rem] border border-[#6f5df4]/10 bg-[#6f5df4]/[0.04] px-4 py-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#6f5df4]/15 text-[#6f5df4]">
                    <ShieldCheck size={12} />
                  </div>

                  <div className="min-w-0">
                    <span className="block text-[7px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]">
                      Admin handoff
                    </span>

                    <span className="mt-1 block text-[9px] text-muted-foreground">
                      Payment evidence is reviewed before the booking becomes
                      active.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* EXIT SIGNAL */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
              Request
            </span>

            <ArrowRight size={10} className="text-[#6f5df4]/45" />

            <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
              Agreement
            </span>

            <ArrowRight size={10} className="text-[#6f5df4]/45" />

            <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
              Booking
            </span>

            <ArrowRight size={10} className="text-[#6f5df4]/45" />

            <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
              Payment
            </span>

            <ArrowRight size={10} className="text-[#6f5df4]/45" />

            <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
              Active
            </span>
          </div>

          <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]/65">
            Commitment → Invitation
          </span>
        </motion.div>
      </Container>
    </section>
  );
}