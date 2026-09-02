import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/data/site';

export function Contact() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <div className="rounded-[2.5rem] border border-foreground/10 bg-[radial-gradient(circle_at_85%_20%,rgba(112,163,255,.12),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(99,199,167,.1),transparent_34%)] p-8 sm:p-14 lg:p-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Start a conversation</p>
          <h2 className="mt-6 max-w-4xl text-balance font-serif text-5xl leading-[1] tracking-[-0.045em] text-foreground sm:text-7xl">
            Have work that deserves a thoughtful build?
          </h2>
          <a href={`mailto:${siteConfig.email}`} className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:scale-[1.02]">
            Email Naily <ArrowUpRight size={17} />
          </a>
        </div>
      </Container>
    </section>
  );
}
