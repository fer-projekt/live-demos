import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResultsStore = defineStore('results', () => {
  const currentStep = ref(1)
  const totalSteps = 4

  const selectedInstitution = ref(null)
  const selectedAccommodation = ref(null)
  const selectedTransport = ref(null)

  function nextStep() {
    if (currentStep.value < totalSteps) currentStep.value++
  }

  function prevStep() {
    if (currentStep.value > 1) currentStep.value--
  }

  return {
    currentStep,
    totalSteps,
    selectedInstitution,
    selectedAccommodation,
    selectedTransport,
    nextStep,
    prevStep,
  }
})
