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
      <q-tab-panel v-for="offer in offers" :name="offer.name" class="offer-list">
        <article-item v-for="article in offer.articles" :key="article.id" :article="article" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup lang="ts">
import ArticleItem from '@/components/ArticleItem.vue'
import { DATASET } from '@/stores/dataset'
import type { IOffer } from '@shared/Types/Interfaces'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const tab = ref('Rechargement')

const offers = ref<IOffer[]>([])
const router = useRouter()
const gameId = router.currentRoute.value.query.game_id
if (gameId) {
  const game = DATASET.find((g) => g.id === gameId)
  if (game && game.offers) {
    offers.value = game.offers
  }
}
</script>

<style lang="css" scoped>
.offer-list {
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
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
