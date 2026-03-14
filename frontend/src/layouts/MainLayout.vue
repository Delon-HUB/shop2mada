<template>
  <q-layout view="hHr lpR lff" container>
    <q-drawer v-if="$q.screen.gt.md" side="right" :width="500" v-model="shoppingCart">
      <shopping-cart v-model="shoppingCart" />
    </q-drawer>
    <q-dialog v-else v-model="shoppingCart" maximized>
      <shopping-cart v-model="shoppingCart" />
    </q-dialog>

    <q-header class="header">
      <q-toolbar class="toolbar">
        <q-avatar>
          <img src="/logo.png" />
        </q-avatar>
        <q-item>
          <q-item-section>
            <q-item-label
              ><q-toolbar-title class="text-bold">Shop2MADA</q-toolbar-title></q-item-label
            >
            <q-item-label caption class="text-white"
              ><q-icon name="electric_bolt" color="orange" />Livraison instantanée</q-item-label
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

      <q-toolbar>
        <q-card flat class="fit q-ma-md q-mb-none cover">
          <q-carousel
            v-model="covers"
            padding
            animated
            infinite
            autoplay
            control-type="unelevated"
            arrows
            control-color="gray"
            class="carousel"
          >
            <q-carousel-slide :name="1" img-src="https://wallpapercave.com/wp/wp5175839.jpg" />
            <q-carousel-slide
              :name="2"
              img-src="https://wallpapercat.com/w/full/f/a/4/1868530-1920x1200-desktop-hd-garena-free-fire-background.jpg"
            />
            <q-carousel-slide
              :name="3"
              img-src="https://wallpapercat.com/w/full/8/1/1/1868685-1920x1200-desktop-hd-garena-free-fire-background.jpg"
            />
            <q-carousel-slide :name="4" img-src="https://wallpaperaccess.com/full/2390977.jpg" />
          </q-carousel>
        </q-card>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="fit">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import ShoppingCart from '@/components/ShoppingCart.vue'
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $shoppingCartStore = useShoppingCartStore()
const covers = ref(1)
const shoppingCart = ref(false)

const $q = useQuasar()
</script>

<style lang="css" scoped>
.header {
  background-color: #f1f2eb;
}
.header .cover {
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

.carousel {
  max-height: 35vh;
  width: auto;
}

@media (max-width: 1000px) {
  .carousel {
    height: 18vh;
    width: auto;
  }
}
</style>
