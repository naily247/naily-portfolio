
'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
} from 'lucide-react';

type HumanRevealProps = {
  reduceMotion: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const facts = [
  {
    id: 'education',
    number: '01',
    label: 'THE JOURNEY',
    title: 'Software Engineering',
    detail: 'BSc (Hons) IT · SLIIT',
    icon: GraduationCap,
    phase: Math.PI,
  },
  {
    id: 'internship',
    number: '02',
    label: 'RIGHT NOW',
    title: 'SE Intern',
    detail: 'Source Code Limited',
    icon: BriefcaseBusiness,
    phase: Math.PI / 3,
  },
  {
    id: 'graduation',
    number: '03',
    label: 'NEXT CHAPTER',
    title: 'Class of 2027',
    detail: 'Expected graduation',
    icon: CalendarDays,
    phase: (Math.PI * 5) / 3,
  },
];

type Fact = (typeof facts)[number];

function OrbitCard({
  fact,
  reduceMotion,
  orbitTime,
}: {
  fact: Fact;
  reduceMotion: boolean;
  orbitTime: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState(false);

const initialAngle = fact.phase;

const x = useMotionValue(Math.cos(initialAngle) * 170);
const y = useMotionValue(
  Math.sin(initialAngle) * 62 -
    Math.cos(initialAngle) * 15,
);

const initialDepth = (Math.sin(initialAngle) + 1) / 2;

const depthScale = useMotionValue(
  0.86 + initialDepth * 0.16,
);

const depthOpacity = useMotionValue(
  0.88 + initialDepth * 0.12,
);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 170,
    damping: 22,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 170,
    damping: 22,
  });

  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(smoothY, [-1, 1], [7, -7]);

useMotionValueEvent(orbitTime, 'change', (time) => {
  const angle = fact.phase + (time / 38) * Math.PI * 2;

const radiusX = 170;
const radiusY = 62;

  const orbitX = Math.cos(angle) * radiusX;
  const orbitY =
    Math.sin(angle) * radiusY -
    Math.cos(angle) * 15;

  const depth = (Math.sin(angle) + 1) / 2;

  x.set(orbitX);
  y.set(orbitY);
depthScale.set(0.86 + depth * 0.16);
depthOpacity.set(0.88 + depth * 0.12);
});

  const Icon = fact.icon;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    pointerX.set(
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
    );

    pointerY.set(
      ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    );
  }

  function resetPointer() {
    setHovered(false);
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      style={{
        x,
        y,
        scale: depthScale,
        opacity: depthOpacity,
        perspective: 900,
      }}
      className="
        absolute
        left-1/2
        top-1/2
w-[158px]
-translate-x-1/2
-translate-y-1/2
sm:w-[174px]
      "
    >
      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, scale: 0.8, y: 25 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 12 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          delay:
            reduceMotion
              ? 0
              : 0.2 + Number(fact.number) * 0.12,
          ease: EASE,
        }}
      >
        <motion.div
          onPointerEnter={() => setHovered(true)}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          style={{
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: hovered && !reduceMotion ? -5 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 190,
            damping: 24,
          }}
          className="
            relative
            rounded-[18px]
            border
            border-soft-violet/25
            bg-background/85
            px-3
            py-3
            shadow-[0_14px_34px_rgba(55,38,110,0.12)]
            backdrop-blur-xl
            transition-[box-shadow,border-color]
            duration-300
            hover:border-soft-violet/50
            hover:shadow-[0_22px_45px_rgba(55,38,110,0.19)]
            sm:px-4
            sm:py-3.5
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[5px]
              rounded-[13px]
              border
              border-white/25
            "
          />

          <div
            className="relative"
            style={{ transform: 'translateZ(18px)' }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-soft-violet">
                {fact.number} · {fact.label}
              </span>

              <Icon
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-soft-violet/75"
                strokeWidth={1.5}
              />
            </div>

            <p className="mt-2.5 font-serif text-[16px] leading-[1.1] tracking-[-0.035em] text-foreground">
              {fact.title}
            </p>

            <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/65">
              {fact.detail}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function OrbitSystem({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
const orbitTime = useMotionValue(0);
const elapsed = useRef(0);
const pausedRef = useRef(false);

useAnimationFrame((_time, delta) => {
  if (!pausedRef.current && !reduceMotion) {
    elapsed.current += Math.min(delta, 50) / 1000;
    orbitTime.set(elapsed.current);
  }
});
function setOrbitPaused(value: boolean) {
  pausedRef.current = value;
}

return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: -14 }
      }
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: EASE,
      }}
      onPointerEnter={() => setOrbitPaused(true)}
