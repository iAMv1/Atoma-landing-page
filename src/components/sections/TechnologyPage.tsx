import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Disc3, Wind, ChevronDown, ChevronUp } from 'lucide-react';
import PageNav from '../ui/PageNav';

const TECH_COMPONENTS = [
    {
        id: 'plasma',
        name: 'PLASMA CORE',
        subtitle: '120 kWh Solid-State Battery',
        icon: Zap,
        accent: '#FF6B35',
        accentGlow: 'rgba(255,107,53,0.25)',
        description: 'The heart of every ATOMA. Our proprietary lithium-ceramic solid-state battery pack delivers 500 Wh/kg energy density — twice the industry standard. Charges from 10-80% in just 10 minutes via 800V architecture.',
        specs: [
            { label: 'CHARGE TIME', value: '10 min', detail: '10-80%' },
            { label: 'ENERGY DENSITY', value: '500', unit: 'Wh/kg' },
            { label: 'CELL CHEMISTRY', value: 'Li-Ceramic', detail: 'Solid-State' },
            { label: 'THERMAL LIMIT', value: '65°C', detail: 'Active cooling' },
            { label: 'CYCLE LIFE', value: '3,000+', detail: 'to 80%' },
            { label: 'WEIGHT', value: '380 kg', detail: '42% lighter' },
        ],
        // Visual properties for animated 3D-like card
        particles: 8,
        ringCount: 3,
        pulseColor: 'from-orange-500 to-amber-400',
    },
    {
        id: 'neural',
        name: 'NEURAL DRIVE',
        subtitle: 'AI Co-Pilot System',
        icon: Brain,
        accent: '#00C8FF',
        accentGlow: 'rgba(0,200,255,0.25)',
        description: 'A 1,024 TOPS neural compute platform that sees 12 seconds into the future. 12 cameras, 6 radars, and 3 LiDAR arrays create an omniscient perception field.',
        specs: [
            { label: 'PROCESSOR', value: '1,024', unit: 'TOPS' },
            { label: 'SENSORS', value: '21', detail: '12 cam, 6 radar, 3 LiDAR' },
            { label: 'PREDICTION', value: '12 sec', detail: 'Road lookahead' },
            { label: 'FLEET LEARNING', value: '100K+', detail: 'Federated' },
            { label: 'SAFETY', value: 'ASIL-D', detail: 'ISO 26262' },
            { label: 'OTA UPDATES', value: 'Bi-weekly', detail: 'Auto deploy' },
        ],
        particles: 12,
        ringCount: 4,
        pulseColor: 'from-cyan-400 to-blue-500',
    },
    {
        id: 'brake',
        name: 'QUANTUM BRAKE',
        subtitle: 'Regenerative Braking System',
        icon: Disc3,
        accent: '#FF3344',
        accentGlow: 'rgba(255,51,68,0.25)',
        description: 'Captures 97% of kinetic energy during deceleration. Carbon-ceramic composite discs with active air-channel ventilation deliver 2.4g maximum deceleration with zero fade.',
        specs: [
            { label: 'RECOVERY', value: '97%', detail: 'Kinetic capture' },
            { label: 'MAX DECEL', value: '2.4g', detail: 'No fade' },
            { label: 'MATERIAL', value: 'Carbon-Ceramic', detail: 'Composite' },
            { label: 'COOLING', value: 'Active', detail: 'Air channels' },
            { label: 'RESPONSE', value: '0.8ms', detail: 'Brake-by-wire' },
            { label: 'ENDURANCE', value: '50+ stops', detail: 'Zero fade' },
        ],
        particles: 6,
        ringCount: 5,
        pulseColor: 'from-red-500 to-rose-400',
    },
    {
        id: 'aero',
        name: 'AERO FLUX',
        subtitle: 'Active Aerodynamics',
        icon: Wind,
        accent: '#22C55E',
        accentGlow: 'rgba(34,197,94,0.25)',
        description: 'Six independently controlled active aero surfaces achieve a class-leading Cd 0.19. At 300 km/h, the system generates up to 850 kg of variable downforce.',
        specs: [
            { label: 'DRAG COEFF', value: 'Cd 0.19', detail: 'Class-leading' },
            { label: 'SURFACES', value: '6', detail: 'Independent' },
            { label: 'DOWNFORCE', value: '850 kg', detail: 'At 300 km/h' },
            { label: 'GROUND EFFECT', value: 'Venturi', detail: 'Active ride' },
            { label: 'MODE', value: 'Auto Switch', detail: 'Eff ↔ Perf' },
            { label: 'CFD HOURS', value: '12,000+', detail: 'Optimization' },
        ],
        particles: 10,
        ringCount: 2,
        pulseColor: 'from-emerald-400 to-green-500',
    },
];

