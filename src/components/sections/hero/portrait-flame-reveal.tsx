
"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

type PortraitFlameRevealProps = {
  src: string;
  alt: string;
  className?: string;
};

const DURATION = 5;

export function PortraitFlameReveal({
  src,
  alt,
  className = "",
}: PortraitFlameRevealProps) {
  const reduceMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const flameMaskId = `flame-mask-${id}`;
  const glowId = `flame-glow-${id}`;

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Actual portrait — revealed from bottom to top */}
      <motion.div
        className="absolute inset-0"
        initial={
          reduceMotion
            ? false
            : {
                clipPath: "inset(100% 0 0 0)",
              }
        }
        animate={{
          clipPath: "inset(0% 0 0 0)",
        }}
        transition={{
          duration: reduceMotion ? 0 : DURATION,
          ease: [0.45, 0, 0.25, 1],
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 94vw, 610px"
          className="object-contain object-bottom drop-shadow-[0_28px_38px_rgba(43,35,90,0.07)]"
        />
      </motion.div>

      {/* Animated flame boundary */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{
            duration: DURATION,
            times: [0, 0.75, 0.92, 1],
          }}
        >
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 600 800"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id={glowId}
                x1="0"
                y1="1"
                x2="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#6B36E8" />
                <stop offset="45%" stopColor="#AA78FF" />
                <stop offset="100%" stopColor="#F1DFFF" />
              </linearGradient>

              <mask id={flameMaskId}>
                <rect width="600" height="800" fill="white" />
              </mask>

              <filter
                id={`soft-glow-${id}`}
                x="-50%"
                y="-100%"
                width="200%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>

            <motion.g
              initial={{ y: 800 }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION,
                ease: [0.45, 0, 0.25, 1],
              }}
            >
              {/* Soft luminous heat front */}
              <path
                d="M -40 12 Q 40 -12 110 8 T 260 8 T 420 8 T 640 12"
                stroke="#A875FF"
                strokeWidth="30"
                opacity="0.35"
                fill="none"
                filter={`url(#soft-glow-${id})`}
              />

              {/* Main flame line */}
              <path
                d="M -40 12 Q 40 -12 110 8 T 260 8 T 420 8 T 640 12"
                stroke={`url(#${glowId})`}
                strokeWidth="4"
                fill="none"
              />

              {/* Flame tongues */}
              {Array.from({ length: 35 }, (_, i) => {
                const x = i * 18 - 12;
                const height = 25 + ((i * 17) % 45);

                return (
                  <motion.path
                    key={i}
                    d={`M ${x} 12 Q ${x - 12} ${-height / 2} ${x + 3} ${-height} Q ${x + 13} ${-height / 2} ${x + 14} 12 Z`}
                    fill={`url(#${glowId})`}
                    initial={{ opacity: 0.35, scaleY: 0.7 }}
                    animate={{
                      opacity: [0.3, 0.9, 0.45, 0.8],
                      scaleY: [0.65, 1.15, 0.8, 1.05],
                    }}
                    transition={{
                      duration: 0.5 + (i % 4) * 0.15,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    style={{
                      transformOrigin: `${x + 7}px 12px`,
                    }}
                  />
                );
              })}
            </motion.g>
          </svg>
        </motion.div>
      )}
    </div>
  );
}
