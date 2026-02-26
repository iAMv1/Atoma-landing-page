import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="relative w-full max-w-xl px-10">
                {/* Track Line */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />

                {/* Drifting Tyre Container */}
                <motion.div
                    className="relative z-10 flex flex-col items-center"
                    style={{ x: `${progress}%`, left: "-2rem" }}
                    transition={{ duration: 0.03, ease: "linear" }}
                >
                    {/* Tyre SVG */}
                    <motion.div
                        className="w-16 h-16 flex items-center justify-center"
                        animate={{
                            rotate: 360 * 5,
                            skewX: [0, -10, 0], // Drifting tilt
                        }}
                        transition={{
                            rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                            skewX: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                        }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full text-accent-warm drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]">
                            {/* Outer Tyre */}
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                            {/* Inner Hub */}
                            <circle cx="50" cy="50" r="15" fill="currentColor" />
                            {/* Spokes */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                                <rect
                                    key={deg}
                                    x="48"
                                    y="15"
                                    width="4"
                                    height="20"
                                    fill="currentColor"
                                    transform={`rotate(${deg}, 50, 50)`}
                                />
                            ))}
                        </svg>
                    </motion.div>

                    {/* Drifting Smoke / Sparks */}
                    <AnimatePresence>
                        {progress > 5 && progress < 95 && (
                            <motion.div
                                className="absolute -bottom-2 -left-4 flex gap-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 bg-accent-warm/40 rounded-full blur-sm"
                                        animate={{
                                            x: [-10, -40],
                                            y: [0, -10],
                                            opacity: [1, 0],
                                            scale: [0.5, 1.5]
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Progress Text */}
                <div className="mt-12 text-center">
                    <motion.span
                        className="text-4xl font-bold tracking-tighter text-white font-mono"
                    >
                        {progress}%
                    </motion.span>
                    <p className="text-primary/40 text-xs uppercase tracking-widest mt-2">Initializing Systems</p>
                </div>
            </div>

            {/* Narrative Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 text-center"
            >
                <p className="text-xs text-primary/20 uppercase tracking-[0.4em]">Engineered for Silence. Born for Power.</p>
            </motion.div>
        </motion.div>
    );
}
