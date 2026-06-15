import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { HOME_ROUTER } from './home'
import { AUTH_ROUTER } from './auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      redirect: '/auth/login',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [...AUTH_ROUTER],
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [...HOME_ROUTER],
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../pages/NotFound.vue'),
    },
  ],
})

export default router
