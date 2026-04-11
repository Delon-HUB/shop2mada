<template>
  <q-card flat bordered>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div>
          <q-img class="image" :src="props.game.cover" />
          <p class="text-center text-h6 text-bold">{{ props.game.name }}</p>
        </div>
      </template>

      <template v-slot:after>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab
            no-caps
            v-for="offer in props.game.offers"
            :key="offer.id"
            :name="offer.id"
            :label="offer.name"
          />

          <q-tab name="add" icon="add" @click="() => console.log('open dialog')" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            v-for="offer in props.game.offers"
            :key="offer.id"
            :name="offer.id"
            class="flex row wrap"
          >
            <p v-for="article in offer.articles" :key="article.id" class="q-pa-sm">
              <article-item :article="article" />
            </p>
            <div class="article q-pa-md">
              <q-btn class="fit" flat no-caps icon="add" color="grey" label="ajouter" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleItem from './ArticleItem.vue'

import { type IGame } from '@shared/Types/Interfaces'
const props = defineProps<{
  game: IGame
}>()

const tab = ref((props.game.offers ?? [])[0]?.id || 'none')
const splitterModel = ref(20)
</script>

<style scoped lang="css">
.article {
  width: 100%;
  max-width: 250px;
}
</style>
