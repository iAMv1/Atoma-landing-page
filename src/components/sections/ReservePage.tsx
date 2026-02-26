import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageNav from '../ui/PageNav';
import { useImmersionStore } from '../../stores/useImmersionStore';

/* ─── Data ─── */
const MODELS_DATA = [
    { name: 'ATOMA GT', price: 149000, color: '#0A0A0A', hp: '1,200 HP', range: '892 km', accel: '1.8s' },
    { name: 'ATOMA SPORT', price: 189000, color: '#3A0A0A', hp: '1,400 HP', range: '740 km', accel: '1.4s' },
    { name: 'ATOMA TOURING', price: 129000, color: '#E0E0E0', hp: '900 HP', range: '1,100 km', accel: '2.4s' },
    { name: 'CONCEPT X', price: 299000, color: '#050A2A', hp: '1,800 HP', range: '600 km', accel: '0.9s' },
];

const COLORS = [
    { name: 'Obsidian', hex: '#0A0A0A' },
    { name: 'Crimson', hex: '#3A0A0A' },
    { name: 'Midnight', hex: '#050A2A' },
    { name: 'Titanium', hex: '#4A4A4A' },
    { name: 'Racing Green', hex: '#0A2A1A' },
    { name: 'Ghost White', hex: '#E0E0E0' },
];

const WHEELS = ['20" SPORT', '21" AERO', '22" TRACK'];
const INTERIORS = ['OBSIDIAN LEATHER', 'TAN NAPPA', 'ALCANTARA GREY'];
const TRIMS = ['CARBON FIBER', 'BRUSHED ALUMINUM', 'OPEN-PORE WALNUT'];

