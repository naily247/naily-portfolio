'use client';

import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';

import type {
  ToolkitTechnology,
} from './toolkit.types';
import {
  getTechnologyVisual,
} from './toolkit.visuals';

type ToolkitNodeScreenPosition = {
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

type ToolkitNodeProps = {
  technology: ToolkitTechnology;
  activeTechnologyId: string | null;
  relatedTechnologyIds: string[];
  onActivate: (
    technologyId: string,
  ) => void;
  onDeactivate: () => void;
  onScreenPositionChange?: (
    technologyId: string,
    position: ToolkitNodeScreenPosition,
  ) => void;
};

const nodeConfig = {
  primary: {
    radius: 0.12,
    haloRadius: 0.31,
    labelScale: 1,
    depth: 0.12,
    satellites: 3,
  },

  secondary: {
    radius: 0.092,
    haloRadius: 0.24,
    labelScale: 0.92,
    depth: 0.09,
    satellites: 2,
  },

  supporting: {
    radius: 0.066,
    haloRadius: 0.18,
    labelScale: 0.84,
    depth: 0.065,
    satellites: 0,
  },
} as const;

const accentColors = {
  violet: {
    core: '#9b8cff',
    glow: '#7766f2',
    secondary: '#c0b7ff',
    dark: '#44358f',
  },

  blue: {
    core: '#83b7ff',
    glow: '#6098e8',
    secondary: '#c2dcff',
    dark: '#315f9e',
  },

  neutral: {
    core: '#c9c8d8',
    glow: '#858399',
    secondary: '#f0eff6',
    dark: '#565565',
  },
} as const;

function SatelliteSystem({
  count,
  radius,
  color,
  active,
  hovered,
}: {
  count: number;
  radius: number;
  color: string;
  active: boolean;
  hovered: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  useFrame(
    ({ clock }, delta) => {
      if (!groupRef.current) {
        return;
      }

      groupRef.current.rotation.z +=
        delta *
        (active
          ? 0.55
          : hovered
            ? 0.32
            : 0.11);

      groupRef.current.rotation.x =
        Math.sin(
          clock.elapsedTime * 0.35,
        ) * 0.08;
    },
  );

  if (count === 0) {
    return null;
  }

  return (
    <group
      ref={groupRef}
      rotation={[
        Math.PI * 0.34,
        Math.PI * 0.08,
        0,
      ]}
    >
      {Array.from({
        length: count,
      }).map((_, index) => {
        const angle =
          (index / count) *
          Math.PI *
          2;

        const orbitRadius =
          radius * 2.45;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) *
                orbitRadius,
              Math.sin(angle) *
                orbitRadius,
              0,
            ]}
          >
            <sphereGeometry
              args={[
                radius * 0.16,
                10,
                10,
              ]}
            />

            <meshBasicMaterial
              color={color}
              transparent
              opacity={
                active
                  ? 0.95
                  : hovered
                    ? 0.7
                    : 0.34
              }
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function ToolkitNode({
  technology,
  activeTechnologyId,
  relatedTechnologyIds,
  onActivate,
  onDeactivate,
  onScreenPositionChange,
}: ToolkitNodeProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const bodyRef =
    useRef<THREE.Mesh>(null);

  const reactorRef =
    useRef<THREE.Mesh>(null);

  const haloRef =
    useRef<THREE.Mesh>(null);

  const orbitOneRef =
    useRef<THREE.Mesh>(null);

  const orbitTwoRef =
    useRef<THREE.Mesh>(null);

  const depthPlateRef =
    useRef<THREE.Mesh>(null);

  const chassisRef =
    useRef<THREE.Group>(null);

  const energyRingRef =
    useRef<THREE.Mesh>(null);

  const innerRailRef =
    useRef<THREE.Mesh>(null);

  const signalRef =
    useRef<THREE.Mesh>(null);

  const [hovered, setHovered] =
    useState(false);

  /*
   * Local pointer target.
   *
   * This deliberately does not rotate the whole architecture scene.
   * Each node gets a tiny independent response so the system feels
   * spatial rather than like one flat board following the cursor.
   */
const pointerTarget = useRef({
  x: 0,
  y: 0,
});

/*
 * Reused projection state.
 *
 * No Vector3 allocations inside useFrame and no React state here.
 * The active node reports its actual rendered screen position so
 * the DOM inspector can eventually live beside the 3D object.
 */
const projectedWorldPosition =
  useRef(new THREE.Vector3());

const lastReportedScreenPosition =
  useRef({
    x: Number.NaN,
    y: Number.NaN,

    labelLeft: Number.NaN,
    labelTop: Number.NaN,
    labelRight: Number.NaN,
    labelBottom: Number.NaN,
    labelWidth: Number.NaN,
    labelHeight: Number.NaN,
  });

/*
 * Actual DOM technology-label element rendered by Drei <Html>.
 *
 * This lets the inspector understand the visual footprint of the
 * label instead of pretending that the 3D node is only a point.
 */
const labelElementRef =
  useRef<HTMLDivElement>(null);

  const config =
    nodeConfig[
      technology.nodeSize
    ];

  const colors =
    accentColors[
      technology.accent
    ];

    const technologyVisual =
  getTechnologyVisual(
    technology.name,
  );

const TechnologyIcon =
  technologyVisual.icon;

  if (technology.id === 'react') {
  console.log('REACT TOOLKIT NODE RENDERED', {
    id: technology.id,
    name: technology.name,
    position: technology.position,
  });
}

  const isActive =
    activeTechnologyId ===
    technology.id;

  const hasActiveTechnology =
    activeTechnologyId !== null;

  const isRelated =
    relatedTechnologyIds.includes(
      technology.id,
    );

  const isDimmed =
    hasActiveTechnology &&
    !isActive &&
    !isRelated;

  const phase = useMemo(
    () =>
      technology.position[0] *
        0.71 +
      technology.position[1] *
        0.43 +
      technology.position[2] *
        0.27,
    [technology.position],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    /*
     * ======================================================
     * MOTION CHARACTER
     * ======================================================
     *
     * Idle:
     *   almost stationary
     *
     * Hover:
     *   wakes locally
     *
     * Related:
     *   subtly acknowledges the active route
     *
     * Active:
     *   moves physically toward the viewer
     */

    const activity =
      isActive
        ? 1
        : hovered
          ? 0.72
          : isRelated
            ? 0.38
            : 0;

    const idleAmplitude =
      technology.nodeSize === 'primary'
        ? 0.012
        : technology.nodeSize ===
            'secondary'
          ? 0.008
          : 0.005;

    const idleY =
      Math.sin(
        time * 0.48 + phase,
      ) * idleAmplitude;

    const idleX =
      Math.cos(
        time * 0.36 +
          phase * 0.73,
      ) *
      idleAmplitude *
      0.35;

/*
 * ======================================================
 * SPATIAL FOCUS HIERARCHY
 * ======================================================
 *
 * Selection should reorganise DEPTH, not the XY map.
 *
 * Active:
 *   comes forward clearly, but does not become enormous.
 *
 * Related:
 *   stays close enough to read the architecture route.
 *
 * Unrelated:
 *   sinks into the system so the active route and
 *   inspector receive a protected visual foreground.
 *
 * The original scattered XY architecture is preserved.
 * ======================================================
 */

const depthOffset =
  isActive
    ? 0.42
    : hovered
      ? 0.16
      : isRelated
        ? 0.04
        : hasActiveTechnology
          ? -0.34
          : 0;

const targetX =
  technology.position[0] +
  idleX;

const targetY =
  technology.position[1] +
  idleY;

const targetZ =
  technology.position[2] +
  depthOffset;

/*
 * Active nodes settle slightly faster so the selected
 * module feels intentional rather than floaty.
 *
 * Background nodes recede more softly.
 */
const positionDamping =
  isActive
    ? 7.5
    : isRelated
      ? 6
      : isDimmed
        ? 4.5
        : 5;

groupRef.current.position.x =
  THREE.MathUtils.damp(
    groupRef.current.position.x,
    targetX,
    positionDamping,
    delta,
  );

groupRef.current.position.y =
  THREE.MathUtils.damp(
    groupRef.current.position.y,
    targetY,
    positionDamping,
    delta,
  );

groupRef.current.position.z =
  THREE.MathUtils.damp(
    groupRef.current.position.z,
    targetZ,
    isActive
      ? 8
      : isRelated
        ? 6
        : 5,
    delta,
  );

/*
 * ======================================================
 * PHYSICAL SCALE
 * ======================================================
 *
 * Depth now does most of the visual focusing.
 * We therefore keep scale restrained.
 *
 * This prevents primary nodes such as REST API from
 * becoming giant pills when activated.
 */

const targetScale =
  isActive
    ? 1.08
    : hovered
      ? 1.045
      : isRelated
        ? 1.015
        : isDimmed
          ? 0.9
          : 1;

const scale =
  THREE.MathUtils.damp(
    groupRef.current.scale.x,
    targetScale,
    isActive
      ? 8
      : isDimmed
        ? 4.5
        : 5.5,
    delta,
  );

groupRef.current.scale.setScalar(
  scale,
);

    /*
     * ======================================================
     * LOCAL 3D ATTITUDE
     * ======================================================
     *
     * This is the important difference from simply rotating
     * the entire scene.
     *
     * Hovering one technology gives that object its own
     * physical attitude in world space.
     */

    if (chassisRef.current) {
      const pointerX =
        pointerTarget.current.x;

      const pointerY =
        pointerTarget.current.y;

      const idleRotationX =
        Math.sin(
          time * 0.31 + phase,
        ) * 0.025;

      const idleRotationY =
        Math.cos(
          time * 0.27 +
            phase * 0.7,
        ) * 0.035;

      const targetRotationX =
        idleRotationX +
        pointerY *
          (hovered || isActive
            ? -0.2
            : 0.025);

      const targetRotationY =
        idleRotationY +
        pointerX *
          (hovered || isActive
            ? 0.24
            : 0.03);

      chassisRef.current.rotation.x =
        THREE.MathUtils.damp(
          chassisRef.current.rotation.x,
          targetRotationX,
          6,
          delta,
        );

      chassisRef.current.rotation.y =
        THREE.MathUtils.damp(
          chassisRef.current.rotation.y,
          targetRotationY,
          6,
          delta,
        );

      chassisRef.current.rotation.z =
        THREE.MathUtils.damp(
          chassisRef.current.rotation.z,
          isActive
            ? Math.sin(
                time * 0.45 +
                  phase,
              ) * 0.025
            : 0,
          4,
          delta,
        );
    }

    /*
     * ======================================================
     * DIMENSIONAL BODY
     * ======================================================
     */

    if (bodyRef.current) {
      bodyRef.current.rotation.x +=
        delta *
        (isActive
          ? 0.24
          : hovered
            ? 0.11
            : 0.018);

      bodyRef.current.rotation.y +=
        delta *
        (isActive
          ? 0.34
          : hovered
            ? 0.15
            : 0.026);

      const material =
        bodyRef.current
          .material as THREE.MeshStandardMaterial;

      const targetOpacity =
  isDimmed
    ? 0.28
    : isActive
      ? 0.96
      : isRelated
        ? 0.78
        : hovered
          ? 0.86
          : 0.5;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          targetOpacity,
          6,
          delta,
        );

      material.emissiveIntensity =
        THREE.MathUtils.damp(
          material.emissiveIntensity,
          isActive
            ? 2.15
            : hovered
              ? 1.28
              : isRelated
                ? 0.82
                : isDimmed
                  ? 0.08
                  : 0.32,
          5.5,
          delta,
        );
    }

    /*
     * ======================================================
     * REACTOR
     * ======================================================
     */

    if (reactorRef.current) {
      const frequency =
        isActive
          ? 3.4
          : hovered
            ? 2.3
            : isRelated
              ? 1.8
              : 1.25;

      const strength =
        isActive
          ? 0.14
          : hovered
            ? 0.09
            : isRelated
              ? 0.055
              : 0.03;

      const reactorPulse =
        1 +
        Math.sin(
          time * frequency +
            phase,
        ) *
          strength;

      reactorRef.current.scale.setScalar(
        reactorPulse,
      );

      reactorRef.current.rotation.x +=
        delta *
        (0.12 +
          activity * 0.35);

      reactorRef.current.rotation.y -=
        delta *
        (0.16 +
          activity * 0.46);

      const material =
        reactorRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          isDimmed
            ? 0.1
            : isActive
              ? 1
              : hovered
                ? 0.94
                : isRelated
                  ? 0.84
                  : 0.62,
          6,
          delta,
        );
    }

    /*
     * ======================================================
     * ATMOSPHERIC ENERGY VOLUME
     * ======================================================
     */

    if (haloRef.current) {
      const material =
        haloRef.current
          .material as THREE.MeshBasicMaterial;

      const haloOpacity =
        isActive
          ? 0.22
          : hovered
            ? 0.13
            : isRelated
              ? 0.07
              : isDimmed
                ? 0.004
                : 0.018;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          haloOpacity,
          5,
          delta,
        );

      const haloPulse =
        1 +
        Math.sin(
          time *
            (isActive
              ? 2
              : 1.2) +
            phase,
        ) *
          (isActive
            ? 0.13
            : hovered
              ? 0.075
              : 0.025);

      haloRef.current.scale.setScalar(
        haloPulse,
      );
    }

    /*
     * ======================================================
     * ORBITAL RAILS
     * ======================================================
     */

    if (orbitOneRef.current) {
      orbitOneRef.current.rotation.z +=
        delta *
        (isActive
          ? 0.72
          : hovered
            ? 0.34
            : isRelated
              ? 0.15
              : 0.055);
    }

    if (orbitTwoRef.current) {
      orbitTwoRef.current.rotation.z -=
        delta *
        (isActive
          ? 0.48
          : hovered
            ? 0.25
            : isRelated
              ? 0.11
              : 0.035);
    }

    /*
     * ======================================================
     * INNER ENERGY RAIL
     * ======================================================
     */

    if (innerRailRef.current) {
      innerRailRef.current.rotation.x +=
        delta *
        (0.04 +
          activity * 0.22);

      innerRailRef.current.rotation.y -=
        delta *
        (0.055 +
          activity * 0.28);

      innerRailRef.current.rotation.z +=
        delta *
        (0.035 +
          activity * 0.16);

      const material =
        innerRailRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          isDimmed
            ? 0.015
            : isActive
              ? 0.7
              : hovered
                ? 0.42
                : isRelated
                  ? 0.25
                  : 0.1,
          5,
          delta,
        );
    }

    /*
     * ======================================================
     * ENERGY RING
     * ======================================================
     */

    if (energyRingRef.current) {
      energyRingRef.current.rotation.z -=
        delta *
        (0.08 +
          activity * 0.48);

      const ringPulse =
        1 +
        Math.sin(
          time * 2.1 +
            phase,
        ) *
          (0.018 +
            activity * 0.035);

      energyRingRef.current.scale.setScalar(
        ringPulse,
      );

      const material =
        energyRingRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          isDimmed
            ? 0.01
            : isActive
              ? 0.56
              : hovered
                ? 0.32
                : isRelated
                  ? 0.19
                  : 0.065,
          5,
          delta,
        );
    }

    /*
     * ======================================================
     * SIGNAL BEACON
     * ======================================================
     */

    if (signalRef.current) {
      const signalPulse =
        1 +
        Math.sin(
          time *
            (isActive
              ? 4.4
              : 2.1) +
            phase,
        ) *
          (isActive
            ? 0.22
            : 0.09);

      signalRef.current.scale.setScalar(
        signalPulse,
      );

      const material =
        signalRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          isDimmed
            ? 0.04
            : isActive
              ? 1
              : hovered
                ? 0.82
                : isRelated
                  ? 0.62
                  : 0.34,
          6,
          delta,
        );
    }

    /*
     * ======================================================
     * REAR DEPTH PLATE
     * ======================================================
     */

    if (depthPlateRef.current) {
      const material =
        depthPlateRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          isActive
            ? 0.2
            : hovered
              ? 0.11
              : isRelated
                ? 0.07
                : isDimmed
                  ? 0.003
                  : 0.02,
          5,
          delta,
        );
    }

    /*
     * Slowly return the local pointer attitude to neutral
     * after the cursor leaves the hit volume.
     */