/* ── Animated 3D Visualization (pure CSS/motion) ── */
function TechVisualization({ tech, isActive }: { tech: typeof TECH_COMPONENTS[0]; isActive: boolean }) {
    const Icon = tech.icon;

    return (
        <div className="relative w-full aspect-square max-h-[55vh] flex items-center justify-center overflow-hidden rounded-2xl"
            style={{ background: `radial-gradient(ellipse at center, ${tech.accentGlow} 0%, rgba(10,10,10,0.95) 70%)` }}
        >
            {/* Grid lines background */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(${tech.accent}22 1px, transparent 1px), linear-gradient(90deg, ${tech.accent}22 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Concentric rings */}
            {[...Array(tech.ringCount)].map((_, i) => (
                <motion.div
                    key={`ring-${i}`}
                    className="absolute rounded-full border"
                    style={{
                        borderColor: `${tech.accent}${Math.round((0.15 - i * 0.03) * 255).toString(16).padStart(2, '0')}`,
                        width: `${140 + i * 60}px`,
                        height: `${140 + i * 60}px`,
                    }}
                    animate={isActive ? {
                        rotate: i % 2 === 0 ? 360 : -360,
                        scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                        rotate: { duration: 15 + i * 5, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
                    }}
                />
            ))}

            {/* Orbital particles */}
            {[...Array(tech.particles)].map((_, i) => {
                const angle = (i / tech.particles) * 360;
                const radius = 80 + Math.random() * 60;
                return (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: tech.accent }}
                        animate={isActive ? {
                            x: [Math.cos(angle * Math.PI / 180) * radius, Math.cos((angle + 360) * Math.PI / 180) * radius],
                            y: [Math.sin(angle * Math.PI / 180) * radius, Math.sin((angle + 360) * Math.PI / 180) * radius],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [0.5, 1.2, 0.5],
                        } : {}}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.3,
                        }}
                    />
                );
            })}

            {/* Center icon with pulsing glow */}
            <div className="relative z-10">
                <motion.div
                    className={`absolute -inset-12 rounded-full bg-gradient-to-br ${tech.pulseColor} blur-2xl`}
                    animate={isActive ? { opacity: [0.15, 0.3, 0.15], scale: [1, 1.15, 1] } : { opacity: 0.1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="relative z-10 w-24 h-24 rounded-2xl border flex items-center justify-center backdrop-blur-sm"
                    style={{
                        borderColor: `${tech.accent}40`,
                        backgroundColor: `${tech.accent}10`,
                        boxShadow: `0 0 40px ${tech.accentGlow}, inset 0 0 20px ${tech.accentGlow}`,
                    }}
                    animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Icon className="w-10 h-10" style={{ color: tech.accent }} />
                </motion.div>
            </div>

            {/* Scan line sweep effect */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ backgroundColor: `${tech.accent}30` }}
                animate={isActive ? { top: ['0%', '100%'] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l" style={{ borderColor: `${tech.accent}30` }} />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r" style={{ borderColor: `${tech.accent}30` }} />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l" style={{ borderColor: `${tech.accent}30` }} />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r" style={{ borderColor: `${tech.accent}30` }} />

            {/* Data readout label */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tech.accent }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: `${tech.accent}80` }}>
                    LIVE TELEMETRY
                </span>
            </div>
            <div className="absolute top-5 right-12 text-[8px] font-mono tracking-wider" style={{ color: `${tech.accent}50` }}>
                v4.2.1 · {tech.id.toUpperCase()}
            </div>
        </div>
    );
}

