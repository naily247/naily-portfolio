'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Layers3,
  Search,
  Store,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { Container } from '@/components/ui/container';

const discoverySteps = [
  {
    number: '01',
    shortLabel: 'Marketplace',
    eyebrow: 'Browse',
    title: 'Start with the service need.',
    description:
      'Browse verified businesses by category and discover providers without beginning from a preselected vendor.',
    image: '/images/projects/eventure/discover/vendor-marketplace.png',
    alt: 'Eventure vendor marketplace',
    icon: Search,
  },
  {
    number: '02',
    shortLabel: 'Evaluate',
    eyebrow: 'Compare',
    title: 'Turn options into a shortlist.',
    description:
      'Compare available businesses, understand their positioning and move from a broad marketplace into focused evaluation.',
    image: '/images/projects/eventure/discover/marketplace-results.png',
    alt: 'Eventure marketplace vendor results',
    icon: Layers3,
  },
  {
    number: '03',
    shortLabel: 'Velvet Moments',
    eyebrow: 'Inspect',
    title: 'Open the identity behind the listing.',
    description:
      'Inspect the vendor profile, reputation and service context before moving into portfolio work, packages and commercial commitment.',
    image: '/images/projects/eventure/discover/vendor-profile.png',
    alt: 'Velvet Moments vendor profile in Eventure',
    icon: BriefcaseBusiness,
  },
];

const vendorViews = [
  {
    number: '01',
    label: 'Business profile',
    eyebrow: 'Identity',
    title: 'Shape what customers evaluate.',
    description:
      'Business information, positioning and profile content become the customer-facing identity discovered in the marketplace.',
    image: '/images/projects/eventure/vendor/business-profile.png',
    alt: 'Eventure vendor business profile workspace',
  },
  {
    number: '02',
    label: 'Service packages',
    eyebrow: 'Offering',
    title: 'Turn services into structured offers.',
    description:
      'Packages give customers something concrete to evaluate before a quotation request moves the relationship into commitment.',
    image: '/images/projects/eventure/vendor/service-packages.png',
    alt: 'Eventure vendor service packages',
  },
];

