import { publicAPI } from '@/instances/axios'
import type { IOffer } from '@shared/Types/Interfaces'
import { defineStore } from 'pinia'
import { useGameStore } from './game.store'

export const useOfferStore = defineStore('offerStore', () => {
  const gameStore = useGameStore()

  const addOffer = async (newOffer: Partial<IOffer>) => {
    const response = await publicAPI.post('/offer', newOffer)
    if (response.data) {
      gameStore.games.find((g) => g._id === newOffer.gameId)?.offers?.push(response.data as IOffer)
    }
  }

  return { addOffer }
})
