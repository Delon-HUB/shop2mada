<template>
  <q-card flat class="fit q-pa-md">
    <p class="text-h6 text-bold text-grey q-ml-md q-mt-md">Jeux disponibles</p>
    <div class="gamelist">
      <q-item
        v-for="game in games"
        :key="game.id"
        flat
        no-caps
        class="q-pa-none"
        :to="`/offers?game_id=${game.id}`"
      >
        <game :game="game" />
      </q-item>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import Game from '@/components/Game.vue'
import { useGameStore } from '@/stores/game.store'
import type { IGame } from '@shared/Types/Interfaces'
import { computed } from 'vue'

const $gameStore = useGameStore()
const games = computed<IGame[]>(() => $gameStore.games)
</script>

<style scoped lang="css">
.gamelist {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  align-content: space-between;
  gap: 20px;
}

@media (max-width: 1000px) {
  .gamelist {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
