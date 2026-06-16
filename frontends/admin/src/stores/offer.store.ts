import { secureAPI } from '@/instances/axios'
import type { IOffer } from '@/Types/Interfaces'
import { defineStore } from 'pinia'
import { useGameStore } from './game.store'

export const useOfferStore = defineStore('offerStore', () => {
  const $gameStore = useGameStore()

  const addOffer = async (newOffer: Partial<IOffer>) => {
    const response = await secureAPI.post('/offer', newOffer)
    if (response.data) {
      $gameStore.games.find((g) => g._id === newOffer.gameId)?.offers?.push(response.data as IOffer)
    }
  }
  const update = async (id: string, updateData: Partial<IOffer>) => {
    const response = await secureAPI.put(`/offer/${id}`, updateData)
    const updatedOffer = response.data as IOffer
    return updatedOffer
  }

  const deleteFn = async (id: string) => {
    const response = await secureAPI.delete(`/offer/${id}`)
    const deletedObj = response.data as IOffer
    const game = $gameStore.games.find((g) => g._id == deletedObj.gameId)
    if (game) {
      const restOffers = game.offers.filter((o) => o._id != deletedObj._id)
      game.offers = restOffers
    }
    return deletedObj
  }
  return { addOffer, update, deleteFn }
})
