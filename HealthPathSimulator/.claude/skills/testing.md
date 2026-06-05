# Testiranje Vue aplikacija — Vitest + Vue Test Utils

## Setup

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
```

```ts
// src/test/setup.ts
import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

// Globalni mock za router
config.global.plugins = []
```

## Komponente — testiranje

```ts
// src/components/__tests__/UserCard.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import UserCard from '../UserCard.vue'

describe('UserCard', () => {
  function createWrapper(props = {}) {
    return mount(UserCard, {
      props: {
        userId: 'user-123',
        ...props,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: { currentUser: { id: 'user-123', role: 'admin' } },
            },
          }),
        ],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    })
  }

  it('renders user name', async () => {
    const wrapper = createWrapper()
    expect(wrapper.find('[data-testid="user-name"]').text()).toBe('John Doe')
  })

  it('emits delete event on button click', async () => {
    const wrapper = createWrapper()
    await wrapper.find('[data-testid="delete-btn"]').trigger('click')
    expect(wrapper.emitted('delete')).toEqual([['user-123']])
  })

  it('shows loading state', async () => {
    const wrapper = createWrapper()
    // Pretpostavimo da je loading inicijalno true
    expect(wrapper.find('[data-testid="skeleton"]').exists()).toBe(true)
  })
})
```

## Composables — testiranje

```ts
// src/composables/__tests__/useCounter.test.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  it('starts at initial value', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it('increments correctly', () => {
    const { count, increment } = useCounter(0)
    increment()
    expect(count.value).toBe(1)
  })

  it('does not go below minimum', () => {
    const { count, decrement } = useCounter(0, { min: 0 })
    decrement()
    expect(count.value).toBe(0)
  })
})
```

## Pinia stores — testiranje

```ts
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock API servis
vi.mock('@/services/cartService', () => ({
  cartService: {
    syncCart: vi.fn().mockResolvedValue({ success: true }),
  },
}))

describe('useCartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds item to cart', () => {
    const store = useCartStore()
    store.addItem({ id: '1', name: 'Widget', price: 9.99 })
    expect(store.items).toHaveLength(1)
    expect(store.subtotal).toBe(9.99)
  })

  it('increases quantity for duplicate items', () => {
    const store = useCartStore()
    store.addItem({ id: '1', name: 'Widget', price: 9.99 })
    store.addItem({ id: '1', name: 'Widget', price: 9.99 })
    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(2)
  })
})
```

## data-testid konvencija

```vue
<!-- Uvijek dodaj data-testid na interaktivne i ključne elemente -->
<template>
  <div data-testid="user-card">
    <h2 data-testid="user-name">{{ user.name }}</h2>
    <button data-testid="edit-btn" @click="onEdit">Uredi</button>
    <button data-testid="delete-btn" @click="onDelete">Obriši</button>
  </div>
</template>
```

- Koristi `data-testid` (ne CSS klase ili tekst) za selekciju u testovima
- Format: `kebab-case`, opisno, bez skraćenica
- Ne koristi `data-testid` za stiliziranje

## Što testirati

### ✅ Obavezno testirati
- Kompleksni composablesi s poslovnom logikom
- Pinia stores (sve akcije + getteri)
- Validacijska logika forme
- Komponente s netrivijalnim interakcijama
- Utility funkcije

### ⚠️ Testirati ako je kritično
- Route stranice (integracijskim testovima)
- Komponente koje prikazuju podatke (snapshot testovi)

### ❌ Nije vrijedno testirati
- Jednostavni presentational komponenti bez logike
- Direktni CSS stilovi
- Treće strane biblioteke

## MSW za mock API-je

```ts
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Test User',
      email: 'test@example.com',
    })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json()
    if (body.email === 'test@example.com') {
      return HttpResponse.json({ token: 'mock-token-123' })
    }
    return new HttpResponse(null, { status: 401 })
  }),
]
```
