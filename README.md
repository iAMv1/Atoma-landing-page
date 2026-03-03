# Premium EV Landing Page
> A cinematic, immersive 3D landing page for a premium electric vehicle. Built with React, Three.js, and GSAP.

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Development](#development)
- [Deployment](#deployment)

## Overview
The Premium EV Landing Page is designed to deliver an "Awwwards-tier" interactive user experience. It uses WebGL to render highly detailed 3D car models integrated seamlessly into the DOM scroll experience. As the user scrolls, the 3D scene responds intuitively, controlling camera paths, lighting, and model configurations to visually tell the story of the vehicle.

The target audience encompasses potential buyers and automotive enthusiasts, making initial load performance and buttery-smooth 60fps animations critical to the project's success.

## Features
- ✅ **Cinematic Scroll Interactivity:** Complex GSAP ScrollTrigger timelines tied directly to WebGL state.
- ✅ **Immersive 3D Rendering:** Utilizing `@react-three/fiber` and custom shader materials.
- ✅ **Dynamic Configurator:** Users can configure vehicle models and colors in real-time.
- ✅ **High Performance:** Smooth scrolling powered by `lenis`.

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repo-url>
cd premium-ev-landing-page

# Install dependencies
npm install

# Start the development server
npm run dev
```
The application will be available at http://localhost:5173.

## Architecture
The application bridges the gap between traditional DOM elements and a synchronized WebGL canvas.

- **Stack:** React 19, Vite, Tailwind CSS.
- **3D Engine:** Three.js rendering via React Three Fiber (R3F), managed through `@react-three/drei` helpers.
- **Animation System:** GSAP handles timeline orchestration, binding DOM scroll positions (via Lenis) to the 3D camera properties.
- **State Management:** Zustand is used to pass state from the DOM UI (like color pickers) directly into the Canvas components without unnecessary re-renders.

For deeper architectural context, read the **Architecture Decision Records (ADR)** located in `/docs/adr/`.

## Development

### Available Scripts
| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Compile TypeScript and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint to catch syntax and style issues |
| `npm run format` | *Recommended:* Auto-format code using Prettier |
| `npm run format:check` | *Recommended:* Check if code is formatted correctly |
| `npm run typecheck` | *Recommended:* Run TypeScript type checking across the project |

### Project Structure
- `/src/components`: React DOM components (UI, Navigation, Overlay).
- `/src/components/canvas`: WebGL components managed by React Three Fiber (Models, Lights, Cameras).
- `/src/store`: Zustand state management.
- `/src/hooks`: Custom React hooks, including GSAP integrations.
- `/public`: Static assets, notably the `.glb` 3D model files.

## Deployment
This project is configured as a standard Vite single-page application and is optimized for deployment on Vercel or similar static hosting providers.

1. Connect the GitHub repository to Vercel.
2. The default build settings (Framework: Vite, Build Command: `npm run build`, Output Directory: `dist`) will automatically execute.
3. Vercel will serve the application securely worldwide via its CDN.
