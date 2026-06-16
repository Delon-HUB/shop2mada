import { publicAPI, secureAPI } from '@/instances/axios'
import type { IGame } from '@/Types/Interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('gameStore', () => {
  let games = ref<IGame[]>([])

  const init = async () => {
    await getAll()
  }

  const getAll = async () => {
    const response = await publicAPI.get('/game')
    games.value = response.data as IGame[]
  }

  const addGame = async (newGame: Partial<IGame>) => {
    const response = await secureAPI.post('/game', newGame)
    response.data && games.value.push(response.data as IGame)
  }

  const update = async (id: string, updateData: Partial<IGame>) => {
    const response = await secureAPI.put(`/game/${id}`, updateData)
    const updatedGame = response.data as IGame
    return updatedGame
  }

  const deleteFn = async (id: string) => {
    const response = await secureAPI.delete(`/game/${id}`)
    const deletedObj = response.data as IGame
    games.value = games.value.filter((g) => g._id != deletedObj._id)
    return deletedObj
  }

  return { games, init, addGame, update, deleteFn }
})
