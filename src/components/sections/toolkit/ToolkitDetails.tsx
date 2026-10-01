'use client';

import {
  ArrowUpRight,
} from 'lucide-react';

import {
  getToolkitTechnology,
  toolkitCategories,
  toolkitProjects,
} from './toolkit.data';

import type {
  ToolkitCategoryId,
} from './toolkit.types';

type ToolkitDetailsProps = {
  activeTechnologyId: string | null;
};

const categoryCodes: Record<
  ToolkitCategoryId,
  string
> = {
  interface: 'INTERFACE',
  application: 'APPLICATION',
  data: 'DATA / SERVICES',
  workflow: 'WORKFLOW',
};

export function ToolkitDetails({
  activeTechnologyId,
}: ToolkitDetailsProps) {
  const technology =
    activeTechnologyId
      ? getToolkitTechnology(
          activeTechnologyId,
        )
      : null;

  if (!technology) {
    return null;
  }

  const category =
    toolkitCategories.find(
      (item) =>
        item.id ===
        technology.category,
    );

  const projects =
    technology.projects
      .map((projectId) =>
        toolkitProjects.find(
          (project) =>
            project.id ===
            projectId,
        ),
      )
      .filter(
        (
          project,
        ): project is NonNullable<
          typeof project
        > => Boolean(project),
      );

  return (
    <div
      className={[
        'relative isolate overflow-hidden',
        'rounded-[1.15rem]',
        'border border-white/65',
        'bg-[#f8f7ff]/[0.90]',
        'px-4 py-3.5',
        'shadow-[0_20px_55px_rgba(61,48,128,0.16),0_5px_18px_rgba(124,108,242,0.08),inset_0_1px_0_rgba(255,255,255,0.88)]',
        'backdrop-blur-[22px]',
        'backdrop-saturate-[1.18]',
      ].join(' ')}
    >
      {/* ================================================== */}
      {/* SPATIAL GLASS ATMOSPHERE                           */}
      {/* ================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* violet spatial wash */}

        <span className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-soft-violet/[0.16] blur-[34px]" />

        {/* cool technical wash */}

        <span className="absolute -bottom-12 -left-8 h-24 w-32 rounded-full bg-cool-blue/[0.09] blur-[34px]" />

        {/* central glass lift */}

        <span className="absolute inset-x-8 top-0 h-14 rounded-full bg-white/55 blur-[26px]" />

        {/* soft internal violet edge */}

        <span className="absolute inset-[1px] rounded-[1.08rem] border border-soft-violet/[0.08]" />
      </div>

      {/* top signal */}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-[48%] bg-gradient-to-r from-soft-violet/80 via-soft-violet/30 to-transparent"
      />

      <div className="relative">
        {/* ================================================== */}
        {/* IDENTITY                                           */}
        {/* ================================================== */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inset-0 scale-[2.8] rounded-full bg-soft-violet/[0.12]" />

              <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet shadow-[0_0_9px_rgba(124,108,242,0.58)]" />
            </span>

            <span className="text-[7px] font-semibold uppercase tracking-[0.19em] text-[#6d5be8]">
              Inspecting
            </span>
          </div>

          <span className="text-right text-[6.5px] font-semibold uppercase tracking-[0.14em] text-foreground/35">
            {
              categoryCodes[
                technology.category
              ]
            }
          </span>
        </div>

        {/* ================================================== */}
        {/* TECHNOLOGY                                         */}
        {/* ================================================== */}

        <div className="mt-3.5">
          <h3 className="font-serif text-[1.7rem] leading-[0.92] tracking-[-0.045em] text-[#17151d]">
            {technology.name}
          </h3>

          <div className="mt-2.5 flex items-center gap-2">
            <span className="h-px w-7 bg-soft-violet/70" />

            <span className="font-mono text-[6px] uppercase tracking-[0.15em] text-soft-violet/50">
              {
                category?.number ??
                '00'
              }
            </span>
          </div>

          <p className="mt-3 text-[9.5px] leading-[1.62] text-[#565160]/80">
            {technology.description}
          </p>
        </div>

        {/* ================================================== */}
        {/* ARCHITECTURE RELATIONSHIPS                         */}
        {/* ================================================== */}

        {technology.usedWith.length >
          0 && (
          <div className="mt-3.5">
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.17em] text-foreground/32">
              Connected with
            </p>

            <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1.5">
              {technology.usedWith
                .slice(0, 4)
                .map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-[7.5px] font-medium text-foreground/55"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-soft-violet/65 shadow-[0_0_5px_rgba(124,108,242,0.28)]" />

                    {item}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* PROJECT SIGNAL                                     */}
        {/* ================================================== */}

        {projects.length > 0 && (
          <div className="mt-3.5 border-t border-soft-violet/[0.10] pt-2.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="text-[6.5px] font-semibold uppercase tracking-[0.16em] text-foreground/30">
                Used in
              </span>

              {projects.map(
                (project) => (
                  <span
                    key={project.id}
                    className="inline-flex items-center gap-1 text-[7.5px] font-medium text-[#5d4ed0]/75"
                  >
                    {project.name}

                    <ArrowUpRight
                      size={7}
                      strokeWidth={1.5}
                      className="opacity-55"
                    />
                  </span>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* GLASS EDGE DETAILS                                 */}
      {/* ================================================== */}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-5 h-px w-10 bg-gradient-to-r from-transparent via-cool-blue/25 to-transparent"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[24%] h-10 w-px bg-gradient-to-b from-transparent via-soft-violet/25 to-transparent"
      />
    </div>
  );
}