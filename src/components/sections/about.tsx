
'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
} from 'lucide-react';

import { Container } from '@/components/ui/container';

const AboutScene = dynamic(
  () => import('@/components/sections/about/about-scene'),
  { ssr: false },
);

const EASE = [0.22, 1, 0.36, 1] as const;
const STORY_INTERVAL = 5800;

const stories = [
  {
    number: '01',
    label: 'THE FIRST IMPRESSION',
    title: 'A little reserved.',
    description:
      'Usually quiet until I get comfortable. After that, well, the silence rarely lasts.',
    reveal: 'The quiet part is only the beginning.',
    note: 'FIRST IMPRESSIONS CAN BE DECEIVING',
  },
  {
    number: '02',
    label: 'THE WAY I THINK',
    title: 'A mind that wanders.',
    description:
      'One question becomes another. I like following ideas until something interesting happens.',
    reveal: 'I have a habit of asking one more question.',
    note: 'CURIOSITY HAS NO OFF SWITCH',
  },
  {
    number: '03',
    label: 'THE LITTLE THINGS',
    title: 'I notice things.',
    description:
      'Small details, unexpected connections, and the things that make an experience feel right.',
    reveal: 'Sometimes the smallest detail changes everything.',
    note: 'THE LITTLE THINGS ADD UP',
  },
] as const;

type StoryIndex = 0 | 1 | 2;

function StoryFragment({
  index,
  active,
  onActivate,
  onDeactivate,
  reduceMotion,
}: {
  index: StoryIndex;
  active: StoryIndex;
  onActivate: (index: StoryIndex) => void;
  onDeactivate: () => void;
  reduceMotion: boolean;
}) {
  const story = stories[index];
  const selected = active === index;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 30 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : 0.25 + index * 0.16,
        ease: EASE,
      }}
      className="relative min-w-0"
    >
      <button
        type="button"
        aria-label={`Explore ${story.title}`}
        aria-pressed={selected}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') {
            onActivate(index);
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') {
            onDeactivate();
          }
        }}
        onFocus={() => onActivate(index)}
        onBlur={onDeactivate}
        onClick={() => onActivate(index)}
        className="group block w-full cursor-pointer text-left outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-soft-violet"
      >
        <div className="flex items-center gap-3">
          <span className="shrink-0 font-mono text-[9px] tracking-[0.14em] text-accent">
            {story.number} / {story.label}
          </span>

          <span className="h-px min-w-0 flex-1 bg-soft-violet/25" />

          <motion.span
            animate={{
              rotate: selected ? 45 : 0,
              opacity: selected ? 1 : 0.5,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
            }}
            className="shrink-0 text-soft-violet"
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        </div>

        <motion.h3
          animate={{
            x: selected ? 7 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: EASE,
          }}
          className={`mt-4 font-serif text-[clamp(1.55rem,2.05vw,2.5rem)] italic leading-[1.1] tracking-[-0.035em] transition-colors duration-500 ${
            selected
              ? 'text-soft-violet'
              : 'text-foreground'
          }`}
        >
          {story.title}
        </motion.h3>

        <p className="mt-3 max-w-[320px] text-[13px] leading-[1.7] text-muted-foreground">
          {story.description}
        </p>
      </button>

      {/* Reserved height prevents layout jumping. */}
      <div className="relative mt-4 h-[40px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {selected && (
            <motion.div
              key={story.number}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: -8 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: EASE,
              }}
              className="absolute inset-x-0 top-0"
            >
              <p className="font-serif text-[15px] italic leading-[1.3] text-soft-violet">
                {story.reveal}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative h-px w-full overflow-hidden bg-soft-violet/15">
        <motion.div
          initial={false}
          animate={{
            scaleX: selected ? 1 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: EASE,
          }}
          style={{ transformOrigin: 'left' }}
          className="absolute inset-0 bg-soft-violet/70"
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="font-mono text-[8px] tracking-[0.12em] text-muted-foreground/50">
          {story.note}
        </span>

        <span className="shrink-0 font-mono text-[8px] text-soft-violet/55">
          N.A. — {story.number}
        </span>
      </div>
    </motion.div>
  );
}

