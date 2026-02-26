import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
    text: string;
    className?: string;
    elementType?: keyof JSX.IntrinsicElements;
    type?: 'chars' | 'words' | 'lines';
    delay?: number;
    triggerOnScroll?: boolean;
}

export default function SplitText({
    text,
    className = '',
    elementType: Element = 'h1',
    type = 'chars',
    delay = 0,
    triggerOnScroll = true,
}: SplitTextProps) {
    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const split = new SplitType(textRef.current, { types: type });

        const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

        // Reset initial state for GSAP
        gsap.set(targets, { opacity: 0, y: '100%', rotateX: -90 });

        const animProps = {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            stagger: 0.03,
            duration: 1.2,
            ease: 'power4.out',
            delay,
        };

        if (triggerOnScroll) {
            ScrollTrigger.create({
                trigger: textRef.current,
                start: 'top 85%',
                animation: gsap.to(targets, animProps),
            });
        } else {
            gsap.to(targets, animProps);
        }

        return () => {
            split.revert(); // clean up to avoid memory leaks
        };
    }, [type, text, delay, triggerOnScroll]);

    const Component = Element as any;
    return (
        <Component ref={textRef} className={className}>
            {text}
        </Component>
    );
}
