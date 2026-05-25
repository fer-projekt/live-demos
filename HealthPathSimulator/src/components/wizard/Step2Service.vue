<script setup>
import { useWizardStore } from '@/stores/wizard';

const store = useWizardStore();//daj mi pristup svim podacima iz wizarda

</script>

<template>
    <h2 class="text-2xl font-bold text-blue-700 text-center mb-2">Select Medical Services</h2>
    <p class="text-gray-400 text-center text-sm mb-6">Choose the medical service you're looking for</p>

    <div class="bg-white rounded-2xl p-8 shadow-sm w-full max-w-2xl">
        <!-- Medical Services -->
        <div class="col-span-2">
            <label class="text-sm text-gray-600 mb-2 block">Medical Service *</label>
            <select v-model="store.medicalService"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Select a medical service</option>
                <option value="dentalCare">Dental Care</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="cardiology">Cardiology</option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="cosmeticSurgery">Cosmetic Surgery</option>
                <option value="physicalTherapy">Physical Therapy</option>
            </select>
        </div>
    </div>
</template>