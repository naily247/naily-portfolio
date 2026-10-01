'use client';

import {
  Html,
  Line,
} from '@react-three/drei';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';
import {
  Suspense,
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';

import {
  getToolkitPrimaryArchitecturePath,
  getToolkitRelatedTechnologyIds,
  toolkitConnections,
  toolkitTechnologies,
} from './toolkit.data';
import { ToolkitConnection } from './ToolkitConnection';
import { ToolkitNode } from './ToolkitNode';
import type {
  ToolkitCategoryId,
  ToolkitFilterId,
} from './toolkit.types';

export type ToolkitSceneNodePosition = {
  x: number;
  y: number;

  labelBounds: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };
};

type ToolkitSceneProps = {
  activeTechnologyId: string | null;
  activeFilter: ToolkitFilterId;
  onTechnologyActivate: (
    technologyId: string,
  ) => void;
  onTechnologyDeactivate: () => void;
  onActiveNodeScreenPositionChange?: (
    technologyId: string,
    position: ToolkitSceneNodePosition,
  ) => void;
};

type ArchitectureSceneProps =
  ToolkitSceneProps;

type RegionConfig = {
  id: ToolkitCategoryId;
  code: string;
  label: string;
  position: [
    number,
    number,
    number,
  ];
  size: [
    number,
    number,
  ];
  rotation: number;
  color: string;
  signal: string;
};

const REGION_CONFIGS: RegionConfig[] =
  [
    {
      id: 'interface',
      code: 'UI',
      label: 'INTERFACE',
      position: [
        -2.75,
        1.72,
        -0.78,
      ],
      size: [4.25, 2.55],
      rotation: -0.035,
      color: '#8f7cf7',
      signal: 'INPUT / VIEW',
    },
    {
      id: 'application',
      code: 'APP',
      label: 'APPLICATION',
      position: [
        2.62,
        1.62,
        -0.74,
      ],
      size: [4.3, 2.65],
      rotation: 0.035,
      color: '#7f73e7',
      signal: 'LOGIC / API',
    },
    {
      id: 'data',
      code: 'DATA',
      label: 'DATA + SERVICES',
      position: [
        2.65,
        -1.78,
        -0.8,
      ],
      size: [4.4, 2.7],
      rotation: -0.025,
      color: '#6d9ee8',
      signal: 'STORE / SERVICE',
    },
    {
      id: 'workflow',
      code: 'OPS',
      label: 'WORKFLOW',
      position: [
        -2.72,
        -1.72,
        -0.82,
      ],
      size: [4.25, 2.65],
      rotation: 0.025,
      color: '#9187cf',
      signal: 'BUILD / SHIP',
    },
  ];

const REGION_DEPTH: Record<
  ToolkitCategoryId,
  number
> = {
  interface: 0.03,
  application: -0.01,
  data: -0.055,
  workflow: -0.095,
};

function categoryMatchesFilter(
  category: ToolkitCategoryId,
  filter: ToolkitFilterId,
) {
  return (
    filter === 'all' ||
    filter === category
  );
}

/* ======================================================== */
/* TECHNICAL FLOOR                                          */
/* ======================================================== */

