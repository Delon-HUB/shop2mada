<template>
  <q-dialog persistent backdrop-filter="blur(4px)" v-model="model">
    <q-card class="card">
      <p class="text-center text-h6 q-mt-xs">
        Nouveau article pour l'offre <span class="text-bold">{{ props.offer.name }}</span>
      </p>
      <q-separator inset />
      <q-card-section>
        <q-input outlined v-model="article.name" label="Nom" class="q-mb-md" />
        <q-input outlined v-model="article.price" label="Prix(Ariary)" class="q-mb-md" />
        <q-input
          outlined
          v-model="article.badge"
          label="Badge"
          placeholder="ex: Hot"
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
import type { IArticle, IOffer } from '@shared/Types/Interfaces'
import { ref } from 'vue'

const emits = defineEmits(['finished'])
const model = defineModel<boolean>()

const props = defineProps<{
  offer: IOffer
}>()
const article = ref<Partial<IArticle>>({
  offerId: props.offer._id,
  name: '',
  price: 0,
  badge: '',
  description: '',
})

const handleSave = () => {
  emits('finished', article.value)
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
