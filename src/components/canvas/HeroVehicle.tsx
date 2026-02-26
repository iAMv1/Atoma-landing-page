import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useImmersionStore } from '../../stores/useImmersionStore';

/* ─── Per-page car rotation targets (radians) ─── */
const PAGE_ROTATIONS: Record<string, number> = {
    hero: 0,           // Will auto-rotate via useFrame
    models: 1.2,       // Side profile view (~70 degrees)
    technology: 0,      // No rotation
    experience: 0,     // No rotation
    reserve: 0,        // Auto-rotate via useFrame
};

/* ─── Per-page position offsets ─── */
const PAGE_POSITIONS: Record<string, [number, number, number]> = {
    hero: [0, -0.3, 0],
    models: [-1.8, -0.3, 1.0],
    technology: [0, -0.3, 0],
    experience: [-1.5, -0.3, 0],
    reserve: [-0.8, -0.4, 1.2],
};

/* ─── Per-page scale ─── */
const PAGE_SCALES: Record<string, number> = {
    hero: 1.2,
    models: 1.0,
    technology: 1.0,
    experience: 1.0,
    reserve: 0.9,
};

export function HeroVehicle() {
    const { scene } = useGLTF('/ferrari.glb');
    const groupRef = useRef<THREE.Group>(null);
    const carColor = useImmersionStore((state) => state.carColor);
    const enginePower = useImmersionStore((state) => state.enginePower);
    const currentPage = useImmersionStore((state) => state.currentPage);
    const isDrifting = useImmersionStore((state) => state.isDrifting);

    // Apply realistic materials to car
    useEffect(() => {
        const EXCLUDED = ['glass', 'window', 'windshield', 'lens', 'tire', 'rubber', 'wheel_'];

        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

                mats.forEach((mat) => {
                    if (!mat) return;
                    const name = (mat.name || '').toLowerCase();

                    // Handle glass/window materials - dark tinted glass with physics
                    if (name.includes('glass') || name.includes('window') || name.includes('windshield')) {
                        const glassMat = mat as THREE.MeshPhysicalMaterial;
                        if (glassMat.color) {
                            glassMat.color.set('#050505');  // Very dark tint
                            glassMat.transmission = 0.4;  // Slight light transmission
                            glassMat.thickness = 0.8;  // Glass thickness for refraction
                            glassMat.roughness = 0.0;  // Smooth glass
                            glassMat.metalness = 0.0;
                            glassMat.ior = 1.52;  // Glass index of refraction
                            glassMat.clearcoat = 1.0;  // Anti-reflective coating
                            glassMat.clearcoatRoughness = 0.0;
                            glassMat.envMapIntensity = 0.8;  // Reflection intensity
                            glassMat.attenuationColor = new THREE.Color('#101015');  // Light absorption
                            glassMat.attenuationDistance = 1.0;
                            glassMat.needsUpdate = true;
                        }
                        return;
                    }

                    const isExcluded = EXCLUDED.some(ex => name.includes(ex));
                    if (isExcluded) return;

                    const colorMat = mat as any;
                    if (colorMat.color && colorMat.color.set) {
                        colorMat.color.set(carColor);

                        // Realistic car paint physics - metallic automotive clearcoat
                        if ('metalness' in colorMat) colorMat.metalness = 0.9;
                        if ('roughness' in colorMat) colorMat.roughness = 0.12;
                        if ('clearcoat' in colorMat) {
                            colorMat.clearcoat = 1.0;
                            colorMat.clearcoatRoughness = 0.02;
                        }
                        if ('envMapIntensity' in colorMat) colorMat.envMapIntensity = 2.2;
                        if ('sheen' in colorMat) {
                            colorMat.sheen = 0.3;
                            colorMat.sheenColor = new THREE.Color('#ffffff');
                        }
                        if ('specularIntensity' in colorMat) colorMat.specularIntensity = 1.0;
                        colorMat.needsUpdate = true;
                    }
                });
            }
        });
    }, [scene, carColor]);

    // Get page-specific position and scale
    const basePosition = PAGE_POSITIONS[currentPage] || PAGE_POSITIONS.hero;
    const baseScale = PAGE_SCALES[currentPage] || PAGE_SCALES.hero;

    useFrame((state) => {
        if (!groupRef.current) return;

        if (currentPage === 'hero') {
            // Hero page: continuous rotation + engine boost + drift wobble
            const boost = (enginePower / 100) * 2.0;
            groupRef.current.rotation.y += 0.003 + (boost * 0.08);

            // Drift wobble when "Enter the Void" is active
            if (isDrifting) {
                groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.03;
                groupRef.current.position.x = basePosition[0] + Math.sin(state.clock.elapsedTime * 3) * 0.15;
            } else {
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
                groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, basePosition[0], 0.1);
            }
        } else {
            // Other pages: smoothly lerp to a fixed presentational angle
            const targetRotY = PAGE_ROTATIONS[currentPage] ?? 0;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetRotY,
                0.03
            );
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, basePosition[0], 0.05);
        }

        // Gentle hover float on all pages
        groupRef.current.position.y = basePosition[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    });

    return (
        <group ref={groupRef} position={basePosition} scale={baseScale}>
            <primitive object={scene} />
        </group>
    );
}
