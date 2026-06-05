<script setup>
// Uvozimo oba stora jer trebamo podatke iz wizarda i iz odabira rezultata
import { useWizardStore } from '@/stores/wizard';
import { useResultsStore } from '@/stores/results';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import InteractiveMap from './InteractiveMap.vue';

const wizardStore = useWizardStore(); // daj mi pristup svim podacima iz wizarda
const resultsStore = useResultsStore(); // daj mi pristup svim podacima iz results
const router = useRouter(); // Router za prebacivanje na neku stranicu

// Resetira sve i vraća na početak
function startNewSearch() {
    wizardStore.resetWizard();
    router.push({ name: 'home' })
}

// null - sve zatvoreno, broj - koja faza je otvorena
const activePhase = ref(null);

// Toggle - ako klikneš istu fazu, zatvori je, inače otvori novu
function togglePhase(phase) {
    activePhase.value = activePhase.value === phase ? null : phase
}

const nutritionFoods = [
    'Balanced Mediterranean-style diet',
    'Colorful variety of fruits and vegetables daily',
    'Whole grains and legumes',
    'Lean proteins (fish, poultry, plant-based)',
    'Healthy fats (olive oil, nuts, seeds)',
    'Limit processed foods, sugar, and alcohol',
    'Stay well-hydrated throughout the day',
]

const recommendedActivities = [
    'Daily morning walks along the coast',
    'Yoga and meditation sessions',
    'Swimming and water aerobics',
    'Hiking scenic trails',
    'Cycling tours',
    'Spa and wellness treatments',
    'Cooking classes (healthy Croatian cuisine)',
    'Mindfulness and relaxation workshops',
]

const activitiesToAvoid = [
    'Overindulging in food or alcohol',
    'Sedentary days without movement',
    'Skipping sleep for activities',
    'Stress-inducing situations',
]
</script>

