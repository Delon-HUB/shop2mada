import axios from 'axios'

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
export { publicAPI, secureAPI }
