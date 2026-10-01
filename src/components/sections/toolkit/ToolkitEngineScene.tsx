'use client';

import {
  useFrame,
  useThree,
} from '@react-three/fiber';
import {
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';

import { ToolkitEngineLayer } from './ToolkitEngineLayer';

export type ToolkitEngineLayerId =
  | 'interface'
  | 'application'
  | 'data'
  | 'workflow';

type ToolkitEngineSceneProps = {
  activeLayer: ToolkitEngineLayerId | null;
  reducedMotion: boolean;
};

const layerPositions: Record<
  ToolkitEngineLayerId,
  [number, number, number]
> = {
  interface: [-0.62, 1.18, 0.08],
  application: [0.92, 0.38, 0.28],
  data: [0.62, -0.92, 0.02],
  workflow: [-1.12, -0.42, 0.2],
};

/* ================================================== */
/* ARCHITECTURE CIRCUIT                               */
/* ================================================== */

function ArchitectureCircuit({
  activeLayer,
  reducedMotion,
}: ToolkitEngineSceneProps) {
  const signalRefs = useRef<
    Array<THREE.Mesh | null>
  >([]);

  const routes = useMemo(() => {
    const createRoute = (
      points: Array<
        [number, number, number]
      >,
    ) => {
      const curve =
        new THREE.CatmullRomCurve3(
          points.map(
            ([x, y, z]) =>
              new THREE.Vector3(
                x,
                y,
                z,
              ),
          ),
          false,
          'catmullrom',
          0.08,
        );

      return {
        curve,
        geometry:
          new THREE.TubeGeometry(
            curve,
            32,
            0.005,
            5,
            false,
          ),
      };
    };

    return [
      createRoute([
        [-0.1, 1.12, 0.02],
        [0.32, 1.12, 0.02],
        [0.32, 0.66, 0.14],
        [0.72, 0.48, 0.2],
      ]),

      createRoute([
        [0.94, 0.04, 0.16],
        [0.94, -0.28, 0.12],
        [0.74, -0.28, 0.07],
        [0.64, -0.64, 0.02],
      ]),

      createRoute([
        [0.06, -0.9, 0.02],
        [-0.38, -0.9, 0.06],
        [-0.38, -0.55, 0.12],
        [-0.82, -0.44, 0.16],
      ]),

      createRoute([
        [-1.12, -0.08, 0.14],
        [-1.12, 0.32, 0.08],
        [-0.82, 0.32, 0.04],
        [-0.7, 0.84, 0.02],
      ]),
    ];
  }, []);

  useFrame(({ clock }) => {
    if (reducedMotion) return;

    const speed =
      activeLayer !== null
        ? 0.16
        : 0.07;

    signalRefs.current.forEach(
      (signal, index) => {
        if (!signal) return;

        const progress =
          (clock.elapsedTime *
            speed +
            index * 0.24) %
          1;

        signal.position.copy(
          routes[index].curve.getPointAt(
            progress,
          ),
        );
      },
    );
  });

  return (
    <group position={[0, 0, -0.16]}>
      {routes.map((route, index) => (
        <group key={index}>
          <mesh
            geometry={route.geometry}
          >
            <meshBasicMaterial
              color="#7c6cf2"
              transparent
              opacity={
                activeLayer
                  ? 0.36
                  : 0.11
              }
              depthWrite={false}
            />
          </mesh>

          <mesh
            ref={(element) => {
              signalRefs.current[index] =
                element;
            }}
          >
            <sphereGeometry
              args={[
                activeLayer
                  ? 0.04
                  : 0.03,
                14,
                14,
              ]}
            />

            <meshBasicMaterial
              color={
                index % 2 === 0
                  ? '#c0b7ff'
                  : '#83b7ff'
              }
              transparent
              opacity={
                activeLayer
                  ? 0.92
                  : 0.64
              }
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}

      {[
        [0.32, 1.12, 0.02],
        [0.94, -0.28, 0.12],
        [-0.38, -0.9, 0.06],
        [-1.12, 0.32, 0.08],
      ].map(
        (position, index) => (
          <mesh
            key={index}
            position={
              position as [
                number,
                number,
                number,
              ]
            }
          >
            <sphereGeometry
              args={[0.022, 12, 12]}
            />

            <meshBasicMaterial
              color="#7c6cf2"
              transparent
              opacity={
                activeLayer
                  ? 0.38
                  : 0.22
              }
              depthWrite={false}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

/* ================================================== */
/* ACTIVE TECHNOLOGY SATELLITE FIELD                  */
/* ================================================== */

type SatelliteDefinition = {
  position: [
    number,
    number,
    number,
  ];

  size?: number;

  signal?: 'violet' | 'blue';
};

const satelliteLayouts: Record<
  ToolkitEngineLayerId,
  SatelliteDefinition[]
> = {
  interface: [
    {
      position: [-1.55, 1.72, 0.2],
      size: 0.055,
      signal: 'violet',
    },
    {
      position: [-0.92, 1.82, 0.32],
      size: 0.04,
      signal: 'blue',
    },
    {
      position: [-0.22, 1.68, 0.18],
      size: 0.045,
      signal: 'violet',
    },
    {
      position: [-1.52, 1.08, 0.3],
      size: 0.04,
      signal: 'blue',
    },
    {
      position: [-0.05, 1.06, 0.3],
      size: 0.052,
      signal: 'violet',
    },
    {
      position: [-1.26, 0.74, 0.16],
      size: 0.035,
      signal: 'violet',
    },
    {
      position: [-0.46, 0.74, 0.24],
      size: 0.035,
      signal: 'blue',
    },
  ],

  application: [
    {
      position: [0.22, 0.94, 0.34],
      size: 0.05,
      signal: 'violet',
    },
    {
      position: [0.88, 1.08, 0.42],
      size: 0.04,
      signal: 'blue',
    },
    {
      position: [1.58, 0.9, 0.28],
      size: 0.055,
      signal: 'violet',
    },
    {
      position: [1.72, 0.36, 0.36],
      size: 0.04,
      signal: 'blue',
    },
    {
      position: [1.5, -0.04, 0.24],
      size: 0.045,
      signal: 'violet',
    },
    {
      position: [0.68, -0.12, 0.4],
      size: 0.038,
      signal: 'blue',
    },
  ],

  data: [
    {
      position: [-0.1, -0.54, 0.22],
      size: 0.045,
      signal: 'blue',
    },
    {
      position: [0.44, -0.36, 0.34],
      size: 0.055,
      signal: 'violet',
    },
    {
      position: [1.12, -0.42, 0.24],
      size: 0.04,
      signal: 'blue',
    },
    {
      position: [1.52, -0.76, 0.38],
      size: 0.05,
      signal: 'violet',
    },
    {
      position: [1.42, -1.28, 0.2],
      size: 0.038,
      signal: 'blue',
    },
    {
      position: [0.82, -1.46, 0.32],
      size: 0.045,
      signal: 'violet',
    },
    {
      position: [0.18, -1.4, 0.2],
      size: 0.035,
      signal: 'blue',
    },
  ],

  workflow: [
    {
      position: [-1.86, 0.02, 0.22],
      size: 0.045,
      signal: 'violet',
    },
    {
      position: [-1.56, -0.38, 0.36],
      size: 0.055,
      signal: 'blue',
    },
    {
      position: [-1.74, -0.9, 0.24],
      size: 0.04,
      signal: 'violet',
    },
    {
      position: [-1.18, -1.18, 0.32],
      size: 0.045,
      signal: 'blue',
    },
    {
      position: [-0.66, -0.94, 0.24],
      size: 0.038,
      signal: 'violet',
    },
  ],
};

/* ================================================== */
/* SINGLE DEPLOYING SATELLITE                         */
/* ================================================== */

function TechnologySatellite({
  definition,
  origin,
  active,
  reducedMotion,
  index,
}: {
  definition: SatelliteDefinition;
  origin: [number, number, number];
  active: boolean;
  reducedMotion: boolean;
  index: number;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const haloRef =
    useRef<THREE.Mesh>(null);

  const target = useMemo(
    () =>
      new THREE.Vector3(
        ...definition.position,
      ),
    [definition.position],
  );

  const collapsed = useMemo(
    () =>
      new THREE.Vector3(
        origin[0],
        origin[1],
        origin[2] + 0.04,
      ),
    [origin],
  );

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const desiredPosition =
      active ? target : collapsed;

    groupRef.current.position.x =
      THREE.MathUtils.damp(
        groupRef.current.position.x,
        desiredPosition.x,
        active ? 4.8 : 6.5,
        delta,
      );

    groupRef.current.position.y =
      THREE.MathUtils.damp(
        groupRef.current.position.y,
        desiredPosition.y,
        active ? 4.8 : 6.5,
        delta,
      );

    groupRef.current.position.z =
      THREE.MathUtils.damp(
        groupRef.current.position.z,
        desiredPosition.z,
        active ? 4.8 : 6.5,
        delta,
      );

    const desiredScale =
      active ? 1 : 0.001;

    const currentScale =
      groupRef.current.scale.x;

    const nextScale =
      THREE.MathUtils.damp(
        currentScale,
        desiredScale,
        active ? 5 : 8,
        delta,
      );

    groupRef.current.scale.setScalar(
      nextScale,
    );

    if (!reducedMotion && active) {
      const drift =
        Math.sin(
          clock.elapsedTime *
            0.8 +
            index * 1.7,
        ) * 0.018;

      groupRef.current.position.y +=
        drift * delta * 4;

      groupRef.current.rotation.z =
        Math.sin(
          clock.elapsedTime *
            0.35 +
            index,
        ) * 0.08;

      if (haloRef.current) {
        haloRef.current.rotation.z +=
          delta *
          (index % 2 === 0
            ? 0.22
            : -0.18);
      }
    }
  });

  const signalColor =
    definition.signal === 'blue'
      ? '#83b7ff'
      : '#7c6cf2';

  return (
    <group
      ref={groupRef}
      position={collapsed}
      scale={0.001}
    >
      {/* outer technical halo */}
      <mesh
        ref={haloRef}
        rotation={[
          Math.PI / 2,
          0,
          index * 0.5,
        ]}
      >
        <torusGeometry
          args={[
            (definition.size ?? 0.045) *
              2.15,
            0.005,
            8,
            28,
          ]}
        />

        <meshBasicMaterial
          color={signalColor}
          transparent
          opacity={0.26}
          depthWrite={false}
        />
      </mesh>

      {/* inner satellite */}
      <mesh>
        <sphereGeometry
          args={[
            definition.size ?? 0.045,
            18,
            18,
          ]}
        />

        <meshStandardMaterial
          color={signalColor}
          emissive={signalColor}
          emissiveIntensity={0.32}
          roughness={0.42}
          metalness={0.12}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* small signal core */}
      <mesh
        position={[
          0,
          0,
          (definition.size ??
            0.045) *
            0.72,
        ]}
      >
        <sphereGeometry
          args={[
            (definition.size ?? 0.045) *
              0.26,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color="#f3f0ff"
          transparent
          opacity={0.82}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ================================================== */
/* SATELLITE ROUTES                                   */
/* ================================================== */

function SatelliteRoutes({
  activeLayer,
}: {
  activeLayer: ToolkitEngineLayerId | null;
}) {
  const routeGeometries =
    useMemo(() => {
      if (!activeLayer) {
        return [];
      }

      const origin =
        layerPositions[activeLayer];

      return satelliteLayouts[
        activeLayer
      ].map((definition) => {
        const start =
          new THREE.Vector3(
            origin[0],
            origin[1],
            origin[2] - 0.03,
          );

        const end =
          new THREE.Vector3(
            ...definition.position,
          );

        const middle =
          start
            .clone()
            .lerp(end, 0.55);

        middle.z += 0.08;

        const curve =
          new THREE.CatmullRomCurve3(
            [
              start,
              middle,
              end,
            ],
            false,
            'catmullrom',
            0.06,
          );

        return new THREE.TubeGeometry(
          curve,
          20,
          0.0035,
          4,
          false,
        );
      });
    }, [activeLayer]);

  if (!activeLayer) {
    return null;
  }

  return (
    <group>
      {routeGeometries.map(
        (geometry, index) => (
          <mesh
            key={`${activeLayer}-${index}`}
            geometry={geometry}
          >
            <meshBasicMaterial
              color={
                index % 2 === 0
                  ? '#7c6cf2'
                  : '#83b7ff'
              }
              transparent
              opacity={0.18}
              depthWrite={false}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

/* ================================================== */
/* TECHNOLOGY DEPLOYMENT FIELD                        */
/* ================================================== */

function TechnologySatelliteField({
  activeLayer,
  reducedMotion,
}: ToolkitEngineSceneProps) {
  return (
    <group position={[0, 0, 0.08]}>
      <SatelliteRoutes
        activeLayer={activeLayer}
      />

      {(
        Object.keys(
          satelliteLayouts,
        ) as ToolkitEngineLayerId[]
      ).flatMap((layer) =>
        satelliteLayouts[layer].map(
          (definition, index) => (
            <TechnologySatellite
              key={`${layer}-${index}`}
              definition={definition}
              origin={
                layerPositions[layer]
              }
              active={
                activeLayer === layer
              }
              reducedMotion={
                reducedMotion
              }
              index={index}
            />
          ),
        ),
      )}
    </group>
  );
}

/* ================================================== */
/* MAIN ENGINE SCENE                                  */
/* ================================================== */

export function ToolkitEngineScene({
  activeLayer,
  reducedMotion,
}: ToolkitEngineSceneProps) {
  const architectureRef =
    useRef<THREE.Group>(null);

  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!architectureRef.current) {
      return;
    }

    const targetRotationY =
      reducedMotion
        ? 0
        : pointer.x * 0.055;

    const targetRotationX =
      reducedMotion
        ? -0.06
        : -0.06 +
          pointer.y * -0.025;

    architectureRef.current.rotation.y =
      THREE.MathUtils.damp(
        architectureRef.current.rotation.y,
        targetRotationY,
        4,
        delta,
      );

    architectureRef.current.rotation.x =
      THREE.MathUtils.damp(
        architectureRef.current.rotation.x,
        targetRotationX,
        4,
        delta,
      );
  });

  return (
    <>
      <ambientLight intensity={1.35} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={1.6}
        color="#f3f0ff"
      />

      <directionalLight
        position={[-4, -2, 3]}
        intensity={0.65}
        color="#83b7ff"
      />

      <group
        ref={architectureRef}
        rotation={[-0.06, 0, 0]}
      >
        <ToolkitEngineLayer
          kind="interface"
          position={
            layerPositions.interface
          }
          active={
            activeLayer === 'interface'
          }
          reducedMotion={
            reducedMotion
          }
        />

        <ToolkitEngineLayer
          kind="application"
          position={
            layerPositions.application
          }
          active={
            activeLayer ===
            'application'
          }
          reducedMotion={
            reducedMotion
          }
        />

        <ToolkitEngineLayer
          kind="data"
          position={
            layerPositions.data
          }
          active={
            activeLayer === 'data'
          }
          reducedMotion={
            reducedMotion
          }
        />

        <ToolkitEngineLayer
          kind="workflow"
          position={
            layerPositions.workflow
          }
          active={
            activeLayer === 'workflow'
          }
          reducedMotion={
            reducedMotion
          }
        />

        <ArchitectureCircuit
          activeLayer={activeLayer}
          reducedMotion={
            reducedMotion
          }
        />

        <TechnologySatelliteField
          activeLayer={activeLayer}
          reducedMotion={
            reducedMotion
          }
        />
      </group>
    </>
  );
}