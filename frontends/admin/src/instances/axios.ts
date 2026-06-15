import type { EError } from '@shared/Types/Enums'
import axios, { AxiosError } from 'axios'
import { translateError } from '@shared/utils/errorForHumain'
import { useAuthStore } from '@/stores/Auth.store'

const token = localStorage.getItem('token') || ''
let secureAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

const publicAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`,
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
