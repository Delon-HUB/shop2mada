<template>
  <q-card flat bordered class="q-pa-xs">
    <q-badge
      color="red-8"
      v-if="props.article.badge"
      floating
      class="text-bold"
      style="height: 2.5em; border-bottom-left-radius: 12px; border-top-right-radius: 12px"
    >
      {{ props.article.badge }}</q-badge
    >

    <q-card-section
      class="q-pa-none q-ma-none q-mt-md"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <p class="text-center q-ma-none text-bold">{{ props.article.name }}</p>
      <p class="text-center text-overline text-bold text-primary">
        + {{ Math.floor(Math.random() * 100) }} diamonds bonus
      </p>

      <p class="text-center">{{ props.article.price }} Ar</p>
    </q-card-section>

    <q-separator />

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
