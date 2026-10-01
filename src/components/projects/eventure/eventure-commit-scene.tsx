'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import * as THREE from 'three';

import { commitSteps } from './eventure-data';

type EventureCommitSceneProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
};

type PointerState = {
  x: number;
  y: number;
};

type WorldPoint = {
  position: [number, number, number];
  rotationY: number;
  camera: [number, number, number];
  lookAt: [number, number, number];
};

type SceneContentProps = EventureCommitSceneProps & {
  pointerRef: MutableRefObject<PointerState>;
};

/*
 * The important architectural change:
 *
 * These positions NEVER depend on activeIndex.
 * Every Eventure state has a permanent place in the world.
 *
 * activeIndex moves the CAMERA through this world.
 */
const WORLD_POINTS: WorldPoint[] = [
  {
    position: [-8.2, 0.35, 1.2],
    rotationY: 0.12,
    camera: [-8.25, 0.45, 6.15],
    lookAt: [-8.2, 0.2, 1.2],
  },
  {
    position: [-4.7, -0.05, -2.2],
    rotationY: -0.08,
    camera: [-4.9, 0.25, 2.75],
    lookAt: [-4.7, -0.05, -2.2],
  },
  {
    position: [-1.1, 0.5, -5.75],
    rotationY: 0.1,
    camera: [-1.25, 0.7, -0.75],
    lookAt: [-1.1, 0.35, -5.75],
  },
  {
    position: [2.7, -0.25, -9.45],
    rotationY: -0.11,
    camera: [2.55, 0.05, -4.45],
    lookAt: [2.7, -0.2, -9.45],
  },
  {
    position: [6.3, 0.55, -13.15],
    rotationY: 0.12,
    camera: [6.1, 0.8, -8.15],
    lookAt: [6.3, 0.4, -13.15],
  },
  {
    position: [10.2, 0.05, -16.85],
    rotationY: -0.08,
    camera: [10.0, 0.35, -11.85],
    lookAt: [10.2, 0.05, -16.85],
  },
];

/*
 * Small architectural labels that belong to each state.
 * They explain WHY the state matters rather than repeating
 * the lifecycle name.
 */
const STATE_META = [
  {
    eyebrow: 'CUSTOMER INTENT',
    description: 'A service decision becomes a formal request.',
  },
  {
    eyebrow: 'VENDOR RESPONSE',
    description: 'The vendor converts the request into a commercial proposal.',
  },
  {
    eyebrow: 'CUSTOMER ACTION',
    description: 'The proposal becomes an agreement.',
  },
  {
    eyebrow: 'SYSTEM TRANSITION',
    description: 'The accepted quotation becomes a booking.',
  },
  {
    eyebrow: 'ROLE HANDOFF',
    description: 'Payment verification introduces the administrator.',
  },
  {
    eyebrow: 'COMMITMENT ACTIVE',
    description: 'The verified booking becomes operational.',
  },
];

function getWorldPoint(index: number): WorldPoint {
  return WORLD_POINTS[index] ?? WORLD_POINTS[WORLD_POINTS.length - 1];
}

function getScreenSize(texture: THREE.Texture) {
  const image = texture.image as
    | {
        width?: number;
        height?: number;
      }
    | undefined;

  const imageWidth = image?.width ?? 16;
  const imageHeight = image?.height ?? 10;
  const aspect = imageWidth / imageHeight;

  const maxWidth = 4.65;
  const maxHeight = 2.85;

  let width = maxWidth;
  let height = width / aspect;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspect;
  }

  return {
    width,
    height,
  };
}

