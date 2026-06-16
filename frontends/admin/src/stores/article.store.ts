import { secureAPI } from '@/instances/axios'
import type { IArticle } from '@/Types/Interfaces'
import { defineStore } from 'pinia'
import { useGameStore } from './game.store'

export const useArticleStore = defineStore('articleStore', () => {
  const $gameStore = useGameStore()

  const addArticle = async (newArticle: Partial<IArticle>) => {
    const response = await secureAPI.post('/article', newArticle)
    if (response.data) {
      $gameStore.games = $gameStore.games.map((g) => {
        const offer = g.offers.find((o) => o._id === newArticle.offerId)
        if (offer) {
          offer.articles.push(response.data as IArticle)
        }
        return g
      })
    }
  }

  const update = async (id: string, updateData: Partial<IArticle>) => {
    const response = await secureAPI.put(`/article/${id}`, updateData)
    const updatedArticle = response.data as IArticle
    return updatedArticle
  }

  const deleteFn = async (id: string) => {
    const response = await secureAPI.delete(`/article/${id}`)
    const deletedObj = response.data as IArticle

    for (let i = 0; i < $gameStore.games.length; i++) {
      const offer = $gameStore.games[i]!.offers.find((o) => o._id == deletedObj.offerId)
      if (offer) {
        offer.articles = offer?.articles.filter((a) => a._id != deletedObj._id)
        break
      }
    }

    return deletedObj
  }

  return { addArticle, update, deleteFn }
})
