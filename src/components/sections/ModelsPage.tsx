import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gauge, Zap, BarChart3, Battery, Fuel, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageNav from '../ui/PageNav';
import { useImmersionStore } from '../../stores/useImmersionStore';

const MODELS = [
    {
        name: 'ATOMA GT',
        tagline: 'Grand Tourer. Silent devastation at 412 km/h.',
        color: '#0A0A0A',
        accent: 'hsl(15, 90%, 55%)',
        specs: [
            { icon: Gauge, label: 'PEAK POWER', value: '1,200', unit: 'HP', bar: 80 },
            { icon: Zap, label: 'MAX TORQUE', value: '1,400', unit: 'Nm', bar: 70 },
            { icon: BarChart3, label: '0-100 KM/H', value: '1.8', unit: 'SEC', bar: 88 },
            { icon: Timer, label: 'TOP SPEED', value: '412', unit: 'KM/H', bar: 82 },
            { icon: Battery, label: 'BATTERY', value: '120', unit: 'kWh', bar: 80 },
            { icon: Fuel, label: 'RANGE', value: '892', unit: 'KM', bar: 89 },
        ],
        price: '$149,000',
        description: 'The flagship ATOMA. Engineered for those who demand both luxury and performance without compromise. Quad-motor AWD delivers 1,200 HP through a bespoke torque-vectoring system.',
    },
    {
        name: 'ATOMA SPORT',
        tagline: 'Track weapon. Carbon monocoque. Zero compromises.',
        color: '#3A0A0A',
        accent: 'hsl(0, 80%, 50%)',
        specs: [
            { icon: Gauge, label: 'PEAK POWER', value: '1,400', unit: 'HP', bar: 93 },
            { icon: Zap, label: 'MAX TORQUE', value: '1,600', unit: 'Nm', bar: 80 },
            { icon: BarChart3, label: '0-100 KM/H', value: '1.4', unit: 'SEC', bar: 94 },
            { icon: Timer, label: 'TOP SPEED', value: '435', unit: 'KM/H', bar: 87 },
            { icon: Battery, label: 'BATTERY', value: '100', unit: 'kWh', bar: 67 },
            { icon: Fuel, label: 'RANGE', value: '740', unit: 'KM', bar: 74 },
        ],
        price: '$189,000',
        description: 'Born on the Nürburgring. Full carbon monocoque chassis sheds 340 kg. Active aero generates 850 kg downforce at 300 km/h. Pure, unfiltered performance.',
    },
    {
        name: 'ATOMA TOURING',
        tagline: 'Luxury cruiser. Adaptive air. First-class silence.',
        color: '#E0E0E0',
        accent: 'hsl(190, 70%, 55%)',
        specs: [
            { icon: Gauge, label: 'PEAK POWER', value: '900', unit: 'HP', bar: 60 },
            { icon: Zap, label: 'MAX TORQUE', value: '1,100', unit: 'Nm', bar: 55 },
            { icon: BarChart3, label: '0-100 KM/H', value: '2.4', unit: 'SEC', bar: 76 },
            { icon: Timer, label: 'TOP SPEED', value: '380', unit: 'KM/H', bar: 76 },
            { icon: Battery, label: 'BATTERY', value: '150', unit: 'kWh', bar: 100 },
            { icon: Fuel, label: 'RANGE', value: '1,100', unit: 'KM', bar: 100 },
        ],
        price: '$129,000',
        description: 'Whisper-quiet at any speed. Triple-layer acoustic glass, adaptive air suspension, and a 150 kWh battery pack deliver 1,100 km of effortless range. The ultimate grand tourer.',
    },
    {
        name: 'CONCEPT X',
        tagline: 'Autonomous Level 5. The future, materialised.',
        color: '#050A2A',
        accent: 'hsl(270, 70%, 60%)',
        specs: [
            { icon: Gauge, label: 'PEAK POWER', value: '1,800', unit: 'HP', bar: 100 },
            { icon: Zap, label: 'MAX TORQUE', value: '2,000', unit: 'Nm', bar: 100 },
            { icon: BarChart3, label: '0-100 KM/H', value: '0.9', unit: 'SEC', bar: 100 },
            { icon: Timer, label: 'TOP SPEED', value: '500', unit: 'KM/H', bar: 100 },
            { icon: Battery, label: 'BATTERY', value: '200', unit: 'kWh', bar: 100 },
            { icon: Fuel, label: 'RANGE', value: '600', unit: 'KM', bar: 60 },
        ],
        price: '$299,000',
        description: 'Beyond automotive. Full Level 5 autonomy. 1,024 TOPS neural compute. The concept that defies every convention. Limited to 99 units worldwide.',
    },
];

