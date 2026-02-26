import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Fingerprint, Settings2, CarFront, MapPin, X, Gauge, Zap, Battery,
    Thermometer, Wifi, Shield, Navigation, Clock, Fuel, BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useImmersionStore } from "../../stores/useImmersionStore";

/* ─── Color palette ─── */
const CAR_COLORS = [
    { name: 'OBSIDIAN', hex: '#0A0A0A', preview: 'Stealth black with deep metallic flake' },
    { name: 'CRIMSON', hex: '#3A0A0A', preview: 'Deep blood-red with carbon undertones' },
    { name: 'MIDNIGHT', hex: '#0A0A3A', preview: 'Electric navy with sapphire shimmer' },
    { name: 'TITANIUM', hex: '#4A4A4A', preview: 'Brushed silver-grey industrial finish' },
    { name: 'RACING GREEN', hex: '#0A2A1A', preview: 'Classic British racing heritage green' },
    { name: 'GHOST WHITE', hex: '#E0E0E0', preview: 'Ceramic pearl white with opal flake' },
];

/* ─── Nav content ─── */
const NAV_CONTENT: Record<string, { items: { title: string; desc: string }[] }> = {
    MODELS: {
        items: [
            { title: 'ATOMA GT', desc: 'Grand tourer — 1,200 HP, 892 km range' },
            { title: 'ATOMA SPORT', desc: 'Track-focused — 1,400 HP, carbon monocoque' },
            { title: 'ATOMA TOURING', desc: 'Luxury cruiser — adaptive air suspension' },
            { title: 'CONCEPT X', desc: 'Next-gen prototype — autonomous Level 5' },
        ]
    },
    TECHNOLOGY: {
        items: [
            { title: 'PLASMA CORE', desc: '120 kWh solid-state battery, 10-min charge' },
            { title: 'NEURAL DRIVE', desc: 'AI co-pilot with predictive road analysis' },
            { title: 'QUANTUM BRAKE', desc: 'Regenerative braking with 97% energy recovery' },
            { title: 'AERO FLUX', desc: 'Active aero surfaces, Cd 0.19 coefficient' },
        ]
    },
    EXPERIENCE: {
        items: [
            { title: 'VIRTUAL DRIVE', desc: 'WebXR immersive test drive from your browser' },
            { title: '360° CONFIGURE', desc: 'Build your ATOMA in photorealistic detail' },
            { title: 'SHOWROOM FINDER', desc: 'Locate the nearest ATOMA experience center' },
            { title: 'OWNER STORIES', desc: 'Real journeys from the ATOMA community' },
        ]
    },
    RESERVE: {
        items: [
            { title: 'BUILD & PRICE', desc: 'Configure to your exact specification' },
            { title: 'TEST DRIVE', desc: 'Schedule a private demonstration' },
            { title: 'CONTACT DEALER', desc: 'Connect with your regional partner' },
            { title: 'FINANCING', desc: 'Flexible ownership & leasing plans' },
        ]
    },
};

/* ─── Specs data ─── */
const SPECS = [
    { icon: Gauge, label: 'PEAK POWER', value: '1,200', unit: 'HP', bar: 92 },
    { icon: Zap, label: 'MAX TORQUE', value: '1,400', unit: 'Nm', bar: 88 },
    { icon: BarChart3, label: '0-100 KM/H', value: '1.8', unit: 'SEC', bar: 96 },
    { icon: Battery, label: 'BATTERY PACK', value: '120', unit: 'kWh', bar: 85 },
    { icon: Fuel, label: 'RANGE (WLTP)', value: '892', unit: 'KM', bar: 78 },
    { icon: Thermometer, label: 'THERMAL LIMIT', value: '65', unit: '°C', bar: 55 },
    { icon: Shield, label: 'SAFETY RATING', value: '5.0', unit: '★', bar: 100 },
    { icon: Wifi, label: 'CONNECTIVITY', value: '5G', unit: 'V2X', bar: 90 },
];

/* ─── Destinations ─── */
const DESTINATIONS = [
    { name: 'ZURICH HQ', dist: '0 km', eta: 'Current Location', status: 'HERE', charge: 98 },
    { name: 'NÜRBURGRING', dist: '612 km', eta: '3h 42min', status: 'IN RANGE', charge: 34 },
    { name: 'MONACO GP', dist: '847 km', eta: '5h 18min', status: 'IN RANGE', charge: 8 },
    { name: 'SILVERSTONE', dist: '1,241 km', eta: '7h 54min', status: 'CHARGE 1x', charge: 0 },
    { name: 'SPA-FRANCORCHAMPS', dist: '683 km', eta: '4h 10min', status: 'IN RANGE', charge: 22 },
];

