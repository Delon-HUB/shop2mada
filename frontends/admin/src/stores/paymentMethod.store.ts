import { secureAPI } from '@/instances/axios'
import type { IPaymentMethod } from '@/Types/Interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentMethodStore = defineStore('paymentMethodStore', () => {
  const paymentMethods = ref<IPaymentMethod[]>([])

  const init = async () => {
    await getAll()
  }

  const getAll = async () => {
    const response = await secureAPI.get(`/payment-method?activate=false`)
    paymentMethods.value = response.data as IPaymentMethod[]
  }

  const findById = (id: string): IPaymentMethod | undefined => {
    return paymentMethods.value.find((pm) => pm._id == id)
  }

  const update = async (id: string, updateData: Partial<IPaymentMethod>) => {
    const response = await secureAPI.put(`/payment-method/${id}`, updateData)
    const pmUpdated = response.data as IPaymentMethod
    const index = paymentMethods.value.findIndex((pm) => pm._id == pmUpdated._id)
    paymentMethods.value.splice(index, 1, pmUpdated)
  }

  return { paymentMethods, init, findById, update }
})