export default function ModelsPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const setCarColor = useImmersionStore((s) => s.setCarColor);
    const setActiveModelIndex = useImmersionStore((s) => s.setActiveModelIndex);
    const navigate = useNavigate();

    const model = MODELS[activeIndex];

    const goTo = (index: number) => {
        const clamped = Math.max(0, Math.min(MODELS.length - 1, index));
        setActiveIndex(clamped);
        setActiveModelIndex(clamped);
        setCarColor(MODELS[clamped].color);
    };

    return (
        <section className="relative h-screen w-full z-10 pointer-events-none flex flex-col">
            {/* Split background - left side only (where UI is), right side shows canvas */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute left-0 top-0 bottom-0 w-[55%] bg-gradient-to-r from-[#050510] via-[#0a0a18] to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(99,102,241,0.08)_0%,_transparent_50%)]" />
                <div className="absolute left-0 top-0 bottom-0 w-[50%] bg-[radial-gradient(ellipse_at_70%_50%,_rgba(255,107,53,0.08)_0%,_transparent_60%)]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-1/3 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
            </div>

            {/* Nav */}
            <div className="pointer-events-auto relative z-10">
                <PageNav />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-between px-6 md:px-16 pointer-events-auto relative z-10">
                {/* Left — Model Info */}
                <div className="max-w-md z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={model.name}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase mb-2">
                                {String(activeIndex + 1).padStart(2, '0')} / {String(MODELS.length).padStart(2, '0')}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight leading-none mb-3">
                                {model.name}
                            </h1>
                            <p className="text-sm font-mono text-accent tracking-wider uppercase mb-4">
                                {model.tagline}
                            </p>
                            <p className="text-sm text-cloud/60 font-body leading-relaxed mb-6 max-w-sm">
                                {model.description}
                            </p>
                            <div className="text-3xl font-heading font-bold text-white mb-6">
                                From {model.price}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setCarColor(model.color); navigate('/reserve'); }}
                                    className="bg-accent text-charcoal font-heading font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,107,53,0.4)]"
                                >
                                    RESERVE NOW →
                                </button>
                                <button className="border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded hover:bg-white/5 transition-all">
                                    COMPARE
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right — Spec Card */}
                <div className="hidden lg:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={model.name + '-specs'}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-[#0c0c0e]/90 backdrop-blur-2xl border border-white/10 rounded-xl p-6 w-[320px] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                        >
                            <div className="text-[10px] font-mono tracking-[0.2em] mb-5 uppercase" style={{ color: model.accent }}>
                                ⚡ PERFORMANCE
                            </div>
                            <div className="flex flex-col gap-3.5">
                                {model.specs.map(({ icon: Icon, label, value, unit, bar }, i) => (
                                    <motion.div
                                        key={label}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 + i * 0.06 }}
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: model.accent }} />
                                            <div className="flex-1 flex justify-between items-baseline">
                                                <span className="text-[9px] text-cloud/50 font-mono tracking-wider">{label}</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-sm font-heading font-bold text-white">{value}</span>
                                                    <span className="text-[8px] text-cloud/40 font-mono">{unit}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden ml-6">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${bar}%` }}
                                                transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                                className="h-full rounded-full"
                                                style={{ background: model.accent }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-5 pt-3 border-t border-white/5 text-[9px] font-mono text-cloud/30">
                                ATOMA {model.name.split(' ').pop()} — 2025 SPECIFICATION
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom — Carousel Controls */}
            <div className="flex items-center justify-center gap-6 pb-6 pointer-events-auto relative z-20">
                <button
                    onClick={() => goTo(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex gap-3">
                    {MODELS.map((m, i) => (
                        <button
                            key={m.name}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full
                                ${i === activeIndex
                                    ? 'w-8 h-3 bg-accent shadow-[0_0_12px_rgba(255,107,53,0.5)]'
                                    : 'w-3 h-3 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => goTo(activeIndex + 1)}
                    disabled={activeIndex === MODELS.length - 1}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </section>
    );
}
