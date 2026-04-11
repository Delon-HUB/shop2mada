<template>
  <q-card flat bordered class="article q-ma-md">
    <q-card-section class="q-pa-none q-ma-none">
      <p class="text-right">
        <q-chip class="q-ma-none" dense text-color="white" color="red" square> HOT</q-chip>
      </p>
    </q-card-section>
    <q-card-section
      class="q-pa-none q-ma-none"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <p class="text-center text-overline text-blue">1000 diamonds</p>
      <p class="text-center text-h6 text-bold">9.99 $</p>
    </q-card-section>
    <q-card-actions class="justify-center">
      <q-btn outline rounded no-caps icon="edit" color="primary" label="modifier" />
      <q-btn outline rounded no-caps icon="delete" color="negative" label="supprimer" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
// import { type IArticle } from '@shared/Types/Interfaces'

// const props = defineProps<{
//   article: IArticle
// }>()
</script>

<style scoped lang="css">
.article {
  width: 300px;
  max-width: 350px;
}
</style>
