import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

import { EatMeCaseStudy } from '@/components/projects/eatme-case-study';
import { EventureCaseStudy } from '@/components/projects/eventure-case-study';
import { LibraryHubCaseStudy } from '@/components/projects/library-hub-case-study';
import { Container } from '@/components/ui/container';
import {
  getProject,
  projects,
  type Project,
} from '@/data/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Naily Ashvitha`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug,
  );

  const nextProject =
  projects[
    (currentIndex + 1) %
      projects.length
  ];

const previousProject =
  currentIndex > 0 && currentIndex <= 2
    ? projects[currentIndex - 1]
    : null;

  const projectNumber = String(
  currentIndex + 1,
).padStart(2, '0');

const nextProjectNumber = String(
  ((currentIndex + 1) % projects.length) + 1,
).padStart(2, '0');

const isLastFeaturedCaseStudy = project.slug === 'library-hub';

  return (
    <main className="overflow-hidden bg-[#ebe6f7]">
            {/* SHARED PROJECT HERO */}

      <section className="relative overflow-hidden pb-12 pt-28 sm:pb-14 sm:pt-32">
        {/* AMBIENT PROJECT FIELD */}

        <div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0"
>
  <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cool-blue/[0.055] blur-[125px]" />

  <div className="absolute right-[-7%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#6f5df4]/[0.075] blur-[150px]" />

  <div className="absolute bottom-[-35%] left-[42%] h-[300px] w-[420px] rounded-full bg-[#6f5df4]/[0.04] blur-[145px]" />

  {/* CURRENT PROJECT INDEX */}

  <span className="absolute right-[2%] top-[48%] hidden -translate-y-1/2 font-serif text-[clamp(12rem,22vw,19rem)] leading-none tracking-[-0.08em] text-[#6f5df4]/[0.065] lg:block">
    {projectNumber}
  </span>

  <div className="absolute right-[6%] top-[43%] hidden h-[230px] w-[230px] rounded-full bg-[#6f5df4]/[0.055] blur-[85px] lg:block" />
</div>

        <Container className="relative z-10">
    {/* PORTFOLIO RETURN / PROJECT INDEX */}

<div className="flex items-center justify-between gap-5">
  <Link
    href="/#work"
    className="group inline-flex items-center gap-2.5 rounded-full border border-[#6f5df4]/20 bg-[#6f5df4]/[0.055] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f5df4] transition-all duration-300 hover:border-[#6f5df4]/35 hover:bg-[#6f5df4]/[0.09]"
  >
    <ArrowLeft
      size={14}
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:-translate-x-1"
    />

    Selected Work
  </Link>

  <div className="hidden items-center gap-3 sm:flex">
    <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#6f5df4]/35" />

    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
      Case study / {projectNumber}
    </span>

    <span className="relative flex h-1.5 w-1.5 items-center justify-center">
      <span className="absolute h-1.5 w-1.5 rounded-full bg-[#6f5df4]/20" />

      <span className="relative h-[3px] w-[3px] rounded-full bg-[#6f5df4]" />
    </span>
  </div>
</div>

          {/* PROJECT IDENTITY */}

          <div className="mt-9 grid gap-9 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {projectNumber} / Project
                </span>

                <span className="h-1 w-1 rounded-full bg-cool-blue" />

                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {project.eyebrow}
                </span>
              </div>

              <h1 className="mt-5 font-serif text-[clamp(3.8rem,7vw,7.2rem)] leading-[0.88] tracking-[-0.055em] text-foreground">
                {project.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {project.summary}
              </p>

              {project.technologies.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-foreground/10 bg-background/45 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm transition-colors hover:border-[#6f5df4]/25 hover:text-foreground"
                      >
                        {technology}
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* PROJECT RECORD */}

            <div className="relative overflow-hidden rounded-[1.35rem] border border-[#6f5df4]/[0.13] bg-background/55 shadow-[0_24px_70px_rgba(70,58,130,0.035)] backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#6f5df4]/[0.095] blur-[75px]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-55%] left-[15%] h-36 w-[70%] rounded-full bg-[#6f5df4]/[0.045] blur-[65px]"
              />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-[#6f5df4]/[0.09] px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-[#6f5df4]/25" />
                      <span className="relative h-[3px] w-[3px] rounded-full bg-[#6f5df4]" />
                    </span>

                    <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
                      Project record
                    </span>
                  </div>

                  <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-muted-foreground/35">
                    {projectNumber} /{' '}
                    {String(projects.length).padStart(
                      2,
                      '0',
                    )}
                  </span>
                </div>

                <dl className="divide-y divide-[#6f5df4]/[0.075]">
                  <div className="group grid grid-cols-[82px_1fr] items-center gap-4 px-5 py-4 transition-colors hover:bg-[#6f5df4]/[0.035]">
                    <dt className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/45">
                      Status
                    </dt>

                    <dd className="flex items-center gap-2.5 text-[13px] text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]/70 shadow-[0_0_10px_rgba(111,93,244,0.22)]" />
                      {project.status}
                    </dd>
                  </div>

                  <div className="group grid grid-cols-[82px_1fr] items-center gap-4 px-5 py-4 transition-colors hover:bg-[#6f5df4]/[0.035]">
                    <dt className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/45">
                      Role
                    </dt>

                    <dd className="text-[13px] leading-6 text-foreground">
                      {project.role}
                    </dd>
                  </div>

                  <div className="group grid grid-cols-[82px_1fr] items-center gap-4 px-5 py-4 transition-colors hover:bg-[#6f5df4]/[0.035]">
                    <dt className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/45">
                      Year
                    </dt>

                    <dd className="text-[13px] text-foreground">
                      {project.year}
                    </dd>
                  </div>
                </dl>

                <div className="flex items-center justify-between border-t border-[#6f5df4]/[0.08] px-5 py-3.5">
                  <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/35">
                    Project context
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#6f5df4]/55" />
                    <span className="h-1 w-1 rounded-full bg-[#6f5df4]/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SOFT CENTRAL HANDOFF */}

          <div
            aria-hidden="true"
            className="mx-auto mt-11 h-px w-[34%] bg-gradient-to-r from-transparent via-[#6f5df4]/20 to-transparent"
          />
        </Container>
      </section>

      {/* PROJECT-SPECIFIC CASE STUDY */}

      {project.slug === 'eventure' ? (
  <EventureCaseStudy
    project={project}
  />
) : project.slug === 'eatme' ? (
  <EatMeCaseStudy
    project={project}
  />
) : project.slug === 'library-hub' ? (
  <LibraryHubCaseStudy
    project={project}
  />
) : project.placeholder ? (
  <PlaceholderCaseStudy />
) : (
  <StandardCaseStudy
    project={project}
  />
)}

{/* SHARED PREVIOUS PROJECT */}

{previousProject && (
  <section className="relative overflow-hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute -left-36 bottom-[-70%] h-[300px] w-[300px] rounded-full bg-cool-blue/[0.025] blur-[135px]" />

      <div className="absolute right-[12%] top-[-70%] h-[260px] w-[260px] rounded-full bg-[#6f5df4]/[0.03] blur-[125px]" />
    </div>

    <Container className="relative z-10">
      <Link
        href={`/projects/${previousProject.slug}`}
        className="group relative block py-7 sm:py-8 lg:py-9"
      >
<div className="relative pb-7 sm:pb-8 lg:pb-9">
            {/* PREVIOUS PROJECT IDENTITY */}

          <div>
            <div className="flex items-center gap-3">
  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
    {String(currentIndex).padStart(2, '0')} / Case study
  </span>

  <span className="relative flex h-1.5 w-1.5 items-center justify-center">
    <span className="absolute h-1.5 w-1.5 rounded-full bg-[#6f5df4]/20" />
    <span className="relative h-[3px] w-[3px] rounded-full bg-[#6f5df4]" />
  </span>
</div>

            <h2 className="mt-3 font-serif text-[2.25rem] leading-[0.96] tracking-[-0.045em] text-foreground transition-transform duration-500 ease-out group-hover:-translate-x-1 sm:text-[2.75rem]">
              {previousProject.title}
            </h2>

            <p className="mt-3 max-w-xl text-[13px] leading-6 text-muted-foreground">
              {previousProject.summary}
            </p>
          </div>

          {/* PREVIOUS ACTION */}

<div className="mt-5 flex items-center gap-3">
  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6f5df4]/25 bg-[#6f5df4]/[0.055] text-[#6f5df4] transition-all duration-500 group-hover:-translate-x-1 group-hover:border-[#6f5df4]/40 group-hover:bg-[#6f5df4]/[0.09]">
    <ArrowLeft
      size={15}
      aria-hidden="true"
      className="transition-transform duration-500 group-hover:-translate-x-0.5"
    />
  </span>

  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
    View previous
  </span>
</div>
        </div>
      </Link>
    </Container>
  </section>
)}

        {/* SHARED PROJECT CONTINUATION */}

{projects.length > 1 && (
  isLastFeaturedCaseStudy ? (
    /* --------------------------------------------------------- */
    /* CASE STUDY SERIES END                                     */
    /* --------------------------------------------------------- */

    <section className="relative overflow-hidden">
      {/* QUIET CLOSING ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -bottom-36 right-[7%] h-[300px] w-[300px] rounded-full bg-[#6f5df4]/[0.035] blur-[130px]" />

        <div className="absolute -left-32 top-[-70%] h-[260px] w-[260px] rounded-full bg-cool-blue/[0.025] blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="relative py-9 sm:py-10 lg:py-11">
          <div className="grid gap-7 lg:grid-cols-[0.58fr_1.42fr] lg:items-center lg:gap-14">
            {/* SERIES STATUS */}

            <div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#6f5df4]">
                  03 / 03
                </span>

                <span className="h-px w-8 bg-[#6f5df4]/25" />

                <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                  <span className="absolute h-1.5 w-1.5 rounded-full bg-[#6f5df4]/20" />
                  <span className="relative h-[3px] w-[3px] rounded-full bg-[#6f5df4]" />
                </span>
              </div>

              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/50">
                Case study series complete
              </p>
            </div>

            {/* CONTINUE EXPLORING */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
                  Continue exploring
                </p>

                <h2 className="mt-2 font-serif text-[2.25rem] leading-[0.98] tracking-[-0.045em] text-foreground sm:text-[2.75rem]">
                  More projects,
                  <br className="hidden sm:block" /> different scopes.
                </h2>

                <p className="mt-3 max-w-xl text-[13px] leading-6 text-muted-foreground">
                  Explore the rest of my work across healthcare,
                  mobile development, tourism, and other collaborative
                  software projects.
                </p>
              </div>

              <Link
                href="/#more-projects"
                className="group inline-flex shrink-0 items-center gap-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground"
              >
                View more work

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6f5df4]/20 bg-white/40 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#6f5df4]/35 group-hover:bg-[#6f5df4]/[0.07] group-hover:text-[#6f5df4]">
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  ) : (
    /* --------------------------------------------------------- */
    /* NEXT FEATURED CASE STUDY                                  */
    /* --------------------------------------------------------- */

    <section className="relative overflow-hidden">
      {/* QUIET CONTINUATION ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -bottom-40 right-[4%] h-[360px] w-[360px] rounded-full bg-[#6f5df4]/[0.04] blur-[145px]" />

        <div className="absolute -left-36 top-[-55%] h-[300px] w-[300px] rounded-full bg-cool-blue/[0.025] blur-[135px]" />
      </div>

      <Container className="relative z-10">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group relative block py-9 sm:py-10 lg:py-11"
        >
          {/* LARGE NEXT PROJECT INDEX */}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-serif text-[clamp(8rem,17vw,14rem)] leading-none tracking-[-0.07em] text-[#6f5df4]/[0.045] transition-all duration-700 group-hover:-translate-x-3 group-hover:text-[#6f5df4]/[0.07]"
          >
            {nextProjectNumber}
          </span>

          <div className="relative grid gap-7 lg:grid-cols-[0.68fr_1.32fr] lg:items-end lg:gap-14">
            {/* CURRENT → NEXT SIGNAL */}

            <div>
              <div className="flex items-center gap-3">
                <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/55">
                  {projectNumber} / Complete
                </span>

                <span className="h-px w-8 bg-[#6f5df4]/20" />

                <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                  <span className="absolute h-1.5 w-1.5 rounded-full bg-[#6f5df4]/20 transition-transform duration-500 group-hover:scale-[2.4]" />

                  <span className="relative h-[3px] w-[3px] rounded-full bg-[#6f5df4]" />
                </span>
              </div>

              <p className="mt-3 max-w-[250px] text-[11px] leading-5 text-muted-foreground/65">
                Continue through the selected work.
              </p>
            </div>

            {/* NEXT PROJECT */}

            <div>
              <div className="flex items-center gap-3">
  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
    {nextProjectNumber} / Case study
  </span>

  <span className="relative flex h-1.5 w-1.5 items-center justify-center">
    <span className="absolute h-1.5 w-1.5 rounded-full bg-[#6f5df4]/20" />
    <span className="relative h-[3px] w-[3px] rounded-full bg-[#6f5df4]" />
  </span>
</div>

              <div className="mt-2.5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-serif text-[2.65rem] leading-[0.95] tracking-[-0.045em] text-foreground transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:text-[3.4rem]">
                    {nextProject.title}
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                    {nextProject.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {nextProject.technologies
                      .slice(0, 3)
                      .map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-[#6f5df4]/[0.14] bg-white/40 px-2.5 py-1 text-[9px] text-muted-foreground/75 backdrop-blur-sm"
                        >
                          {technology}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 pb-1">
  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
    View next
  </span>

  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6f5df4]/25 bg-[#6f5df4]/[0.055] text-[#6f5df4] transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#6f5df4]/40 group-hover:bg-[#6f5df4]/[0.09]">
    <ArrowRight
      size={15}
      aria-hidden="true"
      className="transition-transform duration-500 group-hover:translate-x-0.5"
    />
  </span>
</div>
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  )
)}
    </main>
  );
}

function PlaceholderCaseStudy() {
  return (
    <section className="pb-20 pt-12 sm:pb-24">
      <Container>
        <div className="grid gap-10 border-y border-foreground/10 py-14 lg:grid-cols-[0.7fr_1.3fr]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            Case study
          </p>

          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
              This project is being documented.
            </h2>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Its scope, implementation
              decisions, technologies, and
              project visuals will be added here
              once the case study is prepared.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StandardCaseStudy({
  project,
}: {
  project: Project;
}) {

  return (
    <>
      <section className="py-10 sm:py-12">
        <Container>
          <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden rounded-[1.8rem] border border-foreground/10 bg-ink sm:min-h-[460px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(109,158,232,.22),transparent_34%),radial-gradient(circle_at_74%_70%,rgba(111,93,244,.15),transparent_36%)]" />

            <div className="relative text-center">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                Product visual coming soon
              </p>

              <p className="mt-4 font-serif text-6xl text-white/[0.08] sm:text-7xl">
                {project.title.charAt(0)}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                01 / Context
              </p>

              <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
                Understanding the product problem
                and the responsibility I held
                within the project.
              </p>
            </div>

            <div>
              <h2 className="max-w-2xl font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                The challenge
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                {project.problem}
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                {project.approach}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-foreground/10 bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                02 / Contribution
              </p>

              <h2 className="mt-4 max-w-sm font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                What I worked on.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
              {project.highlights.map(
                (highlight, index) => (
                  <div
                    key={highlight}
                    className="min-h-[180px] bg-background p-6"
                  >
                    <span className="text-[10px] font-semibold text-accent">
                      {String(
                        index + 1,
                      ).padStart(2, '0')}
                    </span>

                    <p className="mt-14 max-w-sm text-base leading-7 text-foreground">
                      {highlight}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              03 / Outcome
            </p>

            <div>
              <h2 className="font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                Where it landed
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                {project.outcome}
              </p>

              {(project.repository ||
                project.liveUrl) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.repository && (
                    <Link
                      href={
                        project.repository
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
                    >
                      Repository
                      <ArrowUpRight
                        size={15}
                      />
                    </Link>
                  )}

                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-semibold text-foreground"
                    >
                      Live product
                      <ArrowUpRight
                        size={15}
                      />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}