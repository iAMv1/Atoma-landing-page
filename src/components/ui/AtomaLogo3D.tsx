import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function AtomaLogo3D({ size = 1 }: { size?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = -state.clock.elapsedTime * 0.5;
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group scale={size}>
                {/* Main hexagon shape */}
                <mesh ref={meshRef}>
                    <cylinderGeometry args={[1, 1, 0.3, 6]} />
                    <meshPhysicalMaterial
                        color="#ff6b35"
                        metalness={0.9}
                        roughness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        emissive="#ff6b35"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* Outer ring */}
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.5, 0.05, 16, 64]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        metalness={1}
                        roughness={0.2}
                        emissive="#ff6b35"
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Inner glow */}
                <pointLight position={[0, 0, 0.5]} color="#ff6b35" intensity={2} distance={3} />
            </group>
        </Float>
    );
}
