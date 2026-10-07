'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowDown,
  ArrowUpRight,
} from 'lucide-react';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { HeroSystemField } from '@/components/sections/hero/hero-system-field';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/data/site';

type ArchitectureLayer =
  | 'interface'
  | 'backend'
  | 'systems'
  | null;

type HeroAction =
  | 'work'
  | 'resume'
  | 'github'
  | null;  

const architectureDetails = {
  interface: {
    number: '01',
    eyebrow: 'Interface',
    title: 'Product surfaces',
    description:
      'The part people see, navigate, and interact with.',
    meta: 'Interaction · hierarchy · states',
  },

  backend: {
    number: '02',
    eyebrow: 'Application',
    title: 'Product logic',
    description:
      'The services and data flow that make the interface work.',
    meta: 'APIs · services · data flow',
  },

  systems: {
    number: '03',
    eyebrow: 'Connected system',
    title: 'The pieces working together',
    description:
      'How interface, application logic, and data connect as one product.',
    meta: 'Architecture · state · reliability',
  },
} as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const [activeLayer, setActiveLayer] =
    useState<ArchitectureLayer>(null);

  const [signalPointer, setSignalPointer] =
    useState({
      x: 50,
      y: 50,
      active: false,
    });

  const [peekActive, setPeekActive] =
    useState(false);

  const [peekPointer, setPeekPointer] =
    useState({
      x: 0,
      y: 0,
    });

  const [activeAction, setActiveAction] =
  useState<HeroAction>(null);  

  const activeArchitecture =
    activeLayer !== null
      ? architectureDetails[activeLayer]
      : null;

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-soft-lavender py-20 sm:py-24 lg:flex lg:items-center lg:py-20"
      onPointerMove={(event) => {
        if (reduceMotion) return;

        const bounds =
          event.currentTarget.getBoundingClientRect();

        setSignalPointer({
          x:
            ((event.clientX - bounds.left) /
              bounds.width) *
            100,
          y:
            ((event.clientY - bounds.top) /
              bounds.height) *
            100,
          active: true,
        });
      }}
      onPointerLeave={() => {
        setSignalPointer((current) => ({
          ...current,
          active: false,
        }));
      }}
    >

{/* ================================================================ */}
{/* BACKGROUND / SPATIAL SYSTEM                                      */}
{/* ================================================================ */}

<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0"
>
  {/* -------------------------------------------------------------- */}
  {/* CASE-STUDY ATMOSPHERE                                          */}
  {/* -------------------------------------------------------------- */}

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(124,108,242,0.085),transparent_26%),radial-gradient(circle_at_60%_78%,rgba(109,158,232,0.045),transparent_30%)]" />

  <div className="absolute -right-[8%] top-[2%] h-[38rem] w-[38rem] rounded-full bg-soft-violet/[0.055] blur-[150px]" />

  <div className="absolute bottom-[-22%] left-[28%] h-[32rem] w-[32rem] rounded-full bg-soft-blue/[0.055] blur-[160px]" />

  {/* -------------------------------------------------------------- */}
  {/* POINTER ENERGY                                                  */}
  {/* -------------------------------------------------------------- */}

  <motion.div
    animate={{
      opacity:
        signalPointer.active &&
        !reduceMotion
          ? 1
          : 0,
    }}
    transition={{
      opacity: {
        duration: 0.45,
        ease: 'easeOut',
      },
    }}
    className="absolute h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
    style={{
      left: `${signalPointer.x}%`,
      top: `${signalPointer.y}%`,
      background:
        'radial-gradient(circle, rgba(124,108,242,0.085) 0%, rgba(111,93,244,0.038) 38%, transparent 70%)',
      filter: 'blur(26px)',
    }}
  />

  {/* -------------------------------------------------------------- */}
  {/* GLOBAL SIGNAL ROUTE                                             */}
  {/* -------------------------------------------------------------- */}

  <svg
    viewBox="0 0 1440 760"
    preserveAspectRatio="none"
    className="absolute inset-0 hidden h-full w-full lg:block"
  >
    <defs>
      <linearGradient
        id="hero-global-route"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop
          offset="0%"
          stopColor="#7c6cf2"
          stopOpacity="0"
        />

        <stop
          offset="34%"
          stopColor="#7c6cf2"
          stopOpacity="0.08"
        />

        <stop
          offset="68%"
          stopColor="#7c6cf2"
          stopOpacity="0.19"
        />

        <stop
          offset="100%"
          stopColor="#6d9ee8"
          stopOpacity="0"
        />
      </linearGradient>

      <linearGradient
  id="hero-global-pulse"
  x1="0%"
  y1="0%"
  x2="100%"
  y2="0%"
>
  <stop
    offset="0%"
    stopColor="#6957e8"
    stopOpacity="0"
  />

  <stop
    offset="42%"
    stopColor="#6957e8"
    stopOpacity="0.72"
  />

  <stop
    offset="56%"
    stopColor="#8b7cff"
    stopOpacity="1"
  />

  <stop
    offset="70%"
    stopColor="#6957e8"
    stopOpacity="0.72"
  />

  <stop
    offset="100%"
    stopColor="#6957e8"
    stopOpacity="0"
  />