onPointerLeave={() => setOrbitPaused(false)}
      className="
  absolute
  left-[52%]
  top-[7%]
  z-30
  h-[240px]
  w-[540px]
  -translate-x-1/2
  -translate-y-1/2
  max-sm:scale-[0.72]
  max-sm:origin-center
"
    >
      {/* THE ORBITAL PATH */}
      <svg
        aria-hidden="true"
        viewBox="0 0 540 240"
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          overflow-visible
        "
        fill="none"
      >
        <motion.ellipse
cx="270"
cy="120"
rx="170"
ry="62"
transform="rotate(-5 270 120)"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 7"
          className="text-soft-violet/35"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 1.8,
            ease: 'easeInOut',
          }}
        />

        <motion.ellipse
cx="270"
cy="120"
rx="186"
ry="73"
transform="rotate(-5 270 120)"
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-soft-violet/20"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 0.3,
            duration: reduceMotion ? 0 : 2,
          }}
        />

        <circle
          cx="270"
          cy="120"
          r="3"
          className="fill-soft-violet/50"
        />
      </svg>

{facts.map((fact) => (
<OrbitCard
  key={fact.id}
  fact={fact}
  reduceMotion={reduceMotion}
  orbitTime={orbitTime}
/>
))}

    </motion.div>
  );
}

function HandwrittenMessage({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 10, rotate: -2 }
      }
      animate={{
        opacity: 1,
        y: 0,
        rotate: -2,
      }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        delay: reduceMotion ? 0 : 0.7,
        duration: reduceMotion ? 0 : 0.5,
        ease: EASE,
      }}
      className="
        absolute
        bottom-[1%]
        right-[3%]
        z-40
        w-[62%]
        text-center
      "
    >
      <motion.div
        initial={
          reduceMotion
            ? false
            : { clipPath: 'inset(0 100% 0 0)' }
        }
        animate={{
          clipPath: 'inset(0 0% 0 0)',
        }}
        transition={{
          delay: reduceMotion ? 0 : 0.95,
          duration: reduceMotion ? 0 : 2,
          ease: 'linear',
        }}
      >
        <p className="font-serif text-[15px] italic leading-[1.25] tracking-[-0.025em] text-foreground sm:text-[19px] lg:text-[21px]">
          You&apos;ve met the engineer.
          <br />
          Now meet the{' '}
          <span className="relative inline-block text-soft-violet">
            daydreamer.
            <motion.span
              aria-hidden="true"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              animate={{ scaleX: 1 }}
              transition={{
                delay: reduceMotion ? 0 : 2.65,
                duration: reduceMotion ? 0 : 0.65,
                ease: EASE,
              }}
              className="
                absolute
                -bottom-1
                left-0
                h-[2px]
                w-full
                origin-left
                -rotate-2
                rounded-full
                bg-soft-violet/60
              "
            />
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export function HumanReveal({
  reduceMotion,
}: HumanRevealProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 55,
    damping: 22,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 55,
    damping: 22,
  });

  const portraitX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-6, 6],
  );

  const portraitY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-4, 4],
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    pointerX.set(
      (event.clientX - bounds.left) / bounds.width - 0.5,
    );

    pointerY.set(
      (event.clientY - bounds.top) / bounds.height - 0.5,
    );
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="
        relative
        mx-auto
        h-[450px]
        w-full
        max-w-[640px]
        overflow-visible
        sm:h-[510px]
        lg:h-[540px]
      "
    >
      {/* PORTRAIT */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 70,
                scale: 0.92,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.85,
          ease: EASE,
        }}
        className="
          pointer-events-none
          absolute
          bottom-[15%]
          right-[-4%]
          z-10
          h-[78%]
          w-[73%]
          origin-bottom
          sm:h-[82%]
          sm:w-[74%]
          lg:h-[85%]
          lg:w-[76%]
        "
      >
        <motion.div
          style={{
            x: reduceMotion ? 0 : portraitX,
            y: reduceMotion ? 0 : portraitY,
          }}
          className="relative h-full w-full"
        >
          <Image
            src="/images/naily-signature-peek.png"
            alt="Naily Ashvitha"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 520px"
            className="
              object-contain
              object-bottom
              drop-shadow-[0_25px_35px_rgba(48,30,85,0.12)]
            "
          />
        </motion.div>
      </motion.div>

      {/* ORBIT ABOVE THE PORTRAIT */}
      <OrbitSystem reduceMotion={reduceMotion} />

      {/* HANDWRITTEN MESSAGE */}
      <HandwrittenMessage reduceMotion={reduceMotion} />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: reduceMotion ? 0 : 1.4,
          duration: reduceMotion ? 0 : 0.5,
        }}
        className="
          absolute
          -bottom-[5%]
          right-[2%]
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-foreground/35
        "
      >
        Still learning · Always building
      </motion.span>
    </div>
  );
}
