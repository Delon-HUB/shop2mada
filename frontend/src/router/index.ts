import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Offers from '@/pages/Offers.vue'
import Games from '@/pages/Games.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/games',
      children: [
        {
          path: '/games',
          component: Games,
        },
        {
          path: '/offers',
          component: () => import('@/pages/Offers.vue'),
        },
      ],
    },
  ],
})

export default router
