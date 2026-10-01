'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import type { Project } from '@/data/projects';

import { EventurePlanSection } from './eventure/eventure-plan-section';
import { EventureShapeSection } from './eventure/eventure-shape-section';
import { EventureDiscoverSection } from './eventure/eventure-discover-section';
import { EventureCommitSection } from './eventure/eventure-commit-section';
import { EventureInviteSection } from './eventure/eventure-invite-section';
import { EventureOperateSection } from './eventure/eventure-operate-section';
import { EventureSystemRevealSection } from './eventure/eventure-system-reveal-section';
import { EventureEngineeringSection } from './eventure/eventure-engineering-section';

import {
  decisions,
  journey,
} from './eventure/eventure-data';

type EventureCaseStudyProps = {
  project: Project;
};

export function EventureCaseStudy({ project }: EventureCaseStudyProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
            {/* PRODUCT STAGE */}

      <section className="pb-6 pt-5 sm:pb-7 sm:pt-6">
        <Container>
          <div className="relative overflow-hidden rounded-[1.7rem] border border-foreground/[0.09] bg-white/25">
            {/* restrained system grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:48px_48px] text-foreground/[0.018]"
            />

            {/* quiet blue → purple atmosphere */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(111,93,244,.075),transparent_34%),radial-gradient(circle_at_26%_22%,rgba(109,158,232,.055),transparent_28%)]"
            />

            <div className="relative z-10">
              {/* system header */}
              <div className="flex items-center justify-between border-b border-foreground/[0.07] px-6 py-4 sm:px-8">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2 items-center justify-center">
                    <span className="absolute h-2 w-2 rounded-full bg-[#6d9ee8]/20" />
                    <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
                  </span>

                  <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/55">
                    Eventure / Product system
                  </span>
                </div>

                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/35">
                  One connected event
                </span>
              </div>

              {/* main reveal */}
              <div className="grid items-center gap-6 px-6 py-6 sm:px-8 sm:py-7 lg:grid-cols-[0.58fr_1.42fr] lg:gap-8">
                {/* product thesis */}
                <div className="lg:pr-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
                    Event planning · Vendor coordination
                  </p>

                  <h2 className="mt-3 max-w-md font-serif text-3xl tracking-[-0.045em] text-foreground sm:text-[2.65rem] sm:leading-[0.98]">
                    One event.
                    <span className="block text-foreground/42">
                      One connected system.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-sm text-[12px] leading-6 text-muted-foreground">
                    Planning, marketplace activity, commercial workflows and
                    operations remain connected to the same event.
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6f5df4]/15 bg-[#6f5df4]/[0.045] text-[#6f5df4]">
                      <ArrowDown size={13} />
                    </div>

                    <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/45">
                      Follow the product
                    </span>
                  </div>
                </div>

                {/* flagship interface */}
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                          rotateX: 2,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                  style={{
                    perspective: 1200,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -inset-5 rounded-full bg-[#6f5df4]/[0.055] blur-3xl"
                  />

                  <div className="relative overflow-hidden rounded-[1.3rem] border border-foreground/[0.09] bg-white/55 p-2 shadow-[0_18px_50px_rgba(67,53,105,0.08)]">
                    <div className="overflow-hidden rounded-[0.95rem] border border-foreground/[0.07] bg-white/60">
                      <Image
                        src="/images/projects/eventure/plan/event-workspace.png"
                        alt="Eventure event workspace for Sophia and Ethan's wedding"
                        width={1600}
                        height={1000}
                        priority
                        className="h-auto w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between px-2 pb-1 pt-2.5">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
                        Event workspace
                      </span>

                      <span className="text-[8px] uppercase tracking-[0.18em] text-muted-foreground/35">
                        Customer / Planning
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* compact lifecycle rail */}
              <div className="border-t border-foreground/[0.07] px-6 py-4 sm:px-8">
                <div className="relative">
                  <div className="absolute left-4 right-4 top-1/2 hidden h-px -translate-y-1/2 bg-foreground/[0.07] lg:block" />

                  <motion.div
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{
                      duration: 1.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ transformOrigin: 'left center' }}
                    className="absolute left-4 right-4 top-1/2 z-0 hidden h-px -translate-y-1/2 bg-gradient-to-r from-[#6d9ee8]/60 via-[#6f5df4]/55 to-[#6f5df4]/15 lg:block"
                  />

                  <div className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                    {journey.map((chapter, index) => (
                      <motion.div
                        key={chapter.verb}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 5,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.6,
                        }}
                        transition={{
                          duration: 0.32,
                          delay: reduceMotion ? 0 : index * 0.055,
                        }}
                        className="group flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-[#ebe6f7]/95 px-3 py-2 transition duration-300 hover:border-[#6f5df4]/25 hover:bg-white/65"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#6f5df4]/15 bg-white/45 text-[7px] font-semibold text-[#6f5df4]">
                          {chapter.number}
                        </span>

                        <span className="text-[7px] font-semibold uppercase tracking-[0.13em] text-foreground/60">
                          {chapter.verb}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* final system cue */}
              <div className="flex items-center justify-between border-t border-foreground/[0.06] px-6 py-3.5 sm:px-8">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8]" />

                  <span className="text-[8px] font-medium uppercase tracking-[0.17em] text-muted-foreground/40">
                    Shared event state
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
                    Product → Context
                  </span>

                  <span className="h-px w-7 bg-gradient-to-r from-[#6d9ee8] to-[#6f5df4]" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

{/* PRODUCT CONTEXT */}

<section className="pb-8 pt-6 sm:pb-9 sm:pt-7">
  <Container>
    <div className="grid gap-6 lg:grid-cols-[0.58fr_1.42fr] lg:gap-10">
      {/* Editorial context */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f5df4]">
          Product context
        </p>

        <h2 className="mt-4 max-w-sm font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
          Event planning is rarely one workflow.
        </h2>
      </div>

      {/* System explanation */}
      <div>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          {project.problem}
        </p>

        {/* Three product conditions */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 grid overflow-hidden rounded-[1.25rem] border border-foreground/10 bg-foreground/[0.08] sm:grid-cols-3"
        >
          <div className="border-b border-foreground/10 bg-white/30 px-5 py-4 sm:border-b-0 sm:border-r">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                Multiple roles
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              Customer, vendor, guest and administrator experiences operate
              around the same product.
            </p>
          </div>

          <div className="border-b border-foreground/10 bg-white/30 px-5 py-4 sm:border-b-0 sm:border-r">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6d9ee8]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                Shared event state
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              Planning, marketplace activity, guest coordination and
              operations remain connected to the event.
            </p>
          </div>

          <div className="bg-white/30 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                Stateful workflows
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              Quotations, bookings and payments move through explicit
              lifecycle states instead of isolated actions.
            </p>
          </div>
        </motion.div>

        {/* Handoff into PLAN */}

<div className="mt-4 flex items-center gap-4 border-t border-foreground/[0.07] pt-3">
  <span className="text-[8px] font-medium uppercase tracking-[0.17em] text-muted-foreground/40">
    Product context established
  </span>

  <div className="h-px flex-1 bg-gradient-to-r from-foreground/[0.08] via-[#6d9ee8]/25 to-[#6f5df4]/35" />

  <div className="flex shrink-0 items-center gap-2">
    <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
      01 / Begin with planning
    </span>

    <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />
  </div>
</div>
      </div>
    </div>
  </Container>
</section>

{/* PLAN */}

<EventurePlanSection />

{/* SHAPE */}

<EventureShapeSection />

{/* DISCOVER */}

<EventureDiscoverSection />

{/* COMMIT */}

<EventureCommitSection />

{/* INVITE */}

<EventureInviteSection />

{/* OPERATE */}

<EventureOperateSection />

{/* SYSTEM REVEAL */}
<EventureSystemRevealSection />


{/* ENGINEERING */}
<EventureEngineeringSection />

      {/* PRODUCT DECISIONS */}

      <section className="bg-[#ebe6f7] pb-9 pt-6 sm:pb-10 sm:pt-7 lg:pb-11 lg:pt-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.58fr_1.42fr] lg:gap-10">
            {/* INTRO */}
            <div className="lg:pt-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold text-[#6f5df4]">
                  09
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  Product decisions
                </span>
              </div>

              <h2 className="mt-4 max-w-sm font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
                Decisions that keep the system coherent.
              </h2>

              <p className="mt-5 max-w-sm text-[12px] leading-6 text-muted-foreground">
                A few structural choices keep different roles,
                workflows and commercial states behaving like one
                product rather than disconnected features.
              </p>
            </div>

            {/* DECISION LIST */}
            <div className="border-y border-foreground/[0.09]">
              {decisions.map((decision, index) => {
                const visual = [
                  {
                    label: 'Responsibility model',
                    items: [
                      'Customer',
                      'Vendor',
                      'Guest',
                      'Admin',
                    ],
                  },
                  {
                    label: 'Visible lifecycle',
                    items: [
                      'Waiting',
                      'Accepted',
                      'Verifying',
                      'Active',
                    ],
                  },
                  {
                    label: 'Marketplace continuity',
                    items: [
                      'Package',
                      'Discover',
                      'Request',
                      'Booking',
                      'Payment',
                    ],
                  },
                ][index];

                return (
                  <motion.div
                    key={decision.number}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 12,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      delay: reduceMotion
                        ? 0
                        : index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative border-b border-foreground/[0.09] last:border-b-0"
                  >
                    {/* ACTIVE-ON-HOVER SIGNAL */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 top-0 w-[2px] origin-center scale-y-0 bg-gradient-to-b from-[#6d9ee8]/20 via-[#6f5df4]/75 to-[#6f5df4]/15 transition-transform duration-500 ease-out group-hover:scale-y-100"
                    />

                    <div className="grid gap-4 py-5 transition-transform duration-300 group-hover:translate-x-1 sm:grid-cols-[52px_0.82fr_1.18fr] sm:gap-5 sm:py-5">
                      {/* NUMBER */}
                      <div>
                        <span className="text-[9px] font-semibold text-[#6f5df4]">
                          {decision.number}
                        </span>
                      </div>

                      {/* TITLE + VISUAL RAIL */}
                      <div>
                        <h3 className="max-w-[260px] font-serif text-xl leading-[1.3] tracking-[-0.025em] text-foreground">
                          {decision.title}
                        </h3>

                        {visual && (
                          <div className="mt-4">
                            <p className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/30">
                              {visual.label}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                              {visual.items.map(
                                (item, itemIndex) => (
                                  <div
                                    key={item}
                                    className="flex items-center gap-1.5"
                                  >
                                    <span className="rounded-full border border-foreground/[0.07] bg-white/25 px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.11em] text-muted-foreground/45 transition duration-300 group-hover:border-[#6f5df4]/15 group-hover:bg-white/45 group-hover:text-foreground/55">
                                      {item}
                                    </span>

                                    {itemIndex <
                                      visual.items.length -
                                        1 && (
                                      <span className="text-[8px] text-[#6f5df4]/25 transition-colors duration-300 group-hover:text-[#6f5df4]/50">
                                        →
                                      </span>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* DESCRIPTION */}
                      <div className="sm:pt-0.5">
                        <p className="max-w-xl text-[12px] leading-6 text-muted-foreground">
                          {decision.description}
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                          <div className="relative h-px flex-1 overflow-hidden bg-foreground/[0.06]">
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-[#6d9ee8]/55 to-[#6f5df4]/65 transition-all duration-700 ease-out group-hover:w-full" />
                          </div>

                          <span className="h-1.5 w-1.5 rounded-full bg-foreground/[0.12] transition duration-300 group-hover:scale-125 group-hover:bg-[#6f5df4]/70" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* DECISIONS → OUTCOME */}
          <div className="mx-auto mt-6 flex max-w-xl items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground/[0.08]" />

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]/55" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/30">
                Decisions → outcome
              </span>
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-foreground/[0.08] to-transparent" />
          </div>
        </Container>
      </section>

      {/* CURRENT OUTCOME */}

      <section className="pb-10 pt-2 sm:pb-12 sm:pt-3 lg:pb-12">
        <Container>
          <div className="overflow-hidden rounded-[1.7rem] border border-foreground/[0.09] bg-white/35 p-6 sm:p-7 lg:p-8">
            <div className="grid gap-7 lg:grid-cols-[0.62fr_1.38fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f5df4]">
                  Current outcome
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">
                    Active development
                  </span>
                </div>
              </div>

              <div>
                <h2 className="max-w-2xl font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                  Building Eventure has meant thinking beyond individual
                  features.
                </h2>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {project.outcome}
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
                  The current product connects planning, vendor discovery,
                  commercial workflows, guest coordination and administration
                  through shared event state. Development continues to focus on
                  completing end-to-end behavior, strengthening product
                  quality and refining the transitions between roles.
                </p>

                {project.repository && (
                  <div className="mt-8">
                    <Link
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-85"
                    >
                      View repository
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

