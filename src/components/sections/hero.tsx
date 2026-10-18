'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowDown,
  ArrowUpRight,
} from 'lucide-react';

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';

import { LivingEditorial } from '@/components/sections/hero/living-editorial';
import { ProfessionTypography } from '@/components/sections/hero/profession-typography';
import { HumanReveal } from '@/components/sections/hero/human-reveal';
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

export function Hero() {
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const heroVisible = useInView(heroRef, {
    amount: 0.3,
    once: false,
  });

const [professionSignal, setProfessionSignal] = useState(false);

const igniteProfessionSignal = useCallback(() => {
  if (reduceMotion) return;

  setProfessionSignal(true);
}, [reduceMotion]);

useEffect(() => {
  if (!professionSignal) return;

  const timer = window.setTimeout(() => {
    setProfessionSignal(false);
  }, 1100);

  return () => window.clearTimeout(timer);
}, [professionSignal]);

  const [activeLayer, setActiveLayer] =
    useState<ArchitectureLayer>(null);

  const [signalPointer, setSignalPointer] =
    useState({
      x: 50,
      y: 50,
      active: false,
    });
const [humanPreview, setHumanPreview] = useState(false);
const [humanLocked, setHumanLocked] = useState(false);

const humanVisible = humanPreview || humanLocked;

useEffect(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setHumanLocked(false);
      setHumanPreview(false);
    }
  };

  window.addEventListener('keydown', handleEscape);

  return () => {
    window.removeEventListener('keydown', handleEscape);
  };
}, []);

  const [activeAction, setActiveAction] =
  useState<HeroAction>(null);

const professionDriftX =
  reduceMotion || !signalPointer.active
    ? 0
    : ((signalPointer.x - 50) / 50) * 5;

const professionDriftY =
  reduceMotion || !signalPointer.active
    ? 0
    : ((signalPointer.y - 50) / 50) * 2;

return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-soft-lavender py-20 sm:py-24 lg:py-20"
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

    {/* Upper identity-to-system connection */}
    <motion.path
      d="M 570 280 C 690 265, 760 220, 870 235 C 945 245, 1010 275, 1090 250"
      fill="none"
      stroke="url(#hero-global-route)"
      strokeWidth="0.85"
      strokeLinecap="round"
      strokeDasharray="3 9"
      initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
animate={{
  pathLength: 1,
  opacity: professionSignal
    ? 0.95
    : activeLayer !== null
      ? 0.65
      : 0.38,
  strokeWidth: professionSignal ? 1.8 : 0.85,
}}
      transition={{
        pathLength: {
          duration: reduceMotion ? 0 : 1.8,
          delay: reduceMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 0.4 },
      }}
    />
    {/* Violet signal released by the completed typography */}
<motion.circle
  cx="0"
  cy="0"
  r="3"
  fill="#c5adff"
  style={{
    offsetPath:
      'path("M 570 280 C 690 265, 760 220, 870 235 C 945 245, 1010 275, 1090 250")',
    offsetRotate: '0deg',
    filter: 'drop-shadow(0 0 6px rgba(143,102,255,0.95))',
  }}
  initial={false}
  animate={{
    offsetDistance: professionSignal ? '100%' : '0%',
    opacity: professionSignal && !reduceMotion ? [0, 1, 1, 0] : 0,
  }}
  transition={{
    duration: 1.05,
    ease: 'easeInOut',
  }}
/>

    <motion.circle
      cx="870"
      cy="235"
      r="2.5"
      fill="#7c6cf2"
      animate={{
        opacity: reduceMotion ? 0.3 : [0.15, 0.5, 0.15],
        scale: reduceMotion ? 1 : [1, 1.3, 1],
      }}
      transition={{
        duration: 3.6,
        repeat: reduceMotion ? 0 : Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: '870px 235px' }}
    />

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

{/* ============================================================ */}
{/* PROFESSION — IDENTITY RECONSTRUCTION                          */}
{/* ============================================================ */}

