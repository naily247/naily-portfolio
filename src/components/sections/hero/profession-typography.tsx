
'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'motion/react';

type Phase = 'scattered' | 'assembling' | 'igniting' | 'settled';

type ProfessionTypographyProps = {
  visible: boolean;
  reduceMotion: boolean;
  driftX: number;
  driftY: number;
  onIgnite?: () => void;
  onHumanPreviewChange?: (active: boolean) => void;
  onHumanToggle?: () => void;
  humanLocked?: boolean;
};

type ScatterPosition = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const WORD = 'SOFTWARE ENGINEER';
const LETTERS = Array.from(WORD);

const ASSEMBLY_START = 0.4;
const IGNITION_START = 4.65;
const SETTLE_TIME = 5.95;

// Each letter begins at a different location in the hero.
// Coordinates are percentages of the browser viewport.
const ORIGINS: Array<[number, number]> = [
  [8, 19],
  [86, 17],
  [25, 76],
  [71, 12],
  [11, 63],
  [91, 76],
  [47, 20],
  [77, 82],
  [16, 39],
  [50, 83],
  [90, 38],
  [35, 14],
  [65, 74],
  [8, 83],
  [81, 25],
  [43, 69],
  [94, 58],
];

const ARRIVAL_ORDER = [
  6, 2, 11, 0, 14, 4, 9, 1, 12,
  7, 15, 3, 10, 5, 13, 8, 16,
];

const ZERO: ScatterPosition = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
};

