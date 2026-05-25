# HealthPathSimulator

Web aplikacija za simulaciju zdravstvenog putovanja — pomaže korisnicima pronaći medicinsku instituciju, smještaj i transport prema njihovim potrebama.

Izrađeno s **Vue 3**, **Vite**, **Pinia** i **Tailwind CSS v4**.

---

## Getting Started

### Prerequisites

- Node.js `^20.19.0` ili `>=22.12.0`
- npm

### Setup

```bash
# 1. Kloniraj repozitorij
git clone <repo-url>
cd HealthPathSimulator

# 2. Instaliraj dependencies
npm install

# 3. Pokreni dev server
npm run dev
```

App je dostupna na `http://localhost:5173`.

---

## Komande

```bash
npm run dev        # Dev server s hot-reloadom
npm run build      # Production build → dist/
npm run preview    # Pregled production builda lokalno
npm run lint       # Linting s auto-fixom (oxlint + eslint)
npm run format     # Formatiranje koda (Prettier)
```

---

## Struktura projekta

```
src/
├── components/
│   ├── wizard/          # Komponente za wizard (unos podataka)
│   │   ├── Step1Patient.vue
│   │   ├── Step2Service.vue
│   │   └── Step3Additional.vue
│   └── results/         # Komponente za prikaz rezultata
│       ├── Step1Institutions.vue
│       ├── Step2Accommodation.vue
│       ├── Step3TravelPlans.vue
│       ├── Step4JourneyPreview.vue
│       └── InteractiveMap.vue
├── data/                # Statički podaci (institucije, smještaji, transport)
├── stores/              # Pinia storeovi (wizard.js, results.js)
├── views/               # Stranice (HomeView, WizardView, ResultsView)
└── router/              # Vue Router konfiguracija
```

---

## Preporučeni IDE

**VS Code** + ekstenzija [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
