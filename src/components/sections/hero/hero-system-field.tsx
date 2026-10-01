'use client';

import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';

import {
  useEffect,
  useMemo,
  useRef,
} from 'react';

import * as THREE from 'three';

/* ==================================================================
   PUBLIC TYPES
   ================================================================== */

export type HeroSystemLayer =
  | 'interface'
  | 'backend'
  | 'systems'
  | null;

export type HeroSystemPointer = {
  x: number;
  y: number;
  active: boolean;
};

type HeroSystemFieldProps = {
  activeLayer: HeroSystemLayer;
  pointer?: HeroSystemPointer;
  reduceMotion?: boolean | null;
  className?: string;
};

/* ==================================================================
   COLOURS
   ================================================================== */

const COLORS = {
  violet: '#6f5df4',
  violetSoft: '#9b8ff8',
  violetPale: '#d9d3fb',

  blue: '#6d9ee8',
  blueSoft: '#b8d0f5',

  lavender: '#ebe7f6',
  lavenderLight: '#f4f2fb',

  ink: '#101116',
};

/* ==================================================================
   HELPERS
   ================================================================== */

function damp(
  current: number,
  target: number,
  smoothing: number,
  delta: number,
) {
  return THREE.MathUtils.damp(
    current,
    target,
    smoothing,
    delta,
  );
}

function dampVector3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  smoothing: number,
  delta: number,
) {
  current.x = damp(
    current.x,
    target.x,
    smoothing,
    delta,
  );

  current.y = damp(
    current.y,
    target.y,
    smoothing,
    delta,
  );

  current.z = damp(
    current.z,
    target.z,
    smoothing,
    delta,
  );
}

function layerIsActive(
  current: HeroSystemLayer,
  layer: Exclude<HeroSystemLayer, null>,
) {
  if (current === 'systems') {
    return true;
  }

  return current === layer;
}

/* ==================================================================
   SIGNAL NODE

   Mesh = a visible Three.js object.
   Geometry = its shape.
   Material = how that shape is rendered.

   Each node contains:
   - a soft halo
   - an outer ring
   - a central core
   ================================================================== */

type SignalNodeProps = {
  position: [number, number, number];
  active: boolean;
  scale?: number;
  color?: string;
  reduceMotion?: boolean | null;
  delay?: number;
};

