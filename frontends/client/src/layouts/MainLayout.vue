<template>
  <q-layout view="hHr lpR lff" container>
    <q-drawer v-if="$q.screen.gt.md" side="right" :width="500" v-model="shoppingCart">
      <shopping-cart v-model="shoppingCart" />
    </q-drawer>
    <q-dialog v-else v-model="shoppingCart" maximized>
      <shopping-cart v-model="shoppingCart" />
    </q-dialog>

    <q-header class="bg-grey-1">
      <q-toolbar class="toolbar">
        <q-avatar>
          <img src="/logo.png" />
        </q-avatar>
        <q-item>
          <q-item-section>
            <q-item-label
              ><q-toolbar-title class="text-bold">Shop2MADA</q-toolbar-title></q-item-label
            >
            <q-item-label caption class="text-white text-bold"
              ><q-icon name="shopping_cart" color="white" />Vente d'article d'un jeu</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-space />
        <q-btn
          v-if="!shoppingCart"
          flat
          @click="shoppingCart = !shoppingCart"
          icon="shopping_cart"
          no-caps
        >
          <q-badge
            v-if="$shoppingCartStore.counter"
            color="red"
            rounded
            floating
            :label="$shoppingCartStore.counter"
        /></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-ma-none">
        <div class="fit">
          <router-view />
        </div>
      </q-page>
      <!-- <q-page class="q-pa-md bg-grey-3 flex justify-center">
        <contact />
      </q-page> -->
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import ShoppingCart from '@/components/ShoppingCart.vue'
import Contact from '@/pages/Contact.vue'
import { useGameStore } from '@/stores/game.store'
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import { ref } from 'vue'

const $gameStore = useGameStore()
$gameStore.init()
const $shoppingCartStore = useShoppingCartStore()
const shoppingCart = ref(false)
</script>

<style lang="css" scoped>
.header {
  border-radius: 18px;
}

.toolbar {
  margin: auto;
  background-color: #05668d;
}

.image {
  border-radius: 12px 12px 0px 0px;
  background-size: cover !important;
  background-position: center top !important;
}
</style>
