import { useRef } from 'react';
import { useScroll, useTransform, motion } from "framer-motion";
import MagneticButton from '../ui/MagneticButton';

export default function CTA() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-void z-10 overflow-hidden flex items-center justify-center">

            {/* Background Grid Pattern */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(90deg, var(--border-default) 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem'
                }}
            />

            <motion.div
                style={{ y: y1, opacity }}
                className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
            >
                <div className="text-[10px] text-accent mb-8 tracking-[0.4em] uppercase font-mono">
                    [ 04 / Initiation ]
                </div>

                <h2 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-white uppercase leading-[0.8] mb-12 mix-blend-difference">
                    Reserve <br />
                    <span className="text-transparent border-text">The</span> <br />
                    Future
                </h2>

                <p className="text-lg text-cloud font-body max-w-xl mx-auto mb-16 px-4">
                    Production slots for the ATOMA First Edition are strictly limited.
                    Configure your build and secure your allocation today.
                </p>

                <MagneticButton className="btn-primary group relative overflow-hidden px-12 py-6 text-sm">
                    <span className="relative z-10 flex items-center gap-4">
                        INITIATE BUILD
                        <span className="font-mono text-[10px] bg-white/20 px-2 py-1 rounded">01</span>
                    </span>
                </MagneticButton>

            </motion.div>

            <style>{`
        .border-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
      `}</style>
        </section>
    );
}
