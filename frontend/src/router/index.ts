import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/Main.layout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [],
    },
  ],
})

export default router
