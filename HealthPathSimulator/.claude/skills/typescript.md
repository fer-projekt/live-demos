# TypeScript u Vue 3 — Tipizacija i Best Practices

## Osnovna konfiguracija

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["vite/client"],
    "verbatimModuleSyntax": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
```

## Tipizacija Props — svi patterini

```ts
// Inline interface (preporučeno)
const props = defineProps<{
  title: string
  count?: number
  status: 'active' | 'inactive' | 'pending'
  user: User
  onSelect?: (id: string) => void
}>()

// S defaultovima
const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  items?: Item[]
  formatter?: (value: number) => string
}>(), {
  size: 'md',
  items: () => [],
  formatter: (v) => v.toLocaleString(),
})
```

## Emits tipizacija

```ts
// Tuple sintaksa (Vue 3.3+)
const emit = defineEmits<{
  change: [value: string]
  submit: [data: FormData, isValid: boolean]
  'update:modelValue': [value: string]
  close: []
}>()
```

## Globalni tipovi

```ts
// src/types/index.ts

// API response wrapper
export interface ApiResponse<T> {
  data: T
  meta?: PaginationMeta
  errors?: ApiError[]
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
}

export interface ApiError {
  field?: string
  message: string
  code: string
}

// Utility tipovi koji se često koriste
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type MaybeRef<T> = T | Ref<T>
export type ID = string | number

// Status pattern
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  status: AsyncStatus
  error: Error | null
}
```

## Component instance tipovi

```ts
// Typing component ref
import type MyModal from '@/components/MyModal.vue'

const modalRef = ref<InstanceType<typeof MyModal> | null>(null)
// Sada imaš pristup svemu što je defineExpose-ано
modalRef.value?.open()
```

## Generični composables

```ts
// src/composables/useAsyncState.ts
export function useAsyncState<T>(
  asyncFn: () => Promise<T>,
  initialValue: T
): {
  state: Ref<T>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  execute: () => Promise<void>
} {
  const state = ref<T>(initialValue) as Ref<T>
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function execute() {
    isLoading.value = true
    error.value = null
    try {
      state.value = await asyncFn()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  return { state, isLoading, error, execute }
}
```

## Type narrowing i type guards

```ts
// Type guard za API errore
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  )
}

// Korišćenje
try {
  await apiCall()
} catch (e) {
  if (isApiError(e)) {
    toast.error(e.message)
  } else {
    toast.error('Nepoznata greška')
  }
}
```

## Zabranjena praksa

```ts
// ❌ LOŠE: any brishe type safety
const data: any = await fetchSomething()
data.anything  // nema type greška, ali može pucati runtime

// ✅ DOBRO: unknown + narrowing
const data: unknown = await fetchSomething()
if (isUser(data)) {
  console.log(data.name)  // sigurno
}

// ❌ LOŠE: non-null assertion bez provjere
const element = document.querySelector('.modal')!
element.addEventListener(...)  // može pucati

// ✅ DOBRO
const element = document.querySelector('.modal')
if (element) {
  element.addEventListener(...)
}

// ❌ LOŠE: as cast za šutiranje TS-a
const user = response as User  // bypass type chekerà

// ✅ DOBRO: type guard ili zod parse
const user = UserSchema.parse(response)  // runtime + compile time validation
```

## Zod za runtime validaciju API odgovora

```ts
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'editor', 'viewer']),
  createdAt: z.string().datetime(),
})

export type User = z.infer<typeof UserSchema>

// U servisu
export async function getUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`)
  return UserSchema.parse(response.data)  // throws ako ne matchuje
}
```
