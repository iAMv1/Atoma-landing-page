import { useEffect, useRef } from 'react';
import { useImmersionStore } from '../../stores/useImmersionStore';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const ringPos = useRef({ x: 0, y: 0 });
    const mousePos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    const setCursor = useImmersionStore((state) => state.setCursor);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Dot follows immediately (no delay)
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }

            // Update store with normalized coords
            setCursor({
                x: e.clientX,
                y: e.clientY,
                normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
                normalizedY: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };

        // Ring follows with damped lerp (runs every frame)
        const animateRing = () => {
            const damping = 0.12;
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * damping;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * damping;

            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            rafId.current = requestAnimationFrame(animateRing);
        };

        window.addEventListener('mousemove', handleMouseMove);
        rafId.current = requestAnimationFrame(animateRing);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId.current);
        };
    }, [setCursor]);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-primary pointer-events-none z-[99999] mix-blend-difference"
            />
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-primary pointer-events-none z-[99999]"
            />
        </>
    );
}
