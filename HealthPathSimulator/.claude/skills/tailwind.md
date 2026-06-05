# Tailwind CSS v4 — Kompletna referenca

> **Ovaj projekt koristi Tailwind CSS v4** (siječanj 2025+).  
> v4 je nova arhitektura — `tailwind.config.js` više **ne postoji**.  
> Svaka konfiguracija ide u CSS putem `@theme` direktive.

---

## Instalacija i setup (v4 standard)

### Vite plugin (preporučeno za Vue projekte)
```bash
pnpm add tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),  // umjesto PostCSS konfiguracije
  ],
})
```

### PostCSS (za Laravel/Blade projekte)
```bash
pnpm add tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### CSS entry fajl
```css
/* resources/css/app.css  ILI  src/assets/main.css */

/* v4: jedan @import umjesto tri @tailwind direktive */
@import "tailwindcss";

/* Odmah nakon — projektni design tokens */
@theme {
  /* ... */
}
```

---

## @theme — konfiguracija design sistema

`@theme` je zamjena za `theme:` u `tailwind.config.js`. Definira CSS custom properties koje Tailwind automatski pretvara u utility klase.

```css
@import "tailwindcss";

@theme {
  /* ===== BOJE ===== */
  --color-brand-50:  oklch(0.97 0.02 250);
  --color-brand-100: oklch(0.93 0.05 250);
  --color-brand-500: oklch(0.55 0.20 250);
  --color-brand-600: oklch(0.48 0.19 250);
  --color-brand-900: oklch(0.25 0.08 250);

  --color-surface:    oklch(0.99 0 0);
  --color-surface-alt: oklch(0.96 0.005 250);
  --color-border:     oklch(0.90 0.005 250);

  /* ===== TIPOGRAFIJA ===== */
  --font-sans: "Inter Variable", "Inter", system-ui, sans-serif;
  --font-display: "Satoshi", "Cal Sans", sans-serif;
  --font-mono: "JetBrains Mono Variable", "Fira Code", monospace;

  /* ===== BREAKPOINTI ===== */
  --breakpoint-xs: 480px;
  /* sm, md, lg, xl, 2xl su defaultni — ne treba ih redeklarirati */

  /* ===== SPACING (samo ako trebaš custom vrijednosti) ===== */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;

  /* ===== BORDER RADIUS ===== */
  --radius-card: 0.75rem;
  --radius-button: 0.5rem;
  --radius-pill: 9999px;

  /* ===== SJENE ===== */
  --shadow-card: 0 1px 3px oklch(0 0 0 / 0.08), 0 4px 16px oklch(0 0 0 / 0.06);
  --shadow-elevated: 0 8px 32px oklch(0 0 0 / 0.12);

  /* ===== ANIMACIJE ===== */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Korišćenje @theme vrijednosti kao CSS varijabli

```css
/* Svaki @theme token je dostupan kao CSS varijabla u cijeloj aplikaciji */
.custom-card {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}
```

---

## Dark mode

```css
/* Preporučeno: class-based dark mode */
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));
```

```vue
<!-- Korišćenje -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

```ts
// Toggle u Vue komponenti
const isDark = useDark()  // VueUse composable (preporučeno)
// ILI
document.documentElement.classList.toggle('dark')
```

---

## Utility klase — v4 izmjene kojih treba biti svjestan

### Preimenovani utilities (v3 → v4)
```
bg-gradient-to-r     →  bg-linear-to-r     ⚠️ ČESTA GREŠKA
bg-gradient-to-l     →  bg-linear-to-l
flex-shrink-0        →  shrink-0
flex-shrink          →  shrink
flex-grow            →  grow
overflow-ellipsis    →  text-ellipsis
decoration-slice     →  box-decoration-slice
decoration-clone     →  box-decoration-clone
```

### Gradijenti — novi mogućnosti u v4
```html
<!-- Kut gradienta -->
<div class="bg-linear-45 from-brand-500 to-brand-900">

<!-- Eksplicitne pozicije -->
<div class="bg-linear-to-r from-brand-500 from-20% via-purple-500 via-60% to-pink-500">

<!-- Radijalni gradijent -->
<div class="bg-radial from-brand-200 to-brand-600">
```

### Container queries (ugrađeni u v4, nema plugin)
```html
<div class="@container">
  <div class="@sm:grid-cols-2 @lg:grid-cols-3 grid gap-4">
```

### Arbitrary values — sintaksa s CSS varijablama
```html
<!-- v3 sintaksa (ne radi za CSS varijable u v4) -->
<div class="w-[--my-width]">  ✅ radi
<div class="w-(--my-width)">  ✅ radi (nova v4 sintaksa za varijable)

<!-- Preporučeno: definiraj u @theme, koristi utility -->
```

---

## Custom utilities i komponente

### @utility — vlastite utility klase
```css
@utility truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@utility container-prose {
  max-width: 65ch;
  margin-inline: auto;
}
```

### @layer components — za ponavljajuće kombinacije
```css
/* Koristiti RIJETKO — utility klase su uvijek preferirane */
@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 px-4 py-2 rounded-button
           bg-brand-500 text-white font-medium
           hover:bg-brand-600 focus-visible:outline-2
           focus-visible:outline-brand-500 focus-visible:outline-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors duration-150;
  }

  .card {
    @apply bg-surface rounded-card shadow-card border border-border p-6;
  }
}
```

**Pravilo**: `@apply` je zadnji resort. Najprije pokušaj utility klase direktno u HTML-u.

---

## Vue komponente — Tailwind integracija

### Scoped stilovi + Tailwind
```vue
<template>
  <div class="relative overflow-hidden rounded-card bg-surface shadow-card">
    <div class="p-6">
      <h2 class="text-xl font-display font-semibold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<style scoped>
