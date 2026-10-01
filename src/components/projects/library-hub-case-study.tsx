'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  ArchiveRestore,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  FileDown,
  FilePlus2,
  FileText,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';

import { Container } from '@/components/ui/container';
import type { Project } from '@/data/projects';

type LibraryHubCaseStudyProps = {
  project: Project;
};

const productAreas = [
  {
    number: '01',
    label: 'Books',
    detail: 'Catalog',
  },
  {
    number: '02',
    label: 'Transactions',
    detail: 'Borrowing',
  },
  {
    number: '03',
    label: 'Reservations',
    detail: 'Requests',
  },
  {
    number: '04',
    label: 'Fines',
    detail: 'Records',
  },
  {
    number: '05',
    label: 'E-books',
    detail: 'Digital access',
  },
];

const reportLifecycle = [
  {
    number: '01',
    label: 'Generate',
    description: 'Create reports from library activity.',
    icon: FilePlus2,
  },
  {
    number: '02',
    label: 'Manage',
    description: 'Maintain editable report records.',
    icon: FileText,
  },
  {
    number: '03',
    label: 'Finalize',
    description: 'Move completed reports into a final state.',
    icon: BarChart3,
  },
  {
    number: '04',
    label: 'Export',
    description: 'Download report data for external use.',
    icon: FileDown,
  },
  {
    number: '05',
    label: 'Archive',
    description: 'Remove reports without losing recoverability.',
    icon: ArchiveRestore,
  },
  {
    number: '06',
    label: 'Restore',
    description: 'Return archived reports to the workflow.',
    icon: RotateCcw,
  },
];

const interfaceWalkthrough = [
  {
    number: '01',
    shortLabel: 'Admin',
    eyebrow: 'Product context',
    title: 'Admin Dashboard',
    description:
      'Begin inside the wider LibraryHub administration workspace, where reporting operates alongside the other administrative responsibilities of the platform.',
    src: '/images/projects/library-hub/admin-dashboard.jpeg',
    alt: 'LibraryHub administrator dashboard',
  },
  {
    number: '02',
    shortLabel: 'Reports',
    eyebrow: 'Core workspace',
    title: 'Report Management',
    description:
      'Enter the reporting workspace to review generated reports, filter records, finalize active reports, export data, and manage report lifecycle actions.',
    src: '/images/projects/library-hub/report-management.jpeg',
    alt: 'LibraryHub Report Management interface',
  },
  {
    number: '03',
    shortLabel: 'Create',
    eyebrow: 'Generation',
    title: 'Create Report',
    description:
      'Create a new administrative report by defining its title, report type, reporting period, and generation options.',
    src: '/images/projects/library-hub/create-report.jpeg',
    alt: 'LibraryHub Create Report interface',
  },
  {
    number: '04',
    shortLabel: 'Details',
    eyebrow: 'Managed record',
    title: 'Report Details',
    description:
      'Treat each generated report as a managed administrative record that can be reviewed and maintained as it moves through the reporting workflow.',
    src: '/images/projects/library-hub/report-details.jpeg',
    alt: 'LibraryHub Report Details interface',
  },
  {
    number: '05',
    shortLabel: 'Analytics',
    eyebrow: 'Analysis',
    title: 'Report Analytics',
    description:
      'Inspect report information through an administrative analytics view that summarizes activity and supporting visual data.',
    src: '/images/projects/library-hub/report-analytics.jpeg',
    alt: 'LibraryHub Report Analytics interface',
  },
  {
    number: '06',
    shortLabel: 'Archive',
    eyebrow: 'Recovery',
    title: 'Archived Reports',
    description:
      'Keep removed reports recoverable through an archive workflow instead of treating deletion as an immediate irreversible action.',
    src: '/images/projects/library-hub/archived-reports.jpeg',
    alt: 'LibraryHub Archived Reports interface',
  },
];