if (!hovered) {
  pointerTarget.current.x =
    THREE.MathUtils.damp(
      pointerTarget.current.x,
      0,
      5,
      delta,
    );

  pointerTarget.current.y =
    THREE.MathUtils.damp(
      pointerTarget.current.y,
      0,
      5,
      delta,
    );
}

/*
 * ======================================================
 * ACTIVE NODE → SCREEN PROJECTION
 * ======================================================
 *
 * Measure only the active technology.
 *
 * getWorldPosition() includes:
 * - the node's animated local position
 * - architecture-layer parallax
 * - parent transforms
 *
 * project(camera) then converts that true world position
 * into normalized device coordinates.
 */
const labelElement =
  labelElementRef.current;

if (labelElement) {
  /*
   * Important:
   *
   * offsetWidth / offsetHeight only describe the
   * element before Drei's transformed Html is placed
   * into the rendered scene.
   *
   * getBoundingClientRect() gives us the literal
   * browser-space rectangle the user is seeing after
   * Drei / CSS / camera transforms have been applied.
   */
  const labelRect =
    labelElement.getBoundingClientRect();

  const labelBounds = {
    left: labelRect.left,
    top: labelRect.top,
    right: labelRect.right,
    bottom: labelRect.bottom,
    width: labelRect.width,
    height: labelRect.height,
  };

  const previous =
    lastReportedScreenPosition.current;

  const nodeMovedEnough =
    !Number.isFinite(previous.x) ||
    !Number.isFinite(previous.y) ||
    Math.abs(
      screenX - previous.x,
    ) > 0.75 ||
    Math.abs(
      screenY - previous.y,
    ) > 0.75;

  const labelMovedEnough =
    !Number.isFinite(
      previous.labelLeft,
    ) ||
    !Number.isFinite(
      previous.labelTop,
    ) ||
    !Number.isFinite(
      previous.labelRight,
    ) ||
    !Number.isFinite(
      previous.labelBottom,
    ) ||
    Math.abs(
      labelBounds.left -
        previous.labelLeft,
    ) > 0.75 ||
    Math.abs(
      labelBounds.top -
        previous.labelTop,
    ) > 0.75 ||
    Math.abs(
      labelBounds.right -
        previous.labelRight,
    ) > 0.75 ||
    Math.abs(
      labelBounds.bottom -
        previous.labelBottom,
    ) > 0.75;

  const labelSizeChanged =
    !Number.isFinite(
      previous.labelWidth,
    ) ||
    !Number.isFinite(
      previous.labelHeight,
    ) ||
    Math.abs(
      labelBounds.width -
        previous.labelWidth,
    ) > 0.5 ||
    Math.abs(
      labelBounds.height -
        previous.labelHeight,
    ) > 0.5;

  if (
    nodeMovedEnough ||
    labelMovedEnough ||
    labelSizeChanged
  ) {
    previous.x = screenX;
    previous.y = screenY;

    previous.labelLeft =
      labelBounds.left;

    previous.labelTop =
      labelBounds.top;

    previous.labelRight =
      labelBounds.right;

    previous.labelBottom =
      labelBounds.bottom;

    previous.labelWidth =
      labelBounds.width;

    previous.labelHeight =
      labelBounds.height;

onScreenPositionChange?.(
  technology.id,
  {
    x: screenX,
    y: screenY,
    labelBounds,
  },
);
  }
}


});

