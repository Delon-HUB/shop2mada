<template>
  <p>
    <q-btn flat no-caps color="primary" icon="add" label="ajouter un jeux" />
  </p>
  <p v-for="game in games" :key="game.id">
    <Game :game="game" />
  </p>
  <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" icon="add" />
  </q-page-sticky> -->
</template>

<script setup lang="ts">
import Game from '@/components/Game.vue'
import { DATASET } from '@/stores/dataset'
import type { IGame } from '@shared/Types/Interfaces'
import { ref } from 'vue'

const games = ref<IGame[]>(DATASET)
</script>
