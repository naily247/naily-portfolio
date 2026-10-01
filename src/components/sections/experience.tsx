'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { Container } from '@/components/ui/container';

const experience = [
  {
    period: 'Aug 2026 — Present',
    type: 'Work',
    role: 'Software Engineer Intern',
    organisation: 'Source Code Limited',
    description:
      'Working with real project requirements through implementation, development workflows, collaboration, and iterative software development.',
    logo: '/images/experience/source-code-logo.png',
    logoAlt: 'Source Code Limited logo',
    logoClassName: 'h-11 w-[76px]',
    active: true,
  },
  {
    period: '2024 — Present',
    type: 'University',
    role: 'BSc (Hons) Information Technology',
    organisation: 'SLIIT · Software Engineering',
    description:
      'Building experience across software engineering, databases, web and mobile development, UX, testing, and collaborative software projects.',
    logo: '/images/experience/sliit-logo.png',
    logoAlt: 'SLIIT logo',
    logoClassName: 'h-12 w-12',
    active: false,
  },
  {
    period: '2016 — 2022',
    type: 'School',
    role: 'Baduriya Central College',
    organisation: 'Mawanella',
    description:
      'Completed my secondary education before beginning my path into software engineering.',
    logo: '/images/experience/baduriya-central-college-logo.png',
    logoAlt: 'Baduriya Central College logo',
    logoClassName: 'h-12 w-12',
    active: false,
  },
];

const credentials = [
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    issued: 'Jun 2026',
    credentialUrl:
      'https://www.credly.com/badges/bf2e9830-db08-4f0e-9c2a-25e23a485b11',
  },
];

export function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-soft-lavender pb-12 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12"
    >
{/* ====================================================== */}
{/* SECTION ATMOSPHERE                                     */}
{/* ====================================================== */}

<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  {/* localized violet light behind the editorial heading */}
  <div className="absolute -left-40 top-[14%] h-[24rem] w-[28rem] rounded-full bg-soft-violet/[0.055] blur-[130px]" />

  {/* quiet technical light around the timeline */}
  <div className="absolute right-[4%] top-[30%] h-[24rem] w-[28rem] rounded-full bg-cool-blue/[0.035] blur-[135px]" />

  {/* restrained lower atmosphere */}
  <div className="absolute bottom-[8%] left-[42%] h-[22rem] w-[30rem] rounded-full bg-soft-violet/[0.04] blur-[140px]" />
