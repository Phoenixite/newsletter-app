<template>
  <div class="flex space-x-4">
    <template v-for="(template, index) in templates" :key="index">
      <button
        @click="selectTemplate(index)"
        :class="{ 'bg-blue-500 text-white': selectedIndex === index, 'bg-gray-200 text-gray-800': selectedIndex !== index }"
        class="px-6 py-3 rounded-lg focus:outline-none focus:shadow-outline"
      >
        <div>
          <div class="font-semibold">{{ template.subject }}</div>
          <div class="text-sm text-gray-600">{{ template.channel }}</div>
          <div class="text-sm text-gray-600">{{ template.template }}</div>
        </div>
      </button>
    </template>
  </div>
</template>
  
<script setup>
import { useNewsletterStore } from '../../stores/NewsletterStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchNewsletters } from '../../services/API.service';

const templateStore = useNewsletterStore();
const { selectedIndex } = storeToRefs(templateStore);

const templates = ref([]);

function selectTemplate(index) {
  templateStore.setSelectedIndex(index);
}

onMounted(async () => {
  const response = await fetchNewsletters();
  templates.value = response.templates;
});

</script>