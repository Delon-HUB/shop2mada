export const AUTH_ROUTER = [
  {
    path: 'login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: 'verify-identity',
    meta: { requireEmail: true },
    component: () => import('../pages/OTP.vue'),
  },
]