return (
  <group
      ref={groupRef}
      position={
        technology.position
      }
    >
      {/* ==================================================== */}
      {/* REAR DEPTH PLATE                                    */}
      {/* ==================================================== */}

      <mesh
        ref={depthPlateRef}
        position={[
          0,
          0,
          -config.depth * 1.7,
        ]}
      >
        <cylinderGeometry
          args={[
            config.radius * 1.62,
            config.radius * 1.82,
            config.depth,
            24,
            1,
            false,
          ]}
        />

        <meshBasicMaterial
          color={colors.dark}
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>

          <group ref={chassisRef}>

      {/* ==================================================== */}
      {/* ATMOSPHERIC VOLUME                                  */}
      {/* ==================================================== */}

      <mesh ref={haloRef}>
        <sphereGeometry
          args={[
            config.haloRadius,
            20,
            20,
          ]}
        />

        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={0.025}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
          side={THREE.BackSide}
        />
      </mesh>

      {/* ==================================================== */}
      {/* OUTER DIMENSIONAL BODY                               */}
      {/* ==================================================== */}

      <mesh ref={bodyRef}>
        <icosahedronGeometry
          args={[
            config.radius,
            technology.nodeSize ===
            'primary'
              ? 2
              : 1,
          ]}
        />

        <meshStandardMaterial
          color={colors.dark}
          emissive={colors.glow}
          emissiveIntensity={0.38}
          metalness={0.38}
          roughness={0.3}
          transparent
          opacity={0.54}
        />
      </mesh>

      {/* ==================================================== */}
      {/* INNER REACTOR                                       */}
      {/* ==================================================== */}

      <mesh
        ref={reactorRef}
        scale={0.48}
      >
        <icosahedronGeometry
          args={[
            config.radius,
            2,
          ]}
        />

        <meshBasicMaterial
          color={colors.core}
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* tiny white-hot core */}
      <mesh scale={0.17}>
        <sphereGeometry
          args={[
            config.radius,
            14,
            14,
          ]}
        />

        <meshBasicMaterial
          color={
            colors.secondary
          }
          transparent
          opacity={
            isDimmed
              ? 0.12
              : 0.98
          }
          depthWrite={false}
        />
      </mesh>

      {/* ==================================================== */}
      {/* 3D ORBITAL RAIL ONE                                 */}
      {/* ==================================================== */}

      <mesh
        ref={orbitOneRef}
        rotation={[
          Math.PI * 0.33,
          Math.PI * 0.12,
          0,
        ]}
      >
        <torusGeometry
          args={[
            config.radius * 1.75,
            config.radius * 0.025,
            6,
            48,
          ]}
        />

        <meshBasicMaterial
          color={
            colors.secondary
          }
          transparent
          opacity={
            isActive
              ? 0.62
              : hovered
                ? 0.34
                : isRelated
                  ? 0.22
                  : 0.09
          }
          depthWrite={false}
        />
      </mesh>

      {/* ==================================================== */}
      {/* 3D ORBITAL RAIL TWO                                 */}
      {/* ==================================================== */}

      {technology.nodeSize !==
        'supporting' && (
        <mesh
          ref={orbitTwoRef}
          rotation={[
            -Math.PI * 0.2,
            Math.PI * 0.43,
            Math.PI * 0.12,
          ]}
        >
          <torusGeometry
            args={[
              config.radius * 2.08,
              config.radius *
                0.018,
              5,
              48,
            ]}
          />

          <meshBasicMaterial
            color={colors.glow}
            transparent
            opacity={
              isActive
                ? 0.38
                : hovered
                  ? 0.2
                  : 0.055
            }
            depthWrite={false}
          />
        </mesh>
      )}

          {/* ==================================================== */}
    {/* INNER TECHNICAL RAIL                                 */}
    {/* ==================================================== */}

    <mesh
      ref={innerRailRef}
      rotation={[
        Math.PI * 0.52,
        Math.PI * 0.18,
        Math.PI * 0.08,
      ]}
    >
      <torusGeometry
        args={[
          config.radius * 1.28,
          config.radius * 0.018,
          5,
          40,
        ]}
      />

      <meshBasicMaterial
        color={colors.core}
        transparent
        opacity={0.1}
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </mesh>


    {/* ==================================================== */}
    {/* ENERGY EQUATOR                                       */}
    {/* ==================================================== */}

    <mesh
      ref={energyRingRef}
      rotation={[
        Math.PI * 0.5,
        0,
        Math.PI * 0.12,
      ]}
    >
      <torusGeometry
        args={[
          config.radius * 1.48,
          config.radius * 0.032,
          6,
          48,
        ]}
      />

      <meshBasicMaterial
        color={colors.secondary}
        transparent
        opacity={0.065}
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </mesh>


    {/* ==================================================== */}
    {/* FRONT SIGNAL BEACON                                  */}
    {/* ==================================================== */}

    <mesh
      ref={signalRef}
      position={[
        config.radius * 0.72,
        config.radius * 0.68,
        config.radius * 0.92,
      ]}
    >
      <sphereGeometry
        args={[
          config.radius * 0.09,
          10,
          10,
        ]}
      />

      <meshBasicMaterial
        color={colors.secondary}
        transparent
        opacity={0.34}
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </mesh>

      {/* ==================================================== */}
      {/* SATELLITE STATUS NODES                               */}
      {/* ==================================================== */}

    <SatelliteSystem
      count={config.satellites}
      radius={config.radius}
      color={colors.secondary}
      active={isActive}
      hovered={hovered}
    />

    </group>

      {/* ==================================================== */}
      {/* INTERACTIVE HIT VOLUME                               */}
      {/* ==================================================== */}

          <mesh
      onPointerMove={(event) => {
        event.stopPropagation();

        /*
         * Convert the hit point into the node's local space.
         * This gives the chassis a restrained physical
         * response to where the cursor is over the module.
         */

        if (!groupRef.current) {
          return;
        }

        const localPoint =
          groupRef.current.worldToLocal(
            event.point.clone(),
          );

        const influenceRadius =
          Math.max(
            config.radius * 3,
            0.25,
          );

        pointerTarget.current.x =
          THREE.MathUtils.clamp(
            localPoint.x /
              influenceRadius,
            -1,
            1,
          );

        pointerTarget.current.y =
          THREE.MathUtils.clamp(
            localPoint.y /
              influenceRadius,
            -1,
            1,
          );
      }}
      onPointerEnter={(
        event,
      ) => {
          event.stopPropagation();

          setHovered(true);
          onActivate(
            technology.id,
          );

          document.body.style.cursor =
            'pointer';
        }}
        onPointerLeave={(
          event,
        ) => {
          event.stopPropagation();

          setHovered(false);
          onDeactivate();

          document.body.style.cursor =
            '';
        }}
      >
        <sphereGeometry
          args={[
            Math.max(
              config.radius * 3,
              0.25,
            ),
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* ==================================================== */}
      {/* TECHNOLOGY LABEL                                    */}
      {/* ==================================================== */}

<Html
  center
  zIndexRange={[100, 100]}
  position={[
    0,
    -(
      config.radius *
        (isActive ? 2.9 : 3.35) +
      (isActive ? 0.075 : 0.1)
    ),
    0.04,
  ]}
  style={{
    pointerEvents: 'none',
  }}
>
<div
  ref={labelElementRef}
  data-toolkit-technology={technology.id}
className={[
  'relative whitespace-nowrap rounded-full border px-4 py-2',
  'font-sans text-[15px] font-medium tracking-[0.015em]',
  'backdrop-blur-[14px]',
  'transition-[opacity,border-color,background-color,color,box-shadow] duration-300',

    isActive
      ? [
          'border-soft-violet/65',
          'bg-[#f3f0ff]/95',
          'text-[#17151f]',
          'shadow-[0_8px_28px_rgba(82,65,170,0.16),0_0_0_1px_rgba(124,108,242,0.08),0_0_22px_rgba(124,108,242,0.22)]',
        ].join(' ')
      : isRelated
        ? [
            'border-soft-violet/35',
            'bg-[#f4f1ff]/88',
            'text-[#211e2b]/90',
            'shadow-[0_4px_18px_rgba(92,74,174,0.09),0_0_14px_rgba(124,108,242,0.10)]',
          ].join(' ')
        : isDimmed
          ? [
              'border-soft-violet/[0.10]',
              'bg-[#eeeaf8]/55',
              'text-[#292633]/35',
            ].join(' ')
          : hovered
            ? [
                'border-soft-violet/42',
                'bg-[#f4f1ff]/92',
                'text-[#17151f]',
                'shadow-[0_6px_22px_rgba(92,74,174,0.12),0_0_16px_rgba(124,108,242,0.12)]',
              ].join(' ')
            : [
                'border-soft-violet/[0.16]',
                'bg-[#eeeaf8]/72',
                'text-[#292633]/58',
                'shadow-[0_2px_10px_rgba(92,74,174,0.035)]',
              ].join(' '),
  ].join(' ')}
>
<span className="mr-1.5 inline-flex align-middle">
  <TechnologyIcon
    className={[
      'h-[17px] w-[17px]',
      'transition-[opacity,filter] duration-300',
      isActive
        ? 'opacity-100'
        : isRelated
          ? 'opacity-90'
          : isDimmed
            ? 'opacity-35'
            : 'opacity-70',
    ].join(' ')}
    style={{
      color: technologyVisual.color,
      filter: isActive
        ? `drop-shadow(0 0 5px ${technologyVisual.color}66)`
        : undefined,
    }}
  />
</span>

{technology.shortName ??
  technology.name}
        </div>
      </Html>
    </group>
  );
}