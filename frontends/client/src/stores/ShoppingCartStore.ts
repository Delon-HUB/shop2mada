import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type {
  IArticle,
  IOrder,
  IOrderItem,
  IPayment,
  IPaymentMethod,
} from '@shared/Types/Interfaces'
import { publicAPI } from '@/instances/axios'

export const useShoppingCartStore = defineStore('shoppingCartStore', () => {
  const orderItems = ref<IOrderItem[]>([])
  const paymentMethods = ref<IPaymentMethod[]>([])
  const lastSelectedPaymentMethod = ref<IPaymentMethod | null>(null)

  const init = async () => {
    await getPaymentMethods()
  }

  const purchase = async (
    playerId: string,
    nickname: string,
    contact: string,
    paymentRef: string,
  ) => {
    const order: Partial<IOrder> = {
      orderItems: orderItems.value.map((item) => {
        const article = item.article as IArticle
        return {
          article: article.id,
          quantity: item.quantity,
          unitPrice: article.price,
        }
      }),
      playerId,
      nickname,
      contact,
    }
    const payment: Partial<IPayment> = {
      paymentMethod: lastSelectedPaymentMethod.value?.id,
      paymentRef,
      amount: 0,
    }
    await publicAPI.post('/order', { order: order, payment: payment })
    orderItems.value = []
  }

  const getPaymentMethods = async () => {
    const response = await publicAPI.get('/payment-method')
    paymentMethods.value = response.data as IPaymentMethod[]
  }

  const counter = computed(() => orderItems.value.length)
  const total = computed(() => {
    return orderItems.value.reduce(
      (total, orderItem) => total + (orderItem.article as IArticle).price * orderItem.quantity,
      0,
    )
  })

  const add = (article: IOrderItem) => {
    orderItems.value.push(article)
  }

  const remove = (id: string) => {
    const index = orderItems.value.findIndex((item) => (item.article as IArticle).id == id)
    if (index != -1) {
      orderItems.value.splice(index, 1)
    }
  }

  const clear = () => {
    orderItems.value = []
  }

  const getOne = (id: string) => {
    return orderItems.value.find((item) => (item.article as IArticle).id == id)
  }

  const getTotal = () => {
    return total.value
  }

  return {
    counter,
    paymentMethods,
    lastSelectedPaymentMethod,
    orderItems,
    init,
    getOne,
    add,
    remove,
    clear,
    getTotal,
    purchase,
  }
})