/* Scoped CSS + Tailwind @theme varijable — ispravna kombinacija */
.hero-gradient {
  background: linear-gradient(135deg, var(--color-brand-500), var(--color-brand-900));
}
</style>
```

### Dinamičke klase — ispravno i pogrešno
```vue
<!-- ❌ LOŠE: Tailwind ne može detektirati dinamički generirane stringove -->
<div :class="`text-${color}-500`">

<!-- ✅ DOBRO: cijele klase u objektu -->
<div :class="{
  'text-red-500': status === 'error',
  'text-green-500': status === 'success',
  'text-yellow-500': status === 'warning',
}">

<!-- ✅ DOBRO: lookup objekt s cijelim klasama -->
<script setup>
const statusClasses = {
  error: 'text-red-500 bg-red-50 border-red-200',
  success: 'text-green-600 bg-green-50 border-green-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
} as const

const classes = computed(() => statusClasses[props.status])
</script>
```

### CVA pattern za varijante komponenti

```ts
// src/utils/cva.ts — ili koristiti paket `cva`
import { cva, type VariantProps } from 'cva'

export const buttonVariants = cva(
  // Baza
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:   'bg-brand-500 text-white hover:bg-brand-600 focus-visible:outline-brand-500',
        secondary: 'bg-surface border border-border text-gray-900 hover:bg-surface-alt',
        ghost:     'text-gray-600 hover:bg-surface-alt hover:text-gray-900',
        danger:    'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm:  'h-8  px-3 text-sm rounded',
        md:  'h-10 px-4 text-sm rounded-button',
        lg:  'h-11 px-6 text-base rounded-button',
        xl:  'h-12 px-8 text-base rounded-lg',
        icon:'h-10 w-10 rounded-button',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

```vue
<!-- Button.vue -->
<script setup lang="ts">
import { buttonVariants, type ButtonVariants } from '@/utils/cva'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}>(), {
  variant: 'primary',
  size: 'md',
})
</script>

<template>
  <button :class="buttonVariants({ variant, size })">
    <slot />
  </button>
</template>
```

---

## Blade templati — Tailwind integracija

### Responsive pattern (mobile-first)
```html
<div class="
  grid grid-cols-1 gap-4
  sm:grid-cols-2
  lg:grid-cols-3 lg:gap-6
  xl:grid-cols-4
">
```

### Prose klase za CMS rich text sadržaj
```html
{{-- Za StreamField rich text blokove --}}
<div class="prose prose-lg prose-gray
            prose-headings:font-display
            prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
            max-w-none
            dark:prose-invert">
  {!! $block->value !!}
</div>
```

Instalacija: `pnpm add @tailwindcss/typography`
```css
@import "@tailwindcss/typography";
```

### Form elementi
```html
{{-- Input --}}
<input
  type="text"
  class="w-full rounded-button border border-border bg-surface px-3 py-2 text-sm
         placeholder:text-gray-400
         focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
         disabled:cursor-not-allowed disabled:opacity-50"
>

{{-- Select --}}
<select class="w-full rounded-button border border-border bg-surface px-3 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-brand-500">
```

---

## Tailwind + Alpine.js (Blade projekti)

```html
<!-- Prijelazi s Alpine + Tailwind -->
<div
  x-data="{ open: false }"
  x-show="open"
  x-transition:enter="transition ease-out duration-200"
  x-transition:enter-start="opacity-0 -translate-y-1"
  x-transition:enter-end="opacity-100 translate-y-0"
  x-transition:leave="transition ease-in duration-150"
  x-transition:leave-start="opacity-100 translate-y-0"
  x-transition:leave-end="opacity-0 -translate-y-1"
>
```

---

## Zabranjena praksa

```html
<!-- ❌ Inline style za vrijednosti koje su u @theme -->
<div style="color: #3b82f6">
<!-- ✅ -->
<div class="text-brand-500">

<!-- ❌ Mješanje Tailwind i Bootstrap na istom projektu -->
<!-- ✅ Jedan CSS framework po projektu — Tailwind 4 je standard -->

<!-- ❌ @apply za jednostavne utility kombinacije -->
.title { @apply text-xl font-bold text-gray-900; }
<!-- ✅ Direktno u HTML/template -->
<h1 class="text-xl font-bold text-gray-900">

<!-- ❌ Dinamički generirani djelomični nazivi klasa -->
<div :class="`bg-${color}-500`">
<!-- ✅ Kompletan naziv klase uvijek vidljiv Tailwindu -->
<div :class="color === 'blue' ? 'bg-blue-500' : 'bg-red-500'">
```

---

## Code review checklist — Tailwind

- [ ] Koristi li se `@import "tailwindcss"` (ne stare `@tailwind` direktive)?
- [ ] Postoji li `@theme` blok s projektnim design tokenima?
- [ ] Nema `tailwind.config.js` (ili je migriran u `@theme`)?
- [ ] Gradijenti koriste `bg-linear-to-*` (ne stari `bg-gradient-to-*`)?
- [ ] Dinamičke klase u Vue/JS su kompletni stringovi (ne template literals s parcijalnim klasama)?
- [ ] `@apply` korišten samo u `@layer components` i samo kao zadnji resort?
- [ ] Custom boje, fontovi i spacing definirani u `@theme`, ne kao arbitrary values?
- [ ] Dark mode radi putem `.dark` klase (ne media query, osim ako nije drugačije dogovoreno)?
