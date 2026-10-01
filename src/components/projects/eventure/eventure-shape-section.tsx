'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import {
  motion,
  useReducedMotion,
} from 'motion/react';

import { Container } from '@/components/ui/container';
import { shapeViews } from './eventure-data';

export function EventureShapeSection() {
  const reduceMotion = useReducedMotion();
  const [activeShapeView, setActiveShapeView] = useState(1);

  return (
    <section className="overflow-hidden bg-[#ebe6f7] py-14 sm:py-16">
      <Container>
        {/* section introduction */}
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                02
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Shape
              </span>
            </div>

            <h3 className="mt-4 max-w-md font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              References become a direction.
            </h3>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Visual direction develops in stages: collect the references,
              organise them around the event, then compose them into one shared
              visual language.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <Sparkles size={13} className="text-[#6d9ee8]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-foreground/35">
                Select a view · watch the system recompose
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[1.8rem] border border-[#6f5df4]/15 bg-white/20 shadow-[0_28px_80px_rgba(86,72,130,0.08)] backdrop-blur-sm"
        >
          {/* technical field */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(111,93,244,.065) 1px, transparent 1px), linear-gradient(90deg, rgba(111,93,244,.065) 1px, transparent 1px)',
              backgroundSize: '54px 54px',
            }}
          />

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : {
                    x:
                      activeShapeView === 0
                        ? '-18%'
                        : activeShapeView === 2
                          ? '18%'
                          : '0%',
                    opacity: [0.35, 0.55, 0.35],
                  }
            }
            transition={{
              x: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
              },
              opacity: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="pointer-events-none absolute left-[36%] top-[18%] h-[360px] w-[440px] rounded-full bg-[#6f5df4]/10 blur-[110px]"
          />

          {/* top system bar */}
          <div className="relative z-30 flex items-center justify-between border-b border-[#6f5df4]/10 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.45, 1, 0.45],
                        scale: [1, 1.25, 1],
                      }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8]"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                Visual direction system
              </span>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              {shapeViews.map((view, index) => (
                <div key={view.id} className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setActiveShapeView(index)}
                    animate={{
                      opacity: activeShapeView === index ? 1 : 0.32,
                    }}
                    whileHover={{
                      opacity: 1,
                    }}
                    className={`text-[7px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                      activeShapeView === index
                        ? 'text-[#6f5df4]'
                        : 'text-foreground'
                    }`}
                  >
                    {view.stage}
                  </motion.button>

                  {index < shapeViews.length - 1 && (
                    <span className="text-[8px] text-[#6f5df4]/30">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* spatial composition */}
          <div className="relative z-10 px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
            <div className="grid gap-5 lg:grid-cols-[0.27fr_0.73fr] lg:items-stretch">
              {/* live narrative */}
              <div className="relative flex min-h-[220px] flex-col justify-between rounded-[1.25rem] border border-[#6f5df4]/10 bg-white/24 p-5 sm:p-6 lg:min-h-[440px]">
                <div>
                  <div className="flex items-center justify-between">
                    <motion.span
                      key={`eyebrow-${activeShapeView}`}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 6,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]"
                    >
                      {shapeViews[activeShapeView].number} /{' '}
                      {shapeViews[activeShapeView].eyebrow}
                    </motion.span>

                    <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-foreground/20">
                      0{activeShapeView + 1} / 03
                    </span>
                  </div>

                  <motion.div
                    key={`copy-${activeShapeView}`}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 12,
                            filter: 'blur(4px)',
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <h4 className="mt-5 max-w-[280px] font-serif text-2xl tracking-[-0.04em] text-foreground sm:text-[1.75rem]">
                      {shapeViews[activeShapeView].title}
                    </h4>

                    <p className="mt-4 max-w-[290px] text-[11px] leading-6 text-muted-foreground">
                      {shapeViews[activeShapeView].description}
                    </p>
                  </motion.div>
                </div>

                <div className="mt-8 border-t border-[#6f5df4]/10 pt-5">
                  <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-foreground/25">
                    Current signal
                  </span>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <motion.span
                      key={`metric-${activeShapeView}`}
                      initial={
                        reduceMotion ? false : { opacity: 0, x: -6 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      className="font-serif text-xl tracking-[-0.03em] text-foreground"
                    >
                      {shapeViews[activeShapeView].metric}
                    </motion.span>

                    <span className="text-right text-[7px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]">
                      {shapeViews[activeShapeView].metricLabel}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-1.5">
                    {shapeViews.map((view, index) => (
                      <button
                        key={view.id}
                        type="button"
                        onClick={() => setActiveShapeView(index)}
                        aria-label={`Show ${view.stage} view`}
                        className="group relative h-5 flex-1"
                      >
                        <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#6f5df4]/12" />

                        <motion.span
                          animate={{
                            scaleX:
                              activeShapeView === index ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            transformOrigin: 'left center',
                          }}
                          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#6f5df4] to-[#6d9ee8]"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* spatial screen system */}
              <div
                className="relative min-h-[430px] overflow-hidden rounded-[1.25rem] border border-[#6f5df4]/10 bg-[#f4f0fb]/55 sm:min-h-[500px] lg:min-h-[440px]"
                style={{
                  perspective: '1400px',
                }}
              >
                {/* soft spatial glow */}
                <motion.div
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x:
                            activeShapeView === 0
                              ? '-14%'
                              : activeShapeView === 2
                                ? '14%'
                                : '0%',
                          opacity: [0.22, 0.42, 0.22],
                        }
                  }
                  transition={{
                    x: {
                      type: 'spring',
                      stiffness: 70,
                      damping: 20,
                    },
                    opacity: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  className="pointer-events-none absolute left-[29%] top-[17%] h-[62%] w-[44%] rounded-full bg-[#6f5df4]/10 blur-[90px]"
                />

                {/* orbit tracks */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 1000 600"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
                >
                  <path
                    d="M 120 150 C 250 70, 390 100, 500 280 C 610 455, 760 510, 890 425"
                    fill="none"
                    stroke="rgba(111,93,244,.12)"
                    strokeWidth="1"
                    strokeDasharray="5 9"
                  />

                  <path
                    d="M 120 425 C 265 515, 390 470, 500 280 C 615 90, 760 80, 890 155"
                    fill="none"
                    stroke="rgba(109,158,232,.09)"
                    strokeWidth="1"
                    strokeDasharray="3 11"
                  />

                  {!reduceMotion && (
                    <>
                      <motion.circle
                        r="3"
                        fill="#6f5df4"
                        initial={{
                          offsetDistance: '0%',
                        }}
                        animate={{
                          offsetDistance: ['0%', '100%'],
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          offsetPath:
                            'path("M 120 150 C 250 70, 390 100, 500 280 C 610 455, 760 510, 890 425")',
                        }}
                      />

                      <motion.circle
                        r="2.5"
                        fill="#6d9ee8"
                        initial={{
                          offsetDistance: '100%',
                        }}
                        animate={{
                          offsetDistance: ['100%', '0%'],
                        }}
                        transition={{
                          duration: 5.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          offsetPath:
                            'path("M 120 425 C 265 515, 390 470, 500 280 C 615 90, 760 80, 890 155")',
                        }}
                      />
                    </>
                  )}
                </svg>

                {/* three-screen orbital system */}
                {shapeViews.map((view, index) => {
                  /*
                    The three views never unmount.

                    relativePosition:
                     0 = MAIN
                     1 = RIGHT SATELLITE
                     2 = LEFT SATELLITE

                    Example:
                    active 0 -> [0 main, 1 right, 2 left]
                    active 1 -> [0 left, 1 main, 2 right]
                    active 2 -> [0 right, 1 left, 2 main]
                  */
                  const relativePosition =
                    (index -
                      activeShapeView +
                      shapeViews.length) %
                    shapeViews.length;

                  const isMain = relativePosition === 0;
                  const isRight = relativePosition === 1;
                  const isLeft = relativePosition === 2;

                  const animateState = isMain
                    ? {
                        left: '8%',
                        top: '50%',
                        width: '84%',
                        x: '0%',
                        y: '-50%',
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        opacity: 1,
                        z: 0,
                      }
                    : isLeft
                      ? {
                          left: '0%',
                          top: '12%',
                          width: '23%',
                          x: '-18%',
                          y: '0%',
                          scale: 0.94,
                          rotateX: 2,
                          rotateY: 6,
                          rotateZ: -2,
                          opacity: 1,
                          z: 80,
                        }
                      : {
                          left: '77%',
                          top: '64%',
                          width: '23%',
                          x: '18%',
                          y: '0%',
                          scale: 0.94,
                          rotateX: -2,
                          rotateY: -6,
                          rotateZ: 2,
                          opacity: 1,
                          z: 80,
                        };

                  return (
                    <motion.button
                      key={view.id}
                      type="button"
                      onClick={() => {
                        if (!isMain) {
                          setActiveShapeView(index);
                        }
                      }}
                      aria-label={
                        isMain
                          ? `${view.stage} is the active view`
                          : `Bring ${view.stage} view forward`
                      }
                      aria-pressed={isMain}
                      animate={animateState}
                      whileHover={
                        !isMain && !reduceMotion
                          ? {
                              scale: 0.96,
                              rotateZ: 0,
                              z: 145,
                              y: -4,
                            }
                          : undefined
                      }
                      whileTap={
                        !isMain && !reduceMotion
                          ? {
                              scale: 0.88,
                              z: 120,
                            }
                          : undefined
                      }
                      transition={
                        reduceMotion
                          ? {
                              duration: 0,
                            }
                          : {
                              left: {
                                type: 'spring',
                                stiffness: 90,
                                damping: 18,
                              },
                              top: {
                                type: 'spring',
                                stiffness: 90,
                                damping: 18,
                              },
                              width: {
                                type: 'spring',
                                stiffness: 90,
                                damping: 18,
                              },
                              x: {
                                type: 'spring',
                                stiffness: 90,
                                damping: 18,
                              },
                              y: {
                                type: 'spring',
                                stiffness: 90,
                                damping: 18,
                              },
                              scale: {
                                type: 'spring',
                                stiffness: 105,
                                damping: 18,
                              },
                              rotateX: {
                                type: 'spring',
                                stiffness: 95,
                                damping: 19,
                              },
                              rotateY: {
                                type: 'spring',
                                stiffness: 95,
                                damping: 19,
                              },
                              rotateZ: {
                                type: 'spring',
                                stiffness: 95,
                                damping: 19,
                              },
                              opacity: {
                                duration: 0.35,
                              },
                              z: {
                                type: 'spring',
                                stiffness: 85,
                                damping: 18,
                              },
                            }
                      }
                      style={{
                        position: 'absolute',
                        transformStyle: 'preserve-3d',
                        transformPerspective: 1400,
                        zIndex: isMain
                          ? 20
                          : isRight
                            ? 42
                            : 40,
                        cursor: isMain
                          ? 'default'
                          : 'pointer',
                      }}
                      className="group text-left"
                    >
                      <motion.div
                        animate={{
                          boxShadow: isMain
                            ? '0 30px 80px rgba(70,53,112,.19)'
                            : '0 15px 38px rgba(73,57,119,.11)',
                        }}
                        transition={{
                          duration: 0.45,
                        }}
                        className={`overflow-hidden border backdrop-blur-xl ${
                          isMain
                            ? 'rounded-[1.2rem] border-white/85 bg-[#faf8fd]/96 p-2.5'
                            : 'rounded-[1rem] border-white/80 bg-white/84 p-2'
                        }`}
                      >
                        {/* screen header */}
                        <motion.div
                          animate={{
                            height: isMain ? 28 : 20,
                            opacity: isMain ? 1 : 0.8,
                          }}
                          className="flex items-center justify-between overflow-hidden px-2"
                        >
                          <div className="flex items-center gap-2">
                            <motion.span
                              animate={
                                !reduceMotion && isMain
                                  ? {
                                      opacity: [
                                        0.4,
                                        1,
                                        0.4,
                                      ],
                                      scale: [1, 1.2, 1],
                                    }
                                  : {
                                      opacity: 0.45,
                                      scale: 1,
                                    }
                              }
                              transition={{
                                duration: 2,
                                repeat: isMain
                                  ? Infinity
                                  : 0,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8]"
                            />

                            <span
                              className={`font-semibold uppercase text-[#6f5df4] ${
                                isMain
                                  ? 'text-[7px] tracking-[0.18em]'
                                  : 'text-[5px] tracking-[0.14em]'
                              }`}
                            >
                              {view.number} / {view.stage}
                            </span>
                          </div>

                          <span
                            className={`font-semibold uppercase tracking-[0.15em] text-foreground/25 ${
                              isMain
                                ? 'text-[6px]'
                                : 'text-[5px]'
                            }`}
                          >
                            {isMain
                              ? 'Active plane'
                              : 'Bring forward'}
                          </span>
                        </motion.div>

                        {/* screenshot */}
                        <div
                          className={`relative overflow-hidden border border-black/[0.04] bg-white ${
                            isMain
                              ? 'rounded-[0.9rem]'
                              : 'rounded-[0.7rem]'
                          }`}
                        >
                          <Image
                            src={view.image}
                            alt={view.alt}
                            width={1500}
                            height={950}
                            className={`w-full object-contain ${
                              isMain
                                ? 'max-h-[330px]'
                                : 'h-[78px] sm:h-[105px]'
                            }`}
                          />

                          {/* satellite glass layer */}
                          {!isMain && (
                            <motion.div
                              aria-hidden="true"
                              initial={false}
                              animate={{
                                opacity: 0.035,
                              }}
                              whileHover={{
                                opacity: 0,
                              }}
                              className="absolute inset-0 bg-[#6f5df4]"
                            />
                          )}

                          {/* satellite direction hint */}
                          {!isMain && (
                            <motion.div
                              aria-hidden="true"
                              animate={
                                reduceMotion
                                  ? undefined
                                  : {
                                      x: isLeft
                                        ? [0, 3, 0]
                                        : [0, -3, 0],
                                    }
                              }
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[9px] text-[#6f5df4] shadow-sm backdrop-blur-md"
                            >
                              {isLeft ? '↗' : '↖'}
                            </motion.div>
                          )}
                        </div>

                        {/* metadata */}
                        <motion.div
                          animate={{
                            height: isMain ? 34 : 27,
                          }}
                          className="flex items-center justify-between overflow-hidden px-2"
                        >
                          <span
                            className={`font-semibold uppercase text-foreground/35 ${
                              isMain
                                ? 'text-[7px] tracking-[0.18em]'
                                : 'text-[5px] tracking-[0.13em]'
                            }`}
                          >
                            {isMain
                              ? view.eyebrow
                              : view.stage}
                          </span>

                          <span
                            className={`font-semibold uppercase text-[#6f5df4] ${
                              isMain
                                ? 'text-[7px] tracking-[0.18em]'
                                : 'text-[5px] tracking-[0.13em]'
                            }`}
                          >
                            {isMain
                              ? view.metric
                              : 'Select'}
                          </span>
                        </motion.div>
                      </motion.div>
                    </motion.button>
                  );
                })}

                {/* centre orbit indicator */}
                <div className="pointer-events-none absolute bottom-3 left-1/2 z-40 hidden -translate-x-1/2 sm:block">
                  <div className="flex items-center gap-2 rounded-full border border-[#6f5df4]/10 bg-[#f8f5ff]/82 px-3 py-1.5 shadow-[0_8px_24px_rgba(73,57,119,.07)] backdrop-blur-md">
                    {shapeViews.map((view, index) => (
                      <motion.span
                        key={`orbit-dot-${view.id}`}
                        animate={{
                          width:
                            activeShapeView === index
                              ? 18
                              : 4,
                          opacity:
                            activeShapeView === index
                              ? 1
                              : 0.28,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-1 rounded-full ${
                          activeShapeView === index
                            ? 'bg-gradient-to-r from-[#6f5df4] to-[#6d9ee8]'
                            : 'bg-[#6f5df4]'
                        }`}
                      />
                    ))}

                    <span className="ml-1 text-[6px] font-semibold uppercase tracking-[0.16em] text-foreground/30">
                      Rotate the visual system
                    </span>
                  </div>
                </div>
              </div>

              {/* close spatial composition grid */}
            </div>
          </div>

          {/* lifecycle footer */}
          <div className="relative z-30 flex flex-col gap-3 border-t border-[#6f5df4]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              {shapeViews.map((view, index) => (
                <div
                  key={view.id}
                  className="flex items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveShapeView(index)
                    }
                    className={`text-[7px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                      activeShapeView === index
                        ? 'text-[#6f5df4]'
                        : 'text-foreground/25 hover:text-foreground/50'
                    }`}
                  >
                    {view.stage}
                  </button>

                  {index < shapeViews.length - 1 && (
                    <span className="text-[8px] text-[#6f5df4]/30">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <motion.span
              key={`footer-${activeShapeView}`}
              initial={
                reduceMotion ? false : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              className="text-[7px] font-semibold uppercase tracking-[0.18em] text-foreground/20"
            >
              {shapeViews[activeShapeView].eyebrow} · Eventure
            </motion.span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}