import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export default function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for X and Y displacement
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

    // Transform values slightly for the inner text to give a 3D parallax feel
    const textX = useTransform(x, (val) => val * 0.5);
    const textY = useTransform(y, (val) => val * 0.5);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!buttonRef.current || !isHovered) return;

            const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // Max displacement 20px
            x.set(distanceX * 0.3);
            y.set(distanceY * 0.3);
        };

        if (isHovered) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            x.set(0);
            y.set(0);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHovered, x, y]);

    return (
        <motion.button
            ref={buttonRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ x, y }}
            className={`relative inline-flex items-center justify-center overflow-hidden transition-colors ${className}`}
            {...(props as any)}
        >
            <motion.span style={{ x: textX, y: textY }} className="relative z-10 pointer-events-none">
                {children}
            </motion.span>
        </motion.button>
    );
}
