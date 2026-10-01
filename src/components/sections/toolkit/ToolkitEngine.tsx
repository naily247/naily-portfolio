'use client';

import { Canvas } from '@react-three/fiber';
import {
  useEffect,
  useState,
} from 'react';

import {
  ToolkitEngineScene,
  type ToolkitEngineLayerId,
} from './ToolkitEngineScene';

import { ToolkitTechGroups } from './ToolkitTechGroups';
import { getTechnologyVisual } from './toolkit.visuals';

/* ================================================== */
/* TECHNOLOGY DEPLOYMENT DATA                         */
/* ================================================== */

type EngineTechnology = {
  name: string;
  primary?: boolean;
};

const engineTechnologies: Record<
  ToolkitEngineLayerId,
  EngineTechnology[]
> = {
  interface: [
    {
      name: 'React',
      primary: true,
    },
    {
      name: 'Next.js',
      primary: true,
    },
    {
      name: 'TypeScript',
      primary: true,
    },
    {
      name: 'Tailwind CSS',
    },
    {
      name: 'React Native',
    },
    {
      name: 'Expo',
    },
    {
      name: 'React Hook Form',
    },
    {
      name: 'Vite',
    },
    {
      name: 'Figma',
    },
  ],

  application: [
    {
      name: 'Node.js',
      primary: true,
    },
    {
      name: 'Express',
      primary: true,
    },
    {
      name: 'REST APIs',
      primary: true,
    },
    {
      name: 'JWT',
    },
    {
      name: 'Zod',
    },
    {
      name: 'Java',
    },
  ],

  data: [
    {
      name: 'PostgreSQL',
      primary: true,
    },
    {
      name: 'MongoDB',
      primary: true,
    },
    {
      name: 'Prisma',
      primary: true,
    },
    {
      name: 'Mongoose',
    },
    {
      name: 'SQL',
    },
    {
      name: 'Cloudinary',
    },
    {
      name: 'Stripe',
    },
  ],

  workflow: [
    {
      name: 'Git',
      primary: true,
    },
    {
      name: 'GitHub',
      primary: true,
    },
    {
      name: 'Docker',
      primary: true,
    },
    {
      name: 'Postman',
    },
    {
      name: 'Vercel',
    },
  ],
};

/* ================================================== */
/* LOCAL TECHNOLOGY DEPLOYMENT SYSTEM                 */
/* ================================================== */

/*
 * Each technology family now belongs to one CG object.
 *
 * The anchor is the approximate centre of that object's
 * visible architecture in the shared ToolkitEngine canvas.
 *
 * RESTING:
 * Cards sit close to / partially inside their parent CG.
 *
 * ACTIVE:
 * Cards deploy locally around that SAME object.
 *
 * This prevents Application tools from wandering into
 * Workflow/Data territory and makes the relationship
 * between architecture + technology immediately readable.
 */

type DeploymentPosition = {
  x: number;
  y: number;
  rotate: number;
};

type LayerDeployment = {
  anchor: {
    left: string;
    top: string;
  };
  positions: DeploymentPosition[];
};

const layerDeployments: Record<
  ToolkitEngineLayerId,
  LayerDeployment
