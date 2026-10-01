'use client';

import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowUpRight,
  Mail,
} from 'lucide-react';

import { Container } from '@/components/ui/container';
import { siteConfig } from '@/data/site';

/* -------------------------------------------------------------------------- */
/*                              MAGNETIC ACTION                               */
/* -------------------------------------------------------------------------- */

type MagneticActionProps = {
  href: string;
  children: ReactNode;
};

function MagneticAction({
  href,
  children,
}: MagneticActionProps) {
  const shouldReduceMotion =
    useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 220,
    damping: 18,
    mass: 0.35,
  });

  const springY = useSpring(y, {
    stiffness: 220,
    damping: 18,
    mass: 0.35,
  });

  function handleMove(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (shouldReduceMotion) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const offsetX =
      event.clientX -
      (rect.left + rect.width / 2);

    const offsetY =
      event.clientY -
      (rect.top + rect.height / 2);

    x.set(offsetX * 0.12);
    y.set(offsetY * 0.16);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        x: springX,
        y: springY,
      }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-foreground bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[0_14px_36px_rgba(20,24,35,0.10)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(20,24,35,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-violet/40"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/[0.11] blur-md transition-[left] duration-700 ease-out group-hover:left-[115%]"
      />

      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  CONTACT                                   */
/* -------------------------------------------------------------------------- */

export function Contact() {
  const sectionRef =
    useRef<HTMLElement>(null);

const shouldReduceMotion =
  useReducedMotion();

const pointerX = useMotionValue(0);
const pointerY = useMotionValue(0);

const glowX = useSpring(pointerX, {
  stiffness: 55,
  damping: 24,
  mass: 0.8,
});

const glowY = useSpring(pointerY, {
  stiffness: 55,
  damping: 24,
  mass: 0.8,
});

const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start 98%',
        'start 38%',
      ],
    });

  /*
   * The panel does not begin visually taking over until Contact
   * has genuinely entered the viewport.
   */
  const panelY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.78, 1],
    [72, 72, 0, 0],
  );

  const panelOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.52],
    [0, 0, 1],
  );

  const panelScale = useTransform(
    scrollYProgress,
    [0.18, 0.72],
    [0.985, 1],
  );

  const lineScale = useTransform(
    scrollYProgress,
    [0.32, 0.78],
    [0, 1],
  );

  const headingY = useTransform(
    scrollYProgress,
    [0.3, 0.76],
    [26, 0],
  );

  const headingOpacity =
    useTransform(
      scrollYProgress,
      [0.3, 0.64],
      [0, 1],
    );

  const contentY = useTransform(
    scrollYProgress,
    [0.4, 0.82],
    [18, 0],
  );

  const contentOpacity =
    useTransform(
      scrollYProgress,
      [0.4, 0.7],
      [0, 1],
    );

    function handlePointerMove(
  event: React.PointerEvent<HTMLElement>,
) {
  if (shouldReduceMotion) {
    return;
  }

  const rect =
    event.currentTarget.getBoundingClientRect();

  pointerX.set(
    event.clientX -
      rect.left -
      180,
  );

  pointerY.set(
    event.clientY -
      rect.top -
      180,
  );
}

  return (
    <section
      ref={sectionRef}
      id="contact"
      onPointerMove={handlePointerMove}
      className="relative z-30 bg-transparent pt-20 sm:pt-24 lg:pt-28"
    >
      {/* ====================================================== */}
      {/* CONTACT PANEL                                          */}
      {/* ====================================================== */}

      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: panelY,
                opacity:
                  panelOpacity,
                scale:
                  panelScale,
              }
        }
        className="relative overflow-hidden rounded-t-[2rem] border-t border-soft-violet/[0.16] bg-soft-lavender/95 shadow-[0_-28px_80px_rgba(76,61,145,0.08)] backdrop-blur-xl sm:rounded-t-[2.4rem]"
      >
        {/* ==================================================== */}
        {/* FROSTED OVERLAP EDGE                                 */}
        {/* ==================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.18] via-soft-violet/[0.025] to-transparent"
        />

        <motion.div
          aria-hidden="true"
          style={{
            scaleX: lineScale,
          }}
          className="pointer-events-none absolute left-1/2 top-0 h-px w-[82%] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-soft-violet/75 to-transparent"
        />

        <motion.div
  aria-hidden="true"
  initial={
    shouldReduceMotion
      ? false
      : {
          x: '-140%',
          opacity: 0,
        }
  }
  whileInView={
    shouldReduceMotion
      ? undefined
      : {
          x: '620%',
          opacity: [
            0,
            1,
            1,
            0,
          ],
        }
  }
  viewport={{
    once: true,
    amount: 0.35,
  }}
  transition={{
    duration: 2.2,
    delay: 0.35,
    ease: [
      0.22,
      1,
      0.36,
      1,
    ],
  }}
  className="pointer-events-none absolute left-[12%] top-[-1px] h-[3px] w-28 rounded-full bg-soft-violet/70 shadow-[0_0_18px_rgba(124,108,242,0.65)] blur-[1px]"
/>

{/* ==================================================== */}
{/* ATMOSPHERE                                           */}
{/* ==================================================== */}