function TechnicalGrid({
  activeTechnologyId,
}: {
  activeTechnologyId: string | null;
}) {
  const primaryGridRef =
    useRef<THREE.GridHelper>(null);

  const secondaryGridRef =
    useRef<THREE.GridHelper>(null);

  const scanRef =
    useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time =
      state.clock.elapsedTime;

    if (primaryGridRef.current) {
      const material =
        primaryGridRef.current
          .material as THREE.Material;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          activeTechnologyId
            ? 0.075
            : 0.045,
          4,
          delta,
        );
    }

    if (secondaryGridRef.current) {
      secondaryGridRef.current.position.x =
        Math.sin(time * 0.08) *
        0.08;

      secondaryGridRef.current.position.y =
        Math.cos(time * 0.07) *
        0.06;
    }

    if (scanRef.current) {
      scanRef.current.position.y =
        -3.8 +
        ((time * 0.32) % 7.6);

      const material =
        scanRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        activeTechnologyId
          ? 0.055
          : 0.025;
    }
  });

  return (
    <group position={[0, 0, -1.14]}>
      <gridHelper
        ref={primaryGridRef}
        args={[
          12,
          24,
          '#7c6cf2',
          '#7c6cf2',
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <meshBasicMaterial
          attach="material"
          color="#7c6cf2"
          transparent
          opacity={0.045}
          depthWrite={false}
        />
      </gridHelper>

      <gridHelper
        ref={secondaryGridRef}
        args={[
          12,
          12,
          '#6d9ee8',
          '#6d9ee8',
        ]}
        rotation={[
          Math.PI / 2,
          0,
          Math.PI / 4,
        ]}
        position={[0, 0, -0.015]}
      >
        <meshBasicMaterial
          attach="material"
          color="#6d9ee8"
          transparent
          opacity={0.018}
          depthWrite={false}
        />
      </gridHelper>

      <mesh
        ref={scanRef}
        position={[0, -3.8, 0.025]}
      >
        <planeGeometry
          args={[10.5, 0.018]}
        />

        <meshBasicMaterial
          color="#9b8cff"
          transparent
          opacity={0.025}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>
    </group>
  );
}

/* ======================================================== */
/* CATEGORY TERRITORY                                       */
/* ======================================================== */

function CategoryRegion({
  region,
  activeFilter,
  activeTechnologyId,
}: {
  region: RegionConfig;
  activeFilter: ToolkitFilterId;
  activeTechnologyId: string | null;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const plateRef =
    useRef<THREE.Mesh>(null);

  const ringRef =
    useRef<THREE.Mesh>(null);

  const active =
    categoryMatchesFilter(
      region.id,
      activeFilter,
    );

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    const targetZ =
      activeFilter === 'all'
        ? REGION_DEPTH[region.id]
        : active
          ? 0.14
          : -0.34;

    groupRef.current.position.z =
      THREE.MathUtils.damp(
        groupRef.current.position.z,
        region.position[2] +
          targetZ,
        4.5,
        delta,
      );

    const targetScale =
      activeFilter === 'all'
        ? 1
        : active
          ? 1.035
          : 0.965;

    const scale =
      THREE.MathUtils.damp(
        groupRef.current.scale.x,
        targetScale,
        5,
        delta,
      );

    groupRef.current.scale.setScalar(
      scale,
    );

    if (plateRef.current) {
      const material =
        plateRef.current
          .material as THREE.MeshBasicMaterial;

      const targetOpacity =
        activeFilter === 'all'
          ? 0.022
          : active
            ? 0.052
            : 0.008;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          targetOpacity,
          5,
          delta,
        );
    }

    if (ringRef.current) {
      ringRef.current.rotation.z +=
        delta *
        (activeTechnologyId &&
        active
          ? 0.08
          : 0.025);

      const pulse =
        1 +
        Math.sin(
          time * 0.8 +
            region.position[0],
        ) *
          0.018;

      ringRef.current.scale.setScalar(
        pulse,
      );
    }
  });

  const halfWidth =
    region.size[0] / 2;

  const halfHeight =
    region.size[1] / 2;

  const cornerLength = 0.3;

  const corners = [
    [
      [
        -halfWidth,
        halfHeight -
          cornerLength,
        0.02,
      ],
      [
        -halfWidth,
        halfHeight,
        0.02,
      ],
      [
        -halfWidth +
          cornerLength,
        halfHeight,
        0.02,
      ],
    ],
    [
      [
        halfWidth -
          cornerLength,
        halfHeight,
        0.02,
      ],
      [
        halfWidth,
        halfHeight,
        0.02,
      ],
      [
        halfWidth,
        halfHeight -
          cornerLength,
        0.02,
      ],
    ],
    [
      [
        -halfWidth,
        -halfHeight +
          cornerLength,
        0.02,
      ],
      [
        -halfWidth,
        -halfHeight,
        0.02,
      ],
      [
        -halfWidth +
          cornerLength,
        -halfHeight,
        0.02,
      ],
    ],
    [
      [
        halfWidth -
          cornerLength,
        -halfHeight,
        0.02,
      ],
      [
        halfWidth,
        -halfHeight,
        0.02,
      ],
      [
        halfWidth,
        -halfHeight +
          cornerLength,
        0.02,
      ],
    ],
  ] as [
    number,
    number,
    number,
  ][][];

  return (
    <group
      ref={groupRef}
      position={region.position}
      rotation={[
        0,
        0,
        region.rotation,
      ]}
    >
      {/* territory glass */}
      <mesh ref={plateRef}>
        <planeGeometry
          args={[
            region.size[0],
            region.size[1],
          ]}
        />

        <meshBasicMaterial
          color={region.color}
          transparent
          opacity={0.022}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* subtle perimeter */}
      <Line
        points={[
          [
            -halfWidth,
            -halfHeight,
            0.012,
          ],
          [
            halfWidth,
            -halfHeight,
            0.012,
          ],
          [
            halfWidth,
            halfHeight,
            0.012,
          ],
          [
            -halfWidth,
            halfHeight,
            0.012,
          ],
          [
            -halfWidth,
            -halfHeight,
            0.012,
          ],
        ]}
        color={region.color}
        transparent
        opacity={
          activeFilter === 'all'
            ? 0.075
            : active
              ? 0.18
              : 0.025
        }
        lineWidth={
          active ? 0.7 : 0.4
        }
        depthWrite={false}
      />

      {/* technical corners */}
      {corners.map(
        (points, index) => (
          <Line
            key={index}
            points={points}
            color={region.color}
            transparent
            opacity={
              active ? 0.34 : 0.12
            }
            lineWidth={0.8}
            depthWrite={false}
          />
        ),
      )}

      {/* region coordinate */}
      <Html
        transform
        distanceFactor={9}
        position={[
          -halfWidth + 0.18,
          halfHeight - 0.16,
          0.03,
        ]}
        style={{
          pointerEvents: 'none',
        }}
      >
        <div
          className={[
            'flex items-center gap-2 whitespace-nowrap',
            'font-mono text-[7px] uppercase tracking-[0.17em]',
            active
              ? 'text-soft-violet/45'
              : 'text-foreground/15',
          ].join(' ')}
        >
          <span>
            {region.code}
          </span>

          <span className="h-px w-4 bg-current opacity-35" />

          <span>
            {region.signal}
          </span>
        </div>
      </Html>

      {/* small territory oscillator */}
      <mesh
        ref={ringRef}
        position={[
          halfWidth - 0.28,
          -halfHeight + 0.25,
          0.025,
        ]}
        rotation={[
          Math.PI * 0.34,
          Math.PI * 0.18,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.105,
            0.004,
            5,
            32,
          ]}
        />

        <meshBasicMaterial
          color={region.color}
          transparent
          opacity={
            active ? 0.24 : 0.07
          }
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ======================================================== */
/* SYSTEM CORE                                              */
/* ======================================================== */

