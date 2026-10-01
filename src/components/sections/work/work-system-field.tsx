'use client';

import {
  useMemo,
  useRef,
} from 'react';
import {
  Canvas,
  useFrame,
} from '@react-three/fiber';
import type { MotionValue } from 'motion/react';
import * as THREE from 'three';

type WorkVariant =
  | 'eventure'
  | 'eatme'
  | 'library-hub';

type WorkSystemFieldProps = {
  variant: WorkVariant;
  active: boolean;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

type FieldSceneProps =
  WorkSystemFieldProps;

type SignalPacket = {
  curveIndex: number;
  offset: number;
  speed: number;
  color: string;
};

const palette = {
  violet: '#7c6cf2',
  lavender: '#a99cff',
  brightLavender: '#d2ccff',
  blue: '#6d9ee8',
  paleBlue: '#a8c7f0',
};

function FieldScene({
  variant,
  active,
  pointerX,
  pointerY,
}: FieldSceneProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const pointFieldRef =
    useRef<THREE.Points>(null);

  const convergenceRef =
    useRef<THREE.Mesh>(null);

  const convergenceGlowRef =
    useRef<THREE.Mesh>(null);

  const outerRingRef =
    useRef<THREE.Mesh>(null);

  const routeMaterialRefs =
    useRef<
      Array<THREE.LineBasicMaterial | null>
    >([]);

  const packetGlowRefs =
    useRef<Array<THREE.Mesh | null>>([]);

  const activityRef =
    useRef(0);

  const curves = useMemo(() => {
    if (variant === 'eatme') {
      return [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            -3.6,
            1.45,
            -0.55,
          ),
          new THREE.Vector3(
            -2.45,
            1.15,
            -0.15,
          ),
          new THREE.Vector3(
            -1.35,
            0.65,
            0.3,
          ),
          new THREE.Vector3(
            -0.45,
            0.2,
            0.7,
          ),
          new THREE.Vector3(
            0,
            0,
            1.05,
          ),
        ]),

        new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            3.5,
            -1.5,
            -0.5,
          ),
          new THREE.Vector3(
            2.45,
            -1.15,
            -0.1,
          ),
          new THREE.Vector3(
            1.3,
            -0.65,
            0.35,
          ),
          new THREE.Vector3(
            0.45,
            -0.2,
            0.72,
          ),
          new THREE.Vector3(
            0,
            0,
            1.05,
          ),
        ]),

        new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            2.8,
            1.6,
            -0.75,
          ),
          new THREE.Vector3(
            2,
            1.15,
            -0.2,
          ),
          new THREE.Vector3(
            1.05,
            0.55,
            0.3,
          ),
          new THREE.Vector3(
            0,
            0,
            1.05,
          ),
        ]),
      ];
    }

    if (variant === 'library-hub') {
      return [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            -3.6,
            1.4,
            -0.6,
          ),
          new THREE.Vector3(
            -2.35,
            1.15,
            -0.15,
          ),
          new THREE.Vector3(
            -1.25,
            0.6,
            0.35,
          ),
          new THREE.Vector3(
            0,
            0,
            1,
          ),
        ]),

        new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            -3.55,
            -1.45,
            -0.55,
          ),
          new THREE.Vector3(
            -2.3,
            -1.1,
            -0.1,
          ),
          new THREE.Vector3(
            -1.2,
            -0.55,
            0.35,
          ),
          new THREE.Vector3(
            0,
            0,
            1,
          ),
        ]),

        new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            3.55,
            1.35,
            -0.55,
          ),
          new THREE.Vector3(
            2.35,
            1.05,
            -0.1,
          ),
          new THREE.Vector3(
            1.2,
            0.5,
            0.35,
          ),
          new THREE.Vector3(
            0,
            0,
            1,
          ),
        ]),
      ];
    }

    return [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          -3.65,
          1.5,
          -0.65,
        ),
        new THREE.Vector3(
          -2.5,
          1.25,
          -0.2,
        ),
        new THREE.Vector3(
          -1.35,
          0.65,
          0.35,
        ),
        new THREE.Vector3(
          -0.5,
          0.2,
          0.72,
        ),
        new THREE.Vector3(
          0,
          0,
          1.05,
        ),
      ]),

      new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          -3.65,
          -1.5,
          -0.6,
        ),
        new THREE.Vector3(
          -2.45,
          -1.2,
          -0.15,
        ),
        new THREE.Vector3(
          -1.3,
          -0.65,
          0.35,
        ),
        new THREE.Vector3(
          -0.45,
          -0.2,
          0.72,
        ),
        new THREE.Vector3(
          0,
          0,
          1.05,
        ),
      ]),

      new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          3.65,
          1.5,
          -0.65,
        ),
        new THREE.Vector3(
          2.5,
          1.25,
          -0.2,
        ),
        new THREE.Vector3(
          1.35,
          0.65,
          0.35,
        ),
        new THREE.Vector3(
          0.5,
          0.2,
          0.72,
        ),
        new THREE.Vector3(
          0,
          0,
          1.05,
        ),
      ]),
    ];
  }, [variant]);

  const routeGeometries = useMemo(
    () =>
      curves.map((curve) =>
        new THREE.BufferGeometry()
          .setFromPoints(
            curve.getPoints(64),
          ),
      ),
    [curves],
  );

  const fieldPoints = useMemo(() => {
    const count =
      variant === 'eatme'
        ? 20
        : 24;

    const positions =
      new Float32Array(count * 3);

    const variantSeed =
      variant === 'eventure'
        ? 3
        : variant === 'eatme'
          ? 19
          : 37;

    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const seed =
        index + variantSeed;

      const angle =
        seed * 2.399963229728653;

      const radius =
        1.35 +
        ((seed * 0.417) % 1) *
          2.7;

      positions[index * 3] =
        Math.cos(angle) * radius;

      positions[index * 3 + 1] =
        Math.sin(angle) *
        radius *
        0.52;

      positions[index * 3 + 2] =
        -1.3 +
        ((seed * 0.673) % 1) *
          2.25;
    }

    return positions;
  }, [variant]);

  const packets =
    useMemo<SignalPacket[]>(() => {
      if (variant === 'eatme') {
        return [
          {
            curveIndex: 0,
            offset: 0,
            speed: 0.085,
            color: palette.lavender,
          },
          {
            curveIndex: 1,
            offset: 0.38,
            speed: 0.075,
            color: palette.violet,
          },
          {
            curveIndex: 2,
            offset: 0.68,
            speed: 0.07,
            color:
              palette.brightLavender,
          },
        ];
      }

      if (
        variant === 'library-hub'
      ) {
        return [
          {
            curveIndex: 0,
            offset: 0,
            speed: 0.065,
            color: palette.blue,
          },
          {
            curveIndex: 1,
            offset: 0.28,
            speed: 0.065,
            color: palette.violet,
          },
          {
            curveIndex: 2,
            offset: 0.56,
            speed: 0.065,
            color: palette.paleBlue,
          },
          {
            curveIndex: 0,
            offset: 0.78,
            speed: 0.06,
            color: palette.lavender,
          },
        ];
      }

      return [
        {
          curveIndex: 0,
          offset: 0,
          speed: 0.08,
          color: palette.violet,
        },
        {
          curveIndex: 1,
          offset: 0.22,
          speed: 0.074,
          color: palette.blue,
        },
        {
          curveIndex: 2,
          offset: 0.44,
          speed: 0.082,
          color: palette.lavender,
        },
        {
          curveIndex: 0,
          offset: 0.66,
          speed: 0.07,
          color: palette.paleBlue,
        },
        {
          curveIndex: 2,
          offset: 0.82,
          speed: 0.076,
          color:
            palette.brightLavender,
        },
      ];
    }, [variant]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    /*
      Smooth activation rather than instantly
      switching between idle and hover.
    */
    activityRef.current =
      THREE.MathUtils.damp(
        activityRef.current,
        active ? 1 : 0,
        4,
        delta,
      );

    const activity =
      activityRef.current;

    const px = pointerX.get();
    const py = pointerY.get();

    /*
      The architecture is always alive, but
      hover increases the spatial response.
    */
    const rotationStrength =
      0.11 + activity * 0.12;

    const positionStrength =
      0.08 + activity * 0.13;

    groupRef.current.rotation.x =
      THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        py * rotationStrength,
        4,
        delta,
      );

    groupRef.current.rotation.y =
      THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        px *
          (rotationStrength + 0.05),
        4,
        delta,
      );

    groupRef.current.position.x =
      THREE.MathUtils.damp(
        groupRef.current.position.x,
        px * positionStrength,
        4,
        delta,
      );

    groupRef.current.position.y =
      THREE.MathUtils.damp(
        groupRef.current.position.y,
        py *
          positionStrength *
          0.65,
        4,
        delta,
      );

    /*
      Routes wake up on hover.
    */
    routeMaterialRefs.current.forEach(
      (material, index) => {
        if (!material) return;

        const idleOpacity =
          index === 1 ? 0.16 : 0.19;

        const activeOpacity =
          index === 1 ? 0.42 : 0.48;

        material.opacity =
          THREE.MathUtils.damp(
            material.opacity,
            idleOpacity +
              activity *
                (activeOpacity -
                  idleOpacity),
            5,
            delta,
          );
      },
    );

    /*
      Depth markers respond independently
      from the primary route network.
    */
    if (pointFieldRef.current) {
      pointFieldRef.current.rotation.z +=
        delta *
        (0.007 +
          activity * 0.009);

      pointFieldRef.current.rotation.y =
        THREE.MathUtils.damp(
          pointFieldRef.current
            .rotation.y,
          px *
            (0.04 +
              activity * 0.09),
          3,
          delta,
        );

      pointFieldRef.current.position.x =
        THREE.MathUtils.damp(
          pointFieldRef.current
            .position.x,
          px * activity * -0.1,
          3,
          delta,
        );

      pointFieldRef.current.position.y =
        THREE.MathUtils.damp(
          pointFieldRef.current
            .position.y,
          py * activity * -0.06,
          3,
          delta,
        );

      const pointMaterial =
        pointFieldRef.current
          .material as THREE.PointsMaterial;

      pointMaterial.opacity =
        THREE.MathUtils.damp(
          pointMaterial.opacity,
          0.28 +
            activity * 0.3,
          4,
          delta,
        );

      pointMaterial.size =
        THREE.MathUtils.damp(
          pointMaterial.size,
          0.025 +
            activity * 0.011,
          4,
          delta,
        );
    }

    /*
      Hover speeds up the data traffic without
      turning it into frantic particle motion.
    */
    const speedMultiplier =
      1 + activity * 0.38;

    packets.forEach(
      (packet, packetIndex) => {
        const mesh =
          packetGlowRefs.current[
            packetIndex
          ];

        if (!mesh) return;

        const progress =
          (
            state.clock.elapsedTime *
              packet.speed *
              speedMultiplier +
            packet.offset
          ) % 1;

        mesh.position.copy(
          curves[
            packet.curveIndex
          ].getPointAt(progress),
        );

        const arrival =
          THREE.MathUtils.smoothstep(
            progress,
            0.7,
            1,
          );

        const scale =
          0.82 +
          arrival * 0.48 +
          activity * 0.2;

        mesh.scale.setScalar(scale);

        const material =
          mesh.material as
            THREE.MeshBasicMaterial;

        material.opacity =
          0.2 +
          activity * 0.2 +
          arrival * 0.12;
      },
    );

    /*
      Pointer proximity to the centre increases
      convergence energy.

      x/y are normalized -1..1 values, so this
      gives us a simple distance field.
    */
    const pointerDistance =
      Math.min(
        1,
        Math.sqrt(
          px * px + py * py,
        ),
      );

    const centreProximity =
      active
        ? 1 - pointerDistance
        : 0;

    const pulse =
      (Math.sin(
        state.clock.elapsedTime *
          (2.1 + activity * 0.8),
      ) +
        1) /
      2;

    if (convergenceRef.current) {
      const scale =
        0.92 +
        pulse * 0.22 +
        activity * 0.14 +
        centreProximity * 0.2;

      convergenceRef.current.scale
        .setScalar(scale);
    }

    if (
      convergenceGlowRef.current
    ) {
      const scale =
        0.95 +
        pulse * 0.28 +
        activity * 0.34 +
        centreProximity * 0.32;

      convergenceGlowRef.current
        .scale.setScalar(scale);

      const material =
        convergenceGlowRef.current
          .material as
            THREE.MeshBasicMaterial;

      material.opacity =
        0.1 +
        pulse * 0.08 +
        activity * 0.16 +
        centreProximity * 0.12;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z +=
        delta *
        (0.08 +
          activity * 0.16);

      const scale =
        1 +
        activity * 0.1 +
        centreProximity * 0.14;

      outerRingRef.current.scale
        .setScalar(scale);

      const material =
        outerRingRef.current
          .material as
            THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.damp(
          material.opacity,
          0.11 +
            activity * 0.15 +
            centreProximity * 0.08,
          4,
          delta,
        );
    }
  });

  const routeColors =
    variant === 'library-hub'
      ? [
          palette.blue,
          palette.violet,
          palette.paleBlue,
        ]
      : variant === 'eatme'
        ? [
            palette.lavender,
            palette.violet,
            palette.blue,
          ]
        : [
            palette.violet,
            palette.blue,
            palette.lavender,
          ];

  return (
    <group ref={groupRef}>
      {/* ROUTE NETWORK */}

      {routeGeometries.map(
        (geometry, index) => (
          <line
            key={`${variant}-route-${index}`}
          >
            <primitive
              object={geometry}
              attach="geometry"
            />

            <lineBasicMaterial
              ref={(material) => {
                routeMaterialRefs.current[
                  index
                ] = material;
              }}
              color={
                routeColors[
                  index %
                    routeColors.length
                ]
              }
              transparent
              opacity={0.19}
              depthWrite={false}
              blending={
                THREE.AdditiveBlending
              }
            />
          </line>
        ),
      )}

      {/* SPATIAL DEPTH FIELD */}

      <points ref={pointFieldRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fieldPoints, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.025}
          color={
            variant ===
            'library-hub'
              ? palette.paleBlue
              : palette.lavender
          }
          transparent
          opacity={0.28}
          sizeAttenuation
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>

      {/* SIGNAL PACKETS */}

      {packets.map(
        (packet, index) => (
          <SignalPacketMesh
            key={`${variant}-signal-${index}`}
            curve={
              curves[
                packet.curveIndex
              ]
            }
            packet={packet}
            active={active}
            activityRef={activityRef}
            glowRef={(mesh) => {
              packetGlowRefs.current[
                index
              ] = mesh;
            }}
          />
        ),
      )}

      {/* PRODUCT CONVERGENCE */}

      <mesh
        ref={outerRingRef}
        position={[0, 0, 1]}
      >
        <ringGeometry
          args={[
            0.29,
            0.305,
            64,
          ]}
        />

        <meshBasicMaterial
          color={palette.blue}
          transparent
          opacity={0.11}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <mesh
        ref={convergenceGlowRef}
        position={[0, 0, 1.02]}
      >
        <ringGeometry
          args={[
            0.17,
            0.225,
            64,
          ]}
        />

        <meshBasicMaterial
          color={palette.violet}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <mesh
        ref={convergenceRef}
        position={[0, 0, 1.05]}
      >
        <sphereGeometry
          args={[0.062, 20, 20]}
        />

        <meshBasicMaterial
          color={
            palette.brightLavender
          }
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>
    </group>
  );
}

