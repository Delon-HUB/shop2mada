<template>
  <q-dialog persistent backdrop-filter="blur(4px)" v-model="model">
    <q-card class="card">
      <slot header></slot>
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

      <q-card-actions class="flex row justify-between q-pa-md">
        <q-btn style="width: 45%" v-close-popup outline no-caps label="Annuler" />
        <q-btn
          style="width: 45%"
          outline
          color="primary"
          no-caps
          label="Enregistrer"
          @click="handleSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ECategory } from '@/Types/Enums'
import type { IGame } from '@/Types/Interfaces'
import { computed, ref, watch } from 'vue'

const emits = defineEmits(['finished'])
const model = defineModel<boolean>()
const options = ref(Object.keys(ECategory))

const props = defineProps<{ game?: IGame }>()
const game = ref<Partial<IGame>>({
  ...props.game,
})
const cover = computed(() => game.value?.cover)

watch(
  () => props.game,
  (newVal) => (game.value = { ...newVal }),
)
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
