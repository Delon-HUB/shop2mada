<template>
  <q-card flat bordered class="card q-pa-none fit">
    <q-card-section class="q-pa-none">
      <q-img class="image" :src="game.cover" :ratio="16 / 9" />
    </q-card-section>
    <q-card-section class="text-center text-caption">{{ game.name }}</q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { type IGame } from '@shared/Types/Interfaces'
const props = defineProps<{
  game: IGame
}>()
</script>

<style scoped lang="css">
.image {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-size: cover !important;
  background-position: center top !important;
  width: 100%;
}

.card {
  min-width: 12em;
  max-width: 12em;
  border-radius: 8px;
}
</style>
