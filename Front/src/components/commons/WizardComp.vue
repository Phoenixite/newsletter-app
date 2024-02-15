<template>
    <div class="max-w-xl mx-auto">
      <div class="mb-8">
        <div v-for="(step, index) in steps" :key="index" class="mb-6">
          <div class="flex items-center mb-6">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2" :class="{ 'bg-blue-500 text-white border-blue-500': currentStep === index + 1, 'border-gray-300': currentStep !== index + 1 }">{{ index + 1 }}</div>
            <div class="ml-4 text-sm">{{ step }}</div>
          </div>
          <div v-if="currentStep >= index + 1">
            <slot :name="'step' + (index + 1)"></slot>
          </div>
        </div>
      </div>
  
      <div class="flex justify-between">
        <button @click="prevStep" :disabled="currentStep === 1" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Previous</button>
        <button v-if="currentStep <= 2" @click="nextStep" :disabled="currentStep === steps.length" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  
  const currentStep = ref(1);
  const props = defineProps({
    steps: {
      type: Array,
      required: true
    }
  });

  function nextStep() {
    if (currentStep.value < props.steps.length) {
      currentStep.value++;
    }
  }
  
  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }
  </script>