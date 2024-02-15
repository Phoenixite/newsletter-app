<template>
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Mailing List Recipients</h2>
      <ul>
        <li v-for="(recipient, index) in recipients" :key="index" class="border-b border-gray-200 py-4">
          <div class="mb-2">Email: {{ recipient.email }}</div>
          <div class="flex items-center">
            <span class="mr-2">Subscribed to Frogs:</span>
            <span class="text-green-500" v-if="recipient.newsletters.includes('frogs')">Yes</span>
            <span class="text-red-500" v-else>No</span>
          </div>
          <div class="flex items-center">
            <span class="mr-2">Subscribed to Raccoons:</span>
            <span class="text-green-500" v-if="recipient.newsletters.includes('raccoons')">Yes</span>
            <span class="text-red-500" v-else>No</span>
          </div>
        </li>
      </ul>
      
      <form @submit.prevent="addRecipients" class="mt-4">
        <div class="flex items-center mb-4">
          <label class="mr-2">Add multiple people:</label>
          <input type="checkbox" v-model="multipleInput" class="mr-4">
          <label v-if="multipleInput">Yes</label>
          <label v-else>No</label>
        </div>
        <template v-if="multipleInput">
          <textarea v-model="newRecipients" class="border text-black border-gray-300 px-4 py-2 rounded-md mb-4" placeholder="Enter emails (separated by comma)" required></textarea>
        </template>
        <template v-else>
          <input type="email" v-model="newRecipient" class="border text-black border-gray-300 px-4 py-2 rounded-md mb-4" placeholder="Email" required>
        </template>
        <div class="flex items-center mb-4">
          <label class="mr-2">Subscribe to Frogs:</label>
          <input type="checkbox" v-model="subscribeToFrogs" class="mr-4">
          <label class="mr-2">Subscribe to Raccoons:</label>
          <input type="checkbox" v-model="subscribeToRaccoons" class="mr-4">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Recipients</button>
      </form>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { signup, signupBatch, fetchSubscribers } from '../../services/API.service';


const recipients = ref([]);

const newRecipient = ref('');
const newRecipients = ref('');
const subscribeToFrogs = ref(false);
const subscribeToRaccoons = ref(false);
const multipleInput = ref(false);

const addRecipients = async () => {
    if (multipleInput.value && newRecipients.value.trim() === '') return;
    if (!multipleInput.value && newRecipient.value.trim() === '') return;

    const emails = multipleInput.value ? newRecipients.value.split(',').map(email => email.trim()) : [newRecipient.value];
    const newsletters = [];
    if (subscribeToFrogs.value) newsletters.push('frogs');
    if (subscribeToRaccoons.value) newsletters.push('raccoons');

    
    if (emails.length === 1) {
        await signup(emails[0], newsletters);
    } else {
        await signupBatch(emails, newsletters);
    }
    
    const data = await fetchSubscribers();
    recipients.value = data;

    newRecipient.value = '';
    newRecipients.value = '';
    subscribeToFrogs.value = false;
    subscribeToRaccoons.value = false;
};



onMounted(async () => {
    const data = await fetchSubscribers();
    recipients.value = data;
});
</script>