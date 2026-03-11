<template>
  <q-card flat bordered class="article q-ma-md">
    <q-card-section class="q-pa-none q-ma-none">
      <p class="text-right">
        <q-chip class="q-ma-none" dense text-color="white" color="red" square>
          {{ props.article.badge }}</q-chip
        >
      </p>
    </q-card-section>
    <q-card-section
      class="q-pa-none q-ma-none"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <p class="text-center text-overline text-blue">{{ props.article.name }}</p>
      <p class="text-center text-h6 text-bold">{{ props.article.price }}$</p>
      <p>
        <q-btn outline rounded no-caps color="blue" style="width: 200px">Ajouter</q-btn>
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { type IArticle } from '@shared/Types/Interfaces'

const props = defineProps<{
  article: IArticle
}>()
</script>

<style scoped lang="css">
.article {
  width: 300px;
  max-width: 350px;
  /* background-color: #ecf8f8; */
}
</style>
