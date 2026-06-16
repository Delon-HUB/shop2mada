<template>
  <q-dialog persistent v-model="model">
    <q-card class="card">
      <slot header> </slot>
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
import type { IArticle } from '@/Types/Interfaces'
import { ref, watch } from 'vue'

const emits = defineEmits(['finished'])
const model = defineModel<boolean>()

const props = defineProps<{
  article?: IArticle
}>()

const article = ref<Partial<IArticle>>({
  name: props.article?.name || '',
  price: props.article?.price || 0,
  badge: props.article?.badge || '',
  description: props.article?.description || '',
  ...props.article,
})

watch(
  () => props.article,
  (newVal) =>
    (article.value = {
      name: newVal?.name || '',
      price: newVal?.price || 0,
      badge: newVal?.badge || '',
      description: newVal?.description || '',
      ...newVal,
    }),
)

const handleFinish = () => {
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
