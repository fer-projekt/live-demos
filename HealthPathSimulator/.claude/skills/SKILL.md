---
name: vue-frontend
description: >
  Vue 3 + moderne frontend arhitekturne smjernice za produkcijski kod. Koristi ovaj skill
  uvijek kada se radi s Vue komponentama, Pinia store-om, Vue Routerom, Viteom,
  TypeScriptom u Vue kontekstu, API integracijama unutar Vue appa, ili kada se
  optimizira/refaktorira postojeći Vue/Nuxt kod. Trigger: Vue, Nuxt, Pinia,
  Vite config, Composition API, <script setup>, composables, SSR/SSG,
  Tailwind CSS v4, @theme konfiguracija, utility klase, dark mode, CVA varijante.
paths:
  - "**/*.vue"
  - "src/stores/**/*.ts"
  - "src/composables/**/*.ts"
  - "src/router/**/*.ts"
  - "vite.config.*"
  - "nuxt.config.*"
  - "**/*.css"
  - "**/*.blade.php"
---

# Vue & Modern Frontend Rules

Ove smjernice su obavezne za sve Vue 3 projekte. Cilj: čitljiv, performantan, tipski siguran kod koji se lako testira i održava.

## Pregled — kada koristiti reference fajlove

| Potreba | Fajl |
|---|---|
| Komponente, Composition API, `<script setup>` | `references/components.md` |
| Pinia stores, state management | `references/state.md` |
| Routing, navigacijske straže | `references/routing.md` |
| Performanse, lazy loading, Core Web Vitals | `references/performance.md` |
| TypeScript tipovi, generici, type safety | `references/typescript.md` |
| Testiranje (Vitest, Vue Test Utils) | `references/testing.md` |
| Tailwind CSS v4, @theme, CVA, dark mode | `references/tailwind.md` |

Uvijek pročitaj relevantni reference fajl **prije** nego počneš pisati kod za tu domenu.

---

## Brza pravila — primjenjuju se uvijek

### Komponente
- **Uvijek** `<script setup lang="ts">` — Options API je zabranjen u novom kodu
- Jedno odgovornost po komponenti; split ako ima >250 linija logike
- Props: definiraj s `defineProps<{ ... }>()` i `withDefaults()`
- Emits: definiraj s `defineEmits<{ ... }>()`
- Exposeaj samo ono što je nužno s `defineExpose()`

### Imenovanje
```
PascalCase    → komponente (UserCard.vue)
camelCase     → composables (useUserData.ts), varijable, metode
kebab-case    → URL rute, CSS klase, custom eventi
SCREAMING_SNAKE → env varijable, konstante
```

### Reaktivnost
- `ref()` za primitive, `reactive()` za objekte kad ima smisla
- **Nikad** ne destrukturiraj `reactive()` bez `toRefs()`
- `computed()` umjesto metoda za izvedene vrijednosti
- `watchEffect()` za side-effecte koji ovise o reaktivnim varijablama
- `watch()` samo kad trebaš old/new vrijednosti ili lazy execution

### Async & Data Fetching
- Koristi `useFetch()` composable (vlastiti ili iz VueUse/Nuxt) — ne čisti `fetch()` u komponentama
- Uvijek handle: loading / error / data stanja
- `<Suspense>` za async komponente na route razini
- Axios interceptori za auth tokene i error handling — ne ponavljaj po komponentama

### Template pravila
- `v-if` ima prioritet nad `v-show` osim kad je toggle čest (>animacije)
- `v-for` uvijek s `:key` koji je **stabilan unikatan ID** (ne index)
- Izbjegavaj `v-if` + `v-for` na istom elementu — koristiti `<template>` wrapper
- Kratki uvjeti u templateu; logiku premjesti u `computed`

### Stilizacija — Tailwind CSS v4 (standard ovog projekta)
- **Tailwind v4** je jedini CSS framework — ne miješati s Bootstrapom ili custom CSS-om
- Utility klase direktno u templateu/HTML-u — `@apply` je zadnji resort
- Design tokeni (boje, fontovi, spacing) isključivo u `@theme` bloku CSS-a — nikad hard-coded
- Dinamičke klase u Vue: cijeli naziv klase mora biti vidljiv Tailwindu (ne template literals s parcijalnim imenima)
- Scoped `<style scoped>` samo za kompleksne animacije ili CSS koji ne može biti utility
- Pročitaj `references/tailwind.md` za potpuna pravila, @theme setup i CVA pattern

---

## Kritična sigurnosna pravila

- **Nikad** `v-html` s user-generated sadržajem — XSS vektor
- Sanitiziraj HTML kroz `DOMPurify` ako moraš koristiti `v-html`
- API ključevi i tokeni isključivo u `.env` fajlovima (`.env.local` nije commitano)
- `VITE_` prefix samo za varijable koje su sigurne za exposure na client
- Provjeravaj dozvole na route razini (navigacijska straža), ne samo u UI-u

---

## Vite konfiguracija — osnove

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        }
      }
    }
  }
})
```

---

## Struktura projekta (standard)

```
src/
├── assets/          # Statički fajlovi (slike, fontovi)
├── components/
│   ├── ui/          # Generički UI (Button, Modal, Input...)
│   └── features/    # Feature-specifične komponente
├── composables/     # useXxx.ts — reusable logika
├── layouts/         # Layout komponente
├── pages/ (ili views/) # Route komponente
├── router/
│   └── index.ts
├── stores/          # Pinia stores
├── services/        # API layer (axios instance, endpoint funkcije)
├── types/           # Globalni TypeScript tipovi
└── utils/           # Pure helper funkcije
```

---

## Code review checklist

Prije commita provjeri:
- [ ] Nema `any` tipa bez TODO komentara s razlogom
- [ ] Svaki `watch` ima cleanup ili je `watchEffect` s auto-cleanup
- [ ] Komponente s listama imaju stabilne `:key` vrijednosti
- [ ] Async operacije imaju error handling
- [ ] Nema direktnog DOM manipuliranja (`document.querySelector`) — koristi `ref` + `nextTick`
- [ ] Nema business logike u templateu
- [ ] `.env.local` ili `.env.*.local` nije commitano
- [ ] Tailwind: nema `bg-gradient-to-*` (v3) — koristiti `bg-linear-to-*` (v4)
- [ ] Tailwind: dinamičke klase su kompletni stringovi, ne parcijalni template literals
- [ ] Tailwind: custom vrijednosti su u `@theme`, ne inline arbitrary values