<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  {/* Local violet depth around the editorial headline */}
  <div className="absolute left-[6%] top-[24%] h-[20rem] w-[28rem] rounded-full bg-soft-violet/[0.04] blur-[125px]" />

  {/* Quiet cool balance around the action side */}
  <div className="absolute right-[8%] top-[30%] h-[18rem] w-[24rem] rounded-full bg-cool-blue/[0.025] blur-[130px]" />

  {/* Headline energy — localized and gently breathing */}
  <motion.div
    animate={
      shouldReduceMotion
        ? undefined
        : {
            scale: [1, 1.06, 1],
            opacity: [0.45, 0.7, 0.45],
          }
    }
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute left-[8%] top-[31%] h-[11rem] w-[26rem] rounded-[50%] bg-soft-violet/[0.045] blur-[90px]"
  />

  {/* Pointer-following interactive light */}
  <motion.div
    style={{
      x: glowX,
      y: glowY,
    }}
    className="absolute left-0 top-0 hidden h-[300px] w-[300px] rounded-full bg-soft-violet/[0.045] blur-[105px] lg:block"
  />
</div>

{/* ==================================================== */}
{/* FINAL SIGNAL ROUTE                                   */}
{/* ==================================================== */}

<svg
  aria-hidden="true"
  viewBox="0 0 1440 620"
  preserveAspectRatio="none"
  className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
>
  <defs>
    <linearGradient
      id="contact-final-route"
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
        offset="18%"
        stopColor="#7c6cf2"
        stopOpacity="0.18"
      />

      <stop
        offset="62%"
        stopColor="#8b7cf6"
        stopOpacity="0.26"
      />

      <stop
        offset="88%"
        stopColor="#6d9ee8"
        stopOpacity="0.18"
      />

      <stop
        offset="100%"
        stopColor="#6d9ee8"
        stopOpacity="0"
      />
    </linearGradient>

    <filter
      id="contact-pulse-glow"
      x="-300%"
      y="-300%"
      width="700%"
      height="700%"
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

  <motion.path
    id="contactSignalPath"
    d="
      M 205 232
      C 385 250, 455 405, 650 394
      C 820 384, 855 305, 1015 330
      C 1105 344, 1165 365, 1245 350
    "
    fill="none"
    stroke="url(#contact-final-route)"
    strokeWidth="1"
    strokeLinecap="round"
    style={{
      pathLength: lineScale,
    }}
  />

  <circle
    cx="205"
    cy="232"
    r="2.5"
    fill="#7c6cf2"
    opacity="0.38"
  />

  <circle
    cx="1015"
    cy="330"
    r="2"
    fill="#6d9ee8"
    opacity="0.3"
  />

  {!shouldReduceMotion && (
    <>
      <circle
        r="3.2"
        fill="#8b7cf6"
        filter="url(#contact-pulse-glow)"
      >
        <animateMotion
          dur="5.8s"
          repeatCount="indefinite"
          path="
            M 205 232
            C 385 250, 455 405, 650 394
            C 820 384, 855 305, 1015 330
            C 1105 344, 1165 365, 1245 350
          "
        />
      </circle>

      <circle
        r="1.7"
        fill="#9dc1ff"
        opacity="0.85"
      >
        <animateMotion
          dur="5.8s"
          begin="0.12s"
          repeatCount="indefinite"
          path="
            M 205 232
            C 385 250, 455 405, 650 394
            C 820 384, 855 305, 1015 330
            C 1105 344, 1165 365, 1245 350
          "
        />
      </circle>
    </>
  )}
