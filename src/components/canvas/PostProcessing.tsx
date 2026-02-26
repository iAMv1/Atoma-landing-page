import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { useImmersionStore } from '../../stores/useImmersionStore';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

export function PostProcessing() {
    const scrollVelocity = useImmersionStore((state) => state.scrollVelocity);

    const aberrationOffset = useMemo(() => new THREE.Vector2(0.001, 0.001), []);

    useFrame(() => {
        const targetOffset = 0.001 + Math.abs(scrollVelocity) * 0.015;
        aberrationOffset.x = THREE.MathUtils.lerp(aberrationOffset.x, targetOffset, 0.1);
        aberrationOffset.y = THREE.MathUtils.lerp(aberrationOffset.y, targetOffset, 0.1);
    });

    return (
        <EffectComposer multisampling={4}>
            <Bloom
                luminanceThreshold={0.9}
                mipmapBlur
                intensity={0.25}
                levels={3}
                opacity={0.5}
            />
            <ChromaticAberration
                offset={aberrationOffset}
                blendFunction={BlendFunction.NORMAL}
            />
            <Noise
                opacity={0.012}
                blendFunction={BlendFunction.OVERLAY}
            />
            <Vignette
                eskil={false}
                offset={0.2}
                darkness={0.3}
                blendFunction={BlendFunction.MULTIPLY}
            />
        </EffectComposer>
    );
}
