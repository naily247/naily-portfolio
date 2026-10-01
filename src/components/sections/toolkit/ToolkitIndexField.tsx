'use client';

import {
  useMemo,
  useRef,
} from 'react';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import * as THREE from 'three';

type ToolkitIndexFieldProps = {
  activeGroup: number | null;
};

type SignalPoint = {
  position: [
    number,
    number,
    number,
  ];
  size: number;
  opacity: number;
  phase: number;
};

const anchors: [
  number,
  number,
  number,
][] = [
  [-3.7, 1.45, 0],
  [3.7, 1.45, 0],
  [-3.7, -1.45, 0],
  [3.7, -1.45, 0],
];

const routePairs: [
  number,
  number,
][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [0, 3],
  [1, 2],
];

function createCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  index: number,
) {
  const midpoint = start
    .clone()
    .lerp(end, 0.5);

  midpoint.z =
    0.15 + (index % 3) * 0.08;

  if (
    Math.abs(start.x - end.x) >
    Math.abs(start.y - end.y)
  ) {
    midpoint.y +=
      index % 2 === 0
        ? 0.22
        : -0.22;
  } else {
    midpoint.x +=
      index % 2 === 0
        ? 0.22
        : -0.22;
  }

  return new THREE.QuadraticBezierCurve3(
    start,
    midpoint,
    end,
  );
}

/* ====================================================== */
/* SIGNAL ROUTE                                           */
/* ====================================================== */

