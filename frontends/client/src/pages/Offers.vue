<template>
  <q-card flat class="offer">
    <p v-for="offer in offers" :key="offer.id" class="text-caption text-bold q-mx-md q-mt-md">
      <q-btn
        no-caps
        flat
        rounded
        :label="offer.name"
        class="text-bold text-caption"
        :style="
          tab == offer.name
            ? { backgroundColor: 'blue', color: 'white' }
            : { backgroundColor: 'lightgray', color: 'black' }
        "
        @click="() => (tab = offer.name)"
      />
    </p>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel v-for="offer in offers" :name="offer.name" class="articles">
        <article-item
          v-for="article in offer.articles"
          :key="article.id"
          :article="article"
          class="q-mr-md q-mb-md"
        />
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
const tab = ref('')

const games = computed(() => useGameStore().games)
const router = useRouter()
const offers = ref<IOffer[]>([])

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
.articles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

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
</style>
