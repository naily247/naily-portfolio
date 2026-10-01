'use client';

import {
  useLayoutEffect,
  useRef,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Braces,
  Layers3,
} from 'lucide-react';

import { Container } from '@/components/ui/container';

import { ToolkitEngine } from './toolkit/ToolkitEngine';
import { ToolkitIndex } from './toolkit/ToolkitIndex';

import {
  toolkitCategories,
  toolkitTechnologies,
} from './toolkit/toolkit.data';


gsap.registerPlugin(ScrollTrigger);


export function Toolkit() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const introRef =
    useRef<HTMLDivElement>(null);

  const systemRef =
    useRef<HTMLDivElement>(null);

  const systemHeaderRef =
    useRef<HTMLDivElement>(null);

  const sceneRef =
    useRef<HTMLDivElement>(null);

  const detailsRef =
    useRef<HTMLDivElement>(null);

  const indexRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      '(prefers-reduced-motion: reduce)',
      () => {
        gsap.set(
[
  introRef.current,
  systemRef.current,
  systemHeaderRef.current,
  sceneRef.current,
  indexRef.current,
].filter(Boolean),
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          },
        );
      },
    );

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const context = gsap.context(
          () => {
            gsap.set(
              introRef.current,
              {
                opacity: 0,
                y: 30,
              },
            );

            gsap.set(
              systemRef.current,
              {
                opacity: 0,
                y: 34,
              },
            );

            gsap.set(
              systemHeaderRef.current,
              {
                opacity: 0,
                y: 12,
              },
            );

            gsap.set(
              sceneRef.current,
              {
                opacity: 0,
                scale: 0.985,
                y: 18,
              },
            );

            gsap.set(
              indexRef.current,
              {
                opacity: 0,
                y: 18,
              },
            );

            const timeline =
              gsap.timeline({
                defaults: {
                  ease: 'power3.out',
                },

                scrollTrigger: {
                  trigger: section,
                  start: 'top 76%',
                  once: true,
                },
              });

            timeline
              .to(
                introRef.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.72,
                },
                0,
              )

              .to(
                systemRef.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                },
                0.12,
              )

              .to(
                systemHeaderRef.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.48,
                },
                0.24,
              )

              .to(
                sceneRef.current,
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 1,
                  ease: 'power2.out',
                },
                0.34,
              )

              .to(
                indexRef.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                },
                0.72,
              );
          },
          section,
        );

        return () => {
          context.revert();
        };
      },
    );

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="toolkit"
      className="relative overflow-hidden bg-soft-lavender"
    >
{/* ====================================================== */}
{/* SECTION ATMOSPHERE                                     */}
{/* ====================================================== */}

<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  {/* Local editorial light — deliberately kept away from section edges */}
  <div className="absolute left-[7%] top-[12%] h-[22rem] w-[26rem] rounded-full bg-soft-violet/[0.045] blur-[135px]" />

  <div className="absolute right-[9%] top-[18%] h-[20rem] w-[24rem] rounded-full bg-cool-blue/[0.025] blur-[140px]" />
</div>

{/* ====================================================== */}
{/* EDITORIAL INTRO                                        */}
{/* ====================================================== */}

<Container className="relative z-10">
  <div className="pt-14 sm:pt-16 lg:pt-20">
    <div
      ref={introRef}
      className="relative"
    >
      {/* -------------------------------------------------- */}
      {/* SECTION LABEL                                      */}
      {/* -------------------------------------------------- */}

      <div className="flex items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
          Toolkit / 05
        </span>

        <span className="h-px w-9 bg-gradient-to-r from-soft-violet/55 to-transparent" />

        <span className="h-1.5 w-1.5 rounded-full bg-soft-violet/70 shadow-[0_0_8px_rgba(124,108,242,0.35)]" />
      </div>

      {/* -------------------------------------------------- */}
      {/* MAIN INTRO GRID                                    */}
      {/* -------------------------------------------------- */}

      <div className="mt-5 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
        {/* LEFT — statement */}

        <div className="max-w-[590px]">
          <h2 className="font-serif text-[clamp(3.2rem,5.9vw,6rem)] leading-[0.88] tracking-[-0.058em] text-foreground">
            Tools for
            <span className="block text-muted-foreground">
              what I build.
            </span>
          </h2>
        </div>

        {/* RIGHT — context + capability map */}

        <div className="lg:pt-3">
          <p className="max-w-[470px] text-[15px] leading-7 text-muted-foreground sm:text-base">
            A connected view of the
            technologies I use across
            interface, application logic,
            data, services, and product
            delivery.
          </p>

          <div className="mt-7 max-w-[470px] border-t border-soft-violet/[0.13] pt-3">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-soft-violet/55">
                Technical capability map
              </span>

              <span className="font-mono text-[8px] text-muted-foreground/35">
                SYS.05 / ACTIVE
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-8">
              <div>
                <span className="font-serif text-[2rem] leading-none tracking-[-0.04em] text-foreground">
                  {
                    toolkitTechnologies.length
                  }
                </span>

                <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                  Primary signals
                </p>
              </div>

              <div>
                <span className="font-serif text-[2rem] leading-none tracking-[-0.04em] text-foreground">
                  {
                    toolkitCategories.length
                  }
                </span>

                <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                  Capability layers
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-[410px] text-xs leading-6 text-muted-foreground/50">
Technologies are shown as a
connected build system — from
interface through application,
data, services, and delivery.
            </p>
          </div>
        </div>
      </div>

