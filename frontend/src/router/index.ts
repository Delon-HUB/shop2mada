import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Games from '@/pages/Games.vue'
import Offers from '@/pages/Offers.vue'

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
          component: () => Games,
        },
        {
          path: '/offers',
          component: () => Offers,
        },
      ],
    },
  ],
})

export default router
