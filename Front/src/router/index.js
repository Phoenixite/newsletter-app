import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import MailListView from '../views/MailListView.vue'
import PreferencesView from '../views/PreferencesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/email-list',
      name: 'Mailing List',
      component: MailListView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/my-preferences',
      name: 'preferences',
      component: PreferencesView
    },
  ]
})

export default router
