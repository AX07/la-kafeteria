# Engineering, Performance & Copywriting Skills

This document aggregates the specialized skills and engineering frameworks for building ultra-high-performance 3D, animated, and high-conversion web applications.

---

## 1. Three.js & React Three Fiber (R3F) Engineering Skill

### Repositories
- **Main Repository:** [https://github.com/EnzeD/r3f-skills](https://github.com/EnzeD/r3f-skills)
- **Alternative Core Three.js Repository:** [https://github.com/alton47/threejs-skills](https://github.com/alton47/threejs-skills)
- **Direct File Link:** R3F Loaders & Performance Skill on GitHub

### What It Does
Feeds the LLM precise code structures, shader declarations, and memory management rules for 3D web applications. It prevents common graphics pipeline bugs such as canvas black-screens, z-fighting, memory leaks from undisposed geometries/materials, and broken texture paths.

### Why You Need It
Crucial for rendering interactive 3D assets smoothly without dropping frames or triggering browser WebGL context losses on mobile devices.

---

## 2. Web Vitals & Asset Preloading Optimization Skill

### Repositories
- **Main Repository:** [https://github.com/alton47/threejs-skills](https://github.com/alton47/threejs-skills)
- **Direct File Link:** Three.js Performance Optimization Skill on GitHub

### What It Does
Forces the AI to write performance-first code. It enforces:
- Asset preloading (`useGLTF.preload`)
- Draco mesh compression
- Lazy loading and dynamic imports
- WebP/AVIF image fallbacks

### Why You Need It
Ensures the site passes Google Core Web Vitals with sub-500ms initial response times and maintains 60fps rendering even when loading high-resolution GLB models over mobile 4G networks.

---

## 3. Conversion-Driven Copywriting & Sales Architecture Skill

### Repositories
- **Main Repository:** [https://github.com/jezweb/claude-skills](https://github.com/jezweb/claude-skills)
- **Direct File Link:** Copywriting & Conversion Skill on GitHub

### What It Does
Prevents the AI from outputting generic placeholder copy (e.g., "Welcome to our agency" or "We offer the best services"). It forces the LLM to write high-converting, direct-response copy focused on:
- OTA Bypass
- Zero-commission direct bookings
- Sub-500ms speed guarantees
- Instant 1-tap WhatsApp and direct call triggers

### Why You Need It
Guarantees that every generated client or staging site is pre-loaded with persuasive, niche-specific copy ready to send directly to prospective clients and stakeholders.

---

## 4. Design System & Animation Physics Skills

### Repositories
- **Main Repository:** [https://github.com/emilkowalski/skills](https://github.com/emilkowalski/skills)
- **Apple Design & Gestures:** `emilkowalski/apple-design`
- **Animation Physics:** `emilkowalski/skills (emil-design-eng.md)`

### What It Does
Defines fluid UI behaviors, tactile spring physics (`stiffness`, `damping`, `mass`), gestures, and 60fps scroll & hover interactions that feel native rather than mechanical.

---

## 5. Layout & Anti-Generic Rule Skill

### Repositories
- **Main Repository:** [https://github.com/jezweb/claude-skills](https://github.com/jezweb/claude-skills)
- **Direct Reference:** `jezweb/claude-skills (frontend-design)`

### What It Does
Enforces strict anti-AI-slop design principles:
- Custom dark-mode palettes (e.g., pitch black `#050505` or espresso `#1b1411`)
- Zero-pill discipline (no static pill enclosures on metadata)
- Editorial typography pairings (high-contrast Serif + clean Sans)
- Generous whitespace and restrained tactile luxury

---

## Master Stack Summary for Google AI Studio

To get complete coverage, merge these 5 core skills into your Google AI Studio System Instructions:

| Domain | Skill Source | Focus Area |
| :--- | :--- | :--- |
| **Design System** | `emilkowalski/apple-design` | Fluid UI & gestures |
| **Animation Physics** | `emilkowalski/skills (emil-design-eng.md)` | 60fps scroll & hover interactions |
| **Layout & Anti-Generic Rule** | `jezweb/claude-skills (frontend-design)` | Custom dark-mode layouts & zero-pill discipline |
| **3D Mechanics** | `EnzeD/r3f-skills` | Draco GLTF loading & 3D canvas management |
| **Copywriting** | `jezweb/claude-skills (copywriting)` | Direct WhatsApp conversion copy |