export default function ReservePage() {
    const setCarColor = useImmersionStore((s) => s.setCarColor);
    const setReserveFocusPart = useImmersionStore((s) => s.setReserveFocusPart);
    const navigate = useNavigate();

    const [selectedModel, setSelectedModel] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedWheel, setSelectedWheel] = useState(0);
    const [selectedInterior, setSelectedInterior] = useState(0);
    const [selectedTrim, setSelectedTrim] = useState(0);
    const [openStep, setOpenStep] = useState(0);
    const [reserved, setReserved] = useState(false);

    const model = MODELS_DATA[selectedModel];
    const totalPrice = model.price;

    const handleStepToggle = (step: number) => {
        const newStep = openStep === step ? -1 : step;
        setOpenStep(newStep);
        // Focus camera based on which step is opened
        if (newStep === 1) setReserveFocusPart('body');
        else if (newStep === 2) setReserveFocusPart('interior');
        else setReserveFocusPart(null);
    };

    const handleReserve = () => {
        setReserved(true);
    };

    return (
        <section className="relative h-screen w-full z-10 pointer-events-none flex flex-col">
            {/* Split background - right side only (where UI is), left side shows canvas */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-gradient-to-l from-[#050510] via-[#0a0a18] to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(168,85,247,0.08)_0%,_transparent_50%)]" />
                <div className="absolute right-0 top-0 bottom-0 w-[50%] bg-[radial-gradient(ellipse_at_30%_60%,_rgba(245,158,11,0.05)_0%,_transparent_50%)]" />
            </div>

            <div className="pointer-events-auto relative z-10">
                <PageNav />
            </div>

            {/* Reservation Confirmed Overlay */}
            <AnimatePresence>
                {reserved && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto"
                    >
                        <div className="absolute inset-0 bg-void/90 backdrop-blur-xl" />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="relative text-center max-w-md"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, ease: "linear" }}
                            >
                                <Sparkles className="w-16 h-16 text-accent mx-auto mb-6" />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
                                YOUR ATOMA<br />AWAITS
                            </h2>
                            <div className="text-[11px] font-mono text-accent tracking-widest uppercase mb-6">
                                Reservation #{`A-2025-${String(Math.floor(Math.random() * 9000 + 1000))}`}
                            </div>
                            <p className="text-cloud/50 font-body mb-2">
                                {model.name} · {COLORS[selectedColor].name} · {WHEELS[selectedWheel]}
                            </p>
                            <p className="text-cloud/30 font-mono text-[10px] mb-8">
                                $1,000 refundable deposit confirmed. Our team will contact you within 24 hours.
                            </p>
                            <button
                                onClick={() => { setReserved(false); navigate('/'); }}
                                className="border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:bg-white/5 transition-all"
                            >
                                RETURN HOME
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Split Layout */}
            <div className="flex-1 flex pointer-events-auto overflow-hidden">
                {/* Left — 3D Viewport Info */}
                <div className="hidden lg:flex w-[55%] items-center justify-center relative">
                    {/* The 3D car is visible through the persistent Canvas behind this layer */}
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-[#0c0c0e]/70 backdrop-blur-xl border border-white/8 rounded-xl px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-6 text-[10px] font-mono text-cloud/50 tracking-wider">
                                <span>{model.hp}</span>
                                <span className="w-px h-4 bg-white/10" />
                                <span>{model.accel} 0-100</span>
                                <span className="w-px h-4 bg-white/10" />
                                <span>{model.range}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: COLORS[selectedColor].hex }} />
                                <span className="text-[9px] font-mono text-cloud/40">{COLORS[selectedColor].name}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Configuration Panel */}
                <div className="w-full lg:w-[45%] bg-[#0a0a0c]/95 backdrop-blur-2xl border-l border-white/5 overflow-y-auto p-6 md:p-10">
                    <div className="mb-8">
                        <div className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase mb-2">RESERVE YOUR</div>
                        <h2 className="text-4xl font-heading font-black text-white tracking-tight">ATOMA</h2>
                    </div>

                    {/* Step 1: Model */}
                    <AccordionStep
                        step={1}
                        title="SELECT MODEL"
                        isOpen={openStep === 0}
                        onToggle={() => handleStepToggle(0)}
                        summary={model.name}
                    >
                        <div className="flex flex-col gap-2">
                            {MODELS_DATA.map((m, i) => (
                                <button
                                    key={m.name}
                                    onClick={() => { setSelectedModel(i); setCarColor(m.color); }}
                                    className={`flex items-center justify-between p-4 rounded-lg border transition-all text-left
                                        ${i === selectedModel
                                            ? 'border-accent bg-accent/10'
                                            : 'border-white/5 hover:border-white/15'}`}
                                >
                                    <div>
                                        <div className="text-sm font-heading font-bold text-white">{m.name}</div>
                                        <div className="text-[10px] font-mono text-cloud/40 mt-0.5">{m.hp} · {m.range} · {m.accel}</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-heading font-bold text-white">${m.price.toLocaleString()}</span>
                                        {i === selectedModel && <Check className="w-4 h-4 text-accent" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </AccordionStep>

                    {/* Step 2: Exterior */}
                    <AccordionStep
                        step={2}
                        title="EXTERIOR"
                        isOpen={openStep === 1}
                        onToggle={() => handleStepToggle(1)}
                        summary={`${COLORS[selectedColor].name} · ${WHEELS[selectedWheel]}`}
                    >
                        <div className="mb-5">
                            <div className="text-[9px] font-mono text-cloud/40 tracking-wider mb-3 uppercase">Color</div>
                            <div className="grid grid-cols-6 gap-2">
                                {COLORS.map((c, i) => (
                                    <button
                                        key={c.name}
                                        onClick={() => { setSelectedColor(i); setCarColor(c.hex); setReserveFocusPart('body'); }}
                                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all
                                            ${i === selectedColor
                                                ? 'border-accent bg-accent/10 scale-105'
                                                : 'border-white/5 hover:border-white/15'}`}
                                    >
                                        <div className="w-7 h-7 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} />
                                        <span className="text-[7px] font-mono text-cloud/50 tracking-tight">{c.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-[9px] font-mono text-cloud/40 tracking-wider mb-3 uppercase">Wheels</div>
                            <div className="flex gap-2">
                                {WHEELS.map((w, i) => (
                                    <button
                                        key={w}
                                        onClick={() => { setSelectedWheel(i); setReserveFocusPart('wheels'); }}
                                        className={`flex-1 py-3 rounded-lg border text-[10px] font-heading font-bold tracking-wider transition-all
                                            ${i === selectedWheel
                                                ? 'border-accent text-accent bg-accent/10'
                                                : 'border-white/5 text-cloud/50 hover:border-white/15'}`}
                                    >
                                        {w}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AccordionStep>

                    {/* Step 3: Interior */}
                    <AccordionStep
                        step={3}
                        title="INTERIOR"
                        isOpen={openStep === 2}
                        onToggle={() => handleStepToggle(2)}
                        summary={`${INTERIORS[selectedInterior]} · ${TRIMS[selectedTrim]}`}
                    >
                        <div className="mb-5">
                            <div className="text-[9px] font-mono text-cloud/40 tracking-wider mb-3 uppercase">Leather</div>
                            <div className="flex flex-col gap-2">
                                {INTERIORS.map((int, i) => (
                                    <button
                                        key={int}
                                        onClick={() => setSelectedInterior(i)}
                                        className={`py-3 px-4 rounded-lg border text-left text-[11px] font-heading font-bold tracking-wider transition-all
                                            ${i === selectedInterior
                                                ? 'border-accent text-accent bg-accent/10'
                                                : 'border-white/5 text-cloud/50 hover:border-white/15'}`}
                                    >
                                        {int}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-[9px] font-mono text-cloud/40 tracking-wider mb-3 uppercase">Trim</div>
                            <div className="flex flex-col gap-2">
                                {TRIMS.map((t, i) => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedTrim(i)}
                                        className={`py-3 px-4 rounded-lg border text-left text-[11px] font-heading font-bold tracking-wider transition-all
                                            ${i === selectedTrim
                                                ? 'border-accent text-accent bg-accent/10'
                                                : 'border-white/5 text-cloud/50 hover:border-white/15'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AccordionStep>

                    {/* Price Summary */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-baseline mb-2">
                            <span className="text-[10px] font-mono text-cloud/40 tracking-wider uppercase">Estimated Total</span>
                            <span className="text-3xl font-heading font-black text-white">${totalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-[9px] font-mono text-cloud/30 mb-6">
                            Final pricing confirmed upon specification review. $1,000 refundable reservation deposit.
                        </p>
                        <button
                            onClick={handleReserve}
                            className="w-full bg-accent text-charcoal font-heading font-bold text-sm tracking-widest uppercase py-4 rounded hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_30px_rgba(255,107,53,0.5)]"
                        >
                            PLACE RESERVATION — $1,000 →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Accordion Component ─── */
function AccordionStep({
    step, title, isOpen, onToggle, summary, children
}: {
    step: number; title: string; isOpen: boolean; onToggle: () => void; summary: string; children: React.ReactNode;
}) {
    return (
        <div className="mb-4 border border-white/5 rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors text-left"
            >
                <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full bg-accent/10 text-accent text-[11px] font-heading font-bold flex items-center justify-center">
                        {step}
                    </span>
                    <div>
                        <div className="text-[11px] font-heading font-bold text-white tracking-widest uppercase">{title}</div>
                        {!isOpen && <div className="text-[9px] font-mono text-cloud/40 mt-0.5">{summary}</div>}
                    </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-cloud/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-2">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
