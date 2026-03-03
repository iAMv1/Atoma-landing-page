# ADR-001: Frontend Technology Stack for Premium EV Landing Page

## Status
Accepted (2026-02-28)

## Context
The project requires a high-performance, visually stunning landing page for a premium electric vehicle. The requirements dictate a rich user experience with fluid animations, immersive 3D car models, and a sleek, modern UI. The stack needs to support rapid development while ensuring excellent runtime performance.

## Decision
We will use the following core technologies for the frontend stack:
- **React 19 & Vite:** For the core UI framework and fast build tooling.
- **Three.js & React Three Fiber (R3F):** For rendering and managing the 3D car models and scenes.
- **GSAP (GreenSock) & Lenis:** For complex, high-performance scroll choreography and smooth scrolling.
- **Tailwind CSS:** For styling the DOM elements efficiently.
- **Zustand:** For lightweight global state management (e.g., UI state, 3D model loading states).

## Consequences

### Positive
- **Visual Fidelity:** R3F and GSAP provide the necessary tools for cinematic, Awwwards-tier visual storytelling and 3D integration.
- **Developer Experience (DX):** Vite offers instant HMR. Tailwind enables rapid styling. Zustand avoids the boilerplate of Redux.
- **Performance:** Lenis and GSAP are optimized for scroll performance, preventing jank common in heavy 3D scenes.
- **Ecosystem:** Massive community support for React and Three.js ensures easy access to solutions and libraries (like `@react-three/drei`).

### Negative
- **Learning Curve:** Developers must understand both the React/DOM paradigm and the Three.js/WebGL declarative paradigm.
- **Bundle Size:** Three.js and GSAP are significant dependencies, requiring careful chunking and lazy loading to maintain fast initial load times.
- **Complexity:** Synchronizing DOM scroll state (Lenis/GSAP) with WebGL canvas state (R3F) requires precise architectural patterns.

## Alternatives Considered
- **Next.js:** Considered for SEO and SSR, but deemed unnecessary complexity for a pure, heavily client-side rendered WebGL landing page where initial interactivity is paramount.
- **Vanilla Three.js (No React):** Offers maximum control but sacrifices the declarative component model and ecosystem velocity of React.
- **Framer Motion for all animations:** Excellent for standard UI animations, but GSAP ScrollTrigger remains superior for complex, chained scroll choreography tied to 3D scene progress.