export function ProfessionTypography({
  visible,
  reduceMotion,
  driftX,
  driftY,
  onIgnite,
  onHumanPreviewChange,
  onHumanToggle,
  humanLocked = false,
}: ProfessionTypographyProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const ignitionCallbackRef = useRef(onIgnite);
const hasPlayedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>(
    reduceMotion ? 'settled' : 'scattered',
  );
  const [positions, setPositions] = useState<ScatterPosition[]>([]);
  const [measured, setMeasured] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pointerX, setPointerX] = useState(0);

  useEffect(() => {
    ignitionCallbackRef.current = onIgnite;
  }, [onIgnite]);

  // Calculate a true hero-wide starting position for every letter.
  // We measure each letter's final position, then calculate the
  // translation required to place it at its scattered origin.
  useLayoutEffect(() => {
    if (reduceMotion) {
      setMeasured(true);
      return;
    }

    let frame = 0;

    const measure = () => {
      if (!visualRef.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const nextPositions = LETTERS.map((_, index) => {
        const element = letterRefs.current[index];

        if (!element) return ZERO;

        const rect = element.getBoundingClientRect();
        const [originX, originY] = ORIGINS[index];

        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        const scatteredX = (originX / 100) * viewportWidth;
        const scatteredY = (originY / 100) * viewportHeight;

        return {
          x: scatteredX - targetX,
          y: scatteredY - targetY,
          rotate: Math.sin(index * 2.37 + 0.7) * 52,
          scale: 0.45 + (index % 5) * 0.12,
        };
      });

      setPositions(nextPositions);
      setMeasured(true);
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    window.addEventListener('resize', scheduleMeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [reduceMotion]);


  // Play the assembly once per component mount.
  // Returning to the viewport preserves the completed typography.
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (reduceMotion) {
      hasPlayedRef.current = true;
      setPhase('settled');
      return;
    }

    if (!measured) return;

    // Once started, never scatter the letters again on scroll.
    if (hasPlayedRef.current) {
      setPhase('settled');
      return;
    }

    // Wait until the hero is visible for its first animation.
    if (!visible) return;

    hasPlayedRef.current = true;
    setPhase('scattered');

    timersRef.current.push(
      setTimeout(() => {
        setPhase('assembling');
      }, ASSEMBLY_START * 1000),

      setTimeout(() => {
        setPhase('igniting');
        ignitionCallbackRef.current?.();
      }, IGNITION_START * 1000),

      setTimeout(() => {
        setPhase('settled');
      }, SETTLE_TIME * 1000),
    );

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [visible, reduceMotion, measured]);


  useEffect(() => {
    if (!expanded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expanded]);

  const scattered = phase === 'scattered';
  const assembling = phase === 'assembling';
  const igniting = phase === 'igniting';
  const assembled = phase === 'settled' || igniting;
  const interactive = visible && assembled;
  const depthActive = interactive && (hovered || expanded);

  const typographyClass =
    'font-sans text-[clamp(4.4rem,6.3vw,6.7rem)] font-black uppercase leading-none tracking-[-0.065em]';

  return (
    <>
      {/* VISUAL TYPOGRAPHY — BELOW PORTRAIT */}
      <motion.div
        ref={visualRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-[calc((100vw-100%)/-2+4vw)] top-[62%] z-[1] hidden w-screen -translate-y-1/2 lg:block"
        animate={{
          x: driftX,
          y: driftY,
        }}
        transition={{
          type: 'spring',
          stiffness: 55,
          damping: 24,
        }}
      >
        <div className="relative w-fit [perspective:1200px]">
          <motion.div
            className={`relative whitespace-nowrap ${typographyClass}`}
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX:
                reduceMotion
                  ? 0
                  : expanded
                    ? -6
                    : hovered && interactive
                      ? -2
                      : 0,
              rotateY:
                reduceMotion
                  ? 0
                  : expanded
                    ? -9
                    : hovered && interactive
                      ? pointerX * 4
                      : 0,
              scale:
                reduceMotion
                  ? 1
                  : expanded
                    ? 1.015
                    : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 105,
              damping: 22,
            }}
          >
            {/* 3D contour layers, revealed after assembly */}
            {[3, 2, 1].map((layer) => (
              <motion.span
                key={layer}
                className="absolute inset-0 block"
                style={{
                  color: 'transparent',
                  WebkitTextStroke:
                    '1px rgba(124,108,242,0.30)',
                }}
                animate={{
                  x: depthActive
                    ? -layer * (expanded ? 5 : 2)
                    : 0,
                  y: depthActive
                    ? -layer * (expanded ? 2.2 : 0.8)
                    : 0,
opacity: depthActive
  ? expanded
    ? 0.12 + (4 - layer) * 0.09
    : 0.07 + (4 - layer) * 0.055
  : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 115,
                  damping: 22,
                }}
              >
                {WORD}
              </motion.span>
            ))}

            {/* INDIVIDUAL LETTER CONSTELLATION */}
            <span className="relative block">
              {LETTERS.map((character, index) => {
                const origin = positions[index] ?? ZERO;
                const isSpace = character === ' ';
                const order = ARRIVAL_ORDER.indexOf(index);

                // All letters begin flying at slightly different times.
                // Their paths curve rather than move in straight lines.
                const delay = Math.max(0, order) * 0.115;
                const duration =
                  2.65 + (index % 5) * 0.22;

                const curveX =
                  Math.sin(index * 1.8) * 85;
                const curveY =
                  Math.cos(index * 2.1) * 65;

                return (
                  <motion.span
                    key={`${index}-${character}`}
                    ref={(element) => {
                      letterRefs.current[index] = element;
                    }}
                    className="relative inline-block"
                    style={{
                      whiteSpace: 'pre',
                      transformOrigin: 'center',
                      visibility:
                        measured || reduceMotion
                          ? 'visible'
                          : 'hidden',
                    }}
                    initial={false}
                    animate={
                      reduceMotion
                        ? {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                            opacity: 1,
                            color: 'rgba(112,85,205,0.22)',
                          }
                        : scattered
                          ? {
                              x: origin.x,
                              y: origin.y,
                              rotate: origin.rotate,
                              scale: origin.scale,
                              opacity: isSpace ? 0 : 0.34,
                              color:
                                'rgba(126,91,229,0.36)',
                              textShadow:
                                '0 0 10px rgba(151,108,255,0.20)',
                            }
                          : assembling
                            ? {
                                x: [
                                  origin.x,
                                  origin.x * 0.64 + curveX,
                                  origin.x * 0.25 - curveX * 0.35,
                                  0,
                                ],
                                y: [
                                  origin.y,
                                  origin.y * 0.60 + curveY,
                                  origin.y * 0.22 - curveY * 0.35,
                                  0,
                                ],
                                rotate: [
                                  origin.rotate,
                                  origin.rotate * 0.65,
                                  -origin.rotate * 0.15,
                                  0,
                                ],
                                scale: [
                                  origin.scale,
                                  0.82,
                                  1.06,
                                  1,
                                ],
                                opacity: isSpace
                                  ? 0
                                  : [0.34, 0.48, 0.7, 1],
                                color:
                                  'rgba(121,87,218,0.38)',
                                textShadow:
                                  '0 0 13px rgba(151,108,255,0.28)',
                              }
                            : {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                scale: 1,
                                opacity: 1,
                                color: igniting
                                  ? 'rgba(143,105,249,0.57)'
                                  : depthActive
                                    ? expanded
                                      ? 'rgba(100,74,194,0.42)'
                                      : 'rgba(111,85,210,0.27)'
                                    : 'rgba(25,23,40,0.07)',
                                textShadow: igniting
                                  ? '0 0 19px rgba(147,105,255,0.56)'
                                  : '0 0 0px rgba(147,105,255,0)',
                              }
                    }
                    transition={
                      assembling
                        ? {
                            duration,
                            delay,
                            ease: [0.35, 0.05, 0.17, 1],
                          }
                        : scattered
                          ? {
                              duration: 0.85,
                              ease: [0.45, 0, 0.2, 1],
                            }
                          : {
                              duration: 0.65,
                              ease: 'easeOut',
                            }
                    }
                  >
                    {character}
                  </motion.span>
                );
              })}
            </span>

            {/* PEARL-VIOLET NEON IGNITION */}
            <motion.span
              className="absolute inset-0 block text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(105deg, transparent 0%, transparent 34%, rgba(164,123,255,0.45) 43%, rgba(255,255,255,0.98) 50%, rgba(177,134,255,0.75) 57%, transparent 66%, transparent 100%)',
                backgroundSize: '260% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                filter:
                  'drop-shadow(0 0 9px rgba(143,102,255,0.55))',
              }}
              initial={false}
              animate={{
                opacity:
                  igniting && !reduceMotion ? 1 : 0,
                backgroundPositionX:
                  igniting && !reduceMotion
                    ? '0%'
                    : '100%',
              }}
              transition={{
                opacity: {
                  duration: 0.25,
                },
                backgroundPositionX: {
                  duration: 1.2,
                  ease: 'easeInOut',
                },
              }}
            >
              {WORD}
            </motion.span>
          </motion.div>

          {/* IGNITION SIGNAL ACROSS THE BASELINE */}
          <motion.div
            className="absolute -bottom-2 left-0 h-[2px] w-[50px] rounded-full bg-gradient-to-r from-transparent via-white to-[#9672ff]"
            style={{
              boxShadow:
                '0 0 15px rgba(135,95,255,0.85)',
            }}
            initial={false}
            animate={{
              left:
                igniting && !reduceMotion
                  ? '96%'
                  : '0%',
              opacity:
                igniting && !reduceMotion
                  ? [0, 1, 1, 0]
                  : 0,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
            }}
          />

          {/* SPARSE VIOLET SPARKS */}
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.span
              key={index}
              className="absolute h-[3px] w-[3px] rounded-full bg-[#b69bff]"
              style={{
                left: `${17 + index * 17}%`,
                top: `${index % 2 === 0 ? 18 : 78}%`,
                boxShadow:
                  '0 0 12px rgba(143,102,255,0.95)',
              }}
              initial={false}
              animate={{
                opacity:
                  igniting && !reduceMotion
                    ? [0, 1, 0]
                    : 0,
                y:
                  igniting && !reduceMotion
                    ? [6, -12 - index * 3]
                    : 0,
                x:
                  igniting && !reduceMotion
                    ? [0, index % 2 === 0 ? 9 : -9]
                    : 0,
                scale:
                  igniting && !reduceMotion
                    ? [0.5, 1.8, 0.3]
                    : 0,
              }}
              transition={{
                duration: 0.9,
                delay: index * 0.13,
              }}
            />
          ))}

          {/* MINIMAL ARCHITECTURAL BASELINE */}
          <motion.div
            className="absolute -bottom-5 left-0 h-px bg-gradient-to-r from-[#9372f7]/60 via-[#a3a4e8]/30 to-transparent"
            animate={{
              width: !assembled
                ? '0%'
                : expanded
                  ? '100%'
                  : hovered
                    ? '65%'
                    : '12%',
              opacity: !assembled
                ? 0
                : depthActive
                  ? 0.8
                  : 0.18,
            }}
            transition={{
              duration: 0.6,
            }}
          />

          <motion.div
            className="absolute -bottom-9 left-0 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.19em] text-[#8b72e5]"
            animate={{
              opacity: depthActive ? 0.75 : 0,
              y: depthActive ? 0 : -4,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <span className="h-1 w-1 rounded-full bg-[#9372f7]" />
            <span>
              {expanded
                ? 'Depth system / expanded'
                : 'Depth system / preview'}
            </span>
            <span className="h-px w-8 bg-[#9372f7]/30" />
            <span>{expanded ? '03D' : '02D'}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* INVISIBLE, ACCESSIBLE INTERACTION TARGET */}
      <div className="pointer-events-none absolute left-[calc((100vw-100%)/-2+4vw)] top-[62%] z-[3] hidden w-fit -translate-y-1/2 lg:block">
        <button
          type="button"
          disabled={!interactive}
aria-label={
  humanLocked
    ? 'Hide personal portrait reveal'
    : 'Reveal personal portrait'
}
          aria-pressed={expanded}
onPointerEnter={() => {
  setHovered(true);
  onHumanPreviewChange?.(true);
}}
onPointerLeave={() => {
  setHovered(false);
  setPointerX(0);
  onHumanPreviewChange?.(false);
}}
          onPointerMove={(event) => {
            if (reduceMotion) return;

            const bounds =
              event.currentTarget.getBoundingClientRect();

            setPointerX(
              ((event.clientX - bounds.left) /
                bounds.width -
                0.5) *
                2,
            );
          }}
onFocus={() => {
  setHovered(true);
  onHumanPreviewChange?.(true);
}}
onBlur={() => {
  setHovered(false);
  onHumanPreviewChange?.(false);
}}
onClick={() => {
  setExpanded((current) => !current);
  onHumanToggle?.();
}}
          className={`pointer-events-auto block cursor-pointer border-0 bg-transparent p-0 text-left !outline-none !ring-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!shadow-none disabled:pointer-events-none [&:focus-visible_span]:underline [&:focus-visible_span]:decoration-[#8b72e5]/60 [&:focus-visible_span]:underline-offset-[12px] ${typographyClass}`}
          >
          <span className="block whitespace-nowrap text-transparent">
            {WORD}
          </span>
        </button>
      </div>
    </>
  );
}
