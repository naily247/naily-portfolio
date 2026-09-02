import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { projects } from '@/data/projects';

export function FeaturedWork() {
  return (
    <section id="work" className="bg-ink py-24 text-white sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Products shaped by requirements, architecture, and careful implementation."
          description="The portfolio introduces my work. The case studies explain how I approached it."
        />

        <div className="mt-16 space-y-5">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] transition duration-300 hover:border-white/25 hover:bg-white/[0.07] lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div className="relative min-h-72 overflow-hidden border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(112,163,255,.22),transparent_42%),radial-gradient(circle_at_75%_70%,rgba(99,199,167,.16),transparent_40%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>0{index + 1}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="translate-y-3 transition duration-500 group-hover:translate-y-0">
                    <p className="text-sm text-white/55">{project.eyebrow}</p>
                    <h3 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">{project.title}</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-10 p-8 sm:p-10">
                <p className="max-w-2xl text-xl leading-8 text-white/70 sm:text-2xl">{project.summary}</p>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((technology) => (
                      <span key={technology} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">
                        {technology}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-sm">
                    <span className="text-white/50">{project.status}</span>
                    <span className="inline-flex items-center gap-2 font-medium text-white">
                      Explore case study <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