function SystemCore({
  activeTechnologyId,
}: {
  activeTechnologyId: string | null;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const outerRingRef =
    useRef<THREE.Mesh>(null);

  const middleRingRef =
    useRef<THREE.Mesh>(null);

  const innerRingRef =
    useRef<THREE.Mesh>(null);

  const reactorRef =
    useRef<THREE.Mesh>(null);

  const cageRef =
    useRef<THREE.Mesh>(null);

  const active =
    activeTechnologyId !== null;

  useFrame((state, delta) => {
    const time =
      state.clock.elapsedTime;

    if (groupRef.current) {
      const targetScale =
        active ? 1.16 : 1;

      const scale =
        THREE.MathUtils.damp(
          groupRef.current.scale.x,
          targetScale,
          4.5,
          delta,
        );

      groupRef.current.scale.setScalar(
        scale,
      );

      groupRef.current.position.y =
        THREE.MathUtils.damp(
          groupRef.current.position.y,
          Math.sin(
            time * 0.55,
          ) * 0.025,
          4,
          delta,
        );
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z +=
        delta *
        (active
          ? 0.42
          : 0.095);

      outerRingRef.current.rotation.x +=
        delta * 0.025;
    }

    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -=
        delta *
        (active
          ? 0.58
          : 0.13);

      middleRingRef.current.rotation.y +=
        delta *
        (active
          ? 0.11
          : 0.035);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z +=
        delta *
        (active
          ? 0.76
          : 0.18);
    }

    if (cageRef.current) {
      cageRef.current.rotation.x +=
        delta *
        (active
          ? 0.24
          : 0.055);

      cageRef.current.rotation.y -=
        delta *
        (active
          ? 0.31
          : 0.07);
    }

    if (reactorRef.current) {
      const pulse =
        1 +
        Math.sin(
          time *
            (active
              ? 3.1
              : 1.7),
        ) *
          (active
            ? 0.13
            : 0.055);

      reactorRef.current.scale.setScalar(
        pulse,
      );

      const material =
        reactorRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          active ? 0.98 : 0.72,
          5,
          delta,
        );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0.22]}
    >
      {/* low energy field */}
      <mesh scale={1.15}>
        <sphereGeometry
          args={[0.46, 24, 24]}
        />

        <meshBasicMaterial
          color="#7c6cf2"
          transparent
          opacity={
            active ? 0.045 : 0.02
          }
          depthWrite={false}
          side={THREE.BackSide}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* outer orbital rail */}
      <mesh
        ref={outerRingRef}
        rotation={[
          Math.PI * 0.42,
          Math.PI * 0.12,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.38,
            0.006,
            6,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#6d9ee8"
          transparent
          opacity={
            active ? 0.55 : 0.22
          }
          depthWrite={false}
        />
      </mesh>

      {/* middle orbital rail */}
      <mesh
        ref={middleRingRef}
        rotation={[
          -Math.PI * 0.24,
          Math.PI * 0.48,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.29,
            0.007,
            6,
            56,
          ]}
        />

        <meshBasicMaterial
          color="#9b8cff"
          transparent
          opacity={
            active ? 0.7 : 0.3
          }
          depthWrite={false}
        />
      </mesh>

      {/* inner orbital rail */}
      <mesh
        ref={innerRingRef}
        rotation={[
          Math.PI * 0.16,
          -Math.PI * 0.28,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.205,
            0.005,
            5,
            48,
          ]}
        />

        <meshBasicMaterial
          color="#c3bbff"
          transparent
          opacity={
            active ? 0.7 : 0.24
          }
          depthWrite={false}
        />
      </mesh>

      {/* wireframe computational cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry
          args={[0.155, 1]}
        />

        <meshBasicMaterial
          color="#8f7cf7"
          wireframe
          transparent
          opacity={
            active ? 0.42 : 0.17
          }
          depthWrite={false}
        />
      </mesh>

      {/* reactor */}
      <mesh
        ref={reactorRef}
        scale={1}
      >
        <icosahedronGeometry
          args={[0.075, 2]}
        />

        <meshBasicMaterial
          color="#b7adff"
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* hot core */}
      <mesh>
        <sphereGeometry
          args={[0.025, 12, 12]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ======================================================== */
/* CORE BUS                                                 */
/* ======================================================== */

function CoreBus({
  activeTechnologyId,
}: {
  activeTechnologyId: string | null;
}) {
  const packetRefs =
    useRef<
      Array<THREE.Mesh | null>
    >([]);

  const curves = useMemo(() => {
    const targets = [
      new THREE.Vector3(
        -1.3,
        0.95,
        -0.28,
      ),
      new THREE.Vector3(
        1.35,
        0.92,
        -0.24,
      ),
      new THREE.Vector3(
        1.3,
        -0.98,
        -0.3,
      ),
      new THREE.Vector3(
        -1.35,
        -0.92,
        -0.32,
      ),
    ];

    return targets.map(
      (target, index) => {
        const start =
          new THREE.Vector3(
            0,
            0,
            0.08,
          );

        const control =
          start
            .clone()
            .lerp(target, 0.5);

        control.z +=
          0.16 +
          index * 0.018;

        return new THREE.QuadraticBezierCurve3(
          start,
          control,
          target,
        );
      },
    );
  }, []);

  useFrame((state) => {
    if (!activeTechnologyId) {
      return;
    }

    packetRefs.current.forEach(
      (packet, index) => {
        if (!packet) {
          return;
        }

        const progress =
          (
            state.clock
              .elapsedTime *
              0.16 +
            index * 0.23
          ) %
          1;

        packet.position.copy(
          curves[index].getPointAt(
            progress,
          ),
        );
      },
    );
  });

  return (
    <group>
      {curves.map(
        (curve, index) => (
          <group key={index}>
            <Line
              points={curve.getPoints(
                28,
              )}
              color={
                index % 2 === 0
                  ? '#8f7cf7'
                  : '#6d9ee8'
              }
              transparent
              opacity={
                activeTechnologyId
                  ? 0.16
                  : 0.045
              }
              lineWidth={0.55}
              depthWrite={false}
            />

            {activeTechnologyId && (
              <mesh
                ref={(node) => {
                  packetRefs.current[
                    index
                  ] = node;
                }}
              >
                <sphereGeometry
                  args={[
                    0.018,
                    10,
                    10,
                  ]}
                />

                <meshBasicMaterial
                  color={
                    index % 2 ===
                    0
                      ? '#c4bcff'
                      : '#9dccff'
                  }
                  transparent
                  opacity={0.7}
                  depthWrite={false}
                  blending={
                    THREE.AdditiveBlending
                  }
                />
              </mesh>
            )}
          </group>
        ),
      )}
    </group>
  );
}

/* ======================================================== */
/* AMBIENT SIGNAL FIELD                                     */
/* ======================================================== */

function AmbientSignals({
  activeTechnologyId,
}: {
  activeTechnologyId: string | null;
}) {
  const pointsRef =
    useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 68;

    const positions =
      new Float32Array(
        count * 3,
      );

    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const seedA =
        Math.sin(
          index * 91.37,
        ) *
        43758.5453;

      const seedB =
        Math.sin(
          index * 47.11 +
            2.17,
        ) *
        24634.6345;

      const seedC =
        Math.sin(
          index * 17.73 +
            8.41,
        ) *
        18342.194;

      const randomA =
        seedA -
        Math.floor(seedA);

      const randomB =
        seedB -
        Math.floor(seedB);

      const randomC =
        seedC -
        Math.floor(seedC);

      const angle =
        randomA *
        Math.PI *
        2;

      const radius =
        2.3 +
        randomB * 3.45;

      positions[index * 3] =
        Math.cos(angle) *
        radius;

      positions[
        index * 3 + 1
      ] =
        Math.sin(angle) *
        radius *
        0.62;

      positions[
        index * 3 + 2
      ] =
        -1.05 +
        randomC * 1.25;
    }

    const bufferGeometry =
      new THREE.BufferGeometry();

    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        positions,
        3,
      ),
    );

    return bufferGeometry;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.z +=
      delta *
      (activeTechnologyId
        ? 0.0045
        : 0.002);

    pointsRef.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime *
          0.06,
      ) * 0.015;

    const material =
      pointsRef.current
        .material as THREE.PointsMaterial;

    material.opacity =
      THREE.MathUtils.damp(
        material.opacity,
        activeTechnologyId
          ? 0.3
          : 0.18,
        3,
        delta,
      );
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      position={[0, 0, -0.35]}
    >
      <pointsMaterial
        color="#8f7cf7"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.18}
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </points>
  );
}

