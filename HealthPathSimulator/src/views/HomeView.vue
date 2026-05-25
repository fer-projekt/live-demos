<script setup>
import { useRouter } from 'vue-router'
import { Stethoscope, Heart, MapPin, ShieldCheck, ArrowRight } from 'lucide-vue-next';


const router = useRouter()

function startWizard() {
  router.push({ name: 'wizard' })
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
    <div class="flex flex-col items-center gap-6 px-4">

      <!-- Logo -->
      <div class="w-20 h-20 bg-linear-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
        <Stethoscope class="w-10 h-10 text-white" />
      </div>

      <!-- Naslov -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-blue-900">Medical Tourism in Croatia</h1>
        <p class="text-cyan-600 mt-2">Find the best medical services tailored to your needs</p>
      </div>

      <!-- Kartice -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <Heart class="w-6 h-6 text-blue-500" />
          </div>
          <h3 class="text-blue-600 font-semibold mb-2">Quality Care</h3>
          <p class="text-gray-500 text-sm">Access to top-rated medical facilities and specialists</p>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
            <MapPin class="w-6 h-6 text-cyan-500" />
          </div>
          <h3 class="text-blue-600 font-semibold mb-2">Multiple Locations</h3>
          <p class="text-gray-500 text-sm">Choose from various cities across Croatia</p>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
            <ShieldCheck class="w-6 h-6 text-teal-500" />
          </div>
          <h3 class="text-blue-600 font-semibold mb-2">Comprehensive Services</h3>
          <p class="text-gray-500 text-sm">Full support from consultation to recovery</p>
        </div>
      </div>

      <!-- CTA gumb -->
      <button @click="startWizard"
        class="bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold px-8 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
        Find Medical Services
        <span>
          <ArrowRight class="w-4 h-4" />
        </span>
      </button>

      <p class="text-gray-500 text-sm">Answer a few questions to get personalized recommendations</p>

    </div>
  </div>
</template>