function SignalPacketMesh({
  curve,
  packet,
  active,
  activityRef,
  glowRef,
}: {
  curve: THREE.CatmullRomCurve3;
  packet: SignalPacket;
  active: boolean;
  activityRef: React.MutableRefObject<number>;
  glowRef: (
    mesh: THREE.Mesh | null,
  ) => void;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const glowMeshRef =
    useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const activity =
      activityRef.current;

    const speedMultiplier =
      1 + activity * 0.38;

    const progress =
      (
        state.clock.elapsedTime *
          packet.speed *
          speedMultiplier +
        packet.offset
      ) % 1;

    groupRef.current.position.copy(
      curve.getPointAt(progress),
    );

    const arrival =
      THREE.MathUtils.smoothstep(
        progress,
        0.72,
        1,
      );

    groupRef.current.scale
      .setScalar(
        0.9 +
          arrival * 0.28 +
          activity * 0.12,
      );

    if (glowMeshRef.current) {
      const material =
        glowMeshRef.current
          .material as
            THREE.MeshBasicMaterial;

      material.opacity =
        0.15 +
        activity * 0.16 +
        arrival * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* broad coloured halo */}

      <mesh
        ref={(mesh) => {
          glowMeshRef.current = mesh;
          glowRef(mesh);
        }}
      >
        <sphereGeometry
          args={[0.095, 16, 16]}
        />

        <meshBasicMaterial
          color={packet.color}
          transparent
          opacity={
            active ? 0.3 : 0.16
          }
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* secondary cool signal */}

      <mesh>
        <sphereGeometry
          args={[0.055, 16, 16]}
        />

        <meshBasicMaterial
          color={palette.blue}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* crisp luminous core */}

      <mesh>
        <sphereGeometry
          args={[0.026, 14, 14]}
        />

        <meshBasicMaterial
          color={
            palette.brightLavender
          }
          transparent
          opacity={0.98}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>
    </group>
  );
}

export function WorkSystemField({
  variant,
  active,
  pointerX,
  pointerY,
}: WorkSystemFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 6.3],
          fov: 44,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference:
            'high-performance',
        }}
        style={{
          background:
            'transparent',
        }}
      >
        <FieldScene
          variant={variant}
          active={active}
          pointerX={pointerX}
          pointerY={pointerY}
        />
      </Canvas>
    </div>
  );
}