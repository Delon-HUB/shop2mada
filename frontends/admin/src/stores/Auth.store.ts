import { publicAPI, secureAPI } from '@/instances/axios'
import router from '@/router'
import type { IUser } from '@shared/Types/Interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const ERROR_MESSAGE = ref<string>('')
  let email = ref<string>(localStorage.getItem('email') || '')
  let token = ref<string>(localStorage.getItem('token') || '')

  const login = async (userCredential: Partial<IUser>) => {
    return await publicAPI.post('/auth/login', userCredential)
  }

  const setToken = (_token: string) => {
    localStorage.setItem('token', _token)
    token.value = _token
    secureAPI.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`
  }

  const verifyOTP = async (email: string, otp: string) => {
    return await publicAPI.post('auth/verify-otp', { email, otp })
  }

  const resendOTP = async (email: string) => {
    return await publicAPI.post('auth/send-otp', { email })
  }

  const setEmail = (_email: string) => {
    localStorage.setItem('email', _email)
    email.value = _email
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    token.value = ''
    email.value = ''
    secureAPI.defaults.headers['Authorization'] = ''
    router.push('/auth/login')
  }

  return {
    email,
    token,
    ERROR_MESSAGE,
    logout,
    setEmail,
    setToken,
    login,
    verifyOTP,
    resendOTP,
  }
})
