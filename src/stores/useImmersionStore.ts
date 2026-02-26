import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface CursorState {
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
    state: 'default' | 'link' | '3d' | 'pressing' | 'scrolling' | 'hidden';
}

export type PageName = 'hero' | 'models' | 'technology' | 'experience' | 'reserve';

interface ImmersionState {
    // Scroll
    scrollProgress: number;
    scrollVelocity: number;
    isScrolling: boolean;
    currentSection: number | string;
    sectionProgress: Record<string, number>;

    // Cursor
    cursor: CursorState;
    cursorPosition: { x: number; y: number };

    // Loading
    loadingPhase: 'loading' | 'loaded' | 'revealing' | 'ready';
    loadProgress: number;

    // Interaction
    hoveredElement: string | null;
    activeInteraction: string | null;
    isHoveringInteractive: boolean;

    // Performance
    performanceTier: 'high' | 'medium' | 'low';

    // Car State
    isIgnitionOn: boolean;
    enginePower: number;
    carColor: string;

    // Multi-Page State
    currentPage: PageName;
    activeModelIndex: number;
    activeTechComponent: number;
    configuratorState: {
        selectedModel: number;
        selectedColor: string;
        wheelSize: string;
        interior: string;
        trim: string;
    };

    // Page Transition
    isPageTransitioning: boolean;

    // Reserve 3D Focus
    reserveFocusPart: 'body' | 'wheels' | 'interior' | null;

    // Drift / Smoke Effect
    isDrifting: boolean;

    // Actions
    setCursor: (update: Partial<CursorState>) => void;
    setLoadingPhase: (phase: ImmersionState['loadingPhase']) => void;
    setPerformanceTier: (tier: ImmersionState['performanceTier']) => void;
    setScrollProgress: (progress: number) => void;
    setScrollVelocity: (velocity: number) => void;
    setCurrentSection: (section: number | string) => void;
    setCursorPosition: (x: number, y: number) => void;
    setIsHoveringInteractive: (isHovering: boolean) => void;
    setIsIgnitionOn: (isOn: boolean) => void;
    setEnginePower: (power: number) => void;
    setCarColor: (color: string) => void;
    setCurrentPage: (page: PageName) => void;
    setActiveModelIndex: (index: number) => void;
    setActiveTechComponent: (index: number) => void;
    setConfiguratorState: (update: Partial<ImmersionState['configuratorState']>) => void;
    setIsPageTransitioning: (v: boolean) => void;
    setReserveFocusPart: (part: ImmersionState['reserveFocusPart']) => void;
    setIsDrifting: (v: boolean) => void;
}

export const useImmersionStore = create<ImmersionState>()(
    subscribeWithSelector((set) => ({
        scrollProgress: 0,
        scrollVelocity: 0,
        isScrolling: false,
        currentSection: 0,
        sectionProgress: {},

        cursor: {
            x: 0, y: 0,
            normalizedX: 0, normalizedY: 0,
            state: 'default',
        },
        cursorPosition: { x: 0, y: 0 },

        loadingPhase: 'loaded',
        loadProgress: 100,

        hoveredElement: null,
        activeInteraction: null,
        isHoveringInteractive: false,

        performanceTier: 'high',

        isIgnitionOn: false,
        enginePower: 0,
        carColor: '#0A0A0A',

        currentPage: 'hero',
        activeModelIndex: 0,
        activeTechComponent: 0,
        configuratorState: {
            selectedModel: 0,
            selectedColor: '#0A0A0A',
            wheelSize: '20"',
            interior: 'Black',
            trim: 'Carbon',
        },

        isPageTransitioning: false,
        reserveFocusPart: null,
        isDrifting: false,

        setCursor: (update) =>
            set((state) => ({ cursor: { ...state.cursor, ...update } })),
        setLoadingPhase: (phase) => set({ loadingPhase: phase }),
        setPerformanceTier: (tier) => set({ performanceTier: tier }),
        setScrollProgress: (progress) => set({ scrollProgress: progress }),
        setScrollVelocity: (velocity) => set({ scrollVelocity: velocity, isScrolling: Math.abs(velocity) > 0.01 }),
        setCurrentSection: (section) => set({ currentSection: section }),
        setCursorPosition: (x, y) => set({ cursorPosition: { x, y } }),
        setIsHoveringInteractive: (isHovering) => set({ isHoveringInteractive: isHovering }),
        setIsIgnitionOn: (isOn) => set({ isIgnitionOn: isOn }),
        setEnginePower: (power) => set({ enginePower: power }),
        setCarColor: (color) => set({ carColor: color }),
        setCurrentPage: (page) => set({ currentPage: page }),
        setActiveModelIndex: (index) => set({ activeModelIndex: index }),
        setActiveTechComponent: (index) => set({ activeTechComponent: index }),
        setConfiguratorState: (update) =>
            set((state) => ({ configuratorState: { ...state.configuratorState, ...update } })),
        setIsPageTransitioning: (v) => set({ isPageTransitioning: v }),
        setReserveFocusPart: (part) => set({ reserveFocusPart: part }),
        setIsDrifting: (v) => set({ isDrifting: v }),
    }))
);
