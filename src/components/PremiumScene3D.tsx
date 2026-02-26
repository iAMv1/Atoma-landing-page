import { Environment, OrbitControls, ContactShadows, Float, Points, PointMaterial } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { HeroVehicle } from './canvas/HeroVehicle';
import { PostProcessing } from './canvas/PostProcessing';
import { LightingSetup } from './canvas/LightingSetup';
import { useImmersionStore } from '../stores/useImmersionStore';
import type { PageName } from '../stores/useImmersionStore';

/* ─── Per-page camera configurations ─── */
const PAGE_CAMERAS: Record<PageName, {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  autoRotateSpeed: number;
}> = {
  hero: { position: [0, 1.2, 5.5], lookAt: [0, 0, 0], fov: 45, autoRotateSpeed: 0.4 },
  models: { position: [3.5, 1.3, 4], lookAt: [0, 0.2, 0], fov: 35, autoRotateSpeed: 0.3 },
  technology: { position: [0, 2, 5.5], lookAt: [0, 0.5, 0], fov: 38, autoRotateSpeed: 0.2 },
  experience: { position: [-2.5, 1.5, 4.5], lookAt: [0, 0, 0], fov: 42, autoRotateSpeed: 0.15 },
  reserve: { position: [2, 1, 4], lookAt: [0, 0.1, 0], fov: 32, autoRotateSpeed: 0 },
};

/* ─── Reserve page part-focus camera overrides ─── */
const RESERVE_FOCUS_CAMERAS: Record<string, { position: [number, number, number]; lookAt: [number, number, number]; fov: number }> = {
  body: { position: [3, 1.5, 4], lookAt: [0, 0.3, 0], fov: 30 },  // Full body view, slightly closer
  wheels: { position: [2.5, 0.3, 2], lookAt: [0.8, -0.5, 0], fov: 28 },  // Low angle focused on wheel area
  interior: { position: [1.5, 1.2, 1], lookAt: [0, 0.5, 0], fov: 35 },  // Close-up, peer-inside angle
};

/* ─── Tire Smoke Particle System ─── */
function TireSmoke() {
  const isDrifting = useImmersionStore((s) => s.isDrifting);
  const pointsRef = useRef<THREE.Points>(null!);
  const PARTICLE_COUNT = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2;     // x: spread around car base
      pos[i * 3 + 1] = Math.random() * 0.5 - 0.8;  // y: near ground level
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;  // z: behind car area
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 1] = Math.random() * 0.02 + 0.005;
      vel[i * 3 + 2] = -(Math.random() * 0.05 + 0.01);  // Drift backwards
    }
    return vel;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !isDrifting) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset particles that go too far
      if (arr[i * 3 + 1] > 1.5 || Math.abs(arr[i * 3 + 2]) > 5) {
        arr[i * 3] = (Math.random() - 0.5) * 2;
        arr[i * 3 + 1] = Math.random() * 0.3 - 0.8;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      }
    }
    posAttr.needsUpdate = true;
  });

  if (!isDrifting) return null;

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#aaaaaa"
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ─── Procedural floating geometry for non-hero pages ─── */
function FloatingGeometry({ page }: { page: PageName }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  if (page === 'hero' || page === 'models' || page === 'reserve') return null;

  const colorMap: Record<string, string> = {
    models: '#FF6B35',
    technology: '#00C8FF',
    experience: '#8B5CF6',
    reserve: '#F59E0B',
  };
  const accent = colorMap[page] || '#FF6B35';

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-4, 3, -3]}>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshBasicMaterial color={accent} transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[4, 2.5, -4]}>
          <icosahedronGeometry args={[0.4, 2]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>

      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 5 + Math.random() * 2;
        return (
          <Float key={i} speed={1 + Math.random()} floatIntensity={0.5 + Math.random() * 0.5}>
            <mesh position={[Math.cos(angle) * r, 1 + Math.random() * 3, Math.sin(angle) * r - 3]}>
              <octahedronGeometry args={[0.08 + Math.random() * 0.12, 0]} />
              <meshStandardMaterial
                color={accent}
                emissive={accent}
                emissiveIntensity={2}
                transparent
                opacity={0.5 + Math.random() * 0.3}
              />
            </mesh>
          </Float>
        );
      })}

      <pointLight position={[0, 3, 2]} intensity={6} color={accent} distance={12} />
    </group>
  );
}