{/* -------------------------------------------------- */}
{/* INTRO FOOTER                                       */}
{/* -------------------------------------------------- */}

<div className="mt-6 flex items-center gap-3 border-t border-soft-violet/[0.09] pt-3">
  <Braces
    size={14}
    strokeWidth={1.4}
    className="text-soft-violet/65"
  />

  <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-foreground/40">
    Full-stack system
  </span>

  <span className="h-3 w-px bg-soft-violet/18" />

  <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/30">
    Build · Connect · Ship
  </span>
</div>
    </div>
  </div>
</Container>

      {/* ====================================================== */}
      {/* FULL-WIDTH ARCHITECTURE ENVIRONMENT                    */}
      {/* ====================================================== */}

<div
  ref={systemRef}
  className="relative z-10 mt-6 lg:mt-8"
>
{/* environment atmosphere */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  {/* Shallow local illumination behind the spatial architecture */}
  <div className="absolute left-[12%] top-[20%] h-[24rem] w-[30rem] rounded-full bg-soft-violet/[0.03] blur-[130px]" />

  <div className="absolute right-[10%] top-[28%] h-[22rem] w-[28rem] rounded-full bg-cool-blue/[0.025] blur-[135px]" />

  {/* Technical boundary signals */}
  <div className="absolute inset-x-[4%] top-[88px] h-px bg-gradient-to-r from-transparent via-soft-violet/[0.11] to-transparent" />

  <div className="absolute inset-x-[4%] bottom-[54px] h-px bg-gradient-to-r from-transparent via-soft-violet/[0.08] to-transparent" />
</div>

{/* ================================================== */}
{/* SYSTEM HEADER                                      */}
{/* ================================================== */}

<Container className="relative z-30">
  <div
    ref={systemHeaderRef}
    className="flex flex-col gap-4 border-y border-soft-violet/[0.11] py-4 lg:flex-row lg:items-center lg:justify-between"
  >
    <div className="flex items-center gap-4">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-soft-violet/[0.14] bg-white/20">
        <span className="absolute inset-[7px] rounded-md border border-soft-violet/[0.13]" />

        <span className="h-1.5 w-1.5 rounded-full bg-soft-violet shadow-[0_0_8px_rgba(124,108,242,0.5)]" />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
            NA / Build System
          </p>

          <span className="rounded-full border border-soft-violet/[0.13] bg-soft-violet/[0.04] px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-soft-violet">
            Live
          </span>
        </div>

        <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40">
          Full-stack product development
        </p>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <div className="flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-soft-violet/65" />

        <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted-foreground/45">
          Full system
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-cool-blue/65" />

        <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted-foreground/45">
          {String(
            toolkitTechnologies.length,
          ).padStart(2, '0')}{' '}
          primary nodes
        </span>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <Layers3
          size={11}
          strokeWidth={1.3}
          className="text-soft-violet/45"
        />

        <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted-foreground/35">
          Spatial architecture
        </span>
      </div>
    </div>
  </div>

  <div className="flex items-end justify-between py-3">
    <div>
      <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/40">
        Capability map
      </p>

<p className="mt-1 text-[10px] text-muted-foreground/55">
  Explore the four capability layers
  that shape the way I build.
</p>
    </div>

    <div className="hidden items-center gap-2 sm:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-soft-violet/30" />

    </div>
  </div>
</Container>

{/* ================================================== */}
{/* THREE.JS BUILD ENGINE                              */}
{/* ================================================== */}

<div
  ref={sceneRef}
  className="relative"
>
  <ToolkitEngine />
</div>
      </div>

{/* ====================================================== */}
{/* EXTENDED TECHNICAL INDEX                               */}
{/* ====================================================== */}

<Container className="relative z-10">
  <div className="pb-12 sm:pb-14 lg:pb-16">
    <div
      ref={indexRef}
      className="mt-16 lg:mt-20"
    >
      <ToolkitIndex />
    </div>

    <div className="mt-10 flex items-end justify-between border-t border-soft-violet/[0.11] pt-5">
      <p className="max-w-[250px] text-[8px] uppercase leading-4 tracking-[0.17em] text-muted-foreground/35">
        Technology changes.
        <br />
        The ability to understand systems
        carries forward.
      </p>

      <div className="hidden items-center gap-3 sm:flex">
        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-soft-violet/35">
          SYS / 05 COMPLETE
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-soft-violet/45 shadow-[0_0_7px_rgba(124,108,242,0.25)]" />
      </div>
    </div>
  </div>
</Container>

      {/* right-side section marker */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-[50%] hidden -translate-y-1/2 xl:block"
      >
        <div className="flex items-center gap-3 [writing-mode:vertical-rl]">
          <span className="font-mono text-[7px] uppercase tracking-[0.24em] text-soft-violet/30">
            05 SYSTEM
          </span>

          <span className="h-10 w-px bg-gradient-to-b from-soft-violet/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}