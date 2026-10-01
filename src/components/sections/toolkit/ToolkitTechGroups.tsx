'use client';

import type {
  ToolkitEngineLayerId,
} from './ToolkitEngineScene';

type ToolkitTechGroupsProps = {
  activeLayer: ToolkitEngineLayerId | null;
  onLayerChange: (
    layer: ToolkitEngineLayerId | null,
  ) => void;
};

const capabilityGroups: Array<{
  id: ToolkitEngineLayerId;
  number: string;
  label: string;
  description: string;
  technologies: string[];
}> = [
  {
    id: 'interface',
    number: '01',
    label: 'Interface',
    description:
      'Product surfaces, responsive experiences, and interaction systems.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'React Native',
      'Expo',
      'React Hook Form',
      'Vite',
      'Figma',
    ],
  },
  {
    id: 'application',
    number: '02',
    label: 'Application',
    description:
      'Application logic, APIs, validation, and service orchestration.',
    technologies: [
      'Node.js',
      'Express',
      'REST APIs',
      'JWT',
      'Zod',
      'Java',
    ],
  },
  {
    id: 'data',
    number: '03',
    label: 'Data & Services',
    description:
      'Persistence, data modelling, storage, payments, and external services.',
    technologies: [
      'PostgreSQL',
      'MongoDB',
      'Mongoose',
      'Prisma',
      'SQL',
      'Cloudinary',
      'Stripe',
    ],
  },
  {
    id: 'workflow',
    number: '04',
    label: 'Workflow',
    description:
      'Development, delivery, inspection, and deployment workflows.',
    technologies: [
      'Git',
      'GitHub',
      'Docker',
      'Postman',
      'Vercel',
    ],
  },
];

export function ToolkitTechGroups({
  activeLayer,
  onLayerChange,
}: ToolkitTechGroupsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="relative mx-auto h-full w-full max-w-[1500px]">
        {capabilityGroups.map(
          (group, index) => {
            const active =
              activeLayer === group.id;

            const anotherActive =
              activeLayer !== null &&
              !active;

            const positions = [
              'left-[2%] top-[8%]',
              'right-[1%] top-[22%]',
              'right-[3%] bottom-[13%]',
              'left-[3%] bottom-[8%]',
            ];

            return (
              <article
                key={group.id}
className={[
  'pointer-events-auto absolute w-[270px] outline-none',
  'transition-[opacity,transform] duration-500',
                  positions[index],
                  active
                    ? 'scale-[1.025] opacity-100'
                    : anotherActive
                      ? 'opacity-40'
                      : 'opacity-80',
                ].join(' ')}
                onPointerEnter={() =>
                  onLayerChange(group.id)
                }
                onPointerLeave={() =>
                  onLayerChange(null)
                }
                onFocus={() =>
                  onLayerChange(group.id)
                }
                onBlur={() =>
                  onLayerChange(null)
                }
                tabIndex={0}
              >
                <div className="border-t border-soft-violet/25 pt-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-soft-violet/70">
                      {group.number}
                    </span>

                    <span
                      className={[
                        'h-1.5 w-1.5 rounded-full',
                        'bg-soft-violet',
                        'transition-[opacity,transform,box-shadow] duration-500',
                        active
                          ? 'scale-125 opacity-100 shadow-[0_0_12px_rgba(124,108,242,0.5)]'
                          : 'opacity-35',
                      ].join(' ')}
                    />
                  </div>

                  <h3 className="mt-3 font-serif text-[1.7rem] leading-none tracking-[-0.04em] text-foreground">
                    {group.label}
                  </h3>

                  <p className="mt-3 max-w-[245px] text-[11px] leading-[1.65] text-muted-foreground/70">
                    {group.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                    {group.technologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          className={[
                            'text-[10px] font-medium tracking-[0.01em]',
                            'transition-opacity duration-300',
                            active
                              ? 'text-foreground/80'
                              : 'text-foreground/50',
                          ].join(' ')}
                        >
                          {technology}
                        </span>
                      ),
                    )}
                  </div>

                  <div
                    className={[
                      'mt-4 h-px origin-left bg-soft-violet/45',
                      'transition-transform duration-500',
                      active
                        ? 'scale-x-100'
                        : 'scale-x-[0.22]',
                    ].join(' ')}
                  />
                </div>
              </article>
            );
          },
        )}
      </div>
    </div>
  );
}