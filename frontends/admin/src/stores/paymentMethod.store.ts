import { publicAPI } from '@/instances/axios'
import type { IPaymentMethod } from '@shared/Types/Interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentMethodStore = defineStore('paymentMethodStore', () => {
  const paymentMethods = ref<IPaymentMethod[]>([])

  const init = async () => {
    await getAll()
  }

  const getAll = async () => {
    const response = await publicAPI.get('/payment-method')
    paymentMethods.value = response.data as IPaymentMethod[]
  }

  const findById = (id: string): IPaymentMethod | undefined => {
    return paymentMethods.value.find((pm) => pm.id == id)
  }

  return { paymentMethods, init, findById }
})