<ProfessionTypography
  visible={heroVisible}
  reduceMotion={Boolean(reduceMotion)}
  driftX={professionDriftX}
  driftY={professionDriftY}
  onIgnite={igniteProfessionSignal}
  onHumanPreviewChange={setHumanPreview}
  onHumanToggle={() => {
    setHumanLocked((current) => !current);
  }}
  humanLocked={humanLocked}
/>

  <div className="relative z-[2] grid items-center gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] lg:gap-10 xl:gap-16">
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
          y: 12,
        }
  }
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: reduceMotion ? 0 : 0.12,
    duration: reduceMotion ? 0 : 0.9,
    ease: [0.22, 1, 0.36, 1],
  }}
        className="relative -ml-3 mt-5 h-[300px] w-[108%] overflow-visible sm:-ml-6 sm:h-[350px] sm:w-[116%] lg:-ml-14 lg:mt-6 lg:h-[400px] lg:w-[128%] lg:-translate-x-14 lg:-translate-y-12"
      >
{/* Signature — writes first */}
<motion.div
  aria-label="Naily Ashvitha"
  role="img"
  className="pointer-events-none absolute inset-0 z-20"
>
  <motion.div
    className="absolute inset-0"
    initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
    animate={{
      clipPath:
        reduceMotion || heroVisible
          ? 'inset(0 0% 0 0)'
          : 'inset(0 100% 0 0)',
    }}
    transition={{
      duration: reduceMotion ? 0 : 4.8,
      delay: reduceMotion ? 0 : 0.35,
      ease: [0.45, 0, 0.2, 1],
    }}
  >
    <Image
      src="/images/naily-signature-ink.png"
      alt=""
      fill
      priority
      sizes="(max-width: 768px) 90vw, 1000px"
      className="object-contain object-left"
    />
  </motion.div>

  {/* Glasses — arrive after writing finishes */}
  <motion.div
    className="absolute inset-0"
    style={{ transformOrigin: '19% 45%' }}
    initial={
      reduceMotion
        ? false
        : {
            opacity: 0,
            y: -65,
            rotate: -9,
          }
    }
    animate={
      reduceMotion || heroVisible
        ? {
            opacity: 1,
            y: 0,
            rotate: 0,
          }
        : {
            opacity: 0,
            y: -65,
            rotate: -9,
          }
    }
    transition={{
      delay: reduceMotion ? 0 : 5.25,
      duration: reduceMotion ? 0 : 1.4,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    <Image
      src="/images/naily-signature-glasses.png"
      alt=""
      fill
      priority
      sizes="(max-width: 768px) 90vw, 1000px"
      className="object-contain object-left"
    />
  </motion.div>
</motion.div>
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
{/* RIGHT — LIVING EDITORIAL ARCHITECTURE                        */}
{/* ============================================================ */}

<motion.div
  initial={
    reduceMotion
      ? false
      : { opacity: 0, x: 20 }
  }
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    delay: 0.3,
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    relative
    mx-auto
    w-full
  max-w-[620px]
  min-h-[480px]
  sm:min-h-[540px]
  lg:h-[560px]
  lg:min-h-0
  lg:-mr-10
  lg:ml-auto
  xl:-mr-16
  "
>
<div className="relative h-full min-h-[480px] sm:min-h-[540px] lg:min-h-0">
  <AnimatePresence mode="sync" initial={false}>
  {humanVisible ? (
    <motion.div
      key="human"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
  absolute
  inset-0
  z-20
  w-full
  lg:-ml-6
  lg:w-[calc(100%+1.5rem)]
  xl:-ml-8
  xl:w-[calc(100%+2rem)]
"
    >
      <HumanReveal reduceMotion={Boolean(reduceMotion)} />
    </motion.div>
  ) : (
    <motion.div
key="architecture"
initial={reduceMotion ? false : { opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: reduceMotion ? 0 : 0.25 }}
className="absolute inset-0 w-full"
    >
      <LivingEditorial
        activeLayer={activeLayer}
        reduceMotion={Boolean(reduceMotion)}
      />
    </motion.div>
  )}
</AnimatePresence>
</div>
</motion.div>
  </div>
</Container>
    </section>
  );
}