import Dashboard from '@/pages/Dashboard.vue'

export const HOME_ROUTER = [
  {
    path: 'client',
    name: 'client',
    redirect: '/client/home',
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
]
