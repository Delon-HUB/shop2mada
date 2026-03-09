export const HOME_ROUTER = [
  {
    path: 'client',
    name: 'client',
    redirect: '/client/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/client/Home.vue'),
      },
      {
        path: 'tickets',
        name: 'tickets',
        component: () => import('@/pages/client/Ticket.vue'),
      },
      {
        path: 'notifications',
        component: () => import('@/pages/Notification.vue'),
      },
    ],
  },
  {
    path: 'organizer',
    name: 'organizer',
    redirect: '/organizer/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/organizer/Dashboard.vue'),
      },
      {
        path: 'event',
        name: 'event',
        component: () => import('@/pages/organizer/Event.vue'),
      },
      {
        path: 'notifications',
        component: () => import('@/pages/Notification.vue'),
      },
    ],
  },
]