function CameraRig({
  activeIndex,
  pointerRef,
  reducedMotion,
}: {
  activeIndex: number;
  pointerRef: MutableRefObject<PointerState>;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();

  const currentLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    const point = getWorldPoint(activeIndex);

    camera.position.set(...point.camera);
    currentLookAt.current.set(...point.lookAt);
    camera.lookAt(currentLookAt.current);
  }, []);

  useFrame((_, delta) => {
    const point = getWorldPoint(activeIndex);
    const pointer = pointerRef.current;

    const targetCamera = new THREE.Vector3(...point.camera);
    const targetLookAt = new THREE.Vector3(...point.lookAt);

    /*
     * Pointer movement is intentionally tiny.
     * The lifecycle transition is responsible for the large
     * camera movement; the pointer only adds human presence.
     */
    if (!reducedMotion) {
      targetCamera.x += pointer.x * 0.16;
      targetCamera.y += pointer.y * 0.1;

      targetLookAt.x += pointer.x * 0.08;
      targetLookAt.y += pointer.y * 0.05;
    }

    if (reducedMotion) {
      camera.position.copy(targetCamera);
      currentLookAt.current.copy(targetLookAt);
      camera.lookAt(currentLookAt.current);
      return;
    }

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetCamera.x,
      2.45,
      delta,
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetCamera.y,
      2.45,
      delta,
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetCamera.z,
      2.45,
      delta,
    );

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      targetLookAt.x,
      2.1,
      delta,
    );

    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      targetLookAt.y,
      2.1,
      delta,
    );

    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      targetLookAt.z,
      2.1,
      delta,
    );

    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function InterfaceScreen({
  texture,
  index,
  activeIndex,
  onSelect,
  reducedMotion,
}: {
  texture: THREE.Texture;
  index: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);

  const screenSize = useMemo(() => getScreenSize(texture), [texture]);
  const world = getWorldPoint(index);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    if (!hovered) return;

    document.body.style.cursor = 'pointer';

    return () => {
      document.body.style.cursor = '';
    };
  }, [hovered]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    /*
     * Position is permanent.
     * Only a tiny active/hover emphasis changes.
     */
    const active = index === activeIndex;

    const targetScale = active
      ? hovered
        ? 1.035
        : 1
      : hovered
        ? 0.965
        : 0.94;

    const targetY =
      world.position[1] +
      (!reducedMotion && active
        ? Math.sin(state.clock.elapsedTime * 0.8) * 0.025
        : 0);

    if (reducedMotion) {
      groupRef.current.scale.setScalar(targetScale);
      groupRef.current.position.y = world.position[1];
      return;
    }

    const nextScale = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      5,
      delta,
    );

    groupRef.current.scale.setScalar(nextScale);

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      3.5,
      delta,
    );

    if (screenRef.current) {
      const targetZ = active ? 0.035 : 0;

      screenRef.current.position.z = THREE.MathUtils.damp(
        screenRef.current.position.z,
        targetZ,
        5,
        delta,
      );
    }
  });

  const active = index === activeIndex;

  return (
    <group
      ref={groupRef}
      position={world.position}
      rotation={[0, world.rotationY, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(index);
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = '';
      }}
    >
      {/* soft depth plate */}
      <mesh position={[0, 0, -0.09]}>
        <planeGeometry
          args={[
            screenSize.width + 0.22,
            screenSize.height + 0.22,
          ]}
        />

        <meshBasicMaterial
          color={active ? '#ffffff' : '#ded8eb'}
          transparent
          opacity={active ? 0.98 : 0.72}
          toneMapped={false}
        />
      </mesh>

      {/* interface */}
      <mesh ref={screenRef}>
        <planeGeometry args={[screenSize.width, screenSize.height]} />

        <meshBasicMaterial
          map={texture}
          transparent
          opacity={active ? 1 : 0.72}
          toneMapped={false}
        />
      </mesh>

      {/* active halo */}
      {active && (
        <mesh position={[0, 0, -0.16]}>
          <planeGeometry
            args={[
              screenSize.width + 0.48,
              screenSize.height + 0.48,
            ]}
          />

          <meshBasicMaterial
            color="#6f5df4"
            transparent
            opacity={0.065}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}

function createLine(
  points: THREE.Vector3[],
  color: string,
  opacity: number,
) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
  });

  const line = new THREE.Line(geometry, material);

  return {
    line,
    geometry,
    material,
  };
}