</linearGradient>

      <filter
        id="hero-global-glow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feGaussianBlur
          stdDeviation="2"
          result="blur"
        />

        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* quiet line entering the spatial system */}

    <motion.path
      d="
        M80 570
        C285 540 390 470 560 485
        C700 498 775 565 900 545
        C1010 528 1090 465 1170 420
      "
      fill="none"
      stroke="url(#hero-global-route)"
      strokeLinecap="round"
      animate={{
        strokeWidth:
          signalPointer.active &&
          !reduceMotion
            ? 1.35
            : 0.9,
        opacity:
          activeLayer !== null
            ? 0.95
            : 0.58,
      }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
    />

    {!reduceMotion && (
      <motion.path
        d="
          M80 570
          C285 540 390 470 560 485
          C700 498 775 565 900 545
          C1010 528 1090 465 1170 420
        "
        fill="none"
        stroke="url(#hero-global-pulse)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="42 520"
        filter="url(#hero-global-glow)"
        animate={{
          strokeDashoffset: [
            560,
            -560,
          ],
        }}
        transition={{
          duration:
            activeLayer !== null
              ? 4.8
              : 7.2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    )}


    {/* hand-off node into the portrait system */}

    {/* soft receiver bloom */}

<motion.circle
  cx="1170"
  cy="420"
  r="16"
  fill="#7c6cf2"
  filter="url(#hero-global-glow)"
  animate={
    reduceMotion
      ? {
          opacity: 0.05,
          scale: 1,
        }
      : {
          opacity:
            activeLayer !== null
              ? [0.03, 0.13, 0.03]
              : [0.015, 0.07, 0.015],

          scale:
            activeLayer !== null
              ? [0.82, 1.2, 0.82]
              : [0.9, 1.08, 0.9],
        }
  }
  transition={{
    duration:
      activeLayer !== null
        ? 2.4
        : 4.2,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
  style={{
    transformOrigin: '1170px 420px',
  }}
/>

{/* receiver ripple */}

<motion.circle
  cx="1170"
  cy="420"
  r="7"
  fill="none"
  stroke="#7c6cf2"
  strokeWidth="1"
  animate={
    reduceMotion
      ? {
          opacity: 0.12,
          scale: 1,
        }
      : {
          opacity:
            activeLayer !== null
              ? [0, 0.32, 0]
              : [0, 0.16, 0],

          scale:
            activeLayer !== null
              ? [0.65, 1.75, 2.1]
              : [0.72, 1.4, 1.7],
        }
  }
  transition={{
    duration:
      activeLayer !== null
        ? 2.4
        : 4.2,
    repeat: Infinity,
    ease: 'easeOut',
  }}
  style={{
    transformOrigin: '1170px 420px',
  }}
/>

{/* tiny inner receiver */}

<motion.circle
  cx="1170"
  cy="420"
  r="5"
  fill="none"
  stroke="#8b7cff"
  strokeWidth="0.75"
  animate={{
    opacity:
      activeLayer !== null
        ? 0.36
        : 0.16,

    scale:
      activeLayer !== null
        ? 1.08
        : 1,
  }}
  transition={{
    duration: 0.45,
    ease: 'easeOut',
  }}
  style={{
    transformOrigin: '1170px 420px',
  }}
/>

    <motion.circle
      cx="1170"
      cy="420"
      r="3"
      fill="#7c6cf2"
      animate={
        reduceMotion
          ? {
              opacity: 0.42,
            }
          : {
              opacity:
                activeLayer !== null
                  ? [0.35, 0.95, 0.35]
                  : [0.18, 0.45, 0.18],
              scale:
                activeLayer !== null
                  ? [1, 1.35, 1]
                  : [1, 1.15, 1],
            }
      }
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        transformOrigin:
          '1170px 420px',
      }}
    />
  </svg>
</div>

{/* ================================================================ */}
{/* CONTENT                                                          */}
{/* ================================================================ */}

<Container className="relative z-10 w-full">
  <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] lg:gap-10 xl:gap-16">
    {/* ============================================================ */}
    {/* LEFT — IDENTITY                                              */}
    {/* ============================================================ */}

    <div className="relative">
      {/* small system marker */}

      {/* ======================================================== */}
      {/* SIGNATURE / PEEK EASTER EGG                              */}
      {/* ======================================================== */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 22,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative -ml-3 mt-5 h-[300px] w-[108%] overflow-visible sm:-ml-6 sm:h-[350px] sm:w-[116%] lg:-ml-14 lg:mt-6 lg:h-[400px] lg:w-[128%] lg:-translate-x-14 lg:-translate-y-12"
      >
        {/* ------------------------------------------------------ */}
        {/* PEEK CHARACTER                                         */}
        {/* ------------------------------------------------------ */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-visible"
        >
          <motion.div
            initial={false}
            animate={
              peekActive
                ? {
                    opacity: 1,
                    x: reduceMotion
                      ? 0
                      : peekPointer.x,
                    y: reduceMotion
                      ? 0
                      : peekPointer.y,
                    rotate: reduceMotion
                      ? 0
                      : -1.2,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    x: 0,
                    y: reduceMotion
                      ? 0
                      : 72,
                    rotate: reduceMotion
                      ? 0
                      : -3,
                    scale: reduceMotion
                      ? 1
                      : 0.96,
                  }
            }
            transition={
              reduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    opacity: {
                      duration: 0.2,
                    },
                    x: {
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    y: {
                      type: 'spring',
                      stiffness: 190,
                      damping: 20,
                      mass: 0.72,
                    },
                    rotate: {
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    scale: {
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
            }
            className="
              absolute
              bottom-[78%]
              left-[28%]
              h-[55%]
              w-[32%]
              origin-bottom
              sm:bottom-[77%]
              sm:left-[28%]
              sm:h-[50%]
              sm:w-[32%]
              lg:bottom-[73%]
              lg:left-[29%]
              lg:h-[59%]
              lg:w-[32%]
            "
          >
            <Image
              src="/images/naily-signature-peek.png"
              alt=""
              fill
              sizes="(max-width: 640px) 220px, 300px"
              className="object-contain object-bottom"
            />
          </motion.div>

          {/* ---------------------------------------------------- */}
          {/* LITTLE GREETING                                      */}
          {/* ---------------------------------------------------- */}

<AnimatePresence>
  {peekActive && (
    <motion.div
      initial={
        reduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
              x: -6,
              y: 8,
              scale: 0.94,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      exit={
        reduceMotion
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              x: -3,
              y: 4,
              scale: 0.97,
            }
      }
      transition={{
        delay: reduceMotion ? 0 : 0.18,
        duration: reduceMotion ? 0 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        bottom-[114%]
        left-[53%]
        rotate-[15deg]
        whitespace-nowrap
        sm:bottom-[115%]
        sm:left-[55%]
        lg:bottom-[115%]
        lg:left-[56%]
      "
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -2, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="
          relative
          rounded-full
          border
          border-foreground/[0.10]
          bg-background/80
          px-4
          py-2
          shadow-[0_8px_30px_rgba(30,20,60,0.08)]
          backdrop-blur-md
        "
      >
        {/* tiny violet accent */}
        <span
          aria-hidden="true"
          className="
            absolute
            -left-1
            top-1/2
            h-2
            w-2
            -translate-y-1/2
            rounded-full
            bg-soft-violet/70
            shadow-[0_0_10px_rgba(139,92,246,0.35)]
          "
        />

        <span className="font-serif text-[0.94rem] italic tracking-[-0.015em] text-foreground/75 sm:text-[1rem]">
          oh, hello.
        </span>

        {/* tiny connector toward the cutout */}
        <span
          aria-hidden="true"
          className="
            absolute
            -bottom-[5px]
            left-[22%]
            h-[9px]
            w-[9px]
            rotate-45
            border-b
            border-r
            border-foreground/[0.08]
            bg-background/80
          "
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        </div>

        {/* ------------------------------------------------------ */}
        {/* ORIGINAL SIGNATURE — FOREGROUND                        */}
        {/* ------------------------------------------------------ */}

        <div className="pointer-events-none absolute inset-0 z-20">
          <Image
            src="/images/naily-signature.png"
            alt="Naily Ashvitha"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 1000px"
            className="object-contain object-left"
          />
        </div>

        {/* ------------------------------------------------------ */}
        {/* GLASSES HOTSPOT                                        */}
        {/* ------------------------------------------------------ */}

        <button
          type="button"
          aria-label="Say hello to Naily"
          aria-expanded={peekActive}
          onPointerEnter={() => {
            setPeekActive(true);
          }}
          onPointerLeave={() => {
            setPeekActive(false);

            setPeekPointer({
              x: 0,
              y: 0,
            });
          }}
          onPointerMove={(event) => {
            if (reduceMotion) return;

            const bounds =
              event.currentTarget.getBoundingClientRect();

            const x =
              (event.clientX - bounds.left) /
              bounds.width;

            const y =
              (event.clientY - bounds.top) /
              bounds.height;

            setPeekPointer({
              x: (x - 0.5) * 5,
              y: (y - 0.5) * 3,
            });
          }}
          onFocus={() => {
            setPeekActive(true);
          }}
          onBlur={() => {
            setPeekActive(false);

            setPeekPointer({
              x: 0,
              y: 0,
            });
          }}
          onClick={() => {
            setPeekActive(
              (current) => !current,
            );
          }}
          className="
            absolute
            bottom-[9%]
            left-[17%]
            z-30
            h-[37%]
            w-[18%]
            cursor-pointer
            rounded-[45%]
            bg-transparent
            outline-none
            focus-visible:ring-1
            focus-visible:ring-soft-violet/35
            sm:bottom-[8%]
            sm:left-[17%]
            sm:h-[38%]
            sm:w-[17%]
            lg:bottom-[8%]
            lg:left-[18%]
            lg:h-[39%]
            lg:w-[16%]
          "
        >
          <span className="sr-only">
            Reveal a small hello
          </span>
        </button>
      </motion.div>


{/* ---------------------------------------------------------- */}
{/* INTERACTIVE POSITIONING STATEMENT                          */}
{/* ---------------------------------------------------------- */}
<div className="relative lg:translate-y-35">
<motion.div
  initial={
    reduceMotion
      ? false
      : {
          opacity: 0,
          y: 16,
        }
  }
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.27,
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative mt-3 max-w-[39rem]"
>
  <p className="text-balance text-[1.25rem] leading-[1.55] tracking-[-0.02em] text-foreground/70 sm:text-[1.38rem]">
    I build across the{' '}

    {/* ====================================================== */}
    {/* INTERFACE                                               */}
    {/* ====================================================== */}

    <button
      type="button"
      onMouseEnter={() =>
        setActiveLayer('interface')
      }
      onMouseLeave={() =>
        setActiveLayer(null)
      }
      onFocus={() =>
        setActiveLayer('interface')
      }
      onBlur={() =>
        setActiveLayer(null)
      }
      onClick={() =>
        setActiveLayer((current) =>
          current === 'interface'
            ? null
            : 'interface',
        )
      }
      aria-pressed={
        activeLayer === 'interface'
      }
      className={[
        'group relative inline-flex cursor-pointer items-center font-medium outline-none transition-colors duration-300',
        activeLayer === 'interface'
          ? 'text-soft-violet'
          : 'text-foreground hover:text-soft-violet',
      ].join(' ')}
    >
      interface

      <motion.span
        aria-hidden="true"
        animate={{
          scaleX:
            activeLayer === 'interface'
              ? 1
              : 0,
          opacity:
            activeLayer === 'interface'
              ? 1
              : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-soft-violet"
      />

      <motion.span
        aria-hidden="true"
        animate={{
          scale:
            activeLayer === 'interface'
              ? 1
              : 0,
          opacity:
            activeLayer === 'interface'
              ? 1
              : 0,
        }}
        className="absolute -right-2 top-0 h-1 w-1 rounded-full bg-soft-violet"
      />
    </button>

    ,{' '}

    {/* ====================================================== */}
    {/* BACKEND / APPLICATION                                   */}
    {/* ====================================================== */}

    <button
      type="button"
      onMouseEnter={() =>
        setActiveLayer('backend')
      }
      onMouseLeave={() =>
        setActiveLayer(null)
      }
      onFocus={() =>
        setActiveLayer('backend')
      }
      onBlur={() =>
        setActiveLayer(null)
      }
      onClick={() =>
        setActiveLayer((current) =>
          current === 'backend'
            ? null
            : 'backend',
        )
      }
      aria-pressed={
        activeLayer === 'backend'
      }
      className={[
        'group relative inline-flex cursor-pointer items-center font-medium outline-none transition-colors duration-300',
        activeLayer === 'backend'
          ? 'text-soft-violet'
          : 'text-foreground hover:text-soft-violet',
      ].join(' ')}
    >
      backend

      <motion.span
        aria-hidden="true"
        animate={{
          scaleX:
            activeLayer === 'backend'
              ? 1
              : 0,
          opacity:
            activeLayer === 'backend'
              ? 1
              : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-soft-violet"
      />

      <motion.span
        aria-hidden="true"
        animate={{
          scale:
            activeLayer === 'backend'
              ? 1
              : 0,
          opacity:
            activeLayer === 'backend'
              ? 1
              : 0,
        }}
        className="absolute -right-2 top-0 h-1 w-1 rounded-full bg-soft-violet"
      />
    </button>

    , and the{' '}

    {/* ====================================================== */}
    {/* CONNECTED SYSTEM                                        */}
    {/* ====================================================== */}

    <button
      type="button"
      onMouseEnter={() =>
        setActiveLayer('systems')
      }
      onMouseLeave={() =>
        setActiveLayer(null)
      }
      onFocus={() =>
        setActiveLayer('systems')
      }
      onBlur={() =>
        setActiveLayer(null)
      }
      onClick={() =>
        setActiveLayer((current) =>
          current === 'systems'
            ? null
            : 'systems',
        )
      }
      aria-pressed={
        activeLayer === 'systems'
      }
      className={[
        'group relative inline-flex cursor-pointer items-center font-medium outline-none transition-colors duration-300',
        activeLayer === 'systems'
          ? 'text-soft-violet'
          : 'text-foreground hover:text-soft-violet',
      ].join(' ')}
    >
      systems in between

      <motion.span
        aria-hidden="true"
        animate={{
          scaleX:
            activeLayer === 'systems'
              ? 1
              : 0,
          opacity:
            activeLayer === 'systems'
              ? 1
              : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gradient-to-r from-soft-violet via-soft-violet to-cool-blue"
      />

      <motion.span
        aria-hidden="true"
        animate={{
          scale:
            activeLayer === 'systems'
              ? 1
              : 0,
          opacity:
            activeLayer === 'systems'
              ? 1
              : 0,
        }}
        className="absolute -right-2 top-0 h-1 w-1 rounded-full bg-soft-violet"
      />
    </button>

    .
  </p>

{/* ---------------------------------------------------------- */}
{/* INTERACTION HINT                                           */}
{/* ---------------------------------------------------------- */}

<div className="mt-4 flex min-h-[18px] items-center gap-2">
  <motion.span
    animate={{
      backgroundColor:
        activeLayer !== null
          ? '#7c6cf2'
          : 'rgba(124,108,242,0.28)',
      scale:
        activeLayer !== null
          ? 1.15
          : 1,
    }}
    transition={{
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="h-1.5 w-1.5 rounded-full"
  />

  <AnimatePresence mode="wait">
    <motion.span
      key={activeLayer ?? 'idle'}
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
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: -3,
            }
      }
      transition={{
        duration: reduceMotion
          ? 0
          : 0.22,
      }}
      className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/45"
    >
      {activeLayer === 'interface'
        ? 'Interface layer active'
        : activeLayer === 'backend'
          ? 'Application layer active'
          : activeLayer === 'systems'
            ? 'Connected system active'
            : 'Explore the highlighted words'}
    </motion.span>
  </AnimatePresence>

  <span className="h-px w-8 bg-gradient-to-r from-soft-violet/25 to-transparent" />
</div>
</motion.div>
</div>
      {/* actions */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 12,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.38,
          duration: 0.6,
        }}
        className="mt-40 flex flex-wrap gap-3"
      >
{/* ======================================================== */}
{/* WORK CTA — MAGNETIC DEPTH                                */}
{/* ======================================================== */}

<motion.div
  onPointerEnter={() => {
    setActiveAction('work');
  }}
  onPointerLeave={(event) => {
    setActiveAction(null);

    event.currentTarget.style.setProperty(
      '--work-x',
      '0px',
    );

    event.currentTarget.style.setProperty(
      '--work-y',
      '0px',
    );

    event.currentTarget.style.setProperty(
      '--work-light-x',
      '50%',
    );

    event.currentTarget.style.setProperty(
      '--work-light-y',
      '50%',
    );
  }}
  onFocusCapture={() => {
    setActiveAction('work');
  }}
  onBlurCapture={() => {
    setActiveAction(null);
  }}
  onPointerMove={(event) => {
    if (reduceMotion) return;

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) /
      bounds.width;

    const y =
      (event.clientY - bounds.top) /
      bounds.height;

    event.currentTarget.style.setProperty(
      '--work-x',
      `${(x - 0.5) * 5}px`,
    );

    event.currentTarget.style.setProperty(
      '--work-y',
      `${(y - 0.5) * 3}px`,
    );

    event.currentTarget.style.setProperty(
      '--work-light-x',
      `${x * 100}%`,
    );

    event.currentTarget.style.setProperty(
      '--work-light-y',
      `${y * 100}%`,
    );
  }}
  animate={{
    x:
      activeAction === 'work' && !reduceMotion
        ? 'var(--work-x, 0px)'
        : '0px',

    y:
      activeAction === 'work' && !reduceMotion
        ? 'var(--work-y, 0px)'
        : '0px',
  }}
  transition={{
    type: 'spring',
    stiffness: 320,
    damping: 24,
    mass: 0.55,
  }}
  className="
    relative
    z-10
    [perspective:700px]
  "
>
  <motion.div
    initial={false}
    animate={{
      rotateX:
        activeAction === 'work' && !reduceMotion
          ? -2
          : 0,

      rotateY:
        activeAction === 'work' && !reduceMotion
          ? 2
          : 0,

      scale:
        activeAction === 'work' && !reduceMotion
          ? 1.025
          : 1,
    }}
    whileTap={
      reduceMotion
        ? undefined
        : {
            scale: 0.985,
          }
    }
    transition={{
      type: 'spring',
      stiffness: 360,
      damping: 26,
      mass: 0.55,
    }}
    style={{
      transformStyle: 'preserve-3d',
    }}
  >
    <Link
      href="#work"
      className="
        group
        relative
        inline-flex
        items-center
        gap-2
        overflow-hidden
        rounded-full
        bg-foreground
        px-5
        py-3
        text-sm
        font-semibold
        text-background
        shadow-[0_8px_26px_rgba(20,18,32,0.08)]
        transition-shadow
        duration-300
        hover:shadow-[0_13px_34px_rgba(74,58,160,0.16)]
      "
    >
      {/* cursor-following internal light */}

      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          opacity:
            activeAction === 'work'
              ? 1
              : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.25,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            'radial-gradient(circle at var(--work-light-x, 50%) var(--work-light-y, 50%), rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 20%, transparent 52%)',
        }}
      />

      {/* subtle edge response */}

      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          opacity:
            activeAction === 'work'
              ? 1
              : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.3,
        }}
        className="
          pointer-events-none
          absolute
          inset-[1px]
          rounded-full
          border
          border-white/[0.10]
        "
      />

      <span
        className="
          relative
          z-10
          [transform:translateZ(8px)]
        "
      >
        View my work
      </span>

      <motion.span
        className="
          relative
          z-10
          inline-flex
          [transform:translateZ(10px)]
        "
        animate={{
          y:
            activeAction === 'work'
              ? 3
              : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 360,
          damping: 19,
        }}
      >
        <ArrowDown size={16} />
      </motion.span>
    </Link>
  </motion.div>
</motion.div>

        <Link
  href="/Naily_Ashvitha_CV.pdf"
  target="_blank"
  rel="noreferrer"
  aria-label="Open Naily Ashvitha's resume"
  className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/50 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-soft-violet/50 hover:bg-soft-violet/[0.05]"
>
  Resume

  <ArrowUpRight
    size={16}
    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  />
</Link>

        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/50 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-cool-blue/50 hover:bg-cool-blue/[0.05]"
        >
          GitHub

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </div>


{/* ============================================================ */}
{/* RIGHT — NAILY / LIVING SYSTEM                                */}
{/* ============================================================ */}

<motion.div
  initial={
    reduceMotion
      ? false
      : {
          opacity: 0,
          x: 24,
        }
  }
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    delay: 0.22,
    duration: 0.85,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    relative
    mx-auto
    w-full
    max-w-[620px]
    lg:-mr-10
    lg:ml-auto
    xl:-mr-16
  "
>
  {/* ========================================================== */}
  {/* LIVING SYSTEM STAGE                                       */}
  {/* ========================================================== */}

  <motion.div
    onPointerMove={(event) => {
      if (reduceMotion) return;

      const bounds =
        event.currentTarget.getBoundingClientRect();

      const x =
        (event.clientX - bounds.left) /
        bounds.width;

      const y =
        (event.clientY - bounds.top) /
        bounds.height;

      event.currentTarget.style.setProperty(
        '--naily-x',
        `${(x - 0.5) * 5}px`,
      );

      event.currentTarget.style.setProperty(
        '--naily-y',
        `${(y - 0.5) * 4}px`,
      );
    }}
    onPointerLeave={(event) => {
      event.currentTarget.style.setProperty(
        '--naily-x',
        '0px',
      );

      event.currentTarget.style.setProperty(
        '--naily-y',
        '0px',
      );
    }}
className="
      group/naily
      relative
      mt-2
      h-[500px]
      w-full
      sm:mt-3
      sm:h-[570px]
      lg:mt-0
      lg:h-[720px]
      xl:h-[750px]
    "
  >
    {/* -------------------------------------------------------- */}
    {/* ATMOSPHERIC FIELD                                       */}
    {/* -------------------------------------------------------- */}

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-16 -inset-y-10"
    >
      <div
        className="
          absolute
          left-[15%]
          top-[13%]
          h-[62%]
          w-[70%]
          rounded-full
          bg-soft-violet/[0.055]
          blur-[80px]
        "
      />

      <div
        className="
          absolute
          bottom-[8%]
          right-[3%]
          h-[34%]
          w-[42%]
          rounded-full
          bg-cool-blue/[0.045]
          blur-[75px]
        "
      />

      <HeroSystemField
        activeLayer={activeLayer}
        pointer={signalPointer}
        reduceMotion={reduceMotion}
        className="opacity-70"
      />
    </div>

    {/* -------------------------------------------------------- */}
    {/* TOP SYSTEM RAIL                                         */}
    {/* -------------------------------------------------------- */}

    <div
      aria-hidden="true"
      className="
        absolute
        left-[4%]
        right-[3%]
        top-[3%]
        z-30
        hidden
        items-center
        gap-3
        lg:flex
      "
    >
      <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-soft-violet/70">
        Identity / Living System
      </span>

      <span className="h-px flex-1 bg-gradient-to-r from-soft-violet/30 via-soft-violet/[0.09] to-transparent" />

      <motion.span
        animate={
          reduceMotion
            ? undefined
            : {
                opacity:
                  activeLayer !== null
                    ? [0.45, 1, 0.45]
                    : [0.22, 0.5, 0.22],

                scale:
                  activeLayer !== null
                    ? [1, 1.35, 1]
                    : [1, 1.12, 1],
              }
        }
        transition={{
          duration:
            activeLayer !== null ? 1.7 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={[
          'h-1.5 w-1.5 rounded-full border transition-colors duration-300',
          activeLayer !== null
            ? 'border-soft-violet bg-soft-violet'
            : 'border-soft-violet/35 bg-soft-lavender',
        ].join(' ')}
      />
    </div>

        {/* ======================================================== */}
    {/* SOFTWARE ENGINEER — TYPOGRAPHIC DEPTH PLANE              */}
    {/* Experimental static composition                          */}
    {/* ======================================================== */}

    <motion.div
      aria-hidden="true"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: -18,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: 0.34,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        pointer-events-none
        absolute
        left-[-48%]
        top-[43%]
        z-[4]
        hidden
        w-[158%]
        -translate-y-1/2
        lg:block
      "
    >
      <div
        className="
          select-none
          font-sans
          text-[clamp(5rem,8.4vw,8.4rem)]
          font-black
          uppercase
          leading-[0.72]
          tracking-[-0.075em]
          text-foreground/[0.075]
        "
      >
        <div className="whitespace-nowrap">
          SOFTWARE
        </div>

        <div className="ml-[12%] mt-[0.16em] whitespace-nowrap">
          ENGINEER
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          absolute
          left-[7%]
          top-[48%]
          h-px
          w-[82%]
          bg-gradient-to-r
          from-transparent
          via-soft-violet/[0.16]
          to-transparent
        "
      />
    </motion.div>

    {/* ======================================================== */}
    {/* BACK SYSTEM — LIVES BEHIND NAILY                         */}
    {/* ======================================================== */}

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* ghost architecture plane */}

      <motion.div
        animate={{
          opacity:
            activeLayer === 'systems'
              ? 0.75
              : activeLayer !== null
                ? 0.42
                : 0.2,

          scale:
            activeLayer === 'systems'
              ? 1.02
              : 1,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          left-[9%]
          top-[16%]
          h-[67%]
          w-[82%]
          rounded-[46%]
          border
          border-soft-violet/[0.10]
        "
      />

      <motion.div
        animate={{
          opacity:
            activeLayer === 'backend'
              ? 0.8
              : activeLayer === 'systems'
                ? 0.58
                : 0.18,

          x:
            activeLayer === 'backend'
              ? 6
              : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          right-[8%]
          top-[24%]
          h-[49%]
          w-[57%]
          rounded-[44%]
          border
          border-cool-blue/[0.13]
        "
      />

      {/* LEFT → BEHIND NAILY route */}

      <svg
        viewBox="0 0 560 650"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <motion.path
          d="M 12 245 C 105 245, 118 188, 224 198 C 302 205, 327 265, 395 266"
          fill="none"
          stroke="rgba(124,108,242,0.18)"
          strokeWidth="1"
          strokeLinecap="round"
          animate={{
            pathLength:
              activeLayer === 'interface' ||
              activeLayer === 'systems'
                ? 1
                : 0.52,

            opacity:
              activeLayer === 'interface'
                ? 0.9
                : activeLayer === 'systems'
                  ? 0.7
                  : 0.3,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.path
          d="M 154 480 C 218 433, 280 435, 332 461 C 387 489, 431 470, 548 398"
          fill="none"
          stroke="rgba(109,158,232,0.18)"
          strokeWidth="1"
          strokeLinecap="round"
          animate={{
            pathLength:
              activeLayer === 'backend' ||
              activeLayer === 'systems'
                ? 1
                : 0.48,

            opacity:
              activeLayer === 'backend'
                ? 0.85
                : activeLayer === 'systems'
                  ? 0.65
                  : 0.24,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.path
          d="M 65 380 C 152 337, 230 356, 282 395 C 337 437, 402 423, 502 331"
          fill="none"
          stroke="rgba(124,108,242,0.12)"
          strokeWidth="1"
          strokeDasharray="3 8"
          animate={{
            opacity:
              activeLayer === 'systems'
                ? 0.85
                : 0.18,

            pathLength:
              activeLayer === 'systems'
                ? 1
                : 0.38,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      {/* idle/back nodes */}

      <motion.span
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.45, 1],
                opacity: [0.25, 0.6, 0.25],
              }
        }
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          left-[12%]
          top-[37%]
          h-2
          w-2
          rounded-full
          border
          border-soft-violet/35
          bg-soft-lavender
        "
      />

      <motion.span
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }
        }
        transition={{
          duration: 3.8,
          repeat: Infinity,
          delay: 0.7,
          ease: 'easeInOut',
        }}
        className="
          absolute
          right-[11%]
          top-[47%]
          h-1.5
          w-1.5
          rounded-full
          border
          border-cool-blue/40
          bg-soft-lavender
        "
      />
    </div>

    {/* ======================================================== */}
{/* IDLE IDENTITY CONSTELLATION                              */}
{/* ======================================================== */}

<AnimatePresence>
  {activeLayer === null && (
    <motion.div
      key="identity-constellation"
      aria-hidden="true"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
            }
      }
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
      }}
      className="
        pointer-events-none
        absolute
        inset-0
        z-30
        hidden
        lg:block
      "
    >
      {/* ---------------------------------------------------- */}
      {/* UNDERGRADUATE — upper left                           */}
      {/* ---------------------------------------------------- */}

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -4, 0],
              }
        }
        transition={{
          duration: 5.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          left-[-2%]
          top-[20%]
          w-[170px]
        "
      >
        <div className="mb-2 flex items-center gap-2">
          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.35, 0.9, 0.35],
                    scale: [1, 1.25, 1],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-soft-violet/70
              shadow-[0_0_12px_rgba(124,108,242,0.32)]
            "
          />

          <span className="h-px w-7 bg-soft-violet/20" />

          <span className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-soft-violet/60
          ">
            Undergraduate at
          </span>
        </div>

        <div className="pl-[42px]">
          <p className="
            font-serif
            text-[1.02rem]
            leading-none
            tracking-[-0.025em]
            text-foreground/80
          ">
            SLIIT Kandy UNI
          </p>
        </div>
      </motion.div>

      {/* ---------------------------------------------------- */}
      {/* SPECIALIZATION — upper right                         */}
      {/* ---------------------------------------------------- */}

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 4, 0],
                x: [0, 2, 0],
              }
        }
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
        className="
          absolute
          right-[-30%]
          top-[35%]
          w-[205px]
        "
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-cool-blue/65
          ">
            Specialization
          </span>

          <span className="h-px flex-1 bg-cool-blue/20" />

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.3, 0.85, 0.3],
                    scale: [1, 1.25, 1],
                  }
            }
            transition={{
              duration: 3.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-cool-blue/65
              shadow-[0_0_12px_rgba(109,158,232,0.28)]
            "
          />
        </div>

        <div
          className="
            border-l
            border-cool-blue/[0.18]
            py-1
            py-3
          "
        >
          <p className="
            text-[8px]
            leading-[1.45]
            tracking-[0.015em]
            text-muted-foreground/55
          ">
            BSc (Hons) Information Technology
          </p>

          <p className="
            mt-1
            font-serif
            text-[1rem]
            leading-none
            tracking-[-0.025em]
            text-foreground/80
          ">
            Software Engineering
          </p>
        </div>
      </motion.div>

      {/* ---------------------------------------------------- */}
      {/* CURRENTLY — lower right                              */}
      {/* ---------------------------------------------------- */}

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -3, 0],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        className="
  absolute
  bottom-[23%]
  left-[-1%]
  flex
  items-center
  gap-3
"
      >
        <div className="text-left">
          <p className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-soft-violet/55
          ">
            Currently in
          </p>

          <p className="
            mt-1
            font-serif
            text-[1.25rem]
            leading-none
            tracking-[-0.03em]
            text-foreground/75
          ">
            3Y2S
          </p>
        </div>

        <span className="h-px w-9 bg-soft-violet/20" />

        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.4, 1],
                  opacity: [0.35, 0.9, 0.35],
                }
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            h-2
            w-2
            rounded-full
            border
            border-soft-violet/45
            bg-soft-lavender
            shadow-[0_0_14px_rgba(124,108,242,0.22)]
          "
        />
      </motion.div>

      {/* ---------------------------------------------------- */}
      {/* IDENTITY CONNECTOR PATHS                             */}
      {/* ---------------------------------------------------- */}

      <svg
        viewBox="0 0 620 750"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          -z-10
          h-full
          w-full
          overflow-visible
        "
      >
        <motion.path
          d="M 112 184 C 170 191, 186 224, 238 238"
          fill="none"
          stroke="rgba(124,108,242,0.20)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 7"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.25, 0.6, 0.25],
              }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d="M 414 247 C 468 244, 506 229, 594 216"
          fill="none"
          stroke="rgba(109,158,232,0.20)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 8"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.2, 0.55, 0.2],
              }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d="M 34 565 C 105 552, 154 529, 224 518"
          fill="none"
          stroke="rgba(124,108,242,0.18)"
          strokeWidth="1"
          strokeLinecap="round"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.2, 0.5, 0.2],
              }
          }
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </motion.div>
  )}
