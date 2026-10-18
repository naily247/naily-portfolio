
"use client";

import { motion } from "motion/react";

type LivingPortraitProps = {
  active?: boolean;
  reduceMotion?: boolean | null;
  pointerX?: number;
  pointerY?: number;
};

export function LivingPortrait({
  active = false,
  reduceMotion = false,
  pointerX = 50,
  pointerY = 50,
}: LivingPortraitProps) {
  const x = reduceMotion ? 0 : (pointerX - 50) / 50;
  const y = reduceMotion ? 0 : (pointerY - 50) / 50;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5]"
    >
      {/* Subtle depth field — no oversized orbital graphics */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: x * -10,
          y: y * -7,
        }}
        transition={{
          type: "spring",
          stiffness: 45,
          damping: 25,
        }}
      >
        <div
          className="absolute left-[19%] top-[18%] h-[62%] w-[68%] rounded-full blur-[75px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(177,151,248,0.23), rgba(194,177,251,0.08) 48%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* Typography ignition — one deliberate light event */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: active && !reduceMotion ? 1 : 0,
        }}
        transition={{
          duration: active ? 0.22 : 1.3,
          ease: "easeOut",
        }}
        style={{
          background:
            "radial-gradient(ellipse at 54% 39%, rgba(255,255,255,0.45), rgba(184,155,255,0.20) 35%, transparent 68%)",
          filter: "blur(28px)",
        }}
      />

      {/* Restrained technical markers */}
      <motion.svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        fill="none"
        animate={{
          x: x * 7,
          y: y * 5,
          opacity: active ? 0.7 : 0.28,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <path
          d="M 90 345 C 125 205, 220 125, 355 112"
          stroke="#9E85E9"
          strokeWidth="0.8"
          strokeDasharray="3 10"
        />
        <path
          d="M 440 170 C 515 245, 530 350, 515 420"
          stroke="#B4A0ED"
          strokeWidth="0.8"
        />
        <circle cx="355" cy="112" r="2" fill="#9B7FE8" />
        <circle cx="515" cy="420" r="2" fill="#9B7FE8" />
      </motion.svg>
    </div>
  );
}