export default function TechnologyPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const tech = TECH_COMPONENTS[activeIndex];
    const Icon = tech.icon;

    return (
        <section className="relative min-h-screen w-full z-10 pointer-events-none flex flex-col">
            {/* Background atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#080818] to-[#050510]" />
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(ellipse at 30% 50%, ${tech.accentGlow} 0%, transparent 60%)`,
                    transition: 'background-image 0.8s ease',
                }} />
            </div>

            <div className="pointer-events-auto relative z-10">
                <PageNav />
            </div>

            <div className="flex-1 flex pointer-events-auto relative z-10 py-4">
                {/* Left — Vertical Progress Nav */}
                <div className="hidden md:flex flex-col items-center justify-center gap-4 px-6 ml-2">
                    {TECH_COMPONENTS.map((t, i) => {
                        const TIcon = t.icon;
                        return (
                            <motion.button
                                key={t.id}
                                onClick={() => setActiveIndex(i)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-300 relative
                                    ${i === activeIndex
                                        ? 'border-white/20 bg-white/5'
                                        : 'border-white/8 hover:border-white/15 hover:bg-white/3'}`}
                                style={i === activeIndex ? {
                                    boxShadow: `0 0 20px ${t.accentGlow}, inset 0 0 10px ${t.accentGlow}`,
                                    borderColor: `${t.accent}40`,
                                } : {}}
                            >
                                <TIcon className="w-5 h-5" style={{ color: i === activeIndex ? t.accent : 'rgba(255,255,255,0.3)' }} />
                                {i === activeIndex && (
                                    <motion.div
                                        layoutId="techIndicator"
                                        className="absolute -left-3 w-1 h-6 rounded-full"
                                        style={{ backgroundColor: t.accent }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                    <div className="w-px h-6 bg-white/10 my-1" />
                    <span className="text-[10px] font-mono text-cloud/30 tracking-wider -rotate-90 whitespace-nowrap">
                        {activeIndex + 1} / {TECH_COMPONENTS.length}
                    </span>
                </div>

                {/* Center & Right — Content Area */}
                <div className="flex-1 flex items-center px-6 md:px-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full ${activeIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* 3D Visualization */}
                            <div className="w-full lg:w-[45%]">
                                <TechVisualization tech={tech} isActive={true} />
                            </div>

                            {/* Text + Specs Content */}
                            <div className="w-full lg:w-[55%]">
                                <motion.div
                                    initial={{ opacity: 0, x: activeIndex % 2 === 0 ? 30 : -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25, duration: 0.6 }}
                                >
                                    {/* Badge */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: `${tech.accent}15`, border: `1px solid ${tech.accent}30` }}
                                        >
                                            <Icon className="w-4 h-4" style={{ color: tech.accent }} />
                                        </div>
                                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: tech.accent }}>
                                            {tech.subtitle}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-[0.95] mb-5">
                                        {tech.name}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-sm text-cloud/50 font-body leading-relaxed mb-8 max-w-lg">
                                        {tech.description}
                                    </p>

                                    {/* Specs Grid — premium glass card */}
                                    <div className="bg-[#0a0a10]/80 backdrop-blur-xl border border-white/6 rounded-xl p-5 max-w-lg"
                                        style={{ boxShadow: `0 0 40px ${tech.accentGlow}, 0 20px 60px rgba(0,0,0,0.5)` }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[9px] font-mono tracking-[0.2em] text-cloud/40 uppercase">
                                                TECHNICAL SPECIFICATIONS
                                            </span>
                                            <motion.div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: tech.accent }}
                                                animate={{ opacity: [1, 0.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                            {tech.specs.map((spec, i) => (
                                                <motion.div
                                                    key={spec.label}
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.35 + i * 0.06 }}
                                                    className="group"
                                                >
                                                    <div className="text-[8px] font-mono text-cloud/35 tracking-[0.15em] mb-1">{spec.label}</div>
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="text-base font-heading font-bold text-white">{spec.value}</span>
                                                        {'unit' in spec && spec.unit && (
                                                            <span className="text-[9px] font-mono" style={{ color: `${tech.accent}80` }}>{spec.unit}</span>
                                                        )}
                                                    </div>
                                                    {'detail' in spec && spec.detail && (
                                                        <div className="text-[9px] font-mono text-cloud/30 mt-0.5">{spec.detail}</div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom — Mobile Nav */}
            <div className="flex items-center justify-center gap-4 pb-6 pointer-events-auto md:hidden relative z-10">
                <button onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <ChevronUp className="w-4 h-4 text-white" />
                </button>
                <span className="text-[10px] font-mono text-cloud/50">{activeIndex + 1} / {TECH_COMPONENTS.length}</span>
                <button onClick={() => setActiveIndex(Math.min(TECH_COMPONENTS.length - 1, activeIndex + 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <ChevronDown className="w-4 h-4 text-white" />
                </button>
            </div>
        </section>
    );
}
