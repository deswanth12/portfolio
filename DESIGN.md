# Design System: Deswanth's Workshop (Digital Atelier & Engineering Archive)

## 1. Visual Theme & Atmosphere
A disciplined, authentic digital studio, physical engineering atelier, and editorial archive for Kuchi Deswanth. 
- **Density:** Balanced & Breathing (4/10). Generous whitespace that allows complex architectural diagrams and telemetry data to breathe without crowding.
- **Variance:** Asymmetric & Editorial (8/10). Rejects generic 3-column equal cards in favor of 2-column asymmetric case study rows and technical specification sidebars.
- **Motion:** Tactile Spring Micro-Physics (6/10). Tactile active feedback on clicks (`translateY(1px) scale(0.98)`), 120fps hardware-accelerated cursor, and zero neon glowing animations.
- **Atmosphere:** An authentic, physical drafting lab. Deep matte charcoal substrate overlaid with fine 48px drafting gridlines, single electric terracotta accent marker, and legible monospace engineering tags.

---

## 2. Color Palette & Roles

### Neutrals (Charcoal Substrate & Chalk)
- **Deep Substrate** (`#0c0e12`) — Root background surface with fine drafting grid.
- **Elevated Surface 1** (`#12151c`) — Primary container and case study card background.
- **Elevated Surface 2** (`#181c24`) — Hover states, toolbars, and telemetry boxes.
- **Elevated Surface 3** (`#202530`) — Modal dialog headers and active tab backgrounds.
- **Drafting Line** (`rgba(255, 255, 255, 0.08)`) — 1px architectural borders and dividers.
- **Strong Line** (`rgba(255, 255, 255, 0.16)`) — Focused card edges and active pill outlines.

### Typography Colors
- **Warm Chalk Primary** (`#f3f4f6`) — High-contrast display headlines, section titles, and active text.
- **Drafting Slate Secondary** (`#9ca3af`) — Explanatory paragraphs, case study problem statements, and descriptions.
- **Specimen Muted Tertiary** (`#6b7280`) — Metadata tags, timestamps, coordinates, and colophon notes.

### Signature Accent (Strictly Restrained)
- **Electric Terracotta / Workshop Orange** (`#ff5500`) — The sole signature accent color. Used strictly for:
  - Active index markers (`01 / 06`)
  - Primary button hover states
  - Terminal prompts (`deswanth@portfolio:~$`)
  - Masthead status dot indicator
  - Technical sub-heading numbers (`01 / The Problem`)
- **Accent Muted** (`rgba(255, 85, 0, 0.12)`) — Subtle badges and active state fills.
- **Accent Border** (`rgba(255, 85, 0, 0.35)`) — Selective tactical boundaries.

### Functional Status Indicators
- **Verified Emerald** (`#10b981`) — Hardware health status, optimal ROS 2 paths, and grounded citations.
- **Telemetry Warning Amber** (`#f59e0b`) — Obstacle detection warnings and pivot turn triggers.

---

## 3. Typography Architecture

### Font Families
- **Display & Grotesque Headlines:** `Plus Jakarta Sans` — Weight-driven architectural hierarchy (`--fw-bold: 700`, `--fw-black: 900`). Letter-spacing `--ls-tight` (`-0.02em`) to `--ls-tighter` (`-0.04em`).
- **Body Text:** `Plus Jakarta Sans` — Relaxed leading (`1.65`), 68ch max-width, high legibility.
- **Monospace & Telemetry:** `Fira Code` / `JetBrains Mono` — For code blocks, ROS 2 topics, radar telemetry, index markers, coordinates, and terminal commands.

### Type Scale Hierarchy
- `hero-name`: `clamp(2.6rem, 7.5vw, 6.8rem)` (900 weight, tight tracking)
- `section-main-heading`: `clamp(1.75rem, 3.5vw, 3rem)` (700 weight)
- `project-title`: `clamp(1.8rem, 2.6vw, 2.6rem)` (700 weight)
- `body-md`: `0.95rem` / `16px` (400 weight, 1.65 line-height)
- `label-mono`: `0.72rem` / `12px` (600 weight, uppercase tracking +0.05em)

---

## 4. Component Behaviors & Tokens

### Buttons
- **Tactile Active Physics:** `transform: translateY(1px) scale(0.98)` on `:active`.
- **Primary:** Solid Warm Chalk (`#fff`), Dark text (`#0c0e12`), transitions to Electric Terracotta on hover.
- **Secondary:** Transparent with `1px solid var(--line)`, subtle white hover background.
- **No Neon Glows:** Strict ban on outer glowing box-shadows.

### Cards & Case Study Rows
- **Asymmetric Grid:** Left column contains editorial narrative and architecture flow; right column contains genuine technical specifications and decision logs.
- **Lead Projects:** Subtle 2px terracotta top border for primary works (JanAI, Zeus, Sagiro).
- **Hover Feedback:** Smooth border highlight to `var(--line-strong)` and `-2px` subtle elevation.

### Modals & Drawers
- **Field Journal Drawer (`CaseStudyModal`):** Right-side sliding drawer (`max-width: 820px`, `height: 100%`) with ASCII system diagrams and technical trade-off decisions.
- **Command Palette (`CommandMenu`):** Top-centered modal (`Cmd+K`) with instant keyboard filtering.
- **Interactive Terminal (`TerminalModal`):** Dark terminal window executing real commands (`deswanth --help`, `bio`, `products`).

---

## 5. Layout & Responsive Principles
- **Grid Architecture:** 12-column responsive layout with max-width containment (`1320px`).
- **Desktop (1440px / 1280px):** Two-column asymmetric editorial rows, persistent bottom-right index tracker (`01 / 06 JANAI`), side-by-side radar telemetry.
- **Tablet (768px):** Collapses top navigation; stacks project editorial rows vertically.
- **Mobile (390px):** Single-column layout, touch targets >= 48px, vertical action button stacks, full-width drawers, zero horizontal overflow.

---

## 6. Motion & Interaction Standards
- **Cursor:** Hardware-accelerated precision cursor running via direct DOM `translate3d`, disabled on touch devices (`pointer: coarse`).
- **Audio Feedback:** Web Audio API synthesized mechanical tactile switch clicks, defaulting strictly to **OFF**.
- **Reduced Motion:** Mandatory `@media (prefers-reduced-motion: reduce)` block resetting all transition and animation durations to `0.01ms`.

---

## 7. Anti-Patterns (Banned AI Clichés)
1. **NO Emojis in UI** — All visual markers must be precision vector SVGs (Lucide / React Icons).
2. **NO `Inter` as primary font** — Uses `Plus Jakarta Sans` + `Fira Code`.
3. **NO Pure Black (`#000000`)** — Uses architectural charcoal substrate (`#0c0e12`).
4. **NO Neon Glows or Blurred Blobs** — No purple/cyan gradients or decorative fuzzy shadows.
5. **NO Fake Metrics** — No unsubstantiated "99.9% uptime" or fake percentage skill progress bars.
6. **NO 3D Cartoon Rooms** — Workshop is an editorial and artifact language, not a game.
7. **NO Boastful Jargon** — Strict ban on words like "world-class", "elite", "next-gen", "seamless", "synergy".
