'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/data/site';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-32 sm:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-cool-blue/12 blur-3xl" />
        <div className="absolute right-[10%] top-[28%] h-72 w-72 rounded-full bg-cool-green/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <Container className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.24em] text-accent"
        >
          Full-Stack Developer · {siteConfig.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-6xl text-balance font-serif text-[clamp(3.6rem,10vw,9.5rem)] leading-[0.88] tracking-[-0.055em] text-foreground"
        >
          Naily Ashvitha
        </motion.h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.7 }}
            className="max-w-2xl text-balance text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9"
          >
            I design and engineer polished, thoughtfully detailed products with clean architecture and purposeful UX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="#work" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:scale-[1.02]">
              View selected work <ArrowDown size={16} />
            </Link>
            <Link href={siteConfig.links.resume} className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/35 hover:bg-foreground/5">
              Resume <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
