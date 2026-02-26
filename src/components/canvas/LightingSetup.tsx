export function LightingSetup() {
    return (
        <>
            {/* Soft ambient fill — brighter for car visibility */}
            <ambientLight intensity={0.8} color="#d0d8e8" />

            {/* Key Light — warm dramatic spotlight from front-right */}
            <spotLight
                position={[8, 10, 8]}
                angle={0.4}
                penumbra={0.8}
                intensity={120}
                color="#fff5e6"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />

            {/* Fill Light — cool blue from back-left for depth separation */}
            <spotLight
                position={[-6, 4, -6]}
                angle={0.6}
                penumbra={1}
                intensity={40}
                color="#4488ff"
            />

            {/* Rim/Backlight — strong white from directly behind for edge glow */}
            <spotLight
                position={[0, 6, -10]}
                angle={0.5}
                penumbra={0.5}
                intensity={60}
                color="#ffffff"
            />

            {/* Overhead area-style fill — large even illumination like showroom ceiling */}
            <spotLight
                position={[0, 12, 0]}
                angle={0.8}
                penumbra={1}
                intensity={50}
                color="#e8e0f0"
                target-position={[0, 0, 0]}
            />

            {/* Under-glow — warm coral accent from below */}
            <pointLight
                position={[0, -0.5, 2]}
                intensity={10}
                color="#FF6B35"
                distance={8}
            />

            {/* Secondary accent — cyan tech glow */}
            <pointLight
                position={[3, 0.5, 0]}
                intensity={6}
                color="#00C8FF"
                distance={6}
            />

            {/* Front fill — prevents face of car from being pure black */}
            <pointLight
                position={[0, 2, 6]}
                intensity={15}
                color="#ffffff"
                distance={12}
            />
        </>
    );
}
