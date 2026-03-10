<template>
  <q-card flat bordered class="fit">
    <q-card-section class="q-pa-none">
      <q-img class="image" :src="game.image" />
      <p class="text-center text-h6 text-bold">{{ game.name }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  game: {
    id: string
    name: string
    image: string
  }
}>()
</script>
