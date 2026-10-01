'use client';

import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';

import type {
  ToolkitConnection as ToolkitConnectionData,
  ToolkitTechnology,
} from './toolkit.types';

type ToolkitConnectionProps = {
  connection: ToolkitConnectionData;
  from: ToolkitTechnology;
  to: ToolkitTechnology;
  activeTechnologyId: string | null;
  relatedTechnologyIds: string[];

  /*
   * Curated architecture-route metadata.
   *
   * A connection can be locally related to the
   * active technology without necessarily being
   * part of its selected end-to-end architecture
   * path.
   */
  isArchitectureConnection: boolean;
  architectureStepIndex: number;
  architectureStepCount: number;
};

function getConnectionColor(
  type: ToolkitConnectionData['type'],
) {
  if (type === 'workflow') {
    return '#72a7ef';
  }

  if (type === 'secondary') {
    return '#9a91d8';
  }

  return '#8f7cf7';
}

function RoutePacket({
  curve,
  color,
  offset,
  speed,
  size,
  opacity,
  active,
  architectureStepIndex = -1,
  architectureStepCount = 0,
  architectureSequence = false,
}: {
  curve: THREE.CatmullRomCurve3;
  color: string;
  offset: number;
  speed: number;
  size: number;
  opacity: number;
  active: boolean;
  architectureStepIndex?: number;
  architectureStepCount?: number;
  architectureSequence?: boolean;
}) {
  const packetRef =
    useRef<THREE.Mesh>(null);

  const haloRef =
    useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time =
      state.clock.elapsedTime;

    let progress = 0;
    let visibility = 1;

    /*
     * ==================================================
     * CURATED ARCHITECTURE PROPAGATION
     * ==================================================
     *
     * Every connection receives the same global clock.
     *
     * Instead of letting every edge animate its own
     * independent packet, the complete architecture path
     * is treated as one continuous virtual route.
     *
     * Example with five connections:
     *
     * 0 → 1 → 2 → 3 → 4
     *
     * A global route position travels from 0 to 5.
     * Only the connection whose interval currently owns
     * that position displays the packet.
     *
     * This creates one signal that appears to travel
     * continuously through the full stack.
     * ==================================================
     */
    if (
      architectureSequence &&
      architectureStepIndex >= 0 &&
      architectureStepCount > 0
    ) {
      const routeDuration = 5.6;

      const globalRouteProgress =
        ((time + offset) %
          routeDuration) /
        routeDuration;

      const routePosition =
        globalRouteProgress *
        architectureStepCount;

      const localProgress =
        routePosition -
        architectureStepIndex;

      const isCurrentStep =
        localProgress >= 0 &&
        localProgress < 1;

      progress = THREE.MathUtils.clamp(
        localProgress,
        0,
        1,
      );

      /*
       * Fade the packet softly into and out of
       * each connection rather than popping at
       * the boundaries.
       */
      if (isCurrentStep) {
        const fadeIn =
          THREE.MathUtils.smoothstep(
            localProgress,
            0,
            0.12,
          );

        const fadeOut =
          1 -
          THREE.MathUtils.smoothstep(
            localProgress,
            0.88,
            1,
          );

        visibility =
          Math.min(fadeIn, fadeOut);
      } else {
        visibility = 0;
      }
    } else {
      /*
       * Existing independent traffic remains for
       * idle, workflow and local relationship
       * connections.
       */
      progress =
        (time * speed + offset) % 1;

      visibility = 1;
    }

    const point =
      curve.getPointAt(progress);

    if (packetRef.current) {
      packetRef.current.position.copy(
        point,
      );

      const pulse =
        1 +
        Math.sin(
          time * 5 +
            offset * 10,
        ) *
          0.12;

      const targetScale =
        visibility *
        (active ? pulse : 0.78);

      packetRef.current.scale.setScalar(
        THREE.MathUtils.damp(
          packetRef.current.scale.x,
          targetScale,
          10,
          delta,
        ),
      );
    }

    if (haloRef.current) {
      haloRef.current.position.copy(
        point,
      );

      const haloScale =
        visibility *
        (active ? 1.3 : 0.8);

      haloRef.current.scale.setScalar(
        THREE.MathUtils.damp(
          haloRef.current.scale.x,
          haloScale,
          9,
          delta,
        ),
      );
    }
  });

  return (
    <>
      <mesh ref={haloRef}>
        <sphereGeometry
          args={[
            size * 2.7,
            10,
            10,
          ]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={
            active
              ? opacity * 0.16
              : opacity * 0.07
          }
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <mesh ref={packetRef}>
        <sphereGeometry
          args={[size, 14, 14]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>
    </>
  );
}

export function ToolkitConnection({
  connection,
  from,
  to,
  activeTechnologyId,
  relatedTechnologyIds,
  isArchitectureConnection,
  architectureStepIndex,
  architectureStepCount,
}: ToolkitConnectionProps) {
  const routeGroupRef =
    useRef<THREE.Group>(null);

  /*
   * Immediate one-hop relationship.
   *
   * This remains the strongest local response
   * around the technology currently being
   * inspected.
   */
  const isConnectedToActive =
    activeTechnologyId !== null &&
    (connection.from ===
      activeTechnologyId ||
      connection.to ===
        activeTechnologyId);

  /*
   * Wider local relationship context.
   *
   * This is intentionally separate from the
   * curated architecture route.
   */
  const isRelatedConnection =
    activeTechnologyId !== null &&
    relatedTechnologyIds.includes(
      connection.from,
    ) &&
    relatedTechnologyIds.includes(
      connection.to,
    );

  const hasActiveTechnology =
    activeTechnologyId !== null;

  /*
   * Valid ordered architecture step.
   *
   * Scene already resolves the curated path and
   * gives every connection its position within
   * that route.
   */
  const isArchitectureStep =
    hasActiveTechnology &&
    isArchitectureConnection &&
    architectureStepIndex >= 0 &&
    architectureStepIndex <
      architectureStepCount;


  const color =
    getConnectionColor(
      connection.type,
    );

  /*
   * Build a genuinely spatial route.
   *
   * Instead of a single quadratic arc,
   * each connection gets two control
   * points with horizontal/vertical
   * displacement plus a raised Z crest.
   */
  const curve = useMemo(() => {
    const start =
      new THREE.Vector3(
        ...from.position,
      );

    const end =
      new THREE.Vector3(
        ...to.position,
      );

    const delta = end
      .clone()
      .sub(start);

    const distance =
      start.distanceTo(end);

    const perpendicular =
      new THREE.Vector3(
        -delta.y,
        delta.x,
        0,
      );

    if (
      perpendicular.lengthSq() >
      0
    ) {
      perpendicular.normalize();
    }

    const seed =
      connection.id
        .split('')
        .reduce(
          (sum, character) =>
            sum +
            character.charCodeAt(
              0,
            ),
          0,
        );

    const direction =
      seed % 2 === 0 ? 1 : -1;

    const sideBow =
      Math.min(
        distance * 0.075,
        0.28,
      ) * direction;

    const depthLift =
      0.16 +
      Math.min(
        distance * 0.075,
        0.42,
      );

    const controlOne = start
      .clone()
      .lerp(end, 0.32)
      .add(
        perpendicular
          .clone()
          .multiplyScalar(sideBow),
      );

    controlOne.z +=
      depthLift * 0.78;

    const controlTwo = start
      .clone()
      .lerp(end, 0.68)
      .add(
        perpendicular
          .clone()
          .multiplyScalar(
            sideBow * 0.65,
          ),
      );

    controlTwo.z += depthLift;

    return new THREE.CatmullRomCurve3(
      [
        start,
        controlOne,
        controlTwo,
        end,
      ],
      false,
      'catmullrom',
      0.45,
    );
  }, [
    connection.id,
    from.position,
    to.position,
  ]);

  const linePoints = useMemo(
    () => curve.getPoints(48),
    [curve],
  );

  /*
   * A real tube is only rendered for
   * routes participating in the current
   * active architecture.
   *
   * Idle routes remain lightweight Lines.
   */
  const tubeGeometry =
    useMemo(
      () =>
        new THREE.TubeGeometry(
          curve,
          48,
          0.008,
          6,
          false,
        ),
      [curve],
    );

  useFrame((_, delta) => {
    if (!routeGroupRef.current) {
      return;
    }

    /*
     * Spatial hierarchy:
     *
     * direct local connection
     *      → highest
     *
     * curated architecture route
     *      → raised as one coherent system
     *
     * local relationship context
     *      → shallow lift
     *
     * unrelated architecture
     *      → base plane
     */
    const targetZ =
      isConnectedToActive
        ? 0.12
        : isArchitectureStep
          ? 0.075
          : isRelatedConnection
            ? 0.025
            : 0;

    routeGroupRef.current.position.z =
      THREE.MathUtils.damp(
        routeGroupRef.current
          .position.z,
        targetZ,
        6,
        delta,
      );
  });

/*
 * ======================================================
 * ROUTE VISUAL HIERARCHY
 * ======================================================
 *
 * Idle:
 *   the architecture should be understandable without
 *   requiring interaction.
 *
 * Active:
 *   direct relationships become the dominant route.
 *
 * Related:
 *   remain visible as the wider architecture context.
 *
 * Unrelated:
 *   recede deeply so the selected path can breathe.
 * ======================================================
 */

  const idleOpacity =
    connection.type === 'primary'
      ? 0.3
      : connection.type ===
          'workflow'
        ? 0.2
        : 0.15;

  /*
   * Route visibility hierarchy.
   *
   * Direct relationships remain strongest.
   * The curated architecture path becomes the
   * second visual layer.
   * Other local relationships remain contextual.
   */
  const lineOpacity =
    !hasActiveTechnology
      ? idleOpacity
      : isConnectedToActive
        ? 0.98
        : isArchitectureStep
          ? 0.72
          : isRelatedConnection
            ? 0.3
            : 0.018;

  const lineWidth =
    isConnectedToActive
      ? 1.7
      : isArchitectureStep
        ? 1.22
        : isRelatedConnection
          ? 0.82
          : connection.type ===
              'primary'
            ? 0.82
            : connection.type ===
                'workflow'
              ? 0.64
              : 0.56;

  /*
   * Architecture routes always carry traffic
   * while active, even when an individual edge
   * is several hops away from the hovered node.
   */
  /*
   * ======================================================
   * TRAFFIC VISIBILITY
   * ======================================================
   *
   * No active technology:
   *   retain the quiet ambient system traffic.
   *
   * Active technology:
   *   only the curated architecture path receives
   *   moving packets.
   *
   * Immediate and related connections remain visible
   * through their lines/conduits, but they no longer
   * generate independent packet traffic.
   *
   * This prevents highly connected technologies such
   * as React from becoming a cluster of overlapping
   * additive particles.
   * ======================================================
   */
  const showTraffic =
    !hasActiveTechnology
      ? connection.animated
      : isArchitectureStep;

  const packetOpacity =
    isArchitectureStep
      ? isConnectedToActive
        ? 0.98
        : 0.76
      : 0.28;

  return (
    <group ref={routeGroupRef}>
      {/* ==================================================== */}
      {/* BASE ARCHITECTURE ROUTE                              */}
      {/* ==================================================== */}

      <Line
        points={linePoints}
        color={color}
        transparent
        opacity={lineOpacity}
        lineWidth={lineWidth}
        depthWrite={false}
      />

      {/* ==================================================== */}
      {/* ACTIVE VOLUMETRIC CONDUIT                            */}
      {/* ==================================================== */}

      {isArchitectureStep && (
        <mesh geometry={tubeGeometry}>
          <meshBasicMaterial
            color={
              isConnectedToActive
                ? '#9b8cff'
                : '#8f86f7'
            }
            transparent
            opacity={
              isConnectedToActive
                ? 0.18
                : 0.12
            }
            depthWrite={false}
            blending={
              THREE.AdditiveBlending
            }
          />
        </mesh>
      )}

      {/* ==================================================== */}
      {/* DATA TRAFFIC                                        */}
      {/* ==================================================== */}

      {showTraffic && (
        <>
          {/*
           * ACTIVE ARCHITECTURE
           *
           * During interaction there is only one
           * meaningful moving signal system:
           * the selected curated architecture path.
           *
           * Each edge shares the same global clock
           * and uses architectureStepIndex to hand
           * the signal to the next route segment.
           */}
          {isArchitectureStep && (
            <RoutePacket
              curve={curve}
              color="#d3ccff"
              offset={0}
              speed={0.18}
              size={
                isConnectedToActive
                  ? 0.034
                  : 0.03
              }
              opacity={
                packetOpacity
              }
              active
              architectureSequence
              architectureStepIndex={
                architectureStepIndex
              }
              architectureStepCount={
                architectureStepCount
              }
            />
          )}

          {/*
           * IDLE AMBIENT TRAFFIC
           *
           * Preserve the original subtle sense that
           * the system is alive when nothing is being
           * inspected.
           *
           * As soon as a technology becomes active,
           * this disappears and the curated route
           * becomes the sole animated transmission.
           */}
          {!hasActiveTechnology &&
            connection.animated && (
              <RoutePacket
                curve={curve}
                color={color}
                offset={0}
                speed={0.075}
                size={0.018}
                opacity={0.24}
                active={false}
              />
            )}
        </>
      )}

      {/* ==================================================== */}
      {/* ARCHITECTURE ENDPOINT MARKERS                        */}
      {/* ==================================================== */}

      {/*
       * Endpoint rings now belong only to the
       * curated architecture route.
       *
       * Previously every direct relationship drew
       * these rings, so a hub such as React could
       * accumulate several markers in the exact
       * same position and blow out into white.
       */}
      {isArchitectureStep && (
        <>
          <mesh
            position={from.position}
          >
            <ringGeometry
              args={[
                0.055,
                0.061,
                24,
              ]}
            />

            <meshBasicMaterial
              color="#a89cff"
              transparent
              opacity={0.22}
              side={
                THREE.DoubleSide
              }
              depthWrite={false}
            />
          </mesh>

          <mesh
            position={to.position}
          >
            <ringGeometry
              args={[
                0.055,
                0.061,
                24,
              ]}
            />

            <meshBasicMaterial
              color="#78b2ff"
              transparent
              opacity={0.18}
              side={
                THREE.DoubleSide
              }
              depthWrite={false}
            />
          </mesh>
        </>
      )}
    </group>
  );
}