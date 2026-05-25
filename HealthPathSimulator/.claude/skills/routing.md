# Vue Router 4 — Routing i Navigacijske Straže

## Router konfiguracija

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/DashboardPage.vue'),
          meta: { requiresAuth: true, roles: ['admin', 'editor'] },
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/pages/LoginPage.vue'),
          meta: { requiresGuest: true },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
```

## Navigacijske straže — auth pattern

```ts
// Globalna straža — ide u router/index.ts ili router/guards.ts
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // Inicijalizacija auth statea (refresh token itd.)
  if (!authStore.isInitialized) {
    await authStore.initialize()
  }

  // Ruta zahtijeva auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Ruta je samo za gosta (login stranica)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }

  // Provjera rola
  if (to.meta.roles && !authStore.hasAnyRole(to.meta.roles)) {
    return { name: 'forbidden' }
  }
})
```

## Route Meta tipizacija

```ts
// src/router/types.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    roles?: string[]
    title?: string
    layout?: 'default' | 'auth' | 'minimal'
  }
}
```

## Programska navigacija

```ts
const router = useRouter()
const route = useRoute()

// Navigacija
router.push({ name: 'dashboard' })
router.push({ name: 'user-profile', params: { id: userId } })
router.replace({ name: 'login' })  // bez history entry

// Redirect nakon login-a
const redirectPath = route.query.redirect as string | undefined
router.push(redirectPath ?? { name: 'dashboard' })

// Params i query
const { id } = route.params       // /users/:id
const { page } = route.query      // ?page=2
```

## Route-bazirana lazy loading strategija

```ts
// Grupiranje chunkova po featurima
{
  path: 'admin',
  component: () => import(/* webpackChunkName: "admin" */ '@/pages/AdminPage.vue'),
  children: [
    {
      path: 'users',
      component: () => import(/* webpackChunkName: "admin" */ '@/pages/admin/UsersPage.vue'),
    },
  ],
}
```

## useRouter vs useRoute

```ts
// useRouter — za akcije (push, replace, go)
const router = useRouter()

// useRoute — za čitanje trenutne rute (params, query, meta)
const route = useRoute()

// Reagiranje na promjene rute
watch(() => route.params.id, async (newId) => {
  await fetchData(newId)
}, { immediate: true })
```

## Načesta greška: router u Pinia store-u

```ts
// ❌ LOŠE: router import u store-u može uzrokovati circular dependency
import router from '@/router'  // ne raditi ovo u stores/

// ✅ DOBRO: proslijedi router kao argument ili koristi inject
export const useAuthStore = defineStore('auth', () => {
  async function logout(redirectTo = '/login') {
    clearAuth()
    // Navigacija se poziva iz komponente, ne iz store-a
  }
  return { logout }
})

// U komponenti:
const authStore = useAuthStore()
async function handleLogout() {
  await authStore.logout()
  router.push('/login')  // navigacija ovdje
}
```
