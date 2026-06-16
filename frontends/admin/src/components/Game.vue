<template>
  <q-card flat bordered class="q-mt-none" :class="$q.screen.gt.md ? 'row' : ''">
    <div :class="$q.screen.gt.md ? 'col-3 full-height' : ''">
      <q-card-section class="q-pa-none q-ma-none">
        <q-img class="image" :src="props.game.cover" :ratio="16 / 9">
          <p class="text-right">
            <q-chip color="dark" class="text-bold text-white text-h6">{{ props.game.name }}</q-chip>
          </p>
        </q-img>

        <div
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
              <q-item clickable @click="() => (editGameDialog = true)">
                <q-item-section>
                  <q-item-label><q-icon size="24px" name="edit" />Modifier </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable @click="deleteGameDialog">
                <q-item-section>
                  <q-item-label
                    ><q-icon size="24px" color="red" name="delete" />Supprimer
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable @click="() => (addOfferDialog = true)">
                <q-item-section>
                  <q-item-label
                    ><q-icon size="24px" color="primary" name="add" />Nouvelle offre
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <div v-else class="flex row wrap flex-start">
          <q-item clickable @click="() => (editGameDialog = true)">
            <q-item-section>
              <q-item-label><q-icon size="1.5em" name="edit" />Modifier </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="deleteGameDialog">
            <q-item-section>
              <q-item-label><q-icon size="1.5em" color="red" name="delete" />Supprimer </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="() => (addOfferDialog = true)">
            <q-item-section>
              <q-item-label
                ><q-icon size="1.5em" color="primary" name="add" />Nouvelle offre
              </q-item-label>
            </q-item-section>
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
              <q-item
                clickable
                v-close-popup
                @click="
                  () => {
                    editOfferDialog = true
                    editOfferData = { ...offer }
                  }
                "
              >
                <q-item-section>
                  <q-item-label>Renommer</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="deleteOfferDialog(offer._id)">
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
              v-for="article in offer.articles.sort((a, b) => a.price - b.price)"
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
                  v-model="articleDialog"
                  @finished="(article: Partial<IArticle>) => handleAddArticle(article, offer)"
                  ><template v-slot>
                    <q-item-label class="text-center q-my-md text-h6"
                      >Ajouter une article pour <span> {{ offer.name }} </span></q-item-label
                    >
                  </template></article-input-dialog
                >
              </q-btn>
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </div>
  </q-card>

  <offer-input-dialog
    v-model="addOfferDialog"
    @finished="(offer: Partial<IOffer>) => handleAddOffer(offer)"
  >
    <p class="text-h6 q-ma-md">Ajouter une nouvelle offre</p></offer-input-dialog
  >
  <offer-input-dialog
    :offer="editOfferData"
    v-model="editOfferDialog"
    @finished="(offer: Partial<IOffer>) => handleEditOffer(offer)"
  >
    <p class="text-h6 q-ma-md">Modifier l'offre</p></offer-input-dialog
  >

  <GameInputDialog :game="{ ...props.game }" v-model="editGameDialog" @finished="handleEditGame">
    <p class="text-center text-h6 q-mt-xs">Ajouter un jeux</p>
  </GameInputDialog>
</template>

<script setup lang="ts">
import OfferInputDialog from './OfferInputDialog.vue'
import ArticleInputDialog from './ArticleInputDialog.vue'
import GameInputDialog from './GameInputDialog.vue'
import { ref } from 'vue'
import type { IArticle, IGame, IOffer } from '@/Types/Interfaces'
import { useOfferStore } from '@/stores/offer.store'
import ArticleItem from './ArticleItem.vue'
import { useArticleStore } from '@/stores/article.store'
import { useQuasar } from 'quasar'
import { useGameStore } from '@/stores/game.store.ts'

const props = defineProps<{
  game: IGame
}>()
const $gameStore = useGameStore()
const $offerStore = useOfferStore()
const $articleStore = useArticleStore()
const offerTab = ref((props.game.offers ?? [])[0]?._id || 'none')

const editGameDialog = ref(false)
const addOfferDialog = ref(false)
const editOfferDialog = ref(false)
const articleDialog = ref(false)

const handleEditGame = async (game: Partial<IOffer>) => {
  const dataUpdated = await $gameStore.update(game._id!, game)
  props.game.name = dataUpdated.name
  props.game.description = dataUpdated.description
  props.game.categories = dataUpdated.categories
  props.game.cover = dataUpdated.cover
  props.game.updatedAt = dataUpdated.updatedAt
}

const handleAddOffer = async (newOffer: Partial<IOffer>) => {
  newOffer.gameId = props.game._id
  await $offerStore.addOffer(newOffer)
}

const editOfferData = ref<IOffer>()
const handleEditOffer = async (offer: Partial<IOffer>) => {
  const dataUpdated = await $offerStore.update(offer._id!, offer)
  const index = props.game.offers.findIndex((offer) => offer._id == dataUpdated._id)
  props.game.offers.splice(index, 1, {
    ...dataUpdated,
    articles: props.game.offers[index]?.articles || [],
  })
}

const handleAddArticle = async (newArticle: Partial<IArticle>, offer: Partial<IOffer>) => {
  newArticle.offerId = offer._id
  await $articleStore.addArticle(newArticle)
}

const $q = useQuasar()
const deleteOfferDialog = (offerId: string) => {
  $q.dialog({
    title: 'Suppression',
    message: 'Voulez-vous vraiment supprimer cette offre ainsi que ces articles ?',
    cancel: {
      label: 'Non',
      noCaps: true,
      flat: true,
    },
    ok: {
      label: 'Oui',
      noCaps: true,
      flat: true,
      color: 'negative',
    },
    persistent: true,
  }).onOk(async () => {
    const deleted = await $offerStore.deleteFn(offerId)
  })
}

const deleteGameDialog = () => {
  $q.dialog({
    title: 'Suppression',
    message: 'Voulez-vous vraiment supprimer ce jeu ?',
    cancel: {
      label: 'Non',
      noCaps: true,
      flat: true,
    },
    ok: {
      label: 'Oui',
      noCaps: true,
      flat: true,
      color: 'negative',
    },
    persistent: true,
  }).onOk(async () => {
    await $gameStore.deleteFn(props.game._id)
  })
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
