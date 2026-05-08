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
            :key="offer._id"
            :name="offer._id"
            :label="offer.name"
          />

          <q-tab name="add" icon="add" no-caps @click="() => (showOfferInput = true)" />
          <offer-input-dialog
            :game="props.game"
            v-model="showOfferInput"
            @finished="(offer: Partial<IOffer>) => handleAddOffer(offer)"
          />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            v-for="offer in props.game.offers"
            :key="offer._id"
            :name="offer._id"
            class="flex row wrap"
          >
            <p v-for="article in offer.articles" :key="article._id" class="q-pa-sm">
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
import { type IGame, type IOffer } from '@shared/Types/Interfaces'
import OfferInputDialog from './OfferInputDialog.vue'
import { useOfferStore } from '@/stores/offer.store'

const showOfferInput = ref(false)
const props = defineProps<{
  game: IGame
}>()
const offerStore = useOfferStore()

const tab = ref((props.game.offers ?? [])[0]?._id || 'none')
const splitterModel = ref(20)

const handleAddOffer = async (newOffer: Partial<IOffer>) => {
  await offerStore.addOffer(newOffer)
}
</script>

<style scoped lang="css">
.article {
  width: 100%;
  max-width: 250px;
}
</style>
