<template>
  <q-card flat bordered class="fit" style="border-radius: 12px">
    <q-card-section class="q-pa-none">
      <q-img class="image" :src="game.cover" />
      <p class="text-center text-h6 text-bold">{{ game.name }}</p>
    </q-card-section>
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
  width: 300px;
  height: 150px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
</style>
