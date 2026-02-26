import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, RotateCcw, MapPin, Star, Clock, Navigation, ChevronRight, Quote, X, Check, Zap, Gauge, Battery, GaugeCircle, Timer, Wind, Hexagon, Layers, Zap as Bolt, Cpu, Wifi, Disc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageNav from '../ui/PageNav';

/* ─── Kinetic Text Reveal Component ─── */
function KineticText({ text, className = '' }: { text: string; className?: string }) {
    const chars = text.split('');
    return (
        <span className={className}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.5, type: 'spring' }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
}

/* ─── 3D Tilt Card with Magnetic Hover ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setTransform({
            rotateX: (y - centerY) / 20,
            rotateY: (centerX - x) / 20,
            scale: 1.02
        });
    };

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
            }}
            className={`transition-all duration-200 ${className}`}
        >
            {children}
        </motion.div>
    );
}

/* ─── Animated Counter Number ─── */
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-block"
        >
            {value}{suffix}
        </motion.span>
    );
}

/* ─── Floating Particle Trail ─── */
function ParticleTrail() {
    const particles = Array.from({ length: 25 });
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-orange-400/40"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: '100%',
                        opacity: 0
                    }}
                    animate={{
                        y: '-100%',
                        opacity: [0, 0.8, 0],
                        x: `${Math.random() * 100}%`
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'linear'
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Showroom Data ─── */
const SHOWROOMS = [
    { name: 'ZURICH HQ', city: 'Switzerland', distance: '0 km', hours: '9:00-19:00' },
    { name: 'MÜNCHEN', city: 'Germany', distance: '304 km', hours: '10:00-18:00' },
    { name: 'MONACO', city: 'Monte Carlo', distance: '847 km', hours: '10:00-20:00' },
    { name: 'LONDON', city: 'United Kingdom', distance: '1,180 km', hours: '9:00-19:00' },
    { name: 'PARIS', city: 'France', distance: '620 km', hours: '10:00-19:00' },
    { name: 'DUBAI', city: 'UAE', distance: '5,200 km', hours: '10:00-22:00' },
];

/* ─── Reviews Data ─── */
const REVIEWS_ROW1 = [
    { name: 'Marco V.', model: 'GT', rating: 5, quote: 'The silence at 400 km/h is surreal. You hear nothing but your own thoughts.' },
    { name: 'Sarah K.', model: 'Sport', rating: 5, quote: 'Changed how I think about electric performance. The torque is otherworldly.' },
    { name: 'Aisha M.', model: 'Touring', rating: 5, quote: 'My family road trip from Zurich to Barcelona — one charge. Revolutionary.' },
    { name: 'James L.', model: 'GT', rating: 5, quote: 'Every detail speaks to obsessive engineering. This is automotive art.' },
    { name: 'Yuki T.', model: 'Sport', rating: 5, quote: 'Destroyed my 992 GT3 RS lap time on first attempt. Speechless.' },
];

const REVIEWS_ROW2 = [
    { name: 'Carlos R.', model: 'Concept X', rating: 5, quote: 'The autonomous mode drove me through Monaco traffic flawlessly. The future is here.' },
    { name: 'Priya S.', model: 'Touring', rating: 4, quote: 'Best highway cruiser I have ever experienced. The sound insulation is incredible.' },
    { name: 'Erik N.', model: 'GT', rating: 5, quote: 'Sold my Taycan Turbo S after one test drive. No comparison. None.' },
    { name: 'Lena W.', model: 'Sport', rating: 5, quote: 'The carbon monocoque chassis gives feedback I have never felt in an EV before.' },
    { name: 'Omar F.', model: 'Concept X', rating: 5, quote: 'Reserved #42 of 99. This is generational engineering. Proud to be early.' },
];

function ReviewCard({ review }: { review: typeof REVIEWS_ROW1[0] }) {
    return (
        <div className="flex-shrink-0 w-80 bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/8 rounded-xl p-5 mx-3 hover:border-accent/30 hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-accent fill-accent' : 'text-cloud/20'}`} />
                ))}
            </div>
            <Quote className="w-4 h-4 text-accent/40 mb-2" />
            <p className="text-sm text-cloud/70 font-body leading-relaxed mb-4 italic">"{review.quote}"</p>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[11px] font-heading font-bold text-white">{review.name}</div>
                    <div className="text-[9px] font-mono text-accent/60 tracking-wider">ATOMA {review.model.toUpperCase()}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                    {review.name.charAt(0)}
                </div>
            </div>
        </div>
    );
}

