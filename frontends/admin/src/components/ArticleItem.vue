<template>
  <q-card flat bordered class="q-ma-md">
    <q-card-section class="q-pa-none q-ma-none article">
      <p class="text-right"  v-if="props.article.badge">
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
      <p class="text-center text-h6 text-bold">{{ props.article.price }} $</p>
    </q-card-section>

    <q-separator inset />

    <q-card-actions align="right" class="q-pa-none">
      <q-btn outline flat no-caps icon="edit" color="grey" />
      <q-btn outline flat no-caps icon="delete" color="negative" />
    </q-card-actions>
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
  width: 250px;
  max-width: 250px;
}
</style>