</AnimatePresence>

    {/* ======================================================== */}
    {/* CONTEXTUAL REAR MODULES                                  */}
    {/* ======================================================== */}

    <AnimatePresence>
      {activeLayer === 'interface' && (
        <motion.div
          key="interface-rear"
          aria-hidden="true"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  x: -16,
                  scale: 0.96,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -10,
          }}
          transition={{
            duration: reduceMotion
              ? 0
              : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            pointer-events-none
            absolute
            left-[4%]
            top-[24%]
            z-[1]
            hidden
            w-[165px]
            rounded-[1.2rem]
            border
            border-soft-violet/[0.14]
            bg-background/[0.16]
            p-3
            backdrop-blur-[2px]
            sm:block
          "
        >
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-soft-violet/60" />
            <span className="h-1 w-8 rounded-full bg-soft-violet/15" />
          </div>

          <div className="mt-3 space-y-2">
            <span className="block h-2 w-[72%] rounded-full bg-soft-violet/[0.10]" />
            <span className="block h-2 w-full rounded-full bg-foreground/[0.035]" />

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <span className="h-8 rounded-lg border border-soft-violet/[0.10]" />
              <span className="h-8 rounded-lg border border-soft-violet/[0.10]" />
            </div>
          </div>
        </motion.div>
      )}

      {activeLayer === 'backend' && (
        <motion.div
          key="backend-rear"
          aria-hidden="true"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  x: 14,
                  scale: 0.96,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: 10,
          }}
          transition={{
            duration: reduceMotion
              ? 0
              : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            pointer-events-none
            absolute
            right-[3%]
            top-[29%]
            z-[1]
            hidden
            w-[160px]
            sm:block
          "
        >
          {[
            'REQUEST',
            'SERVICE',
            'DATA',
          ].map((label, index) => (
            <div
              key={label}
              className="relative mb-3 flex items-center gap-2"
            >
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [
                          0.3,
                          1,
                          0.3,
                        ],
                      }
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: index * 0.22,
                }}
                className="h-1.5 w-1.5 rounded-full bg-cool-blue/60"
              />

              <span className="text-[7px] font-semibold tracking-[0.18em] text-foreground/30">
                {label}
              </span>

              <span className="h-px flex-1 bg-cool-blue/[0.14]" />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>


{/* ======================================================== */}
{/* NAILY — MIDDLE DEPTH PLANE                               */}
{/* ======================================================== */}

<div
  className="
    pointer-events-none
    absolute
    bottom-[1%]
    left-1/2
    z-10
    h-[92%]
    w-[88%]
    -translate-x-1/2
    sm:bottom-0
    sm:left-1/2
    sm:h-[96%]
    sm:w-[90%]
    lg:-bottom-[6%]
    lg:left-[61%]
    lg:h-[108%]
    lg:w-[94%]
    xl:left-[62%]
    xl:h-[110%]
    xl:w-[96%]
  "
>
  <motion.div
    initial={
      reduceMotion
        ? false
        : {
            opacity: 0,
            y: 22,
            scale: 0.985,
          }
    }
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      delay: 0.28,
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    }}
    style={{
      x: 'var(--naily-x, 0px)',
      y: 'var(--naily-y, 0px)',
    }}
    className="relative h-full w-full"
  >
{/* ------------------------------------------------------ */}
{/* PORTRAIT ATMOSPHERIC INTEGRATION                       */}
{/* ------------------------------------------------------ */}

