import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { projects } from '@/data/projects';

export function MoreProjects() {
  const additionalProjects = projects.slice(3);

  if (additionalProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="more-projects"
      className="relative -mt-[18vh] overflow-hidden bg-soft-lavender pb-20 pt-10"
    >
{/* ====================================================== */}
{/* SECTION ATMOSPHERE                                     */}
{/* ====================================================== */}

<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  {/* Local light around the project-list environment */}
  <div className="absolute left-[8%] top-[18%] h-[20rem] w-[24rem] rounded-full bg-soft-violet/[0.035] blur-[130px]" />

  <div className="absolute right-[10%] top-[32%] h-[18rem] w-[22rem] rounded-full bg-cool-blue/[0.02] blur-[135px]" />
</div>

      <Container className="relative">
        {/* ==================================================== */}
        {/* INTRO                                                */}
        {/* ==================================================== */}

        <div className="flex flex-col gap-5 border-b border-soft-violet/[0.13] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-soft-violet/25 shadow-[0_0_10px_rgba(124,108,242,0.18)]" />

                <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet shadow-[0_0_8px_rgba(124,108,242,0.38)]" />
              </span>

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-soft-violet">
                More work
              </p>

              <span className="h-px w-8 bg-gradient-to-r from-soft-violet/60 to-transparent" />
            </div>

            <div className="relative mt-4 w-fit">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-full bg-soft-violet/[0.04] blur-[30px]"
              />

              <h2 className="font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
                Other things I&apos;ve built.
              </h2>
            </div>
          </div>

          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Smaller projects, collaborative builds, and work that contributed
            to how I think and build today.
          </p>
        </div>

        {/* ==================================================== */}
        {/* PROJECT ROWS                                         */}
        {/* ==================================================== */}

        <div className="relative">
          {/* quiet vertical system rail connecting 04 → 07 */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[2px] top-6 hidden w-px bg-gradient-to-b from-transparent via-soft-violet/20 to-transparent sm:block"
          />

          {additionalProjects.map((project, index) => {
            const projectNumber = String(index + 4).padStart(2, '0');

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group/project relative grid gap-5 overflow-hidden border-b border-soft-violet/[0.11] py-6 transition-[border-color] duration-500 hover:border-soft-violet/25 sm:grid-cols-[60px_1.1fr_1fr_auto] sm:items-center"
              >
                {/* -------------------------------------------- */}
                {/* PERMANENT ROW ATMOSPHERE                     */}
                {/* -------------------------------------------- */}

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-soft-violet/[0.018] via-transparent to-cool-blue/[0.012] transition-colors duration-500 group-hover/project:from-soft-violet/[0.075] group-hover/project:via-soft-violet/[0.028] group-hover/project:to-cool-blue/[0.045]"
                />

                {/* stronger local violet bloom on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-20 top-1/2 -z-10 h-28 w-72 -translate-y-1/2 rounded-full bg-soft-violet/[0.00] blur-[55px] transition-colors duration-700 group-hover/project:bg-soft-violet/[0.07]"
                />

                {/* travelling upper system signal */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-px w-20 -translate-x-full bg-gradient-to-r from-transparent via-soft-violet to-cool-blue opacity-0 shadow-[0_0_8px_rgba(124,108,242,0.20)] transition-[transform,opacity] duration-1000 ease-out group-hover/project:translate-x-[900%] group-hover/project:opacity-80"
                />

                {/* active left rail */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-[22%] left-0 top-[22%] w-px scale-y-0 bg-gradient-to-b from-transparent via-soft-violet/75 to-transparent transition-transform duration-500 ease-out group-hover/project:scale-y-100"
                />

                {/* -------------------------------------------- */}
                {/* NUMBER                                       */}
                {/* -------------------------------------------- */}

                <div className="relative flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-soft-violet/[0.12] transition-transform duration-500 group-hover/project:scale-[2.2]" />

                    <span className="relative h-1 w-1 rounded-full bg-soft-violet/55 shadow-[0_0_5px_rgba(124,108,242,0.20)] transition-[background-color,box-shadow,transform] duration-500 group-hover/project:scale-125 group-hover/project:bg-soft-violet group-hover/project:shadow-[0_0_9px_rgba(124,108,242,0.55)]" />
                  </span>

                  <span className="text-[10px] font-medium text-soft-violet/65 transition-[color,transform] duration-500 group-hover/project:translate-x-0.5 group-hover/project:text-soft-violet">
                    {projectNumber}
                  </span>
                </div>

                {/* -------------------------------------------- */}
                {/* PROJECT IDENTITY                             */}
                {/* -------------------------------------------- */}

                <div className="relative">
                  <div className="relative w-fit">
                    {/* permanent identity atmosphere */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-soft-violet/[0.045] blur-xl transition-[background-color,transform] duration-500 group-hover/project:scale-110 group-hover/project:bg-soft-violet/[0.10]"
                    />

                    <h3 className="font-serif text-2xl tracking-[-0.025em] text-[#17151d] drop-shadow-[0_0_14px_rgba(124,108,242,0.06)] transition-[color,transform,filter] duration-500 ease-out group-hover/project:translate-x-1 group-hover/project:text-[#5949d2] group-hover/project:drop-shadow-[0_0_16px_rgba(124,108,242,0.16)]">
                      {project.title}
                    </h3>

                    {/* permanent identity trace */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-10 bg-gradient-to-r from-soft-violet/60 to-soft-violet/10 transition-[width,opacity] duration-500 ease-out group-hover/project:w-20 group-hover/project:opacity-100"
                    />

                    {/* travelling highlight */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-8 -translate-x-full bg-gradient-to-r from-transparent via-[#9a8cff] to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover/project:translate-x-[250%] group-hover/project:opacity-90"
                    />
                  </div>

                  <p className="mt-2 text-xs uppercase tracking-[0.13em] text-muted-foreground/65 transition-[color,opacity,transform] duration-500 group-hover/project:translate-x-1 group-hover/project:text-soft-violet/75 group-hover/project:opacity-100">
                    {project.role}
                  </p>
                </div>

                {/* -------------------------------------------- */}
                {/* TECHNOLOGY SIGNALS                           */}
                {/* -------------------------------------------- */}

                <div className="flex flex-wrap gap-2">
                  {project.technologies
                    .slice(0, 4)
                    .map((technology, technologyIndex) => (
                      <span
                        key={technology}
                        className="relative rounded-full border border-soft-violet/[0.16] bg-white/25 px-2.5 py-1 text-[11px] text-[#555064] shadow-[0_1px_8px_rgba(124,108,242,0.025)] transition-[color,background-color,border-color,transform,box-shadow] duration-500 ease-out group-hover/project:border-soft-violet/[0.24] group-hover/project:bg-soft-violet/[0.055] hover:!-translate-y-0.5 hover:!border-soft-violet/40 hover:!bg-soft-violet/[0.11] hover:!text-[#5748c5] hover:!shadow-[0_5px_18px_rgba(124,108,242,0.11)]"
                        style={{
                          transitionDelay: `${technologyIndex * 30}ms`,
                        }}
                      >
                        <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-soft-violet/55 align-middle shadow-[0_0_4px_rgba(124,108,242,0.20)] transition-[background-color,box-shadow,transform] duration-500 group-hover/project:scale-125 group-hover/project:bg-soft-violet group-hover/project:shadow-[0_0_6px_rgba(124,108,242,0.45)]" />

                        {technology}
                      </span>
                    ))}

                  {project.technologies.length === 0 && (
                    <span className="rounded-full border border-soft-violet/[0.12] bg-white/20 px-2.5 py-1 text-[11px] text-muted-foreground/60">
                      Details coming soon
                    </span>
                  )}
                </div>

                {/* -------------------------------------------- */}
                {/* ACTION                                       */}
                {/* -------------------------------------------- */}

                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-soft-violet/[0.18] bg-white/15 text-[#6d6680] shadow-[0_0_0_rgba(124,108,242,0)] transition-[color,border-color,background-color,box-shadow,transform] duration-500 ease-out group-hover/project:-translate-y-0.5 group-hover/project:translate-x-0.5 group-hover/project:border-soft-violet/40 group-hover/project:bg-soft-violet/[0.10] group-hover/project:text-[#5949d2] group-hover/project:shadow-[0_0_22px_rgba(124,108,242,0.14)]">
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-500 ease-out group-hover/project:-translate-y-0.5 group-hover/project:translate-x-0.5"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-full border border-soft-violet/[0.06] transition-[border-color,transform,opacity] duration-500 group-hover/project:scale-110 group-hover/project:border-soft-violet/20"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-soft-violet/[0.04] blur-md transition-colors duration-500 group-hover/project:bg-soft-violet/[0.14]"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}