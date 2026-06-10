import { publicAPI } from '@/instances/axios'
import type { IArticle, IOffer } from '@shared/Types/Interfaces'
import { defineStore } from 'pinia'
import { useGameStore } from './game.store'

export const useArticleStore = defineStore('articleStore', () => {
  const gameStore = useGameStore()

  const addArticle = async (newArticle: Partial<IArticle>) => {
    const response = await publicAPI.post('/article', newArticle)
    if (response.data) {
      gameStore.games = gameStore.games.map((g) => {
        const offer = g.offers.find((o) => o._id === newArticle.offerId)
        if (offer) {
          offer.articles.push(response.data as IArticle)
        }
        return g
      })
    }
  }

  return { addArticle }
})