</div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          {/* ================================================== */}
          {/* SECTION INTRO                                      */}
          {/* ================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* section signal */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-soft-violet"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 2.4, 1],
                          opacity: [0.35, 0, 0.35],
                        }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />

                <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet shadow-[0_0_9px_rgba(124,108,242,0.35)]" />
              </span>

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-soft-violet">
                Experience / 04
              </p>

              <span className="h-px w-9 bg-gradient-to-r from-soft-violet/55 to-transparent" />
            </div>

            {/* heading */}
            <div className="relative mt-5">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 top-[28%] -z-10 h-32 w-72 rounded-full bg-soft-violet/[0.055] blur-[55px]"
              />

              <h2 className="max-w-md font-serif text-[clamp(2.6rem,4.5vw,4.5rem)] leading-[0.95] tracking-[-0.045em] text-foreground">
                Experience that shapes

                <span className="relative block text-muted-foreground">
                   how I build.

                  <span
                    aria-hidden="true"
                    className="absolute -bottom-3 left-0 h-px w-[42%] bg-gradient-to-r from-soft-violet/65 via-soft-violet/25 to-transparent"
                  />
                </span>
              </h2>
            </div>

            <p className="mt-8 max-w-sm text-sm leading-7 text-muted-foreground">
              Professional experience, education, and continued learning —
              each contributing to how I approach products, implementation,
              and collaborative development.
            </p>

            {/* quiet philosophy marker */}
            <div className="mt-10 hidden items-center gap-3 lg:flex">
              <span className="h-px w-8 bg-soft-violet/25" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-soft-violet/55">
                Learn · Apply · Refine
              </span>
            </div>
          </motion.div>

          {/* ================================================== */}
          {/* EXPERIENCE + CREDENTIALS                           */}
          {/* ================================================== */}

          <div>
            {/* ================================================= */}
            {/* EXPERIENCE TIMELINE                               */}
            {/* ================================================= */}

            <div className="relative border-t border-soft-violet/[0.13]">
              {/* permanent timeline rail */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-[132px] top-0 hidden w-px bg-gradient-to-b from-soft-violet/35 via-soft-violet/16 to-transparent sm:block"
              />

              {experience.map((item, index) => {
                const itemNumber = String(index + 1).padStart(2, '0');

                return (
                  <motion.article
                    key={`${item.role}-${item.organisation}`}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 18,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group/experience relative grid gap-5 overflow-hidden border-b border-soft-violet/[0.11] py-7 sm:grid-cols-[120px_1fr]"
                  >
                    {/* ----------------------------------------- */}
                    {/* ROW ATMOSPHERE                            */}
                    {/* ----------------------------------------- */}

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-soft-violet/[0.012] via-transparent to-cool-blue/[0.008] transition-colors duration-700 group-hover/experience:from-soft-violet/[0.065] group-hover/experience:via-soft-violet/[0.022] group-hover/experience:to-cool-blue/[0.035]"
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-28 w-72 -translate-y-1/2 rounded-full bg-soft-violet/0 blur-[55px] transition-colors duration-700 group-hover/experience:bg-soft-violet/[0.055]"
                    />

                    {/* travelling signal */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 h-px w-20 -translate-x-full bg-gradient-to-r from-transparent via-soft-violet to-cool-blue opacity-0 transition-[transform,opacity] duration-1000 ease-out group-hover/experience:translate-x-[850%] group-hover/experience:opacity-70"
                    />

                    {/* ----------------------------------------- */}
                    {/* PERIOD                                    */}
                    {/* ----------------------------------------- */}

                    <div className="relative">
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground/65 transition-colors duration-500 group-hover/experience:text-foreground/65">
                        {item.period}
                      </span>

                      <div className="mt-2 flex items-center gap-2">
                        {item.active ? (
                          <span className="relative flex h-1.5 w-1.5">
                            <motion.span
                              aria-hidden="true"
                              className="absolute inset-0 rounded-full bg-soft-violet"
                              animate={
                                reduceMotion
                                  ? undefined
                                  : {
                                      scale: [1, 2.5, 1],
                                      opacity: [0.5, 0, 0.5],
                                    }
                              }
                              transition={{
                                duration: 2.3,
                                repeat: Infinity,
                                ease: 'easeOut',
                              }}
                            />

                            <span className="relative h-1.5 w-1.5 rounded-full bg-soft-violet shadow-[0_0_8px_rgba(124,108,242,0.50)]" />
                          </span>
                        ) : (
                          <span className="h-1 w-1 rounded-full bg-soft-violet/40 transition-[background-color,box-shadow] duration-500 group-hover/experience:bg-soft-violet group-hover/experience:shadow-[0_0_7px_rgba(124,108,242,0.35)]" />
                        )}

                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-soft-violet/75 transition-colors duration-500 group-hover/experience:text-soft-violet">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* ----------------------------------------- */}
                    {/* ENTRY                                     */}
                    {/* ----------------------------------------- */}

                    <div className="relative flex items-start gap-4">
                      {/* timeline node */}
                      <div className="relative z-10 mt-1 hidden w-3 shrink-0 items-center justify-center sm:flex">
                        <span className="absolute h-5 w-5 rounded-full bg-soft-lavender" />

                        <span
                          className={`relative h-1.5 w-1.5 rounded-full transition-[background-color,box-shadow,transform] duration-500 group-hover/experience:scale-125 ${
                            item.active
                              ? 'bg-soft-violet shadow-[0_0_9px_rgba(124,108,242,0.55)]'
                              : 'bg-soft-violet/45 group-hover/experience:bg-soft-violet group-hover/experience:shadow-[0_0_8px_rgba(124,108,242,0.38)]'
                          }`}
                        />
                      </div>

                      {/* entry number */}
                      <span className="mt-1 shrink-0 text-[10px] font-semibold text-soft-violet/70 transition-[color,transform] duration-500 group-hover/experience:translate-x-0.5 group-hover/experience:text-soft-violet">
                        {itemNumber}
                      </span>

                      {/* logo */}
                      <div className="group/logo relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-soft-violet/[0.10] bg-white/20 transition-[border-color,background-color,box-shadow,transform] duration-500 group-hover/experience:-translate-y-0.5 group-hover/experience:border-soft-violet/25 group-hover/experience:bg-white/35 group-hover/experience:shadow-[0_8px_28px_rgba(124,108,242,0.08)]">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-soft-violet/[0.035] via-transparent to-cool-blue/[0.025] opacity-70 transition-opacity duration-500 group-hover/experience:opacity-100"
                        />

                        <div
                          className={`relative ${item.logoClassName} transition-transform duration-500 ease-out group-hover/experience:scale-[1.04]`}
                        >
                          <Image
                            src={item.logo}
                            alt={item.logoAlt}
                            fill
                            sizes="96px"
                            className="object-contain"
                          />
                        </div>

                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-1/2 h-px w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-soft-violet/45 to-transparent transition-[width,opacity] duration-500 group-hover/experience:w-14 group-hover/experience:opacity-100"
                        />
                      </div>

                      {/* content */}
                      <div className="min-w-0 flex-1">
                        <div className="relative w-fit">
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-soft-violet/[0.025] blur-xl transition-[background-color,transform] duration-500 group-hover/experience:scale-110 group-hover/experience:bg-soft-violet/[0.08]"
                          />

                          <h3 className="text-base font-semibold text-foreground transition-[color,transform] duration-500 group-hover/experience:translate-x-0.5 group-hover/experience:text-[#5949d2]">
                            {item.role}
                          </h3>

                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1 left-0 h-px w-8 bg-gradient-to-r from-soft-violet/45 to-transparent transition-[width,opacity] duration-500 group-hover/experience:w-16 group-hover/experience:opacity-100"
                          />
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground transition-colors duration-500 group-hover/experience:text-foreground/70">
                          {item.organisation}
                        </p>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground transition-colors duration-500 group-hover/experience:text-foreground/65">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* ================================================= */}
            {/* CREDENTIALS                                       */}
            {/* ================================================= */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10"
            >
              <div className="flex items-end justify-between border-b border-soft-violet/[0.13] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-soft-violet/65 shadow-[0_0_5px_rgba(124,108,242,0.25)]" />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-soft-violet">
                      Credentials
                    </p>

                    <span className="h-px w-6 bg-gradient-to-r from-soft-violet/40 to-transparent" />
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Continued learning beyond the core curriculum.
                  </p>
                </div>

                <span className="rounded-full border border-soft-violet/[0.12] bg-soft-violet/[0.025] px-2 py-1 text-[9px] font-medium tracking-[0.14em] text-soft-violet/60">
                  {String(credentials.length).padStart(2, '0')}
                </span>
              </div>

              {credentials.map((credential) => (
                <a
                  key={`${credential.title}-${credential.issuer}`}
                  href={credential.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/credential relative grid gap-4 overflow-hidden border-b border-soft-violet/[0.11] py-5 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  {/* credential atmosphere */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-soft-violet/[0.012] via-transparent to-cool-blue/[0.008] transition-colors duration-500 group-hover/credential:from-soft-violet/[0.06] group-hover/credential:to-cool-blue/[0.025]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-soft-violet via-[#a99cff] to-cool-blue transition-[width] duration-700 ease-out group-hover/credential:w-full"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-soft-violet/45 transition-[background-color,box-shadow,transform] duration-500 group-hover/credential:scale-125 group-hover/credential:bg-soft-violet group-hover/credential:shadow-[0_0_7px_rgba(124,108,242,0.45)]" />

                      <h3 className="text-sm font-semibold text-foreground transition-[color,transform] duration-500 group-hover/credential:translate-x-0.5 group-hover/credential:text-[#5949d2]">
                        {credential.title}
                      </h3>
                    </div>

                    <p className="ml-3 mt-1 text-xs text-muted-foreground">
                      {credential.issuer} · {credential.issued}
                    </p>
                  </div>

                  <span className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-500 group-hover/credential:text-[#5949d2]">
                    View credential

                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-soft-violet/[0.15] bg-white/15 transition-[border-color,background-color,box-shadow,transform] duration-500 group-hover/credential:-translate-y-0.5 group-hover/credential:translate-x-0.5 group-hover/credential:border-soft-violet/35 group-hover/credential:bg-soft-violet/[0.08] group-hover/credential:shadow-[0_0_18px_rgba(124,108,242,0.10)]">
                      <ArrowUpRight
                        size={12}
                        className="transition-transform duration-500 group-hover/credential:-translate-y-0.5 group-hover/credential:translate-x-0.5"
                      />
                    </span>
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}