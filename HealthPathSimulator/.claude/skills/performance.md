# Vue Performanse & Core Web Vitals

## Core Web Vitals ciljevi

| Metrika | Cilj | Alat za mjerenje |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse, PageSpeed |
| FID/INP (Interaction to Next Paint) | < 200ms | Chrome DevTools |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| TTFB (Time to First Byte) | < 800ms | WebPageTest |

## Bundle optimizacija

### Vite manual chunks

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Vendor split po paketu
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
              return 'vue-ecosystem'
            }
            if (id.includes('chart.js') || id.includes('d3')) {
              return 'charts'
            }
            if (id.includes('@vueuse')) {
              return 'vueuse'
            }
            return 'vendor'
          }
        }
      }
    },
    // Upozori na chunksove > 500KB
    chunkSizeWarningLimit: 500,
  }
})
```

### Tree-shaking pravila
- Import samo što koristiš: `import { ref, computed } from 'vue'` — ne `import * as Vue`
- VueUse: `import { useLocalStorage } from '@vueuse/core'` ✅
- Icon libraries: koristiti individualne SVG importove, ne cijeli icon set
- Lodash: `import debounce from 'lodash/debounce'` umjesto `import _ from 'lodash'`

## Slike — obavezni pattern

```vue
<template>
  <!-- Hero slika — eager loading, eksplicitne dimenzije -->
  <img
    src="/images/hero.webp"
    width="1200"
    height="600"
    fetchpriority="high"
    alt="Opis slike"
  />

  <!-- Slike ispod folda — lazy loading -->
  <img
    :src="image.url"
    :width="image.width"
    :height="image.height"
    loading="lazy"
    decoding="async"
    alt=""
  />
</template>
```

### Responsivne slike s `<picture>`

```vue
<picture>
  <source
    :srcset="`${image_thumb(src, 800, 400, 'auto', 80)} 800w,
              ${image_thumb(src, 1600, 800, 'auto', 80)} 1600w`"
    type="image/webp"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  <img :src="image_thumb(src, 800, 400, 'auto', 80)" :alt="alt" loading="lazy" />
</picture>
```

## Virtualna lista za dugačke liste

```vue
<!-- Za liste s >100 stavki koristiti vue-virtual-scroller -->
<script setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
</script>

<template>
  <RecycleScroller
    :items="largeList"
    :item-size="72"
    key-field="id"
    v-slot="{ item }"
  >
    <ListItem :item="item" />
  </RecycleScroller>
</template>
```

## `v-memo` za performanse rendera

```vue
<!-- Re-renderiraj samo kad se item.id ili isSelected promijene -->
<div v-for="item in list" :key="item.id" v-memo="[item.id, isSelected(item.id)]">
  <ExpensiveComponent :item="item" />
</div>
```

## Debounce i throttle

```ts
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

// Pretraga — debounce
const debouncedSearch = useDebounceFn(async (query: string) => {
  results.value = await searchApi(query)
}, 300)

// Scroll handler — throttle
const throttledScroll = useThrottleFn(() => {
  updateScrollPosition()
}, 100)
```

## KeepAlive za skupe komponente

```vue
<template>
  <router-view v-slot="{ Component }">
    <KeepAlive :include="['DashboardPage', 'ReportPage']" :max="5">
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>
```

**Pazi**: Komponente u KeepAlive-u ne unmountaju se — koristi `onActivated`/`onDeactivated` lifecycle hookove.

## Preloading kritičnih ruta

```ts
// Nakon login-a preloadi dashboard
router.afterEach((to) => {
  if (to.name === 'login') {
    import('@/pages/DashboardPage.vue')
  }
})
```

## Font optimizacija

```css
/* U globalnom CSS-u */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;  /* Sprječava FOIT */
  font-weight: 400 700;  /* Variable font range */
}
```

```html
<!-- U <head> — preload kritičnih fontova -->
<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin>
```

## Lighthouse CI — integracija

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      http://localhost:3000/
      http://localhost:3000/dashboard
    budgetPath: ./budget.json
    uploadArtifacts: true
```

```json
// budget.json
{
  "resourceSizes": [
    { "resourceType": "script", "budget": 300 },
    { "resourceType": "image", "budget": 500 }
  ],
  "timings": [
    { "metric": "interactive", "budget": 3000 },
    { "metric": "first-contentful-paint", "budget": 1500 }
  ]
}
```
