import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import CustomCursor from "./components/ui/CustomCursor";
import { useImmersionStore } from "./stores/useImmersionStore";
import type { PageName } from "./stores/useImmersionStore";

// Lazy load 3D components for better performance
const PremiumScene3D = lazy(() => import("./components/PremiumScene3D"));

// Lazy load page sections
const Hero = lazy(() => import("./components/sections/Hero"));
const ModelsPage = lazy(() => import("./components/sections/ModelsPage"));
const TechnologyPage = lazy(() => import("./components/sections/TechnologyPage"));
const ExperiencePage = lazy(() => import("./components/sections/ExperiencePage"));
const ReservePage = lazy(() => import("./components/sections/ReservePage"));

// Lazy load Canvas (Three.js provider)
const Canvas = lazy(() => import("@react-three/fiber").then(module => ({ default: module.Canvas })));

/* ─── Cinematic Page Transition Overlay ─── */
function PageTransitionOverlay() {
  const isTransitioning = useImmersionStore((s) => s.isPageTransitioning);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Dark cinematic bars — like a camera shutter */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-[#050505]"
            initial={{ height: 0 }}
            animate={{ height: "50%" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-[#050505]"
            initial={{ height: 0 }}
            animate={{ height: "50%" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
          />

          {/* Accent line sweep */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-10"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "50%", opacity: 1 }}
            exit={{ top: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* ATOMA text flash */}
          <motion.span
            className="relative z-20 text-[10px] font-mono text-accent/60 tracking-[0.5em] uppercase"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            ATOMA
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Route switcher with page-change awareness ─── */
function PageRoutes() {
  const location = useLocation();
  const setCurrentPage = useImmersionStore((s) => s.setCurrentPage);
  const setIsPageTransitioning = useImmersionStore((s) => s.setIsPageTransitioning);
  const setReserveFocusPart = useImmersionStore((s) => s.setReserveFocusPart);

  useEffect(() => {
    const path = location.pathname;
    const pageMap: Record<string, PageName> = {
      '/models': 'models',
      '/technology': 'technology',
      '/experience': 'experience',
      '/reserve': 'reserve',
    };
    const page = pageMap[path] || 'hero';

    // Trigger transition overlay
    setIsPageTransitioning(true);
    setReserveFocusPart(null); // reset reserve focus on page change

    // Let bars close, then reveal new page
    const timer = setTimeout(() => {
      setCurrentPage(page);
      setIsPageTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname, setCurrentPage, setIsPageTransitioning, setReserveFocusPart]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <Hero />
          </motion.div>
        } />
        <Route path="/models" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <ModelsPage />
          </motion.div>
        } />
        <Route path="/technology" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <TechnologyPage />
          </motion.div>
        } />
        <Route path="/experience" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <ExperiencePage />
          </motion.div>
        } />
        <Route path="/reserve" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <ReservePage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const currentPage = useImmersionStore((s) => s.currentPage);

  // Only show 3D canvas on pages that need it
  const showCanvas = currentPage === 'hero' || currentPage === 'models' || currentPage === 'reserve';

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative h-screen w-full bg-void text-mist font-body overflow-hidden noise-overlay">
          <CustomCursor />

          {/* Persistent 3D Canvas - only on Home, Models, Reserve */}
          {showCanvas && (
            <div className="absolute inset-0 z-0">
              <Suspense fallback={null}>
                <Canvas
                  shadows
                  gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance"
                  }}
                  dpr={[1, 2]}
                  camera={{ position: [0, 2, 8], fov: 40 }}
                  style={{ background: '#050508' }}
                >
                  <PremiumScene3D />
                </Canvas>
              </Suspense>
            </div>
          )}

          {/* Page Transition Overlay */}
          <PageTransitionOverlay />

          {/* Page Routes */}
          <Suspense fallback={null}>
            <PageRoutes />
          </Suspense>
        </main>
      )}
    </BrowserRouter>
  );
}

export default App;
