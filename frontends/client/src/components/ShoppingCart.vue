<template>
  <q-layout view="hHr lpR fFr" container class="bg-white">
    <q-header>
      <q-toolbar>
        <q-item-label class="text-bold text-h6" flat no-caps
          ><q-icon name="shopping_cart" />Panier</q-item-label
        >
        <q-space />
        <q-btn flat dense class="q-mr-md" @click="$shoppingCartStore.clear()">
          <q-icon name="delete" color="red" /><span color="white">Vider</span></q-btn
        >
        <q-btn flat rounded v-close-popup icon="close" @click="() => (model = !model)" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="bg-white q-pa-md">
        <q-card flat class="fit q-mb-lg" bordered>
          <div class="q-ml-md text-bold" style="transform: translateY(-50%)">
            <q-chip> <q-icon name="shop" color="primary" size="24px" />1.Commande(s)</q-chip>
          </div>
          <q-card-section v-if="$shoppingCartStore.orderItems.length > 0" class="q-pt-none">
            <q-list separator>
              <shopping-cart-item
                v-for="orderItem in $shoppingCartStore.orderItems"
                :orderItem="orderItem"
                :key="(orderItem.article as IArticle)._id"
              />
            </q-list>
            <q-separator class="q-my-md" />
            <p class="text-bold" flat no-caps>Total = {{ $shoppingCartStore.getTotal() }}Ar</p>
          </q-card-section>
          <q-card-section v-else class="text-center text-grey text-overline">
            <p>Vôtre panier est vide</p>
          </q-card-section>
        </q-card>

        <q-card flat class="fit q-mb-lg" bordered>
          <div class="q-ml-md text-bold" style="transform: translateY(-50%)">
            <q-chip>
              <q-icon name="person" color="primary" size="24px" />2.Informations du joueur</q-chip
            >
          </div>
          <div class="q-mx-md">
            <div class="q-gutter-md q-mb-md">
              <q-input rounded outlined v-model="playerId" label="ID dans le jeu">
                <template v-slot:prepend>
                  <q-icon name="contacts_product" />
                </template>
              </q-input>

              <q-input rounded outlined v-model="nickname" label="Pseudo dans le jeu">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                rounded
                outlined
                v-model="contact"
                label="Numéro de téléphone"
                type="tel"
                mask="### ## ### ##"
              >
                <template v-slot:prepend>
                  <q-icon name="call" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card>

        <q-card flat class="fit q-mb-lg" bordered>
          <div class="q-ml-md text-bold" style="transform: translateY(-50%)">
            <q-chip> <q-icon name="payments" color="primary" size="24px" />3.Paiment</q-chip>
          </div>
          <p v-if="paymentMethods.length == 0" class="q-mx-md text-caption text-grey">
            aucun méthode de paiement disponible pour le moment...
          </p>

          <div class="q-mx-md" v-else>
            <p class="text-bold">a.Choisissez le mode de paiement</p>
            <div class="flex row wrap justify-start q-mb-md text-caption">
              <q-item
                clickable
                v-ripple
                class="bg-grey-3 q-ma-xs q-pa-none"
                @click="() => ($shoppingCartStore.lastSelectedPaymentMethod = pm)"
                v-for="pm in paymentMethods"
                :key="pm._id"
                :active="selectedPaymentMethod?._id == pm._id"
                :style="selectedPaymentMethod?._id == pm._id ? 'border: 2px solid #05668d' : ''"
              >
                <q-card bordered flat style="width: 8em" class="q-pa-xs text-center">
                  <q-item-section>
                    <q-item-label class="text-center">
                      <q-avatar rounded size="6em">
                        <img :src="pm.cover" />
                      </q-avatar>
                    </q-item-label>
                    <q-item-label>{{ pm.name }}</q-item-label>
                  </q-item-section>
                </q-card>
              </q-item>
            </div>

            <div v-if="selectedPaymentMethod">
              <q-card bordered flat class="bg-grey-3" style="border: 2px dashed grey">
                <p class="text-bold q-mx-xs q-mt-xs">Envoyer l'argent:</p>
                <ul class="q-ma-none">
                  <li>
                    Via :
                    <q-chip class="text-bold"
                      ><q-avatar> <img :src="selectedPaymentMethod?.cover" /> </q-avatar
                      >{{ selectedPaymentMethod?.name }}</q-chip
                    >
                  </li>
                  <li class="flex row">
                    <p>
                      sur le numéro:
                      <q-chip class="text-bold">
                        {{ selectedPaymentMethod?.phone }}
                      </q-chip>
                    </p>
                    <q-space></q-space>
                    <p>
                      <q-btn
                        flat
                        icon="content_copy"
                        color="primary"
                        class="q-mr-xs"
                        @click="() => copyToClipboard(selectedPaymentMethod?.phone ?? '')"
                      />
                    </p>
                  </li>
                  <li>
                    Nom du compte:
                    <q-chip class="text-bold"> {{ selectedPaymentMethod?.account_name }}</q-chip>
                  </li>
                  <li>
                    Montant à payer:
                    <q-chip class="text-bold"> {{ $shoppingCartStore.getTotal() }} Ar</q-chip>
                  </li>
                </ul>
              </q-card>
              <q-card flat class="text-black q-mt-md">
                <p class="text-bold">b.Confirmation du paiement</p>
                <p class="text-caption">
                  Veuillez entrer la référence de votre transaction pour confirmer le paiement.
                </p>
                <p>
                  <q-input
                    rounded
                    outlined
                    v-model="paymentRef"
                    label="Référence de la transaction"
                  >
                    <template v-slot:prepend>
                      <q-icon name="receipt" />
                    </template>
                  </q-input>
                </p>
              </q-card>
            </div>
          </div>
        </q-card>
      </q-page>

      <q-footer class="bg-white q-ma-md">
        <q-btn
          class="fit"
          no-caps
          color="blue"
          icon="shopping_cart"
          @click="sendOrder"
          :disable="!canSubmit"
          :loading="loading"
          >Envoyer ma commande</q-btn
        >
      </q-footer>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import ShoppingCartItem from './ShoppingCartItem.vue'
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import type { IArticle, IPaymentMethod } from '@shared/Types/Interfaces/index.ts'
import { useQuasar, copyToClipboard } from 'quasar'

const loading = ref<boolean>(false)
const model = defineModel<boolean>()
const playerId = ref<string>('')
const nickname = ref<string>('')
const contact = ref<string>('')
const paymentRef = ref<string>('')

const $q = useQuasar()
const $shoppingCartStore = useShoppingCartStore()
$shoppingCartStore.init()
const paymentMethods = computed<IPaymentMethod[]>(() => $shoppingCartStore.paymentMethods || [])
const selectedPaymentMethod = computed<IPaymentMethod | null>(
  () => $shoppingCartStore.lastSelectedPaymentMethod || null,
)

const canSubmit = computed(
  () =>
    $shoppingCartStore.orderItems.length > 0 &&
    playerId.value.length > 0 &&
    nickname.value.length > 0 &&
    contact.value.length == 10 &&
    paymentRef.value.length > 0 &&
    $shoppingCartStore.lastSelectedPaymentMethod,
)

const sendOrder = async () => {
  loading.value = true
  await $shoppingCartStore.purchase(playerId.value, nickname.value, contact.value, paymentRef.value)
  loading.value = false
  playerId.value = ''
  nickname.value = ''
  paymentRef.value = ''
  if ($q.screen.lt.md) model.value = false
}
</script>

<style scoped lang="css">
.q-header {
  margin: auto;
  background-color: #05668d;
  border-radius: 0px;
}
</style>
