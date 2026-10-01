'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  Mail,
  Search,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';

import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

type CommandIconProps = {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

type CommandItem = {
  id: string;
  label: string;
  description: string;
  group: 'Navigate' | 'Projects' | 'Connect';
  keywords: string[];
  icon: ComponentType<CommandIconProps>;
  action: () => void;
  external?: boolean;
  disabled?: boolean;
};


function scrollToSection(id: string) {
  const target =
    document.getElementById(id);

  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  window.history.replaceState(
    null,
    '',
    window.location.pathname,
  );
}

export function CommandMenu() {
  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState('');

  const [activeIndex, setActiveIndex] =
    useState(0);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const reduceMotion =
    useReducedMotion();

  const items = useMemo<CommandItem[]>(
    () => {
      const navigationItems: CommandItem[] = [
        {
          id: 'about',
          label: 'About',
          description:
            'A little about me and how I approach products.',
          group: 'Navigate',
          keywords: [
            'about',
            'naily',
            'approach',
            'product',
          ],
          icon: Sparkles,
          action: () =>
            scrollToSection('about'),
        },
        {
          id: 'work',
          label: 'Selected Work',
          description:
            'Explore featured products and technical work.',
          group: 'Navigate',
          keywords: [
            'work',
            'projects',
            'featured',
            'build',
          ],
          icon: FolderKanban,
          action: () =>
            scrollToSection('work'),
        },
        {
          id: 'experience',
          label: 'Experience',
          description:
            'Professional experience, education and credentials.',
          group: 'Navigate',
          keywords: [
            'experience',
            'intern',
            'source code',
            'education',
            'sliit',
            'credentials',
          ],
          icon: BriefcaseBusiness,
          action: () =>
            scrollToSection(
              'experience',
            ),
        },
        {
          id: 'toolkit',
          label: 'Toolkit',
          description:
            'Technologies and tools used across different builds.',
          group: 'Navigate',
          keywords: [
            'toolkit',
            'stack',
            'technology',
            'tools',
            'skills',
          ],
          icon: Wrench,
          action: () =>
            scrollToSection('toolkit'),
        },
        {
          id: 'contact',
          label: 'Contact',
          description:
            'Start a conversation.',
          group: 'Navigate',
          keywords: [
            'contact',
            'connect',
            'talk',
            'email',
          ],
          icon: Mail,
          action: () =>
            scrollToSection('contact'),
        },
      ];

      const projectItems: CommandItem[] =
        projects.map((project) => ({
          id: `project-${project.slug}`,
          label: project.title,
          description:
            project.role,
          group: 'Projects',
          keywords: [
            project.title,
            project.slug,
            project.eyebrow,
            project.role,
            project.year,
            ...project.technologies,
          ],
          icon:
            project.slug ===
            'trendify'
              ? Code2
              : project.slug ===
                  'library-hub'
                ? GraduationCap
                : FolderKanban,
          action: () => {
            window.location.href =
              `/projects/${project.slug}`;
          },
        }));

      const connectItems: CommandItem[] = [
        {
          id: 'github',
          label: 'GitHub',
          description:
            'Browse repositories and source code.',
          group: 'Connect',
          keywords: [
            'github',
            'code',
            'source',
            'repository',
          ],
          icon: SiGithub,
          external: true,
          action: () => {
            window.open(
              siteConfig.links.github,
              '_blank',
              'noopener,noreferrer',
            );
          },
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          description:
            'View professional profile.',
          group: 'Connect',
          keywords: [
            'linkedin',
            'professional',
            'profile',
          ],
          icon: FaLinkedinIn,
          external: true,
          action: () => {
            window.open(
              siteConfig.links.linkedin,
              '_blank',
              'noopener,noreferrer',
            );
          },
        },
        {
          id: 'email',
          label: 'Email Naily',
          description:
            siteConfig.email,
          group: 'Connect',
          keywords: [
            'email',
            'mail',
            'contact',
            siteConfig.email,
          ],
          icon: Mail,
          action: () => {
            window.location.href =
              `mailto:${siteConfig.email}`;
          },
        },
        {
          id: 'resume',
          label: 'Resume',
          description:
            'Coming soon',
          group: 'Connect',
          keywords: [
            'resume',
            'cv',
          ],
          icon: BriefcaseBusiness,
          disabled: true,
          action: () => {},
        },
      ];

      return [
        ...navigationItems,
        ...projectItems,
        ...connectItems,
      ];
    },
    [],
  );

  const filteredItems =
    useMemo(() => {
      const normalized =
        query
          .trim()
          .toLowerCase();

      if (!normalized) {
        return items;
      }

      return items.filter(
        (item) => {
          const haystack = [
            item.label,
            item.description,
            ...item.keywords,
          ]
            .join(' ')
            .toLowerCase();

          return haystack.includes(
            normalized,
          );
        },
      );
    }, [items, query]);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      const isCommand =
        (event.metaKey ||
          event.ctrlKey) &&
        event.key.toLowerCase() ===
          'k';

      if (isCommand) {
        event.preventDefault();

        setOpen(
          (current) => !current,
        );

        return;
      }

      if (
        event.key === 'Escape' &&
        open
      ) {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () =>
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(0);
      return;
    }

    const timeout =
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 80);

    return () =>
      window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  const executeItem = (
    item: CommandItem,
  ) => {
    if (item.disabled) return;

    setOpen(false);

    window.setTimeout(() => {
      item.action();
    }, reduceMotion ? 0 : 100);
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      filteredItems.length === 0
    ) {
      return;
    }

    if (
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();

      setActiveIndex(
        (current) =>
          (current + 1) %
          filteredItems.length,
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      setActiveIndex(
        (current) =>
          (current -
            1 +
            filteredItems.length) %
          filteredItems.length,
      );
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      const item =
        filteredItems[
          activeIndex
        ];

      if (item) {
        executeItem(item);
      }
    }
  };

  const groups = [
    'Navigate',
    'Projects',
    'Connect',
  ] as const;

  return (
    <>
      {/* desktop command trigger */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-foreground/[0.09] bg-soft-lavender/75 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-[0_12px_38px_rgba(13,17,19,0.07)] backdrop-blur-xl transition duration-300 hover:border-[#6f5df4]/35 hover:bg-soft-lavender/90 hover:text-foreground lg:flex"
      >
        <Search
          size={11}
          className="text-[#6f5df4]"
        />

        <span>Navigate</span>

        <span className="ml-1 border-l border-foreground/10 pl-2 font-sans text-[9px] tracking-normal opacity-50">
          ⌘ K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.22,
            }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-[#30264f]/14 px-4 pt-[14vh] backdrop-blur-[10px] sm:px-6"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio command menu"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 14,
                      scale: 0.985,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 8,
                scale: 0.99,
              }}
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.3,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="relative w-full max-w-[660px] overflow-hidden rounded-[1.5rem] border border-[#6f5df4]/[0.12] bg-soft-lavender/95 text-foreground shadow-[0_35px_100px_rgba(57,44,108,0.18)] backdrop-blur-2xl"
            >
              {/* purple atmospheric layer */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-[#6f5df4]/[0.10] blur-[70px]" />

                <div className="absolute -bottom-32 right-[-4rem] h-72 w-72 rounded-full bg-[#6f5df4]/[0.075] blur-[80px]" />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:42px_42px] text-[#6f5df4]/[0.018]" />
              </div>

              <div className="relative z-10">
                {/* search */}

                <div className="group/search relative flex items-center gap-3 border-b border-foreground/[0.08] px-5">
                  <Search
                    size={17}
                    className="shrink-0 text-[#6f5df4]"
                  />

                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) =>
                      setQuery(
                        event.target
                          .value,
                      )
                    }
                    onKeyDown={
                      handleInputKeyDown
                    }
                    placeholder="Search projects, technologies, or sections..."
                    aria-label="Search portfolio"
                    className="h-16 min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground/55 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setOpen(false)
                    }
                    aria-label="Close command menu"
                    className="rounded-full border border-foreground/[0.09] bg-background/20 p-2 text-muted-foreground/70 transition duration-300 hover:border-[#6f5df4]/30 hover:bg-[#6f5df4]/[0.05] hover:text-[#6f5df4]"
                  >
                    <X size={13} />
                  </button>

                  {/* purple focus signal */}

                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-1px] left-5 h-px w-16 origin-left scale-x-50 bg-gradient-to-r from-[#6f5df4] via-[#6f5df4]/60 to-transparent opacity-40 transition-all duration-500 group-focus-within/search:w-40 group-focus-within/search:scale-x-100 group-focus-within/search:opacity-100"
                  />
                </div>

                {/* navigator status */}

                <div className="flex items-center justify-between border-b border-foreground/[0.055] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="absolute h-2 w-2 rounded-full bg-[#6f5df4]/20" />

                      <span className="relative h-1 w-1 rounded-full bg-[#6f5df4]" />
                    </span>

                    <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/65">
                      Portfolio navigator
                    </span>
                  </div>

                  <span className="text-[8px] tabular-nums uppercase tracking-[0.16em] text-muted-foreground/50">
                    {filteredItems.length}{' '}
                    results
                  </span>
                </div>

                {/* results */}

                <div className="max-h-[43vh] overflow-y-auto px-2 py-3">
                  {filteredItems.length >
                  0 ? (
                    groups.map(
                      (group) => {
                        const groupItems =
                          filteredItems.filter(
                            (item) =>
                              item.group ===
                              group,
                          );

                        if (
                          groupItems.length ===
                          0
                        ) {
                          return null;
                        }

                        return (
                          <div
                            key={group}
                            className="mb-4 last:mb-0"
                          >
                            <p className="px-3 pb-2 pt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
                              {group}
                            </p>

                            <div>
                              {groupItems.map(
                                (item) => {
                                  const index =
                                    filteredItems.indexOf(
                                      item,
                                    );

                                  const active =
                                    index ===
                                    activeIndex;

                                  const Icon =
                                    item.icon;

                                  return (
                                    <button
                                      key={
                                        item.id
                                      }
                                      type="button"
                                      disabled={
                                        item.disabled
                                      }
                                      onMouseEnter={() =>
                                        setActiveIndex(
                                          index,
                                        )
                                      }
                                      onClick={() =>
                                        executeItem(
                                          item,
                                        )
                                      }
                                      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[0.9rem] px-3 py-3 text-left transition duration-300 ${
                                        active
                                          ? 'bg-[#6f5df4]/[0.075]'
                                          : 'bg-transparent hover:bg-[#6f5df4]/[0.025]'
                                      } ${
                                        item.disabled
                                          ? 'cursor-not-allowed opacity-35'
                                          : ''
                                      }`}
                                    >
                                      {active && (
                                        <motion.span
                                          layoutId="command-active-signal"
                                          aria-hidden="true"
                                          className="absolute bottom-2 left-0 top-2 w-px rounded-full bg-[#6f5df4]/70"
                                          transition={{
                                            duration:
                                              reduceMotion
                                                ? 0
                                                : 0.22,
                                            ease: [
                                              0.22,
                                              1,
                                              0.36,
                                              1,
                                            ],
                                          }}
                                        />
                                      )}

                                      <div
                                        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] border transition duration-300 ${
                                          active
                                            ? 'border-[#6f5df4]/30 bg-[#6f5df4]/[0.09] text-[#6f5df4]'
                                            : 'border-foreground/[0.08] bg-background/15 text-muted-foreground/65'
                                        }`}
                                      >
                                        <Icon
                                          aria-hidden="true"
                                          className="h-3.5 w-3.5" 
                                        />
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                          <p className="truncate text-sm font-medium text-foreground/90">
                                            {
                                              item.label
                                            }
                                          </p>

                                          {item.disabled && (
                                            <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#6f5df4]/75">
                                              Soon
                                            </span>
                                          )}
                                        </div>

                                        <p className="mt-0.5 truncate text-[11px] text-muted-foreground/65">
                                          {
                                            item.description
                                          }
                                        </p>
                                      </div>

                                      {!item.disabled &&
                                        (item.external ? (
                                          <ArrowUpRight
                                            size={
                                              13
                                            }
                                            className={`transition ${
                                              active
                                                ? 'text-[#6f5df4]/70'
                                                : 'text-muted-foreground/40'
                                            }`}
                                          />
                                        ) : (
                                          <span
                                            className={`text-[9px] transition ${
                                              active
                                                ? 'text-[#6f5df4]/65'
                                                : 'text-muted-foreground/35'
                                            }`}
                                          >
                                            ↵
                                          </span>
                                        ))}
                                    </button>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        );
                      },
                    )
                  ) : (
                    <div className="px-5 py-14 text-center">
                      <p className="font-serif text-xl text-foreground/75">
                        Nothing there.
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground/65">
                        Try a project,
                        technology, or section
                        name.
                      </p>
                    </div>
                  )}
                </div>

                {/* footer */}

                <div className="flex items-center justify-between border-t border-foreground/[0.065] bg-[#6f5df4]/[0.018] px-5 py-3">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                    Naily Ashvitha · Portfolio
                  </p>

                  <div className="hidden items-center gap-3 text-[8px] text-muted-foreground/50 sm:flex">
                    <span>
                      ↑↓ Navigate
                    </span>
                    <span>↵ Open</span>
                    <span>Esc Close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}