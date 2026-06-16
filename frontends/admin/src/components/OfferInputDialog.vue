<template>
  <q-dialog persistent backdrop-filter="blur(4px)" v-model="model">
    <q-card class="card">
      <slot header></slot>
      <q-card-section>
        <q-input
          outlined
          v-model="offer.name"
          label="Nom de l'offre"
          placeholder="ex: TOP UP"
          class="q-mb-md"
        />
      </q-card-section>

      <q-card-actions class="flex row justify-between q-pa-md">
        <q-btn style="width: 45%" v-close-popup outline no-caps label="Annuler" />
        <q-btn
          style="width: 45%"
          outline
          color="primary"
          no-caps
          label="Enregistrer"
          @click="handleFinish"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { IOffer } from '@/Types/Interfaces'
import { ref, watch } from 'vue'

const model = defineModel<boolean>()
const emits = defineEmits(['finished'])
const props = defineProps<{
  offer?: IOffer
}>()

const offer = ref<Partial<IOffer>>({
  name: props.offer?.name || '',
})

watch(
  () => props.offer,
  (newValue) => (offer.value = { ...newValue }),
)

const handleFinish = () => {
  emits('finished', {
    ...offer.value,
    name: offer.value.name?.trim(),
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
