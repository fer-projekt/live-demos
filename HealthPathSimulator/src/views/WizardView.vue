<script setup>
import { useWizardStore } from '@/stores/wizard';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Step1Patient from '@/components/wizard/Step1Patient.vue';
import Step2Service from '@/components/wizard/Step2Service.vue';
import Step3Additional from '@/components/wizard/Step3Additional.vue';

const store = useWizardStore(); //daj mi pristup svim podacima iz wizarda
const router = useRouter();

// za postotak progress bara
const progressPercent = computed(() => {
  return (store.currentStep / store.totalSteps) * 100
})

function handleContinue() {
  if (store.currentStep === store.totalSteps) {
    router.push('/results')
  } else {
    store.nextStep()
  }
}
</script>

<template>
  <div class="min-h-screen bg-blue-50 flex flex-col items-center pt-10 px-4">
    <!-- Tekst koraka -->
    <p class="text-blue-500 font-medium mb-2">
      Step {{ store.currentStep }} / {{ store.totalSteps }}
    </p>

    <!-- Progress bar -->
    <div class="w-full max-w-xl h-1.5 bg-gray-200 rounded-full">
      <div class="h-1.5 bg-blue-900 rounded-full transition-all duration-300" :style="{ width: progressPercent + '%' }">
      </div>
    </div>

    <div class="w-full max-w-2xl mt-8">
      <Step1Patient v-if="store.currentStep === 1" />
      <Step2Service v-if="store.currentStep === 2" />
      <Step3Additional v-if="store.currentStep === 3" />
    </div>

    <!-- Navigacija -->
    <div class="w-full max-w-2xl flex justify-between mt-6">
      <button @click="store.prevStep()" class="text-gray-500 flex items-center gap-1 hover:text-gray-700">
        ← Back
      </button>
      <button @click="handleContinue()"
        class="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:opacity-90">
        Continue →
      </button>
    </div>
  </div>


</template>
