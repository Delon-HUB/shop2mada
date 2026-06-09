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
        {
          path: '/games',
          component: () => import('@/pages/Game.vue'),
        },
        {
          path: '/orders',
          component: () => import('@/pages/Order.vue'),
        },
        {
          path: '/settings',
          redirect: 'payment-method',
          children: [
            {
              path: '/payment-method',
              component: () => import('@/pages/PaymentMethod.vue'),
            },
            {
              path: '/contact',
              component: () => import('@/pages/Contact.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
