<script setup>
import { institutions } from '@/data/institutions';
import { useResultsStore } from '@/stores/results';
import { ref, computed } from 'vue';

import { MapPin, SlidersHorizontal, Check, Phone, Mail, Star, Building2, CalendarCheck, ArrowRight, ArrowLeft } from 'lucide-vue-next';

const resultsStore = useResultsStore();

function selectInstitution(institution) { // odabir institucije
    resultsStore.selectedInstitution = institution;
    resultsStore.nextStep();
}

const filterPrice = ref('all'); // filter za cijene
const filterRating = ref('all'); // filter za ocjene
const filterService = ref('all'); // filter za usluge

// Sve unikаtnе usluge iz svih institucija
const allServices = [...new Set(institutions.flatMap(i => i.services))]; // znaci da za svaku instituciju, uzmi sve usluge i smjesti ih u jedan array

// Filtrirane institucije na temelju odabranih filtera
const filteredInstitutions = computed(() => {
    return institutions.filter(i => {
        // filter za cijene — value="all/low/mid/high"
        const priceOk = filterPrice.value === 'all'
            || (filterPrice.value === 'low' && i.price < 800)
            || (filterPrice.value === 'mid' && i.price >= 800 && i.price <= 1000)
            || (filterPrice.value === 'high' && i.price > 1000);
        // filter za ocjene — value="all/4.5/4.0"
        const ratingOk = filterRating.value === 'all'
            || (filterRating.value === '4.5' && i.rating >= 4.5)
            || (filterRating.value === '4.0' && i.rating >= 4.0);
        // filter za usluge — value="all" ili naziv usluge
        const serviceOk = filterService.value === 'all'
            || i.services.includes(filterService.value);

        return priceOk && ratingOk && serviceOk;
    });
});

</script>

<template>
    <div>
        <!-- Naslov -->
        <div class="flex items-center justify-between mb-4">

            <!-- Lijevo: ikona + tekst zajedno -->
            <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Building2 class="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 class="text-xl font-semibold text-blue-800">Select Medical Institution</h2>
                    <p class="text-gray-500 text-sm">Found {{ filteredInstitutions.length }} institutions for your needs
                    </p>
                </div>
            </div>

            <!-- Desno: back gumb -->
            <button @click="$router.push('/')"
                class="flex items-center gap-1.5 border border-gray-300 bg-white hover:bg-gray-200 font-medium text-sm px-4 py-1.5 rounded-xl transition-colors">
                <ArrowLeft class="w-3.5 h-3.5" /> Back to Search
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
                    <option value="low">Under €800</option>
                    <option value="mid">€800 - €1000</option>
                    <option value="high">Over €1000</option>
                </select>

                <select v-model="filterRating"
                    class="bg-gray-100 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-blue-400">
                    <option value="all">All Ratings</option>
                    <option value="4.5">★ 4.5+</option>
                    <option value="4.0">★ 4.0+</option>
                </select>

                <select v-model="filterService"
                    class="bg-gray-100 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-blue-400">
                    <option value="all">All Services</option>
                    <option v-for="service in allServices" :key="service" :value="service">
                        {{ service }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Lista kartica -->
        <div class="flex flex-col gap-4">
            <div v-for="institution in filteredInstitutions" :key="institution.id"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

                <div class="flex gap-4">

                    <!-- LIJEVA STRANA -->
                    <div class="flex-1 min-w-0">

                        <!-- Ime + adresa -->
                        <h3 class=" text-blue-800 text-base leading-tight">{{ institution.name }}</h3>
                        <p class="flex items-center gap-1 text-gray-500 text-xs mt-0.5 mb-3">
                            <MapPin class="w-3 h-3 shrink-0" />
                            {{ institution.address }}
                        </p>

                        <!-- Service tagovi -->
                        <div class="flex gap-2 flex-wrap mb-3">
                            <span v-for="service in institution.services" :key="service"
                                class="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                                {{ service }}
                            </span>
                        </div>

                        <!-- Included Services label -->
                        <p class="text-xs text-gray-500 mb-2">Included Services from Your Selection:</p>

                        <!-- Pre/After — 2 kolone side by side -->
                        <div class="grid grid-cols-2 gap-x-4 mb-3">

                            <!-- Pre-Appointment -->
                            <div>
                                <p class="flex items-center gap-1 text-xs text-gray-400 font-medium mb-1">
                                    <Building2 class="w-3 h-3 shrink-0" /> Pre-Appointment
                                </p>
                                <div class="flex flex-col gap-0.5">
                                    <span v-for="service in institution.services.slice(0, 2)" :key="service"
                                        class="flex items-center gap-1 text-xs text-green-700">
                                        <Check class="w-3 h-3 shrink-0 text-green-500" /> {{ service }}
                                    </span>
                                </div>
                            </div>

                            <!-- After Appointment -->
                            <div>
                                <p class="flex items-center gap-1 text-xs text-gray-400 font-medium mb-1">
                                    <CalendarCheck class="w-3 h-3 shrink-0" /> After Appointment
                                </p>
                                <div class="flex flex-col gap-0.5">
                                    <span v-for="service in institution.services.slice(2)" :key="service"
                                        class="flex items-center gap-1 text-xs text-green-700">
                                        <Check class="w-3 h-3 shrink-0 text-green-500" /> {{ service }}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <!-- Kontakt -->
                        <div class="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span class="flex items-center gap-1.5">
                                <Phone class="w-3 h-3 shrink-0" />
                                {{ institution.phone }}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <Mail class="w-3 h-3 shrink-0" />
                                {{ institution.email }}
                            </span>
                        </div>
                    </div>

                    <!-- DESNA STRANA -->
                    <div class="flex flex-col items-end justify-between min-w-[110px]">

                        <!-- Rating -->
                        <div class="flex items-center gap-1">
                            <Star class="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span class="text-sm font-semibold text-gray-700">{{ institution.rating }}</span>
                        </div>

                        <!-- Cijena + udaljenost -->
                        <div class="text-right">
                            <p class="text-xs text-gray-400">Estimated Price</p>
                            <p class="text-medium font-semibold  text-green-600">€ {{ institution.price }}</p>
                            <p class="text-xs text-gray-400 mt-2">{{ institution.distance }} km away</p>
                        </div>

                        <!-- Matched badge -->
                        <span class="bg-green-50 text-blue-600 text-xs  px-2.5 py-1 rounded-full">
                            {{ institution.services.length }}/4 matched
                        </span>

                        <!-- Select gumb -->
                        <button @click="selectInstitution(institution)"
                            class="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
                            Select
                            <ArrowRight class="w-4 h-4 shrink-0" />
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Start New Search gumb -->
        <div class="flex justify-center mt-6">
            <button @click="$router.push('/')"
                class="border border-blue-400 bg-white text-blue-600 hover:bg-blue-50  hover:text-black text-sm font-medium px-8 py-2 rounded-full transition-colors">
                Start New Search
            </button>
        </div>

    </div>
</template>