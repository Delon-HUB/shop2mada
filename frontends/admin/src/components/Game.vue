<template>
  <q-card flat bordered class="card q-pa-none fit">
    <q-card-section class="q-pa-none">
      <q-img class="image" :src="game.cover" />
      <p class="text-center text-h6 text-bold">{{ game.name }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { type IGame } from '@shared/Types/Interfaces/IGame'
const props = defineProps<{
  game: IGame
}>()
</script>

<style scoped lang="css">
.image {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-size: cover !important;
  background-position: center top !important;
  width: 248px;
  height: 150px;
}

.card {
  max-width: 250px;
  border-radius: 12px;
}

@media (max-width: 1000px) {
  .image {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-size: cover !important;
    background-position: center top !important;
    width: 158px;
    height: 100px;
  }

  .card {
    max-width: 160px;
    border-radius: 12px;
  }
}
</style>
