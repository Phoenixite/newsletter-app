<template>
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-1">
        <h2 class="text-lg font-semibold mb-2">Send Immediately</h2>
        <p class="text-sm text-gray-600 mb-4">Select this option to send the newsletter immediately.</p>
        <button @click="sendImmediately" class="mt-4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Send Immediately</button>
      </div>
  
      <div class="col-span-1">
        <h2 class="text-lg font-semibold mb-2">Set Schedule</h2>
        <p class="text-sm text-gray-600 mb-4">Select this option to set a schedule time for the newsletter to be sent.</p>
        <input type="datetime-local" v-model="scheduleTime" class="my-4 py-2 px-4 h-10 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full" />
        <button @click="setSchedule" class="bg-green-500 hover:bg-green-700 h-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Set Schedule</button>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import { useNewsletterStore } from '../../stores/NewsletterStore';
import { sendNewsletter, sendScheduledNewsletter } from '../../services/API.service';

const nwesLetterStore = useNewsletterStore(); // Use the Pinia store

const scheduleTime = ref('');

function sendImmediately() {
    sendNewsletter();
}

function setSchedule() {
    nwesLetterStore.setScheduleTime(scheduleTime.value);
    sendScheduledNewsletter();
}


</script>
