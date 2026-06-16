import axios, { AxiosError } from 'axios'
import { translateError } from '@/utils/errorForHumain'
import { useAuthStore } from '@/stores/Auth.store'
import type { EError } from '@/Types/Enums'

const token = localStorage.getItem('token') || ''
let secureAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

const publicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

publicAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = translateError(
      (error.response?.data as { statusCode: number; message: EError })?.message || error.code,
    )
    const $authStore = useAuthStore()
    $authStore.ERROR_MESSAGE = message
    if (error.status == 401) $authStore.logout()
    return Promise.reject(error)
  },
)

secureAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = translateError(
      (error.response?.data as { statusCode: number; message: EError })?.message || error.code,
    )
    const $authStore = useAuthStore()
    $authStore.ERROR_MESSAGE = message
    if (error.status == 401) $authStore.logout()
    return Promise.reject(error)
  },
)

export { publicAPI, secureAPI }
