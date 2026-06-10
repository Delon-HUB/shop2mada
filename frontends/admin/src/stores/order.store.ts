import { publicAPI } from '@/instances/axios'
import type { IOrder, IPayment } from '@shared/Types/Interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePaymentMethodStore } from './paymentMethod.store'
import type { EPaymentStatus } from '@shared/Types/Enums'

export const useOrderStore = defineStore('orderStore', () => {
  let orders = ref<IOrder[]>([])
  const $paymentMethodStore = usePaymentMethodStore()

  const init = async () => {
    await getAll()
    orders.value = orders.value.map((order) => {
      const pm = $paymentMethodStore.findById((order.payment as IPayment).paymentMethod as string)
      ;(order.payment as IPayment).paymentMethod = pm
        ? pm
        : (order.payment as IPayment).paymentMethod
      return order
    })
  }

  const getAll = async () => {
    const response = await publicAPI.get('/order')
    orders.value = response.data as IOrder[]
  }

  const updatedPaymentStatus = async (
    id: string,
    updateData: Partial<IPayment>,
  ): Promise<IPayment> => {
    const response = await publicAPI.put(`/payment/${id}`, updateData)
    const pUpdated = response.data as IPayment
    return pUpdated
  }

  const updatedDeliveryStatus = async (
    id: string,
    updateData: Partial<IOrder>,
  ): Promise<IOrder> => {
    const response = await publicAPI.put(`/order/${id}`, updateData)
    const pUpdated = response.data as IOrder
    return pUpdated
  }

  return { orders, init, updatedPaymentStatus, updatedDeliveryStatus }
})
