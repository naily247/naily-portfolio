'use client';

import Link from 'next/link';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { siteConfig } from '@/data/site';

const footerLinks = [
  {
    label: 'GitHub',
    meta: 'CODE',
    href: siteConfig.links.github,
    external: true,
  },
  {
    label: 'LinkedIn',
    meta: 'NETWORK',
    href: siteConfig.links.linkedin,
    external: true,
  },
  {
    label: 'Email',
    meta: 'MAIL',
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
];

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start 98%', 'end 100%'],
  });

  const routeScale = useTransform(
    scrollYProgress,
    [0.04, 0.48],
    [0, 1],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.34],
    [0, 1],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0.08, 0.34],
    [8, 0],
  );

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-soft-lavender"
    >
      {/* ====================================================== */}
      {/* QUIET FOOTER ATMOSPHERE                                */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute bottom-[-80%] left-[10%] h-40 w-72 rounded-full bg-soft-violet/[0.03] blur-[115px]" />

        <div className="absolute bottom-[-75%] right-[12%] h-36 w-64 rounded-full bg-cool-blue/[0.018] blur-[120px]" />
      </div>

      {/* ====================================================== */}
      {/* CLOSING SYSTEM ROUTE                                   */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-12 lg:block"
      >
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient
              id="footer-route-gradient"
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
                stopOpacity="0.2"
              />

              <stop
                offset="68%"
                stopColor="#8b7cf6"
                stopOpacity="0.16"
              />

              <stop
                offset="100%"
                stopColor="#6d9ee8"
                stopOpacity="0"
              />
            </linearGradient>

            <filter
              id="footer-signal-glow"
              x="-300%"
              y="-300%"
              width="700%"
              height="700%"
            >
              <feGaussianBlur
                stdDeviation="2.5"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d="
              M 180 20
              C 360 13, 455 32, 650 25
              C 835 18, 980 33, 1260 18
            "
            fill="none"
            stroke="url(#footer-route-gradient)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              pathLength: shouldReduceMotion
                ? 1
                : routeScale,
            }}
          />

          <circle
            cx="180"
            cy="20"
            r="1.8"
            fill="#7c6cf2"
            opacity="0.3"
          />

          <circle
            cx="1260"
            cy="18"
            r="1.6"
            fill="#6d9ee8"
            opacity="0.22"
          />

          {!shouldReduceMotion && (
            <circle
              r="2"
              fill="#7c6cf2"
              opacity="0.82"
              filter="url(#footer-signal-glow)"
            >
              <animateMotion
                dur="5.8s"
                repeatCount="indefinite"
                path="
                  M 180 20
                  C 360 13, 455 32, 650 25
                  C 835 18, 980 33, 1260 18
                "
              />
            </circle>
          )}
        </svg>
      </div>

      {/* ====================================================== */}
      {/* CONTENT                                                */}
      {/* ====================================================== */}

      <Container className="relative z-10">
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: contentOpacity,
                  y: contentY,
                }
          }
          className="border-t border-foreground/[0.075] pb-7 pt-6 sm:pb-8 sm:pt-7 lg:pb-9"
        >
          {/* ================================================== */}
          {/* PRIMARY FOOTER                                    */}
          {/* ================================================== */}

          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:gap-10">
            {/* ------------------------------------------------ */}
            {/* PERSONAL SIGN-OFF                                */}
            {/* ------------------------------------------------ */}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <motion.span
                    aria-hidden="true"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [1, 2.35, 1],
                            opacity: [0.2, 0, 0.2],
                          }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 rounded-full bg-soft-violet/40"
                  />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet/70 shadow-[0_0_8px_rgba(124,108,242,0.30)]" />
                </span>

                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.19em] text-soft-violet/45">
                  Signing off
                </span>
              </div>

{/* ============================================== */}
{/* NAME                                           */}
{/* ============================================== */}

<div className="mt-1.5 w-fit">
  <p className="font-serif text-[1.45rem] tracking-[-0.04em] text-foreground sm:text-[1.6rem]">
    Naily Ashvitha
  </p>
</div>
              {/* small identity/status rail */}

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[6px] uppercase tracking-[0.17em] text-muted-foreground/30">
                  Designing
                </span>

                <span className="h-1 w-1 rounded-full bg-soft-violet/25" />

                <span className="font-mono text-[6px] uppercase tracking-[0.17em] text-muted-foreground/30">
                  Engineering
                </span>

                <span className="h-1 w-1 rounded-full bg-soft-violet/25" />

                <span className="font-mono text-[6px] uppercase tracking-[0.17em] text-muted-foreground/30">
                  Refining
                </span>
              </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* ENDPOINTS                                       */}
            {/* ------------------------------------------------ */}

            <nav
              aria-label="Footer links"
              className="flex flex-wrap items-end gap-x-7 gap-y-3"
            >
              {footerLinks.map((item) => {
                const content = (
                  <>
                    <span className="relative flex items-center gap-1.5">
                      <span>{item.label}</span>

                      <ArrowUpRight
                        size={11}
                        aria-hidden="true"
                        className="text-soft-violet/45 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-soft-violet"
                      />

                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-soft-violet/65 to-transparent transition-transform duration-500 ease-out group-hover/link:scale-x-100"
                      />
                    </span>

                    <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-muted-foreground/25 transition-colors duration-300 group-hover/link:text-soft-violet/45">
                      {item.meta}
                    </span>
                  </>
                );

                if (item.external) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link flex flex-col items-start gap-0.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group/link flex flex-col items-start gap-0.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {content}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* ================================================== */}
          {/* COMPACT SYSTEM METADATA                            */}
          {/* ================================================== */}

          <div className="mt-4 flex flex-col gap-2 border-t border-soft-violet/[0.09] pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-muted-foreground/24">
                Portfolio / 2026
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-soft-violet/20 sm:block" />

              <span className="hidden font-mono text-[6px] uppercase tracking-[0.18em] text-muted-foreground/24 sm:inline">
                System complete
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[6px] uppercase tracking-[0.17em] text-muted-foreground/24">
              <span>Next.js</span>

              <span className="h-1 w-1 rounded-full bg-soft-violet/18" />

              <span>TypeScript</span>

              <span className="h-1 w-1 rounded-full bg-soft-violet/18" />

              <span>Three.js</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-px w-5 bg-gradient-to-r from-soft-violet/25 to-transparent" />

              <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-muted-foreground/24">
                Sri Lanka
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}