import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWizardStore = defineStore('wizard', () => {
  // Korak 1 - Patient Information
  const firstName = ref('Borna')
  const lastName = ref('Muscet')
  const country = ref('Croatia')
  const city = ref('Zadar')
  const age = ref('25')
  const dateOfBirth = ref('11.11.1111')
  const gender = ref('Male')
  const preferredCities = ref([])
  const travelStartDate = ref('')
  const travelEndDate = ref('')

  // Korak 2 - Medical Service
  const medicalService = ref('')

  // Korak 3 - Additional Services
  const accommodation = ref('')
  const transportation = ref('')
  const preAppointmentServices = ref([])
  const afterAppointmentServices = ref([])

  // Trenutni korak wizarda
  const currentStep = ref(1)
  const totalSteps = 3

  function nextStep() {
    if (currentStep.value < totalSteps) currentStep.value++
  }

  function prevStep() {
    if (currentStep.value > 1) currentStep.value--
  }

  function resetWizard() {
    currentStep.value = 1
    firstName.value = ''
    lastName.value = ''
    country.value = ''
    city.value = ''
    age.value = ''
    dateOfBirth.value = ''
    gender.value = ''
    preferredCities.value = []
    travelStartDate.value = ''
    travelEndDate.value = ''
    medicalService.value = ''
    accommodation.value = ''
    transportation.value = ''
    preAppointmentServices.value = []
    afterAppointmentServices.value = []
  }

  return {
    firstName,
    lastName,
    country,
    city,
    age,
    dateOfBirth,
    gender,
    preferredCities,
    travelStartDate,
    travelEndDate,
    medicalService,
    accommodation,
    transportation,
    preAppointmentServices,
    afterAppointmentServices,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    resetWizard,
  }
})