function PortraitComposition({
  active,
  reduceMotion,
}: {
  active: StoryIndex;
  reduceMotion: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 65,
    damping: 28,
  });

  const springY = useSpring(mouseY, {
    stiffness: 65,
    damping: 28,
  });

  const portraitX = useTransform(
    springX,
    [-1, 1],
    [-10, 10],
  );

  const portraitY = useTransform(
    springY,
    [-1, 1],
    [-6, 6],
  );

  const frameX = useTransform(
    springX,
    [-1, 1],
    [14, -14],
  );

  const frameY = useTransform(
    springY,
    [-1, 1],
    [8, -8],
  );

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (
      reduceMotion ||
      event.pointerType !== 'mouse'
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      ((event.clientX - bounds.left) /
        bounds.width -
        0.5) *
        2,
    );

    mouseY.set(
      ((event.clientY - bounds.top) /
        bounds.height -
        0.5) *
        2,
    );
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative h-[440px] w-full sm:h-[520px] lg:h-full"
    >
      {/* REACTIVE EDITORIAL FRAME */}
      <motion.div
        style={
          reduceMotion
            ? undefined
            : { x: frameX, y: frameY }
        }
        animate={{
          borderRadius:
            active === 0
              ? '48% 48% 0% 0%'
              : active === 1
                ? '43% 50% 0% 0%'
                : '50% 43% 0% 0%',
        }}
        transition={{
          duration: reduceMotion ? 0 : 1.3,
          ease: EASE,
        }}
        className="pointer-events-none absolute inset-x-[11%] bottom-[6%] top-[9%] border border-soft-violet/25"
      />

      {/* SOFT DEPTH LAYER */}
      <motion.div
        animate={{
          scale:
            active === 0
              ? 1
              : active === 1
                ? 1.06
                : 0.97,
          x:
            active === 0
              ? 0
              : active === 1
                ? -8
                : 9,
          y:
            active === 0
              ? 0
              : active === 1
                ? -5
                : 6,
        }}
        transition={{
          duration: reduceMotion ? 0 : 1.8,
          ease: EASE,
        }}
        className="pointer-events-none absolute left-[19%] right-[19%] top-[14%] aspect-square rounded-full bg-soft-violet/[0.075]"
      />

      {/* THREE.JS SCULPTURAL DEPTH */}
      <div className="pointer-events-none absolute inset-x-[5%] bottom-[18%] top-[12%] z-0 overflow-hidden">
        <AboutScene
          active={active}
          reducedMotion={reduceMotion}
        />
      </div>

      {/* TYPOGRAPHIC DEPTH */}
      <motion.span
        aria-hidden="true"
        animate={{
          rotate: active === 0 ? -8 : active === 1 ? 5 : -3,
          x: active === 0 ? 0 : active === 1 ? 10 : -8,
        }}
        transition={{
          duration: reduceMotion ? 0 : 1.5,
          ease: EASE,
        }}
        className="pointer-events-none absolute left-1/2 top-[27%] -translate-x-1/2 font-serif text-[clamp(9rem,19vw,23rem)] italic leading-none tracking-[-0.12em] text-soft-violet/[0.07]"
      >
        N.
      </motion.span>

      {/* PORTRAIT — CONTAINED ABOVE FOOTER */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 60 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: reduceMotion ? 0 : 1.15,
          delay: reduceMotion ? 0 : 0.15,
          ease: EASE,
        }}
        className="pointer-events-none absolute inset-x-[4%] bottom-0 top-[3%] z-20 overflow-hidden"
      >
        <motion.div
          style={
            reduceMotion
              ? undefined
              : { x: portraitX, y: portraitY }
          }
          animate={{
            scale:
              active === 0
                ? 1
                : active === 1
                  ? 1.025
                  : 1.012,
          }}
          transition={{
            scale: {
              duration: reduceMotion ? 0 : 1.1,
              ease: EASE,
            },
          }}
          className="absolute inset-x-0 bottom-0 top-0"
        >
          <Image
            src="/images/naily-portrait-newCutOut.png"
            alt="Portrait of Naily Ashvitha"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain object-bottom"
          />
        </motion.div>
      </motion.div>

      {/* ANIMATED ACCENT — AWAY FROM THE FACE */}
      <div className="pointer-events-none absolute right-[1%] top-[12%] z-30 flex flex-col items-end gap-2">
        <motion.div
          animate={{
            rotate: reduceMotion ? 0 : 360,
          }}
          transition={{
            duration: 24,
            ease: 'linear',
            repeat: reduceMotion ? 0 : Infinity,
          }}
        >
          <Asterisk className="h-6 w-6 text-soft-violet/60" />
        </motion.div>

        <span className="font-mono text-[8px] tracking-[0.15em] text-accent">
          A WORK IN PROGRESS
        </span>
      </div>

      {/* SMALL EDITORIAL CAPTION */}
      <div className="pointer-events-none absolute bottom-[7%] left-[2%] z-30 max-w-[125px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 8 }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -8 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.4,
            }}
            className="block font-mono text-[8px] uppercase leading-[1.6] tracking-[0.12em] text-accent"
          >
            {stories[active].label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function About() {
  const reduceMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);

  const [automatic, setAutomatic] =
    useState<StoryIndex>(0);

  const [manual, setManual] =
    useState<StoryIndex | null>(null);

  const [visible, setVisible] = useState(false);

  const active = manual ?? automatic;

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || manual !== null || reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setAutomatic(
        (previous) =>
          ((previous + 1) % 3) as StoryIndex,
      );
    }, STORY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [visible, manual, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-[calc(100svh-80px)] flex-col overflow-hidden border-t border-foreground/[0.08] bg-soft-lavender py-10 sm:py-12 lg:h-[calc(100svh-80px)] lg:min-h-[720px] lg:py-10"
    >
      {/* SECTION LABEL */}
      <Container className="relative z-30 w-full">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
            About / 01
          </span>

          <span className="h-px w-10 bg-foreground/10" />

          <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/45">
            Beyond the screen
          </span>
        </div>
      </Container>

      {/* MAIN EDITORIAL COMPOSITION */}
      <div className="relative flex flex-1 flex-col lg:min-h-0">
        <Container className="relative z-20 flex w-full flex-1 flex-col">
          <div className="grid flex-1 grid-cols-1 items-center gap-6 py-8 lg:min-h-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)_minmax(0,0.85fr)] lg:gap-0 lg:py-0">
            {/* LEFT */}
            <div className="relative z-30 flex flex-col justify-center lg:pr-5">
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 28 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: reduceMotion ? 0 : 0.85,
                  ease: EASE,
                }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                  NOT EVERYTHING FITS IN A JOB TITLE
                </span>

                <h2 className="mt-5 font-serif text-[clamp(3.2rem,4.5vw,5.4rem)] leading-[0.96] tracking-[-0.075em] text-foreground">
                  Beyond
                  <br />
                  the first
                  <br />
                  <span className="italic text-soft-violet">
                    impression.
                  </span>
                </h2>

                <p className="mt-6 max-w-[330px] text-[14px] leading-[1.75] text-muted-foreground">
                  I&apos;m Naily. A software engineer
                  in the making, a curious mind,
                  and someone who&apos;s usually a
                  little more interesting once
                  the awkward introductions are over.
                </p>
              </motion.div>

              <div className="mt-9 hidden lg:block">
                <StoryFragment
                  index={0}
                  active={active}
                  onActivate={setManual}
                  onDeactivate={() => setManual(null)}
                  reduceMotion={reduceMotion}
                />
              </div>
            </div>

            {/* CENTER */}
            <div className="relative z-20 h-full min-h-[420px] lg:min-h-0">
              <PortraitComposition
                active={active}
                reduceMotion={reduceMotion}
              />
            </div>

            {/* RIGHT */}
            <div className="relative z-30 flex flex-col justify-center gap-9 lg:pl-5">
              <StoryFragment
                index={1}
                active={active}
                onActivate={setManual}
                onDeactivate={() => setManual(null)}
                reduceMotion={reduceMotion}
              />

              <StoryFragment
                index={2}
                active={active}
                onActivate={setManual}
                onDeactivate={() => setManual(null)}
                reduceMotion={reduceMotion}
              />
            </div>

            {/* MOBILE FIRST STORY */}
            <div className="lg:hidden">
              <StoryFragment
                index={0}
                active={active}
                onActivate={setManual}
                onDeactivate={() => setManual(null)}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* FOOTER */}
      <Container className="relative z-30 w-full">
        <div className="flex items-center justify-between gap-5 border-t border-foreground/10 pt-3">
          <span className="text-[9px] uppercase tracking-[0.17em] text-muted-foreground/45">
            More than meets the eye.
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/40">
              The work comes next
            </span>

            <ArrowDownRight
              aria-hidden="true"
              className="h-3.5 w-3.5 text-soft-violet/55"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
