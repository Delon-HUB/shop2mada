import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IArticle } from '@shared/Types/Interfaces'

export const useShoppingCartStore = defineStore('shoppingCartStore', () => {
  const articles = ref<(IArticle & { quantity: number })[]>([])

  const counter = computed(() => articles.value.length)
  const total = computed(() => {
    return articles.value.reduce((total, article) => total + article.price * article.quantity, 0)
  })

  const add = (article: IArticle & { quantity: number }) => {
    articles.value.push(article)
  }

  const remove = (id: string) => {
    const index = articles.value.findIndex((art) => art.id == id)
    if (index != -1) {
      articles.value.splice(index, 1)
    }
  }

  const clear = () => {
    articles.value = []
  }

  const getAll = () => articles.value

  const getOne = (id: string) => {
    return articles.value.find((art) => art.id == id)
  }

  const getTotal = () => {
    return total.value
  }

  return { counter, getOne, getAll, add, remove, clear, getTotal }
})
