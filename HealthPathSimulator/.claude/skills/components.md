# Vue 3 Komponente — Detaljna pravila

## `<script setup>` — obavezan pattern

```vue
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { PropType } from 'vue'

// 1. Props
interface Props {
  userId: string
  role?: 'admin' | 'editor' | 'viewer'
  items?: Item[]
}

const props = withDefaults(defineProps<Props>(), {
  role: 'viewer',
  items: () => [],
})

// 2. Emits
const emit = defineEmits<{
  update: [value: string]
  delete: [id: string]
  'status-change': [status: boolean]
}>()

// 3. Composables
const { data, isLoading, error } = useUserData(props.userId)

// 4. Lokalni state
const isOpen = ref(false)
const searchQuery = ref('')

// 5. Computed
const filteredItems = computed(() =>
  props.items.filter(i => i.name.includes(searchQuery.value))
)

// 6. Watchers
watch(() => props.userId, (newId) => {
  // reload data
}, { immediate: false })

// 7. Lifecycle
onMounted(() => {
  // side effects
})
</script>
```

## Composables — struktura i pravila

Composable je **jedina** dozvoljena lokacija za:
- Reusable reaktivnu logiku
- API pozive koji se dijele između komponenti
- Apstrahiranje browser API-ja (localStorage, IntersectionObserver...)

```ts
// src/composables/useUserData.ts
import { ref, readonly } from 'vue'

export function useUserData(userId: MaybeRef<string>) {
  const data = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchUser() {
    isLoading.value = true
    error.value = null
    try {
      data.value = await userService.getById(toValue(userId))
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  // Reaktivno na promjenu userId
  watchEffect(() => {
    if (toValue(userId)) fetchUser()
  })

  return {
    data: readonly(data),  // readonly sprječava mutation izvana
    isLoading: readonly(isLoading),
    error: readonly(error),
    refetch: fetchUser,
  }
}
```

### Pravila composablea
- Ime uvijek počinje s `use` (useAuth, useCart, useModal)
- Vraća `readonly` ref-ove kad ne trebaju biti mutabilni izvana
- Prihvata `MaybeRef<T>` argumente za maksimalnu fleksibilnost
- Cleanup u `onUnmounted` ili `watchEffect` return callback

## Async komponente i Suspense

```ts
// Lazy loading komponenti
const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,        // ms prije prikaza loadinga
  timeout: 10000,
})
```

```vue
<!-- Route-level Suspense -->
<Suspense>
  <template #default>
    <AsyncPage />
  </template>
  <template #fallback>
    <PageSkeleton />
  </template>
</Suspense>
```

## Provide / Inject — za duboke prop lance

```ts
// Roditelj (ili plugin)
import { provide, type InjectionKey } from 'vue'

const ThemeKey: InjectionKey<Ref<'light' | 'dark'>> = Symbol('theme')
provide(ThemeKey, ref('light'))

// Dijete (bilo gdje u stablu)
const theme = inject(ThemeKey)
// Ili s fallback vrijednošću
const theme = inject(ThemeKey, ref('light'))
```

**Kada koristiti provide/inject**: globalni theme, auth context, i18n — ne za feature state (koristiti Pinia za to).

## Teleport — modali i tooltips

```vue
<Teleport to="body">
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal" role="dialog" aria-modal="true">
      <slot />
    </div>
  </div>
</Teleport>
```

## Transition komponente

```vue
<!-- Fade transition -->
<Transition name="fade" mode="out-in">
  <component :is="currentView" :key="currentView" />
</Transition>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

## Vue 3.5+ novi API-ji (stabilni od rujna 2024.)

### `useTemplateRef()` — zamjena za `ref(null)` pattern

```ts
// ✅ Vue 3.5+ — preporučeni standard
import { useTemplateRef } from 'vue'
import type MyModal from '@/components/MyModal.vue'

const modalRef = useTemplateRef<InstanceType<typeof MyModal>>('modal-ref')
modalRef.value?.open()
```

```vue
<template>
  <MyModal ref="modal-ref" />
</template>
```

Prednost: radi unutar composablea bez prosljeđivanja ref-a.

### Reactive Props Destructure (Vue 3.5, default uključeno)

```ts
// ✅ Vue 3.5+ — reaktivnost se čuva kod destrukturiranja
const { title, count = 0, items = [] } = defineProps<{
  title: string
  count?: number
  items?: Item[]
}>()
// count i items su reaktivni — watchable, computed-friendly
```

### `onWatcherCleanup()` — čišćenje async operacija

```ts
import { watchEffect, onWatcherCleanup } from 'vue'

watchEffect(async () => {
  const controller = new AbortController()
  onWatcherCleanup(() => controller.abort())
  data.value = await fetch(`/api/items/${id.value}`, { signal: controller.signal }).then(r => r.json())
})
```

### `useId()` — stabilni ID-ji za SSR

```ts
const inputId = useId()
```

```vue
<label :for="inputId">Email</label>
<input :id="inputId" type="email" />
```

## Pristupačnost (a11y) — obavezno

- Svaki interaktivni element ima `aria-label` ili vidljivi tekst
- Modali imaju `role="dialog"` + `aria-modal="true"` + focus trap
- Ikone bez teksta imaju `aria-hidden="true"` + sibling tekst za screen readere
- Boja nije jedini indikator stanja (dodaj ikonu ili tekst)
- `<router-link>` generira `<a>` — ne koristi `<div @click>` za navigaciju

## Greške koje treba izbjegavati

```vue
<!-- ❌ LOŠE: logika u templateu -->
<div>{{ user.role === 'admin' && permissions.includes('edit') ? 'Edit' : '' }}</div>

<!-- ✅ DOBRO: computed -->
<div>{{ canEdit ? 'Edit' : '' }}</div>
```

```ts
// ❌ LOŠE: mutiranje reactive objekta direktno u watchu
watch(user, (newUser) => {
  user.name = newUser.name.trim() // uzrokuje beskonačnu petlju
})

// ✅ DOBRO
watch(() => user.name, (name) => {
  sanitizedName.value = name.trim()
})
```

```vue
<!-- ❌ LOŠE: v-if + v-for na istom elementu -->
<li v-for="item in items" v-if="item.active" :key="item.id">

<!-- ✅ DOBRO -->
<template v-for="item in items" :key="item.id">
  <li v-if="item.active">{{ item.name }}</li>
</template>
```
