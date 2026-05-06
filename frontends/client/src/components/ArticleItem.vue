<template>
  <q-card flat bordered class="article q-ma-none q-pa-none">
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
        <q-btn
          outline
          rounded
          no-caps
          :color="canAddToCart ? 'blue' : 'grey'"
          @click="$shoppingCartStore.add(props.article)"
          :disable="!canAddToCart"
          :label="canAddToCart ? 'Ajouter' : 'Ajouté'"
        />
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import { type IArticle } from '@shared/Types/Interfaces'
import { computed } from 'vue'

const props = defineProps<{
  article: IArticle
}>()

const $shoppingCartStore = useShoppingCartStore()

const canAddToCart = computed(() => $shoppingCartStore.getOne(props.article.id) == undefined)
</script>

<style scoped lang="css">
.article {
  width: 300px;
}

@media (max-width: 1000px) {
  .article {
    width: 150px;
  }
}
</style>