</svg>

        {/* ==================================================== */}
        {/* SMALL SYSTEM DETAILS                                 */}
        {/* ==================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 xl:block"
        >
          <div className="flex items-center gap-3 [writing-mode:vertical-rl]">
            <span className="font-mono text-[7px] uppercase tracking-[0.24em] text-soft-violet/28">
              06 CONNECT
            </span>

            <span className="h-8 w-px bg-gradient-to-b from-soft-violet/30 to-transparent" />
          </div>
        </div>

        {/* ==================================================== */}
        {/* CONTENT                                              */}
        {/* ==================================================== */}

        <Container className="relative z-10">
          <div className="py-10 sm:py-12 lg:py-14">
            {/* META */}

            <motion.div
              initial={
                shouldReduceMotion
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
                amount: 0.6,
              }}
              transition={{
                duration: 0.55,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Contact / 06
                </p>

                <span className="h-px w-8 bg-gradient-to-r from-soft-violet/50 to-transparent" />
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <motion.span
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [
                              1,
                              2.4,
                              1,
                            ],
                            opacity: [
                              0.24,
                              0,
                              0.24,
                            ],
                          }
                    }
                    transition={{
                      duration: 2.6,
                      repeat:
                        Infinity,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 rounded-full bg-soft-violet/35"
                  />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet/75 shadow-[0_0_8px_rgba(124,108,242,0.32)]" />
                </span>

                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/40">
                  Open to thoughtful work
                </span>
              </div>
            </motion.div>

            {/* ================================================ */}
            {/* MAIN                                             */}
            {/* ================================================ */}

            <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.65fr)] lg:items-end lg:gap-20">
              {/* LEFT */}

              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity:
                          headingOpacity,
                        y: headingY,
                      }
                }
              >
                <p className="mb-4 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-soft-violet/55">
                  <span className="h-1 w-1 rounded-full bg-soft-violet/65" />

                  One more connection
                </p>

                <h2 className="max-w-[760px] font-serif text-[clamp(3rem,5.2vw,5.7rem)] leading-[0.9] tracking-[-0.055em] text-foreground">
                  Got something
                  <span className="block">
                    in mind?
                  </span>

<span className="group/real relative mt-1 block w-fit text-muted-foreground">
  <span
    aria-hidden="true"
    className="absolute -inset-x-5 inset-y-[18%] -z-10 rounded-full bg-soft-violet/[0.08] opacity-70 blur-2xl transition-[opacity,transform] duration-700 group-hover/real:scale-110 group-hover/real:opacity-100"
  />

  <span className="relative">
    Let&apos;s make it real.
  </span>

  <span
    aria-hidden="true"
    className="absolute -bottom-1 left-0 h-px w-[42%] origin-left scale-x-0 bg-gradient-to-r from-soft-violet/70 to-transparent transition-transform duration-700 ease-out group-hover/real:scale-x-100"
  />
</span>
                </h2>
              </motion.div>

              {/* RIGHT */}

              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity:
                          contentOpacity,
                        y: contentY,
                      }
                }
                className="lg:pb-1"
              >
                <p className="max-w-[470px] text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  I&apos;m open to
                  thoughtful projects,
                  collaborations, and
                  opportunities to build
                  useful things with good
                  people.
                </p>

                {/* EMAIL ROUTE */}

                <div className="mt-7 border-t border-soft-violet/[0.12] pt-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center">
                    <div>
                      <p className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-soft-violet/55">
                        <Mail
                          size={11}
                          strokeWidth={
                            1.5
                          }
                        />

                        Direct route
                      </p>

                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="group/email mt-2 inline-flex items-center gap-2 text-[13px] font-medium text-foreground/70 transition-colors duration-300 hover:text-soft-violet sm:text-sm"
                      >
                        <span className="relative">
                          {siteConfig.email}

                          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-soft-violet/55 transition-transform duration-500 ease-out group-hover/email:scale-x-100" />
                        </span>

                        <ArrowUpRight
                          size={13}
                          strokeWidth={
                            1.5
                          }
                          className="text-soft-violet/45 transition-transform duration-300 group-hover/email:-translate-y-0.5 group-hover/email:translate-x-0.5 group-hover/email:text-soft-violet"
                        />
                      </a>
                    </div>

                    <MagneticAction
                      href={`mailto:${siteConfig.email}`}
                    >
                      Start a conversation

                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </MagneticAction>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ================================================ */}
            {/* QUIET END MARKER                                 */}
            {/* ================================================ */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.8,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="mt-12 flex items-center justify-between border-t border-soft-violet/[0.10] pt-4 sm:mt-14"
            >
              <p className="font-mono text-[7px] uppercase tracking-[0.17em] text-muted-foreground/25">
                Portfolio / end
              </p>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/25">
                  Sri Lanka
                </span>

                <span className="h-1 w-1 rounded-full bg-soft-violet/35" />

                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/25">
                  2026
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}