/* ======================================================== */
/* DEPTH INFRASTRUCTURE                                     */
/* ======================================================== */

function DepthInfrastructure({
  activeTechnologyId,
}: {
  activeTechnologyId: string | null;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const pillars = useMemo(
    () => [
      [-4.7, 2.6, -0.72, 0.58],
      [4.65, 2.45, -0.8, 0.42],
      [4.78, -2.45, -0.76, 0.7],
      [-4.65, -2.55, -0.82, 0.5],
      [-3.95, 0.05, -0.92, 0.34],
      [4.05, -0.1, -0.9, 0.4],
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.z =
      THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        Math.sin(
          state.clock.elapsedTime *
            0.09,
        ) * 0.0025,
        3,
        delta,
      );
  });

  return (
    <group ref={groupRef}>
      {pillars.map(
        (
          [
            x,
            y,
            z,
            height,
          ],
          index,
        ) => (
          <group
            key={index}
            position={[x, y, z]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  0.018,
                  0.018,
                  height,
                  6,
                ]}
              />

              <meshBasicMaterial
                color={
                  index % 2 === 0
                    ? '#8f7cf7'
                    : '#6d9ee8'
                }
                transparent
                opacity={
                  activeTechnologyId
                    ? 0.16
                    : 0.075
                }
                depthWrite={false}
              />
            </mesh>

            <mesh
              position={[
                0,
                height / 2,
                0,
              ]}
              rotation={[
                Math.PI / 2,
                0,
                0,
              ]}
            >
              <ringGeometry
                args={[
                  0.055,
                  0.06,
                  18,
                ]}
              />

              <meshBasicMaterial
                color={
                  index % 2 === 0
                    ? '#a99cff'
                    : '#8ec1ff'
                }
                transparent
                opacity={
                  activeTechnologyId
                    ? 0.32
                    : 0.12
                }
                depthWrite={false}
                side={
                  THREE.DoubleSide
                }
              />
            </mesh>
          </group>
        ),
      )}
    </group>
  );
}

