'use client';

import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { Container } from '@/components/ui/container';

const principles = [
  {
    number: '01',
    title: 'Across the stack',
    description:
      'I like seeing how the interface, application logic, and data connect.',
  },
  {
    number: '02',
    title: 'Flows that make sense',
    description:
      'A feature should feel clear to use, not just technically complete.',
  },
  {
    number: '03',
    title: 'Structure behind it',
    description:
      'I enjoy understanding how the pieces are organised and work together.',
  },
  {
    number: '04',
    title: 'The final 10%',
    description:
      'Small inconsistencies, edge cases, and refinements are usually worth another look.',
  },
];

export function About() {
  const reduceMotion = useReducedMotion();
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-foreground/[0.08] bg-soft-lavender pt-14 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10"
    >
{/* Quiet atmosphere */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  {/* Local cool light around the introduction */}
  <div className="absolute left-[6%] top-[16%] h-[18rem] w-[20rem] rounded-full bg-cool-blue/[0.025] blur-[130px]" />

  {/* Restrained violet light around the product-thinking side */}
  <div className="absolute right-[8%] top-[24%] h-[20rem] w-[22rem] rounded-full bg-soft-violet/[0.035] blur-[135px]" />
</div>

      <Container className="relative z-10">
        {/* Section marker */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-3"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
            About / 01
          </p>

          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: 0.15,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-px w-10 origin-left bg-foreground/10"
          />

          <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/45">
            A little about me
          </span>
        </motion.div>

        {/* Main introduction */}
        <div className="mt-7 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          {/* Personal introduction */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.8rem)] leading-[0.92] tracking-[-0.045em] text-foreground">
              So, Naily here.
            </h2>

<p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-[17px] sm:leading-8">
  I&apos;m a Software Engineering undergraduate and Software
  Engineering Intern in Sri Lanka, building across both frontend
  and backend. I enjoy understanding how a product comes together
  — not just individual features, but the flow, logic, and details
  connecting them.
</p>
          </motion.div>

          {/* How I think */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.07,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-end lg:border-l lg:border-foreground/10 lg:pl-12"
          >
<p className="max-w-2xl font-serif text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.02] tracking-[-0.035em] text-foreground">
  I care about the whole product

  <motion.span
    initial={
      reduceMotion
        ? false
        : {
            opacity: 0.48,
          }
    }
    whileInView={
      reduceMotion
        ? undefined
        : {
            opacity: 1,
          }
    }
    viewport={{
      once: true,
      amount: 0.8,
    }}
    transition={{
      delay: 0.22,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      relative
      text-soft-violet
    "
  >
    {' '}
    — not only the code that makes it run.

    <motion.span
      aria-hidden="true"
      initial={
        reduceMotion
          ? false
          : {
              scaleX: 0,
              opacity: 0,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              scaleX: 1,
              opacity: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.8,
      }}
      transition={{
        delay: 0.45,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        -bottom-1
        left-0
        h-px
        w-[42%]
        origin-left
        bg-gradient-to-r
        from-soft-violet/55
        to-transparent
      "
    />
  </motion.span>
</p>

<p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
  I tend to notice when a flow feels awkward, a detail seems out
  of place, or the structure behind something could be clearer.
  Getting something to work matters, but I also enjoy questioning
  it, refining it, and making the overall experience feel more
  considered.
</p>
          </motion.div>
        </div>

        {/* Principles */}
<div
  className="
    relative
    mt-10
    border-y
    border-foreground/10
  "
>

  {/* Shared principle atmosphere */}

<motion.div
  aria-hidden="true"
  className="
    pointer-events-none
    absolute
    inset-y-0
    hidden
    w-1/4
    bg-gradient-to-b
    from-soft-violet/[0.10]
    via-soft-violet/[0.045]
    to-transparent
    blur-[1px]
    lg:block
  "
  animate={{
    x:
      activePrinciple === null
        ? '0%'
        : `${activePrinciple * 100}%`,

    opacity:
      activePrinciple === null
        ? 0
        : 1,
  }}
  transition={{
    x: {
      type: 'spring',
      stiffness: 260,
      damping: 30,
      mass: 0.7,
    },
    opacity: {
      duration: 0.22,
    },
  }}
/>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4"
            onMouseLeave={() => setActivePrinciple(null)}
          >
            {principles.map((principle, index) => {
              const isActive = activePrinciple === index;
              const isDimmed =
                activePrinciple !== null && activePrinciple !== index;

              return (
                <motion.div
                  key={principle.title}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 16,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    delay: 0.06 + index * 0.055,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setActivePrinciple(index)}
                  onFocus={() => setActivePrinciple(index)}
                  onBlur={() => setActivePrinciple(null)}
                  tabIndex={0}
                  className={[
                    'group relative min-h-[154px] cursor-default overflow-hidden px-1 py-6 outline-none sm:px-5 sm:py-6',
                    'transition-opacity duration-300',
                    isDimmed ? 'opacity-[0.68]' : 'opacity-100',
                    index !== 0
                      ? 'border-t border-foreground/10 sm:border-t-0'
                      : '',
                    index === 1
                      ? 'sm:border-l sm:border-foreground/10'
                      : '',
                    index === 2
                      ? 'lg:border-l lg:border-foreground/10'
                      : '',
                    index === 3
                      ? 'sm:border-l sm:border-foreground/10'
                      : '',
                  ].join(' ')}
                >
{/* Active bottom signal */}

<motion.span
  aria-hidden="true"
  className="
    absolute
    inset-x-0
    bottom-0
    h-px
    origin-left
    bg-gradient-to-r
    from-transparent
    via-soft-violet/80
    to-transparent
  "
  animate={
    reduceMotion
      ? undefined
      : {
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }
  }
  initial={false}
  transition={{
    duration: 0.42,
    ease: [0.22, 1, 0.36, 1],
  }}
/>

<AnimatePresence>
  {isActive && !reduceMotion && (
    <motion.span
      aria-hidden="true"
      initial={{
        left: '4%',
        opacity: 0,
      }}
      animate={{
        left: ['4%', '88%'],
        opacity: [0, 1, 0],
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        pointer-events-none
        absolute
        bottom-[-2px]
        h-[5px]
        w-[5px]
        rounded-full
        bg-soft-violet
        shadow-[0_0_10px_rgba(124,108,242,0.55)]
      "
    />
  )}
</AnimatePresence>

                  <div className="flex items-start justify-between gap-4">
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              x: isActive ? 3 : 0,
                            }
                      }
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-[9px] font-semibold tracking-[0.16em] text-accent"
                    >
                      {principle.number}
                    </motion.span>

                    <motion.span
                      aria-hidden="true"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              scale: isActive ? 1.35 : 1,
                              backgroundColor: isActive
                                ? 'var(--accent)'
                                : 'rgba(0,0,0,0)',
                            }
                      }
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mt-1 h-1.5 w-1.5 rounded-full border border-soft-violet/50 shadow-[0_0_0_3px_rgba(124,108,242,0.025)]"
                    />
                  </div>

                  <motion.h3
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: isActive ? -2 : 0,
                          }
                    }
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-6 text-sm font-semibold tracking-[-0.01em] text-foreground sm:text-[15px]"
                  >
                    {principle.title}
                  </motion.h3>

                  <motion.p
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: isActive ? 1 : 0.7,
                            y: isActive ? -2 : 0,
                          }
                    }
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-2.5 max-w-[15rem] text-xs leading-[1.65] text-muted-foreground sm:text-[13px]"
                  >
                    {principle.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Small closing note */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.25,
            duration: 0.7,
          }}
          className="mt-5 flex items-center justify-between gap-6"
        >
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/35">
            Think · Build · Refine
          </p>

          <div
            aria-hidden="true"
            className="flex flex-1 items-center justify-end gap-2"
          >
            <motion.span
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-px max-w-28 flex-1 origin-right bg-gradient-to-l from-soft-violet/30 via-soft-violet/12 to-transparent"
            />

            <span className="h-1 w-1 rounded-full bg-soft-violet/65 shadow-[0_0_7px_rgba(124,108,242,0.35)]" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}