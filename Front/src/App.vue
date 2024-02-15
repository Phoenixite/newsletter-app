<template>
  <div class="flex flex-col items-center h-screen">
    <div v-if="!isMyPreferencesRoute" class="flex space-x-4 my-4">
      <router-link to="/email-list" class="text-blue-500 hover:text-blue-700 font-semibold">Mailing List</router-link>
      <router-link to="/" class="text-blue-500 hover:text-blue-700 font-semibold">Newsletter</router-link>
      <router-link to="/dashboard" class="text-blue-500 hover:text-blue-700 font-semibold">Dashboard</router-link>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isMyPreferencesRoute = computed(() => {
  return route.path === '/my-preferences';
});
</script>