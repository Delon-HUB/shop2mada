<template>
  <q-dialog persistent backdrop-filter="blur(4px)" v-model="model">
    <q-card class="card">
      <p class="text-center text-h6 q-mt-xs">
        Ajouter une offre pour <span class="text-bold">{{ props.game.name }}</span>
      </p>
      <q-separator inset />
      <q-card-section>
        <q-input
          outlined
          v-model="offer.name"
          label="Nom de l'offre"
          placeholder="ex: Top UP"
          class="q-mb-md"
        />
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
import type { IGame, IOffer } from '@shared/Types/Interfaces'
import { ref } from 'vue'

const model = defineModel<boolean>()
const emits = defineEmits(['finished'])
const props = defineProps<{
  game: IGame
}>()

const offer = ref<Partial<IOffer>>({
  name: '',
})

const handleSave = () => {
  emits('finished', {
    ...offer.value,
    gameId: props.game._id,
  } as Partial<IOffer>)
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
