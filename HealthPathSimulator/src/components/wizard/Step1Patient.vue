<script setup>
import { useWizardStore } from '@/stores/wizard';

const store = useWizardStore(); //daj mi pristup svim podacima iz wizarda

const cities = ['Split', 'Zadar', 'Šibenik', 'Dubrovnik', 'Trogir', 'Pula', 'Rovinj', 'Poreč', 'Umag', 'Anywhere'];

function toggleCity(city) {
    const index = store.preferredCities.indexOf(city); // indexOf vraća poziciju emelenta u arreyu 
    if (index === -1) {
        store.preferredCities.push(city);
    } else {
        store.preferredCities.splice(index, 1);
    }
}
</script>

<template>
    <!-- Naslov -->
    <h2 class="text-2xl font-bold text-blue-700 text-center mb-2">Patient Information</h2>
    <p class="text-gray-400 text-center text-sm mb-6">Please provide your details</p>

    <div class="bg-white rounded-2xl p-8 shadow-sm w-full max-w-2xl">

        <!-- Polja -->
        <div class="grid grid-cols-2 gap-4">

            <!-- First name -->
            <div>
                <label class="text-sm text-gray-600 mb-2 block">First Name *</label>
                <input v-model="store.firstName" type="text" placeholder="Enter your first name"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>

            <!-- Last name -->
            <div>
                <label class="text-sm text-gray-600 mb-2 block">Last Name *</label>
                <input v-model="store.lastName" type="text" placeholder="Enter your last name"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>

            <!-- Country -->
            <div>
                <label class="text-sm text-gray-600 mb-2 block">Country *</label>
                <input v-model="store.country" type="text" placeholder="Enter your country"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>

            <!-- City -->
            <div>
                <label class="text-sm text-gray-600 mb-2 block">City *</label>
                <input v-model="store.city" type="text" placeholder="Enter your city"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>

            <!-- Age -->
            <div>
                <label class="text-sm text-gray-600 mb-2 block">Age *</label>
                <input v-model="store.age" type="number" placeholder="Enter your age"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>

            <!-- Date of birth -->
            <div>
                <label class="text-sm text-gray-600 mb-2 block">Date of birth *</label>
                <input v-model="store.dateOfBirth" type="date" placeholder="mm/dd/yyyy"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>

            <!-- Gender -->
            <div class="col-span-2">
                <label class="text-sm text-gray-600 mb-2 block">Gender *</label>
                <select v-model="store.gender" type="select" placeholder="Select gender"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <!-- Preferred cities in Croatia -->
            <div class="col-span-2">
                <label class="text-sm text-gray-600 mb-2 block">Preferred cities in Croatia *</label>
                <p class="text-xs text-blue-400 mb-3">Select one or more cities where you'd like to receive medical
                    services</p>

                <div class="flex flex-wrap gap-2">
                    <!-- :class - vrijednost je dinamična - mijenja se ovisno o stanju (odabrano ili ne)
                         v-for prolati kroz array cities i za svaki element kreira jedan gumb
                    -->
                    <button v-for="city in cities" :key="city" @click="toggleCity(city)" :class="[
                        'flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm transition-colors',
                        store.preferredCities.includes(city)
                            ? 'border-gray-800 text-gray-800'
                            : 'border-gray-300 text-gray-500'
                    ]">
                        {{ city }}
                        <span :class="[
                            'w-4 h-4 rounded-full border flex items-center justify-center',
                            store.preferredCities.includes(city)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                        ]">
                            <svg v-if="store.preferredCities.includes(city)" class="w-2.5 h-2.5 text-white" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            <!-- Travel Start Date -->
            <div class="col-span-2">
                <label class="text-sm text-gray-600 mb-2 block">Travel Start Date *</label>
                <input v-model="store.travelStartDate" type="date"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>

            <!-- Travel End Date -->
            <div class="col-span-2">
                <label class="text-sm text-gray-600 mb-2 block">Travel End Date *</label>
                <input v-model="store.travelEndDate" type="date"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            </div>
        </div>
    </div>
</template>