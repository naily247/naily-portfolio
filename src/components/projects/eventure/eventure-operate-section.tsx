'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Check,
  Download,
  FileBarChart,
  FileCheck2,
  MessageSquareWarning,
  ShieldCheck,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { Container } from '@/components/ui/container';

import { operateSteps } from './eventure-data';

const operationMeta = [
  {
    number: '01',
    shortLabel: 'Observe',
    description: 'Platform visibility',
    icon: Activity,
  },
  {
    number: '02',
    shortLabel: 'Intervene',
    description: 'Trust workflow',
    icon: MessageSquareWarning,
  },
  {
    number: '03',
    shortLabel: 'Understand',
    description: 'Operational data',
    icon: FileBarChart,
  },
];

export function EventureOperateSection() {
  const reduceMotion = useReducedMotion();

  const [activeOperateStep, setActiveOperateStep] =
    useState(0);

  const [autoPlay, setAutoPlay] = useState(true);
const [userInteracting, setUserInteracting] =
  useState(false);

const interactionTimeoutRef =
  useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

const pauseForInteraction = () => {
  setUserInteracting(true);

  if (interactionTimeoutRef.current) {
    clearTimeout(interactionTimeoutRef.current);
  }

  interactionTimeoutRef.current = setTimeout(() => {
    setUserInteracting(false);
  }, 6500);
};

const selectOperateStep = (index: number) => {
  setActiveOperateStep(index);
  pauseForInteraction();
};  

  const activeOperate =
    operateSteps[activeOperateStep] ??
    operateSteps[0];

  const activeMeta =
    operationMeta[activeOperateStep] ??
    operationMeta[0];

  const ActiveIcon = activeMeta.icon;

  const reportingActive =
    activeOperateStep ===
    operateSteps.length - 1;

    useEffect(() => {
  if (
    reduceMotion ||
    !autoPlay ||
    userInteracting ||
    operateSteps.length <= 1
  ) {
    return;
  }

  const interval = window.setInterval(() => {
    setActiveOperateStep(
      (current) =>
        (current + 1) % operateSteps.length,
    );
  }, 4200);

  return () => window.clearInterval(interval);
}, [
  autoPlay,
  reduceMotion,
  userInteracting,
]);

useEffect(() => {
  return () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(
        interactionTimeoutRef.current,
      );
    }
  };
}, []);

  return (
    <section className="bg-[#ebe6f7] py-12 sm:py-14">
      <Container>
        {/* CHAPTER INTRO */}
        <div className="grid gap-7 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                06
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Operate
              </span>
            </div>

            <h3 className="mt-4 max-w-sm font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              The product needs a control plane too.
            </h3>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Administration adds a different perspective on the
            same product: platform visibility, trust workflows
            and operational reporting.
          </p>
        </div>

        {/* OPERATIONS DESK */}
        <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-foreground/[0.09] bg-white/28">
          {/* SYSTEM BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/[0.08] px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/15" />
                <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
              </span>

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/55">
                Eventure / Operations
              </span>
            </div>

            <div className="flex items-center gap-3">
  <div className="hidden items-center gap-2 sm:flex">
    <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
      Administrator
    </span>

    <span className="h-1 w-1 rounded-full bg-[#6f5df4]/45" />

    <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
      Control plane
    </span>
  </div>

  {!reduceMotion && (
    <button
      type="button"
      onClick={() => {
        setAutoPlay(
          (current) => !current,
        );
        pauseForInteraction();
      }}
      className="rounded-full border border-foreground/[0.09] bg-white/25 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/55 transition hover:border-[#6f5df4]/25 hover:text-[#6f5df4]"
    >
      {autoPlay
        ? 'Pause motion'
        : 'Resume motion'}
    </button>
  )}
</div>
          </div>

          {/* OPERATIONAL LENSES */}
          <div className="relative border-b border-foreground/[0.08] px-4 py-4 sm:px-6">
            <div
              aria-hidden="true"
              className="absolute left-[16.66%] right-[16.66%] top-[31px] hidden h-px bg-foreground/[0.08] sm:block"
            />

            <div className="relative grid gap-2 sm:grid-cols-3">
              {operateSteps.map((step, index) => {
                const meta =
                  operationMeta[index] ??
                  operationMeta[0];

                const Icon = meta.icon;

                const active =
                  activeOperateStep === index;

                const visited =
                  index < activeOperateStep;

                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() =>
                      selectOperateStep(index)
                    }
                    aria-pressed={active}
                    className="group relative flex items-center gap-3 rounded-[1rem] px-3 py-2 text-left transition hover:bg-white/25 sm:flex-col sm:text-center"
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                        active
                          ? 'scale-105 border-[#6f5df4]/35 bg-[#6f5df4] text-white shadow-[0_0_0_5px_rgba(111,93,244,0.07)]'
                          : visited
                            ? 'border-[#6f5df4]/20 bg-[#eee9fb] text-[#6f5df4]'
                            : 'border-foreground/[0.09] bg-[#f0ecf8] text-muted-foreground/35 group-hover:border-[#6f5df4]/20 group-hover:text-[#6f5df4]'
                      }`}
                    >
                      {visited ? (
                        <Check size={12} />
                      ) : (
                        <Icon size={13} />
                      )}
                    </span>

                    <div className="min-w-0 sm:mt-1">
                      <div className="flex items-center gap-2 sm:justify-center">
                        <span
                          className={`text-[8px] font-semibold uppercase tracking-[0.17em] transition ${
                            active
                              ? 'text-[#6f5df4]'
                              : 'text-muted-foreground/45'
                          }`}
                        >
                          {meta.shortLabel}
                        </span>

                        <span className="text-[7px] text-muted-foreground/20">
                          {meta.number}
                        </span>
                      </div>

                      <p className="mt-1 text-[8px] text-muted-foreground/40">
                        {meta.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE CONTROL PLANE */}
          <div className="grid lg:grid-cols-[0.3fr_0.7fr]">
            {/* CONTEXT */}
            <div className="flex min-h-[330px] flex-col justify-between border-b border-foreground/[0.08] p-5 sm:p-6 lg:min-h-[455px] lg:border-b-0 lg:border-r">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`operate-copy-${activeOperateStep}`}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: -5,
                        }
                  }
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.3,
                  }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#6f5df4]/15 bg-[#6f5df4]/[0.055] text-[#6f5df4]">
                    <ActiveIcon size={15} />
                  </div>

                  <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                    {activeOperate.eyebrow}
                  </p>

                  <h4 className="mt-3 max-w-xs font-serif text-2xl tracking-[-0.035em] text-foreground sm:text-[1.7rem] sm:leading-[1.12]">
                    {activeOperate.title}
                  </h4>

                  <p className="mt-4 max-w-xs text-[12px] leading-[1.75] text-muted-foreground sm:text-[13px]">
                    {activeOperate.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8">
                <div className="border-t border-foreground/[0.08] pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/35">
                      Operational lens
                    </span>

                    <span className="text-[8px] text-muted-foreground/25">
                      {activeMeta.number} / 03
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {operationMeta.map(
                      (meta, index) => (
                        <button
                          key={meta.shortLabel}
                          type="button"
                          onClick={() =>
                            selectOperateStep(index)
                          }
                          aria-label={`Show ${meta.shortLabel}`}
                          className={`h-1.5 rounded-full transition-all ${
                            activeOperateStep ===
                            index
                              ? 'w-7 bg-[#6f5df4]'
                              : 'w-1.5 bg-foreground/15 hover:bg-foreground/30'
                          }`}
                        />
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      reportingActive
                        ? 'bg-[#6f5df4]'
                        : 'bg-[#6d9ee8]'
                    }`}
                  />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    {reportingActive
                      ? 'Report output available'
                      : 'Live admin surface'}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIVE ADMIN INTERFACE */}
            <div className="relative min-w-0 overflow-hidden p-3 sm:p-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(111,93,244,.065),transparent_40%),radial-gradient(circle_at_20%_82%,rgba(109,158,232,.045),transparent_28%)]"
              />

              <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[1.15rem] border border-foreground/[0.08] bg-[#f4f0fa]/70 p-3 sm:min-h-[430px] lg:min-h-[455px]">
                <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-5 sm:right-5">
                  <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/35">
                    Admin workspace
                  </span>

                  <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/30">
                    {activeMeta.shortLabel}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeOperate.image}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: 20,
                            scale: 0.985,
                          }
                    }
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    exit={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            x: -14,
                            scale: 0.99,
                          }
                    }
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.48,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="flex h-full w-full items-center justify-center pt-5"
                  >
                    <Image
                      src={activeOperate.image}
                      alt={activeOperate.alt}
                      width={1600}
                      height={950}
                      className="max-h-[380px] h-auto w-full rounded-[0.8rem] object-contain sm:max-h-[410px]"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex items-center gap-2 sm:left-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

                  <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/35">
                    Administrator /{' '}
                    {activeMeta.shortLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CONTROL PLANE FOOTER */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/[0.08] px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-2">
              {operationMeta.map(
                (meta, index) => (
                  <div
                    key={meta.shortLabel}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`text-[8px] font-semibold uppercase tracking-[0.14em] ${
                        activeOperateStep ===
                        index
                          ? 'text-[#6f5df4]'
                          : 'text-muted-foreground/30'
                      }`}
                    >
                      {meta.shortLabel}
                    </span>

                    {index <
                      operationMeta.length -
                        1 && (
                      <ArrowRight
                        size={9}
                        className="text-foreground/15"
                      />
                    )}
                  </div>
                ),
              )}
            </div>

            <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/30">
              Platform operations
            </span>
          </div>
        </div>

        {/* OUTPUT BRIDGE */}
        <div className="relative flex h-16 items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute top-0 h-full w-px bg-gradient-to-b from-[#6f5df4]/30 via-[#6f5df4]/15 to-transparent"
          />

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 12, 0],
                    opacity: [
                      0.35,
                      0.9,
                      0.35,
                    ],
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#6f5df4]/15 bg-[#ebe6f7] text-[#6f5df4]"
          >
            <ArrowDown size={11} />
          </motion.div>
        </div>

        {/* GENERATED ARTIFACT */}
        <div className="relative overflow-hidden rounded-[1.6rem] border border-foreground/[0.09] bg-white/28">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_73%_44%,rgba(111,93,244,.075),transparent_34%),radial-gradient(circle_at_24%_80%,rgba(109,158,232,.045),transparent_30%)]"
          />

          <div className="relative grid gap-7 p-5 sm:p-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
            {/* ARTIFACT COPY */}
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#6f5df4]/15 bg-[#6f5df4]/[0.055] text-[#6f5df4]">
                <FileCheck2 size={16} />
              </div>

              <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#6f5df4]">
                Generated artifact
              </p>

              <h4 className="mt-3 max-w-xs font-serif text-2xl tracking-[-0.035em] text-foreground sm:text-[1.7rem]">
                Reporting leaves the interface.
              </h4>

              <p className="mt-4 max-w-sm text-[12px] leading-[1.75] text-muted-foreground sm:text-[13px]">
                Operational data can become a
                downloadable payment activity report
                instead of remaining trapped inside the
                admin workspace.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-foreground/[0.08] bg-white/20 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/45">
                  PDF output
                </span>

                <span className="rounded-full border border-foreground/[0.08] bg-white/20 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/45">
                  Payment activity
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-foreground/[0.08] pt-4">
                <FileBarChart
                  size={12}
                  className="text-[#6f5df4]"
                />

                <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                  Reporting workspace
                </span>

                <ArrowRight
                  size={10}
                  className="text-foreground/20"
                />

                <Download
                  size={12}
                  className="text-[#6f5df4]"
                />

                <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]/70">
                  Generated PDF
                </span>
              </div>
            </div>

            {/* REPORT EXTRACTION */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
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
                duration: reduceMotion
                  ? 0
                  : 0.7,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="relative min-h-[370px] overflow-hidden rounded-[1.15rem] border border-foreground/[0.08] bg-[#f4f0fa]/65 sm:min-h-[410px]"
            >
              {/* SOURCE INTERFACE */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -14,
                      }
                }
                whileInView={{
                  opacity: 0.28,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : 0.7,
                  delay: reduceMotion
                    ? 0
                    : 0.1,
                }}
                className="absolute bottom-[15%] left-[4%] top-[15%] w-[58%] overflow-hidden rounded-[0.8rem] border border-foreground/[0.08] bg-white/45 p-2"
              >
                <Image
                  src={
                    operateSteps[
                      operateSteps.length - 1
                    ]?.image
                  }
                  alt={
                    operateSteps[
                      operateSteps.length - 1
                    ]?.alt ??
                    'Eventure reporting workspace'
                  }
                  width={1600}
                  height={950}
                  className="h-full w-full rounded-[0.55rem] object-contain"
                />
              </motion.div>

              {/* EXTRACTION ROUTE */}
              <div
                aria-hidden="true"
                className="absolute left-[47%] top-1/2 z-10 h-px w-[20%] bg-gradient-to-r from-[#6f5df4]/10 to-[#6f5df4]/45"
              />

              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute top-[calc(50%-3px)] z-20 h-1.5 w-1.5 rounded-full bg-[#6f5df4]"
                  animate={{
                    left: [
                      '48%',
                      '65%',
                    ],
                    opacity: [
                      0,
                      1,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* GENERATED DOCUMENT */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -40,
                        y: 8,
                        rotate: -1.5,
                        scale: 0.96,
                      }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : 0.85,
                  delay: reduceMotion
                    ? 0
                    : 0.18,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute bottom-[5%] right-[8%] top-[5%] z-20 flex items-center"
              >
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute -right-3 top-3 h-full w-full rounded-[0.45rem] border border-[#6f5df4]/[0.07] bg-[#ebe6f7]/80"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute -right-1.5 top-1.5 h-full w-full rounded-[0.45rem] border border-[#6f5df4]/10 bg-[#f4f0fa]"
                  />

                  <Image
                    src="/images/projects/eventure/operate/payment-activity-report.png"
                    alt="Generated Eventure payment activity report"
                    width={900}
                    height={1200}
                    className="relative max-h-[365px] w-auto rounded-[0.35rem] border border-foreground/[0.1] bg-white object-contain shadow-[0_25px_65px_rgba(72,57,120,0.16)] sm:max-h-[395px]"
                  />

                  <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#6f5df4]/15 bg-[#f4f0fa] text-[#6f5df4] shadow-sm">
                    <Download size={13} />
                  </span>
                </div>
              </motion.div>

              {/* STAGE LABELS */}
              <span className="absolute left-4 top-4 text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/30">
                Operational data
              </span>

              <span className="absolute right-4 top-4 text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]/55">
                Portable artifact
              </span>
            </motion.div>
          </div>

          {/* ARTIFACT FOOTER */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-foreground/[0.08] px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                Payment Activity Report
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[8px] uppercase tracking-[0.16em] text-muted-foreground/30">
                Reporting
              </span>

              <ArrowRight
                size={9}
                className="text-foreground/15"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]/65">
                PDF
              </span>
            </div>
          </div>
        </div>

        {/* JOURNEY CLOSE */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/[0.08] to-foreground/[0.08]" />

          <div className="flex items-center gap-2">
            <ShieldCheck
              size={11}
              className="text-[#6f5df4]/55"
            />

            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/35">
              Plan → Shape → Discover → Commit → Invite → Operate
            </span>
          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-foreground/[0.08] via-foreground/[0.08] to-transparent" />
        </div>
      </Container>
    </section>
  );
}