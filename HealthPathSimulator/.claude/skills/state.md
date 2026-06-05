# Pinia State Management

## Setup store — jedini dozvoljeni format

```ts
// src/stores/useCartStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const couponCode = ref<string | null>(null)

  // Getters (computed)
  const totalItems = computed(() => items.value.length)
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  function addItem(product: Product, quantity = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(productId: string) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  async function applyCoupon(code: string) {
    try {
      const result = await couponService.validate(code)
      couponCode.value = result.valid ? code : null
      return result
    } catch {
      couponCode.value = null
      throw new Error('Coupon validation failed')
    }
  }

  function $reset() {
    items.value = []
    couponCode.value = null
  }

  return {
    // Expose state (readonly gdje moguće)
    items: readonly(items),
    couponCode: readonly(couponCode),
    // Getters
    totalItems,
    subtotal,
    isEmpty,
    // Actions
    addItem,
    removeItem,
    applyCoupon,
    $reset,
  }
}, {
  persist: true  // pinia-plugin-persistedstate
})
```

## Store organizacija

```
src/stores/
├── useAuthStore.ts      # Auth state (user, token, permissions)
├── useCartStore.ts      # E-commerce cart
├── useUIStore.ts        # UI state (sidebar, theme, notifications)
├── useNotificationStore.ts
└── index.ts             # Re-export za lakši import
```

## Pravila za stores

### Što ide u store vs composable

| Kriterij | Store (Pinia) | Composable |
|---|---|---|
| Dijeli se između nepovezanih komponenti | ✅ | ❌ |
| Treba persisitenciju (localStorage) | ✅ | ❌ |
| Lokalna logika jedne komponente | ❌ | ✅ |
| Reusable logika bez globalnog statea | ❌ | ✅ |
| Server state (cache, refetch) | Bolje: TanStack Query | ❌ |

### Nikad ne stavi u store
- Lokalni UI state (je li dropdown otvoren)
- Serverski podaci koji se ne dijele (user profil na stranicu koja ga prikazuje)
- Derived data koji se može izračunati u computed

## Korišćenje u komponentama

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'

const cartStore = useCartStore()

// storeToRefs čuva reaktivnost pri destrukturiranju!
const { items, totalItems, isEmpty } = storeToRefs(cartStore)

// Actions se mogu destrukturirati direktno (nisu reaktivne)
const { addItem, removeItem } = cartStore
</script>
```

⚠️ **Nikad** ne destrukturiraj state/getters direktno bez `storeToRefs` — izgubiti ćeš reaktivnost.

## Pinia + SSR (Nuxt)

```ts
// server-side safe: koristiti useNuxtApp() umjesto direktnog importa
const nuxtApp = useNuxtApp()
const store = useCartStore(nuxtApp.$pinia)
```

## Persisitencija

```ts
// Instaliraj: pnpm add pinia-plugin-persistedstate
// nuxt.config.ts: modules: ['@pinia-plugin-persistedstate/nuxt']

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  return { token }
}, {
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
      secure: true,
    }),
    paths: ['token'],  // Persisitraj samo token, ne cijeli state
  }
})
```

## Testing stores

```ts
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'

describe('useCartStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('adds items correctly', () => {
    const store = useCartStore()
    store.addItem({ id: '1', price: 100, name: 'Test' })
    expect(store.totalItems).toBe(1)
    expect(store.subtotal).toBe(100)
  })
})
```
