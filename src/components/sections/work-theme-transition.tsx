'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

import { FeaturedWork } from '@/components/sections/featured-work';

export function WorkThemeTransition() {
  const workRef = useRef<HTMLDivElement>(null);

  /*
   * Keep track of the last visual theme we published.
   * This prevents us from dispatching the same event
   * continuously while scrolling.
   */
  const publishedDarkStateRef =
    useRef(false);

  const { scrollYProgress } = useScroll({
    target: workRef,
    offset: ['start 95%', 'end 10%'],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 45,
      damping: 20,
      mass: 0.8,
      restDelta: 0.0001,
    },
  );

  /*
   * The actual site canvas always remains soft-lavender.
   *
   * We only fade a dark layer over it while scrolling
   * through Featured Work.
   */
  const darkOverlayOpacity = useTransform(
    smoothProgress,
    [
      0,
      0.1,
      0.14,
      0.19,
      0.25,
      0.75,
      0.92,
      1,
    ],
    [0, 0, 0.14, 0.58, 1, 1, 0, 0],
  );

  const textColor = useTransform(
    smoothProgress,
    [
      0,
      0.1,
      0.14,
      0.19,
      0.25,
      0.75,
      0.92,
      1,
    ],
    [
      '#0d1113',
      '#0d1113',
      '#38393b',
      '#b9b8bb',
      '#f7f7f7',
      '#f7f7f7',
      '#0d1113',
      '#0d1113',
    ],
  );

  /*
   * PortfolioTelemetry is fixed outside this component,
   * so let it know whether the REAL Work overlay is
   * currently visually dark.
   *
   * This uses the exact MotionValue that renders the
   * background instead of independently estimating
   * section position.
   */
  useMotionValueEvent(
    darkOverlayOpacity,
    'change',
    (opacity) => {
      const nextIsDark =
        opacity >= 0.5;

      if (
        publishedDarkStateRef.current ===
        nextIsDark
      ) {
        return;
      }

      publishedDarkStateRef.current =
        nextIsDark;

      window.dispatchEvent(
        new CustomEvent(
          'portfolio-surface-theme',
          {
            detail: {
              isDark: nextIsDark,
            },
          },
        ),
      );
    },
  );

  return (
    <div className="relative bg-soft-lavender">
      {/* Scroll-controlled darkening layer */}

      <motion.div
        aria-hidden="true"
        style={{
          opacity: darkOverlayOpacity,
        }}
        className="pointer-events-none fixed inset-0 z-[30] bg-[#0d1113]"
      />

      {/* Featured Work */}

      <motion.div
        ref={workRef}
        style={{
          color: textColor,
        }}
        className="relative z-[40]"
      >
        <FeaturedWork />
      </motion.div>
    </div>
  );
}