export function LibraryHubCaseStudy({
  project,
}: LibraryHubCaseStudyProps) {
    const [activeLifecycleIndex, setActiveLifecycleIndex] = useState<number | null>(
  null,
);

    const [activeInterfaceIndex, setActiveInterfaceIndex] = useState(0);
  const [interfaceDirection, setInterfaceDirection] = useState<1 | -1>(1);
  const [isInterfacePlaying, setIsInterfacePlaying] = useState(false);
  const [interfaceCompleted, setInterfaceCompleted] = useState(false);

  const interfaceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const reduceMotion = useReducedMotion();

  const activeInterface = interfaceWalkthrough[activeInterfaceIndex];
  const isAnalyticsInterface = activeInterface.shortLabel === 'Analytics';

  useEffect(() => {
    if (interfaceTimerRef.current) {
      clearTimeout(interfaceTimerRef.current);
      interfaceTimerRef.current = null;
    }

    if (!isInterfacePlaying) {
      return;
    }

    if (activeInterfaceIndex === interfaceWalkthrough.length - 1) {
      setIsInterfacePlaying(false);
      setInterfaceCompleted(true);
      return;
    }

    interfaceTimerRef.current = setTimeout(() => {
      setInterfaceDirection(1);
      setActiveInterfaceIndex((current) => current + 1);
    }, 3000);

    return () => {
      if (interfaceTimerRef.current) {
        clearTimeout(interfaceTimerRef.current);
      }
    };
  }, [activeInterfaceIndex, isInterfacePlaying]);

  const selectInterface = (index: number) => {
    if (index === activeInterfaceIndex) {
      setIsInterfacePlaying(false);
      return;
    }

    setInterfaceDirection(index > activeInterfaceIndex ? 1 : -1);
    setIsInterfacePlaying(false);
    setInterfaceCompleted(index === interfaceWalkthrough.length - 1);
    setActiveInterfaceIndex(index);
  };

  const toggleInterfacePlayback = () => {
    if (isInterfacePlaying) {
      setIsInterfacePlaying(false);
      return;
    }

    if (interfaceCompleted) {
      setInterfaceDirection(1);
      setActiveInterfaceIndex(0);
      setInterfaceCompleted(false);

      window.setTimeout(() => {
        setIsInterfacePlaying(true);
      }, reduceMotion ? 0 : 350);

      return;
    }

    setInterfaceDirection(1);
    setIsInterfacePlaying(true);
  };

  return (
    <>
            {/* ------------------------------------------------------------- */}
{/* 01 / PRODUCT CONTEXT                                          */}
{/* ------------------------------------------------------------- */}

<section className="relative pb-8 pt-8 sm:pb-9 sm:pt-9 lg:pb-10 lg:pt-10">
  <Container>
    {/* --------------------------------------------------------- */}
    {/* INTRO                                                     */}
    {/* --------------------------------------------------------- */}

    <div className="grid gap-7 lg:grid-cols-[0.55fr_1.45fr] lg:gap-12">
      <div className="lg:pt-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
          01 / Product context
        </p>

        <p className="mt-4 max-w-[20rem] text-[15px] leading-7 text-muted-foreground">
          Report Management was one module inside a broader
          school-library platform.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#6f5df4]/35" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/55">
            Wider system
          </span>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
              Connected library operations
            </p>

            <h2 className="mt-3 max-w-3xl font-serif text-[2.35rem] leading-[1.02] tracking-[-0.045em] text-foreground sm:text-[2.7rem] lg:text-[2.9rem]">
              Library activity becomes
              <br className="hidden sm:block" /> administrative insight.
            </h2>
          </div>

          <div className="hidden items-center gap-2 pb-1 xl:flex">
            <span className="font-mono text-[10px] text-muted-foreground/45">
              05
            </span>

            <ArrowRight
              size={13}
              aria-hidden="true"
              className="text-[#6f5df4]/45"
            />

            <span className="font-mono text-[10px] font-medium text-[#6f5df4]">
              01
            </span>
          </div>
        </div>

        <p className="mt-4 max-w-4xl text-[15px] leading-7 text-muted-foreground">
          LibraryHub connects catalog activity, borrowing,
          reservations, fines, digital resources, user access, and
          administration. Reporting sits across that wider operational
          context rather than functioning as an isolated feature.
        </p>
      </div>
    </div>

    {/* --------------------------------------------------------- */}
    {/* SYSTEM MAP                                                */}
    {/* --------------------------------------------------------- */}

<div className="relative mt-6 overflow-hidden rounded-[1.45rem] border border-[#6f5df4]/[0.13] bg-white/30 p-4 shadow-[0_22px_65px_rgba(70,58,130,0.035)] sm:mt-7 sm:p-5 lg:p-6">      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[3%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#6f5df4]/[0.07] blur-[85px]"
      />

      {/* RECORD HEADER */}

      <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-[#6f5df4]/[0.09] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
            Operational context
          </span>
        </div>

        <span className="font-mono text-[10px] text-muted-foreground/45">
          05 inputs / 01 administrative layer
        </span>
      </div>

      {/* ------------------------------------------------------- */}
      {/* DESKTOP SYSTEM ROUTE                                    */}
      {/* ------------------------------------------------------- */}

      <div className="relative mt-5 hidden lg:grid lg:grid-cols-[1fr_72px_0.68fr] lg:items-stretch">
        <div className="grid grid-cols-2 gap-3">
          {productAreas.map((area, index) => (
            <div
              key={area.number}
              className={`group relative min-h-[112px] overflow-hidden rounded-[1rem] border border-foreground/[0.065] bg-white/45 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6f5df4]/20 hover:bg-white/65 ${
                index === productAreas.length - 1 ? 'col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] text-[#6f5df4]/65">
                  {area.number}
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                  {area.detail}
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="text-[14px] font-semibold text-foreground/85">
                  {area.label}
                </p>

                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]/25 transition-all duration-300 group-hover:bg-[#6f5df4]/60"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CONNECTION ROUTE */}

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-[10%] left-1/2 top-[10%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#6f5df4]/30 to-transparent"
          />

          <div
            aria-hidden="true"
            className="absolute left-0 right-1/2 top-1/2 h-px bg-[#6f5df4]/25"
          />

          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-1/2 h-px bg-[#6f5df4]/35"
          />

          {[18, 34, 50, 66, 82].map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6f5df4]/35 bg-[#ebe6f7]"
              style={{ top: `${position}%` }}
            />
          ))}

          <span
            aria-hidden="true"
            className="absolute right-0 top-1/2 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#6f5df4]/20 bg-[#ebe6f7]"
          >
            <ArrowRight
              size={11}
              className="text-[#6f5df4]/70"
            />
          </span>
        </div>

        {/* REPORTS FOCAL AREA */}

        <div className="relative flex min-h-full flex-col justify-between overflow-hidden rounded-[1.15rem] border border-[#6f5df4]/25 bg-white/70 p-5 shadow-[0_20px_55px_rgba(111,93,244,0.075)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-14 h-48 w-48 rounded-full bg-[#6f5df4]/[0.11] blur-[65px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-25%] left-[15%] h-40 w-40 rounded-full bg-[#6f5df4]/[0.055] blur-[55px]"
          />

          <div className="relative flex items-start justify-between gap-5">
            <div>
              <span className="font-mono text-[10px] text-[#6f5df4]/70">
                06
              </span>

              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
                Administrative layer
              </p>
            </div>

            <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#6f5df4]/15 bg-white/50">
              <span className="absolute h-3.5 w-3.5 rounded-full border border-[#6f5df4]/15" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#6f5df4] shadow-[0_0_14px_rgba(111,93,244,0.45)]" />
            </span>
          </div>

          <div className="relative my-8">
            <h3 className="font-serif text-[2rem] tracking-[-0.045em] text-foreground">
              Reports
            </h3>

            <p className="mt-3 max-w-[21rem] text-[14px] leading-7 text-muted-foreground/80">
              Structured records turn wider library activity into
              information administrators can review, maintain, finalize,
              archive, and export.
            </p>
          </div>

          <div className="relative border-t border-[#6f5df4]/[0.11] pt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#6f5df4]/40" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6f5df4]/75">
                Individual responsibility
              </span>
            </div>

            <p className="mt-2 text-[13px] leading-6 text-muted-foreground/70">
              Report Management module
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* TABLET / MOBILE SYSTEM ROUTE                            */}
      {/* ------------------------------------------------------- */}

      <div className="relative mt-5 grid gap-3 lg:hidden">
        <div className="grid gap-3 sm:grid-cols-2">
          {productAreas.map((area, index) => (
            <div
              key={area.number}
              className={`rounded-[1rem] border border-foreground/[0.065] bg-white/45 p-4 ${
                index === productAreas.length - 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] text-[#6f5df4]/65">
                  {area.number}
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                  {area.detail}
                </span>
              </div>

              <p className="mt-4 text-[14px] font-semibold text-foreground/85">
                {area.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center py-1">
          <div className="flex flex-col items-center gap-1">
            <span className="h-5 w-px bg-[#6f5df4]/25" />

            <ArrowRight
              size={13}
              aria-hidden="true"
              className="rotate-90 text-[#6f5df4]/65"
            />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.05rem] border border-[#6f5df4]/25 bg-white/70 p-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[#6f5df4]/[0.1] blur-[60px]"
          />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-[#6f5df4]/70">
                06
              </span>

              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]">
                Administrative layer
              </p>
            </div>

            <span className="h-2 w-2 rounded-full bg-[#6f5df4] shadow-[0_0_14px_rgba(111,93,244,0.45)]" />
          </div>

          <div className="relative mt-7">
            <h3 className="font-serif text-[1.85rem] tracking-[-0.04em] text-foreground">
              Reports
            </h3>

            <p className="mt-3 max-w-xl text-[14px] leading-7 text-muted-foreground/80">
              Structured records turn wider library activity into
              information administrators can review, maintain, finalize,
              archive, and export.
            </p>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center gap-3 border-t border-[#6f5df4]/[0.1] pt-4">
            <span className="h-px w-7 bg-[#6f5df4]/40" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6f5df4]/75">
              Individual responsibility · Report Management
            </span>
          </div>
        </div>
      </div>

      {/* SYSTEM FOOTNOTE */}

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-[10px] uppercase tracking-[0.13em] text-muted-foreground/50">
          Catalog · borrowing · requests · records · digital access
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6f5df4]/65">
            Wider activity
          </span>

          <ArrowRight
            size={11}
            aria-hidden="true"
            className="text-[#6f5df4]/50"
          />

          <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6f5df4]">
            Reporting
          </span>
        </div>
      </div>
    </div>
  </Container>
</section>

        {/* ------------------------------------------------------------- */}
{/* 02 / MY RESPONSIBILITY                                        */}
{/* ------------------------------------------------------------- */}

<section className="relative pb-9 pt-8 sm:pb-10 sm:pt-9 lg:pb-11 lg:pt-10">
  <Container>
    <div className="grid gap-7 lg:grid-cols-[0.52fr_1.48fr] lg:gap-12">
      {/* INTRO */}

      <div className="lg:pt-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
          02 / My responsibility
        </p>

        <h2 className="mt-3 max-w-sm font-serif text-[2.25rem] leading-[1.02] tracking-[-0.045em] text-foreground sm:text-[2.55rem]">
          Report
          <br />
          Management.
        </h2>

        <p className="mt-4 max-w-[20rem] text-[15px] leading-7 text-muted-foreground">
          I owned the report lifecycle across the full stack, from
          generation and record management through finalization,
          export, archive, and recovery.
        </p>

        <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#6f5df4]/[0.13] bg-white/35 px-3.5 py-2">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/15" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/65">
            Full-stack ownership
          </span>
        </div>
      </div>

      {/* LIFECYCLE EXHIBIT */}

      <div
        className="relative overflow-hidden rounded-[1.45rem] border border-[#6f5df4]/[0.13] bg-white/38 p-4 shadow-[0_22px_65px_rgba(70,58,130,0.04)] sm:p-5 lg:p-6"
        onMouseLeave={() => setActiveLifecycleIndex(null)}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 bottom-[-18%] h-64 w-64 rounded-full bg-[#6f5df4]/[0.065] blur-[85px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[25%] top-[-25%] h-48 w-48 rounded-full bg-white/50 blur-[75px]"
        />

        {/* EXHIBIT HEADER */}

        <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-[#6f5df4]/[0.09] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#6f5df4]/15" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
              Report lifecycle
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-muted-foreground/45">
              06 states
            </span>

            <span className="h-1 w-1 rounded-full bg-[#6f5df4]/30" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6f5df4]/65">
              Managed record
            </span>
          </div>
        </div>

        {/* DESKTOP LIFECYCLE */}

        <div className="relative mt-5 hidden md:block">
          <div
            aria-hidden="true"
            className={`absolute left-[16.666%] top-[calc(50%-13px)] h-[26px] w-px transition-all duration-500 ${
              activeLifecycleIndex !== null &&
              activeLifecycleIndex >= 3
                ? 'bg-[#6f5df4]/55 shadow-[0_0_12px_rgba(111,93,244,0.18)]'
                : 'bg-[#6f5df4]/20'
            }`}
          />

          <div
            aria-hidden="true"
            className={`absolute left-1/2 top-[calc(50%-13px)] h-[26px] w-px transition-all duration-500 ${
              activeLifecycleIndex !== null &&
              activeLifecycleIndex >= 4
                ? 'bg-[#6f5df4]/55 shadow-[0_0_12px_rgba(111,93,244,0.18)]'
                : 'bg-[#6f5df4]/20'
            }`}
          />

          <div
            aria-hidden="true"
            className={`absolute left-[83.333%] top-[calc(50%-13px)] h-[26px] w-px transition-all duration-500 ${
              activeLifecycleIndex === 5
                ? 'bg-[#6f5df4]/55 shadow-[0_0_12px_rgba(111,93,244,0.18)]'
                : 'bg-[#6f5df4]/20'
            }`}
          />

          <div className="grid grid-cols-3 gap-3">
            {reportLifecycle.map((step, index) => {
              const Icon = step.icon;
              const isRecovery = index >= 4;
              const isActive = activeLifecycleIndex === index;

              const isMainPathActive =
                activeLifecycleIndex !== null &&
                activeLifecycleIndex <= 3 &&
                index <= activeLifecycleIndex &&
                index <= 3;

              const isRecoveryPathActive =
                activeLifecycleIndex !== null &&
                activeLifecycleIndex >= 4 &&
                index >= 4 &&
                index <= activeLifecycleIndex;

              const isReached =
                isActive ||
                isMainPathActive ||
                isRecoveryPathActive;

              const shouldSoften =
                activeLifecycleIndex !== null && !isReached;

              return (
                <div
                  key={step.number}
                  tabIndex={0}
                  onMouseEnter={() => setActiveLifecycleIndex(index)}
                  onFocus={() => setActiveLifecycleIndex(index)}
                  onBlur={() => setActiveLifecycleIndex(null)}
                  aria-label={`${step.label}: ${step.description}`}
                  className={`group relative min-h-[164px] cursor-default overflow-hidden rounded-[1rem] border p-4 outline-none transition-all duration-500 ${
                    isActive
                      ? 'z-10 -translate-y-1 border-[#6f5df4]/35 bg-white/75 shadow-[0_18px_42px_rgba(111,93,244,0.11)]'
                      : isReached
                        ? 'border-[#6f5df4]/20 bg-white/58'
                        : isRecovery
                          ? 'border-[#6f5df4]/[0.14] bg-[#6f5df4]/[0.035]'
                          : 'border-foreground/[0.065] bg-white/45'
                  } ${
                    shouldSoften ? 'opacity-[0.62]' : 'opacity-100'
                  } focus-visible:ring-2 focus-visible:ring-[#6f5df4]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#6f5df4]/[0.10] blur-[48px] transition-opacity duration-500 ${
                      isActive
                        ? 'opacity-100'
                        : isRecovery
                          ? 'opacity-45'
                          : 'opacity-0'
                    }`}
                  />

                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-[#6f5df4]/75 to-transparent transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={`font-mono text-[10px] transition-colors duration-500 ${
                        isReached
                          ? 'text-[#6f5df4]'
                          : 'text-[#6f5df4]/55'
                      }`}
                    >
                      {step.number}
                    </span>

                    <span
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? 'border-[#6f5df4]/35 bg-white text-[#6f5df4] shadow-[0_0_0_5px_rgba(111,93,244,0.055),0_8px_20px_rgba(111,93,244,0.12)]'
                          : isReached
                            ? 'border-[#6f5df4]/20 bg-white/70 text-[#6f5df4]'
                            : isRecovery
                              ? 'border-[#6f5df4]/17 bg-white/50 text-[#6f5df4]/80'
                              : 'border-[#6f5df4]/[0.12] bg-[#ebe6f7]/80 text-[#6f5df4]/70'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-[-5px] rounded-full border border-[#6f5df4]/10" />
                      )}

                      <Icon
                        size={14}
                        aria-hidden="true"
                        className="relative"
                      />
                    </span>
                  </div>

                  <div className="relative mt-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-[14px] font-semibold transition-colors duration-500 ${
                          isActive
                            ? 'text-foreground'
                            : 'text-foreground/90'
                        }`}
                      >
                        {step.label}
                      </h3>

                      {index === 4 && (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-all duration-500 ${
                            isActive || activeLifecycleIndex === 5
                              ? 'border-[#6f5df4]/25 bg-white/70 text-[#6f5df4]'
                              : 'border-[#6f5df4]/15 bg-white/45 text-[#6f5df4]/65'
                          }`}
                        >
                          Recovery path
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-2 max-w-[16rem] text-[12px] leading-5 transition-colors duration-500 ${
                        isActive
                          ? 'text-muted-foreground/90'
                          : 'text-muted-foreground/75'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {index !== 2 && index !== 5 && (
                    <div
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-20 flex w-6 -translate-y-1/2 items-center"
                    >
                      <span
                        className={`h-px flex-1 transition-all duration-500 ${
                          activeLifecycleIndex !== null &&
                          (
                            (activeLifecycleIndex <= 3 &&
                              index < activeLifecycleIndex) ||
                            (activeLifecycleIndex >= 4 &&
                              index >= 4 &&
                              index < activeLifecycleIndex)
                          )
                            ? 'bg-[#6f5df4]/65 shadow-[0_0_8px_rgba(111,93,244,0.18)]'
                            : 'bg-[#6f5df4]/20'
                        }`}
                      />

                      <ArrowRight
                        size={10}
                        className={`shrink-0 transition-colors duration-500 ${
                          activeLifecycleIndex !== null &&
                          (
                            (activeLifecycleIndex <= 3 &&
                              index < activeLifecycleIndex) ||
                            (activeLifecycleIndex >= 4 &&
                              index >= 4 &&
                              index < activeLifecycleIndex)
                          )
                            ? 'text-[#6f5df4]'
                            : 'text-[#6f5df4]/40'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ACTIVE ROUTE SUMMARY */}

          <div className="relative mt-4 overflow-hidden rounded-[0.95rem] border border-[#6f5df4]/[0.11] bg-[#6f5df4]/[0.025] px-4 py-3.5">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute top-1/2 h-20 -translate-y-1/2 rounded-full bg-[#6f5df4]/[0.075] blur-[35px] transition-all duration-700 ${
                activeLifecycleIndex !== null &&
                activeLifecycleIndex >= 4
                  ? 'left-[62%] w-[32%]'
                  : 'left-[8%] w-[48%]'
              }`}
            />

            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {reportLifecycle.slice(0, 4).map((step, index) => {
                  const isReached =
                    activeLifecycleIndex !== null &&
                    activeLifecycleIndex <= 3 &&
                    index <= activeLifecycleIndex;

                  return (
                    <div
                      key={step.number}
                      className="flex items-center gap-3"
                    >
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ${
                          isReached
                            ? 'text-[#6f5df4]'
                            : 'text-muted-foreground/45'
                        }`}
                      >
                        {step.label}
                      </span>

                      {index < 3 && (
                        <ArrowRight
                          size={11}
                          aria-hidden="true"
                          className={`transition-colors duration-500 ${
                            activeLifecycleIndex !== null &&
                            activeLifecycleIndex <= 3 &&
                            index < activeLifecycleIndex
                              ? 'text-[#6f5df4]'
                              : 'text-[#6f5df4]/30'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div
                className={`flex items-center gap-2.5 rounded-full border px-3 py-1.5 transition-all duration-500 ${
                  activeLifecycleIndex !== null &&
                  activeLifecycleIndex >= 4
                    ? 'border-[#6f5df4]/25 bg-white/70 shadow-[0_8px_24px_rgba(111,93,244,0.07)]'
                    : 'border-[#6f5df4]/[0.13] bg-white/45'
                }`}
              >
                <ArchiveRestore
                  size={12}
                  aria-hidden="true"
                  className={`transition-colors duration-500 ${
                    activeLifecycleIndex !== null &&
                    activeLifecycleIndex >= 4
                      ? 'text-[#6f5df4]'
                      : 'text-[#6f5df4]/65'
                  }`}
                />

                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ${
                    activeLifecycleIndex !== null &&
                    activeLifecycleIndex >= 4
                      ? 'text-[#6f5df4]'
                      : 'text-[#6f5df4]/70'
                  }`}
                >
                  Archive ↔ Restore
                </span>
              </div>
            </div>
          </div>

          {/* CONTEXTUAL EXPLANATION */}

          <div className="mt-3 flex min-h-[26px] items-center justify-between gap-4 px-1">
            <p className="text-[12px] leading-5 text-muted-foreground/60">
              {activeLifecycleIndex === null
                ? 'Explore the lifecycle to trace how an administrative report moves through the module.'
                : activeLifecycleIndex <= 3
                  ? `${reportLifecycle[activeLifecycleIndex].label} sits within the primary report-management path.`
                  : activeLifecycleIndex === 4
                    ? 'Archive removes a report from the active workspace while preserving recoverability.'
                    : 'Restore returns an archived report to the managed workflow.'}
            </p>

            <div
              className={`hidden shrink-0 items-center gap-2 transition-opacity duration-300 sm:flex ${
                activeLifecycleIndex === null
                  ? 'opacity-45'
                  : 'opacity-100'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6f5df4]/70">
                {activeLifecycleIndex === null
                  ? 'Interactive lifecycle'
                  : `State ${
                      reportLifecycle[activeLifecycleIndex].number
                    } / 06`}
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE LIFECYCLE */}

        <div className="relative mt-5 grid gap-3 md:hidden">
          {reportLifecycle.map((step, index) => {
            const Icon = step.icon;
            const isRecovery = index >= 4;

            return (
              <div key={step.number} className="relative">
                <div
                  className={`relative overflow-hidden rounded-[1rem] border p-4 ${
                    isRecovery
                      ? 'border-[#6f5df4]/[0.17] bg-[#6f5df4]/[0.04]'
                      : 'border-foreground/[0.065] bg-white/45'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                        isRecovery
                          ? 'border-[#6f5df4]/20 bg-white/55 text-[#6f5df4]'
                          : 'border-[#6f5df4]/[0.12] bg-[#ebe6f7] text-[#6f5df4]/75'
                      }`}
                    >
                      <Icon size={14} aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-[14px] font-semibold text-foreground">
                          {step.label}
                        </h3>

                        <span className="font-mono text-[10px] text-[#6f5df4]/60">
                          {step.number}
                        </span>
                      </div>

                      <p className="mt-1.5 text-[12px] leading-5 text-muted-foreground/75">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {index < reportLifecycle.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="mx-auto flex h-5 w-5 items-center justify-center"
                  >
                    <ArrowRight
                      size={11}
                      className="rotate-90 text-[#6f5df4]/40"
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-2.5 rounded-[0.9rem] border border-[#6f5df4]/[0.11] bg-[#6f5df4]/[0.025] px-4 py-3">
            <ArchiveRestore
              size={12}
              aria-hidden="true"
              className="text-[#6f5df4]"
            />

            <p className="text-[12px] leading-5 text-muted-foreground/70">
              Archive and Restore preserve report recoverability instead
              of making removal immediately irreversible.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Container>
</section>

                  {/* ------------------------------------------------------------- */}
      {/* 03 / SELECTED INTERFACES                                      */}
      {/* ------------------------------------------------------------- */}

      <section className="relative pb-10 pt-9 sm:pb-11 sm:pt-10 lg:pb-12 lg:pt-11">
        <Container>
          {/* SECTION INTRO */}

          <div className="grid gap-5 lg:grid-cols-[0.42fr_1.58fr] lg:items-end lg:gap-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f5df4]">
                03 / Selected interfaces
              </p>

              <h2 className="mt-3 max-w-sm font-serif text-[2.15rem] leading-[1.02] tracking-[-0.045em] text-foreground sm:text-[2.6rem]">
                The reporting
                <br />
                workflow in use.
              </h2>
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <p className="max-w-[39rem] text-[13px] leading-6 text-muted-foreground">
                Six real interfaces move from the wider Admin workspace into
                Report Management, generation, record inspection, analytics,
                and recoverable archived records.
              </p>

              <div className="flex shrink-0 items-center gap-3 pb-1">
                <span className="h-px w-8 bg-[#6f5df4]/30" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/45">
                  Interactive evidence
                </span>
              </div>
            </div>
          </div>

          {/* 3D PROJECT DEMO */}

          <div className="relative mt-8 overflow-hidden rounded-[1.7rem] border border-[#6f5df4]/[0.15] bg-white/32 shadow-[0_35px_100px_rgba(70,58,130,0.075)]">
            {/* AMBIENT LIGHT */}

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: isAnalyticsInterface ? 0.95 : 0.58,
                scale: isAnalyticsInterface ? 1.12 : 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute left-1/2 top-[44%] h-[34rem] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6f5df4]/[0.075] blur-[125px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-32 top-[28%] h-72 w-72 rounded-full bg-[#6d9ee8]/[0.04] blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 bottom-[10%] h-72 w-72 rounded-full bg-[#6f5df4]/[0.045] blur-[100px]"
            />

            {/* THEATRE HEADER */}

            <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-[#6f5df4]/[0.08] px-5 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  {isInterfacePlaying && (
                    <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#6f5df4]/20" />
                  )}

                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.21em] text-[#6f5df4]">
                  Project demo theatre
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/35 sm:block">
                  Real implementation / Report Management
                </span>

                <span className="font-mono text-[10px] text-muted-foreground/45">
                  {String(activeInterfaceIndex + 1).padStart(2, '0')} /{' '}
                  {String(interfaceWalkthrough.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------- */}
            {/* DESKTOP 3D SPATIAL DECK                                 */}
            {/* ------------------------------------------------------- */}

            <div className="relative hidden min-h-[46rem] overflow-hidden lg:block">
              {/* ACTIVE SCENE LABEL */}

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`scene-label-${activeInterface.number}`}
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 0,
                          y: 7,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-1/2 top-6 z-40 -translate-x-1/2 text-center"
                >
                  <div className="flex items-center justify-center gap-2.5">
                    <span className="font-mono text-[10px] text-[#6f5df4]">
                      {activeInterface.number}
                    </span>

                    <span className="h-px w-7 bg-[#6f5df4]/30" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]/70">
                      {activeInterface.eyebrow}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/65">
                    {activeInterface.title}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* 3D SCREEN STAGE */}

              <div
                className="absolute inset-x-0 top-[5.5rem] h-[34rem]"
                style={{
                  perspective: '1450px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* FLOOR LINE */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[3.2rem] left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6f5df4]/15 to-transparent"
                />

                {/* FLOOR GLOW */}

                <motion.div
                  aria-hidden="true"
                  animate={{
                    opacity: isAnalyticsInterface ? 0.82 : 0.48,
                    scaleX: isAnalyticsInterface ? 1.1 : 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pointer-events-none absolute bottom-[1.8rem] left-1/2 h-16 w-[60%] -translate-x-1/2 rounded-[50%] bg-[#6f5df4]/[0.12] blur-[28px]"
                />

                {/* ALL SIX SCREENS LIVE IN THE SAME 3D SPACE */}

                {interfaceWalkthrough.map((screen, index) => {
                  const offset = index - activeInterfaceIndex;
                  const distance = Math.abs(offset);

                  const isActive = offset === 0;
                  const isNeighbour = distance === 1;

                  const screenX = isActive
                    ? '0%'
                    : offset < 0
                      ? '-64%'
                      : '64%';

                  const screenZ = isActive
                    ? isAnalyticsInterface
                      ? 18
                      : 0
                    : -175;

                  const screenRotation = isActive
                    ? 0
                    : offset < 0
                      ? 13
                      : -13;

                  const screenScale = isActive
                    ? isAnalyticsInterface
                      ? 1.015
                      : 1
                    : 0.76;

                  const screenOpacity = isActive
                    ? 1
                    : isNeighbour
                      ? 0.32
                      : 0;

                  return (
                    <motion.button
                      key={screen.src}
                      type="button"
                      onClick={() => selectInterface(index)}
                      tabIndex={isActive || isNeighbour ? 0 : -1}
                      aria-label={
                        isActive
                          ? `${screen.title}, active interface`
                          : `View ${screen.title}`
                      }
                      animate={{
                        x: screenX,
                        z: screenZ,
                        rotateY: screenRotation,
                        scale: screenScale,
                        opacity: screenOpacity,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.85,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`absolute left-1/2 top-1/2 w-[76%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.05rem] border bg-white text-left outline-none ${
                        isActive
                          ? isAnalyticsInterface
                            ? 'z-20 border-[#6f5df4]/30 shadow-[0_40px_100px_rgba(65,50,165,0.2)]'
                            : 'z-20 border-[#6f5df4]/25 shadow-[0_38px_95px_rgba(55,45,135,0.17)]'
                          : 'z-10 border-[#6f5df4]/10 shadow-[0_22px_60px_rgba(35,30,90,0.08)]'
                      } focus-visible:ring-2 focus-visible:ring-[#6f5df4]/30`}
                      style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        pointerEvents:
                          isActive || isNeighbour ? 'auto' : 'none',
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className={`absolute inset-x-[10%] top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#6f5df4] to-transparent ${
                          isActive ? 'opacity-70' : 'opacity-20'
                        }`}
                      />

                      <div className="relative aspect-[16/9] overflow-hidden bg-white">
                        <Image
                          src={screen.src}
                          alt={screen.alt}
                          fill
                          priority={index <= 1}
                          sizes="76vw"
                          className="object-contain"
                        />

                        {!isActive && (
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-[#ebe6f7]/20"
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* FLOATING ACTIVE SCREEN CONTEXT */}

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`interface-card-${activeInterface.number}`}
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 0,
                          y: 16,
                          x: interfaceDirection > 0 ? 12 : -12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: -8,
                          x: interfaceDirection > 0 ? -8 : 8,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute bottom-[5.8rem] right-[4.5%] z-40 w-[20rem] overflow-hidden rounded-[1.05rem] border bg-white/90 p-5 shadow-[0_24px_70px_rgba(42,34,100,0.13)] backdrop-blur-xl ${
                    isAnalyticsInterface
                      ? 'border-[#6f5df4]/25'
                      : 'border-[#6f5df4]/15'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#6f5df4]/[0.1] blur-[45px] ${
                      isAnalyticsInterface ? 'opacity-100' : 'opacity-55'
                    }`}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#6f5df4]">
                          {activeInterface.number}
                        </span>

                        <span className="h-px w-5 bg-[#6f5df4]/30" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]/70">
                          {activeInterface.eyebrow}
                        </span>
                      </div>

                      {isAnalyticsInterface && (
                        <BarChart3
                          size={12}
                          aria-hidden="true"
                          className="text-[#6f5df4]"
                        />
                      )}
                    </div>

                    <h3 className="mt-4 font-serif text-[1.9rem] leading-[1.03] tracking-[-0.04em] text-foreground">
                      {activeInterface.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-[1.65] text-muted-foreground/75">
                      {activeInterface.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#6f5df4]/[0.09] pt-3">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/35">
                        {activeInterface.shortLabel === 'Admin'
                          ? 'Wider product'
                          : 'Report Management'}
                      </span>

                      <span className="font-mono text-[10px] text-[#6f5df4]/65">
                        {String(activeInterfaceIndex + 1).padStart(2, '0')} /{' '}
                        {String(interfaceWalkthrough.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* DESKTOP NAVIGATION + PLAYBACK */}

              <div className="absolute inset-x-[4.5%] bottom-5 z-50">
                <div className="grid grid-cols-[1fr_auto] items-center gap-5 rounded-[1.05rem] border border-[#6f5df4]/[0.11] bg-white/72 p-2.5 shadow-[0_14px_40px_rgba(60,48,125,0.055)] backdrop-blur-xl">
                  <div className="grid grid-cols-6 gap-1.5">
                    {interfaceWalkthrough.map((screen, index) => {
                      const isActive = index === activeInterfaceIndex;
                      const hasPassed = index < activeInterfaceIndex;

                      return (
                        <button
                          key={`desktop-nav-${screen.number}`}
                          type="button"
                          onClick={() => selectInterface(index)}
                          aria-pressed={isActive}
                          className={`relative rounded-[0.7rem] px-3 py-2.5 text-left outline-none transition-all duration-300 ${
                            isActive
                              ? 'bg-white shadow-[0_8px_24px_rgba(111,93,244,0.09)]'
                              : 'hover:bg-white/45'
                          } focus-visible:ring-2 focus-visible:ring-[#6f5df4]/25`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="libraryhub-demo-active"
                              className="absolute inset-x-[20%] top-0 h-px bg-[#6f5df4]/75"
                              transition={{
                                duration: reduceMotion ? 0 : 0.45,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          )}

                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono text-[9px] ${
                                isActive || hasPassed
                                  ? 'text-[#6f5df4]'
                                  : 'text-muted-foreground/30'
                              }`}
                            >
                              {screen.number}
                            </span>

                            <span
                              className={`h-1 w-1 rounded-full ${
                                isActive
                                  ? 'bg-[#6f5df4]'
                                  : hasPassed
                                    ? 'bg-[#6f5df4]/35'
                                    : 'bg-foreground/10'
                              }`}
                            />
                          </div>

                          <p
                            className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${
                              isActive
                                ? 'text-foreground/80'
                                : 'text-muted-foreground/40'
                            }`}
                          >
                            {screen.shortLabel}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={toggleInterfacePlayback}
                    className="group inline-flex h-10 min-w-[9rem] items-center justify-center gap-2 rounded-full border border-[#6f5df4]/15 bg-white/75 px-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6f5df4]/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5df4]/25"
                  >
                    {isInterfacePlaying ? (
                      <>
                        <Pause
                          size={11}
                          aria-hidden="true"
                          className="text-[#6f5df4]"
                        />
                        Pause
                      </>
                    ) : interfaceCompleted ? (
                      <>
                        <RotateCcw
                          size={11}
                          aria-hidden="true"
                          className="text-[#6f5df4] transition-transform duration-500 group-hover:-rotate-45"
                        />
                        Replay
                      </>
                    ) : (
                      <>
                        <Play
                          size={11}
                          aria-hidden="true"
                          className="text-[#6f5df4]"
                        />
                        Play walkthrough
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------- */}
            {/* TABLET / MOBILE                                        */}
            {/* ------------------------------------------------------- */}

            <div className="relative p-4 sm:p-6 lg:hidden">
              <div className="relative overflow-hidden rounded-[1rem] border border-[#6f5df4]/15 bg-white shadow-[0_20px_55px_rgba(35,30,90,0.1)]">
                <div className="relative aspect-[16/9]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeInterface.src}
                      initial={
                        reduceMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 0,
                              x: interfaceDirection > 0 ? 20 : -20,
                            }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x: interfaceDirection > 0 ? -20 : 20,
                            }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeInterface.src}
                        alt={activeInterface.alt}
                        fill
                        sizes="94vw"
                        className="object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`mobile-context-${activeInterface.number}`}
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 0,
                          y: 10,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-4 rounded-[1rem] border border-[#6f5df4]/12 bg-white/65 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#6f5df4]">
                      {activeInterface.number}
                    </span>

                    <span className="h-px w-5 bg-[#6f5df4]/30" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]/70">
                      {activeInterface.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-[1.55rem] tracking-[-0.04em] text-foreground">
                    {activeInterface.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-muted-foreground/70">
                    {activeInterface.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {interfaceWalkthrough.map((screen, index) => {
                  const isActive = index === activeInterfaceIndex;

                  return (
                    <button
                      key={`mobile-nav-${screen.number}`}
                      type="button"
                      onClick={() => selectInterface(index)}
                      aria-pressed={isActive}
                      className={`rounded-[0.7rem] border px-2 py-2 text-center outline-none transition-all duration-300 ${
                        isActive
                          ? 'border-[#6f5df4]/25 bg-white/75'
                          : 'border-transparent bg-white/20'
                      } focus-visible:ring-2 focus-visible:ring-[#6f5df4]/25`}
                    >
                      <span
                        className={`font-mono text-[9px] ${
                          isActive
                            ? 'text-[#6f5df4]'
                            : 'text-muted-foreground/30'
                        }`}
                      >
                        {screen.number}
                      </span>

                      <p
                        className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] ${
                          isActive
                            ? 'text-foreground/75'
                            : 'text-muted-foreground/40'
                        }`}
                      >
                        {screen.shortLabel}
                      </p>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={toggleInterfacePlayback}
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#6f5df4]/15 bg-white/60 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground"
              >
                {isInterfacePlaying ? (
                  <>
                    <Pause
                      size={11}
                      aria-hidden="true"
                      className="text-[#6f5df4]"
                    />
                    Pause walkthrough
                  </>
                ) : interfaceCompleted ? (
                  <>
                    <RotateCcw
                      size={11}
                      aria-hidden="true"
                      className="text-[#6f5df4]"
                    />
                    Replay walkthrough
                  </>
                ) : (
                  <>
                    <Play
                      size={11}
                      aria-hidden="true"
                      className="text-[#6f5df4]"
                    />
                    Play walkthrough
                  </>
                )}
              </button>
            </div>

            {/* THEATRE FOOTER */}

            <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-[#6f5df4]/[0.08] px-5 py-3.5 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-2">
                {interfaceWalkthrough.map((screen, index) => (
                  <div
                    key={`theatre-route-${screen.number}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 ${
                        index === activeInterfaceIndex
                          ? 'text-[#6f5df4]'
                          : index < activeInterfaceIndex
                            ? 'text-foreground/40'
                            : 'text-muted-foreground/25'
                      }`}
                    >
                      {screen.shortLabel}
                    </span>

                    {index < interfaceWalkthrough.length - 1 && (
                      <ArrowRight
                        size={8}
                        aria-hidden="true"
                        className="text-[#6f5df4]/25"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-[#6f5df4]/70 ${
                    isInterfacePlaying
                      ? 'shadow-[0_0_12px_rgba(111,93,244,0.5)]'
                      : ''
                  }`}
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]/60">
                  Implemented interface evidence
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- */}
{/* 04 / COLLABORATIVE OUTCOME                                    */}
{/* ------------------------------------------------------------- */}

<section className="relative pb-10 pt-9 sm:pb-11 sm:pt-10 lg:pb-12 lg:pt-11">
  <Container>
    <div className="grid gap-8 lg:grid-cols-[0.52fr_1.48fr] lg:gap-14">
      {/* SECTION RECORD */}

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
          04 / Collaborative outcome
        </p>

        <p className="mt-4 max-w-[19rem] text-[15px] leading-7 text-muted-foreground">
          Individual module ownership inside a collaborative
          full-stack product.
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
            Completed · 2026
          </span>
        </div>
      </div>

      {/* CLOSING RECORD */}

      <div className="relative overflow-hidden rounded-[1.4rem] border border-[#6f5df4]/[0.13] bg-white/38 shadow-[0_24px_70px_rgba(70,58,130,0.04)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#6f5df4]/[0.08] blur-[90px]"
        />

        <div className="relative p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#6f5df4]/[0.09] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#6f5df4]/30" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
                Project record / final
              </span>
            </div>

            <span className="font-mono text-[10px] text-muted-foreground/40">
              04 / 04
            </span>
          </div>

          <div className="mt-6 grid gap-7 xl:grid-cols-[1.3fr_0.7fr] xl:gap-10">
            <div>
              <h2 className="max-w-3xl font-serif text-[2rem] leading-[1.05] tracking-[-0.045em] text-foreground sm:text-[2.4rem]">
                Reporting became a managed lifecycle,
                <br className="hidden sm:block" /> not just a generated
                file.
              </h2>

              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">
                {project.outcome}
              </p>
            </div>

            {/* OWNERSHIP SUMMARY */}

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[0.95rem] border border-[#6f5df4]/[0.09] bg-[#6f5df4]/[0.09]">
              <div className="bg-[#ebe6f7]/95 p-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">
                  Role
                </span>

                <p className="mt-2 text-[14px] font-semibold leading-5 text-foreground/80">
                  Report Management
                </p>
              </div>

              <div className="bg-[#ebe6f7]/95 p-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">
                  Scope
                </span>

                <p className="mt-2 text-[14px] font-semibold leading-5 text-foreground/80">
                  Full stack
                </p>
              </div>

              <div className="bg-[#ebe6f7]/95 p-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">
                  Product
                </span>

                <p className="mt-2 text-[14px] font-semibold leading-5 text-foreground/80">
                  Team project
                </p>
              </div>

              <div className="bg-[#ebe6f7]/95 p-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">
                  Status
                </span>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

                  <p className="text-[14px] font-semibold text-foreground/80">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LIFECYCLE FOOTPRINT */}

          <div className="mt-6 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
            {reportLifecycle.map((step) => (
              <div
                key={step.number}
                className="rounded-[0.75rem] border border-foreground/[0.055] bg-white/28 px-2.5 py-2.5"
              >
                <span className="font-mono text-[10px] text-[#6f5df4]/60">
                  {step.number}
                </span>

                <p className="mt-1 text-[11px] font-semibold text-foreground/70">
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          {/* TECHNOLOGY + REPOSITORY */}

          <div className="mt-6 flex flex-col gap-5 border-t border-[#6f5df4]/[0.09] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-[#6f5df4]/[0.11] bg-white/35 px-2.5 py-1.5 text-[11px] text-muted-foreground/70"
                >
                  {technology}
                </span>
              ))}
            </div>

            {project.repository && (
              <Link
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-foreground px-4 py-2.5 text-[10px] font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
              >
                View Library Hub team repository

                <ArrowUpRight
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </Container>
</section>
    </>
  );
}