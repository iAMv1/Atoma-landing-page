import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_LINKS = [
    { label: 'MODELS', path: '/models' },
    { label: 'TECHNOLOGY', path: '/technology' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'RESERVE', path: '/reserve' },
];

export default function PageNav() {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between w-full pointer-events-auto relative z-50 px-6 md:px-10 py-6">
            {/* Logo */}
            <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
                <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 text-accent group-hover:scale-110 transition-transform">
                    {/* Hexagon shape */}
                    <path d="M20 2L35 11V29L20 38L5 29V11L20 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
                    {/* Inner triangle - lightning bolt direction */}
                    <path d="M22 8L12 20H18L14 32L30 16H22L22 8Z" fill="currentColor" className="text-accent" />
                    {/* Ring */}
                    <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                </svg>
                <div className="flex flex-col items-start">
                    <span className="text-2xl font-heading font-black tracking-tight text-white uppercase leading-none">ATOMA</span>
                    <span className="text-[8px] font-mono text-accent tracking-[0.3em] uppercase -mt-0.5">Electric</span>
                </div>
            </button>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-10 font-heading font-semibold text-xs uppercase tracking-widest">
                {NAV_LINKS.map(({ label, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `py-3 transition-colors duration-200 relative ${isActive ? 'text-accent' : 'text-cloud hover:text-white'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {label}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Right CTA */}
            <div className="flex items-center gap-6 font-heading font-bold text-xs uppercase tracking-widest">
                <NavLink to="/" className="text-white hover:text-accent transition-colors">HOME</NavLink>
                <NavLink
                    to="/reserve"
                    className="bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-charcoal px-6 py-2.5 rounded transition-all duration-300"
                >
                    PRE-ORDER
                </NavLink>
            </div>
        </nav>
    );
}
