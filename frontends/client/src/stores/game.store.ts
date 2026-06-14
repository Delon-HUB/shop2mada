import { publicAPI } from '@/instances/axios'
import type { IGame } from '@shared/Types/Interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('gameStore', () => {
  let games = ref<IGame[]>([])
  const currentGame = ref<IGame>()

  const init = async () => {
    await getAll()
  }

  const getAll = async () => {
    const response = await publicAPI.get('/game')
    games.value = response.data as IGame[]
  }

  return { games, init, currentGame }
})
