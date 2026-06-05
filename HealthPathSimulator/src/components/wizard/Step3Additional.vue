<script setup>
import { useWizardStore } from '@/stores/wizard';

const store = useWizardStore(); //daj mi pristup svim podacima iz wizarda

const preServices = [
    'Online Consultation', 'Medical Records Transfer', 'Document Translation', 'Travel Insurance Assistance'
]

const afterServices = [
    'Follow-up Consultations', 'Recovery Stay Arrangement', 'Medication Delivery', 'Home Care Coordination'
]

function togglePreService(service) { // funkcija koja se poziva kada se klikne na gumb 
    const index = store.preAppointmentServices.indexOf(service); // indexOf vraća poziciju emelenta u arreyu preService
    if (index === -1) {
        store.preAppointmentServices.push(service);
    } else {
        store.preAppointmentServices.splice(index, 1);
    }
}

function toggleAfterService(service) { // funkcija koja se poziva kada se klikne na gumb 
    const index = store.afterAppointmentServices.indexOf(service); // indexOf vraća poziciju emelenta u arreyu afterService
    if (index === -1) {
        store.afterAppointmentServices.push(service);
    } else {
        store.afterAppointmentServices.splice(index, 1);
    }
}
</script>

<template>
    <!-- Naslov -->
    <h2 class="text-2xl font-bold text-blue-700 text-center mb-2">Additional Services</h2>
    <p class="text-gray-400 text-center text-sm mb-6">Customize your medical travel experience</p>

    <div class="bg-white rounded-2xl p-8 shadow-sm w-full max-w-2xl">

        <!-- Accomodation -->
        <div class="col-span-2 mb-4">
            <label class="text-sm text-gray-600 mb-2  block">Accommodation</label>
            <select v-model="store.accommodation"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Select accommodation</option>
                <option value="noAccommodation">No Accommodation</option>
                <option value="5starHotel">5-Star Hotel</option>
                <option value="4starHotel">4-Star Hotel</option>
                <option value="3starHotel">3-Star Hotel</option>
                <option value="privateApartment">Private Apartment</option>
            </select>
        </div>

        <!-- Transportation -->
        <div class="col-span-2 mb-4">
            <label class="text-sm text-gray-600 mb-2 block">Transportation Method</label>
            <select v-model="store.transportation"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Select transportation method</option>
                <option value="airplane">Airplane (Airport Transfer) </option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="ownCar">Own car</option>
                <option value="carRental">Car Rental</option>
            </select>
        </div>

        <!-- Pre-Appointment Services -->
        <div class="col-span-2 mb-4">
            <label class="text-sm text-gray-600 mb-2 block">Pre-Appointment Services</label>

            <div class="flex flex-wrap gap-2">
                <!-- :class - vrijednost je dinamična - mijenja se ovisno o stanju (odabrano ili ne)
                         v-for prolati kroz array cities i za svaki element kreira jedan gumb
                -->
                <button v-for="preService in preServices" :key="preService" @click="togglePreService(preService)"
                    :class="[
                        'flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm transition-colors',
                        store.preAppointmentServices.includes(preService)
                            ? 'border-gray-800 text-gray-800'
                            : 'border-gray-300 text-gray-500'
                    ]">
                    {{ preService }}
                    <span :class="[
                        'w-4 h-4 rounded-full border flex items-center justify-center',
                        store.preAppointmentServices.includes(preService)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                    ]">
                        <svg v-if="store.preAppointmentServices.includes(preService)" class="w-2.5 h-2.5 text-white"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>

        <!-- After Appointment Service -->
        <div class="col-span-2 mb-4">
            <label class="text-sm text-gray-600 mb-2 block">After Appointment Service</label>

            <div class="flex flex-wrap gap-2">
                <!-- :class - vrijednost je dinamična - mijenja se ovisno o stanju (odabrano ili ne)
                         v-for prolati kroz array cities i za svaki element kreira jedan gumb
                -->
                <button v-for="afterService in afterServices" :key="afterService"
                    @click="toggleAfterService(afterService)" :class="[
                        'flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm transition-colors',
                        store.afterAppointmentServices.includes(afterService)
                            ? 'border-gray-800 text-gray-800'
                            : 'border-gray-300 text-gray-500'
                    ]">
                    {{ afterService }}
                    <span :class="[
                        'w-4 h-4 rounded-full border flex items-center justify-center',
                        store.afterAppointmentServices.includes(afterService)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                    ]">
                        <svg v-if="store.afterAppointmentServices.includes(afterService)" class="w-2.5 h-2.5 text-white"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>



</template>