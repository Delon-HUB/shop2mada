<template>
  <q-card flat class="fit">
    <p class="text-h5 text-bold text-center">Jeux disponibles</p>
    <div class="gamelist">
      <div v-for="game in games" :key="game.id" class="q-ma-md">
        <q-btn flat no-caps class="q-pa-none game" :to="`/offers?game_id=${game.id}`">
          <game :game="game" />
        </q-btn>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import Game from '@/components/Game.vue'
import type { IGame } from '@shared/Types/Interfaces'
import { ref } from 'vue'
import { DATASET } from '@/stores/dataset'

const games = ref<IGame[]>(DATASET)
</script>

<style scoped lang="css">
.gamelist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.game {
  width: 300px;
  max-width: 350px;
}

.image {
  background-size: cover !important;
  background-position: center top !important;
  max-height: 150px;
}
</style>
