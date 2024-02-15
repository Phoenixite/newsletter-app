import axios from 'axios';

import { useNewsletterStore } from '../stores/NewsletterStore';

const API_BASE_URL = 'http://localhost:3000';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const fetchNewsletters = async () => {
  try {
    const response = await apiService.get('/newsletters');
    return response.data;
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    throw error;
  }
};

export const sendNewsletter = async () => {
  try {
    const newsLetterStore = useNewsletterStore();
    const { selectedIndex:newsletterIndex } = newsLetterStore;
    await deleteAttachments();
    await uploadAttachment();

    const response = await apiService.post('/newsletters/send', { newsletterIndex });
    return response.data;
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
};

export const sendScheduledNewsletter = async () => {
  try {
    const newsLetterStore = useNewsletterStore();
    const { selectedIndex:newsletterIndex, scheduleTime } = newsLetterStore;

    // eslint-disable-next-line no-unused-vars
    const [date, time] = scheduleTime.value.split('T');
    const [hour, minute] = time.split(':');
    
    const response = await apiService.post('/newsletters/send-scheduled', { hour, minute, newsletterIndex });
    return response.data;
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
};

export const uploadAttachment = async () => {
  try {
    const newsLetterStore = useNewsletterStore();
    const { uploadedFile } = newsLetterStore;

    let data = new FormData();
    data.append('newsletter', uploadedFile);

    const response = await apiService.post('/newsletters/upload', data);
    return response.data;
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
};

export const deleteAttachments = async () => {
  try {
    const response = await apiService.delete('/newsletters/attachments');
    return response.data;
  } catch (error) {
    console.error('Error deleting attachments:', error);
    throw error;
  }
}

export const fetchSubscribers = async () => {
  try {
    const response = await apiService.get('/email-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw error;
  }
};

export const signup = async (email, newsletters) => {
  try {
    const response = await apiService.post('/email-list', { email, newsletters });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signupBatch = async (emails, newsletters) => {
  try {
    const response = await apiService.post('/email-list/batch', { emails, newsletters });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export const managePreferences = async (email, newsletters) => {
  try {
    const response = await apiService.post('/email-list/manage-preferences', { email, newsletters });
    return response.data;
  } catch (error) {
    console.error('Error managing preferences:', error);
    throw error;
  }
};

export const getMetrics = async () => {
  try {
    const response = await apiService.get('/metrics');
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

export default {
  fetchNewsletters,
  deleteAttachments,
  uploadAttachment,
  sendNewsletter,
  sendScheduledNewsletter,
  fetchSubscribers,
  signup,
  signupBatch,
  managePreferences,
  getMetrics,
};