export function EventureDiscoverSection() {
  const reduceMotion = useReducedMotion();

  const [activeDiscoveryStep, setActiveDiscoveryStep] = useState(0);
  const [activeVendorView, setActiveVendorView] = useState(0);

  const activeDiscovery = discoverySteps[activeDiscoveryStep];
  const activeVendor = vendorViews[activeVendorView];

  return (
    <section className="overflow-hidden bg-[#ebe6f7] py-14 sm:py-16">
      <Container>
        {/* INTRO */}

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#6f5df4]">
                03
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Discover
              </span>
            </div>

            <h3 className="mt-4 max-w-xl font-serif text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              Direction turns into vendor discovery.
            </h3>
          </div>

          <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
            The marketplace is not the destination. It is the beginning of
            evaluation: browse the available businesses, open a vendor identity,
            inspect their work and understand what they actually offer before
            requesting anything.
          </p>
        </div>

        {/* CUSTOMER DISCOVERY STAGE */}

        <div className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-foreground/10 bg-white/30 shadow-[0_24px_80px_rgba(71,55,120,0.055)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(111,93,244,.09),transparent_32%),radial-gradient(circle_at_18%_86%,rgba(109,158,232,.07),transparent_30%)]"
          />

          {/* STAGE HEADER */}

          <div className="relative z-10 flex flex-col gap-4 border-b border-foreground/10 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-7">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <motion.span
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.7, 1],
                          opacity: [0.18, 0, 0.18],
                        }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute h-2 w-2 rounded-full bg-[#6f5df4]"
                />

                <span className="relative h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />
              </span>

              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
                Customer discovery
              </span>
            </div>

            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
              <span>Browse</span>
              <ArrowRight size={10} />
              <span>Compare</span>
              <ArrowRight size={10} />
              <span>Inspect</span>
            </div>
          </div>

          {/* STEP NAVIGATION */}

          <div className="relative z-10 grid border-b border-foreground/10 md:grid-cols-3">
            {discoverySteps.map((step, index) => {
              const Icon = step.icon;
              const active = activeDiscoveryStep === index;
              const completed = index < activeDiscoveryStep;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveDiscoveryStep(index)}
                  onMouseEnter={() => {
                    if (!reduceMotion) {
                      setActiveDiscoveryStep(index);
                    }
                  }}
                  aria-pressed={active}
                  className={`group relative flex min-h-[92px] items-center gap-4 border-foreground/10 px-5 py-4 text-left transition-colors duration-300 md:border-r md:last:border-r-0 sm:px-6 ${
                    active
                      ? 'bg-white/55'
                      : 'bg-transparent hover:bg-white/30'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      active
                        ? 'border-[#6f5df4]/25 bg-[#6f5df4]/10 text-[#6f5df4]'
                        : completed
                          ? 'border-[#6d9ee8]/20 bg-[#6d9ee8]/[0.07] text-[#6d9ee8]'
                          : 'border-foreground/10 bg-white/25 text-muted-foreground/50'
                    }`}
                  >
                    {completed ? <Check size={14} /> : <Icon size={14} />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[8px] font-semibold ${
                          active
                            ? 'text-[#6f5df4]'
                            : 'text-muted-foreground/45'
                        }`}
                      >
                        {step.number}
                      </span>

                      <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                        {step.eyebrow}
                      </span>
                    </div>

                    <p
                      className={`mt-1.5 truncate text-[11px] font-semibold transition-colors ${
                        active
                          ? 'text-foreground'
                          : 'text-foreground/60'
                      }`}
                    >
                      {step.shortLabel}
                    </p>
                  </div>

                  <motion.div
                    aria-hidden="true"
                    animate={{
                      scaleX: active ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformOrigin: 'left center',
                    }}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#6f5df4] to-[#6d9ee8]"
                  />
                </button>
              );
            })}
          </div>

          {/* ACTIVE DISCOVERY VIEW */}

          <div className="relative z-10 grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.31fr_0.69fr] lg:items-center lg:gap-7 lg:p-7">
            <div className="flex flex-col justify-between lg:min-h-[360px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeDiscovery.number}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
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
                          y: -8,
                        }
                  }
                  transition={{
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
                      {activeDiscovery.number} / {activeDiscovery.eyebrow}
                    </span>

                    <span className="h-px w-7 bg-[#6f5df4]/25" />
                  </div>

                  <h4 className="mt-5 max-w-xs font-serif text-2xl tracking-[-0.035em] text-foreground sm:text-[1.8rem]">
                    {activeDiscovery.title}
                  </h4>

                  <p className="mt-4 max-w-sm text-[11px] leading-6 text-muted-foreground">
                    {activeDiscovery.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 lg:mt-auto">
                <div className="flex items-center gap-2">
                  {discoverySteps.map((step, index) => (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveDiscoveryStep(index)}
                      aria-label={`Show ${step.shortLabel}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeDiscoveryStep === index
                          ? 'w-8 bg-[#6f5df4]'
                          : 'w-3 bg-foreground/15 hover:bg-foreground/25'
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                  <span>Marketplace</span>
                  <ArrowRight size={10} />
                  <span>Vendor identity</span>
                  <ArrowRight size={10} />
                  <span>Work</span>
                </div>
              </div>
            </div>

            <div className="relative min-w-0">
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-full bg-[#6f5df4]/[0.055] blur-3xl"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeDiscovery.image}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 22,
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
                          x: -16,
                          scale: 0.99,
                        }
                  }
                  transition={{
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative overflow-hidden rounded-[1.35rem] border border-foreground/10 bg-background p-2 shadow-[0_22px_60px_rgba(41,30,72,0.09)]"
                >
                  <Image
                    src={activeDiscovery.image}
                    alt={activeDiscovery.alt}
                    width={1500}
                    height={950}
                    className="max-h-[430px] h-auto w-full rounded-[1rem] object-contain"
                  />

                  <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-3">
                    <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                      Eventure / Customer
                    </span>

                    <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]">
                      {activeDiscovery.shortLabel}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* PORTFOLIO PAYOFF */}

        <div className="mt-7 grid gap-5 lg:grid-cols-[0.25fr_0.75fr] lg:items-center">
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
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="px-1"
          >
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#6f5df4]">
              Inspect the work
            </span>

            <h4 className="mt-3 max-w-xs font-serif text-2xl tracking-[-0.035em] text-foreground">
              A profile becomes useful when the work behind it is visible.
            </h4>

            <p className="mt-4 max-w-xs text-[11px] leading-6 text-muted-foreground">
              Portfolio evidence and service packages add the context needed
              before a customer moves from discovery into a quotation request.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f5df4]" />

              <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                Evaluation before commitment
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                    scale: 0.99,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -3,
                  }
            }
            className="group relative overflow-hidden rounded-[1.45rem] border border-foreground/10 bg-white/30 p-2 shadow-[0_20px_60px_rgba(55,40,90,0.055)]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] bottom-0 h-24 bg-[#6f5df4]/[0.07] blur-3xl"
            />

            <Image
              src="/images/projects/eventure/discover/vendor-portfolio-packages.png"
              alt="Velvet Moments portfolio and service packages"
              width={1700}
              height={950}
              className="relative h-auto w-full rounded-[1.1rem] object-contain"
            />

            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-[#0d1113]/80 px-4 py-2 backdrop-blur-md">
              <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-white/75">
                Portfolio + packages
              </span>

              <ArrowUpRight
                size={11}
                className="text-white/45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </motion.div>
        </div>

        {/* VENDOR-SIDE MIRROR */}

        <div className="mt-10 border-t border-foreground/10 pt-9">
          <div className="grid gap-7 lg:grid-cols-[0.32fr_0.68fr] lg:items-stretch lg:gap-8">
            <div className="flex flex-col">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6f5df4]">
                  The other side of discovery
                </p>

                <h4 className="mt-4 max-w-sm font-serif text-2xl tracking-[-0.035em] text-foreground sm:text-3xl">
                  What the customer discovers is built by the vendor.
                </h4>

                <p className="mt-4 max-w-sm text-[12px] leading-6 text-muted-foreground">
                  Vendor-facing tools create the business identity behind the
                  marketplace. Profile information and service packages become
                  customer-facing decision material.
                </p>
              </div>

              <div className="mt-7 grid gap-2">
                {vendorViews.map((view, index) => {
                  const active = activeVendorView === index;

                  return (
                    <button
                      key={view.number}
                      type="button"
                      onClick={() => setActiveVendorView(index)}
                      onMouseEnter={() => {
                        if (!reduceMotion) {
                          setActiveVendorView(index);
                        }
                      }}
                      aria-pressed={active}
                      className={`group relative overflow-hidden rounded-[1rem] border px-4 py-3.5 text-left transition-all duration-300 ${
                        active
                          ? 'border-[#6f5df4]/20 bg-white/50 shadow-[0_10px_30px_rgba(65,45,100,0.04)]'
                          : 'border-foreground/10 bg-white/15 hover:bg-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[8px] font-semibold ${
                              active
                                ? 'text-[#6f5df4]'
                                : 'text-muted-foreground/40'
                            }`}
                          >
                            {view.number}
                          </span>

                          <div>
                            <span className="block text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                              {view.eyebrow}
                            </span>

                            <span
                              className={`mt-1 block text-[10px] font-semibold ${
                                active
                                  ? 'text-foreground'
                                  : 'text-foreground/60'
                              }`}
                            >
                              {view.label}
                            </span>
                          </div>
                        </div>

                        <ArrowUpRight
                          size={13}
                          className={`transition-all duration-300 ${
                            active
                              ? 'text-[#6f5df4]'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      </div>

                      <motion.div
                        aria-hidden="true"
                        animate={{
                          scaleX: active ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          transformOrigin: 'left center',
                        }}
                        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#6f5df4] to-[#6d9ee8]"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Store size={13} className="text-[#6f5df4]" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
                  Vendor workspace → customer marketplace
                </span>
              </div>
            </div>

            {/* ACTIVE VENDOR VIEW */}

            <div className="relative min-w-0 overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-white/30 p-4 sm:p-5">
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#6d9ee8]/[0.07] blur-3xl"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeVendor.image}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 18,
                          scale: 0.99,
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
                          x: -12,
                          scale: 0.995,
                        }
                  }
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  <div className="overflow-hidden rounded-[1.15rem] border border-foreground/10 bg-background p-2 shadow-[0_18px_55px_rgba(50,35,85,0.06)]">
                    <Image
                      src={activeVendor.image}
                      alt={activeVendor.alt}
                      width={1400}
                      height={900}
                      className="max-h-[420px] h-auto w-full rounded-[0.9rem] object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-3 px-1 pb-1 pt-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]">
                        {activeVendor.eyebrow}
                      </span>

                      <h5 className="mt-1.5 text-sm font-semibold text-foreground">
                        {activeVendor.title}
                      </h5>
                    </div>

                    <p className="max-w-sm text-[9px] leading-5 text-muted-foreground sm:text-right">
                      {activeVendor.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* PERSPECTIVE CONNECTION */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-5"
          >
            <div className="flex items-center gap-3">
              <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
                Vendor creates
              </span>

              <ArrowRight size={11} className="text-[#6f5df4]/55" />

              <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
                Marketplace exposes
              </span>

              <ArrowRight size={11} className="text-[#6f5df4]/55" />

              <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
                Customer evaluates
              </span>
            </div>

            <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4]/65">
              Discovery → Commitment
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}