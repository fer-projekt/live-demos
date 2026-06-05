<script setup>
// Uvozimo podatke smještaja i results store
import { ref, computed } from 'vue';
import { accommodations } from '@/data/accommodations';
import { useResultsStore } from '@/stores/results';

import { SlidersHorizontal, BedDouble, Star, Phone, Mail, MapPin, ArrowRight, ArrowLeft, Building2 } from 'lucide-vue-next';

const resultsStore = useResultsStore();

// kad korisnik klikne Select, spremi odabir u store i idi na sljedeći korak
function selectAccommodation(accommodation) {
    resultsStore.selectedAccommodation = accommodation;
    resultsStore.nextStep();
}

const filterPrice = ref('all'); // filter za cijene
const filterRating = ref('all'); // filter za ocjene
const filterType = ref('all'); // filter za tip smještaja

// Sve unikatne vrste smještaja
const allTypes = [...new Set(accommodations.map(i => i.type))];

// Filtrirani smještaji na temelju odabranih filtera
const filteredAccommodations = computed(() => {
    return accommodations.filter(i => {
        // pricePerNight, ne price
        const priceOk = filterPrice.value === 'all'
            || (filterPrice.value === 'low' && i.pricePerNight < 100)
            || (filterPrice.value === 'mid' && i.pricePerNight >= 100 && i.pricePerNight <= 150)
            || (filterPrice.value === 'high' && i.pricePerNight > 150);
        const ratingOk = filterRating.value === 'all'
            || (filterRating.value === '4.5' && i.rating >= 4.5)
            || (filterRating.value === '4.0' && i.rating >= 4.0);
        const typeOk = filterType.value === 'all'
            || i.type === filterType.value;

        return priceOk && ratingOk && typeOk;
    });
});
</script>

<template>
    <div>
        <!-- Naslov s ikonom -->
        <div class="flex items-center justify-between mb-4">

            <!-- Lijevo: ikona + tekst zajedno -->
            <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center">
                    <BedDouble class="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-blue-800">Select Accommodation</h2>
                    <p class="text-gray-500 text-sm">Near {{ resultsStore.selectedInstitution?.name }}</p>
                </div>
            </div>

            <!-- Desno: back gumb -->
            <button @click="resultsStore.prevStep()"
                class="flex items-center gap-1.5 border border-gray-300 bg-white hover:bg-gray-200 font-medium text-sm px-4 py-1.5 rounded-xl transition-colors">
                <ArrowLeft class="w-3.5 h-3.5" /> Change Institution
            </button>

        </div>

        <!-- Filter bar -->
        <div class="bg-white rounded-2xl p-4 mb-4">
            <div class="flex items-center gap-2 mb-3">
                <SlidersHorizontal class="w-3.5 h-3.5 text-gray-600" />
                <span class="text-gray-500 font-medium text-sm">Filters</span>
            </div>
            <div class="flex gap-10">
                <select v-model="filterPrice"
                    class="bg-gray-100 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-blue-400">
                    <option value="all">All Prices</option>
                    <option value="low">Under €100/night</option>
                    <option value="mid">€100 - €150/night</option>
                    <option value="high">Over €150/night</option>
                </select>

                <select v-model="filterRating"
                    class="bg-gray-100 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-blue-400">
                    <option value="all">All Ratings</option>
                    <option value="4.5">★ 4.5+</option>
                    <option value="4.0">★ 4.0+</option>
                </select>

                <select v-model="filterType"
                    class="bg-gray-100 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-blue-400">
                    <option value="all">All Types</option>
                    <option v-for="type in allTypes" :key="type" :value="type">
                        {{ type }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Lista smještaja -->
        <div class="flex flex-col gap-4">
            <div v-for="accommodation in filteredAccommodations" :key="accommodation.id"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

                <div class="flex gap-4">

                    <!-- LIJEVA STRANA -->
                    <div class="flex-1 min-w-0">

                        <!-- Ime + tip + adresa -->
                        <h3 class="text-blue-800 text-base leading-tight">{{ accommodation.name }}</h3>
                        <p class="text-violet-500 text-xs font-medium mt-0.5 mb-1">{{ accommodation.type }}</p>
                        <p class="flex items-center gap-1 text-gray-500 text-xs mb-3">
                            <MapPin class="w-3 h-3 shrink-0" />
                            {{ accommodation.address }}
                        </p>

                        <!-- Amenity tagovi -->
                        <div class="flex gap-2 flex-wrap mb-4">
                            <span v-for="amenity in accommodation.amenities" :key="amenity"
                                class="bg-violet-50 text-violet-600 text-xs px-3 py-1 rounded-full">
                                {{ amenity }}
                            </span>
                        </div>

                        <!-- Kontakt + udaljenost -->
                        <div class="flex items-center gap-4 text-xs text-gray-500">
                            <span class="flex items-center gap-1.5">
                                <Phone class="w-3 h-3 shrink-0" />
                                {{ accommodation.phone }}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <Mail class="w-3 h-3 shrink-0" />
                                {{ accommodation.email }}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <Building2 class="w-3 h-3 shrink-0" />
                                {{ accommodation.distanceToHospital }} km to hospital
                            </span>
                        </div>
                    </div>

                    <!-- DESNA STRANA -->
                    <div class="flex flex-col items-end justify-between min-w-[120px]">

                        <!-- Rating -->
                        <div class="flex items-center gap-1">
                            <Star class="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span class="text-sm font-semibold text-gray-700">{{ accommodation.rating }}</span>
                        </div>

                        <!-- Cijena -->
                        <div class="text-right">
                            <p class="text-xs text-gray-400">Price per Night</p>
                            <p class="text-medium font-semibold text-green-600">€ {{ accommodation.pricePerNight }}</p>
                        </div>

                        <!-- Select gumb -->
                        <button @click="selectAccommodation(accommodation)"
                            class="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
                            Select
                            <ArrowRight class="w-4 h-4 shrink-0" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>