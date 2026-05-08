<template>
  <q-dialog persistent backdrop-filter="blur(4px)" v-model="model">
    <q-card class="card">
      <p class="text-center text-h6 q-mt-xs">Ajouter un jeux</p>
      <q-separator inset />
      <q-card-section>
        <q-input outlined v-model="game.name" label="Nom" class="q-mb-md" />
        <q-select
          outlined
          multiple
          v-model="game.categories"
          :options="options"
          label="Catégorie"
          class="q-mb-md"
        />
        <q-input outlined v-model="game.cover" label="Image de couverture" class="q-mb-md" />
        <q-input outlined v-model="game.description" label="Description" class="q-mb-md" />
        <q-img v-if="cover" :src="cover" class="q-mb-md" />
      </q-card-section>

      <q-separator inset />

      <q-card-actions align="right">
        <q-btn flat color="primary" no-caps label="Enregistrer" @click="handleSave" />
        <q-btn v-close-popup flat color="negative" no-caps round label="Annuler" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { IGame } from '@shared/Types/Interfaces'
import { computed, ref } from 'vue'

const emits = defineEmits(['finished'])
const model = defineModel<boolean>()
const options = ref(['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'])

const game = ref<Partial<IGame>>({
  name: '',
  description: '',
  cover: '',
  categories: [],
})
const cover = computed(() => game.value.cover)

const handleSave = () => {
  emits('finished', game.value)
  model.value = false
}
</script>

<style scoped lang="css">
.card {
  min-width: 400px;
}

@media (max-width: 1000px) {
  .card {
    width: 100%;
  }
}
</style>
