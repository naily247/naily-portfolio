'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { Container } from '@/components/ui/container';
import { planModules } from './eventure-data';

export function EventurePlanSection() {
  const reduceMotion = useReducedMotion();
  const [activePlanModule, setActivePlanModule] = useState(-1);

  return (
    
    <section className="bg-[#ebe6f7] py-10 sm:py-12">
      <Container>
        {/* =====================================================
            PLAN INTRO
            ===================================================== */}
    
        <div className="grid gap-5 lg:grid-cols-[0.48fr_1.52fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                01
              </span>
    
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Plan
              </span>
            </div>
    
            <h3 className="mt-4 max-w-sm font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              Everything stays attached to the event.
            </h3>
          </div>
    
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            The event acts as the planning core. Budget, tasks and documents
            remain connected to that context instead of becoming isolated tools.
          </p>
        </div>
    
        {/* =====================================================
            INTERACTIVE PLANNING SYSTEM
            ===================================================== */}
    
        <div className="relative mt-7 overflow-hidden rounded-[1.8rem] border border-foreground/10 bg-white/20 shadow-[0_24px_80px_rgba(71,55,120,0.07)]">
          {/* subtle lavender atmosphere */}
    
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(111,93,244,.11),transparent_30%),radial-gradient(circle_at_80%_22%,rgba(109,158,232,.09),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(111,93,244,.055),transparent_25%)]"
          />
    
          {/* light technical grid */}
    
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(82,72,116,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(82,72,116,.10)_1px,transparent_1px)] [background-size:48px_48px]"
          />
    
          {/* top rail */}
    
          <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-2">
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
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8] shadow-[0_0_12px_rgba(109,158,232,.65)]"
              />
    
              <span className="text-[8px] font-semibold uppercase tracking-[0.19em] text-foreground/45">
                Live planning system
              </span>
            </div>
    
            <div className="flex items-center gap-3">
              <span className="hidden text-[7px] font-semibold uppercase tracking-[0.16em] text-foreground/25 sm:block">
                Select a module to inspect
              </span>
    
              <span className="text-[8px] uppercase tracking-[0.17em] text-foreground/35">
                Sophia & Ethan Wedding
              </span>
            </div>
          </div>
    
          {/* =====================================================
        DESKTOP SPATIAL STAGE — UNFOLDING PRODUCT SYSTEM
        ===================================================== */}
    
    <div className="relative hidden h-[535px] lg:block">
      {/* ===================================================
          CONNECTION NETWORK
          =================================================== */}
    
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 535"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id="planMagicLine"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6f5df4" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#6d9ee8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6f5df4" stopOpacity="0.12" />
          </linearGradient>
    
          <linearGradient
            id="planActiveLine"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6f5df4" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#6d9ee8" stopOpacity="1" />
            <stop offset="100%" stopColor="#6f5df4" stopOpacity="0.65" />
          </linearGradient>
    
          <filter id="planMagicGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
    
        {/* BUDGET PATH */}
    
        <motion.path
          d="M 600 255 C 490 225, 410 145, 255 115"
          fill="none"
          stroke={
            activePlanModule === 0
              ? 'url(#planActiveLine)'
              : 'url(#planMagicLine)'
          }
          strokeWidth={activePlanModule === 0 ? 1.8 : 1.1}
          animate={{
            opacity:
              activePlanModule < 0 || activePlanModule === 0 ? 1 : 0.22,
          }}
          transition={{ duration: 0.35 }}
        />
    
        {/* TASK PATH */}
    
        <motion.path
          d="M 600 255 C 710 225, 790 145, 945 115"
          fill="none"
          stroke={
            activePlanModule === 1
              ? 'url(#planActiveLine)'
              : 'url(#planMagicLine)'
          }
          strokeWidth={activePlanModule === 1 ? 1.8 : 1.1}
          animate={{
            opacity:
              activePlanModule < 0 || activePlanModule === 1 ? 1 : 0.22,
          }}
          transition={{ duration: 0.35 }}
        />
    
        {/* DOCUMENT PATH */}
    
        <motion.path
          d="M 600 255 C 600 315, 600 365, 600 445"
          fill="none"
          stroke={
            activePlanModule === 2
              ? 'url(#planActiveLine)'
              : 'url(#planMagicLine)'
          }
          strokeWidth={activePlanModule === 2 ? 1.8 : 1.1}
          animate={{
            opacity:
              activePlanModule < 0 || activePlanModule === 2 ? 1 : 0.22,
          }}
          transition={{ duration: 0.35 }}
        />
    
        {/* AMBIENT SIGNALS — ONLY IN SYSTEM VIEW */}
    
        {!reduceMotion && activePlanModule < 0 && (
          <>
            <motion.circle
              r="3"
              fill="#6d9ee8"
              filter="url(#planMagicGlow)"
              animate={{
                cx: [600, 465, 255],
                cy: [255, 190, 115],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
    
            <motion.circle
              r="3"
              fill="#6f5df4"
              filter="url(#planMagicGlow)"
              animate={{
                cx: [600, 760, 945],
                cy: [255, 185, 115],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: 0.65,
                ease: 'easeInOut',
              }}
            />
    
            <motion.circle
              r="3"
              fill="#6d9ee8"
              filter="url(#planMagicGlow)"
              animate={{
                cx: [600, 600, 600],
                cy: [255, 345, 445],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.1,
                ease: 'easeInOut',
              }}
            />
          </>
        )}
    
        {/* ACTIVE SIGNAL — CORE → SELECTED MODULE */}
    
        {!reduceMotion && activePlanModule === 0 && (
          <motion.circle
            r="4"
            fill="#6d9ee8"
            filter="url(#planMagicGlow)"
            animate={{
              cx: [600, 470, 255],
              cy: [255, 190, 115],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: 'easeInOut',
            }}
          />
        )}
    
        {!reduceMotion && activePlanModule === 1 && (
          <motion.circle
            r="4"
            fill="#6d9ee8"
            filter="url(#planMagicGlow)"
            animate={{
              cx: [600, 760, 945],
              cy: [255, 185, 115],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: 'easeInOut',
            }}
          />
        )}
    
        {!reduceMotion && activePlanModule === 2 && (
          <motion.circle
            r="4"
            fill="#6d9ee8"
            filter="url(#planMagicGlow)"
            animate={{
              cx: [600, 600, 600],
              cy: [255, 345, 445],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: 'easeInOut',
            }}
          />
        )}
      </svg>
    
      {/* ===================================================
          EVENT CORE
          =================================================== */}
    
      <motion.button
      type="button"
      onClick={() => {
        if (activePlanModule >= 0) {
          setActivePlanModule(-1);
        }
      }}
      aria-label={
        activePlanModule >= 0
          ? 'Return to planning system overview'
          : 'Event planning core'
      }
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.94,
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
          animate={
        activePlanModule >= 0
          ? {
              x: -385,
              y: 100,
              scale: 0.72,
              opacity: 0.72,
            }
          : {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            }
      }
    
      whileHover={
        activePlanModule >= 0 && !reduceMotion
          ? {
              scale: 0.75,
            }
          : undefined
      }
    
      whileTap={
        activePlanModule >= 0 && !reduceMotion
          ? {
              scale: 0.69,
            }
          : undefined
      }
    
      transition={{
        type: 'spring',
        stiffness: 115,
        damping: 20,
        mass: 0.9,
      }}
    
      className={`absolute left-1/2 top-[145px] z-20 w-[300px] -translate-x-1/2 text-left ${
        activePlanModule >= 0
          ? 'cursor-pointer'
          : 'cursor-default'
      }`}
    >
        <div className="relative overflow-hidden rounded-[1.45rem] border border-[#6f5df4]/20 bg-white/70 p-5 shadow-[0_20px_65px_rgba(71,55,120,.10)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#6f5df4]/10 blur-3xl"
          />
    
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
                Event core
              </span>
    
              <span className="rounded-full border border-emerald-600/10 bg-emerald-500/[0.07] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.15em] text-emerald-700/70">
                Active
              </span>
            </div>
    
            <h4 className="mt-4 font-serif text-[1.65rem] leading-[1.05] tracking-[-0.04em] text-foreground">
              Sophia & Ethan
              <br />
              Wedding
            </h4>
    
            <p className="mt-2 text-[9px] text-muted-foreground">
              December 12, 2026 · Colombo
            </p>
    
            <AnimatePresence>
      {activePlanModule >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          className="mt-3 flex items-center gap-2"
        >
          <span className="text-[8px] text-[#6f5df4]">↙</span>
    
          <span className="text-[6px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]/70">
            Return to system
          </span>
        </motion.div>
      )}
    </AnimatePresence>
    
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ['Guests', '180'],
                ['Budget', '3.5M'],
                ['Type', 'Wedding'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-foreground/8 bg-white/45 p-2.5"
                >
                  <p className="text-[6px] uppercase tracking-[0.15em] text-foreground/35">
                    {label}
                  </p>
    
                  <p className="mt-1 text-[10px] font-semibold text-foreground/75">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.button>
    
      {/* ===================================================
          MODULE OBJECTS
          =================================================== */}
    
      {planModules.map((module, index) => {
        const active = activePlanModule === index;
        const inspecting = activePlanModule >= 0;
    
        const restingPositions = [
          'left-[5%] top-[38px]',
          'right-[5%] top-[38px]',
          'bottom-[28px] left-1/2 -translate-x-1/2',
        ];
    
        /*
          When inspection starts, the three objects reorganise
          into a compact left-side constellation.
    
          The selected object remains fully visible — it NEVER
          disappears underneath its own screenshot.
        */
    
        const inspectionMotion = [
          { x: 0, y: 170 },
          { x: -690, y: 255 },
          { x: -360, y: -15 },
        ];
    
        return (
          <motion.button
            key={module.label}
            type="button"
            onClick={() =>
              setActivePlanModule(active ? -1 : index)
            }
            aria-pressed={active}
            animate={
              inspecting
                ? {
                    x: inspectionMotion[index].x,
                    y: inspectionMotion[index].y,
                    scale: active ? 0.9 : 0.76,
                    opacity: active ? 1 : 0.48,
                  }
                : {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                  }
            }
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: inspecting
                      ? active
                        ? 0.94
                        : 0.8
                      : 1.045,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 125,
              damping: 19,
              mass: 0.85,
            }}
            className={`group absolute z-30 w-[230px] rounded-[1.15rem] border p-4 text-left backdrop-blur-2xl ${
              active
                ? 'border-[#6f5df4]/40 bg-white/85 shadow-[0_20px_55px_rgba(111,93,244,.15)]'
                : 'border-foreground/10 bg-white/55 shadow-[0_12px_40px_rgba(71,55,120,.05)]'
            } ${restingPositions[index]}`}
          >
            {/* active aura */}
    
            <motion.div
              aria-hidden="true"
              animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 0.8,
              }}
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[1.7rem] bg-[#6f5df4]/[0.08] blur-2xl"
            />
    
            <div className="flex items-center justify-between">
              <span
                className={`text-[7px] font-semibold uppercase tracking-[0.18em] ${
                  active
                    ? 'text-[#6f5df4]'
                    : 'text-foreground/40'
                }`}
              >
                {module.number} / {module.label}
              </span>
    
              <motion.span
                animate={
                  active && !reduceMotion
                    ? {
                        scale: [1, 1.35, 1],
                        opacity: [0.5, 1, 0.5],
                      }
                    : undefined
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                }}
                className={`h-1.5 w-1.5 rounded-full ${
                  active
                    ? 'bg-[#6d9ee8] shadow-[0_0_12px_rgba(109,158,232,.75)]'
                    : 'bg-foreground/25'
                }`}
              />
            </div>
    
            <p className="mt-4 text-[7px] font-semibold uppercase tracking-[0.16em] text-foreground/30">
              {module.eyebrow}
            </p>
    
            <div className="mt-1.5 flex items-end justify-between gap-3">
              <span className="font-serif text-lg tracking-[-0.03em] text-foreground">
                {module.label}
              </span>
    
              <span
                className={`text-[10px] font-semibold ${
                  active
                    ? 'text-[#6f5df4]'
                    : 'text-foreground/45'
                }`}
              >
                {module.metric}
              </span>
            </div>
    
            <div className="mt-4 h-px overflow-hidden bg-foreground/10">
              <motion.div
                animate={{
                  scaleX: active ? 1 : 0,
                }}
                style={{
                  transformOrigin: 'left center',
                }}
                transition={{
                  duration: 0.35,
                }}
                className="h-full bg-gradient-to-r from-[#6f5df4] to-[#6d9ee8]"
              />
            </div>
    
            <div className="mt-2 flex items-center justify-between">
              <span
                className={`text-[6px] font-semibold uppercase tracking-[0.15em] ${
                  active
                    ? 'text-[#6f5df4]'
                    : 'text-foreground/30'
                }`}
              >
                {active
                  ? 'Collapse to system'
                  : inspecting
                    ? 'Switch workspace'
                    : 'Explore'}
              </span>
    
              <motion.span
                animate={
                  !reduceMotion && !active
                    ? {
                        x: [0, 2, 0],
                        y: [0, -2, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 1.7,
                  repeat: Infinity,
                }}
                className="text-[10px] text-foreground/35"
              >
                {active ? '↙' : '↗'}
              </motion.span>
            </div>
          </motion.button>
        );
      })}
    
      {/* ===================================================
          ACTIVE WORKSPACE — UNFOLDS FROM MODULE
          =================================================== */}
    
      <AnimatePresence mode="wait">
        {activePlanModule >= 0 && (
          <motion.div
            key={`plan-unfold-${activePlanModule}`}
            /*
              Different initial vectors make each workspace feel
              as if it physically originates from its own node.
            */
            initial={
              reduceMotion
                ? {
                    opacity: 0,
                  }
                : activePlanModule === 0
                  ? {
                      opacity: 0,
                      x: -360,
                      y: -120,
                      scale: 0.24,
                      rotateY: -11,
                      rotateX: 5,
                      clipPath:
                        'inset(42% 44% 42% 44% round 18px)',
                      filter: 'blur(5px)',
                    }
                  : activePlanModule === 1
                    ? {
                        opacity: 0,
                        x: 350,
                        y: -120,
                        scale: 0.24,
                        rotateY: 11,
                        rotateX: 5,
                        clipPath:
                          'inset(42% 44% 42% 44% round 18px)',
                        filter: 'blur(5px)',
                      }
                    : {
                        opacity: 0,
                        x: 0,
                        y: 210,
                        scale: 0.24,
                        rotateX: -9,
                        rotateY: 0,
                        clipPath:
                          'inset(42% 44% 42% 44% round 18px)',
                        filter: 'blur(5px)',
                      }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              clipPath: 'inset(0% 0% 0% 0% round 22px)',
              filter: 'blur(0px)',
            }}
            exit={
              reduceMotion
                ? {
                    opacity: 0,
                  }
                : activePlanModule === 0
                  ? {
                      opacity: 0,
                      x: -260,
                      y: -80,
                      scale: 0.42,
                      rotateY: -7,
                      clipPath:
                        'inset(34% 38% 34% 38% round 18px)',
                      filter: 'blur(4px)',
                    }
                  : activePlanModule === 1
                    ? {
                        opacity: 0,
                        x: 260,
                        y: -80,
                        scale: 0.42,
                        rotateY: 7,
                        clipPath:
                          'inset(34% 38% 34% 38% round 18px)',
                        filter: 'blur(4px)',
                      }
                    : {
                        opacity: 0,
                        y: 150,
                        scale: 0.42,
                        rotateX: -6,
                        clipPath:
                          'inset(34% 38% 34% 38% round 18px)',
                        filter: 'blur(4px)',
                      }
            }
            transition={{
              duration: reduceMotion ? 0.18 : 0.68,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformPerspective: 1500,
              transformOrigin:
                activePlanModule === 0
                  ? '0% 0%'
                  : activePlanModule === 1
                    ? '100% 0%'
                    : '50% 100%',
            }}
            className="absolute bottom-[25px] right-[3%] top-[28px] z-40 w-[69%]"
          >
            {/* layered plane behind interface */}
    
            <motion.div
              aria-hidden="true"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.9,
                    }
              }
              animate={{
                opacity: 0.7,
                scale: 1,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.22,
                duration: 0.5,
              }}
              className="absolute inset-x-7 -bottom-2 top-4 -z-10 rounded-[1.4rem] border border-[#6f5df4]/10 bg-white/30 shadow-[0_25px_70px_rgba(111,93,244,.08)]"
            />
    
            <div className="flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#6f5df4]/20 bg-[#f8f5ff]/95 shadow-[0_30px_90px_rgba(70,52,120,.16)] backdrop-blur-2xl">
              {/* moving signal across top edge */}
    
              <div className="relative h-[2px] overflow-hidden bg-[#6f5df4]/10">
                {!reduceMotion && (
                  <motion.div
                    animate={{
                      x: ['-20%', '520%'],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute top-0 h-full w-[20%] bg-gradient-to-r from-transparent via-[#6d9ee8] to-transparent"
                  />
                )}
              </div>
    
              {/* WORKSPACE HEADER */}
    
              <div className="flex items-center justify-between gap-5 border-b border-foreground/8 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.25, 1],
                            opacity: [0.5, 1, 0.5],
                          }
                    }
                    transition={{
                      duration: 1.7,
                      repeat: Infinity,
                    }}
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d9ee8] shadow-[0_0_10px_rgba(109,158,232,.65)]"
                  />
    
                  <div className="min-w-0">
                    <p className="text-[6px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                      {planModules[activePlanModule].number} /{' '}
                      {planModules[activePlanModule].eyebrow}
                    </p>
    
                    <p className="mt-0.5 truncate text-[8px] font-medium text-foreground/45">
                      Event → {planModules[activePlanModule].label} workspace
                    </p>
                  </div>
                </div>
    
                <button
                  type="button"
                  onClick={() => setActivePlanModule(-1)}
                  className="group flex shrink-0 items-center gap-2 rounded-full border border-foreground/10 bg-white/55 px-3 py-2 transition hover:border-[#6f5df4]/25 hover:bg-white/80"
                >
                  <span className="text-[8px] text-[#6f5df4]">
                    ↙
                  </span>
    
                  <span className="text-[6px] font-semibold uppercase tracking-[0.16em] text-foreground/40 transition-colors group-hover:text-[#6f5df4]">
                    Collapse to system
                  </span>
                </button>
              </div>
    
              {/* REAL INTERFACE */}
    
              <div className="relative min-h-0 flex-1 p-3">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(109,158,232,.07),transparent_38%)]"
                />
    
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.96,
                          y: 10,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.18,
                    duration: 0.48,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex h-full items-center justify-center overflow-hidden rounded-[1rem] border border-foreground/10 bg-white"
                >
                  <Image
                    src={planModules[activePlanModule].image}
                    alt={planModules[activePlanModule].alt}
                    width={1500}
                    height={950}
                    priority={activePlanModule === 0}
                    className="max-h-[350px] h-auto w-full object-contain"
                  />
    
                  {/* interface glass reflection */}
    
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      animate={{
                        x: ['-130%', '220%'],
                      }}
                      transition={{
                        duration: 4.8,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pointer-events-none absolute inset-y-0 w-[22%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                </motion.div>
              </div>
    
              {/* ATTACHED PRODUCT INFORMATION */}
    
              <div className="grid grid-cols-[1fr_auto] items-end gap-6 border-t border-foreground/8 px-4 py-3">
                <div>
                  <h4 className="font-serif text-lg tracking-[-0.035em] text-foreground">
                    {planModules[activePlanModule].title}
                  </h4>
    
                  <p className="mt-1 max-w-xl text-[8px] leading-4 text-muted-foreground">
                    {planModules[activePlanModule].description}
                  </p>
                </div>
    
                <div className="text-right">
                  <p className="text-[6px] font-semibold uppercase tracking-[0.16em] text-foreground/25">
                    {planModules[activePlanModule].metricLabel}
                  </p>
    
                  <p className="mt-1 text-[11px] font-semibold text-[#6f5df4]">
                    {planModules[activePlanModule].metric}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    
      {/* ===================================================
          SYSTEM VIEW CUE
          =================================================== */}
    
      <AnimatePresence>
        {activePlanModule < 0 && (
          <motion.div
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
            exit={{
              opacity: 0,
              y: 5,
            }}
            transition={{
              delay: 0.25,
              duration: 0.35,
            }}
            className="absolute bottom-4 left-5 z-20 flex items-center gap-2 rounded-full border border-foreground/8 bg-white/45 px-3 py-2 backdrop-blur-xl"
          >
            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.35, 1],
                      opacity: [0.35, 1, 0.35],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
              className="h-1 w-1 rounded-full bg-[#6f5df4]"
            />
    
            <span className="text-[6px] font-semibold uppercase tracking-[0.17em] text-foreground/35">
              Touch a module · watch the workspace unfold
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
          {/* =====================================================
              MOBILE / TABLET
              ===================================================== */}
    
          <div className="relative z-20 p-4 lg:hidden">
            {/* event core */}
    
            <div className="rounded-[1.3rem] border border-[#6f5df4]/20 bg-white/55 p-4 shadow-[0_14px_40px_rgba(71,55,120,.06)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[7px] font-semibold uppercase tracking-[0.19em] text-[#6f5df4]">
                    Event core
                  </p>
    
                  <h4 className="mt-2 font-serif text-xl tracking-[-0.035em] text-foreground">
                    Sophia & Ethan Wedding
                  </h4>
    
                  <p className="mt-1 text-[8px] text-muted-foreground">
                    Dec 12, 2026 · Colombo · 180 guests
                  </p>
                </div>
    
                <span className="rounded-full border border-emerald-600/10 bg-emerald-500/[0.06] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.15em] text-emerald-700/65">
                  Active
                </span>
              </div>
            </div>
    
            {/* mobile nodes */}
    
            <div className="mt-3 grid grid-cols-3 gap-2">
              {planModules.map((module, index) => {
                const active = activePlanModule === index;
    
                return (
                  <button
                    key={module.label}
                    type="button"
                    onClick={() =>
                      setActivePlanModule(
                        activePlanModule === index ? -1 : index
                      )
                    }
                    aria-pressed={active}
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      active
                        ? 'border-[#6f5df4]/35 bg-white/80 shadow-[0_10px_30px_rgba(111,93,244,.10)]'
                        : 'border-foreground/10 bg-white/40'
                    }`}
                  >
                    <span
                      className={`text-[7px] font-semibold uppercase tracking-[0.14em] ${
                        active
                          ? 'text-[#6f5df4]'
                          : 'text-foreground/40'
                      }`}
                    >
                      {module.label}
                    </span>
    
                    <p className="mt-2 text-[6px] font-semibold uppercase tracking-[0.13em] text-foreground/25">
                      {active ? 'Close' : 'Explore'} ↗
                    </p>
                  </button>
                );
              })}
            </div>
    
            {/* mobile reveal */}
    
            <AnimatePresence mode="wait">
              {activePlanModule >= 0 && (
                <motion.div
                  key={`mobile-${planModules[activePlanModule].image}`}
                  initial={
                    reduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          opacity: 0,
                          y: 12,
                          scale: 0.98,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.985,
                  }}
                  transition={{
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-3 overflow-hidden rounded-[1.2rem] border border-[#6f5df4]/20 bg-white/65 p-2.5 shadow-[0_18px_50px_rgba(71,55,120,.09)] backdrop-blur-xl"
                >
                  <Image
                    src={planModules[activePlanModule].image}
                    alt={planModules[activePlanModule].alt}
                    width={1500}
                    height={950}
                    className="h-auto w-full rounded-[0.9rem] border border-foreground/10 object-contain"
                  />
    
                  <div className="px-2 pb-2 pt-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
                        {planModules[activePlanModule].eyebrow}
                      </span>
    
                      <span className="text-[8px] font-semibold text-[#6f5df4]">
                        {planModules[activePlanModule].metric}
                      </span>
                    </div>
    
                    <h4 className="mt-2 font-serif text-xl tracking-[-0.035em] text-foreground">
                      {planModules[activePlanModule].title}
                    </h4>
    
                    <p className="mt-2 text-[9px] leading-5 text-muted-foreground">
                      {planModules[activePlanModule].description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
    
          {/* bottom system rail */}
    
          <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 px-5 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="text-[6px] font-semibold uppercase tracking-[0.16em] text-foreground/25">
                Event
              </span>
    
              <span className="text-[8px] text-foreground/20">→</span>
    
              <span
                className={`text-[6px] font-semibold uppercase tracking-[0.16em] ${
                  activePlanModule >= 0
                    ? 'text-[#6f5df4]'
                    : 'text-foreground/30'
                }`}
              >
                {activePlanModule >= 0
                  ? planModules[activePlanModule].label
                  : 'Planning modules'}
              </span>
            </div>
    
            <span className="text-[6px] font-semibold uppercase tracking-[0.16em] text-foreground/20">
              One event · connected workspaces
            </span>
          </div>
        </div>
      </Container>
    </section>
      );
}