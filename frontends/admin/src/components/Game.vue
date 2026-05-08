<template>
  <q-card flat bordered>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div>
          <q-img class="image" :src="props.game.cover" />
          <p class="text-center text-h6 text-bold q-ma-none">{{ props.game.name }}</p>
          <p class="text-center text-subtitle2 text-grey q-ma-none">
            {{ props.game.categories.map((categ) => categ).join(', ') }}
          </p>
        </div>
      </template>

      <template v-slot:after>
        <q-tabs
          v-model="offerTab"
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

          <q-tab name="add" icon="add" no-caps @click="() => (showOfferInput = true)">
            <offer-input-dialog
              :game="props.game"
              v-model="showOfferInput"
              @finished="(offer: Partial<IOffer>) => handleAddOffer(offer)"
            />
          </q-tab>
        </q-tabs>

        <q-tab-panels v-model="offerTab" animated>
          <q-tab-panel
            v-for="offer in props.game.offers"
            :key="offer.id"
            :name="offer.id"
            class="flex row wrap"
          >
            <article-item
              v-for="article in offer.articles"
              :key="article.id"
              :article="article"
              class="q-ma-sm"
            />

            <q-card flat bordered class="q-ma-md article text-center">
              <q-btn
                class="fit text-center"
                flat
                no-caps
                color="primary"
                @click="() => (showOfferInput = true)"
                label="ajouter un article"
                icon="add"
              >
                <article-input-dialog
                  :offer="offer"
                  v-model="showOfferInput"
                  @finished="(article: Partial<IArticle>) => handleAddArticle(article)"
                />
              </q-btn>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type IArticle, type IGame, type IOffer } from '@shared/Types/Interfaces'
import OfferInputDialog from './OfferInputDialog.vue'
import { useOfferStore } from '@/stores/offer.store'
import ArticleItem from './ArticleItem.vue'
import ArticleInputDialog from './ArticleInputDialog.vue'
import { useArticleStore } from '@/stores/article.store'

const showOfferInput = ref(false)
const props = defineProps<{
  game: IGame
}>()
const $offerStore = useOfferStore()
const $articleStore = useArticleStore()

const offerTab = ref((props.game.offers ?? [])[0]?.id || 'none')
const splitterModel = ref(20)

const handleAddOffer = async (newOffer: Partial<IOffer>) => {
  await $offerStore.addOffer(newOffer)
}

const handleAddArticle = async (newArticle: Partial<IArticle>) => {
  await $articleStore.addArticle(newArticle)
}
</script>

<style scoped lang="css">
.article {
  width: 100%;
  max-width: 250px;
}
</style>
