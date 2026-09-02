import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { getProject, projects } from '@/data/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="pb-24 pt-32 sm:pb-32">
      <Container>
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back to selected work
        </Link>

        <div className="mt-14 grid gap-10 border-b border-foreground/10 pb-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{project.eyebrow}</p>
            <h1 className="mt-6 font-serif text-6xl leading-[0.95] tracking-[-0.05em] text-foreground sm:text-8xl">{project.title}</h1>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl">{project.summary}</p>
          </div>
          <dl className="space-y-5 text-sm">
            <div><dt className="text-muted-foreground">Status</dt><dd className="mt-1 text-foreground">{project.status}</dd></div>
            <div><dt className="text-muted-foreground">Role</dt><dd className="mt-1 text-foreground">{project.role}</dd></div>
            <div><dt className="text-muted-foreground">Year</dt><dd className="mt-1 text-foreground">{project.year}</dd></div>
          </dl>
        </div>

        <div className="my-16 min-h-[420px] rounded-[2.5rem] border border-foreground/10 bg-[radial-gradient(circle_at_28%_22%,rgba(112,163,255,.22),transparent_36%),radial-gradient(circle_at_75%_70%,rgba(99,199,167,.18),transparent_38%),#101518]" />

        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <aside>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Case study</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-muted-foreground">{technology}</span>
              ))}
            </div>
          </aside>

          <article className="space-y-16">
            <section>
              <h2 className="font-serif text-4xl tracking-tight text-foreground">The problem</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{project.problem}</p>
            </section>
            <section>
              <h2 className="font-serif text-4xl tracking-tight text-foreground">The approach</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{project.approach}</p>
            </section>
            <section>
              <h2 className="font-serif text-4xl tracking-tight text-foreground">Implementation highlights</h2>
              <ul className="mt-6 divide-y divide-foreground/10 border-y border-foreground/10">
                {project.highlights.map((highlight, index) => (
                  <li key={highlight} className="grid gap-4 py-5 sm:grid-cols-[56px_1fr]">
                    <span className="text-xs text-accent">0{index + 1}</span>
                    <span className="text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-4xl tracking-tight text-foreground">Outcome</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{project.outcome}</p>
            </section>

            {(project.repository || project.liveUrl) ? (
              <div className="flex flex-wrap gap-3 border-t border-foreground/10 pt-8">
                {project.repository ? <Link href={project.repository} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">View repository <ArrowUpRight size={16} /></Link> : null}
                {project.liveUrl ? <Link href={project.liveUrl} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-semibold text-foreground">Live product <ArrowUpRight size={16} /></Link> : null}
              </div>
            ) : null}
          </article>
        </div>
      </Container>
    </main>
  );
}
