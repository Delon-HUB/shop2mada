<template>
  <p>
    <q-btn
      flat
      no-caps
      color="primary"
      icon="add"
      label="ajouter un jeux"
      @click="() => (showGameInput = !showGameInput)"
    />
  </p>
  <p v-for="game in games" :key="game.id">
    <Game :game="game" />
  </p>

  <GameInputDialog v-model="showGameInput" @finished="handleAddGame" />
</template>

<script setup lang="ts">
import Game from '@/components/Game.vue'
import GameInputDialog from '@/components/GameInputDialog.vue'
import { DATASET } from '@/stores/dataset'
import { useGameStore } from '@/stores/game.store'
import type { IGame } from '@shared/Types/Interfaces'
import { ref } from 'vue'

const $gameStore = useGameStore()
$gameStore.init()
const games = ref<IGame[]>(DATASET)

const showGameInput = ref(false)

const handleAddGame = async (newGame: Partial<IGame>) => {
  console.log(newGame)
  await $gameStore.addGame(newGame)
}
</script>
