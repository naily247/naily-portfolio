'use client';

import { useFrame } from '@react-three/fiber';
import {
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';

export type ToolkitEngineLayerKind =
  | 'interface'
  | 'application'
  | 'data'
  | 'workflow';

type ToolkitEngineLayerProps = {
  kind: ToolkitEngineLayerKind;
  position: [number, number, number];
  active: boolean;
  reducedMotion: boolean;
};

/* =========================================================
   SMALL SHARED PRIMITIVES
   ========================================================= */

function SignalDot({
  position,
  scale = 1,
  opacity = 0.65,
}: {
  position: [number, number, number];
  scale?: number;
  opacity?: number;
}) {
  return (
    <mesh
      position={position}
      scale={scale}
    >
      <sphereGeometry args={[0.035, 14, 14]} />

      <meshBasicMaterial
        color="#c0b7ff"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

function TechnicalRail({
  position,
  width,
  opacity = 0.25,
}: {
  position: [number, number, number];
  width: number;
  opacity?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry
        args={[width, 0.012, 0.012]}
      />

      <meshBasicMaterial
        color="#7c6cf2"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

/* =========================================================
   01 — INTERFACE
   Exploded product / UI surface stack
   ========================================================= */

function InterfaceAssembly({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const frontRef =
    useRef<THREE.Mesh>(null);

  const middleRef =
    useRef<THREE.Mesh>(null);

  const rearRef =
    useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const t = clock.elapsedTime;

    groupRef.current.rotation.y =
      THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        active ? -0.09 : -0.025,
        4,
        delta,
      );

    if (!reducedMotion) {
      groupRef.current.rotation.z =
        Math.sin(t * 0.28) * 0.006;
    }

    if (frontRef.current) {
      frontRef.current.position.z =
        THREE.MathUtils.damp(
          frontRef.current.position.z,
          active ? 0.38 : 0.24,
          5,
          delta,
        );
    }

    if (middleRef.current) {
      middleRef.current.position.z =
        THREE.MathUtils.damp(
          middleRef.current.position.z,
          active ? 0.08 : 0,
          5,
          delta,
        );
    }

    if (rearRef.current) {
      rearRef.current.position.z =
        THREE.MathUtils.damp(
          rearRef.current.position.z,
          active ? -0.26 : -0.16,
          5,
          delta,
        );
    }
  });

  return (
    <group ref={groupRef}>
      {/* rear interface plane */}
      <mesh
        ref={rearRef}
        position={[-0.14, 0.08, -0.16]}
      >
        <boxGeometry
          args={[2.75, 0.68, 0.045]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.55 : 0.22
          }
          transparent
          opacity={0.26}
          roughness={0.34}
          metalness={0.12}
        />
      </mesh>

      {/* middle surface */}
      <mesh
        ref={middleRef}
        position={[0.08, 0, 0]}
      >
        <boxGeometry
          args={[2.58, 0.62, 0.055]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.68 : 0.3
          }
          transparent
          opacity={0.42}
          roughness={0.27}
          metalness={0.18}
        />
      </mesh>

      {/* front product surface */}
      <mesh
        ref={frontRef}
        position={[-0.03, -0.03, 0.24]}
      >
        <boxGeometry
          args={[2.38, 0.54, 0.07]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.9 : 0.36
          }
          transparent
          opacity={0.62}
          roughness={0.22}
          metalness={0.22}
        />
      </mesh>

      {/* UI header */}
      <TechnicalRail
        position={[-0.3, 0.12, 0.295]}
        width={1.42}
        opacity={active ? 0.72 : 0.34}
      />

      {/* UI lower trace */}
      <TechnicalRail
        position={[0.24, -0.13, 0.3]}
        width={0.88}
        opacity={active ? 0.48 : 0.2}
      />

      {/* UI control points */}
      <SignalDot
        position={[-0.93, 0.12, 0.315]}
        opacity={active ? 1 : 0.5}
      />

      <SignalDot
        position={[0.88, -0.13, 0.315]}
        scale={0.72}
        opacity={active ? 0.82 : 0.34}
      />

      {/* corner rail */}
      <mesh
        position={[-1.17, -0.05, 0.305]}
      >
        <boxGeometry
          args={[0.012, 0.28, 0.012]}
        />

        <meshBasicMaterial
          color="#7c6cf2"
          transparent
          opacity={active ? 0.55 : 0.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   02 — APPLICATION
   Processing chassis + computational core
   ========================================================= */

function ApplicationAssembly({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const ringARef =
    useRef<THREE.Mesh>(null);

  const ringBRef =
    useRef<THREE.Mesh>(null);

  const coreRef =
    useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y =
        THREE.MathUtils.damp(
          groupRef.current.rotation.y,
          active ? 0.13 : 0.035,
          4,
          delta,
        );
    }

    if (
      ringARef.current &&
      !reducedMotion
    ) {
      ringARef.current.rotation.z +=
        delta * (active ? 0.42 : 0.11);
    }

    if (
      ringBRef.current &&
      !reducedMotion
    ) {
      ringBRef.current.rotation.x +=
        delta * (active ? -0.26 : -0.07);
    }

    if (coreRef.current) {
      const pulse =
        reducedMotion
          ? 1
          : 1 +
            Math.sin(t * 1.3) *
              (active ? 0.045 : 0.018);

      coreRef.current.scale.setScalar(
        THREE.MathUtils.damp(
          coreRef.current.scale.x,
          pulse,
          5,
          delta,
        ),
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* processing chassis */}
      <mesh>
        <boxGeometry
          args={[2.05, 0.62, 0.26]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.68 : 0.28
          }
          transparent
          opacity={0.46}
          roughness={0.24}
          metalness={0.28}
        />
      </mesh>

      {/* recessed inner bay */}
      <mesh position={[0, 0, 0.17]}>
        <boxGeometry
          args={[1.36, 0.36, 0.05]}
        />

        <meshBasicMaterial
          color="#c0b7ff"
          transparent
          opacity={active ? 0.18 : 0.07}
          depthWrite={false}
        />
      </mesh>

      {/* central processing core */}
      <mesh
        ref={coreRef}
        position={[0, 0, 0.31]}
      >
        <octahedronGeometry
          args={[0.2, 0]}
        />

        <meshStandardMaterial
          color="#c0b7ff"
          emissive="#7c6cf2"
          emissiveIntensity={
            active ? 1.4 : 0.62
          }
          transparent
          opacity={0.86}
          roughness={0.18}
          metalness={0.34}
        />
      </mesh>

      {/* orbital processor ring A */}
      <mesh
        ref={ringARef}
        position={[0, 0, 0.3]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[0.4, 0.012, 8, 64]}
        />

        <meshBasicMaterial
          color="#7c6cf2"
          transparent
          opacity={active ? 0.82 : 0.3}
          depthWrite={false}
        />
      </mesh>

      {/* orbital processor ring B */}
      <mesh
        ref={ringBRef}
        position={[0, 0, 0.3]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <torusGeometry
          args={[0.31, 0.009, 8, 48]}
        />

        <meshBasicMaterial
          color="#83b7ff"
          transparent
          opacity={active ? 0.7 : 0.24}
          depthWrite={false}
        />
      </mesh>

      {/* service rails */}
      <TechnicalRail
        position={[-0.66, 0.17, 0.205]}
        width={0.42}
        opacity={active ? 0.6 : 0.22}
      />

      <TechnicalRail
        position={[0.67, -0.17, 0.205]}
        width={0.44}
        opacity={active ? 0.6 : 0.22}
      />

      <SignalDot
        position={[-0.87, 0.17, 0.22]}
        scale={0.78}
        opacity={active ? 0.9 : 0.4}
      />

      <SignalDot
        position={[0.89, -0.17, 0.22]}
        scale={0.78}
        opacity={active ? 0.9 : 0.4}
      />
    </group>
  );
}

/* =========================================================
   03 — DATA & SERVICES
   Layered persistence / storage assembly
   ========================================================= */

function DataAssembly({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const topRef =
    useRef<THREE.Mesh>(null);

  const bottomRef =
    useRef<THREE.Mesh>(null);

  const signalRef =
    useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y =
        THREE.MathUtils.damp(
          groupRef.current.rotation.y,
          active ? -0.12 : -0.025,
          4,
          delta,
        );
    }

    if (topRef.current) {
      topRef.current.position.y =
        THREE.MathUtils.damp(
          topRef.current.position.y,
          active ? 0.27 : 0.2,
          5,
          delta,
        );
    }

    if (bottomRef.current) {
      bottomRef.current.position.y =
        THREE.MathUtils.damp(
          bottomRef.current.position.y,
          active ? -0.27 : -0.2,
          5,
          delta,
        );
    }

    if (
      signalRef.current &&
      !reducedMotion
    ) {
      const progress =
        (t * (active ? 0.38 : 0.17)) %
        1;

      signalRef.current.position.x =
        -0.72 + progress * 1.44;
    }
  });

  return (
    <group ref={groupRef}>
      {/* storage plates */}
      <mesh
        ref={topRef}
        position={[0, 0.2, 0]}
      >
        <cylinderGeometry
          args={[
            0.88,
            0.88,
            0.11,
            48,
          ]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.62 : 0.26
          }
          transparent
          opacity={0.48}
          roughness={0.25}
          metalness={0.24}
        />
      </mesh>

      <mesh>
        <cylinderGeometry
          args={[
            0.98,
            0.98,
            0.14,
            48,
          ]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.75 : 0.32
          }
          transparent
          opacity={0.6}
          roughness={0.23}
          metalness={0.26}
        />
      </mesh>

      <mesh
        ref={bottomRef}
        position={[0, -0.2, 0]}
      >
        <cylinderGeometry
          args={[
            0.82,
            0.82,
            0.1,
            48,
          ]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.55 : 0.22
          }
          transparent
          opacity={0.4}
          roughness={0.28}
          metalness={0.2}
        />
      </mesh>

      {/* horizontal data bus */}
      <TechnicalRail
        position={[0, 0, 0.55]}
        width={1.55}
        opacity={active ? 0.76 : 0.28}
      />

      <mesh
        ref={signalRef}
        position={[-0.72, 0, 0.57]}
      >
        <sphereGeometry
          args={[0.045, 16, 16]}
        />

        <meshBasicMaterial
          color="#83b7ff"
          transparent
          opacity={active ? 1 : 0.62}
          depthWrite={false}
        />
      </mesh>

      {/* service ports */}
      {[-0.58, 0, 0.58].map(
        (x, index) => (
          <SignalDot
            key={x}
            position={[
              x,
              index === 1 ? 0.17 : -0.17,
              0.46,
            ]}
            scale={0.7}
            opacity={active ? 0.85 : 0.34}
          />
        ),
      )}
    </group>
  );
}

/* =========================================================
   04 — WORKFLOW
   Delivery / deployment pipeline
   ========================================================= */

function WorkflowAssembly({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const runnerRef =
    useRef<THREE.Mesh>(null);

  const gateARef =
    useRef<THREE.Mesh>(null);

  const gateBRef =
    useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y =
        THREE.MathUtils.damp(
          groupRef.current.rotation.y,
          active ? 0.1 : 0.025,
          4,
          delta,
        );
    }

    if (
      runnerRef.current &&
      !reducedMotion
    ) {
      const progress =
        (t * (active ? 0.34 : 0.14)) %
        1;

      runnerRef.current.position.x =
        -1.02 + progress * 2.04;
    }

    if (gateARef.current) {
      gateARef.current.rotation.z =
        THREE.MathUtils.damp(
          gateARef.current.rotation.z,
          active ? 0.08 : 0,
          5,
          delta,
        );
    }

    if (gateBRef.current) {
      gateBRef.current.rotation.z =
        THREE.MathUtils.damp(
          gateBRef.current.rotation.z,
          active ? -0.08 : 0,
          5,
          delta,
        );
    }
  });

  return (
    <group ref={groupRef}>
      {/* structural base */}
      <mesh position={[0, -0.16, 0]}>
        <boxGeometry
          args={[2.55, 0.18, 0.22]}
        />

        <meshStandardMaterial
          color="#d3c8e6"
          emissive="#7766f2"
          emissiveIntensity={
            active ? 0.58 : 0.24
          }
          transparent
          opacity={0.48}
          roughness={0.28}
          metalness={0.25}
        />
      </mesh>

      {/* primary delivery rail */}
      <mesh position={[0, 0.05, 0.18]}>
        <boxGeometry
          args={[2.3, 0.045, 0.055]}
        />

        <meshStandardMaterial
          color="#c0b7ff"
          emissive="#7c6cf2"
          emissiveIntensity={
            active ? 0.95 : 0.38
          }
          transparent
          opacity={0.72}
          roughness={0.2}
          metalness={0.25}
        />
      </mesh>

      {/* parallel secondary rail */}
      <TechnicalRail
        position={[0, 0.22, 0.08]}
        width={1.88}
        opacity={active ? 0.5 : 0.18}
      />

      {/* deployment gates */}
      <mesh
        ref={gateARef}
        position={[-0.64, 0.06, 0.25]}
      >
        <boxGeometry
          args={[0.055, 0.46, 0.055]}
        />

        <meshBasicMaterial
          color="#7c6cf2"
          transparent
          opacity={active ? 0.66 : 0.24}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={gateBRef}
        position={[0.64, 0.06, 0.25]}
      >
        <boxGeometry
          args={[0.055, 0.46, 0.055]}
        />

        <meshBasicMaterial
          color="#7c6cf2"
          transparent
          opacity={active ? 0.66 : 0.24}
          depthWrite={false}
        />
      </mesh>

      {/* travelling delivery signal */}
      <mesh
        ref={runnerRef}
        position={[-1.02, 0.05, 0.25]}
      >
        <sphereGeometry
          args={[0.055, 16, 16]}
        />

        <meshBasicMaterial
          color="#83b7ff"
          transparent
          opacity={0.96}
          depthWrite={false}
        />
      </mesh>

      {/* terminal points */}
      <SignalDot
        position={[-1.14, 0.05, 0.25]}
        scale={0.72}
        opacity={0.55}
      />

      <SignalDot
        position={[1.14, 0.05, 0.25]}
        scale={0.72}
        opacity={0.55}
      />
    </group>
  );
}

/* =========================================================
   EXPORTED ENGINE LAYER
   ========================================================= */

export function ToolkitEngineLayer({
  kind,
  position,
  active,
  reducedMotion,
}: ToolkitEngineLayerProps) {
  const rootRef =
    useRef<THREE.Group>(null);

  const phase = useMemo(() => {
    switch (kind) {
      case 'interface':
        return 0;

      case 'application':
        return 1.35;

      case 'data':
        return 2.7;

      case 'workflow':
        return 4.05;
    }
  }, [kind]);

  const baseScale =
    kind === 'data'
      ? 0.88
      : 1;

  useFrame(({ clock }, delta) => {
    if (!rootRef.current) return;

    const idle =
      reducedMotion
        ? 0
        : Math.sin(
            clock.elapsedTime * 0.42 +
              phase,
          ) * 0.025;

    rootRef.current.position.y =
      THREE.MathUtils.damp(
        rootRef.current.position.y,
        position[1] + idle,
        5,
        delta,
      );

    rootRef.current.position.x =
      THREE.MathUtils.damp(
        rootRef.current.position.x,
        position[0],
        5,
        delta,
      );

    rootRef.current.position.z =
      THREE.MathUtils.damp(
        rootRef.current.position.z,
        active
          ? position[2] + 0.22
          : position[2],
        5,
        delta,
      );

    const targetScale =
      active
        ? baseScale * 1.065
        : baseScale;

    rootRef.current.scale.setScalar(
      THREE.MathUtils.damp(
        rootRef.current.scale.x,
        targetScale,
        5,
        delta,
      ),
    );
  });

  return (
    <group
      ref={rootRef}
      position={position}
      scale={baseScale}
    >
      {kind === 'interface' && (
        <InterfaceAssembly
          active={active}
          reducedMotion={reducedMotion}
        />
      )}

      {kind === 'application' && (
        <ApplicationAssembly
          active={active}
          reducedMotion={reducedMotion}
        />
      )}

      {kind === 'data' && (
        <DataAssembly
          active={active}
          reducedMotion={reducedMotion}
        />
      )}

      {kind === 'workflow' && (
        <WorkflowAssembly
          active={active}
          reducedMotion={reducedMotion}
        />
      )}
    </group>
  );
}