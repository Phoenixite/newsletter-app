<template>
    <div>
        <input type="file" @change="handleFileUpload" accept=".pdf,.png" class="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
    </div>
  </template>
  
  <script setup>
  import { useNewsletterStore } from '../../stores/NewsletterStore';
  
  const templateStore = useNewsletterStore(); // Use the Pinia store
  
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      // Update the file in the Pinia store
      templateStore.setUploadedFile(file);
    }
  }
  </script>