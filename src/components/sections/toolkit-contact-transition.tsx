'use client';

import {
  useLayoutEffect,
  useRef,
} from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  motion,
  useMotionValue,
  useTransform,
} from 'motion/react';

import { Contact } from '@/components/sections/contact';
import { Toolkit } from '@/components/sections/toolkit';

gsap.registerPlugin(ScrollTrigger);

export function ToolkitContactTransition() {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const toolkitRef =
    useRef<HTMLDivElement>(null);

  const contactRef =
    useRef<HTMLDivElement>(null);

  const takeoverProgress =
    useMotionValue(0);

  /*
   * Toolkit stays completely sharp while
   * Contact begins entering.
   *
   * Blur starts only once Contact has covered
   * roughly half of the frozen Toolkit.
   */
  const toolkitBlur =
    useTransform(
      takeoverProgress,
      [0, 0.48, 0.72, 1],
      [
        'blur(0px)',
        'blur(0px)',
        'blur(3px)',
        'blur(7px)',
      ],
    );

  const toolkitOpacity =
    useTransform(
      takeoverProgress,
      [0, 0.48, 0.75, 1],
      [
        1,
        1,
        0.92,
        0.76,
      ],
    );

  useLayoutEffect(() => {
    const wrapper =
      wrapperRef.current;

    const toolkit =
      toolkitRef.current;

    const contact =
      contactRef.current;

    if (
      !wrapper ||
      !toolkit ||
      !contact
    ) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const context = gsap.context(
          () => {
            const trigger =
              ScrollTrigger.create({
                /*
                 * Toolkit reaches its REAL end first.
                 */
                trigger: toolkit,

                start: 'bottom bottom',

                /*
                 * Stop pinning when Contact has risen
                 * to approximately the middle of the
                 * viewport.
                 *
                 * Contact itself remains normal-flow.
                 */
                endTrigger: contact,

                end: 'top 48%',

                pin: toolkit,

                /*
                 * Absolutely critical:
                 * don't create extra page height.
                 */
                pinSpacing: false,

                anticipatePin: 1,

                invalidateOnRefresh: true,

                onUpdate: (self) => {
                  takeoverProgress.set(
                    self.progress,
                  );
                },

                onLeave: () => {
                  takeoverProgress.set(1);
                },

                onEnterBack: (self) => {
                  takeoverProgress.set(
                    self.progress,
                  );
                },

                onLeaveBack: () => {
                  takeoverProgress.set(0);
                },
              });

            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });

            return () => {
              trigger.kill();

              takeoverProgress.set(0);
            };
          },
          wrapper,
        );

        return () => {
          context.revert();
        };
      },
    );

    return () => {
      media.revert();
    };
  }, [takeoverProgress]);

  return (
    <div
      ref={wrapperRef}
      className="relative bg-soft-lavender"
    >
      {/* ================================================================ */}
      {/* TOOLKIT — COMPLETES NORMALLY, THEN FREEZES                       */}
      {/* ================================================================ */}

      <motion.div
        ref={toolkitRef}
        style={{
          filter: toolkitBlur,
          opacity: toolkitOpacity,
        }}
        className="relative z-0"
      >
        <Toolkit />
      </motion.div>

      {/* ================================================================ */}
      {/* CONTACT — ONE REAL SECTION, NATURAL DOCUMENT FLOW                */}
      {/* ================================================================ */}

      <div
        ref={contactRef}
        className="relative z-20"
      >
        <Contact />
      </div>
    </div>
  );
}