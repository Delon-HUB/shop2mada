<template>
  <q-card flat class="q-pa-none q-ma-none bg-grey-1">
    <q-card-section class="q-ma-none q-pa-none">
      <q-img :src="currentGame?.cover" class="image q-mb-md" no-native-menu />
      <p
        class="absolute-bottom-right q-mt-none text-subtitle1 bg-grey-1 q-px-md text-bold"
        style="border-top-left-radius: 12px"
      >
        {{ currentGame?.name }}
      </p>
    </q-card-section>
    <q-card-section class="q-ma-none q-pa-none">
      <div class="text-center text-black bg-grey-1">
        <q-tabs
          v-model="currentTab"
          dense
          class="q-pa-none"
          active-color="primary"
          indicator-color="primary"
          align="center"
        >
          <q-tab
            v-for="offer in currentGame?.offers"
            :key="offer._id"
            :name="offer._id"
            class="text-bold"
            no-caps
            ripple
          >
            <span>{{ offer.name }}</span>
          </q-tab>
        </q-tabs>
      </div>
      <q-tab-panels v-model="currentTab" animated class="q-pa-none bg-grey-1 q-mt-md">
        <q-tab-panel
          v-for="offer in currentGame?.offers"
          :name="offer._id"
          class="articles q-pa-none flex row justify-center wrap"
        >
          <article-item
            v-if="offer.articles.length > 0"
            v-for="article in offer.articles.sort((a, b) => a.price - b.price)"
            :key="article._id"
            :article="article"
            class="article_item q-ma-xs"
          />
          <p v-else class="text-bold text-caption">Aucun article disponible pour le moment</p>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import ArticleItem from '@/components/ArticleItem.vue'
import router from '@/router'
import { useGameStore } from '@/stores/game.store'
import { computed, ref } from 'vue'

const $gameStore = useGameStore()
const currentTab = ref($gameStore.currentGame?.offers[0]?._id)

const currentGame = computed(() => $gameStore.currentGame)

if (!currentGame.value) router.push('/games')
</script>

<style lang="css" scoped>
.image {
  background-position: center top !important;
  max-height: 20vh;
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
