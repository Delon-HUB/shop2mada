<template>
  <q-card flat class="q-pa-none q-ma-none">
    <p
      class="flex row wrap items-stretch justify-center bg-grey-1 q-pa-xs text-bold"
      style="border-top-left-radius: 4px; border-top-right-radius: 4px"
    >
      <q-btn
        icon="sell"
        v-for="offer in offers"
        :key="offer.id"
        no-caps
        flat
        rounded
        :label="offer.name"
        class="text-overline q-mr-xs q-mb-xs text-white"
        :style="
          tab == offer.name
            ? { backgroundColor: 'blue', color: 'white' }
            : { backgroundColor: 'gray', color: 'black' }
        "
        @click="() => (tab = offer.name)"
      />
    </p>

    <q-tab-panels v-model="tab" animated class="q-pa-none">
      <q-tab-panel
        v-for="offer in offers"
        :name="offer.name"
        class="articles q-pa-none flex row justify-center wrap"
      >
        <article-item
          v-if="offer.articles.length > 0"
          v-for="article in offer.articles.sort((a,b) => a.price - b.price)"
          :key="article.id"
          :article="article"
          style="margin: auto; margin-bottom: 8px"
          class="article_item"
        />
        <p v-else class="text-bold text-caption">Aucun article disponible pour le moment</p>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup lang="ts">
import ArticleItem from '@/components/ArticleItem.vue'
import { useGameStore } from '@/stores/game.store'
import type { IOffer } from '@shared/Types/Interfaces'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const games = computed(() => useGameStore().games)
const router = useRouter()
const offers = ref<IOffer[]>([])
const tab = ref(offers.value.length > 0 ? offers.value[0]!.name : '')

watch(
  () => games.value,
  () => {
    const gameId = router.currentRoute.value.query.game_id
    if (gameId) {
      const game = games.value.find((g) => g.id === gameId)
      if (game && game.offers && game.offers.length > 0) {
        offers.value = game.offers
        tab.value = game.offers[0]!.name
      }
    }
  },
)

const gameId = router.currentRoute.value.query.game_id
if (gameId) {
  const game = games.value.find((g) => g.id === gameId)
  if (game && game.offers && game.offers.length > 0) {
    offers.value = game.offers
    tab.value = game.offers[0]!.name
  }
}
</script>

<style lang="css" scoped>
/* .articles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
} */

.image {
  background-size: cover !important;
  background-position: center top !important;
  max-height: 120px;
}

.carousel {
  background-size: cover !important;
  background-position: center top !important;
}

.offer {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.article_item {
  width: 300px;
}

@media (max-width: 1000px) {
  .article_item {
    width: 45%;
  }
}
</style>