<template>
    <div>
        <!-- Naslov -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-gray-800">Journey Preview</h2>
                    <p class="text-gray-400 text-sm">Your complete medical journey itinerary</p>
                </div>
            </div>
            <button @click="resultsStore.prevStep()"
                class="text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50">
                ← Change Travel Plan
            </button>
        </div>

        <!-- Zelena summary kartica -->
        <div class="bg-green-500 rounded-2xl p-6 mb-4 text-white">
            <p class="text-sm opacity-80 mb-3">Your Selection Summary</p>
            <div class="flex justify-between">
                <div>
                    <p class="text-xs opacity-70">Medical Institution</p>
                    <p class="font-semibold">{{ resultsStore.selectedInstitution?.name }}</p>
                    <p class="text-sm opacity-80">€{{ resultsStore.selectedInstitution?.price }}</p>
                </div>
                <div>
                    <p class="text-xs opacity-70">Accommodation</p>
                    <p class="font-semibold">{{ resultsStore.selectedAccommodation?.name }}</p>
                    <p class="text-sm opacity-80">€{{ resultsStore.selectedAccommodation?.pricePerNight }}/night</p>
                </div>
                <div>
                    <p class="text-xs opacity-70">Travel Plan</p>
                    <p class="font-semibold">{{ resultsStore.selectedTransport?.name }}</p>
                    <p class="text-sm opacity-80">€{{ resultsStore.selectedTransport?.price }}</p>
                </div>
            </div>
        </div>

        <!-- Journey Ready banner -->
        <div class="text-center my-6">
            <div
                class="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
                <span>✓</span> Your Health Journey Plan is Ready!
            </div>
            <h3 class="text-lg font-bold text-gray-800">Your Complete Medical Tourism Journey</h3>
            <p class="text-gray-400 text-sm">Here's your personalized step-by-step for your medical journey to Croatia
            </p>
        </div>

        <!-- Plava info kartica -->
        <div class="bg-linear-to-r from-blue-600 to-cyan-400 rounded-2xl p-6 mb-6 text-white flex justify-between">
            <div>
                <p class="text-sm opacity-70">Patient</p>
                <p class="font-semibold">{{ wizardStore.firstName }} {{ wizardStore.lastName }}</p>
                <p class="text-sm opacity-80">From {{ wizardStore.city }}, {{ wizardStore.country }}</p>
            </div>
            <div>
                <p class="text-sm opacity-70">Travel Dates</p>
                <p class="font-semibold">{{ wizardStore.travelStartDate }}</p>
                <p class="text-sm opacity-80">to {{ wizardStore.travelEndDate }}</p>
            </div>
            <div>
                <p class="text-sm opacity-70">Destination</p>
                <p class="font-semibold">{{ resultsStore.selectedInstitution?.city }}, Croatia</p>
            </div>
        </div>

        <!-- Timeline -->
        <h3 class="text-blue-700 font-semibold text-center mb-1">Interactive Journey Timeline</h3>
        <p class="text-gray-400 text-sm text-center mb-6">Click on each phase to see detailed information</p>

        <!-- Timeline navigacija -->
        <div class="bg-white rounded-2xl p-6 mb-4">
            <div class="flex justify-between">

                <!-- Faza 1 -->
                <div @click="togglePhase(1)" class="flex flex-col items-center cursor-pointer">
                    <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-2 border-2 transition-all',
                        activePhase === 1
                            ? 'bg-purple-500 border-purple-500 text-white'
                            : 'bg-gray-100 border-transparent text-gray-400'
                    ]">
                        <span>📋</span>
                    </div>
                    <p :class="activePhase === 1 ? 'text-purple-600 font-semibold text-xs' : 'text-gray-400 text-xs'">
                        Preparation
                    </p>
                    <span class="text-gray-400 text-xs">{{ activePhase === 1 ? '∧' : '∨' }}</span>
                </div>

                <!-- Faza 2 -->
                <div @click="togglePhase(2)" class="flex flex-col items-center cursor-pointer">
                    <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-2 border-2 transition-all',
                        activePhase === 2
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-gray-100 border-transparent text-gray-400'
                    ]">
                        <span>🚆</span>
                    </div>
                    <p :class="activePhase === 2 ? 'text-green-600 font-semibold text-xs' : 'text-gray-400 text-xs'">
                        Travel
                    </p>
                    <span class="text-gray-400 text-xs">{{ activePhase === 2 ? '∧' : '∨' }}</span>
                </div>

                <!-- Faza 3 -->
                <div @click="togglePhase(3)" class="flex flex-col items-center cursor-pointer">
                    <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-2 border-2 transition-all',
                        activePhase === 3
                            ? 'bg-pink-500 border-pink-500 text-white'
                            : 'bg-gray-100 border-transparent text-gray-400'
                    ]">
                        <span>🏨</span>
                    </div>
                    <p :class="activePhase === 3 ? 'text-pink-600 font-semibold text-xs' : 'text-gray-400 text-xs'">
                        Arrival
                    </p>
                    <span class="text-gray-400 text-xs">{{ activePhase === 3 ? '∧' : '∨' }}</span>
                </div>

                <!-- Faza 4 -->
                <div @click="togglePhase(4)" class="flex flex-col items-center cursor-pointer">
                    <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-2 border-2 transition-all',
                        activePhase === 4
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-gray-100 border-transparent text-gray-400'
                    ]">
                        <span>🏥</span>
                    </div>
                    <p :class="activePhase === 4 ? 'text-blue-600 font-semibold text-xs' : 'text-gray-400 text-xs'">
                        Procedure
                    </p>
                    <span class="text-gray-400 text-xs">{{ activePhase === 4 ? '∧' : '∨' }}</span>
                </div>

                <!-- Faza 5 -->
                <div @click="togglePhase(5)" class="flex flex-col items-center cursor-pointer">
                    <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-2 border-2 transition-all',
                        activePhase === 5
                            ? 'bg-teal-500 border-teal-500 text-white'
                            : 'bg-gray-100 border-transparent text-gray-400'
                    ]">
                        <span>❤️</span>
                    </div>
                    <p :class="activePhase === 5 ? 'text-teal-600 font-semibold text-xs' : 'text-gray-400 text-xs'">
                        Recovery
                    </p>
                    <span class="text-gray-400 text-xs">{{ activePhase === 5 ? '∧' : '∨' }}</span>
                </div>

                <!-- Faza 6 -->
                <div @click="togglePhase(6)" class="flex flex-col items-center cursor-pointer">
                    <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-2 border-2 transition-all',
                        activePhase === 6
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'bg-gray-100 border-transparent text-gray-400'
                    ]">
                        <span>📸</span>
                    </div>
                    <p :class="activePhase === 6 ? 'text-orange-600 font-semibold text-xs' : 'text-gray-400 text-xs'">
                        Departure
                    </p>
                    <span class="text-gray-400 text-xs">{{ activePhase === 6 ? '∧' : '∨' }}</span>
                </div>
            </div>
        </div>

        <!-- FAZA 1: Pre-Travel Preparation -->
        <div v-if="activePhase === 1" class="border-l-4 border-purple-400 bg-white rounded-2xl p-6 mb-4">

            <!-- Naslov faze -->
            <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span class="text-purple-500 text-sm">📋</span>
                </div>
                <div>
                    <p class="font-semibold text-purple-600">Phase 1: Pre-Travel Preparation</p>
                    <p class="text-gray-400 text-xs">Complete before {{ wizardStore.travelStartDate }}</p>
                </div>
            </div>

            <!-- Required Documents - statična lista -->
            <div class="bg-purple-50 rounded-xl p-4 mb-3">
                <p class="text-purple-400 text-sm font-medium mb-2">✓ Required Documents</p>
                <ul class="space-y-1">
                    <li class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span>Valid Request (expires after {{ wizardStore.travelStartDate
                        }})
                    </li>
                    <li class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span>Medical Records & Previous Test Results
                    </li>
                    <li class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span>Travel Insurance Documentation
                    </li>
                    <li class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span>Prescription Medications (carry-on with labels)
                    </li>
                </ul>
            </div>

            <!-- Pre-Appointment Services - dinamički iz wizardStore -->
            <div class="bg-blue-50 rounded-xl p-4 mb-3">
                <p class="text-blue-600 text-sm font-medium mb-2">Pre-Appointment Services Included</p>
                <!-- v-for kroz usluge koje je korisnik odabrao u koraku 1 wizarda -->
                <div class="grid grid-cols-2 gap-1">
                    <div v-for="service in wizardStore.preAppointmentServices" :key="service"
                        class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span> {{ service }}
                    </div>
                </div>
            </div>

            <!-- Action Items - statična lista savjeta -->
            <div class="bg-yellow-50 rounded-xl p-4">
                <p class="text-yellow-600 text-sm font-medium mb-2">⏰ Action Items</p>
                <ul class="space-y-1">
                    <li class="text-gray-500 text-sm">• Contact institution 2 weeks before arrival</li>
                    <li class="text-gray-500 text-sm">• Book accommodation confirmation</li>
                    <li class="text-gray-500 text-sm">• Arrange transportation from airport/station</li>
                </ul>
            </div>
        </div>

        <!-- FAZA 2: Travel to Croatia -->
        <div v-if="activePhase === 2" class="border-l-4 border-green-400 bg-white rounded-2xl p-6 mb-4">
            <!-- Naslov faze -->
            <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span class="text-green-500 text-sm">🚗</span>
                </div>
                <div>
                    <p class="font-semibold text-green-600">Phase 2: Travel to Croatia</p>
                    <p class="text-gray-400 text-xs">Arrive in {{ resultsStore.selectedInstitution?.city }}, Croatia
                    </p>
                </div>
            </div>

            <!-- Transportation Plan - dinamički iz resultsStore -->
            <div class="bg-green-50 rounded-xl p-4 mb-3">
                <p class="text-green-600 text-sm font-medium mb-2">🚆 Transportation Plan</p>
                <p class="font-semibold text-green-600">{{ resultsStore.selectedTransport?.name }}</p>
                <p class="text-gray-400 text-sm mb-3">{{ resultsStore.selectedTransport?.description }}</p>
                <!-- v-for kroz značajke odabranog prijevoza -->
                <ul class="space-y-1">
                    <li v-for="feature in resultsStore.selectedTransport?.features" :key="feature"
                        class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span> {{ feature }}
                    </li>
                </ul>
            </div>

            <!-- What to Pack - statična lista -->
            <div class="bg-blue-50 rounded-xl p-4">
                <p class="text-blue-600 text-sm font-medium mb-2">📍 What to Pack</p>
                <div class="grid grid-cols-2 gap-1">
                    <p class="text-gray-500 text-sm flex items-center gap-2"><span
                            class="text-blue-500">✓</span>Comfortable clothing</p>
                    <p class="text-gray-500 text-sm flex items-center gap-2"><span
                            class="text-blue-500">✓</span>Personal medications</p>
                    <p class="text-gray-500 text-sm flex items-center gap-2"><span class="text-blue-500">✓</span>Changer
                        & adapters</p>
                    <p class="text-gray-500 text-sm flex items-center gap-2"><span
                            class="text-blue-500">✓</span>Entertainment for travel</p>
                </div>
            </div>
        </div>

        <!-- FAZA 3: Arrival & Check-in -->
        <div v-if="activePhase === 3" class="border-l-4 border-pink-400 bg-white rounded-2xl p-6 mb-4">

            <!-- Naslov faze -->
            <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span class="text-pink-500 text-sm">🛏️</span>
                </div>
                <div>
                    <p class="font-semibold text-pink-600">Phase 3: Arrival & Check-in</p>
                    <p class="text-gray-400 text-xs">Day 1 - {{ wizardStore.travelStartDate }}</p>
                </div>
            </div>

            <!-- Smještaj - dinamički iz resultsStore -->
            <div class="bg-pink-50 rounded-xl p-4 mb-3">
                <p class="text-pink-600 text-sm font-medium mb-2">🏨 Your Accommodation</p>
                <p class="font-semibold text-gray-800">{{ resultsStore.selectedAccommodation?.name }}</p>
                <p class="text-blue-400 text-xs mb-1">{{ resultsStore.selectedAccommodation?.type }}</p>
                <p class="text-gray-400 text-xs mb-2">📍 {{ resultsStore.selectedAccommodation?.address }}</p>
                <p class="text-gray-400 text-xs mb-3">
                    📞 {{ resultsStore.selectedAccommodation?.phone }}
                    &nbsp;&nbsp;✉️ {{ resultsStore.selectedAccommodation?.email }}
                </p>
                <p class="text-gray-600 text-sm font-medium mb-2">Amenities included:</p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="amenity in resultsStore.selectedAccommodation?.amenities" :key="amenity"
                        class="bg-white text-gray-500 text-xs px-3 py-1 rounded-full border border-gray-200">
                        {{ amenity }}
                    </span>
                </div>
            </div>

            <!-- First Day Activities - statično -->
            <div class="bg-yellow-50 rounded-xl p-4">
                <p class="text-yellow-600 text-sm font-medium mb-2">🎯 First Day Activities</p>
                <ul class="space-y-1">
                    <li class="text-gray-500 text-sm">• Check into accommodation and settle in</li>
                    <li class="text-gray-500 text-sm">• Visit nearby pharmacy to stock essentials</li>
                    <li class="text-gray-500 text-sm">• Rest and acclimate to local time</li>
                    <li class="text-gray-500 text-sm">• Confirm appointment time with hospital</li>
                </ul>
            </div>
        </div>

        <!-- FAZA 4: Medical Procedure -->
        <div v-if="activePhase === 4" class="border-l-4 border-blue-400 bg-white rounded-2xl p-6 mb-4">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span class="text-blue-500 text-sm">🏥</span>
                </div>
                <div>
                    <p class="font-semibold text-blue-600">Phase 4: Medical Procedure</p>
                    <p class="text-gray-400 text-xs">As scheduled</p>
                </div>
            </div>

            <!-- Institucija - dinamički iz resultsStore -->
            <div class="bg-blue-50 rounded-xl p-4 mb-3">
                <p class="text-blue-600 text-sm font-medium mb-2">🏥 Medical Institution Details</p>
                <p class="font-semibold text-gray-800">{{ resultsStore.selectedInstitution?.name }}</p>
                <p class="text-gray-400 text-xs mb-2">📍 {{ resultsStore.selectedInstitution?.address }}</p>
                <p class="text-gray-400 text-xs mb-3">
                    📞 {{ resultsStore.selectedInstitution?.phone }}
                    &nbsp;&nbsp;✉️ {{ resultsStore.selectedInstitution?.email }}
                </p>
                <p class="text-gray-600 text-sm font-medium mb-2">Specialties:</p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="service in resultsStore.selectedInstitution?.services" :key="service"
                        class="bg-white text-blue-500 text-xs px-3 py-1 rounded-full border border-blue-200">
                        {{ service }}
                    </span>
                </div>
            </div>

            <!-- Checklist - statično -->
            <div class="bg-purple-50 rounded-xl p-4 mb-3">
                <p class="text-purple-600 text-sm font-medium mb-2">⏰ Day of Procedure Checklist</p>
                <ul class="space-y-1">
                    <li class="text-gray-500 text-sm">• Arrive 30 minutes early for check-in</li>
                    <li class="text-gray-500 text-sm">• Bring all medical documents and ID</li>
                    <li class="text-gray-500 text-sm">• Follow pre-procedure fasting instructions (if applicable)</li>
                    <li class="text-gray-500 text-sm">• Have emergency contact information ready</li>
                    <li class="text-gray-500 text-sm">• Arrange transport back to accommodation</li>
                </ul>
            </div>

            <!-- Nearby Pharmacy - statično -->
            <div class="bg-green-50 rounded-xl p-4">
                <p class="text-green-600 text-sm font-medium mb-2">📍 Nearby Pharmacy</p>
                <p class="font-semibold text-gray-800">Pharmacy Plaza</p>
                <p class="text-gray-400 text-xs">0.3 km from {{ resultsStore.selectedInstitution?.name }}</p>
                <p class="text-gray-400 text-xs">Open 8:00 AM - 8:00 PM</p>
                <p class="text-green-500 text-xs mt-1">✓ English-speaking staff available</p>
            </div>
        </div>

        <!-- FAZA 5: Recovery & After Care -->
        <div v-if="activePhase === 5" class="border-l-4 border-teal-400 bg-white rounded-2xl p-6 mb-4">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span class="text-teal-500 text-sm">❤️</span>
                </div>
                <div>
                    <p class="font-semibold text-teal-600">Phase 5: Recovery & After Care</p>
                    <p class="text-gray-400 text-xs">Days following procedure</p>
                </div>
            </div>

            <!-- After services - dinamički -->
            <div class="bg-teal-50 rounded-xl p-4 mb-3">
                <p class="text-teal-600 text-sm font-medium mb-2">After-Appointment Services Included</p>
                <div class="grid grid-cols-2 gap-1">
                    <div v-for="service in wizardStore.afterAppointmentServices" :key="service"
                        class="text-gray-500 text-sm flex items-center gap-2">
                        <span class="text-green-500">✓</span> {{ service }}
                    </div>
                </div>
            </div>

            <!-- Recovery Guidelines - statično -->
            <div class="bg-yellow-50 rounded-xl p-4 mb-3">
                <p class="text-yellow-600 text-sm font-medium mb-2">⏰ Recovery Guidelines</p>
                <ul class="space-y-1">
                    <li class="text-gray-500 text-sm">• Follow all post-procedure instructions from your doctor</li>
                    <li class="text-gray-500 text-sm">• Take prescribed medications as directed</li>
                    <li class="text-gray-500 text-sm">• Rest adequately and avoid strenuous activities</li>
                    <li class="text-gray-500 text-sm">• Stay hydrated and eat nutritious meals</li>
                    <li class="text-gray-500 text-sm">• Attend all follow-up appointments</li>
                </ul>
            </div>

            <!-- Nearby Essentials - statično -->
            <div class="bg-green-50 rounded-xl p-4">
                <p class="text-green-600 text-sm font-medium mb-3">✅ Nearby Essentials</p>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="font-semibold text-gray-800 text-sm">Grocery Store</p>
                        <p class="text-gray-400 text-xs">400m from accommodation</p>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800 text-sm">Medical Supplies Store</p>
                        <p class="text-gray-400 text-xs">250m from hospital</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- FAZA 6: Leisure & Departure -->
        <div v-if="activePhase === 6" class="border-l-4 border-orange-400 bg-white rounded-2xl p-6 mb-4">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span class="text-orange-500 text-sm">📸</span>
                </div>
                <div>
                    <p class="font-semibold text-orange-600">Phase 6: Leisure & Departure</p>
                    <p class="text-gray-400 text-xs">When feeling better</p>
                </div>
            </div>

            <!-- Restorani - statično -->
            <div class="bg-orange-50 rounded-xl p-4 mb-3">
                <p class="text-orange-600 text-sm font-medium mb-3">🍽️ Recommended Restaurants Nearby</p>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="font-semibold text-gray-800 text-sm">Konoba Dalmatino</p>
                        <p class="text-blue-400 text-xs">Traditional Croatian cuisine</p>
                        <p class="text-yellow-400 text-xs">★ 4.8 • 600m away</p>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800 text-sm">Healthy Bites Café</p>
                        <p class="text-blue-400 text-xs">Light & nutritious meals</p>
                        <p class="text-yellow-400 text-xs">★ 4.9 • 300m away</p>
                    </div>
                </div>
            </div>

            <!-- Aktivnosti - statično -->
            <div class="bg-blue-50 rounded-xl p-4 mb-3">
                <p class="text-blue-600 text-sm font-medium mb-3">🎯 Light Activities (When Cleared by Doctor)</p>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="font-semibold text-gray-800 text-sm">Old Town Walking Tour</p>
                        <p class="text-gray-400 text-xs">Gentle stroll through historic sites</p>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800 text-sm">Seaside Promenade</p>
                        <p class="text-gray-400 text-xs">Beautiful coastal views</p>
                    </div>
                </div>
            </div>

            <!-- Departure checklist - statično -->
            <div class="bg-yellow-50 rounded-xl p-4">
                <p class="text-yellow-600 text-sm font-medium mb-2">✈️ Departure Day Checklist</p>
                <ul class="space-y-1">
                    <li class="text-gray-500 text-sm">• Collect all medical records and prescriptions</li>
                    <li class="text-gray-500 text-sm">• Request doctor's clearance letter for travel</li>
                    <li class="text-gray-500 text-sm">• Check out from accommodation</li>
                    <li class="text-gray-500 text-sm">• Arrange transport to airport/station</li>
                    <li class="text-gray-500 text-sm">• Carry medications in original packaging</li>
                </ul>
            </div>
        </div>

        <!-- Interaktivna mapa -->
        <InteractiveMap :institution="resultsStore.selectedInstitution"
            :nearbyPlaces="resultsStore.selectedInstitution?.nearbyPlaces"
            :accommodation="resultsStore.selectedAccommodation" />

        <!-- Insurance & Emergency Information -->
        <div class="border border-red-100 bg-white rounded-2xl p-6 mb-4">

            <!-- Naslov sekcije -->
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                    <span class="text-white text-lg">🛡️</span>
                </div>
                <div>
                    <h3 class="font-semibold text-red-600">Insurance & Emergency Information</h3>
                    <p class="text-gray-400 text-sm">Important contacts and safety information</p>
                </div>
            </div>

            <!-- Insurance & emergency info kartica -->
            <div class="grid grid-cols-2 gap-4">

                <!-- Emergency Contacts -->
                <div class="bg-red-50 rounded-xl p-4">
                    <p class="text-red-500 font-semibold text-sm mb-3 flex items-center gap-2">
                        🚑 Emergency Contacts
                    </p>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center py-1 border-b border-red-100">
                            <span class="text-gray-600 text-sm">Emergency Services (EU)</span>
                            <span class="text-red-500 font-bold text-sm">112</span>
                        </div>
                        <div class="flex justify-between items-center py-1 border-b border-red-100">
                            <span class="text-gray-600 text-sm">Police</span>
                            <span class="text-red-500 font-bold text-sm">192</span>
                        </div>
                        <div class="flex justify-between items-center py-1 border-b border-red-100">
                            <span class="text-gray-600 text-sm">Fire Department</span>
                            <span class="text-red-500 font-bold text-sm">193</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="text-gray-600 text-sm">Ambulance</span>
                            <span class="text-red-500 font-bold text-sm">194</span>
                        </div>
                    </div>
                </div>

                <!-- Hospital 24/7 Hotline -->
                <div class="bg-blue-50 rounded-xl p-4">
                    <p class="text-blue-600 font-semibold text-sm mb-3 flex items-center gap-2">
                        📞 Hospital 24/7 Hotline
                    </p>
                    <div class="bg-white rounded-lg p-3 mb-2">
                        <p class="text-gray-700 font-semibold text-sm">{{ resultsStore.selectedInstitution?.name }}</p>
                        <p class="text-blue-500 font-bold text-base mt-1">{{ resultsStore.selectedInstitution?.phone }}
                        </p>
                        <p class="text-gray-400 text-xs mt-1">Available 24/7 for emergencies</p>
                    </div>
                    <div class="bg-white rounded-lg p-3">
                        <p class="text-gray-600 text-sm font-medium">English-Speaking Coordinator</p>
                        <p class="text-blue-500 font-bold text-sm mt-1">+385 91 234 5678</p>
                        <p class="text-gray-400 text-xs mt-1">Your dedicated support contact</p>
                    </div>
                </div>

                <!-- Travel Insurance Details -->
                <div class="bg-green-50 rounded-xl p-4">
                    <p class="text-green-600 font-semibold text-sm mb-3 flex items-center gap-2">
                        🛡️ Travel Insurance Details
                    </p>
                    <p class="text-gray-600 text-sm font-medium mb-2">⏰ Ensure your policy covers:</p>
                    <ul class="space-y-1.5">
                        <li class="text-green-700 text-sm flex items-start gap-2">
                            <span class="mt-0.5">•</span> Medical procedures abroad
                        </li>
                        <li class="text-green-700 text-sm flex items-start gap-2">
                            <span class="mt-0.5">•</span> Post-procedure complications
                        </li>
                        <li class="text-green-700 text-sm flex items-start gap-2">
                            <span class="mt-0.5">•</span> Trip cancellation/interruption
                        </li>
                        <li class="text-green-700 text-sm flex items-start gap-2">
                            <span class="mt-0.5">•</span> Emergency medical evacuation
                        </li>
                        <li class="text-green-700 text-sm flex items-start gap-2">
                            <span class="mt-0.5">•</span> Extended stay if medically required
                        </li>
                    </ul>
                </div>

                <!-- Keep These Handy -->
                <div class="bg-yellow-50 rounded-xl p-4">
                    <p class="text-yellow-600 font-semibold text-sm mb-3 flex items-center gap-2">
                        📋 Keep These Handy
                    </p>
                    <ul class="space-y-2.5">
                        <li class="flex items-center gap-2 text-sm text-gray-600">
                            <span class="text-green-500">✓</span>
                            Blood type: <span class="text-gray-400">______</span>
                        </li>
                        <li class="flex items-center gap-2 text-sm text-gray-600">
                            <span class="text-green-500">✓</span>
                            Allergies: <span class="text-gray-400">______</span>
                        </li>
                        <li class="flex items-center gap-2 text-sm text-gray-600">
                            <span class="text-green-500">✓</span>
                            Current medications: <span class="text-gray-400">______</span>
                        </li>
                        <li class="flex items-center gap-2 text-sm text-gray-600">
                            <span class="text-green-500">✓</span>
                            Emergency contact back home: <span class="text-gray-400">______</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- Personalized Nutrition Plan kartica -->
        <div class="border border-green-100 bg-white rounded-2xl p-6 mb-4">

            <!-- Naslov -->
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <span class="text-white text-lg">🍎</span>
                </div>
                <div>
                    <h3 class="font-semibold text-green-600">
                        Personalized Nutrition Plan
                    </h3>
                    <p class="text-gray-400 text-sm">
                        Diet recommendations fro Wellness & Prevention
                    </p>
                </div>
            </div>

            <!-- Reccommended Foods kartica -->
            <div class="bg-green-50 rounded-xl p-5">
                <p class="text-green-600 font-semibold text-sm mb-4 flex items-center gap-2">
                    🌿 Recommended Foods for Optimal Recovery
                </p>

                <!-- 2-colomn grid food items -->
                <div class="grid grid-cols-2 gap-3">
                    <div v-for="food in nutritionFoods" :key="food"
                        class="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                        <span class="text-green-500 text-sm">🌿</span>
                        <span class="text-green-700 text-sm">{{ food }}</span>

                    </div>
                </div>
            </div>
        </div>

        <!-- Personalized Activity Guide -->
        <div class="border border-blue-100 bg-white rounded-2xl p-6 mb-4">

            <!-- Naslov -->
            <div class="flex items-center gap-3 mb-5">
                <div
                    class="w-10 h-10 bg-linear-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                    <span class="text-white text-lg">📊</span>
                </div>
                <div>
                    <h3 class="font-semibold text-blue-600">Personalized Activity Guide</h3>
                    <p class="text-gray-400 text-sm">Activities tailored for Wellness & Prevention</p>
                </div>
            </div>

            <!-- 2-column grid -->
            <div class="grid grid-cols-2 gap-4">

                <!-- Recommended Activities - zelena -->
                <div class="bg-green-50 rounded-xl p-4">
                    <p class="text-green-600 font-semibold text-sm mb-3 flex items-center gap-2">
                        ✅ Recommended Activities
                    </p>
                    <div class="space-y-2">
                        <div v-for="activity in recommendedActivities" :key="activity"
                            class="bg-white rounded-lg px-3 py-2 flex items-center gap-2 border border-green-100">
                            <span class="text-green-400 text-sm">🌸</span>
                            <span class="text-green-700 text-sm">{{ activity }}</span>
                        </div>
                    </div>
                </div>

                <!-- Activities to Avoid - crvena -->
                <div class="bg-red-50 rounded-xl p-4">
                    <p class="text-red-500 font-semibold text-sm mb-3 flex items-center gap-2">
                        ⊘ Activities to Avoid
                    </p>
                    <div class="space-y-2">
                        <div v-for="activity in activitiesToAvoid" :key="activity"
                            class="bg-white rounded-lg px-3 py-2 flex items-center gap-2 border border-red-100">
                            <span class="text-red-400 text-sm">⊘</span>
                            <span class="text-red-600 text-sm">{{ activity }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Download PDF + Confirm gumbi -->
        <div class="bg-linear-to-r from-purple-600 to-blue-500 rounded-2xl p-6 mb-4 flex justify-between items-center">
            <div>
                <p class="text-white font-semibold">Download Your Complete Journey Plan</p>
                <p class="text-white opacity-70 text-sm">Get a PDF copy of this itinerary for offline Access</p>
            </div>
            <button class="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90">⬇
                Download PDF</button>
        </div>

        <div class="flex justify-center gap-4 mb-6">
            <button @click="resultsStore.currentStep = 1"
                class="border border-gray-400 text-gray-600 px-6 py-2 rounded-full text-sm hover:bg-gray-200">
                Edit Selections
            </button>
            <button class=" bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90">
                Confirm & Book Journey →
            </button>
        </div>

        <div class="flex justify-center mb-8">
            <button @click="startNewSearch"
                class="border border-gray-400 text-sm text-gray-500 px-6 py-2 rounded-full hover:bg-gray-200">Start New
                Search</button>
        </div>
    </div>
</template>