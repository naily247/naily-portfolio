'use client';

import Link from 'next/link';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';
import { motion } from 'motion/react';
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';

import { Container } from '@/components/ui/container';
import {
  navigation,
  siteConfig,
} from '@/data/site';

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type PointerState = {
  x: number;
  y: number;
};

type SceneProps = {
  pointer: PointerState;
  activeTarget: number;
  engaged: boolean;
};

/* -------------------------------------------------------------------------- */
/* FIBRE ROUTE                                                                */
/* -------------------------------------------------------------------------- */

function FibreRoute({
  start,
  end,
  bend,
  z,
  active,
  phase,
  variant,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  bend: number;
  z: number;
  active: boolean;
  phase: number;
  variant: 'violet' | 'blue';
}) {
  const packetARef =
    useRef<THREE.Mesh>(null);

  const packetBRef =
    useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const middleX =
      (start.x + end.x) / 2;

    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(
        start.x,
        start.y,
        z,
      ),

      new THREE.Vector3(
        middleX -
          Math.abs(
            end.x - start.x,
          ) *
            0.22,
        start.y + bend,
        z + 0.04,
      ),

      new THREE.Vector3(
        middleX +
          Math.abs(
            end.x - start.x,
          ) *
            0.18,
        end.y - bend * 0.6,
        z - 0.015,
      ),

      new THREE.Vector3(
        end.x,
        end.y,
        z,
      ),
    ]);
  }, [
    start,
    end,
    bend,
    z,
  ]);

  const tubeGeometry =
    useMemo(
      () =>
        new THREE.TubeGeometry(
          curve,
          80,
          active
            ? 0.0065
            : 0.004,
          5,
          false,
        ),
      [curve, active],
    );

  useEffect(() => {
    return () => {
      tubeGeometry.dispose();
    };
  }, [tubeGeometry]);

  useFrame((state) => {
    const time =
      state.clock.elapsedTime;

    if (packetARef.current) {
      const progress =
        (time *
          (active
            ? 0.16
            : 0.075) +
          phase) %
        1;

      packetARef.current.position.copy(
        curve.getPoint(progress),
      );

      const pulse =
        0.82 +
        Math.sin(time * 5) *
          0.14;

      packetARef.current.scale.setScalar(
        pulse *
          (active ? 1.35 : 0.82),
      );
    }

    if (packetBRef.current) {
      const progress =
        (time *
          (active
            ? 0.115
            : 0.052) +
          phase +
          0.48) %
        1;

      packetBRef.current.position.copy(
        curve.getPoint(progress),
      );
    }
  });

  const color =
    variant === 'violet'
      ? '#8f7cf7'
      : '#8fcfff';

  return (
    <group>
      {/* FIBRE */}

      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={
            active ? 0.38 : 0.105
          }
          depthWrite={false}
        />
      </mesh>

      {/* PRIMARY PACKET */}

      <mesh ref={packetARef}>
        <sphereGeometry
          args={[0.022, 10, 10]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={
            active ? 1 : 0.66
          }
          depthWrite={false}
        />
      </mesh>

      {/* SECONDARY PACKET */}

      <mesh ref={packetBRef}>
        <sphereGeometry
          args={[0.012, 8, 8]}
        />

        <meshBasicMaterial
          color={
            variant === 'violet'
              ? '#c9c0ff'
              : '#c5e7ff'
          }
          transparent
          opacity={
            active ? 0.8 : 0.38
          }
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* DEPTH NODE                                                                 */
/* -------------------------------------------------------------------------- */

function DepthNode({
  position,
  active = false,
  size = 0.025,
  blue = false,
}: {
  position: THREE.Vector3;
  active?: boolean;
  size?: number;
  blue?: boolean;
}) {
  const ref =
    useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const pulse =
      1 +
      Math.sin(
        state.clock.elapsedTime *
          2.3 +
          position.x,
      ) *
        0.12;

    ref.current.scale.setScalar(
      pulse *
        (active ? 1.35 : 1),
    );
  });

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <sphereGeometry
        args={[size, 10, 10]}
      />

      <meshBasicMaterial
        color={
          blue
            ? '#8fcfff'
            : '#927eff'
        }
        transparent
        opacity={
          active ? 0.95 : 0.34
        }
        depthWrite={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* CONTACT RECEIVER                                                           */
/* -------------------------------------------------------------------------- */

function Receiver({
  position,
  active,
}: {
  position: THREE.Vector3;
  active: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const ringRef =
    useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !ringRef.current
    ) {
      return;
    }

    ringRef.current.rotation.z +=
      delta *
      (active ? 0.8 : 0.2);

    const targetScale = active
      ? 1.24
      : 1;

    groupRef.current.scale.x =
      THREE.MathUtils.damp(
        groupRef.current.scale.x,
        targetScale,
        5,
        delta,
      );

    groupRef.current.scale.y =
      THREE.MathUtils.damp(
        groupRef.current.scale.y,
        targetScale,
        5,
        delta,
      );

    groupRef.current.scale.z =
      THREE.MathUtils.damp(
        groupRef.current.scale.z,
        targetScale,
        5,
        delta,
      );
  });

  return (
    <group
      ref={groupRef}
      position={position}
    >
      <mesh ref={ringRef}>
        <torusGeometry
          args={[
            0.095,
            0.005,
            8,
            36,
          ]}
        />

        <meshBasicMaterial
          color="#8f7cf7"
          transparent
          opacity={
            active ? 0.72 : 0.2
          }
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[0.026, 12, 12]}
        />

        <meshStandardMaterial
          color="#8f7cf7"
          emissive="#8f7cf7"
          emissiveIntensity={
            active ? 3 : 1.4
          }
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* THREE.JS HEADER FIELD                                                      */
/* -------------------------------------------------------------------------- */

function HeaderField({
  pointer,
  activeTarget,
  engaged,
}: SceneProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const { viewport } =
    useThree();

  const left =
    -viewport.width / 2;

  const right =
    viewport.width / 2;

  const corePosition = useMemo(
    () =>
      new THREE.Vector3(
        left + 0.43,
        0,
        0.18,
      ),
    [left],
  );

  const receiverPosition =
    useMemo(
      () =>
        new THREE.Vector3(
          right - 0.42,
          0,
          0.12,
        ),
      [right],
    );

  const navPositions =
    useMemo(() => {
      const spread =
        Math.min(
          viewport.width * 0.095,
          0.88,
        );

      return [
        new THREE.Vector3(
          -spread * 1.5,
          0.02,
          0.05,
        ),
        new THREE.Vector3(
          -spread * 0.5,
          -0.055,
          0.09,
        ),
        new THREE.Vector3(
          spread * 0.5,
          0.045,
          0.02,
        ),
        new THREE.Vector3(
          spread * 1.5,
          -0.025,
          0.075,
        ),
      ];
    }, [viewport.width]);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.position.x =
      THREE.MathUtils.damp(
        groupRef.current.position.x,
        pointer.x * 0.07,
        3.5,
        delta,
      );

    groupRef.current.position.y =
      THREE.MathUtils.damp(
        groupRef.current.position.y,
        pointer.y * 0.035,
        3.5,
        delta,
      );

    groupRef.current.rotation.y =
      THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        pointer.x * 0.018,
        3.5,
        delta,
      );

    groupRef.current.rotation.x =
      THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -pointer.y * 0.012,
        3.5,
        delta,
      );

    state.camera.position.x =
      THREE.MathUtils.damp(
        state.camera.position.x,
        pointer.x * 0.035,
        3,
        delta,
      );

    state.camera.position.y =
      THREE.MathUtils.damp(
        state.camera.position.y,
        pointer.y * 0.018,
        3,
        delta,
      );

    state.camera.lookAt(0, 0, 0);
  });

  const allPoints = [
    corePosition,
    ...navPositions,
    receiverPosition,
  ];

  return (
    <>
      <ambientLight
        intensity={1.2}
      />

      <pointLight
        position={[
          -2.6,
          1.4,
          2.8,
        ]}
        color="#9d88ff"
        intensity={7}
        distance={8}
      />

      <pointLight
        position={[
          2.8,
          -0.8,
          2.5,
        ]}
        color="#86caff"
        intensity={4.5}
        distance={7}
      />

      <group ref={groupRef}>
          {/* SIGNAL ORIGIN */}

        <DepthNode
          position={corePosition}
          active={engaged}
          size={0.018}
        />

        {/* MAIN ARCHITECTURE ROUTE */}

        {allPoints
          .slice(0, -1)
          .map(
            (
              point,
              index,
            ) => (
              <FibreRoute
                key={`main-${index}`}
                start={point}
                end={
                  allPoints[
                    index + 1
                  ]
                }
                bend={
                  index % 2 === 0
                    ? 0.09
                    : -0.075
                }
                z={0.015}
                active={
                  activeTarget ===
                    index + 1 ||
                  activeTarget ===
                    index
                }
                phase={
                  index * 0.14
                }
                variant="violet"
              />
            ),
          )}

        {/* BACKGROUND BLUE FIBRE */}

        <FibreRoute
          start={
            new THREE.Vector3(
              left + 0.55,
              -0.16,
              -0.16,
            )
          }
          end={
            new THREE.Vector3(
              right - 0.62,
              0.17,
              -0.16,
            )
          }
          bend={0.22}
          z={-0.16}
          active={
            activeTarget === 5
          }
          phase={0.32}
          variant="blue"
        />

        {/* LOWER VIOLET FIBRE */}

        <FibreRoute
          start={
            new THREE.Vector3(
              left + 1.45,
              0.18,
              -0.11,
            )
          }
          end={
            new THREE.Vector3(
              right - 1.55,
              -0.18,
              -0.11,
            )
          }
          bend={-0.2}
          z={-0.11}
          active={
            activeTarget > 0
          }
          phase={0.72}
          variant="violet"
        />

        {/* NAV DEPTH ANCHORS */}

        {navPositions.map(
          (position, index) => (
            <DepthNode
              key={`node-${index}`}
              position={position}
              active={
                activeTarget ===
                index + 1
              }
              size={
                index % 2 === 0
                  ? 0.025
                  : 0.02
              }
              blue={index === 2}
            />
          ),
        )}

        {/* QUIET DEPTH GLINTS */}

        <DepthNode
          position={
            new THREE.Vector3(
              -viewport.width *
                0.34,
              -0.2,
              -0.2,
            )
          }
          size={0.013}
          blue
        />

        <DepthNode
          position={
            new THREE.Vector3(
              viewport.width *
                0.29,
              0.19,
              -0.18,
            )
          }
          size={0.011}
        />

        <DepthNode
          position={
            new THREE.Vector3(
              viewport.width *
                0.39,
              -0.12,
              -0.22,
            )
          }
          size={0.008}
          blue
        />

        {/* CONTACT RECEIVER */}

        <Receiver
          position={
            receiverPosition
          }
          active={
            activeTarget === 5
          }
        />
      </group>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* SITE HEADER                                                                */
/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  const [pointer, setPointer] =
    useState<PointerState>({
      x: 0,
      y: 0,
    });

  const [engaged, setEngaged] =
    useState(false);

  const [
    activeTarget,
    setActiveTarget,
  ] = useState(0);

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  useEffect(() => {
    const query =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

    const update = () =>
      setReducedMotion(
        query.matches,
      );

    update();

    query.addEventListener(
      'change',
      update,
    );

    return () =>
      query.removeEventListener(
        'change',
        update,
      );
  }, []);

  const handleSectionNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIndex =
      href.indexOf('#');

    if (hashIndex === -1) {
      return;
    }

    const hash =
      href.slice(hashIndex);

    const target =
      document.querySelector(hash);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    window.history.replaceState(
      null,
      '',
      window.location.pathname,
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX -
        rect.left) /
        rect.width) *
        2 -
      1;

    const y =
      -(
        ((event.clientY -
          rect.top) /
          rect.height) *
          2 -
        1
      );

    setPointer({
      x: THREE.MathUtils.clamp(
        x,
        -1,
        1,
      ),
      y: THREE.MathUtils.clamp(
        y,
        -1,
        1,
      ),
    });
  };

  const resetHeader = () => {
    setPointer({
      x: 0,
      y: 0,
    });

    setEngaged(false);
    setActiveTarget(0);
  };

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      onPointerEnter={() =>
        setEngaged(true)
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        resetHeader
      }
      className="fixed inset-x-0 top-0 z-50 h-[72px] overflow-hidden border-b border-foreground/[0.07] bg-soft-lavender/78 backdrop-blur-2xl"
    >
      {/* ================================================================ */}
      {/* ATMOSPHERIC OPTICAL BASE                                         */}
      {/* ================================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* LEFT VIOLET LIGHT */}

        <div className="absolute -left-12 top-1/2 h-[90px] w-[330px] -translate-y-1/2 rounded-full bg-soft-violet/[0.095] blur-[38px]" />

        {/* CENTRAL LAVENDER LIGHT */}

        <div className="absolute left-1/2 top-1/2 h-[66px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.13] blur-[26px]" />

        {/* RIGHT BLUE LIGHT */}

        <div className="absolute -right-8 top-1/2 h-[86px] w-[310px] -translate-y-1/2 rounded-full bg-cool-blue/[0.07] blur-[40px]" />

        {/* TOP GLASS EDGE */}

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        {/* BOTTOM SPECTRAL EDGE */}

        <div className="absolute inset-x-[4%] bottom-0 h-px bg-gradient-to-r from-transparent via-soft-violet/[0.28] via-55% to-transparent" />
      </div>

      {/* ================================================================ */}
      {/* LIVE THREE.JS FIELD                                              */}
      {/* ================================================================ */}

      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-100"
        >
          <Canvas
            orthographic
            dpr={[1, 1.5]}
            camera={{
              position: [
                0,
                0,
                5,
              ],
              zoom: 104,
            }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference:
                'high-performance',
            }}
          >
            <Suspense fallback={null}>
              <HeaderField
                pointer={pointer}
                activeTarget={
                  activeTarget
                }
                engaged={engaged}
              />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* ================================================================ */}
      {/* POINTER ILLUMINATION                                             */}
      {/* ================================================================ */}

      <motion.div
        aria-hidden="true"
        animate={{
          left: `${
            ((pointer.x + 1) /
              2) *
            100
          }%`,
          opacity:
            engaged ? 1 : 0,
        }}
        transition={{
          left: {
            type: 'spring',
            stiffness: 65,
            damping: 22,
          },
          opacity: {
            duration: 0.35,
          },
        }}
        className="pointer-events-none absolute top-1/2 z-[2] h-[80px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-soft-violet/[0.075] blur-[30px]"
      />

      {/* ================================================================ */}
      {/* DOM INTERFACE                                                    */}
      {/* ================================================================ */}

      <Container className="relative z-10 flex h-[72px] items-center justify-between">
        {/* -------------------------------------------------------------- */}
        {/* ENTRY                                                          */}
        {/* -------------------------------------------------------------- */}

        <div className="relative flex items-center">
          {/* HELLO TRIGGER */}

          <motion.button
            type="button"
            aria-label="Back to the beginning"
            onPointerEnter={() =>
              setActiveTarget(0)
            }
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });

              window.history.replaceState(
                null,
                '',
                '/',
              );
            }}
            initial="idle"
            whileHover="hover"
            className="group relative z-20 flex h-9 w-[118px] items-center"
          >
            {/* SIGNAL DOT */}

            <span className="relative ml-[3px] flex h-5 w-5 shrink-0 items-center justify-center">
              <motion.span
                variants={{
                  idle: {
                    scale: 1,
                  },
                  hover: {
                    scale: 1.28,
                  },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                }}
                className="absolute h-[5px] w-[5px] rounded-full bg-soft-violet shadow-[0_0_9px_rgba(143,124,247,0.48)]"
              />

              <motion.span
                variants={{
                  idle: {
                    scale: 0.7,
                    opacity: 0,
                  },
                  hover: {
                    scale: 1.55,
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 0.45,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute h-[13px] w-[13px] rounded-full border border-soft-violet/25"
              />

              <motion.span
                variants={{
                  idle: {
                    scale: 0.5,
                    opacity: 0,
                  },
                  hover: {
                    scale: 1,
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 0.5,
                }}
                className="absolute h-7 w-7 rounded-full bg-soft-violet/[0.07] blur-[7px]"
              />
            </span>

            {/* HAND-DRAWN HELLO */}

            <motion.svg
              viewBox="0 0 94 34"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute left-[24px] top-1/2 h-[32px] w-[88px] -translate-y-1/2 overflow-visible"
            >
              {/* h */}

              <motion.path
                d="M3 24 C7 18 10 10 11 4 C11.5 2 11 2 10.5 5 C9.5 11 8.5 18 9 24 C10.5 18 13 14 16 14 C18.5 14 18.5 17 18 20 C17.5 23 18.5 25 21 24"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground/70"
                variants={{
                  idle: {
                    pathLength: 0,
                    opacity: 0,
                  },
                  hover: {
                    pathLength: 1,
                    opacity: 1,
                  },
                }}
                transition={{
                  pathLength: {
                    duration: 0.62,
                    ease: [
                      0.65,
                      0,
                      0.35,
                      1,
                    ],
                  },
                  opacity: {
                    duration: 0.12,
                  },
                }}
              />

              {/* e */}

              <motion.path
                d="M21 20 C25 17 29 17.5 29 20 C29 22 26 23 22 22 C23 26 28 26 32 22"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground/70"
                variants={{
                  idle: {
                    pathLength: 0,
                    opacity: 0,
                  },
                  hover: {
                    pathLength: 1,
                    opacity: 1,
                  },
                }}
                transition={{
                  pathLength: {
                    duration: 0.32,
                    delay: 0.42,
                  },
                  opacity: {
                    duration: 0.1,
                    delay: 0.4,
                  },
                }}
              />

              {/* l l */}

              <motion.path
                d="M32 22 C36 17 38 8 38 4 C38 2 37 3 37 6 C37 13 37 21 40 24 C43 21 45 11 45 5 C45 2.5 44 3 44 6 C44 14 44 22 48 24"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground/70"
                variants={{
                  idle: {
                    pathLength: 0,
                    opacity: 0,
                  },
                  hover: {
                    pathLength: 1,
                    opacity: 1,
                  },
                }}
                transition={{
                  pathLength: {
                    duration: 0.48,
                    delay: 0.63,
                  },
                  opacity: {
                    duration: 0.1,
                    delay: 0.61,
                  },
                }}
              />

              {/* o + exit flourish */}

              <motion.path
                d="M49 20 C51 16 57 16 59 19 C61 22 58 25 54 25 C50 25 49 22 50 20 C52 17 57 18 60 21 C65 26 73 25 82 21 C86 19 89 18 92 19"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-soft-violet"
                variants={{
                  idle: {
                    pathLength: 0,
                    opacity: 0,
                  },
                  hover: {
                    pathLength: 1,
                    opacity: 0.9,
                  },
                }}
                transition={{
                  pathLength: {
                    duration: 0.58,
                    delay: 0.94,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  },
                  opacity: {
                    duration: 0.12,
                    delay: 0.92,
                  },
                }}
              />
            </motion.svg>
          </motion.button>

          {/* ENTRY LABEL */}

          <Link
            href="/"
            onClick={(event) => {
              if (
                window.location.pathname ===
                '/'
              ) {
                event.preventDefault();

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });

                window.history.replaceState(
                  null,
                  '',
                  '/',
                );
              }
            }}
            className="group relative -ml-1 flex flex-col"
          >
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-foreground/75 transition-all duration-500 group-hover:tracking-[0.185em] group-hover:text-foreground">
              MY SIDE OF THE WEB.
            </span>

            <span className="mt-[5px] h-px w-full origin-left scale-x-[0.32] bg-gradient-to-r from-soft-violet/70 via-soft-violet/20 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />
          </Link>
        </div>


        {/* -------------------------------------------------------------- */}
        {/* NAVIGATION                                                     */}
        {/* -------------------------------------------------------------- */}

        <nav
          aria-label="Primary navigation"
          className="hidden items-center md:flex"
        >
          <motion.div
            whileHover={{
              y: -1,
              scale: 1.004,
            }}
            transition={{
              duration: 0.3,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="relative flex items-center gap-1 overflow-hidden rounded-full border border-foreground/[0.07] bg-white/[0.15] p-1 shadow-[0_10px_35px_rgba(69,54,120,0.04)] backdrop-blur-xl"
          >
            {/* MOVING GLASS REFLECTION */}

            <motion.span
              aria-hidden="true"
              animate={{
                x:
                  pointer.x *
                  42,
              }}
              transition={{
                type: 'spring',
                stiffness: 70,
                damping: 22,
              }}
              className="pointer-events-none absolute -top-8 left-1/2 h-16 w-32 -translate-x-1/2 rotate-[-12deg] rounded-full bg-white/[0.17] blur-xl"
            />

            {/* VIOLET OPTICAL FIELD */}

            <motion.span
              aria-hidden="true"
              animate={{
                x:
                  pointer.x *
                  28,
              }}
              transition={{
                type: 'spring',
                stiffness: 75,
                damping: 24,
              }}
              className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-24 -translate-x-1/2 rounded-full bg-soft-violet/[0.12] blur-xl"
            />

            {navigation.map(
              (item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onPointerEnter={() =>
                    setActiveTarget(
                      index + 1,
                    )
                  }
                  onPointerLeave={() =>
                    setActiveTarget(0)
                  }
                  onClick={(event) =>
                    handleSectionNavigation(
                      event,
                      item.href,
                    )
                  }
                  className="group relative rounded-full px-3.5 py-2 text-[12px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {/* PHYSICAL HOVER PLATE */}

                  <span className="absolute inset-0 scale-[0.91] rounded-full border border-transparent bg-white/0 opacity-0 shadow-none transition-all duration-400 group-hover:scale-100 group-hover:border-soft-violet/[0.11] group-hover:bg-white/[0.18] group-hover:opacity-100 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_18px_rgba(119,94,220,0.06)]" />

                  {/* LOCAL ENERGY POOL */}

                  <span className="absolute bottom-0 left-1/2 h-3 w-[70%] -translate-x-1/2 translate-y-1/2 scale-x-0 rounded-full bg-soft-violet/[0.16] opacity-0 blur-[7px] transition-all duration-400 group-hover:scale-x-100 group-hover:opacity-100" />

                  <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-[1px]">
                    {item.label}
                  </span>

                  {/* TINY SIGNAL MARK */}

                  <span className="absolute bottom-[3px] left-1/2 h-[2px] w-[2px] -translate-x-1/2 scale-0 rounded-full bg-soft-violet shadow-[0_0_7px_rgba(143,124,247,0.7)] transition-transform duration-300 group-hover:scale-100" />
                </Link>
              ),
            )}
          </motion.div>
        </nav>

        {/* -------------------------------------------------------------- */}
        {/* CONTACT RECEIVER                                               */}
        {/* -------------------------------------------------------------- */}

        <a
          href={`mailto:${siteConfig.email}`}
          onPointerEnter={() =>
            setActiveTarget(5)
          }
          onPointerLeave={() =>
            setActiveTarget(0)
          }
          className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-foreground/[0.115] bg-white/[0.12] py-2 pl-4 pr-2.5 text-[12px] font-medium text-foreground shadow-[0_8px_28px_rgba(69,54,120,0.035)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-[1px] hover:border-soft-violet/35 hover:bg-white/[0.21] hover:shadow-[0_10px_28px_rgba(109,84,205,0.07)]"
        >
          {/* VIOLET RECEIVER GLOW */}

          <span className="pointer-events-none absolute -right-4 top-1/2 h-14 w-20 -translate-y-1/2 rounded-full bg-soft-violet/[0.09] blur-xl transition-all duration-500 group-hover:scale-125 group-hover:bg-soft-violet/[0.18]" />

          {/* COOL BLUE RESPONSE */}

          <span className="pointer-events-none absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 scale-75 rounded-full bg-cool-blue/[0.08] opacity-0 blur-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

          <span className="relative z-10">
            Let&apos;s talk
          </span>

          <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-soft-violet/25 bg-soft-violet/[0.07] transition-all duration-500 group-hover:rotate-[12deg] group-hover:border-soft-violet/45 group-hover:bg-soft-violet/[0.14]">
            <span className="absolute h-[16px] w-[16px] rounded-full border border-soft-violet/[0.12] transition-all duration-500 group-hover:scale-125 group-hover:border-soft-violet/25" />

            <span className="absolute h-[9px] w-[9px] rounded-full border border-cool-blue/[0.1] transition-all duration-700 group-hover:-rotate-45 group-hover:scale-150 group-hover:border-cool-blue/25" />

            <span className="h-[4px] w-[4px] rounded-full bg-soft-violet shadow-[0_0_10px_rgba(143,124,247,0.5)] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_16px_rgba(143,124,247,0.85)]" />
          </span>
        </a>
      </Container>
    </motion.header>
  );
}