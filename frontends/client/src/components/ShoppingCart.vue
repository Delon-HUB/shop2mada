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
        <q-card flat class="fit" bordered>
          <q-card-section v-if="$shoppingCartStore.getAll().length > 0" class="q-pt-md">
            <q-list separator>
              <shopping-cart-item
                v-for="article in $shoppingCartStore.getAll()"
                :article="article"
                :key="article.id"
              />
            </q-list>
            <q-separator class="q-my-md" />
            <p class="text-bold" flat no-caps>Total = {{ $shoppingCartStore.getTotal() }}Ar</p>
          </q-card-section>
          <q-card-section v-else class="text-center text-grey text-overline">
            <p>Vôtre panier est vide</p>
          </q-card-section>
        </q-card>
        <q-footer
          class="shadow-2 bg-white"
          style="border-top-left-radius: 42px; border-top-right-radius: 42px"
        >
          <div>
            <div class="text-center text-bold" style="transform: translateY(-50%)">
              <q-chip>
                <q-icon name="person" color="primary" size="24px" />Informations du joueur</q-chip
              >
            </div>
            <div class="q-mx-md" v-if="stepIndex == 1">
              <div class="q-gutter-md q-mb-md">
                <q-input rounded outlined v-model="text" label="ID dans le jeux">
                  <template v-slot:prepend>
                    <q-icon name="contacts_product" />
                  </template>
                </q-input>

                <q-input rounded outlined v-model="text" label="C'est bien vôtre pseudo ?">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>

                <q-input rounded outlined v-model="text" label="Numéro de téléphone" type="tel">
                  <template v-slot:prepend>
                    <q-icon name="call" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="q-ma-md row">
            <p class="col">
              <q-btn
                icon="payments"
                no-caps
                color="blue"
                class="fit"
                @click="() => (showPurchase = true)"
                >Procéder au paiement</q-btn
              >
            </p>
            <q-dialog :maximized="$q.screen.lt.md" persistent v-model="showPurchase">
              <purchase v-model="showPurchase" />
            </q-dialog>
          </div>
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ShoppingCartItem from './ShoppingCartItem.vue'
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import Purchase from './Purchase.vue'

const stepIndex = ref(1)

const text = ref()
const model = defineModel<boolean>()

const $shoppingCartStore = useShoppingCartStore()

const showPurchase = ref(false)
</script>

<style scoped lang="css">
.q-header {
  margin: auto;
  background-color: #05668d;
  border-radius: 0px;
}
</style>
