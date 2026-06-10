<template>
  <q-card flat bordered class="q-mt-none" :class="$q.screen.gt.md ? 'row' : ''">
    <div :class="$q.screen.gt.md ? 'col-3 full-height' : ''">
      <q-card-section class="q-pa-none q-ma-none">
        <q-img class="image" :src="props.game.cover" :ratio="16 / 9">
          <p class="text-right">
            <q-chip color="dark" class="text-bold text-white text-h6">{{ props.game.name }}</q-chip>
          </p>
        </q-img>

        <p
          style="transform: translateY(-100%)"
          class="q-pa-none q-ma-none absolute full-width text-right"
          v-if="$q.screen.lt.md"
        >
          <q-btn-dropdown
            flat
            round
            color="primary"
            dropdown-icon="settings"
            class="text-white bg-dark"
          >
            <q-list>
              <q-item clickable>
                <q-item-section>
                  <q-item-label><q-icon size="24px" name="edit" />Modifier </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section>
                  <q-item-label
                    ><q-icon size="24px" color="red" name="delete" />Supprimer
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable @click="() => (offerDialog = true)">
                <q-item-section>
                  <q-item-label
                    ><q-icon size="24px" color="primary" name="add" />Nouvelle offre
                  </q-item-label>
                </q-item-section>
                <offer-input-dialog
                  :game="props.game"
                  v-model="offerDialog"
                  @finished="(offer: Partial<IOffer>) => handleAddOffer(offer)"
                />
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </p>

        <div class="flex row wrap flex-start" v-if="$q.screen.gt.md">
          <q-item clickable>
            <q-item-section>
              <q-item-label><q-icon size="24px" name="edit" />Modifier </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label
                ><q-icon size="24px" color="red" name="delete" />Supprimer
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="() => (offerDialog = true)">
            <q-item-section>
              <q-item-label
                ><q-icon size="24px" color="primary" name="add" />Nouvelle offre
              </q-item-label>
            </q-item-section>
            <offer-input-dialog
              :game="props.game"
              v-model="offerDialog"
              @finished="(offer: Partial<IOffer>) => handleAddOffer(offer)"
            />
          </q-item>
        </div>
      </q-card-section>
    </div>

    <q-separator vertical></q-separator>

    <div :class="$q.screen.gt.md ? 'col' : ''">
      <q-card-section class="q-pa-none q-ma-none">
        <q-tabs
          v-model="offerTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-btn-dropdown
            no-caps
            v-for="offer in props.game.offers"
            :key="offer._id"
            @click="() => (offerTab = offer._id)"
            split
            flat
            :label="offer.name"
            class="q-ma-sm"
            :color="offerTab == offer._id ? 'primary' : 'grey'"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Renommer</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Supprimer</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-none q-ma-none">
        <q-tab-panels v-model="offerTab" animated>
          <q-tab-panel
            v-for="offer in props.game.offers"
            :key="offer._id"
            :name="offer._id"
            :class="
              $q.screen.lt.md
                ? 'flex row wrap q-pa-none justify-around'
                : ' flex row wrap q-pa-none flex-start'
            "
          >
            <article-item
              v-for="article in offer.articles"
              :key="article._id"
              :article="article"
              class="q-ma-sm"
            />

            <p class="q-ma-sm" style="border: 1px dashed gainsboro; border-radius: 4px">
              <q-btn
                class="fit text-center"
                flat
                no-caps
                color="primary"
                @click="() => (articleDialog = true)"
                label="ajouter un article"
                icon="add"
              >
                <article-input-dialog
                  :offer="offer"
                  v-model="articleDialog"
                  @finished="(article: Partial<IArticle>) => handleAddArticle(article)"
                />
              </q-btn>
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </div>
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

const offerDialog = ref(false)
const articleDialog = ref(false)

const props = defineProps<{
  game: IGame
}>()
const $offerStore = useOfferStore()
const $articleStore = useArticleStore()

const offerTab = ref((props.game.offers ?? [])[0]?._id || 'none')

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
  max-width: 350px;
}

.image {
  background-size: cover !important;
  background-position: top center !important;
  max-height: 15em;
}
</style>