function SignalNode({
  position,
  active,
  scale = 1,
  color = COLORS.violet,
  reduceMotion,
  delay = 0,
}: SignalNodeProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const haloRef =
    useRef<THREE.Mesh>(null);

  const ringRef =
    useRef<THREE.Mesh>(null);

  const coreRef =
    useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !haloRef.current ||
      !ringRef.current ||
      !coreRef.current
    ) {
      return;
    }

    const elapsed =
      state.clock.elapsedTime + delay;

    /*
     * IMPORTANT:
     * scale remains part of the animated target.
     *
     * In the old implementation the animation eventually
     * overwrote the scale prop.
     */

    const targetScale =
      scale *
      (active
        ? 1.16
        : 0.78);

    const nextScale = damp(
      groupRef.current.scale.x,
      targetScale,
      6,
      delta,
    );

    groupRef.current.scale.setScalar(
      nextScale,
    );

    const haloMaterial =
      haloRef.current
        .material as THREE.MeshBasicMaterial;

    const ringMaterial =
      ringRef.current
        .material as THREE.MeshBasicMaterial;

    const coreMaterial =
      coreRef.current
        .material as THREE.MeshBasicMaterial;

    haloMaterial.opacity = damp(
      haloMaterial.opacity,
      active
        ? 0.095
        : 0.018,
      6,
      delta,
    );

    ringMaterial.opacity = damp(
      ringMaterial.opacity,
      active
        ? 0.72
        : 0.13,
      6,
      delta,
    );

    coreMaterial.opacity = damp(
      coreMaterial.opacity,
      active
        ? 1
        : 0.3,
      6,
      delta,
    );

    if (!reduceMotion && active) {
      const pulse =
        1 +
        Math.sin(elapsed * 2.4) *
          0.1;

      ringRef.current.scale.setScalar(
        pulse,
      );

      haloRef.current.scale.setScalar(
        1 +
          Math.sin(
            elapsed * 1.65,
          ) *
            0.07,
      );
    } else {
      ringRef.current.scale.setScalar(1);
      haloRef.current.scale.setScalar(1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale * 0.78}
    >
      {/* halo */}

      <mesh ref={haloRef}>
        <circleGeometry
          args={[0.25, 40]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.018}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* outer ring */}

      <mesh ref={ringRef}>
        <ringGeometry
          args={[0.105, 0.125, 48]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.13}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* core */}

      <mesh ref={coreRef}>
        <circleGeometry
          args={[0.038, 32]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ==================================================================
   STRUCTURAL LINE
   ================================================================== */

type StructuralLineProps = {
  start: [number, number, number];
  end: [number, number, number];
  active?: boolean;
  color?: string;
  inactiveColor?: string;
  opacity?: number;
  activeOpacity?: number;
};

function StructuralLine({
  start,
  end,
  active = false,
  color = COLORS.violet,
  inactiveColor = COLORS.violetPale,
  opacity = 0.12,
  activeOpacity = 0.72,
}: StructuralLineProps) {
  const lineRef =
    useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const lineGeometry =
      new THREE.BufferGeometry();

    lineGeometry.setFromPoints([
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ]);

    return lineGeometry;
  }, [start, end]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: inactiveColor,
      transparent: true,
      opacity,
      depthWrite: false,
      toneMapped: false,
    });
  }, [inactiveColor, opacity]);

  const lineObject = useMemo(() => {
    return new THREE.Line(
      geometry,
      material,
    );
  }, [geometry, material]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    if (!lineRef.current) {
      return;
    }

    const lineMaterial =
      lineRef.current
        .material as THREE.LineBasicMaterial;

    const targetColor =
      new THREE.Color(
        active
          ? color
          : inactiveColor,
      );

    lineMaterial.color.lerp(
      targetColor,
      Math.min(delta * 8, 1),
    );

    lineMaterial.opacity = damp(
      lineMaterial.opacity,
      active
        ? activeOpacity
        : opacity,
      7,
      delta,
    );
  });

  return (
    <primitive
      ref={lineRef}
      object={lineObject}
    />
  );
}

/* ==================================================================
   CURVED SIGNAL ROUTE

   Instead of moving every signal along a flat straight line,
   the main semantic routes can travel through actual 3D curves.
   ================================================================== */

type CurvedSignalProps = {
  points: [
    number,
    number,
    number
  ][];
  active: boolean;
  color?: string;
  speed?: number;
  offset?: number;
  reduceMotion?: boolean | null;
};

