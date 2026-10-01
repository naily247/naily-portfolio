'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

const telemetryStates = [
  {
    id: 'hero',
    number: '01',
    label: 'Identity',
  },
  {
    id: 'about',
    number: '02',
    label: 'Approach',
  },
  {
    id: 'work',
    number: '03',
    label: 'Build',
  },
  {
    id: 'experience',
    number: '04',
    label: 'Evolution',
  },
  {
    id: 'toolkit',
    number: '05',
    label: 'System',
  },
  {
    id: 'contact',
    number: '06',
    label: 'Connect',
  },
];

export function PortfolioTelemetry() {
const [activeIndex, setActiveIndex] =
  useState(0);

const [isOverDarkSurface, setIsOverDarkSurface] =
  useState(false);

const [mounted, setMounted] =
  useState(false);

  const reduceMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll();

  const smoothProgress =
    useSpring(scrollYProgress, {
      stiffness: 90,
      damping: 24,
      mass: 0.45,
      restDelta: 0.001,
    });

useEffect(() => {
  setMounted(true);

const updateActiveSection = () => {
  const viewportReference =
    window.innerHeight * 0.46;

  /*
   * HERO GUARD
   *
   * The Hero and About sections can both overlap the
   * viewport during the opening transition. Keep the
   * telemetry on 01 / IDENTITY until the About section
   * actually reaches the telemetry reference line.
   */
  const aboutSection =
    document.getElementById('about');

  if (aboutSection) {
    const aboutRect =
      aboutSection.getBoundingClientRect();

    if (
      aboutRect.top >
      viewportReference
    ) {
      setActiveIndex(
        (current) =>
          current === 0 ? current : 0,
      );

      return;
    }
  }

  let bestIndex = 0;
  let bestDistance =
    Number.POSITIVE_INFINITY;

    telemetryStates.forEach(
      (state, index) => {
        const element =
          document.getElementById(
            state.id,
          );

        if (!element) return;

        const rect =
          element.getBoundingClientRect();

        const isAroundViewport =
          rect.bottom > 0 &&
          rect.top <
            window.innerHeight;

        if (!isAroundViewport) {
          return;
        }

        const sectionReference =
          Math.min(
            Math.max(
              viewportReference,
              rect.top,
            ),
            rect.bottom,
          );

        const distance =
          Math.abs(
            sectionReference -
              viewportReference,
          );

        if (
          distance <
          bestDistance
        ) {
          bestDistance =
            distance;

          bestIndex = index;
        }
      },
    );

    /*
     * Some sections use sticky/pinned transitions.
     * If none intersects the viewport normally,
     * use document position as a graceful fallback.
     */
    if (
      bestDistance ===
      Number.POSITIVE_INFINITY
    ) {
      const currentY =
        window.scrollY +
        viewportReference;

      telemetryStates.forEach(
        (state, index) => {
          const element =
            document.getElementById(
              state.id,
            );

          if (!element) return;

          const top =
            element.getBoundingClientRect()
              .top +
            window.scrollY;

          if (top <= currentY) {
            bestIndex = index;
          }
        },
      );
    }

    setActiveIndex(
      (current) =>
        current === bestIndex
          ? current
          : bestIndex,
    );
  };

  updateActiveSection();

  window.addEventListener(
    'scroll',
    updateActiveSection,
    {
      passive: true,
    },
  );

  window.addEventListener(
    'resize',
    updateActiveSection,
  );

  return () => {
    window.removeEventListener(
      'scroll',
      updateActiveSection,
    );

    window.removeEventListener(
      'resize',
      updateActiveSection,
    );
  };
}, []);

/*
 * Listen to the actual visual state produced by
 * WorkThemeTransition.
 *
 * Section identity and surface theme are intentionally
 * separate:
 *
 * Selected Work -> 03 / BUILD + light telemetry
 * More Work     -> 03 / BUILD + dark telemetry
 */
useEffect(() => {
  const handleSurfaceTheme = (
    event: Event,
  ) => {
    const surfaceEvent =
      event as CustomEvent<{
        isDark: boolean;
      }>;

    setIsOverDarkSurface(
      surfaceEvent.detail.isDark,
    );
  };

  window.addEventListener(
    'portfolio-surface-theme',
    handleSurfaceTheme,
  );

  return () => {
    window.removeEventListener(
      'portfolio-surface-theme',
      handleSurfaceTheme,
    );
  };
}, []);

  if (!mounted) {
    return null;
  }

const activeState =
  telemetryStates[activeIndex];

return (
    <motion.aside
      aria-label="Portfolio progress"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: 12,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: 0.9,
        duration: 0.65,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-7"
    >
      <div className="flex items-center gap-3">
        {/* information */}

        <div className="flex min-w-[74px] flex-col items-end">
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={activeState.id}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 5,
                      filter:
                        'blur(3px)',
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      y: -5,
                      filter:
                        'blur(3px)',
                    }
              }
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.28,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="text-right"
            >
<motion.p
  animate={{
    color: isOverDarkSurface
      ? 'rgba(174, 163, 255, 0.88)'
      : 'rgba(124, 108, 242, 0.70)',
  }}
  transition={{
    duration: reduceMotion ? 0 : 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="text-[9px] font-semibold tabular-nums tracking-[0.18em]"
>
  {activeState.number}
</motion.p>

<motion.p
  animate={{
    color: isOverDarkSurface
      ? 'rgba(244, 244, 246, 0.68)'
      : 'rgba(20, 20, 24, 0.55)',
  }}
  transition={{
    duration: reduceMotion ? 0 : 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
>
  {activeState.label}
</motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* signal rail */}

        <div className="relative h-28 w-px">
          {/* quiet rail */}

          <motion.div
  className="absolute inset-0"
  animate={{
    backgroundColor:
      isOverDarkSurface
        ? 'rgba(255, 255, 255, 0.13)'
        : 'rgba(20, 20, 24, 0.09)',
  }}
  transition={{
    duration: reduceMotion
      ? 0
      : 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
/>

          {/* progress */}

          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-cool-blue/70 via-cool-blue/55 to-soft-violet/70"
            style={{
              height: '100%',
              scaleY: smoothProgress,
            }}
          />

          {/* section positions */}

          {telemetryStates.map(
            (state, index) => {
              const position =
                index /
                (telemetryStates.length -
                  1);

              const isActive =
                index === activeIndex;

              return (
                <motion.span
                  key={state.id}
                  animate={{
                    scale: isActive
                      ? 1
                      : 0.72,
                    opacity: isActive
                      ? 1
                      : 0.32,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="absolute left-1/2 block h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cool-blue/60 bg-soft-lavender"
                  style={{
                    top: `${position * 100}%`,
                    boxShadow: isActive
                      ? '0 0 12px rgba(109, 158, 232, 0.32)'
                      : 'none',
                  }}
                />
              );
            },
          )}

          {/* active signal */}

          <motion.span
            aria-hidden="true"
            animate={{
              top: `${
                (activeIndex /
                  (telemetryStates.length -
                    1)) *
                100
              }%`,
            }}
            transition={
              reduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.6,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }
            }
            className="absolute left-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cool-blue/25"
          >
            <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cool-blue shadow-[0_0_10px_rgba(109,158,232,0.65)]" />
          </motion.span>
        </div>
      </div>
    </motion.aside>
  );
}