/* ======================================================== */
/* TELEMETRY                                                */
/* ======================================================== */

function SceneTelemetry({
  activeTechnologyId,
  activeFilter,
}: {
  activeTechnologyId: string | null;
  activeFilter: ToolkitFilterId;
}) {
  return (
    <>
      <Html
        transform
        distanceFactor={10}
        position={[
          -5.05,
          3.05,
          -0.52,
        ]}
        style={{
          pointerEvents: 'none',
        }}
      >
        <div className="w-[150px] font-mono text-[7px] uppercase tracking-[0.15em] text-foreground/25">
          <div className="flex items-center justify-between">
            <span>
              SYS.MAP / 05
            </span>

            <span className="text-soft-violet/50">
              LIVE
            </span>
          </div>

          <div className="mt-1 h-px bg-gradient-to-r from-soft-violet/30 to-transparent" />

          <div className="mt-1.5 flex items-center justify-between text-[6px] text-foreground/18">
            <span>
              X 00.00
            </span>

            <span>
              Y 00.00
            </span>

            <span>
              Z 10.60
            </span>
          </div>
        </div>
      </Html>

      <Html
        transform
        distanceFactor={10}
        position={[
          4.45,
          -3.02,
          -0.52,
        ]}
        style={{
          pointerEvents: 'none',
        }}
      >
        <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[6px] uppercase tracking-[0.16em] text-foreground/20">
          <span
            className={[
              'h-1 w-1 rounded-full',
              activeTechnologyId
                ? 'bg-soft-violet shadow-[0_0_5px_rgba(124,108,242,0.7)]'
                : 'bg-foreground/20',
            ].join(' ')}
          />

          <span>
            {activeTechnologyId
              ? 'TRACE ACTIVE'
              : 'AWAITING INPUT'}
          </span>

          <span className="text-foreground/10">
            /
          </span>

          <span>
            {activeFilter.toUpperCase()}
          </span>
        </div>
      </Html>
    </>
  );
}