> = {
  /* -------------------------------------------------- */
  /* INTERFACE                                          */
  /* -------------------------------------------------- */

  interface: {
    anchor: {
      left: '39%',
      top: '27%',
    },

    positions: [
      {
        x: -190,
        y: -92,
        rotate: -3,
      },
      {
        x: -28,
        y: -126,
        rotate: 2,
      },
      {
        x: 150,
        y: -82,
        rotate: 3,
      },
      {
        x: -220,
        y: 8,
        rotate: -2,
      },
      {
        x: 184,
        y: 8,
        rotate: 2,
      },
      {
        x: -174,
        y: 96,
        rotate: 2,
      },
      {
        x: 18,
        y: 118,
        rotate: -2,
      },
      {
        x: 184,
        y: 94,
        rotate: 2,
      },
      {
        x: 34,
        y: -18,
        rotate: -1,
      },
    ],
  },

  /* -------------------------------------------------- */
  /* APPLICATION                                        */
  /* -------------------------------------------------- */

  application: {
    anchor: {
      left: '61%',
      top: '43%',
    },

    positions: [
      {
        x: -142,
        y: -122,
        rotate: -3,
      },
      {
        x: 48,
        y: -132,
        rotate: 2,
      },
      {
        x: 180,
        y: -38,
        rotate: 3,
      },
      {
        x: 156,
        y: 100,
        rotate: -2,
      },
      {
        x: -4,
        y: 134,
        rotate: 2,
      },
      {
        x: -174,
        y: 78,
        rotate: -2,
      },
    ],
  },

  /* -------------------------------------------------- */
  /* DATA & SERVICES                                    */
  /* -------------------------------------------------- */

  data: {
    anchor: {
      left: '59%',
      top: '72%',
    },

    positions: [
      {
        x: -158,
        y: -92,
        rotate: -2,
      },
      {
        x: 16,
        y: -118,
        rotate: 2,
      },
      {
        x: 166,
        y: -76,
        rotate: 3,
      },
      {
        x: 186,
        y: 36,
        rotate: -2,
      },
      {
        x: 76,
        y: 112,
        rotate: 2,
      },
      {
        x: -96,
        y: 112,
        rotate: -3,
      },
      {
        x: -190,
        y: 28,
        rotate: 1,
      },
    ],
  },

  /* -------------------------------------------------- */
  /* WORKFLOW                                           */
  /* -------------------------------------------------- */

  workflow: {
    anchor: {
      left: '36%',
      top: '62%',
    },

    positions: [
      {
        x: -166,
        y: -78,
        rotate: -3,
      },
      {
        x: 4,
        y: -112,
        rotate: 2,
      },
      {
        x: 166,
        y: -52,
        rotate: 3,
      },
      {
        x: -132,
        y: 92,
        rotate: -2,
      },
      {
        x: 108,
        y: 102,
        rotate: 2,
      },
    ],
  },
};

/* ================================================== */
/* TECHNOLOGY CARD                                    */
/* ================================================== */

