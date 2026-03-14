import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/pages/Dashboard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          component: Dashboard,
        },
      ],
    },
  ],
})

export default router
