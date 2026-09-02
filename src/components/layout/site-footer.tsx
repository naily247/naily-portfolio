import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 bg-background py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-3xl tracking-tight text-foreground">Built with intention.</p>
          <p className="mt-2 text-sm text-muted-foreground">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm">
          <Link className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground" href={siteConfig.links.github} target="_blank">
            GitHub <ArrowUpRight size={14} />
          </Link>
          <Link className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground" href={siteConfig.links.linkedin} target="_blank">
            LinkedIn <ArrowUpRight size={14} />
          </Link>
          <a className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground" href={`mailto:${siteConfig.email}`}>
            Email <ArrowUpRight size={14} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
