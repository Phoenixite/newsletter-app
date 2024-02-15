import { defineStore } from 'pinia';

export const useNewsletterStore = defineStore('template', {
  state: () => ({
    selectedIndex: -1,
    uploadedFile: null,
    scheduleTime: null,
  }),
  actions: {
    setSelectedIndex(index) {
      this.selectedIndex = index;
    },
    setUploadedFile(file) {
      this.uploadedFile = file;
    },
    setScheduleTime(time) {
      this.scheduleTime = time;
    },
  },
});