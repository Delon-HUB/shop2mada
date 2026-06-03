<template>
  <p>
    <q-btn
      outline
      no-caps
      color="primary"
      icon="add"
      label="nouveau jeu"
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
import { useGameStore } from '@/stores/game.store'
import type { IGame } from '@shared/Types/Interfaces'
import { computed, ref } from 'vue'

const $gameStore = useGameStore()
$gameStore.init()
const games = computed(() => $gameStore.games || [])

const showGameInput = ref(false)

const handleAddGame = async (newGame: Partial<IGame>) => {
  await $gameStore.addGame(newGame)
}
</script>
