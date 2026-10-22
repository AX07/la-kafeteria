# Engineering, Performance & Design Skills System

This reference document compiles the five core creative engineering skills required for modern, ultra-high-performance web applications.

---

## 1. Three.js & React Three Fiber (R3F) Engineering Skill

**Primary Repositories:**
- Main: [https://github.com/EnzeD/r3f-skills](https://github.com/EnzeD/r3f-skills)
- Alternative Core Three.js: [https://github.com/alton47/threejs-skills](https://github.com/alton47/threejs-skills)

### Purpose & Architecture
Feeds precise code structures, shader declarations, and memory management rules for 3D web applications. It prevents common production bugs like canvas black-screens, z-fighting, memory leaks, and broken texture paths. Crucial for rendering interactive 3D assets smoothly at 60/120 fps without dropping frames.

### Core Engineering Rules:
1. **Memory & Lifecycle Hygiene:**
   - Always track and explicitly dispose of all geometries (`geometry.dispose()`), materials (`material.dispose()`), textures (`texture.dispose()`), and renderers (`renderer.dispose()`) inside cleanup hooks (`useEffect` return or `onUnmount`).
   - Remove child DOM elements from canvas containers to prevent duplicate canvas creation across route changes or HMR cycles.
   - Cancel animation frame loops (`cancelAnimationFrame(requestId)`) on unmount.

2. **Render Optimization & Pipeline:**
   - Cap `devicePixelRatio` at `Math.min(window.devicePixelRatio, 2)` to avoid GPU melting on high-density Retina and mobile displays.
   - Set `powerPreference: 'high-performance'` on WebGLRenderer.
   - Configure `toneMapping = THREE.ACESFilmicToneMapping` and calibrated exposure for realistic color fidelity.
   - Only call `renderer.render()` on frame updates; throttle rendering when canvas is off-screen using `IntersectionObserver`.

3. **Fallback & Robustness:**
   - Detect WebGL capability (`WebGLRenderingContext`) before initialization. If unsupported or if context is lost (`webglcontextlost`), gracefully fall back to high-resolution WebP/SVG artwork without breaking the UI.

---

## 2. Web Vitals & Asset Preloading Optimization Skill

**Repository:**
- Main: [https://github.com/alton47/threejs-skills](https://github.com/alton47/threejs-skills)

### Purpose & Architecture
Forces performance-first code. Enforces asset preloading, mesh compression, lazy loading, responsive modern image formats (WebP/AVIF), and optimized layout shifts so the site passes Google Core Web Vitals (LCP < 1.2s, FID/INP < 100ms, CLS = 0).

### Core Optimization Guidelines:
1. **Critical Path & Asset Loading:**
   - Preload primary fonts using `<link rel="preconnect">` and `<link rel="dns-prefetch">` to eliminate FOUT/FOIT.
   - Use `loading="lazy"` on all below-the-fold media assets; specify explicit `aspect-ratio` or width/height attributes on containers to prevent Cumulative Layout Shift (CLS).
2. **Bundle & Execution Economy:**
   - Tree-shake icons and heavy libraries; avoid loading full monolithic packages when individual symbols suffice.
   - Keep JavaScript main-thread work minimal; defer non-critical scripts and modal initializers until user engagement.
3. **Responsive Visual Cache:**
   - Serve optimized CDN image parameters (`auto=format&fit=crop&q=80`) suited to client viewport widths.

---

## 3. Conversion-Driven Copywriting & Sales Architecture Skill

**Repository:**
- Main: [https://github.com/jezweb/claude-skills](https://github.com/jezweb/claude-skills)

### Purpose & Architecture
Eliminates generic placeholder copy ("Welcome to our restaurant", "We serve good food"). Replaces it with direct-response, authentic local storytelling, zero-commission order dispatch, and 1-tap conversion triggers (WhatsApp pre-filled message, Google Maps direct route, and clear CTA visual hierarchies).

### Conversion Architecture Rules:
1. **Headline Specificity:**
   - Headlines must evoke emotional sensory desire and local sense of place (e.g., *"El lugar donde el aroma del café encuentra el sabor perfecto · San Pedro Alcántara"*).
2. **High-Velocity CTAs:**
   - Primary action must be immediate and tangible: *"Ver Menú / Carta"* or *"1-Tap WhatsApp Mesa"*.
   - Never force user registration or account creation for simple menu browsing or reservations.
3. **Frictionless WhatsApp Dispatch:**
   - Generate pre-formatted, human-friendly WhatsApp messages with table numbers, customer notes, item lists with bread types, and exact totals.
4. **Social Proof Anchoring:**
   - Display real ratings (`5/5 ★★★★★ Google Reviews`), neighborhood references, verified customer testimonials, and dish weights (`350 gr.`).

---

## 4. Design System & Animation Physics Skills (Emil Kowalski)

**Repository:**
- Main: [https://github.com/emilkowalski/skills](https://github.com/emilkowalski/skills)

### Purpose & Architecture
Implements tactile, organic motion principles inspired by Emil Kowalski and modern Apple/Awwwards interfaces. Enforces spring physics over linear ease curves, gestures, and layout continuity.

### Motion & Physics Rules:
1. **Spring Constants:**
   - Standard spring physics: `transition: { type: "spring", stiffness: 220, damping: 28 }` for smooth, non-bouncy settle.
   - Snappier micro-interactions: `stiffness: 280, damping: 22` for button taps (`whileTap={{ scale: 0.96 }}`) and image hover zoom.
2. **Layout Continuity & Exit Animations:**
   - Use `AnimatePresence` with `mode="wait"` or `popLayout` for modal backdrops and drawer slide-overs.
   - Avoid animating layout properties like `width`, `height`, `left`, `top`; prefer transform-based animations (`scale`, `translate`, `opacity`) for 60fps GPU acceleration.
3. **Reduced Motion Courtesy:**
   - Honor `prefers-reduced-motion: reduce` for accessibility compliance.

---

## 5. Layout & Anti-Generic Rule Skill

**Repository:**
- Main: [https://github.com/jezweb/claude-skills](https://github.com/jezweb/claude-skills)

### Purpose & Architecture
Prevents generic "AI template slop" (uniform cookie-cutter boxes, repetitive equal-sized card grids, uninspired SaaS layouts). Introduces editorial variety, high-contrast typography, asymmetrical layout tension, and tactile depth.

### Layout Principles:
1. **Typographic Hierarchy & Contrast:**
   - Pair an expressive display serif (`Playfair Display`) for headlines with a clean geometric sans (`DM Sans`) for descriptions and UI, and monospace (`font-mono`) for prices, weights, and technical metadata.
2. **Asymmetrical Balance:**
   - Break monotony by pairing text columns with asymmetric visual compositions (e.g., overlapping circular ceramic dish presentations, architectural arched frames, subtle organic contour lines).
3. **Editorial Whitespace:**
   - Provide generous vertical pacing (`py-16` to `py-24`), distinct section dividers with brand-toned borders (`border-[#a66a38]/20`), and rich dark canvas tones (`#1b1411` espresso base with `#231a15` walnut cards).
