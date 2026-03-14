import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IArticle } from '@shared/Types/Interfaces'

export const useShoppingCartStore = defineStore('shoppingCartStore', () => {
  const articles = ref<IArticle[]>([])

  const counter = computed(() => articles.value.length)

  const add = (article: IArticle) => {
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

  return { counter, getOne, getAll, add, remove, clear }
})