function TechnologyCard({
  technology,
  index,
  position,
  active,
}: {
  technology: EngineTechnology;
  index: number;
  position: DeploymentPosition;
  active: boolean;
}) {
  const visual =
    getTechnologyVisual(
      technology.name,
    );

  const TechnologyIcon =
    visual.icon;

  /*
   * RESTING STATE
   *
   * Keep the card close to the parent architecture.
   * It should be visible enough to tempt interaction,
   * but not compete with the four capability labels.
   */

  const restingX =
    position.x * 0.17;

  const restingY =
    position.y * 0.14;

  const restingScale =
    technology.primary
      ? 0.72
      : 0.66;

  const restingOpacity =
    technology.primary
      ? 0.25
      : 0.13;

  /*
   * ACTIVE STATE
   *
   * Every card becomes clearly readable.
   * Primary tools remain slightly stronger, but
   * supporting technologies no longer disappear.
   */

  const activeOpacity =
    technology.primary
      ? 1
      : 0.94;

  return (
    <div
      className={[
  'pointer-events-none absolute',
  'left-0 top-0',
  '-translate-x-1/2 -translate-y-1/2',
  'transition-[transform,opacity,filter]',
  'ease-[cubic-bezier(0.22,1,0.36,1)]',
  active
    ? 'z-[70] duration-700'
    : technology.primary
      ? 'z-30 duration-500'
      : 'z-20 duration-500',
].join(' ')}
      style={{
        transform: active
          ? [
              'translate(-50%, -50%)',
              `translate3d(${position.x}px, ${position.y}px, 0)`,
              `rotate(${position.rotate}deg)`,
              'scale(1)',
            ].join(' ')
          : [
              'translate(-50%, -50%)',
              `translate3d(${restingX}px, ${restingY}px, 0)`,
              `rotate(${position.rotate * 0.12}deg)`,
              `scale(${restingScale})`,
            ].join(' '),

        opacity: active
          ? activeOpacity
          : restingOpacity,

        filter: active
          ? 'blur(0px)'
          : 'blur(0px)',

        transitionDelay: active
          ? `${index * 55}ms`
          : `${index * 18}ms`,
      }}
    >
      <div
className={[
  'group/card relative isolate overflow-hidden',
  'flex h-[62px] min-w-[154px] items-center gap-3',
  'border border-soft-violet/[0.22]',
  'px-3.5',
  'transition-[transform,box-shadow,backdrop-filter]',
  'duration-300',
  active
  ? [
      'pointer-events-auto',
      'bg-background',
      'backdrop-blur-[22px]',
      'shadow-[0_18px_46px_rgba(65,48,120,0.16)]',
      'hover:-translate-y-1.5',
      'hover:shadow-[0_22px_54px_rgba(65,48,120,0.19)]',
    ].join(' ')
  : [
      'bg-background/72',
      'backdrop-blur-[10px]',
      'shadow-[0_8px_24px_rgba(65,48,120,0.05)]',
    ].join(' '),
].join(' ')}
      >

        {/* ACTIVE GLASS DEPTH */}
<span
  aria-hidden="true"
  className={[
    'pointer-events-none absolute inset-[1px]',
    'transition-opacity duration-500',
    active
      ? 'opacity-100'
      : 'opacity-0',
  ].join(' ')}
>
  <span className="absolute inset-x-3 top-0 h-px bg-white/55" />

  <span className="absolute bottom-2 right-2 h-5 w-5 border-b border-r border-soft-violet/[0.16]" />
</span>

        {/* -------------------------------------------- */}
        {/* SYSTEM INDEX                                 */}
        {/* -------------------------------------------- */}

        <span
          className={[
            'absolute right-2.5 top-1.5',
            'font-mono text-[5px]',
            'tracking-[0.16em]',
            'text-muted-foreground/30',
          ].join(' ')}
        >
          {String(index + 1).padStart(
            2,
            '0',
          )}
        </span>

        {/* -------------------------------------------- */}
        {/* ICON                                         */}
        {/* -------------------------------------------- */}

        <div
          className={[
            'relative flex h-9 w-9 shrink-0',
            'items-center justify-center',
            'rounded-lg',
            'border border-soft-violet/[0.16]',
            'bg-white/20',
            'transition-transform duration-300',
            active
              ? 'group-hover/card:scale-[1.08]'
              : '',
          ].join(' ')}
        >
<TechnologyIcon
  className={[
    'relative transition-[width,height,transform] duration-300',
    active
      ? 'h-[21px] w-[21px]'
      : 'h-[19px] w-[19px]',
  ].join(' ')}
            style={{
              color: visual.color,

              filter: active
                ? `drop-shadow(0 0 6px ${visual.color}40)`
                : undefined,
            }}
          />
        </div>

        {/* -------------------------------------------- */}
        {/* TECHNOLOGY IDENTITY                          */}
        {/* -------------------------------------------- */}

        <div className="min-w-0 pr-3">
          <p
            className={[
              'whitespace-nowrap',
              active
  ? 'text-[11px] font-semibold'
  : 'text-[10px] font-semibold',
              'tracking-[-0.01em]',
              'text-foreground/90',
            ].join(' ')}
          >
            {technology.name}
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-soft-violet/65" />

            <span
              className={[
                'font-mono text-[5px]',
                'uppercase tracking-[0.16em]',
                'text-muted-foreground/45',
              ].join(' ')}
            >
              {technology.primary
                ? 'active tool'
                : 'supporting'}
            </span>
          </div>
        </div>

        {/* -------------------------------------------- */}
        {/* ACTIVE SYSTEM EDGE                           */}
        {/* -------------------------------------------- */}

        <span
          className={[
            'absolute bottom-0 left-0 h-px',
            'bg-soft-violet/55',
            'transition-[width,opacity]',
            'duration-500',
            active
              ? 'w-full opacity-100'
              : 'w-8 opacity-30',
          ].join(' ')}
        />

        {/* -------------------------------------------- */}
        {/* CONNECTION TERMINAL                          */}
        {/* -------------------------------------------- */}

        <span
          className={[
            'absolute -left-[3px] top-1/2',
            'h-[5px] w-[5px]',
            '-translate-y-1/2',
            'rounded-full bg-soft-violet',
            'transition-opacity duration-300',
            active
              ? 'opacity-65'
              : 'opacity-15',
          ].join(' ')}
        />
      </div>
    </div>
  );
}

