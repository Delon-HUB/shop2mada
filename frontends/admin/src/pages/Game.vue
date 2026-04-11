<template>
  <p v-for="game in games" :key="game.id">
    <Game :game="game" />
  </p>
</template>

<script setup lang="ts">
import Game from '@/components/Game.vue'
import { DATASET } from '@/stores/dataset'
import type { IGame } from '@shared/Types/Interfaces'
import { ref } from 'vue'

const games = ref<IGame[]>(DATASET)
</script>
