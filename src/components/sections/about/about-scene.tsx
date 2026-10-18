
'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type StoryIndex = 0 | 1 | 2;

type AboutSceneProps = {
  active: StoryIndex;
  reducedMotion?: boolean;
};

const STORY_ROTATIONS = [
  [0.08, -0.16, -0.12],
  [-0.12, 0.25, 0.08],
  [0.18, -0.28, 0.15],
] as const;

function Ribbon({
  index,
}: {
  index: number;
}) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];

    const count = 180;

    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 2;

      const radius =
        1.2 +
        Math.sin(t * 3 + index * 1.7) * 0.12;

      const x =
        Math.cos(t + index * 0.65) *
        radius *
        1.15;

      const y =
        Math.sin(t + index * 0.65) *
        radius *
        0.86;

      const z =
        Math.sin(t * 2 + index * 1.3) * 0.28;

      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      'centripetal',
    );

    return new THREE.TubeGeometry(
      curve,
      220,
      0.012,
      6,
      true,
    );
  }, [index]);

  return (
    <mesh
      geometry={geometry}
      rotation={[
        index * 0.35,
        index * 0.55,
        index * 0.42,
      ]}
    >
      <meshPhysicalMaterial
        color={
          index === 0
            ? '#8b74dd'
            : index === 1
              ? '#c0b0f2'
              : '#9b85e4'
        }
        metalness={0.15}
        roughness={0.24}
        transparent
        opacity={index === 1 ? 0.26 : 0.42}
        depthWrite={false}
      />
    </mesh>
  );
}

function KineticSculpture({
  active,
  reducedMotion,
}: AboutSceneProps) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (
      !group.current ||
      !rings.current ||
      reducedMotion
    ) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const target = STORY_ROTATIONS[active];

    const damping =
      1 - Math.exp(-delta * 1.3);

    group.current.rotation.x =
      THREE.MathUtils.lerp(
        group.current.rotation.x,
        target[0] +
          state.pointer.y * 0.08,
        damping,
      );

    group.current.rotation.y =
      THREE.MathUtils.lerp(
        group.current.rotation.y,
        target[1] +
          state.pointer.x * 0.12,
        damping,
      );

    group.current.rotation.z =
      THREE.MathUtils.lerp(
        group.current.rotation.z,
        target[2],
        damping,
      );

    rings.current.rotation.y =
      elapsed * 0.055;

    rings.current.rotation.z =
      Math.sin(elapsed * 0.25) * 0.08;

    group.current.position.y =
      Math.sin(elapsed * 0.42) * 0.035;
  });

  return (
    <group ref={group} scale={1.35}>
      <group ref={rings}>
        <Ribbon index={0} />
        <Ribbon index={1} />
        <Ribbon index={2} />
      </group>
    </group>
  );
}

export default function AboutScene({
  active,
  reducedMotion = false,
}: AboutSceneProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={
          reducedMotion ? 'demand' : 'always'
        }
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        }}
        camera={{
          position: [0, 0, 5.8],
          fov: 42,
        }}
        style={{
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={1.5}
          color="#ffffff"
        />

        <KineticSculpture
          active={active}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