function SignalRoute({
  startIndex,
  endIndex,
  routeIndex,
  activeGroup,
}: {
  startIndex: number;
  endIndex: number;
  routeIndex: number;
  activeGroup: number | null;
}) {
  const primaryPulseRef =
    useRef<THREE.Mesh>(null);

  const secondaryPulseRef =
    useRef<THREE.Mesh>(null);

  const glowPulseRef =
    useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const start = new THREE.Vector3(
      ...anchors[startIndex],
    );

    const end = new THREE.Vector3(
      ...anchors[endIndex],
    );

    return createCurve(
      start,
      end,
      routeIndex,
    );
  }, [
    endIndex,
    routeIndex,
    startIndex,
  ]);

  const geometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        curve,
        42,
        0.006,
        5,
        false,
      ),
    [curve],
  );

  const isRelated =
    activeGroup === null ||
    activeGroup === startIndex ||
    activeGroup === endIndex;

  const isFocused =
    activeGroup !== null &&
    (activeGroup === startIndex ||
      activeGroup === endIndex);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    const speed =
      0.075 +
      routeIndex * 0.004;

    const offset =
      routeIndex * 0.145;

    const primaryProgress =
      (time * speed + offset) % 1;

    const secondaryProgress =
      (
        time * speed +
        offset +
        0.46
      ) % 1;

    const glowProgress =
      (
        time * speed +
        offset +
        0.025
      ) % 1;

    if (primaryPulseRef.current) {
      const point =
        curve.getPointAt(
          primaryProgress,
        );

      primaryPulseRef.current.position.copy(
        point,
      );

      const scale =
        isFocused
          ? 1.35
          : isRelated
            ? 1
            : 0.45;

      primaryPulseRef.current.scale.setScalar(
        scale,
      );
    }

    if (secondaryPulseRef.current) {
      const point =
        curve.getPointAt(
          secondaryProgress,
        );

      secondaryPulseRef.current.position.copy(
        point,
      );

      const scale =
        isFocused
          ? 1.05
          : isRelated
            ? 0.76
            : 0.3;

      secondaryPulseRef.current.scale.setScalar(
        scale,
      );
    }

    if (glowPulseRef.current) {
      const point =
        curve.getPointAt(
          glowProgress,
        );

      glowPulseRef.current.position.copy(
        point,
      );

      const breathe =
        1 +
        Math.sin(
          time * 2.2 +
            routeIndex,
        ) *
          0.12;

      glowPulseRef.current.scale.setScalar(
        isFocused
          ? 1.55 * breathe
          : 1.05 * breathe,
      );
    }
  });

  return (
    <>
      {/* route */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          transparent
          color={
            isRelated
              ? '#8878f4'
              : '#a7a0c7'
          }
          opacity={
            activeGroup === null
              ? 0.13
              : isFocused
                ? 0.34
                : 0.035
          }
          depthWrite={false}
        />
      </mesh>

      {/* soft energetic route sitting underneath */}
      {isFocused && (
        <mesh geometry={geometry}>
          <meshBasicMaterial
            transparent
            color="#8878f4"
            opacity={0.065}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* primary travelling packet */}
      <mesh ref={primaryPulseRef}>
        <sphereGeometry
          args={[0.043, 12, 12]}
        />

        <meshBasicMaterial
          transparent
          color={
            routeIndex % 2 === 0
              ? '#8f7cf8'
              : '#74a7ee'
          }
          opacity={
            isFocused
              ? 0.95
              : isRelated
                ? 0.72
                : 0.08
          }
          depthWrite={false}
        />
      </mesh>

      {/* subtle aura around primary packet */}
      <mesh ref={glowPulseRef}>
        <sphereGeometry
          args={[0.085, 12, 12]}
        />

        <meshBasicMaterial
          transparent
          color={
            routeIndex % 2 === 0
              ? '#8f7cf8'
              : '#74a7ee'
          }
          opacity={
            isFocused
              ? 0.095
              : isRelated
                ? 0.045
                : 0.01
          }
          depthWrite={false}
        />
      </mesh>

      {/* second smaller packet */}
      <mesh ref={secondaryPulseRef}>
        <sphereGeometry
          args={[0.025, 10, 10]}
        />

        <meshBasicMaterial
          transparent
          color={
            routeIndex % 2 === 0
              ? '#74a7ee'
              : '#8f7cf8'
          }
          opacity={
            isFocused
              ? 0.72
              : isRelated
                ? 0.42
                : 0.05
          }
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* ====================================================== */
/* CAPABILITY ANCHOR                                      */
/* ====================================================== */

function Anchor({
  index,
  activeGroup,
}: {
  index: number;
  activeGroup: number | null;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const ringRef =
    useRef<THREE.Mesh>(null);

  const outerRingRef =
    useRef<THREE.Mesh>(null);

  const coreRef =
    useRef<THREE.Mesh>(null);

  const isActive =
    activeGroup === index;

  const isIdle =
    activeGroup === null;

  useFrame(
    ({ clock }, delta) => {
      if (ringRef.current) {
        ringRef.current.rotation.z +=
          delta *
          (isActive ? 0.42 : 0.09);

        const breathe =
          1 +
          Math.sin(
            clock.elapsedTime * 1.45 +
              index,
          ) *
            0.035;

        const target =
          isActive
            ? 1.3
            : isIdle
              ? breathe
              : 0.84;

        ringRef.current.scale.lerp(
          new THREE.Vector3(
            target,
            target,
            target,
          ),
          0.065,
        );
      }

      if (outerRingRef.current) {
        outerRingRef.current.rotation.z -=
          delta *
          (isActive
            ? 0.18
            : 0.035);

        const outerTarget =
          isActive
            ? 1.22
            : isIdle
              ? 1
              : 0.82;

        outerRingRef.current.scale.lerp(
          new THREE.Vector3(
            outerTarget,
            outerTarget,
            outerTarget,
          ),
          0.05,
        );
      }

      if (coreRef.current) {
        const corePulse =
          1 +
          Math.sin(
            clock.elapsedTime * 2 +
              index * 0.7,
          ) *
            (isActive
              ? 0.13
              : 0.045);

        coreRef.current.scale.setScalar(
          corePulse,
        );
      }

      if (groupRef.current) {
        const targetZ =
          isActive
            ? 0.12
            : 0;

        groupRef.current.position.z =
          THREE.MathUtils.damp(
            groupRef.current.position.z,
            targetZ,
            5,
            delta,
          );
      }
    },
  );

  return (
    <group
      ref={groupRef}
      position={anchors[index]}
    >
      {/* anchor core */}
      <mesh ref={coreRef}>
        <circleGeometry
          args={[0.055, 18]}
        />

        <meshBasicMaterial
          transparent
          color={
            isActive
              ? '#7765ef'
              : '#9489df'
          }
          opacity={
            isActive
              ? 0.95
              : isIdle
                ? 0.42
                : 0.15
          }
          depthWrite={false}
        />
      </mesh>

      {/* inner rotating ring */}
      <mesh ref={ringRef}>
        <ringGeometry
          args={[
            0.11,
            0.118,
            32,
          ]}
        />

        <meshBasicMaterial
          transparent
          color={
            isActive
              ? '#7765ef'
              : '#9c91e8'
          }
          opacity={
            isActive
              ? 0.65
              : 0.18
          }
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* outer technical ring */}
      <mesh ref={outerRingRef}>
        <ringGeometry
          args={[
            0.18,
            0.184,
            40,
          ]}
        />

        <meshBasicMaterial
          transparent
          color={
            index % 2 === 0
              ? '#8f7cf8'
              : '#74a7ee'
          }
          opacity={
            isActive
              ? 0.24
              : isIdle
                ? 0.065
                : 0.025
          }
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* wake field */}
      {isActive && (
        <>
          <mesh
            position={[
              0,
              0,
              -0.03,
            ]}
          >
            <circleGeometry
              args={[0.3, 32]}
            />

            <meshBasicMaterial
              transparent
              color="#806df3"
              opacity={0.055}
              depthWrite={false}
            />
          </mesh>

          <mesh
            position={[
              0,
              0,
              -0.04,
            ]}
          >
            <ringGeometry
              args={[
                0.38,
                0.39,
                40,
              ]}
            />

            <meshBasicMaterial
              transparent
              color="#74a7ee"
              opacity={0.07}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

/* ====================================================== */
/* AMBIENT SIGNAL FIELD                                   */
/* ====================================================== */

function AmbientPoints({
  activeGroup,
}: ToolkitIndexFieldProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const points = useMemo<
    SignalPoint[]
  >(
    () =>
      Array.from(
        { length: 32 },
        (_, index) => {
          const column =
            index % 8;

          const row =
            Math.floor(index / 8);

          return {
            position: [
              -5.4 +
                column * 1.55 +
                (row % 2) * 0.25,
              2.55 -
                row * 1.65,
              -0.1,
            ],
            size:
              index % 5 === 0
                ? 0.024
                : 0.014,
            opacity:
              index % 4 === 0
                ? 0.18
                : 0.09,
            phase:
              index * 0.47,
          };
        },
      ),
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.children.forEach(
      (child, index) => {
        const mesh =
          child as THREE.Mesh;

        const point =
          points[index];

        if (!point) {
          return;
        }

        const breathe =
          1 +
          Math.sin(
            clock.elapsedTime * 0.9 +
              point.phase,
          ) *
            0.18;

        mesh.scale.setScalar(
          breathe,
        );

        mesh.position.y =
          point.position[1] +
          Math.sin(
            clock.elapsedTime * 0.28 +
              point.phase,
          ) *
            0.025;
      },
    );
  });

  return (
    <group ref={groupRef}>
      {points.map(
        (point, index) => (
          <mesh
            key={index}
            position={
              point.position
            }
          >
            <circleGeometry
              args={[
                point.size,
                8,
              ]}
            />

            <meshBasicMaterial
              transparent
              color={
                index % 3 === 0
                  ? '#7765ef'
                  : '#759fe4'
              }
              opacity={
                activeGroup === null
                  ? point.opacity
                  : point.opacity *
                    0.45
              }
              depthWrite={false}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

/* ====================================================== */
/* SCENE                                                  */
/* ====================================================== */

function FieldScene({
  activeGroup,
}: ToolkitIndexFieldProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const depthRef =
    useRef<THREE.Group>(null);

  useFrame(
    ({ pointer, clock }, delta) => {
      if (groupRef.current) {
        const targetX =
          pointer.y * 0.028;

        const targetY =
          pointer.x * 0.04;

        groupRef.current.rotation.x =
          THREE.MathUtils.damp(
            groupRef.current.rotation.x,
            targetX,
            5,
            delta,
          );

        groupRef.current.rotation.y =
          THREE.MathUtils.damp(
            groupRef.current.rotation.y,
            targetY,
            5,
            delta,
          );
      }

      if (depthRef.current) {
        const idleX =
          Math.sin(
            clock.elapsedTime * 0.18,
          ) * 0.035;

        const idleY =
          Math.cos(
            clock.elapsedTime * 0.15,
          ) * 0.025;

        depthRef.current.position.x =
          THREE.MathUtils.damp(
            depthRef.current.position.x,
            pointer.x * 0.055 +
              idleX,
            3.5,
            delta,
          );

        depthRef.current.position.y =
          THREE.MathUtils.damp(
            depthRef.current.position.y,
            pointer.y * 0.04 +
              idleY,
            3.5,
            delta,
          );
      }
    },
  );

  return (
    <group ref={depthRef}>
      <group ref={groupRef}>
        <AmbientPoints
          activeGroup={activeGroup}
        />

        {routePairs.map(
          (
            [
              startIndex,
              endIndex,
            ],
            routeIndex,
          ) => (
            <SignalRoute
              key={`${startIndex}-${endIndex}`}
              startIndex={startIndex}
              endIndex={endIndex}
              routeIndex={routeIndex}
              activeGroup={
                activeGroup
              }
            />
          ),
        )}

        {anchors.map(
          (_, index) => (
            <Anchor
              key={index}
              index={index}
              activeGroup={
                activeGroup
              }
            />
          ),
        )}
      </group>
    </group>
  );
}

/* ====================================================== */
/* CANVAS                                                 */
/* ====================================================== */

export function ToolkitIndexField({
  activeGroup,
}: ToolkitIndexFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        dpr={[1, 1.35]}
        camera={{
          position: [
            0,
            0,
            9.5,
          ],
          fov: 45,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference:
            'high-performance',
        }}
      >
        <FieldScene
          activeGroup={activeGroup}
        />
      </Canvas>
    </div>
  );
}