/* ================================================== */
/* LOCAL LAYER DEPLOYMENT                             */
/* ================================================== */

function LayerTechnologyDeployment({
  layer,
  active,
  anotherLayerActive,
}: {
  layer: ToolkitEngineLayerId;
  active: boolean;
  anotherLayerActive: boolean;
}) {
  const deployment =
    layerDeployments[layer];

  const technologies =
    engineTechnologies[layer];

  return (
<div
  className={[
    'absolute',
    'transition-[opacity,filter] duration-500',
    anotherLayerActive && !active
      ? 'opacity-35 blur-[0.7px]'
      : 'opacity-100 blur-0',
  ].join(' ')}
  style={{
    left: deployment.anchor.left,
    top: deployment.anchor.top,
  }}
>
      {/* ---------------------------------------------- */}
      {/* QUIET CORE SIGNAL                              */}
      {/* ---------------------------------------------- */}

      <span
        className={[
          'absolute left-0 top-0',
          'h-2 w-2',
          '-translate-x-1/2 -translate-y-1/2',
          'rounded-full',
          'bg-soft-violet',
          'transition-[opacity,transform]',
          'duration-500',
          active
            ? 'scale-125 opacity-55'
            : 'scale-75 opacity-15',
        ].join(' ')}
      />

      {/* ---------------------------------------------- */}
      {/* TECHNOLOGY CARDS                               */}
      {/* ---------------------------------------------- */}

      {technologies.map(
        (technology, index) => {
          const position =
            deployment.positions[index];

          if (!position) {
            return null;
          }

          return (
            <TechnologyCard
              key={`${layer}-${technology.name}`}
              technology={technology}
              index={index}
              position={position}
              active={active}
            />
          );
        },
      )}
    </div>
  );
}

/* ================================================== */
/* TECHNOLOGY DEPLOYMENT OVERLAY                      */
/* ================================================== */

function TechnologyDeployment({
  activeLayer,
}: {
  activeLayer: ToolkitEngineLayerId | null;
}) {
  const layers: ToolkitEngineLayerId[] = [
    'interface',
    'application',
    'data',
    'workflow',
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-[1%_12%_1%] z-20 hidden lg:block"
    >
{layers.map((layer) => (
  <LayerTechnologyDeployment
    key={layer}
    layer={layer}
    active={activeLayer === layer}
    anotherLayerActive={
      activeLayer !== null
    }
  />
))}
    </div>
  );
}

/* ================================================== */
/* TOOLKIT ENGINE                                     */
/* ================================================== */

export function ToolkitEngine() {
  const [
    activeLayer,
    setActiveLayer,
  ] =
    useState<ToolkitEngineLayerId | null>(
      null,
    );

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  useEffect(() => {
    const query =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

    const update = () => {
      setReducedMotion(
        query.matches,
      );
    };

    update();

    query.addEventListener(
      'change',
      update,
    );

    return () => {
      query.removeEventListener(
        'change',
        update,
      );
    };
  }, []);

  return (
    <div className="relative h-[760px] w-full overflow-hidden lg:h-[820px]">
      {/* ============================================== */}
      {/* THREE.JS / CG SYSTEM                           */}
      {/* ============================================== */}

      <div className="absolute inset-[1%_12%_1%] z-10">
        <Canvas
          dpr={[1, 1.5]}
          camera={{
            position: [
              0,
              0,
              6.2,
            ],
            fov: 38,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference:
              'high-performance',
          }}
          style={{
            position:
              'absolute',
            inset: 0,
            background:
              'transparent',
          }}
        >
          <ToolkitEngineScene
            activeLayer={
              activeLayer
            }
            reducedMotion={
              reducedMotion
            }
          />
        </Canvas>
      </div>

      {/* ============================================== */}
      {/* DOM TECHNOLOGY DEPLOYMENT                      */}
      {/* ============================================== */}

      <TechnologyDeployment
        activeLayer={activeLayer}
      />

      {/* ============================================== */}
      {/* READABLE DOM CAPABILITY SYSTEM                 */}
      {/* ============================================== */}

      <ToolkitTechGroups
        activeLayer={activeLayer}
        onLayerChange={
          setActiveLayer
        }
      />
    </div>
  );
}