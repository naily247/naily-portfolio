'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';

const principles = [
  {
    number: '01',
    title: 'Clean architecture',
    description:
      'I structure systems so responsibilities stay clear and the codebase remains understandable as requirements grow.',
    note: 'Structure before scale',
  },
  {
    number: '02',
    title: 'Good UX',
    description:
      'I think through flows, hierarchy, feedback, and interaction details so the next action feels obvious rather than forced.',
    note: 'Clarity before decoration',
  },
  {
    number: '03',
    title: 'Performance',
    description:
      'Responsiveness is part of the product experience, so I pay attention to what is loaded, rendered, and executed.',
    note: 'Speed is part of UX',
  },
  {
    number: '04',
    title: 'Edge cases',
    description:
      'Loading, empty, error, permission, responsive, and recovery states are considered as part of the feature — not afterwards.',
    note: 'The uncommon path matters',
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-background py-20 sm:py-24"
    >
      {/* subtle background structure */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-cool-blue/[0.06] blur-[130px]" />

        <div className="absolute bottom-[-10rem] left-[15%] h-[26rem] w-[26rem] rounded-full bg-cool-green/[0.05] blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(21,25,27,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />
      </div>

      <Container className="relative z-10">
        {/* intro */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              How I build / 03
            </p>

            <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2.6rem,4.5vw,4.8rem)] leading-[0.96] tracking-[-0.04em] text-foreground">
              The thinking
              <br />
              behind the
              <br />
              <span className="text-muted-foreground">implementation.</span>
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end lg:pb-1">
            <p className="text-lg leading-8 text-muted-foreground">
              Good implementation is more than making a feature work.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              I try to make technical decisions that support the product around
              them — its users, its requirements, and the way it may need to
              evolve.
            </p>
          </div>
        </div>

        {/* principles */}
        <div className="mt-12 grid border-l border-t border-foreground/10 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative min-h-[250px] overflow-hidden border-b border-r border-foreground/10 p-7 sm:p-8 lg:p-9"
            >
              {/* hover wash */}
              <div className="absolute inset-0 bg-foreground/[0.025] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs font-semibold text-accent">
                    {principle.number}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    {principle.note}
                  </span>
                </div>

                <div className="mt-auto pt-14">
                  <h3 className="font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                    {principle.title}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>

                  <div className="mt-7 h-px w-8 bg-accent transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* closing line */}
        <div className="mt-8 flex justify-end">
          <p className="max-w-md text-right text-xs leading-6 text-muted-foreground/70">
            Architecture, interaction, performance, and resilience are different
            parts of the same product.
          </p>
        </div>
      </Container>
    </section>
  );
}