function CurvedSignal({
  points,
  active,
  color = COLORS.violet,
  speed = 0.13,
  offset = 0,
  reduceMotion,
}: CurvedSignalProps) {
  const particleRef =
    useRef<THREE.Mesh>(null);

  const haloRef =
    useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      points.map(
        (point) =>
          new THREE.Vector3(
            ...point,
          ),
      ),
      false,
      'catmullrom',
      0.45,
    );
  }, [points]);

  const curveGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(80),
    );
  }, [curve]);

  const curveMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
  }, [color]);

  const curveObject = useMemo(() => {
    return new THREE.Line(
      curveGeometry,
      curveMaterial,
    );
  }, [
    curveGeometry,
    curveMaterial,
  ]);

  useEffect(() => {
    return () => {
      curveGeometry.dispose();
      curveMaterial.dispose();
    };
  }, [
    curveGeometry,
    curveMaterial,
  ]);

  useFrame((state, delta) => {
    curveMaterial.opacity = damp(
      curveMaterial.opacity,
      active
        ? 0.32
        : 0,
      6,
      delta,
    );

    if (
      !particleRef.current ||
      !haloRef.current
    ) {
      return;
    }

    const particleMaterial =
      particleRef.current
        .material as THREE.MeshBasicMaterial;

    const haloMaterial =
      haloRef.current
        .material as THREE.MeshBasicMaterial;

    particleMaterial.opacity = damp(
      particleMaterial.opacity,
      active
        ? 1
        : 0,
      7,
      delta,
    );

    haloMaterial.opacity = damp(
      haloMaterial.opacity,
      active
        ? 0.12
        : 0,
      7,
      delta,
    );

    if (!active) {
      return;
    }

    const progress = reduceMotion
      ? 0.64
      : (
          state.clock.elapsedTime *
            speed +
          offset
        ) %
        1;

    const position =
      curve.getPointAt(progress);

    particleRef.current.position.copy(
      position,
    );

    haloRef.current.position.copy(
      position,
    );

    if (!reduceMotion) {
      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime *
            5 +
            offset * 10,
        ) *
          0.13;

      haloRef.current.scale.setScalar(
        pulse,
      );
    }
  });

  return (
    <>
      <primitive
        object={curveObject}
      />

      <mesh ref={haloRef}>
        <circleGeometry
          args={[0.12, 28]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={particleRef}>
        <circleGeometry
          args={[0.037, 24]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

/* ==================================================================
   ARCHITECTURE PLANE

   Each plane has a BASE transform and a STATE transform.

   This is where the scene becomes genuinely spatial:
   active layers do not merely change opacity; they physically
   occupy different positions in 3D space.
   ================================================================== */

type ArchitecturePlaneProps = {
  basePosition: [
    number,
    number,
    number
  ];
  baseRotation: [
    number,
    number,
    number
  ];
  size: [number, number];

  state:
    | 'idle'
    | 'focus'
    | 'recede'
    | 'system';

  focusOffset?: [
    number,
    number,
    number
  ];

  systemOffset?: [
    number,
    number,
    number
  ];

  color?: string;
  reduceMotion?: boolean | null;
};

function ArchitecturePlane({
  basePosition,
  baseRotation,
  size,
  state,
  focusOffset = [0, 0, 0.42],
  systemOffset = [0, 0, 0],
  color = COLORS.violet,
  reduceMotion,
}: ArchitecturePlaneProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const surfaceRef =
    useRef<THREE.Mesh>(null);

  const frameRef =
    useRef<THREE.LineSegments>(null);

  const targetPosition =
    useMemo(
      () => new THREE.Vector3(),
      [],
    );

  const edges = useMemo(() => {
    const geometry =
      new THREE.PlaneGeometry(
        size[0],
        size[1],
      );

    const edgeGeometry =
      new THREE.EdgesGeometry(
        geometry,
      );

    geometry.dispose();

    return edgeGeometry;
  }, [size]);

  useEffect(() => {
    return () => {
      edges.dispose();
    };
  }, [edges]);

  useFrame((clockState, delta) => {
    if (
      !groupRef.current ||
      !surfaceRef.current ||
      !frameRef.current
    ) {
      return;
    }

    let offsetX = 0;
    let offsetY = 0;
    let offsetZ = 0;

    let rotationX =
      baseRotation[0];

    let rotationY =
      baseRotation[1];

    let rotationZ =
      baseRotation[2];

    let targetScale = 1;

    let surfaceOpacity = 0.025;
    let frameOpacity = 0.13;

    if (state === 'focus') {
      offsetX = focusOffset[0];
      offsetY = focusOffset[1];
      offsetZ = focusOffset[2];

      rotationX += 0.012;
      rotationY -= 0.035;

      targetScale = 1.045;

      surfaceOpacity = 0.09;
      frameOpacity = 0.62;
    }

    if (state === 'recede') {
      offsetZ = -0.32;
      offsetX = 0.08;

      rotationY += 0.018;

      targetScale = 0.965;

      surfaceOpacity = 0.012;
      frameOpacity = 0.065;
    }

    if (state === 'system') {
      offsetX =
        systemOffset[0];

      offsetY =
        systemOffset[1];

      offsetZ =
        systemOffset[2];

      rotationY +=
        systemOffset[0] * 0.025;

      targetScale = 1.015;

      surfaceOpacity = 0.065;
      frameOpacity = 0.46;
    }

    const drift =
      !reduceMotion
        ? Math.sin(
            clockState.clock
              .elapsedTime *
              0.42 +
              basePosition[2] *
                1.7,
          ) * 0.018
        : 0;

    targetPosition.set(
      basePosition[0] +
        offsetX,
      basePosition[1] +
        offsetY +
        drift,
      basePosition[2] +
        offsetZ,
    );

    dampVector3(
      groupRef.current.position,
      targetPosition,
      5.2,
      delta,
    );

    groupRef.current.rotation.x =
      damp(
        groupRef.current.rotation.x,
        rotationX,
        5,
        delta,
      );

    groupRef.current.rotation.y =
      damp(
        groupRef.current.rotation.y,
        rotationY,
        5,
        delta,
      );

    groupRef.current.rotation.z =
      damp(
        groupRef.current.rotation.z,
        rotationZ,
        5,
        delta,
      );

    const nextScale = damp(
      groupRef.current.scale.x,
      targetScale,
      5,
      delta,
    );

    groupRef.current.scale.setScalar(
      nextScale,
    );

    const surfaceMaterial =
      surfaceRef.current
        .material as THREE.MeshBasicMaterial;

    const frameMaterial =
      frameRef.current
        .material as THREE.LineBasicMaterial;

    surfaceMaterial.opacity = damp(
      surfaceMaterial.opacity,
      surfaceOpacity,
      6,
      delta,
    );

    frameMaterial.opacity = damp(
      frameMaterial.opacity,
      frameOpacity,
      6,
      delta,
    );
  });

  return (
    <group
      ref={groupRef}
      position={basePosition}
      rotation={baseRotation}
    >
      <mesh ref={surfaceRef}>
        <planeGeometry
          args={size}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.025}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <lineSegments
        ref={frameRef}
        geometry={edges}
      >
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.13}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

/* ==================================================================
   DEPTH GRID

   The grid sits behind the architecture and reacts to the current
   state. It gives the eye a fixed depth reference, which makes camera
   movement and plane separation much easier to perceive.
   ================================================================== */

function DepthGrid({
  activeLayer,
  reduceMotion,
}: {
  activeLayer: HeroSystemLayer;
  reduceMotion?: boolean | null;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const materialRef =
    useRef<THREE.LineBasicMaterial>(
      null,
    );

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];

    const width = 8.4;
    const height = 6.7;

    const columns = 9;
    const rows = 8;

    for (
      let index = 0;
      index <= columns;
      index += 1
    ) {
      const x =
        -width / 2 +
        (width / columns) *
          index;

      points.push(
        new THREE.Vector3(
          x,
          -height / 2,
          0,
        ),
        new THREE.Vector3(
          x,
          height / 2,
          0,
        ),
      );
    }

    for (
      let index = 0;
      index <= rows;
      index += 1
    ) {
      const y =
        -height / 2 +
        (height / rows) *
          index;

      points.push(
        new THREE.Vector3(
          -width / 2,
          y,
          0,
        ),
        new THREE.Vector3(
          width / 2,
          y,
          0,
        ),
      );
    }

    const gridGeometry =
      new THREE.BufferGeometry();

    gridGeometry.setFromPoints(points);

    return gridGeometry;
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !materialRef.current
    ) {
      return;
    }

    const systemMode =
      activeLayer === 'systems';

    materialRef.current.opacity = damp(
      materialRef.current.opacity,
      systemMode
        ? 0.095
        : activeLayer
          ? 0.055
          : 0.032,
      5,
      delta,
    );

    const targetZ =
      systemMode
        ? -1.75
        : -1.48;

    groupRef.current.position.z = damp(
      groupRef.current.position.z,
      targetZ,
      4.5,
      delta,
    );

    if (!reduceMotion) {
      groupRef.current.rotation.z =
        damp(
          groupRef.current.rotation.z,
          -0.025 +
            Math.sin(
              state.clock
                .elapsedTime *
                0.16,
            ) *
              0.004,
          3,
          delta,
        );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[
        0.35,
        0.05,
        -1.48,
      ]}
      rotation={[
        0.02,
        -0.03,
        -0.025,
      ]}
    >
      <lineSegments
        geometry={geometry}
      >
        <lineBasicMaterial
          ref={materialRef}
          color={COLORS.violet}
          transparent
          opacity={0.032}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

/* ==================================================================
   DEPTH MARKERS

   A few restrained geometric anchors reinforce the idea that this
   is a spatial system without adding generic particles.
   ================================================================== */

function DepthMarkers({
  activeLayer,
  reduceMotion,
}: {
  activeLayer: HeroSystemLayer;
  reduceMotion?: boolean | null;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const targetRotation =
      activeLayer === 'systems'
        ? 0.08
        : 0.025;

    groupRef.current.rotation.z =
      damp(
        groupRef.current.rotation.z,
        targetRotation,
        3,
        delta,
      );

    if (!reduceMotion) {
      groupRef.current.position.y =
        damp(
          groupRef.current.position.y,
          Math.sin(
            state.clock.elapsedTime *
              0.3,
          ) * 0.035,
          2.5,
          delta,
        );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        position={[
          2.95,
          1.62,
          -0.9,
        ]}
      >
        <ringGeometry
          args={[0.48, 0.5, 64]}
        />

        <meshBasicMaterial
          color={COLORS.violet}
          transparent
          opacity={
            activeLayer === 'systems'
              ? 0.11
              : 0.035
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        position={[
          3.58,
          1.62,
          -0.9,
        ]}
      >
        <planeGeometry
          args={[0.055, 1]}
        />

        <meshBasicMaterial
          color={COLORS.violet}
          transparent
          opacity={
            activeLayer === 'systems'
              ? 0.11
              : 0.035
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ==================================================================
   ARCHITECTURE SYSTEM

   Three semantic layers:

   INTERFACE
       foreground / product surface

   APPLICATION
       services / product logic

   SYSTEM
       data + connected architecture

   The "systems" state explodes the architecture so all three layers
   can be understood together.
   ================================================================== */

function ArchitectureSystem({
  activeLayer,
  reduceMotion,
}: {
  activeLayer: HeroSystemLayer;
  reduceMotion?: boolean | null;
}) {
  const interfaceActive =
    layerIsActive(
      activeLayer,
      'interface',
    );

  const applicationActive =
    layerIsActive(
      activeLayer,
      'backend',
    );

  const systemActive =
    activeLayer === 'systems';

  const anyActive =
    activeLayer !== null;

  /*
   * Semantic node positions.
   *
   * Notice that Z changes across the route.
   * That's actual scene depth.
   */

  const interfaceInput: [
    number,
    number,
    number
  ] = [-2.8, 1.25, 0.82];

  const interfaceState: [
    number,
    number,
    number
  ] = [-1.45, 0.72, 0.62];

  const productCore: [
    number,
    number,
    number
  ] = [-0.05, 0.2, 0.18];

  const serviceNode: [
    number,
    number,
    number
  ] = [1.25, -0.2, -0.32];

  const dataNode: [
    number,
    number,
    number
  ] = [2.7, -1.1, -0.9];

  const upperSystemNode: [
    number,
    number,
    number
  ] = [2.45, 1.42, -0.68];

  const lowerSystemNode: [
    number,
    number,
    number
  ] = [-1.9, -1.5, -0.35];

  const interfacePlaneState:
    | 'idle'
    | 'focus'
    | 'recede'
    | 'system' =
    activeLayer === 'interface'
      ? 'focus'
      : activeLayer === 'backend'
        ? 'recede'
        : activeLayer === 'systems'
          ? 'system'
          : 'idle';

  const applicationPlaneState:
    | 'idle'
    | 'focus'
    | 'recede'
    | 'system' =
    activeLayer === 'backend'
      ? 'focus'
      : activeLayer === 'interface'
        ? 'recede'
        : activeLayer === 'systems'
          ? 'system'
          : 'idle';

  const dataPlaneState:
    | 'idle'
    | 'focus'
    | 'recede'
    | 'system' =
    activeLayer === 'systems'
      ? 'system'
      : activeLayer === 'backend'
        ? 'focus'
        : activeLayer === 'interface'
          ? 'recede'
          : 'idle';

  return (
    <group>
      {/* ======================================================
          PLANES
          ====================================================== */}

      <ArchitecturePlane
        basePosition={[
          -0.72,
          0.48,
          0.58,
        ]}
        baseRotation={[
          0.015,
          -0.055,
          -0.025,
        ]}
        size={[4.75, 3.6]}
        state={interfacePlaneState}
        focusOffset={[
          -0.14,
          0.08,
          0.48,
        ]}
        systemOffset={[
          -0.34,
          0.18,
          0.48,
        ]}
        color={COLORS.violet}
        reduceMotion={reduceMotion}
      />

      <ArchitecturePlane
        basePosition={[
          0.58,
          0.02,
          -0.18,
        ]}
        baseRotation={[
          -0.01,
          0.045,
          0.018,
        ]}
        size={[4.8, 3.55]}
        state={applicationPlaneState}
        focusOffset={[
          0.08,
          0,
          0.4,
        ]}
        systemOffset={[
          0.12,
          -0.02,
          0,
        ]}
        color={COLORS.violetSoft}
        reduceMotion={reduceMotion}
      />

      <ArchitecturePlane
        basePosition={[
          1.18,
          -0.18,
          -0.88,
        ]}
        baseRotation={[
          0.025,
          -0.025,
          -0.015,
        ]}
        size={[4.55, 3.4]}
        state={dataPlaneState}
        focusOffset={[
          0.12,
          -0.05,
          0.32,
        ]}
        systemOffset={[
          0.42,
          -0.2,
          -0.46,
        ]}
        color={COLORS.blue}
        reduceMotion={reduceMotion}
      />

      {/* ======================================================
          MAIN ROUTE
          ====================================================== */}

      <StructuralLine
        start={interfaceInput}
        end={interfaceState}
        active={
          interfaceActive ||
          systemActive
        }
        color={COLORS.violet}
        opacity={0.1}
        activeOpacity={0.78}
      />

      <StructuralLine
        start={interfaceState}
        end={productCore}
        active={
          interfaceActive ||
          systemActive
        }
        color={COLORS.violet}
        opacity={0.1}
        activeOpacity={0.78}
      />

      <StructuralLine
        start={productCore}
        end={serviceNode}
        active={
          applicationActive ||
          systemActive
        }
        color={COLORS.violetSoft}
        opacity={0.1}
        activeOpacity={0.78}
      />

      <StructuralLine
        start={serviceNode}
        end={dataNode}
        active={
          applicationActive ||
          systemActive
        }
        color={COLORS.blue}
        opacity={0.1}
        activeOpacity={0.74}
      />

      {/* ======================================================
          CROSS-LAYER ROUTES
          ====================================================== */}

      <StructuralLine
        start={productCore}
        end={upperSystemNode}
        active={systemActive}
        color={COLORS.violet}
        opacity={0.055}
        activeOpacity={0.54}
      />

      <StructuralLine
        start={productCore}
        end={lowerSystemNode}
        active={systemActive}
        color={COLORS.violetSoft}
        opacity={0.05}
        activeOpacity={0.5}
      />

      <StructuralLine
        start={lowerSystemNode}
        end={dataNode}
        active={systemActive}
        color={COLORS.blue}
        opacity={0.05}
        activeOpacity={0.5}
      />

      <StructuralLine
        start={upperSystemNode}
        end={dataNode}
        active={systemActive}
        color={COLORS.blue}
        opacity={0.04}
        activeOpacity={0.42}
      />

      {/* ======================================================
          NODES
          ====================================================== */}

      <SignalNode
        position={interfaceInput}
        active={interfaceActive}
        color={COLORS.violet}
        scale={0.9}
        reduceMotion={reduceMotion}
      />

      <SignalNode
        position={interfaceState}
        active={
          interfaceActive ||
          systemActive
        }
        color={COLORS.violet}
        scale={0.72}
        reduceMotion={reduceMotion}
        delay={0.25}
      />

      <SignalNode
        position={productCore}
        active={anyActive}
        color={COLORS.violet}
        scale={1.16}
        reduceMotion={reduceMotion}
        delay={0.5}
      />

      <SignalNode
        position={serviceNode}
        active={
          applicationActive ||
          systemActive
        }
        color={COLORS.violetSoft}
        scale={0.92}
        reduceMotion={reduceMotion}
        delay={0.75}
      />

      <SignalNode
        position={dataNode}
        active={
          applicationActive ||
          systemActive
        }
        color={COLORS.blue}
        scale={1}
        reduceMotion={reduceMotion}
        delay={1}
      />

      <SignalNode
        position={upperSystemNode}
        active={systemActive}
        color={COLORS.violet}
        scale={0.68}
        reduceMotion={reduceMotion}
        delay={1.25}
      />

      <SignalNode
        position={lowerSystemNode}
        active={systemActive}
        color={COLORS.blue}
        scale={0.66}
        reduceMotion={reduceMotion}
        delay={1.5}
      />

      {/* ======================================================
          SEMANTIC 3D SIGNALS
          ====================================================== */}

      <CurvedSignal
        points={[
          interfaceInput,
          [
            -2.25,
            1.18,
            0.9,
          ],
          interfaceState,
          [
            -0.72,
            0.44,
            0.46,
          ],
          productCore,
        ]}
        active={
          interfaceActive ||
          systemActive
        }
        color={COLORS.violet}
        speed={0.16}
        reduceMotion={reduceMotion}
      />

      <CurvedSignal
        points={[
          productCore,
          [
            0.5,
            0.1,
            -0.02,
          ],
          serviceNode,
          [
            1.9,
            -0.58,
            -0.58,
          ],
          dataNode,
        ]}
        active={
          applicationActive ||
          systemActive
        }
        color={COLORS.blue}
        speed={0.135}
        offset={0.32}
        reduceMotion={reduceMotion}
      />

      <CurvedSignal
        points={[
          interfaceState,
          productCore,
          [
            0.8,
            0.52,
            -0.18,
          ],
          upperSystemNode,
        ]}
        active={systemActive}
        color={COLORS.violetSoft}
        speed={0.11}
        offset={0.62}
        reduceMotion={reduceMotion}
      />

      <CurvedSignal
        points={[
          productCore,
          [
            -0.55,
            -0.72,
            -0.05,
          ],
          lowerSystemNode,
          [
            0.6,
            -1.55,
            -0.55,
          ],
          dataNode,
        ]}
        active={systemActive}
        color={COLORS.blue}
        speed={0.105}
        offset={0.15}
        reduceMotion={reduceMotion}
      />
    </group>
  );
}

/* ==================================================================
   CAMERA RIG

   Camera = the visitor's viewpoint into the Three.js world.

   We deliberately receive pointer coordinates from the DOM Hero
   instead of asking the WebGL canvas to capture pointer events.

   pointer.x / pointer.y arrive as percentages (0 -> 100).
   Here they are converted to -1 -> +1.
   ================================================================== */

function CameraRig({
  activeLayer,
  pointer,
  reduceMotion,
}: {
  activeLayer: HeroSystemLayer;
  pointer: HeroSystemPointer;
  reduceMotion?: boolean | null;
}) {
  const { camera } = useThree();

  const lookTarget =
    useMemo(
      () => new THREE.Vector3(),
      [],
    );

  useFrame((_, delta) => {
    const normalizedX =
      pointer.active
        ? THREE.MathUtils.clamp(
            (pointer.x - 50) / 50,
            -1,
            1,
          )
        : 0;

    const normalizedY =
      pointer.active
        ? THREE.MathUtils.clamp(
            (pointer.y - 50) / 50,
            -1,
            1,
          )
        : 0;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 6.8;

    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (!reduceMotion) {
      /*
       * Pointer movement is deliberately stronger than before.
       * Because our planes sit at different Z depths, this camera
       * movement produces genuine perspective/parallax.
       */

      targetX =
        normalizedX * 0.42;

      targetY =
        normalizedY * 0.28;
    }

    if (activeLayer === 'interface') {
      targetX -= 0.16;
      targetY += 0.08;
      targetZ = 6.42;

      lookX = -0.45;
      lookY = 0.2;
      lookZ = 0.42;
    }

    if (activeLayer === 'backend') {
      targetX += 0.1;
      targetY -= 0.02;
      targetZ = 6.58;

      lookX = 0.38;
      lookY = -0.08;
      lookZ = -0.2;
    }

    if (activeLayer === 'systems') {
      /*
       * Pulling the camera backwards reveals the exploded
       * architecture as a whole.
       */

      targetX *= 0.7;
      targetY *= 0.7;
      targetZ = 7.35;

      lookX = 0.15;
      lookY = -0.02;
      lookZ = -0.2;
    }

    camera.position.x = damp(
      camera.position.x,
      targetX,
      4.5,
      delta,
    );

    camera.position.y = damp(
      camera.position.y,
      targetY,
      4.5,
      delta,
    );

    camera.position.z = damp(
      camera.position.z,
      targetZ,
      4.5,
      delta,
    );

    lookTarget.x = damp(
      lookTarget.x,
      lookX,
      4,
      delta,
    );

    lookTarget.y = damp(
      lookTarget.y,
      lookY,
      4,
      delta,
    );

    lookTarget.z = damp(
      lookTarget.z,
      lookZ,
      4,
      delta,
    );

    camera.lookAt(lookTarget);
  });

  return null;
}

/* ==================================================================
   SCENE RIG

   Group = several Three.js objects transformed together.

   This group adds a second, much smaller parallax layer on top of
   the camera motion. The result is depth without a gimmicky tilt.
   ================================================================== */

function SceneRig({
  activeLayer,
  pointer,
  reduceMotion,
  children,
}: {
  activeLayer: HeroSystemLayer;
  pointer: HeroSystemPointer;
  reduceMotion?: boolean | null;
  children: React.ReactNode;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const normalizedX =
      pointer.active
        ? THREE.MathUtils.clamp(
            (pointer.x - 50) / 50,
            -1,
            1,
          )
        : 0;

    const normalizedY =
      pointer.active
        ? THREE.MathUtils.clamp(
            (pointer.y - 50) / 50,
            -1,
            1,
          )
        : 0;

    const pointerRotationY =
      reduceMotion
        ? 0
        : normalizedX * 0.045;

    const pointerRotationX =
      reduceMotion
        ? 0
        : -normalizedY * 0.026;

    const systemRotation =
      activeLayer === 'systems'
        ? -0.018
        : 0;

    groupRef.current.rotation.y =
      damp(
        groupRef.current.rotation.y,
        pointerRotationY +
          systemRotation,
        4,
        delta,
      );

    groupRef.current.rotation.x =
      damp(
        groupRef.current.rotation.x,
        pointerRotationX,
        4,
        delta,
      );

    const targetScale =
      activeLayer === 'systems'
        ? 0.96
        : 1;

    const nextScale = damp(
      groupRef.current.scale.x,
      targetScale,
      4,
      delta,
    );

    groupRef.current.scale.setScalar(
      nextScale,
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0.1, 0, 0]}
    >
      {children}
    </group>
  );
}

/* ==================================================================
   SCENE
   ================================================================== */

function HeroSystemScene({
  activeLayer,
  pointer,
  reduceMotion,
}: {
  activeLayer: HeroSystemLayer;
  pointer: HeroSystemPointer;
  reduceMotion?: boolean | null;
}) {
  return (
    <>
      <CameraRig
        activeLayer={activeLayer}
        pointer={pointer}
        reduceMotion={reduceMotion}
      />

      <SceneRig
        activeLayer={activeLayer}
        pointer={pointer}
        reduceMotion={reduceMotion}
      >
        <DepthGrid
          activeLayer={activeLayer}
          reduceMotion={reduceMotion}
        />

        <DepthMarkers
          activeLayer={activeLayer}
          reduceMotion={reduceMotion}
        />

        <ArchitectureSystem
          activeLayer={activeLayer}
          reduceMotion={reduceMotion}
        />
      </SceneRig>
    </>
  );
}

/* ==================================================================
   PUBLIC COMPONENT
   ================================================================== */

export function HeroSystemField({
  activeLayer,
  pointer = {
    x: 50,
    y: 50,
    active: false,
  },
  reduceMotion,
  className = '',
}: HeroSystemFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      ].join(' ')}
    >
      {/* DOM atmosphere behind WebGL */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_40%,rgba(111,93,244,0.09),transparent_30%),radial-gradient(circle_at_82%_68%,rgba(109,158,232,0.065),transparent_27%)]" />

      {/* restrained structural rails */}

      <div className="absolute bottom-[7%] right-[5%] top-[7%] w-px bg-gradient-to-b from-transparent via-soft-violet/[0.13] to-transparent" />

      <div className="absolute right-[4.7%] top-[21%] h-1.5 w-1.5 rounded-full border border-soft-violet/30 bg-soft-lavender" />

      <div className="absolute bottom-[19%] right-[4.7%] h-1.5 w-1.5 rounded-full border border-cool-blue/25 bg-soft-lavender" />

      {/* WebGL */}

      <Canvas
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference:
            'high-performance',
        }}
        camera={{
          position: [0, 0, 6.8],
          fov: 42,
          near: 0.1,
          far: 50,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <HeroSystemScene
          activeLayer={activeLayer}
          pointer={pointer}
          reduceMotion={reduceMotion}
        />
      </Canvas>
    </div>
  );
}