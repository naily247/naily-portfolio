'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { Container } from '@/components/ui/container';

import {
  engineeringDetails,
  engineeringLayers,
} from './eventure-data';

const RULE_LAYER_MAP = [
  [0, 1], // Role-aware access
  [1], // Domain validation
  [1, 2], // Explicit lifecycle states
  [1], // API testing
] as const;

export function EventureEngineeringSection() {
  const reduceMotion = useReducedMotion();

  const [activeLayer, setActiveLayer] = useState(0);
  const [activeRule, setActiveRule] =
    useState<number | null>(null);

  const [autoPlay, setAutoPlay] = useState(true);
  const [userInteracting, setUserInteracting] =
    useState(false);

  const interactionTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseForInteraction = useCallback(() => {
    setUserInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      setUserInteracting(false);
      setActiveRule(null);
    }, 6500);
  }, []);

  const selectLayer = useCallback(
    (index: number) => {
      setActiveRule(null);
      setActiveLayer(index);
      pauseForInteraction();
    },
    [pauseForInteraction],
  );

  const selectRule = useCallback(
    (index: number) => {
      setActiveRule(index);
      pauseForInteraction();
    },
    [pauseForInteraction],
  );

  useEffect(() => {
    if (
      reduceMotion ||
      !autoPlay ||
      userInteracting ||
      engineeringLayers.length <= 1
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveRule(null);

      setActiveLayer(
        (current) =>
          (current + 1) % engineeringLayers.length,
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

  const isLayerHighlighted = (index: number) => {
    if (activeRule === null) {
      return activeLayer === index;
    }

    return RULE_LAYER_MAP[
      activeRule
    ]?.includes(index as never);
  };

  return (
    <section className="bg-[#ebe6f7] py-12 sm:py-14 lg:py-16">
      <Container>
        {/* INTRO */}
        <div className="grid gap-7 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                08
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Engineering
              </span>
            </div>

            <h2 className="mt-4 max-w-md font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              The product rules don&apos;t stop at the UI.
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            The interface is one layer of the product.
            Permissions, validation, lifecycle rules and
            persistence carry the same behavior through the
            application.
          </p>
        </div>

        {/* ENGINEERING STAGE */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
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
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-9 overflow-hidden rounded-[1.7rem] border border-foreground/[0.09] bg-white/25"
        >
          {/* ATMOSPHERE */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_38%,rgba(109,158,232,.055),transparent_26%),radial-gradient(circle_at_77%_42%,rgba(111,93,244,.065),transparent_29%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:54px_54px] text-foreground/[0.015]"
          />

          {/* SYSTEM BAR */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-foreground/[0.07] px-5 py-3.5 sm:px-6">
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
                  ease: 'easeInOut',
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8]"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/45">
                Eventure / Product architecture
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30 sm:block">
                {activeRule === null
                  ? 'Architecture traversal'
                  : 'Rule inspection'}
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
                  className="rounded-full border border-foreground/[0.08] bg-white/30 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45 transition hover:border-[#6f5df4]/25 hover:text-[#6f5df4]"
                >
                  {autoPlay
                    ? 'Pause motion'
                    : 'Resume motion'}
                </button>
              )}
            </div>
          </div>

          <div className="relative z-10 p-5 sm:p-6 lg:p-7">
            {/* ARCHITECTURE LABEL */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]/70">
                  Architecture
                </p>

                <p className="mt-1 text-[10px] text-muted-foreground/60">
                  Behavior carried through three system layers.
                </p>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8]" />

                <span className="h-px w-12 bg-gradient-to-r from-[#6d9ee8]/50 to-[#6f5df4]/50" />

                <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />
              </div>
            </div>

            {/* ARCHITECTURE LAYERS */}
            <div className="relative grid gap-3 lg:grid-cols-3">
              {/* CONNECTOR */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden h-px -translate-y-1/2 lg:block"
              >
                <div className="absolute inset-0 bg-foreground/[0.07]" />

                <motion.div
                  animate={{
                    left:
                      activeLayer === 0
                        ? '0%'
                        : activeLayer === 1
                          ? '50%'
                          : '100%',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 95,
                    damping: 18,
                  }}
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ebe6f7] bg-[#6f5df4] shadow-[0_0_18px_rgba(111,93,244,.35)]"
                />
              </div>

              {engineeringLayers.map(
                (layer, index) => {
                  const Icon = layer.icon;
                  const isHighlighted =
                    isLayerHighlighted(index);

                  return (
                    <motion.button
                      type="button"
                      key={layer.label}
                      onClick={() =>
                        selectLayer(index)
                      }
                      onMouseEnter={() => {
                        setActiveRule(null);
                        setActiveLayer(index);
                        pauseForInteraction();
                      }}
                      onFocus={() =>
                        selectLayer(index)
                      }
                      animate={{
                        opacity: isHighlighted
                          ? 1
                          : 0.62,
                        y: isHighlighted
                          ? -3
                          : 0,
                        scale: isHighlighted
                          ? 1.012
                          : 0.992,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative z-10 rounded-[1.15rem] border p-5 text-left outline-none transition-[border-color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#6f5df4]/30 ${
                        isHighlighted
                          ? 'border-[#6f5df4]/25 bg-white/75 shadow-[0_16px_45px_rgba(77,61,130,0.07)]'
                          : 'border-foreground/[0.07] bg-[#f7f5fa]/55'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <motion.div
                          animate={{
                            backgroundColor:
                              isHighlighted
                                ? index === 0
                                  ? 'rgba(109,158,232,.11)'
                                  : 'rgba(111,93,244,.10)'
                                : 'rgba(255,255,255,.25)',
                            borderColor:
                              isHighlighted
                                ? index === 0
                                  ? 'rgba(109,158,232,.25)'
                                  : 'rgba(111,93,244,.22)'
                                : 'rgba(24,24,27,.07)',
                          }}
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                            index === 0
                              ? 'text-[#6d9ee8]'
                              : 'text-[#6f5df4]'
                          }`}
                        >
                          <Icon size={15} />
                        </motion.div>

                        <span className="text-[8px] font-semibold text-muted-foreground/25">
                          0{index + 1}
                        </span>
                      </div>

                      <span className="mt-5 block text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/45">
                        {layer.label}
                      </span>

                      <h3 className="mt-2 text-sm font-semibold text-foreground">
                        {layer.title}
                      </h3>

                      <p className="mt-3 max-w-[260px] text-[10px] leading-5 text-muted-foreground">
                        {layer.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 border-t border-foreground/[0.06] pt-3">
                        <motion.span
                          animate={{
                            opacity: isHighlighted
                              ? 1
                              : 0.25,
                            scale: isHighlighted
                              ? [1, 1.35, 1]
                              : 1,
                          }}
                          transition={
                            isHighlighted &&
                            !reduceMotion
                              ? {
                                  duration: 1.8,
                                  repeat: Infinity,
                                }
                              : {
                                  duration: 0.2,
                                }
                          }
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === 0
                              ? 'bg-[#6d9ee8]'
                              : 'bg-[#6f5df4]'
                          }`}
                        />

                        <span className="text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/30">
                          {isHighlighted
                            ? 'Active layer'
                            : 'System layer'}
                        </span>
                      </div>
                    </motion.button>
                  );
                },
              )}
            </div>

            {/* CROSS-STACK BRIDGE */}
            <div className="relative mx-auto my-5 flex max-w-2xl items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6d9ee8]/20 to-[#6f5df4]/25" />

              <div className="flex items-center gap-2 rounded-full border border-foreground/[0.07] bg-[#ebe6f7]/65 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]/60" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                  Product rules cross the stack
                </span>
              </div>

              <div className="h-px flex-1 bg-gradient-to-r from-[#6f5df4]/25 via-[#6f5df4]/15 to-transparent" />
            </div>

            {/* RULES */}
            <div>
              <div className="mb-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]/70">
                    Engineering rules
                  </p>

                  <p className="mt-1 text-[10px] text-muted-foreground/60">
                    Select a rule to see where its behavior is enforced.
                  </p>
                </div>

                {activeRule !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRule(null);
                      pauseForInteraction();
                    }}
                    className="text-[7px] font-semibold uppercase tracking-[0.15em] text-[#6f5df4]/65 transition hover:text-[#6f5df4]"
                  >
                    Return to layers
                  </button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {engineeringDetails.map(
                  (detail, index) => {
                    const Icon = detail.icon;
                    const isActive =
                      activeRule === index;

                    return (
                      <motion.button
                        type="button"
                        key={detail.title}
                        onClick={() =>
                          selectRule(index)
                        }
                        onFocus={() =>
                          selectRule(index)
                        }
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                y: -2,
                              }
                        }
                        animate={{
                          opacity:
                            activeRule === null ||
                            isActive
                              ? 1
                              : 0.5,
                          scale: isActive
                            ? 1.015
                            : 1,
                        }}
                        transition={{
                          duration: reduceMotion
                            ? 0
                            : 0.3,
                        }}
                        className={`rounded-[1rem] border p-4 text-left outline-none transition-[border-color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#6f5df4]/30 ${
                          isActive
                            ? 'border-[#6f5df4]/25 bg-white/70 shadow-[0_12px_35px_rgba(77,61,130,0.06)]'
                            : 'border-foreground/[0.07] bg-white/25 hover:border-[#6f5df4]/18 hover:bg-white/45'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                              isActive
                                ? 'border-[#6f5df4]/20 bg-[#6f5df4]/[0.08] text-[#6f5df4]'
                                : 'border-foreground/[0.07] bg-white/30 text-muted-foreground/55'
                            }`}
                          >
                            <Icon size={14} />
                          </div>

                          <h3 className="text-[12px] font-semibold text-foreground">
                            {detail.title}
                          </h3>
                        </div>

                        <p className="mt-3 text-[10px] leading-[1.65] text-muted-foreground">
                          {detail.description}
                        </p>

                        <div className="mt-3 flex items-center gap-1.5 border-t border-foreground/[0.06] pt-3">
                          {[0, 1, 2].map(
                            (layerIndex) => {
                              const connected =
                                RULE_LAYER_MAP[
                                  index
                                ]?.includes(
                                  layerIndex as never,
                                );

                              return (
                                <motion.span
                                  key={layerIndex}
                                  animate={{
                                    width:
                                      isActive &&
                                      connected
                                        ? 17
                                        : 5,
                                    opacity:
                                      connected
                                        ? isActive
                                          ? 1
                                          : 0.45
                                        : 0.15,
                                  }}
                                  className={`h-1.5 rounded-full ${
                                    layerIndex === 0
                                      ? 'bg-[#6d9ee8]'
                                      : 'bg-[#6f5df4]'
                                  }`}
                                />
                              );
                            },
                          )}

                          <span className="ml-1 text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/30">
                            {isActive
                              ? 'Inspecting'
                              : 'Layer reach'}
                          </span>
                        </div>
                      </motion.button>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* STATUS RAIL */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/[0.07] px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
                Interface
              </span>

              <span className="text-muted-foreground/20">
                →
              </span>

              <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
                Application
              </span>

              <span className="text-muted-foreground/20">
                →
              </span>

              <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
                Data
              </span>
            </div>

            <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]/55">
              {userInteracting
                ? 'Manual inspection'
                : autoPlay
                  ? 'Architecture live'
                  : 'Motion paused'}
            </span>
          </div>
        </motion.div>

        {/* TRANSITION */}
        <div className="mx-auto mt-7 flex max-w-xl items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground/[0.08]" />

          <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/30">
            Architecture → decisions
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-foreground/[0.08] to-transparent" />
        </div>
      </Container>
    </section>
  );
}