/* ═══════════════════════════════════════════ */
export default function Hero() {
    const isIgnitionOn = useImmersionStore((s) => s.isIgnitionOn);
    const setIsIgnitionOn = useImmersionStore((s) => s.setIsIgnitionOn);
    const carColor = useImmersionStore((s) => s.carColor);
    const setCarColor = useImmersionStore((s) => s.setCarColor);
    const enginePower = useImmersionStore((s) => s.enginePower);
    const setEnginePower = useImmersionStore((s) => s.setEnginePower);
    const navigate = useNavigate();

    const [showConfig, setShowConfig] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);
    const [showRouting, setShowRouting] = useState(false);
    const [hoveredNav, setHoveredNav] = useState('');
    const [voidActive, setVoidActive] = useState(false);
    const [voidCountdown, setVoidCountdown] = useState(0);

    const currentColorName = CAR_COLORS.find(c => c.hex === carColor)?.name || 'CUSTOM';

    const closeAllPanels = () => { setShowConfig(false); setShowSpecs(false); setShowRouting(false); };
    const togglePanel = (panel: string) => {
        closeAllPanels();
        if (panel === 'config') setShowConfig(prev => !prev);
        if (panel === 'specs') setShowSpecs(prev => !prev);
        if (panel === 'route') setShowRouting(prev => !prev);
    };

    /* ── Enter the Void sequence ── */
    const setIsDrifting = useImmersionStore((s) => s.setIsDrifting);
    const handleEnterVoid = () => {
        if (voidActive) return;
        setVoidActive(true);
        setEnginePower(100);
        setIsDrifting(true);
        setVoidCountdown(3);
        const interval = setInterval(() => {
            setVoidCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setVoidActive(false);
                        setEnginePower(0);
                        setVoidCountdown(0);
                        setIsDrifting(false);
                    }, 800);
                    return 0;
                }
                return prev - 1;
            });
        }, 800);
    };

    return (
        <section className="relative h-screen w-full z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10">

            {/* ━━━ TOP NAVIGATION ━━━ */}
            <nav className="flex items-center justify-between w-full pointer-events-auto relative z-50">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
                    </svg>
                    <span className="text-2xl font-heading font-black tracking-tight text-white uppercase">ATOMA</span>
                </div>

                {/* Nav Items with Rich Dropdowns + Route Navigation */}
                <div className="hidden md:flex items-center gap-10 font-heading font-semibold text-xs uppercase tracking-widest text-cloud relative">
                    {Object.entries(NAV_CONTENT).map(([key]) => {
                        const route = `/${key.toLowerCase()}`;
                        return (
                            <div key={key} className="relative group"
                                onMouseEnter={() => setHoveredNav(key)}
                                onMouseLeave={() => setHoveredNav('')}
                            >
                                <button
                                    onClick={() => navigate(route)}
                                    className={`py-3 transition-colors duration-200 ${hoveredNav === key ? 'text-accent' : 'hover:text-white'}`}
                                >
                                    {key}
                                </button>
                                <AnimatePresence>
                                    {hoveredNav === key && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-charcoal/95 backdrop-blur-2xl border border-border-default rounded-lg shadow-elevated w-80 overflow-hidden"
                                        >
                                            <div className="p-2">
                                                {NAV_CONTENT[key].items.map((item, i) => (
                                                    <motion.button
                                                        key={item.title}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        onClick={() => navigate(route)}
                                                        className="block w-full text-left px-4 py-3 rounded-md hover:bg-accent/10 group/item transition-all"
                                                    >
                                                        <div className="text-[11px] font-heading font-bold text-white group-hover/item:text-accent transition-colors tracking-wider">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-[10px] font-mono text-cloud/70 mt-0.5 tracking-normal normal-case font-normal">
                                                            {item.desc}
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                            <div className="border-t border-border-subtle px-4 py-2">
                                                <span className="text-[9px] font-mono text-cloud/40 tracking-wider">CLICK TO EXPLORE →</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Right CTA */}
                <div className="flex items-center gap-6 font-heading font-bold text-xs uppercase tracking-widest">
                    <a href="#" className="text-white hover:text-accent transition-colors">LOG IN</a>
                    <button onClick={() => navigate('/reserve')} className="bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-charcoal px-6 py-2.5 rounded transition-all duration-300">
                        PRE-ORDER
                    </button>
                </div>
            </nav>

            {/* ━━━ LEFT TELEMETRY — vertically centered ━━━ */}
            <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-10 pointer-events-auto z-10">
                <div className="flex flex-col gap-6 max-w-[160px]">
                    {[
                        { label: 'STATUS', value: isIgnitionOn ? 'ENGINE ACTIVE' : 'STANDBY', color: isIgnitionOn ? 'text-accent' : 'text-green-400' },
                        { label: 'BATTERY', value: isIgnitionOn ? '47.2°C' : '32.4°C', color: 'text-white' },
                        { label: 'RANGE', value: isIgnitionOn ? '847 KM' : '892 KM', color: 'text-white' },
                        { label: 'CHASSIS', value: currentColorName, color: 'text-accent' },
                    ].map(({ label, value, color }) => (
                        <div key={label}>
                            <div className="text-[10px] text-cloud/60 font-mono tracking-widest mb-1 uppercase">{label}</div>
                            <div className={`text-sm font-mono tracking-wider ${color}`}>{value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ━━━ RIGHT SIDEBAR — Plasma Core + Toolbar (top-right area) ━━━ */}
            <div className="absolute top-24 right-6 md:right-10 pointer-events-auto z-10 flex items-start gap-4">
                {/* Plasma Core Card */}
                <div className="bg-charcoal/80 backdrop-blur-xl border border-border-default rounded-lg p-5 shadow-elevated w-56">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-accent font-mono tracking-[0.2em]">PLASMA CORE</span>
                        <Zap className={`w-4 h-4 ${isIgnitionOn ? 'text-accent animate-pulse' : 'text-cloud/40'}`} />
                    </div>
                    <div className="h-1.5 bg-white/5 w-full rounded-full overflow-hidden mb-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isIgnitionOn ? "96%" : "98%" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full relative"
                        />
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[9px] text-cloud/50 font-mono">{isIgnitionOn ? 'DISCHARGING' : 'FULLY CHARGED'}</span>
                        <span className="text-2xl font-heading font-bold text-white">{isIgnitionOn ? '96' : '98'}%</span>
                    </div>
                </div>

                {/* Toolbar Buttons */}
                <div className="flex flex-col gap-3">
                    {[
                        { id: 'config', icon: Settings2, active: showConfig },
                        { id: 'specs', icon: CarFront, active: showSpecs },
                        { id: 'route', icon: MapPin, active: showRouting },
                    ].map(({ id, icon: Icon, active }) => (
                        <button
                            key={id}
                            onClick={() => togglePanel(id)}
                            className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-all duration-200
                                ${active
                                    ? 'border-accent text-accent bg-accent/10 shadow-[0_0_12px_rgba(255,107,53,0.25)]'
                                    : 'border-white/10 text-cloud/50 bg-charcoal/60 hover:text-white hover:border-white/30'}`}
                        >
                            <Icon className="w-4.5 h-4.5" />
                        </button>
                    ))}
                </div>
            </div>

            {/* ━━━ SLIDE-IN PANELS (full height side drawer from right) ━━━ */}
            <AnimatePresence>
                {(showConfig || showSpecs || showRouting) && (
                    <motion.div
                        initial={{ opacity: 0, x: 380 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 380 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-screen w-[360px] bg-[#0a0a0c]/95 backdrop-blur-2xl border-l border-white/8 z-[60] pointer-events-auto overflow-y-auto"
                    >
                        <div className="p-6 pt-8">
                            {/* Close button */}
                            <button
                                onClick={closeAllPanels}
                                className="absolute top-5 right-5 w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-cloud/50 hover:text-white hover:border-white/30 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* ═══ CONFIG CONTENT ═══ */}
                            {showConfig && (
                                <>
                                    <div className="text-[11px] text-white font-heading font-bold tracking-widest uppercase mb-5">⚙ CHASSIS CONFIGURATION</div>
                                    <div className="text-[9px] text-accent font-mono tracking-wider mb-3 uppercase">Select Finish</div>
                                    <div className="grid grid-cols-3 gap-2.5">
                                        {CAR_COLORS.map(color => (
                                            <button
                                                key={color.name}
                                                onClick={() => setCarColor(color.hex)}
                                                className={`flex flex-col items-center gap-2 p-2.5 rounded-lg border transition-all duration-300
                                                    ${carColor === color.hex
                                                        ? 'border-accent bg-accent/10 scale-[1.05] shadow-[0_0_15px_rgba(255,107,53,0.3)]'
                                                        : 'border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                                            >
                                                <div className="w-10 h-10 rounded-full shadow-inner border border-white/10" style={{ backgroundColor: color.hex }} />
                                                <span className="text-[8px] font-mono tracking-tight text-cloud/70">{color.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-white/5">
                                        <div className="text-sm font-heading font-bold text-white mb-1">{currentColorName}</div>
                                        <div className="text-[10px] font-mono text-cloud/50">{CAR_COLORS.find(c => c.hex === carColor)?.preview}</div>
                                    </div>
                                </>
                            )}

                            {/* ═══ SPECS CONTENT ═══ */}
                            {showSpecs && (
                                <>
                                    <div className="text-[11px] text-white font-heading font-bold tracking-widest uppercase mb-5">🏎 ATOMA GT — SPECIFICATIONS</div>
                                    <div className="flex flex-col gap-4">
                                        {SPECS.map(({ icon: Icon, label, value, unit, bar }, i) => (
                                            <motion.div
                                                key={label}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                            >
                                                <div className="flex items-center gap-3 mb-1.5">
                                                    <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                                                    <div className="flex-1 flex justify-between items-baseline">
                                                        <span className="text-[9px] text-cloud/60 font-mono tracking-wider">{label}</span>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-base font-heading font-bold text-white">{value}</span>
                                                            <span className="text-[9px] text-cloud/40 font-mono">{unit}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-1 bg-white/5 rounded-full overflow-hidden ml-7">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${bar}%` }}
                                                        transition={{ duration: 1.2, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                                        className="h-full rounded-full"
                                                        style={{ background: `linear-gradient(90deg, hsl(15,90%,55%) 0%, hsl(${15 + bar * 1.5},85%,55%) 100%)` }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-5 pt-3 border-t border-white/5 flex justify-between">
                                        <span className="text-[9px] font-mono text-cloud/30">ATOMA GT — 2025 SPECIFICATION</span>
                                        <span className="text-[9px] font-mono text-accent/60">EURO NCAP 5★</span>
                                    </div>
                                </>
                            )}

                            {/* ═══ ROUTING CONTENT ═══ */}
                            {showRouting && (
                                <>
                                    <div className="text-[11px] text-white font-heading font-bold tracking-widest uppercase mb-5">📍 ROUTE PLANNER</div>
                                    <div className="flex flex-col gap-2.5">
                                        {DESTINATIONS.map((dest, i) => (
                                            <motion.button
                                                key={dest.name}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all text-left group"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                                                    {dest.status === 'HERE'
                                                        ? <Navigation className="w-4 h-4 text-accent" />
                                                        : <MapPin className="w-4 h-4 text-cloud/40 group-hover:text-accent transition-colors" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[11px] font-heading font-bold text-white group-hover:text-accent transition-colors">{dest.name}</div>
                                                    <div className="flex items-center gap-3 mt-0.5">
                                                        <span className="text-[9px] font-mono text-cloud/50">{dest.dist}</span>
                                                        <span className="text-[9px] font-mono text-cloud/30 flex items-center gap-1"><Clock className="w-3 h-3" />{dest.eta}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full
                                                        ${dest.status === 'HERE' ? 'bg-accent/20 text-accent' :
                                                            dest.status === 'IN RANGE' ? 'bg-green-500/15 text-green-400' :
                                                                'bg-amber-500/15 text-amber-400'}`}>
                                                        {dest.status}
                                                    </span>
                                                    {dest.status !== 'HERE' && (
                                                        <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-green-500/60 rounded-full" style={{ width: `${Math.max(dest.charge, 5)}%` }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-white/5">
                                        <div className="text-[9px] font-mono text-cloud/30">ESTIMATED WITH {isIgnitionOn ? '96' : '98'}% CHARGE · 892 KM WLTP RANGE</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ━━━ THE VOID TITLE ━━━ */}
            <h1 className="absolute bottom-24 left-1/2 -translate-x-1/2 text-[13vw] leading-none font-heading font-black tracking-tighter text-white whitespace-nowrap pointer-events-none mix-blend-overlay z-0 select-none"
                style={{ opacity: voidActive ? 0.15 : 0.7 }}>
                THE VOID
            </h1>

            {/* ━━━ VOID FLASH OVERLAY ━━━ */}
            <AnimatePresence>
                {voidActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.7, 0.15, 0.5, 0.1, 0] }}
                        transition={{ duration: 3, times: [0, 0.08, 0.2, 0.4, 0.7, 1] }}
                        className="fixed inset-0 z-50 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at center, rgba(255,107,53,0.4) 0%, rgba(255,34,0,0.2) 40%, transparent 80%)' }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {voidActive && voidCountdown > 0 && (
                    <motion.div
                        initial={{ scale: 3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
                    >
                        <span className="text-[20vw] font-heading font-black text-white/20">{voidCountdown}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ━━━ BOTTOM FOOTER ━━━ */}
            <div className="flex items-end justify-between w-full pointer-events-auto border-t border-white/5 pt-5 relative z-10">

                {/* Left — Biometric */}
                <div className="flex flex-col gap-2.5">
                    <button
                        onClick={() => setIsIgnitionOn(!isIgnitionOn)}
                        className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-500
                            ${isIgnitionOn
                                ? 'bg-accent/15 border-accent text-accent shadow-[0_0_25px_rgba(255,107,53,0.4)]'
                                : 'bg-charcoal/60 text-cloud/50 border-white/10 hover:border-white/30 hover:text-white'}`}
                    >
                        <Fingerprint className={`w-7 h-7 ${isIgnitionOn ? 'animate-pulse' : ''}`} />
                    </button>
                    <div className={`text-[9px] uppercase tracking-widest font-mono leading-relaxed max-w-[160px] transition-colors duration-500
                        ${isIgnitionOn ? 'text-accent' : 'text-cloud/30'}`}>
                        {isIgnitionOn ? '✓ BIOMETRIC VERIFIED — IGNITION ACTIVE' : 'BIOMETRIC ACCESS REQUIRED'}
                    </div>
                    <div className="text-[9px] text-white/15 font-mono tracking-wider mt-1">
                        © 2025 ATOMA AUTOMOTIVE · ZURICH
                    </div>
                </div>

                {/* Center — Performance Dashboard */}
                <div className="flex items-center gap-8 bg-[#0c0c0e]/80 backdrop-blur-2xl border border-white/8 rounded-t-xl px-7 py-4 mb-[-20px] shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase text-cloud/50 font-mono tracking-widest mb-0.5">0-100 KM/H</span>
                        <motion.span
                            animate={{ color: enginePower > 50 ? '#FF6B35' : '#ffffff' }}
                            className="text-xl font-heading font-bold"
                        >
                            {enginePower > 50 ? '1.2 S' : '1.8 S'}
                        </motion.span>
                    </div>
                    <div className="w-px h-7 bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase text-cloud/50 font-mono tracking-widest mb-0.5">TOP SPEED</span>
                        <motion.span
                            animate={{ color: enginePower > 50 ? '#FF6B35' : '#ffffff' }}
                            className="text-xl font-heading font-bold"
                        >
                            {enginePower > 50 ? '⚡ 412' : '412'} <span className="text-[10px] font-mono font-normal text-cloud/40">KM/H</span>
                        </motion.span>
                    </div>
                    <button
                        onClick={handleEnterVoid}
                        disabled={voidActive}
                        className={`font-heading font-bold text-sm tracking-widest uppercase px-7 py-3.5 ml-3 rounded transition-all duration-300 flex items-center gap-2
                            ${voidActive
                                ? 'bg-white text-charcoal scale-105 shadow-[0_0_40px_rgba(255,255,255,0.5)] cursor-wait'
                                : 'bg-accent text-charcoal hover:brightness-110 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(255,107,53,0.4)] cursor-pointer'}`}
                    >
                        {voidActive ? `⚡ IGNITING ${voidCountdown > 0 ? voidCountdown : '...'}` : 'ENTER THE VOID'}
                        {!voidActive && <span className="text-lg">→</span>}
                    </button>
                </div>

                {/* Right — Socials */}
                <div className="flex items-center gap-5 text-[10px] uppercase font-mono tracking-widest text-white/20">
                    <a href="#" className="hover:text-white transition-colors">IG</a>
                    <a href="#" className="hover:text-white transition-colors">TW</a>
                    <a href="#" className="hover:text-white transition-colors">YT</a>
                </div>
            </div>
        </section>
    );
}