/* ─── Animated Camera Controller ─── */
function CameraController() {
  const currentPage = useImmersionStore((s) => s.currentPage);
  const enginePower = useImmersionStore((s) => s.enginePower);
  const activeModelIndex = useImmersionStore((s) => s.activeModelIndex);
  const reserveFocusPart = useImmersionStore((s) => s.reserveFocusPart);
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetFov = useRef(40);
  const lookAtVec = useRef(new THREE.Vector3());

  const modelCameras: [number, number, number][] = [
    [4, 1.8, 5],
    [-3, 0.8, 6],
    [0, 3, 5],
    [5, 1, -3],
  ];

  useFrame(() => {
    let config = PAGE_CAMERAS[currentPage];
    let pos = config.position;
    let look = config.lookAt;
    let fov = config.fov;

    // Model-specific camera on Models page
    if (currentPage === 'models' && modelCameras[activeModelIndex]) {
      pos = modelCameras[activeModelIndex];
    }

    // Reserve part-focus camera overrides
    if (currentPage === 'reserve' && reserveFocusPart) {
      const focusCam = RESERVE_FOCUS_CAMERAS[reserveFocusPart];
      if (focusCam) {
        pos = focusCam.position;
        look = focusCam.lookAt;
        fov = focusCam.fov;
      }
    }

    targetPos.current.set(pos[0], pos[1], pos[2]);
    targetLookAt.current.set(look[0], look[1], look[2]);
    targetFov.current = fov;

    // FOV warp on hero
    const fovTarget = targetFov.current + (currentPage === 'hero' ? enginePower * 0.4 : 0);

    // Smooth lerp
    camera.position.lerp(targetPos.current, 0.04);
    lookAtVec.current.lerp(targetLookAt.current, 0.04);
    camera.lookAt(lookAtVec.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fovTarget, 0.06);
      camera.updateProjectionMatrix();
    }

    // Camera shake on hero with engine
    if (currentPage === 'hero' && enginePower > 10) {
      const shakeIntensity = (enginePower / 100) * 0.06;
      camera.position.x += (Math.random() - 0.5) * shakeIntensity;
      camera.position.y += (Math.random() - 0.5) * shakeIntensity * 0.5;
    }
  });

  return null;
}

export default function PremiumScene3D() {
  const currentPage = useImmersionStore((s) => s.currentPage);
  const isIgnitionOn = useImmersionStore((s) => s.isIgnitionOn);

  const isReserve = currentPage === 'reserve';

  return (
    <Suspense fallback={null}>
      <CameraController />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={isReserve ? 0.3 : 0.8}
        minDistance={isReserve ? 3 : 4}
        maxDistance={isReserve ? 8 : 12}
        autoRotate={!isReserve && currentPage !== 'models'}
        autoRotateSpeed={PAGE_CAMERAS[currentPage].autoRotateSpeed}
      />

      <LightingSetup />
      <Environment preset="sunset" background={false} environmentIntensity={0.6} />

      <HeroVehicle />
      <FloatingGeometry page={currentPage} />
      <TireSmoke />

      {/* Ignition glow */}
      {isIgnitionOn && currentPage === 'hero' && (
        <>
          <pointLight position={[0, 0.5, 2]} intensity={15} color="#ff4400" distance={8} />
          <pointLight position={[0, 0.5, -2]} intensity={10} color="#ff2200" distance={6} />
        </>
      )}

      {/* Contact shadows */}
      <ContactShadows
        resolution={1024}
        scale={15}
        blur={2.5}
        opacity={0.5}
        far={8}
        color="#000000"
      />

      {/* Reflective showroom floor — brighter for dark car visibility */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#1a1a1f"
          metalness={0.85}
          roughness={0.15}
          envMapIntensity={0.6}
        />
      </mesh>

      <PostProcessing />
    </Suspense>
  );
}
