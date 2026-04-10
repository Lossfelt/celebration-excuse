# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Celebration Excuse is a mobile-first webapp that finds reasons to celebrate today — both global holidays/observances and creative personal milestones based on the user's birthday. Built with Vite + vanilla TypeScript, no framework.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Type-check (tsc) + production build to dist/
npm run preview  # Preview production build locally
npx tsc --noEmit # Type-check only
```

## Architecture

The app is pure client-side with no backend. All data is bundled.

### Data Flow

1. On load, `main.ts` queries today's date against the holiday database and (if a birthday is saved in localStorage) the milestone calculator
2. Results are combined into a unified `Celebration[]` array and rendered as cards
3. Users can filter between personal/global/all celebrations

### Key Modules

- **`src/holidays/fixed.ts`** — Large record keyed by `"MM-DD"` containing ~250 fixed-date holidays worldwide (national, religious, cultural, international, fun). This is the primary data file to extend when adding new holidays.
- **`src/holidays/movable.ts`** — Algorithmic calculations for Western/Orthodox Easter and derived dates, nth-weekday holidays (Thanksgiving, Mother's Day, etc.), plus precomputed tables (2024–2030) for Islamic, Hebrew, Chinese, Hindu, and Buddhist calendar holidays. Precomputed tables need extending when approaching 2030.
- **`src/holidays/index.ts`** — Combines fixed + movable lookups into a single `getHolidaysForDate(date)` function.
- **`src/milestones.ts`** — Calculates personal milestones from a birthday: round numbers in various time units, Fibonacci days, powers of 2, palindromes, repdigits, perfect squares, pi/e/phi-related milestones, planet years, golden/double/triple birthdays.
- **`src/confetti.ts`** — Lightweight canvas-based confetti particle system.
- **`src/main.ts`** — App entry point: wires up DOM events, builds celebrations, renders cards, manages filter state and localStorage persistence.
- **`src/style.css`** — All styles. Mobile-first with breakpoints at 480px and 768px. Uses CSS custom properties for theming.

### Holiday Data Patterns

Fixed holidays use the format:
```typescript
"MM-DD": [{ name, description, type, regions? }]
```

Movable holidays return `DatedHoliday[]` (Holiday + month/day) for a given year. When adding a new movable holiday, add it to the `getMovableHolidays()` function.

### UI Language

All user-facing text is in Norwegian (bokmål). Holiday names are in Norwegian where a natural translation exists.