/* ─── WebXR Experience Modal ─── */
function VRExperienceModal({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto"
        >
            <div className="absolute inset-0 bg-void/90 backdrop-blur-xl" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative bg-[#0c0c0e]/95 backdrop-blur-2xl border border-accent/20 rounded-2xl p-8 max-w-lg w-full mx-4"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-cloud/40 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <Gamepad2 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-heading font-black text-white mb-2">VIRTUAL TEST DRIVE</h3>
                <p className="text-cloud/50 font-body text-sm mb-6">
                    Experience the ATOMA GT in a photorealistic virtual environment. Feel the acceleration, test the handling, and explore the cabin — all from your browser.
                </p>

                {/* Simulated VR HUD */}
                <div className="bg-[#080810] border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-mono text-accent tracking-wider">WEBXR SESSION</span>
                        <span className="text-[9px] font-mono text-emerald-400 tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            READY
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-heading font-bold text-white">60</div>
                            <div className="text-[8px] font-mono text-cloud/40 tracking-wider">FPS</div>
                        </div>
                        <div>
                            <div className="text-2xl font-heading font-bold text-accent">4K</div>
                            <div className="text-[8px] font-mono text-cloud/40 tracking-wider">RENDER</div>
                        </div>
                        <div>
                            <div className="text-2xl font-heading font-bold text-white">RTX</div>
                            <div className="text-[8px] font-mono text-cloud/40 tracking-wider">RAY TRACE</div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-accent text-charcoal font-heading font-bold text-xs uppercase tracking-widest py-3.5 rounded hover:brightness-110 transition-all"
                    >
                        LAUNCH IN BROWSER
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded hover:bg-white/5 transition-all"
                    >
                        VR HEADSET
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── Booking Toast ─── */
function BookingToast({ showroom, onClose }: { showroom: string; onClose: () => void }) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
        >
            <div className="bg-[#0c0c0e]/95 backdrop-blur-xl border border-emerald-400/30 rounded-xl px-6 py-4 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                    <div className="text-sm font-heading font-bold text-white">Visit Requested</div>
                    <div className="text-[10px] font-mono text-cloud/50">{showroom} — confirmation sent to your email</div>
                </div>
                <button onClick={onClose} className="text-cloud/40 hover:text-white ml-4">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

/* ─── Config Feature Card with Tilt ─── */
function ConfigCard({ title, desc, icon: Icon, index }: { title: string; desc: string; icon: any; index: number }) {
    return (
        <TiltCard>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-[#0a0a0c]/80 backdrop-blur-xl border border-violet-500/15 rounded-2xl p-6 hover:border-violet-400/40 transition-all group h-full"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10">
                    <motion.div
                        className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <Icon className="w-6 h-6 text-violet-400" />
                    </motion.div>

                    <h4 className="text-base font-heading font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                        {title}
                    </h4>
                    <p className="text-sm text-cloud/50 font-body leading-relaxed group-hover:text-cloud/70 transition-colors">
                        {desc}
                    </p>
                </div>

                <motion.div
                    className="absolute bottom-4 right-4 text-4xl font-black text-violet-500/[0.05] group-hover:text-violet-400/[0.1] transition-colors"
                >
                    {String(index + 1).padStart(2, '0')}
                </motion.div>
            </motion.div>
        </TiltCard>
    );
}

export default function ExperiencePage() {
    const navigate = useNavigate();
    const [showVR, setShowVR] = useState(false);
    const [activeConfigPart, setActiveConfigPart] = useState(0);
    const [bookedShowroom, setBookedShowroom] = useState<string | null>(null);

    const handleBookVisit = (name: string) => {
        setBookedShowroom(name);
        setTimeout(() => setBookedShowroom(null), 4000);
    };

    return (
        <section className="relative h-screen w-full z-10 pointer-events-none flex flex-col overflow-y-auto overflow-x-hidden">
            {/* Atmospheric background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#080818] to-[#050510]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(139,92,246,0.04)_0%,_transparent_60%)]" />
            </div>

            <div className="pointer-events-auto sticky top-0 z-50 bg-transparent backdrop-blur-sm">
                <PageNav />
            </div>

            <div className="flex-1 pointer-events-auto">
                {/* ─── ACT 1: Virtual Test Drive ─── */}
                <div className="min-h-screen flex flex-col items-center justify-center relative px-6 md:px-16 py-20 overflow-hidden">
                    {/* Particle trail background */}
                    <ParticleTrail />

                    {/* Velocity lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
                                style={{ top: `${8 + i * 7}%` }}
                                animate={{
                                    x: ['-100%', '100%'],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2 + Math.random(),
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: 'linear'
                                }}
                            />
                        ))}
                    </div>

                    <div className="text-center max-w-4xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6"
                            >
                                <Zap className="w-4 h-4 text-orange-400" />
                                <span className="text-[10px] font-mono text-orange-400 tracking-[0.2em] uppercase">ACT I — VIRTUAL TEST DRIVE</span>
                            </motion.div>

                            <h2 className="text-6xl md:text-8xl font-heading font-black text-white tracking-tight leading-none mb-8">
                                <KineticText text="FEEL THE" />
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
                                    <KineticText text="VELOCITY" />
                                </span>
                            </h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="text-cloud/50 font-body text-lg leading-relaxed mb-12 max-w-xl mx-auto"
                            >
                                Immerse yourself in a photorealistic driving simulation. Feel the G-forces, hear the silence, experience the raw acceleration.
                            </motion.p>

                            {/* Dynamic Speed Display */}
                            <div className="flex flex-wrap justify-center gap-6 mb-12">
                                {[
                                    { icon: Timer, value: '2.3', unit: 'SECONDS', label: '0-100 KM/H' },
                                    { icon: Gauge, value: '412', unit: 'KM/H', label: 'TOP SPEED' },
                                    { icon: Battery, value: '890', unit: 'KM', label: 'RANGE' },
                                    { icon: Wind, value: '1.8', unit: 'G', label: 'DOWNFORCE' }
                                ].map((stat, i) => (
                                    <TiltCard key={i} className="relative">
                                        <div className="bg-[#0a0a0c]/90 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 min-w-[160px] hover:border-orange-400/50 transition-all">
                                            <stat.icon className="w-6 h-6 text-orange-400/60 mb-3" />
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-heading font-black text-white">
                                                    <AnimatedCounter value={stat.value} />
                                                </span>
                                                <span className="text-sm font-mono text-orange-400/70">{stat.unit}</span>
                                            </div>
                                            <div className="text-[10px] font-mono text-cloud/40 tracking-wider mt-1">{stat.label}</div>

                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 hover:opacity-100 transition-opacity" />
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowVR(true)}
                                className="relative bg-gradient-to-r from-orange-500 to-red-500 text-charcoal font-heading font-bold text-sm tracking-widest uppercase px-12 py-5 rounded-lg shadow-[0_4px_30px_rgba(255,107,53,0.4)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    LAUNCH WEBXR EXPERIENCE
                                    <Zap className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400 to-red-400 opacity-0 hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* ─── ACT 2: 360° Configurator ─── */}
                <div className="min-h-screen flex flex-col items-center justify-center relative px-6 md:px-16 py-20 overflow-hidden">
                    {/* Geometric background */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-20 left-20 w-96 h-96 border border-violet-500/10 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                            className="absolute bottom-20 right-20 w-64 h-64 border border-violet-500/10 rotate-45"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full"
                        />
                    </div>

                    <div className="text-center max-w-4xl relative z-10 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-6"
                            >
                                <Layers className="w-4 h-4 text-violet-400" />
                                <span className="text-[10px] font-mono text-violet-400 tracking-[0.2em] uppercase">ACT II — 360° CONFIGURATOR</span>
                            </motion.div>

                            <h2 className="text-6xl md:text-8xl font-heading font-black text-white tracking-tight leading-none mb-8">
                                <KineticText text="BUILD" />
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500">
                                    <KineticText text="YOUR ATOMA" />
                                </span>
                            </h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="text-cloud/50 font-body text-lg leading-relaxed mb-10 max-w-xl mx-auto"
                            >
                                Every surface, every material, every detail — configured to your exact specification in photorealistic detail.
                            </motion.p>

                            {/* Configurator Part Buttons */}
                            <div className="inline-flex flex-wrap gap-3 justify-center mb-8">
                                {['BODY', 'WHEELS', 'CABIN', 'LIGHTS', 'TRIM'].map((part, i) => (
                                    <motion.button
                                        key={part}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        onClick={() => setActiveConfigPart(i)}
                                        className={`px-5 py-2.5 rounded-lg border text-[10px] font-heading font-bold tracking-widest uppercase transition-all
                                            ${i === activeConfigPart ? 'border-violet-400 text-violet-400 bg-violet-400/10' : 'border-white/10 text-cloud/50 hover:border-white/20'}`}
                                    >
                                        {part}
                                    </motion.button>
                                ))}
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/reserve')}
                                className="relative bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-heading font-bold text-sm tracking-widest uppercase px-12 py-5 rounded-lg"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    OPEN FULL CONFIGURATOR
                                    <ChevronRight className="w-4 h-4" />
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Config Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full relative z-10">
                        {[
                            { title: 'CARBON FIBER', desc: 'Hand-crafted carbon fiber monocoque chassis', icon: Hexagon },
                            { title: 'CERAMIC BRAKES', desc: 'Carbon-titanium rotors with 6-piston calipers', icon: Disc },
                            { title: 'AIR SUSPENSION', desc: 'Active damping with predictive control', icon: Bolt },
                            { title: 'MATRIX LED', desc: 'Digital lighting with 1.2M pixels per unit', icon: Zap },
                            { title: 'NAPPA LEATHER', desc: 'Hand-stitched throughout the cabin', icon: Layers },
                            { title: 'AUDIO', desc: '21-speaker 1,200W surround system', icon: GaugeCircle },
                            { title: 'AUTOPILOT', desc: 'Level 4 autonomous driving ready', icon: Cpu },
                            { title: 'CONNECTIVITY', desc: '5G + WiFi 7 + satellite communication', icon: Wifi },
                        ].map((feature, i) => (
                            <ConfigCard key={i} {...feature} index={i} />
                        ))}
                    </div>
                </div>

                {/* ─── ACT 3: Showroom Finder ─── */}
                <div className="min-h-screen flex flex-col items-center justify-center relative px-6 md:px-16 py-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12 relative z-10"
                    >
                        <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-6 opacity-60" />
                        <div className="text-[10px] font-mono text-emerald-400 tracking-[0.4em] uppercase mb-4">ACT III — SHOWROOM FINDER</div>
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight leading-none mb-4">
                            FIND YOUR<br />SHOWROOM
                        </h2>
                        <p className="text-cloud/50 font-body leading-relaxed max-w-lg mx-auto">
                            Visit an ATOMA Experience Center. Feel the materials, sit in the cockpit, and schedule your private test drive.
                        </p>
                    </motion.div>

                    {/* Showroom Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full relative z-10">
                        {SHOWROOMS.map((showroom, i) => (
                            <motion.button
                                key={showroom.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                onClick={() => handleBookVisit(showroom.name)}
                                className="bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/8 rounded-xl p-5 text-left hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="text-sm font-heading font-bold text-white group-hover:text-emerald-400 transition-colors">
                                            {showroom.name}
                                        </div>
                                        <div className="text-[10px] font-mono text-cloud/40">{showroom.city}</div>
                                    </div>
                                    <Navigation className="w-4 h-4 text-cloud/20 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <div className="flex items-center gap-4 text-[9px] font-mono text-cloud/40">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {showroom.distance}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {showroom.hours}</span>
                                </div>
                                <div className="mt-3 flex items-center gap-1 text-[9px] font-heading font-bold text-emerald-400/60 group-hover:text-emerald-400 tracking-wider uppercase transition-colors">
                                    BOOK A VISIT <ChevronRight className="w-3 h-3" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* ─── ACT 4: Owner Stories ─── */}
                <div className="min-h-screen flex flex-col items-center justify-center relative px-0 py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12 relative z-10 px-6"
                    >
                        <Star className="w-12 h-12 text-amber-400 mx-auto mb-6 opacity-60" />
                        <div className="text-[10px] font-mono text-amber-400 tracking-[0.4em] uppercase mb-4">ACT IV — OWNER STORIES</div>
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight leading-none mb-4">
                            FROM THE<br />COMMUNITY
                        </h2>
                        <p className="text-cloud/50 font-body leading-relaxed max-w-lg mx-auto">
                            Real owners. Real stories. Real experiences from the ATOMA family.
                        </p>
                    </motion.div>

                    {/* Marquee Row 1 */}
                    <div className="w-full overflow-hidden mb-4 relative z-10">
                        <div className="flex animate-[marquee-right_50s_linear_infinite] hover:[animation-play-state:paused]">
                            {[...REVIEWS_ROW1, ...REVIEWS_ROW1].map((review, i) => (
                                <ReviewCard key={`r1-${i}`} review={review} />
                            ))}
                        </div>
                    </div>

                    {/* Marquee Row 2 */}
                    <div className="w-full overflow-hidden relative z-10">
                        <div className="flex animate-[marquee-left_45s_linear_infinite] hover:[animation-play-state:paused]">
                            {[...REVIEWS_ROW2, ...REVIEWS_ROW2].map((review, i) => (
                                <ReviewCard key={`r2-${i}`} review={review} />
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 relative z-10"
                    >
                        <button className="bg-amber-400/10 border border-amber-400/30 text-amber-400 font-heading font-bold text-sm tracking-widest uppercase px-10 py-4 rounded hover:bg-amber-400 hover:text-charcoal transition-all">
                            JOIN THE COMMUNITY →
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Modals & Toasts */}
            <AnimatePresence>
                {showVR && <VRExperienceModal onClose={() => setShowVR(false)} />}
            </AnimatePresence>
            <AnimatePresence>
                {bookedShowroom && <BookingToast showroom={bookedShowroom} onClose={() => setBookedShowroom(null)} />}
            </AnimatePresence>
        </section>
    );
}