<div
  aria-hidden="true"
  className="
    pointer-events-none
    absolute
    bottom-[3%]
    left-[54%]
    h-[76%]
    w-[64%]
    -translate-x-1/2
  "
>
  {/* broad ambient violet field */}
  <motion.div
    animate={{
      opacity:
        activeLayer === 'systems'
          ? 0.82
          : activeLayer !== null
            ? 0.68
            : 0.52,

      scale:
        activeLayer === 'systems'
          ? 1.06
          : activeLayer !== null
            ? 1.03
            : 1,
    }}
    transition={{
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      absolute
      inset-[3%]
      rounded-[48%]
      bg-soft-violet/[0.075]
      blur-[72px]
    "
  />

  {/* concentrated light behind head / upper body */}
  <motion.div
    animate={{
      opacity:
        activeLayer !== null
          ? 0.72
          : 0.46,

      scale:
        activeLayer !== null
          ? 1.05
          : 1,
    }}
    transition={{
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      absolute
      left-[17%]
      top-[5%]
      h-[48%]
      w-[70%]
      rounded-full
      bg-soft-violet/[0.075]
      blur-[58px]
    "
  />

  {/* cool lower-depth atmosphere */}
  <motion.div
    animate={{
      opacity:
        activeLayer === 'backend'
          ? 0.68
          : activeLayer === 'systems'
            ? 0.6
            : 0.34,

      x:
        activeLayer === 'backend'
          ? 8
          : 0,
    }}
    transition={{
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      absolute
      bottom-[8%]
      right-[2%]
      h-[42%]
      w-[55%]
      rounded-full
      bg-cool-blue/[0.06]
      blur-[68px]
    "
  />

  {/* quiet inner illumination */}
  <motion.div
    animate={
      reduceMotion
        ? undefined
        : {
            opacity:
              activeLayer !== null
                ? [0.18, 0.3, 0.18]
                : [0.1, 0.17, 0.1],

            scale:
              activeLayer !== null
                ? [0.98, 1.04, 0.98]
                : [0.99, 1.015, 0.99],
          }
    }
    transition={{
      duration:
        activeLayer !== null
          ? 3.8
          : 6.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="
      absolute
      left-[28%]
      top-[19%]
      h-[38%]
      w-[48%]
      rounded-full
      bg-white/30
      blur-[70px]
    "
  />
</div>

{/* ------------------------------------------------------ */}
{/* PORTRAIT RADIANT SILHOUETTE                             */}
{/* ------------------------------------------------------ */}

<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 z-[6]"
>
  {/* wide violet radiance */}

  <motion.div
    animate={
      reduceMotion
        ? undefined
        : {
            opacity: [0.42, 0.62, 0.42],
            scale: [1, 1.008, 1],
          }
    }
    transition={{
      duration: 7.2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute inset-0"
  >
    <Image
      src="/images/naily-portrait-cutout.png"
      alt=""
      fill
      sizes="(max-width: 1024px) 94vw, 610px"
className="
  object-contain
  object-bottom
  opacity-75
  [filter:brightness(0)_invert(1)_drop-shadow(0_0_14px_rgba(255,255,255,0.92))_drop-shadow(0_0_34px_rgba(255,255,255,0.52))_drop-shadow(0_0_72px_rgba(255,255,255,0.24))]
"
    />
  </motion.div>

  {/* tighter pearl-lavender rim */}

  <motion.div
    animate={
      reduceMotion
        ? undefined
        : {
            opacity: [0.58, 0.82, 0.58],
          }
    }
    transition={{
      duration: 5.8,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute inset-0"
  >
    <Image
      src="/images/naily-portrait-cutout.png"
      alt=""
      fill
      sizes="(max-width: 1024px) 94vw, 610px"
className="
  object-contain
  object-bottom
  opacity-85
  [filter:brightness(0)_invert(1)_drop-shadow(0_0_3px_rgba(255,255,255,1))_drop-shadow(0_0_8px_rgba(255,255,255,0.92))_drop-shadow(0_0_18px_rgba(255,255,255,0.58))]
"
    />
  </motion.div>

  {/* ---------------------------------------------------- */}
  {/* RADIANT MICRO-SPARKS                                 */}
  {/* ---------------------------------------------------- */}

  {!reduceMotion && (
    <div className="absolute inset-0">
      {[
        {
          left: '31%',
          top: '23%',
          size: 3,
          delay: 0.2,
          duration: 3.8,
        },
        {
          left: '38%',
          top: '17%',
          size: 2,
          delay: 1.4,
          duration: 4.6,
        },
        {
          left: '52%',
          top: '13%',
          size: 2.5,
          delay: 0.8,
          duration: 4.1,
        },
        {
          left: '67%',
          top: '21%',
          size: 2,
          delay: 2.1,
          duration: 4.8,
        },
        {
          left: '73%',
          top: '33%',
          size: 3,
          delay: 1.1,
          duration: 4.3,
        },
        {
          left: '27%',
          top: '39%',
          size: 2,
          delay: 2.6,
          duration: 5,
        },
        {
          left: '76%',
          top: '49%',
          size: 2,
          delay: 0.5,
          duration: 4.7,
        },
        {
          left: '24%',
          top: '57%',
          size: 2.5,
          delay: 1.8,
          duration: 4.4,
        },
        {
          left: '72%',
          top: '64%',
          size: 2,
          delay: 3,
          duration: 5.2,
        },
        {
          left: '32%',
          top: '72%',
          size: 2,
          delay: 0.9,
          duration: 4.9,
        },
      ].map((spark, index) => (
        <motion.span
          key={index}
          className="
            absolute
            rounded-full
            bg-white
            shadow-[0_0_4px_rgba(255,255,255,0.95),0_0_9px_rgba(193,181,255,0.75),0_0_16px_rgba(124,108,242,0.32)]
          "
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
          }}
          animate={{
            opacity: [0, 0.25, 0.95, 0.32, 0],
            scale: [0.45, 0.8, 1.35, 0.85, 0.45],
            y: [2, 0, -3, -5, -7],
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* occasional brighter pearl glint */}

      <motion.span
        className="
          absolute
          left-[70%]
          top-[27%]
          h-[3px]
          w-[3px]
          rounded-full
          bg-white
          shadow-[0_0_5px_rgba(255,255,255,1),0_0_12px_rgba(218,211,255,0.95),0_0_24px_rgba(139,124,255,0.42)]
        "
        animate={{
          opacity: [0, 0, 1, 0.15, 0],
          scale: [0.5, 0.5, 1.7, 0.8, 0.5],
        }}
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )}
</div>

{/* ------------------------------------------------------ */}
{/* ACTUAL PORTRAIT — CRISP FOREGROUND                     */}
{/* ------------------------------------------------------ */}

<Image
  src="/images/naily-portrait-cutout.png"
  alt="Portrait of Naily Ashvitha"
  fill
  priority
  sizes="(max-width: 1024px) 94vw, 610px"
  className="
    relative
    z-10
    object-contain
    object-bottom
    drop-shadow-[0_28px_38px_rgba(43,35,90,0.07)]
  "
/>
    
  </motion.div>
</div>



    {/* -------------------------------------------------------- */}
    {/* GROUNDING / BASE                                         */}
    {/* -------------------------------------------------------- */}

    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        bottom-[1.5%]
        left-1/2
        z-[9]
        h-px
        w-[68%]
        -translate-x-1/2
        bg-gradient-to-r
        from-transparent
        via-soft-violet/20
        to-transparent
      "
    />

    <motion.div
      aria-hidden="true"
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: [0.2, 0.48, 0.2],
              scaleX: [0.94, 1, 0.94],
            }
      }
      transition={{
        duration: 3.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="
        pointer-events-none
        absolute
        bottom-[0.5%]
        left-1/2
        z-[8]
        h-8
        w-[54%]
        -translate-x-1/2
        rounded-full
        bg-soft-violet/[0.055]
        blur-xl
      "
    />

    {/* ======================================================== */}
    {/* FOREGROUND SYSTEM — CROSSES IN FRONT OF NAILY            */}
    {/* ======================================================== */}

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20"
    >

      <svg
        viewBox="0 0 560 650"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {/* interface foreground continuation */}

        <motion.path
          d="M 348 266 C 414 267, 449 238, 548 208"
          fill="none"
          stroke="rgba(124,108,242,0.46)"
          strokeWidth="1.15"
          strokeLinecap="round"
          animate={{
            pathLength:
              activeLayer === 'interface' ||
              activeLayer === 'systems'
                ? 1
                : 0,

            opacity:
              activeLayer === 'interface'
                ? 1
                : activeLayer === 'systems'
                  ? 0.65
                  : 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* backend foreground continuation */}

        <motion.path
          d="M 329 461 C 391 493, 453 466, 548 398"
          fill="none"
          stroke="rgba(109,158,232,0.42)"
          strokeWidth="1.1"
          strokeLinecap="round"
          animate={{
            pathLength:
              activeLayer === 'backend' ||
              activeLayer === 'systems'
                ? 1
                : 0,

            opacity:
              activeLayer === 'backend'
                ? 1
                : activeLayer === 'systems'
                  ? 0.62
                  : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* systems crossing route */}

        <motion.path
          d="M 28 530 C 150 474, 214 500, 289 524 C 369 550, 430 524, 536 455"
          fill="none"
          stroke="rgba(124,108,242,0.48)"
          strokeWidth="1.15"
          strokeLinecap="round"
          animate={{
            pathLength:
              activeLayer === 'systems'
                ? 1
                : 0,

            opacity:
              activeLayer === 'systems'
                ? 0.95
                : 0,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      {/* travelling signal — interface */}

      {activeLayer === 'interface' && (
        <motion.span
          initial={{
            left: '60%',
            top: '40%',
            opacity: 0,
          }}
          animate={
            reduceMotion
              ? {
                  left: '86%',
                  top: '31%',
                  opacity: 1,
                }
              : {
                  left: [
                    '60%',
                    '72%',
                    '86%',
                  ],
                  top: [
                    '40%',
                    '37%',
                    '31%',
                  ],
                  opacity: [
                    0,
                    1,
                    0.4,
                  ],
                }
          }
          transition={{
            duration: 1.35,
            repeat: reduceMotion
              ? 0
              : Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            h-2
            w-2
            rounded-full
            bg-soft-violet
            shadow-[0_0_16px_rgba(124,108,242,0.55)]
          "
        />
      )}

      {/* travelling signal — backend */}

      {activeLayer === 'backend' && (
        <motion.span
          initial={{
            left: '58%',
            top: '70%',
            opacity: 0,
          }}
          animate={
            reduceMotion
              ? {
                  left: '87%',
                  top: '61%',
                  opacity: 1,
                }
              : {
                  left: [
                    '58%',
                    '72%',
                    '87%',
                  ],
                  top: [
                    '70%',
                    '73%',
                    '61%',
                  ],
                  opacity: [
                    0,
                    1,
                    0.4,
                  ],
                }
          }
          transition={{
            duration: 1.45,
            repeat: reduceMotion
              ? 0
              : Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            h-2
            w-2
            rounded-full
            bg-cool-blue
            shadow-[0_0_16px_rgba(109,158,232,0.48)]
          "
        />
      )}
    </div>

    {/* ======================================================== */}
    {/* FLOATING ARCHITECTURE LABEL                              */}
    {/* ======================================================== */}

    <AnimatePresence mode="wait">
      {activeArchitecture ? (
        <motion.div
          key={activeLayer}
          initial={
            reduceMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                  y: 10,
                  x: 8,
                  scale: 0.96,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }}
          exit={
            reduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: -5,
                  scale: 0.98,
                }
          }
          transition={{
            duration:
              reduceMotion ? 0 : 0.36,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            `
              absolute
              z-30
              w-[190px]
              rounded-[1.15rem]
              border
              bg-background/72
              px-4
              py-3.5
              shadow-[0_18px_55px_rgba(43,35,90,0.08)]
              backdrop-blur-xl
              sm:w-[205px]
            `,
            activeLayer === 'interface'
              ? 'right-[0%] top-[19%]'
              : activeLayer === 'backend'
                ? 'right-[-1%] top-[50%]'
                : 'left-[1%] top-[61%]',
          ].join(' ')}
        >
          {/* connector dot */}

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: [
                      1,
                      1.35,
                      1,
                    ],
                    opacity: [
                      0.55,
                      1,
                      0.55,
                    ],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute
              -left-1
              top-5
              h-2
              w-2
              rounded-full
              border
              border-soft-violet/35
              bg-soft-violet
            "
          />

          <div className="flex items-center gap-2">
            <span className="text-[8px] font-semibold tabular-nums tracking-[0.18em] text-soft-violet">
              {activeArchitecture.number}
            </span>

            <span className="h-px w-5 bg-soft-violet/20" />

            <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-soft-violet/65">
              {activeArchitecture.eyebrow}
            </span>
          </div>

          <p className="mt-2 font-serif text-[1.05rem] leading-[1.05] tracking-[-0.025em] text-foreground">
            {activeArchitecture.title}
          </p>

          <p className="mt-2 text-[9px] leading-[1.5] text-muted-foreground/60">
            {activeArchitecture.description}
          </p>

          <div className="mt-3 flex items-center gap-2 border-t border-soft-violet/[0.10] pt-2.5">
            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [
                        0.35,
                        1,
                        0.35,
                      ],
                    }
              }
              transition={{
                duration: 1.7,
                repeat: Infinity,
              }}
              className="h-1 w-1 rounded-full bg-soft-violet"
            />

            <span className="text-[7px] font-medium leading-[1.4] tracking-[0.04em] text-foreground/40">
              {activeArchitecture.meta}
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="living-system-idle"
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
          exit={{
            opacity: 0,
          }}
          transition={{
            duration:
              reduceMotion ? 0 : 0.35,
          }}
          className="
            pointer-events-none
            absolute
            bottom-[5%]
            right-[2%]
            z-30
            hidden
            items-center
            gap-2
            lg:flex
          "
        >
          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [
                      0.2,
                      0.55,
                      0.2,
                    ],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-1 w-1 rounded-full bg-soft-violet"
          />

          <span className="text-[7px] font-semibold uppercase tracking-[0.19em] text-muted-foreground/30">
            System / idle
          </span>
        </motion.div>
      )}
    </AnimatePresence>

    {/* ======================================================== */}
    {/* SYSTEMS MODE — EXTRA CONNECTED NODES                     */}
    {/* ======================================================== */}

    <AnimatePresence>
      {activeLayer === 'systems' && (
        <>
          {[
            {
              label: 'INTERFACE',
              position:
                'left-[3%] top-[35%]',
              delay: 0,
            },
            {
              label: 'APPLICATION',
              position:
                'right-[1%] top-[42%]',
              delay: 0.08,
            },
            {
              label: 'STATE',
              position:
                'right-[8%] bottom-[18%]',
              delay: 0.16,
            },
          ].map((node) => (
            <motion.div
              key={node.label}
              initial={
                reduceMotion
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                      scale: 0.8,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                delay:
                  reduceMotion
                    ? 0
                    : node.delay,
                duration:
                  reduceMotion
                    ? 0
                    : 0.35,
              }}
              className={[
                `
                  pointer-events-none
                  absolute
                  z-30
                  flex
                  items-center
                  gap-2
                `,
                node.position,
              ].join(' ')}
            >
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [
                          1,
                          1.35,
                          1,
                        ],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: node.delay,
                }}
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  border
                  border-soft-violet/50
                  bg-soft-lavender
                  shadow-[0_0_10px_rgba(124,108,242,0.18)]
                "
              />

              <span className="text-[7px] font-semibold tracking-[0.17em] text-soft-violet/50">
                {node.label}
              </span>
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  </motion.div>
</motion.div>
  </div>
</Container>
    </section>
  );
}