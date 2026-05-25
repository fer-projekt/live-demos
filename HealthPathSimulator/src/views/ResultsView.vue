<script setup>
import { useWizardStore } from '@/stores/wizard';
import { useResultsStore } from '@/stores/results';
import Step1Institutions from '@/components/results/Step1Institutions.vue';
import Step2Accommodation from '@/components/results/Step2Accommodation.vue';
import Step3TravelPlans from '@/components/results/Step3TravelPlans.vue';
import Step4JourneyPreview from '@/components/results/Step4JourneyPreview.vue';

const wizardStore = useWizardStore(); // daj mi pristup svim podacima iz wizarda
const resultsStore = useResultsStore(); // daj mi pristup svim podacima iz results

</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
    <div class="w-full max-w-3xl flex items-center justify-between mb-6 ">

      <div v-for="(step, index) in [
        { label: 'Medical Institution' },
        { label: 'Accommodation' },
        { label: 'Travel Plans' },
        { label: 'Journey Preview' }
      ]" :key="index" class="flex items-center">

        <!-- Krug + label u istom redu -->
        <div class="flex items-center gap-2">
          <div :class="[
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0',
            resultsStore.currentStep === index + 1
              ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
              : resultsStore.currentStep > index + 1
                ? 'bg-blue-100 text-blue-400'
                : 'bg-gray-200 text-gray-400'
          ]">{{ index + 1 }}</div>
          <span :class="[
            'text-xs font-medium whitespace-nowrap',
            resultsStore.currentStep === index + 1 ? 'text-gray-800 font-semibold' : 'text-gray-400'
          ]">{{ step.label }}</span>
        </div>

        <!-- Linija između stepova (ne na zadnjem) -->
        <div v-if="index < 3" :class="[
          'w-12 h-0.5 mx-3 shrink-0',
          resultsStore.currentStep > index + 1 ? 'bg-blue-300' : 'bg-gray-200'
        ]"></div>
      </div>
    </div>

    <!-- Plava summary traka -->
    <div
      class="w-full max-w-3xl bg-linear-to-r from-blue-600 to-cyan-400 rounded-2xl p-5 mb-6 flex justify-between text-white">
      <div>
        <p class="text-xs opacity-80">Patient Information</p>
        <p class="font-semibold">{{ wizardStore.firstName }} {{ wizardStore.lastName }}</p>
      </div>
      <div>
        <p class="text-xs opacity-80">Preferred Cities</p>
        <p class="font-semibold">{{ wizardStore.preferredCities.join(', ') }}</p>
      </div>
      <div>
        <p class="text-xs opacity-80">Selected Service</p>
        <p class="font-semibold">{{ wizardStore.medicalService }}</p>
      </div>
    </div>

    <!-- Aktivan korak -->
    <div class="w-full max-w-3xl">
      <Step1Institutions v-if="resultsStore.currentStep === 1" />
      <Step2Accommodation v-if="resultsStore.currentStep === 2" />
      <Step3TravelPlans v-if="resultsStore.currentStep === 3" />
      <Step4JourneyPreview v-if="resultsStore.currentStep === 4" />
    </div>
  </div>
</template>
