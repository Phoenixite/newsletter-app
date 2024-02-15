<template>
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Your Preferences {{ email }}</h2>
      <div class="mb-4">
        <label class="block mb-2">Subscribe to Frogs:</label>
        <input type="checkbox" v-model="subscribeToFrogs">
      </div>
      <div class="mb-4">
        <label class="block mb-2">Subscribe to Raccoons:</label>
        <input type="checkbox" v-model="subscribeToRaccoons">
      </div>
      <button @click="savePreferences" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save Preferences</button>
      <div v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</div>
    </div>
  </template>
  
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { managePreferences } from '../services/API.service';

const subscribeToFrogs = ref(false);
const subscribeToRaccoons = ref(false);
const successMessage = ref('');

const route = useRoute();
const email = computed(() => {
    return route.query.email;
});

const savePreferences = async () => {
    const newsletters = [];  
    if (subscribeToFrogs.value) newsletters.push('frogs');
    if (subscribeToRaccoons.value) newsletters.push('raccoons');
    await managePreferences(email.value, newsletters);
    successMessage.value = 'Preferences saved successfully!';
    setTimeout(() => { successMessage.value = ''; }, 2000);
};
</script>