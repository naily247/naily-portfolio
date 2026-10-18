
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';

type LivingIdentityProps = {
  active: number;
  reduceMotion: boolean;
};

const VIOLET = '#8270ee';
const PALE_VIOLET = '#b5a9f5';

function IdentitySculpture({
  active,
  reduceMotion,
}: LivingIdentityProps) {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const ringC = useRef<Mesh>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * Math.PI * 2;
      const radius = 2.15 + (i % 4) * 0.17;

      return [
        Math.cos(angle) * radius,
        Math.sin(angle * 1.7) * 0.8,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !core.current) return;

    const t = state.clock.elapsedTime;
    const speed = Math.min(delta * 2.5, 0.12);

    const targetRotation =
      active === 0 ? 0.1 : active === 1 ? 0.75 : 1.35;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotation +
        (reduceMotion ? 0 : Math.sin(t * 0.2) * 0.16),
      speed,
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      active === 0 ? -0.25 : active === 1 ? 0.2 : -0.5,
      speed,
    );

    const targetScale =
      active === 0 ? 0.92 : active === 1 ? 1.08 : 1.2;

    const scale = THREE.MathUtils.lerp(
      group.current.scale.x,
      targetScale,
      speed,
    );

    group.current.scale.setScalar(scale);

    if (!reduceMotion) {
      core.current.rotation.x += delta * 0.12;
      core.current.rotation.y += delta * 0.16;

      if (ringA.current) ringA.current.rotation.z += delta * 0.09;
      if (ringB.current) ringB.current.rotation.x -= delta * 0.12;
      if (ringC.current) ringC.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial
          color={VIOLET}
          wireframe
          transparent
          opacity={0.17}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringA} rotation={[0.45, 0.2, 0.4]}>
        <torusGeometry args={[1.72, 0.009, 8, 140]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringB} rotation={[1.1, 0.5, -0.3]}>
        <torusGeometry args={[2.04, 0.007, 8, 140]} />
        <meshBasicMaterial
          color={PALE_VIOLET}
          transparent
          opacity={0.48}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringC} rotation={[0.1, 1.15, 0.5]}>
        <torusGeometry args={[1.43, 0.012, 8, 140]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>

      {particles.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry
            args={[index % 6 === 0 ? 0.037 : 0.018, 8, 8]}
          />
          <meshBasicMaterial
            color={index % 3 === 0 ? VIOLET : PALE_VIOLET}
            transparent
            opacity={index % 4 === 0 ? 0.72 : 0.36}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function LivingIdentity({
  active,
  reduceMotion,
}: LivingIdentityProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <IdentitySculpture
          active={active}
          reduceMotion={reduceMotion}
        />
      </Canvas>
    </div>
  );
}