function TransactionRoute({
  activeIndex,
  reducedMotion,
}: {
  activeIndex: number;
  reducedMotion: boolean;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  /*
   * This route is permanent.
   * It does NOT move when activeIndex changes.
   */
  const mainCurve = useMemo(() => {
    const points = WORLD_POINTS.map((point) => {
      return new THREE.Vector3(
        point.position[0],
        point.position[1] - 1.72,
        point.position[2] + 0.2,
      );
    });

    return new THREE.CatmullRomCurve3(
      points,
      false,
      'catmullrom',
      0.35,
    );
  }, []);

  const mainRoute = useMemo(() => {
    return createLine(
      mainCurve.getPoints(180),
      '#6f5df4',
      0.28,
    );
  }, [mainCurve]);

  /*
   * Admin branch:
   * it leaves the commercial route near verification
   * and visually rejoins toward Active.
   */
  const adminCurve = useMemo(() => {
    const verify = WORLD_POINTS[4].position;
    const active = WORLD_POINTS[5].position;

    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(
          verify[0] - 1.25,
          verify[1] - 1.55,
          verify[2] + 0.5,
        ),
        new THREE.Vector3(
          verify[0] + 0.1,
          verify[1] + 1.55,
          verify[2] - 0.15,
        ),
        new THREE.Vector3(
          verify[0] + 1.55,
          verify[1] + 1.8,
          verify[2] - 0.8,
        ),
        new THREE.Vector3(
          active[0] - 0.45,
          active[1] - 1.25,
          active[2] + 0.45,
        ),
      ],
      false,
      'catmullrom',
      0.4,
    );
  }, []);

  const adminRoute = useMemo(() => {
    return createLine(
      adminCurve.getPoints(80),
      '#6d9ee8',
      activeIndex >= 4 ? 0.42 : 0.08,
    );
  }, [adminCurve, activeIndex]);

  useEffect(() => {
    return () => {
      mainRoute.geometry.dispose();
      mainRoute.material.dispose();

      adminRoute.geometry.dispose();
      adminRoute.material.dispose();
    };
  }, [mainRoute, adminRoute]);

  useFrame((_, delta) => {
    if (!pulseRef.current) return;

    /*
     * Pulse moves toward the currently active state instead of
     * endlessly circling the entire route.
     */
    const maxProgress =
      commitSteps.length <= 1
        ? 0
        : activeIndex / (commitSteps.length - 1);

    if (reducedMotion) {
      progressRef.current = maxProgress;
    } else {
      progressRef.current = THREE.MathUtils.damp(
        progressRef.current,
        maxProgress,
        2.4,
        delta,
      );
    }

    const point = mainCurve.getPoint(
      THREE.MathUtils.clamp(progressRef.current, 0, 1),
    );

    pulseRef.current.position.copy(point);
  });

  return (
    <>
      <primitive object={mainRoute.line} />
      <primitive object={adminRoute.line} />

      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.085, 20, 20]} />

        <meshBasicMaterial
          color="#6d9ee8"
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function WorldMarkers({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <>
      {WORLD_POINTS.map((point, index) => {
        const active = index === activeIndex;

        return (
          <group
            key={`marker-${index}`}
            position={[
              point.position[0],
              point.position[1] - 1.9,
              point.position[2] + 0.15,
            ]}
          >
            <mesh>
              <sphereGeometry
                args={[active ? 0.075 : 0.045, 16, 16]}
              />

              <meshBasicMaterial
                color={active ? '#6f5df4' : '#9d94b6'}
                transparent
                opacity={active ? 1 : 0.42}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function AdminVerificationNode({
  activeIndex,
  reducedMotion,
}: {
  activeIndex: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const verify = WORLD_POINTS[4].position;

  const visible = activeIndex >= 4;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetScale = visible ? 1 : 0.01;

    if (reducedMotion) {
      groupRef.current.scale.setScalar(targetScale);
      return;
    }

    const nextScale = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      4,
      delta,
    );

    groupRef.current.scale.setScalar(nextScale);
  });

  return (
    <group
      ref={groupRef}
      position={[
        verify[0] + 1.35,
        verify[1] + 1.65,
        verify[2] - 0.75,
      ]}
      scale={0.01}
    >
      <mesh>
        <circleGeometry args={[0.22, 32]} />

        <meshBasicMaterial
          color="#6d9ee8"
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.13, 0.16, 32]} />

        <meshBasicMaterial
          color="#6d9ee8"
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function SceneContent({
  activeIndex,
  onSelect,
  reducedMotion,
  pointerRef,
}: SceneContentProps) {
  const textureUrls = useMemo(
    () => commitSteps.map((step) => step.image),
    [],
  );

  const textures = useLoader(
    THREE.TextureLoader,
    textureUrls,
  ) as THREE.Texture[];

  return (
    <>
      <CameraRig
        activeIndex={activeIndex}
        pointerRef={pointerRef}
        reducedMotion={reducedMotion}
      />

      <TransactionRoute
        activeIndex={activeIndex}
        reducedMotion={reducedMotion}
      />

      <WorldMarkers activeIndex={activeIndex} />

      <AdminVerificationNode
        activeIndex={activeIndex}
        reducedMotion={reducedMotion}
      />

      {textures.map((texture, index) => (
        <InterfaceScreen
          key={`${commitSteps[index].label}-${index}`}
          texture={texture}
          index={index}
          activeIndex={activeIndex}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
        />
      ))}
    </>
  );
}

function SceneAnnotation({
  activeIndex,
}: {
  activeIndex: number;
}) {
  const meta =
    STATE_META[activeIndex] ??
    STATE_META[STATE_META.length - 1];

  return (
    <div className="pointer-events-none absolute left-6 top-6 z-20 max-w-[300px] sm:left-7 sm:top-7">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-[#6f5df4]" />

        <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#6f5df4] sm:text-[10px]">
          {meta.eyebrow}
        </span>
      </div>

      <p className="mt-2.5 max-w-[280px] text-[12px] leading-[1.55] text-foreground/60 sm:text-[13px]">
        {meta.description}
      </p>
    </div>
  );
}

function SceneDepthIndicator({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute right-5 top-5 z-20 hidden items-center gap-2 sm:flex">
      <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/35">
        Transaction depth
      </span>

      <div className="flex items-center gap-1">
        {commitSteps.map((step, index) => (
          <span
            key={`${step.label}-depth`}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? 'w-4 bg-[#6f5df4]'
                : index < activeIndex
                  ? 'w-1.5 bg-[#6f5df4]/35'
                  : 'w-1.5 bg-foreground/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function EventureCommitScene({
  activeIndex,
  onSelect,
  reducedMotion,
}: EventureCommitSceneProps) {
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
  });

  return (
    <div
      className="relative h-full w-full"
      onPointerMove={(event) => {
        const bounds =
          event.currentTarget.getBoundingClientRect();

        pointerRef.current = {
          x:
            ((event.clientX - bounds.left) /
              bounds.width) *
              2 -
            1,

          y:
            -(
              ((event.clientY - bounds.top) /
                bounds.height) *
                2 -
              1
            ),
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = {
          x: 0,
          y: 0,
        };
      }}
    >
      {/* atmospheric depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] bottom-[5%] h-32 rounded-full bg-[#6f5df4]/[0.065] blur-[60px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[22%] top-[18%] h-40 w-40 rounded-full bg-white/70 blur-[60px]"
      />

      <SceneAnnotation activeIndex={activeIndex} />

      <SceneDepthIndicator activeIndex={activeIndex} />

      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: WORLD_POINTS[0].camera,
          fov: 38,
          near: 0.1,
          far: 90,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'transparent',
        }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[4, 6, 8]}
          intensity={0.9}
        />

        <Suspense fallback={null}>
          <SceneContent
            activeIndex={activeIndex}
            onSelect={onSelect}
            reducedMotion={reducedMotion}
            pointerRef={pointerRef}
          />
        </Suspense>
      </Canvas>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f4f0fa] to-transparent"
      />
    </div>
  );
}