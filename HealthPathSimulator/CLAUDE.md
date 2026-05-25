# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server (hot-reload, typically http://localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Serve production build locally
npm run lint         # Run oxlint then eslint (both with auto-fix)
npm run format       # Run Prettier over src/
```

No test runner is configured yet.

## Architecture

Vue 3 + Vite single-page application. Entry chain: `index.html` → `src/main.js` → `src/App.vue`.

The `@/` alias maps to `./src/`.

The project is in early scaffold state — no routing, state management, or sub-components exist yet.

## Code Style

Enforced by Prettier + ESLint + Oxlint:

- No semicolons, single quotes, 100-character line width (`.prettierrc.json`)
- 2-space indentation, LF line endings (`.editorconfig`)
- `eslint-plugin-vue` rules active; browser globals available

Run `npm run lint` and `npm run format` before committing.

## Node Version

Requires Node `^20.19.0` or `>=22.12.0` (see `package.json` `engines` field).

# CLAUDE.md

## Skills

Ovaj projekt koristi custom skills u `.claude/skills/`.

- `vue-frontend.skill` — Vue 3, Pinia, Tailwind v4 pravila
- `/review` command — code review za Laravel + Vue projekte