/* ======================================================== */
/* CAMERA / WORLD CONTROLLER                                */
/* ======================================================== */

function SceneController({
  activeTechnologyId,
  activeFilter,
}: {
  activeTechnologyId: string | null;
  activeFilter: ToolkitFilterId;
}) {
  const { camera, pointer } =
    useThree();

  const target =
    useMemo(
      () => new THREE.Vector3(),
      [],
    );

  useFrame((_, delta) => {
    let focusX = 0;
    let focusY = 0;

    if (activeTechnologyId) {
      const technology =
        toolkitTechnologies.find(
          (item) =>
            item.id ===
            activeTechnologyId,
        );

      if (technology) {
        focusX =
          technology.position[0] *
          0.055;

        focusY =
          technology.position[1] *
          0.045;
      }
    } else if (
      activeFilter !== 'all'
    ) {
      const region =
        REGION_CONFIGS.find(
          (item) =>
            item.id ===
            activeFilter,
        );

      if (region) {
        focusX =
          region.position[0] *
          0.035;

        focusY =
          region.position[1] *
          0.028;
      }
    }

    target.set(
      focusX +
        pointer.x * 0.055,
      focusY +
        pointer.y * 0.04,
      activeTechnologyId
        ? 10.25
        : 10.6,
    );

    camera.position.x =
      THREE.MathUtils.damp(
        camera.position.x,
        target.x,
        3.5,
        delta,
      );

    camera.position.y =
      THREE.MathUtils.damp(
        camera.position.y,
        target.y,
        3.5,
        delta,
      );

    camera.position.z =
      THREE.MathUtils.damp(
        camera.position.z,
        target.z,
        3.5,
        delta,
      );

    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ======================================================== */
/* ARCHITECTURE WORLD                                       */
/* ======================================================== */

function ArchitectureScene({
  activeTechnologyId,
  activeFilter,
  onTechnologyActivate,
  onTechnologyDeactivate,
  onActiveNodeScreenPositionChange,
}: ArchitectureSceneProps) {
  const rearLayerRef =
    useRef<THREE.Group>(null);

  const architectureRef =
    useRef<THREE.Group>(null);

  const foregroundRef =
    useRef<THREE.Group>(null);

  /*
   * Immediate relationships around the currently
   * active technology.
   *
   * These remain separate from the curated
   * architecture path so local context can still
   * be shown without treating every neighbour as
   * part of the same end-to-end flow.
   */
  const relatedTechnologyIds =
    useMemo(
      () =>
        activeTechnologyId
          ? getToolkitRelatedTechnologyIds(
              activeTechnologyId,
            )
          : [],
      [activeTechnologyId],
    );

  /*
   * Resolve the primary curated architecture path
   * for the currently active technology.
   */
  const activeArchitecturePath =
    useMemo(
      () =>
        activeTechnologyId
          ? getToolkitPrimaryArchitecturePath(
              activeTechnologyId,
            )
          : null,
      [activeTechnologyId],
    );

  /*
   * Fast lookup for deciding whether an individual
   * connection belongs to the active architecture
   * propagation route.
   */
  const activeArchitectureConnectionIds =
    useMemo(
      () =>
        activeArchitecturePath
          ? new Set(
              activeArchitecturePath.connectionIds,
            )
          : new Set<string>(),
      [activeArchitecturePath],
    );

  /*
   * Technologies participating in the active
   * architecture route.
   *
   * We are preparing this now for the later node
   * depth/focus pass.
   */
  const activeArchitectureTechnologyIds =
    useMemo(
      () =>
        activeArchitecturePath
          ? new Set(
              activeArchitecturePath.technologyIds,
            )
          : new Set<string>(),
      [activeArchitecturePath],
    );

  const technologyMap =
    useMemo(
      () =>
        new Map(
          toolkitTechnologies.map(
            (technology) => [
              technology.id,
              technology,
            ],
          ),
        ),
      [],
    );

  /*
   * Preserve cross-category relationships.
   * When filtering a category we keep its
   * technologies plus their direct system
   * neighbours so the architecture never
   * becomes contextless.
   */
  const visibleTechnologyIds =
    useMemo(() => {
      if (
        activeFilter === 'all'
      ) {
        return new Set(
          toolkitTechnologies.map(
            (technology) =>
              technology.id,
          ),
        );
      }

      const visible = new Set(
        toolkitTechnologies
          .filter(
            (technology) =>
              technology.category ===
              activeFilter,
          )
          .map(
            (technology) =>
              technology.id,
          ),
      );

      toolkitConnections.forEach(
        (connection) => {
          if (
            visible.has(
              connection.from,
            )
          ) {
            visible.add(
              connection.to,
            );
          }

          if (
            visible.has(
              connection.to,
            )
          ) {
            visible.add(
              connection.from,
            );
          }
        },
      );

      return visible;
    }, [activeFilter]);

  useFrame(
    ({ pointer }, delta) => {
      /*
       * Three independent parallax
       * layers. Rear infrastructure,
       * architecture, and foreground
       * telemetry no longer rotate as
       * one flat object.
       */

      if (rearLayerRef.current) {
        rearLayerRef.current.rotation.x =
          THREE.MathUtils.damp(
            rearLayerRef.current
              .rotation.x,
            pointer.y * 0.006,
            3,
            delta,
          );

        rearLayerRef.current.rotation.y =
          THREE.MathUtils.damp(
            rearLayerRef.current
              .rotation.y,
            pointer.x * 0.009,
            3,
            delta,
          );

        rearLayerRef.current.position.x =
          THREE.MathUtils.damp(
            rearLayerRef.current
              .position.x,
            pointer.x * -0.025,
            3,
            delta,
          );
      }

      if (
        architectureRef.current
      ) {
        architectureRef.current.rotation.x =
          THREE.MathUtils.damp(
            architectureRef.current
              .rotation.x,
            pointer.y * 0.018,
            4,
            delta,
          );

        architectureRef.current.rotation.y =
          THREE.MathUtils.damp(
            architectureRef.current
              .rotation.y,
            pointer.x * 0.028,
            4,
            delta,
          );

        architectureRef.current.position.x =
          THREE.MathUtils.damp(
            architectureRef.current
              .position.x,
            pointer.x * 0.04,
            4,
            delta,
          );

        architectureRef.current.position.y =
          THREE.MathUtils.damp(
            architectureRef.current
              .position.y,
            pointer.y * 0.025,
            4,
            delta,
          );
      }

      if (foregroundRef.current) {
        foregroundRef.current.position.x =
          THREE.MathUtils.damp(
            foregroundRef.current
              .position.x,
            pointer.x * 0.075,
            4,
            delta,
          );

        foregroundRef.current.position.y =
          THREE.MathUtils.damp(
            foregroundRef.current
              .position.y,
            pointer.y * 0.045,
            4,
            delta,
          );
      }
    },
  );

  return (
    <>
      {/* lighting now matters because nodes use MeshStandardMaterial */}
      <ambientLight
        intensity={0.34}
        color="#ece9ff"
      />

      <directionalLight
        position={[2.8, 4.5, 6]}
        intensity={1.05}
        color="#f2efff"
      />

      <pointLight
        position={[-3.8, 2.4, 3]}
        intensity={1.1}
        distance={8}
        decay={2}
        color="#8f7cf7"
      />

      <pointLight
        position={[3.8, -2.2, 2.8]}
        intensity={0.9}
        distance={8}
        decay={2}
        color="#6d9ee8"
      />

      <SceneController
        activeTechnologyId={
          activeTechnologyId
        }
        activeFilter={activeFilter}
      />
{/* ================================================== */}
{/* CLEAN SPATIAL BACKDROP                             */}
{/* ================================================== */}

<group ref={rearLayerRef} />

      {/* ================================================== */}
      {/* ACTIVE ARCHITECTURE                                */}
      {/* ================================================== */}

      <group
        ref={architectureRef}
      >
        <SystemCore
          activeTechnologyId={
            activeTechnologyId
          }
        />

        <CoreBus
          activeTechnologyId={
            activeTechnologyId
          }
        />

        {/* routes render before nodes */}
{toolkitConnections.map(
  (connection) => {
    const fromTechnology =
      toolkitTechnologies.find(
        (technology) =>
          technology.id ===
          connection.from,
      );

    const toTechnology =
      toolkitTechnologies.find(
        (technology) =>
          technology.id ===
          connection.to,
      );

    if (
      !fromTechnology ||
      !toTechnology
    ) {
      return null;
    }

    const architectureStepIndex =
      activeArchitecturePath
        ? activeArchitecturePath.connectionIds.indexOf(
            connection.id,
          )
        : -1;

    const isArchitectureConnection =
      activeArchitectureConnectionIds.has(
        connection.id,
      );

    return (
      <ToolkitConnection
        key={connection.id}
        connection={connection}
        from={fromTechnology}
        to={toTechnology}
        activeTechnologyId={
          activeTechnologyId
        }
        relatedTechnologyIds={
          relatedTechnologyIds
        }
        isArchitectureConnection={
          isArchitectureConnection
        }
        architectureStepIndex={
          architectureStepIndex
        }
        architectureStepCount={
          activeArchitecturePath
            ?.connectionIds.length ?? 0
        }
      />
    );
  },
)}


        {toolkitTechnologies.map(
          (technology) => {
            if (
              !visibleTechnologyIds.has(
                technology.id,
              )
            ) {
              return null;
            }

            return (
<ToolkitNode
  key={technology.id}
  technology={
    technology
  }
  activeTechnologyId={
    activeTechnologyId
  }
  relatedTechnologyIds={
    relatedTechnologyIds
  }
  onActivate={
    onTechnologyActivate
  }
  onDeactivate={
    onTechnologyDeactivate
  }
  onScreenPositionChange={
    onActiveNodeScreenPositionChange
  }
/>
            );
          },
        )}
      </group>

{/* ================================================== */}
{/* CLEAN FOREGROUND                                   */}
{/* ================================================== */}

<group ref={foregroundRef} />
    </>
  );
}

/* ======================================================== */
/* PUBLIC SCENE                                             */
/* ======================================================== */

export function ToolkitScene({
  activeTechnologyId,
  activeFilter,
  onTechnologyActivate,
  onTechnologyDeactivate,
  onActiveNodeScreenPositionChange,
}: ToolkitSceneProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* DOM atmosphere behind WebGL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[18%] top-[12%] h-[42%] w-[42%] rounded-full bg-soft-violet/[0.055] blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] right-[10%] h-[36%] w-[38%] rounded-full bg-cool-blue/[0.04] blur-[100px]"
      />

      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 10.6],
          fov: 44,
          near: 0.1,
          far: 100,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onPointerMissed={() => {
          onTechnologyDeactivate();
        }}
        style={{
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <ArchitectureScene
            activeTechnologyId={
              activeTechnologyId
            }
            activeFilter={
              activeFilter
            }
            onTechnologyActivate={
              onTechnologyActivate
            }
            onTechnologyDeactivate={
              onTechnologyDeactivate
            }
            onActiveNodeScreenPositionChange={
              onActiveNodeScreenPositionChange
            }
          />
        </Suspense>
      </Canvas>
    </div>
  );
}