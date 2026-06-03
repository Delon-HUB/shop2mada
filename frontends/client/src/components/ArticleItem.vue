<template>
  <q-card flat bordered class="q-pa-none">
    <q-badge
      color="red-8"
      v-if="props.article.badge"
      floating
      class="text-bold"
      style="height: 2.5em; border-bottom-left-radius: 12px; border-top-right-radius: 12px;"
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
    <q-card-actions align="center">
      <q-btn
        class="text-bold"
        style="width: 50%"
        outline
        no-caps
        :color="canAddToCart ? 'primary' : 'grey'"
        @click="$shoppingCartStore.add({ ...props.article, quantity: 1 })"
        :disable="!canAddToCart"
        :label="canAddToCart ? 'Ajouter' : 'Ajouté'"
      />
    </q-card-actions>
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
