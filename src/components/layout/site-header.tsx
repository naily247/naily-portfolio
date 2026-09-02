'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { navigation, siteConfig } from '@/data/site';
import { Container } from '@/components/ui/container';

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl"
    >
      <Container className="flex h-18 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/35 hover:bg-foreground/5"
        >
          Let&apos;s talk
        </a>
      </Container>
    </motion.header>
  );
}
