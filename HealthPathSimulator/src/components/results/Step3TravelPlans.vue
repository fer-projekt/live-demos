<script setup>
// Uvozimo podatke prijavoza i oba storea
import { transports } from '@/data/transport';
import { useResultsStore } from '@/stores/results';

const resultsStore = useResultsStore(); // daj mi pristup svim podacima iz results

// kada korisnik kilkne book now, spremi odabir i idi na korak 4
function selectTransport(transport) {
    resultsStore.selectedTransport = transport;
    resultsStore.nextStep();
}
</script>

<template>
    <div>
        <!-- Naslov s ikonom -->
        <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </div>
            <div>
                <h2 class="text-xl font-bold text-gray-800">Select Travel Plan</h2>
                <p class="text-gray-400 text-sm">Transportation options for your medical visit</p>
            </div>
        </div>


        <!-- Zelena summary kartice - prikazuje što je korisnik odabrao u prethodnim koracima -->
        <div class="bg-green-500 rounded-2xl p-6 mb-4 text-white">
            <p class="text-sm opacity-80 mb-3">Your Selection Summary</p>
            <div class="flex justify-between">
                <div>
                    <p class="text-xs opacity-70">Medical Institution</p>
                    <p class="font-semibold">{{ resultsStore.selectedInstitution?.name }}</p>
                    <p class="text-sm opacity-80">{{ resultsStore.selectedInstitution?.price }}</p>
                </div>
                <div>
                    <p class="text-xs opacity-70">Accommodation</p>
                    <p class="font-semibold">{{ resultsStore.selectedAccommodation?.name }}</p>
                    <p class="text-sm opacity-80">{{ resultsStore.selectedAccommodation?.pricePerNight }}/night</p>
                </div>
            </div>
        </div>

        <!-- Lista prijevoza -->
        <div class="flex flex-col gap-4">
            <div v-for="transport in transports" :key="transport.id" class="bg-white rounded-2xl p-6 shadow-sm">

                <!-- Ime + opis + cijena -->
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-semibold text-blue-600">{{ transport.name }}</h3>
                        <p class="text-gray-400 text-sm">{{ transport.description }}</p>
                        <p class="text-gray-400 text-xs mt-1">{{ transport.duration }}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-gray-400">Price</p>
                        <p class="text-xl font-bold text-gray-800">€ {{ transport.price }}</p>
                    </div>
                </div>

                <!-- Features -- v-for kroz sve značajke prijevoza  -->
                <ul class="mb-3">
                    <li v-for="feature in transport.features" :key="feature"
                        class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span> {{ feature }}
                    </li>
                </ul>

                <!-- Book Now gumb -->
                <div class="flex justify-end">
                    <button @click="selectTransport(transport)"
                        class="bg-green-500 text-white px-5 py-2 rounded-full text-sm hover:opacity-90">Book Now
                        →</button>
                </div>
            </div>
        </div>
    </div>
</template>