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

      <q-toolbar v-if="$q.screen.gt.md">
        <q-card flat class="fit q-ma-md q-mb-none cover">
          <q-carousel
            v-model="caroussel"
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
      <q-page class="q-pa-md q-ma-none">
        <div class="fit">
          <router-view />
        </div>
      </q-page>
      <q-page class="q-pa-md bg-grey-3 flex justify-center">
        <q-card flat class="bg-grey-3 text-center">
          <q-card-section class="q-pa-none">
            <q-toolbar-title class="text-bold">Contact</q-toolbar-title>
          </q-card-section>
          <q-card-section class="q-pa-none">
            Contactez-nous directement pour <span class="text-bold"> obtenir de l'aide</span>, nous
            informer un <span class="text-bold">bug</span> ou des
            <span class="text-bold">suggestions</span> pour améliorer le sérvice.
          </q-card-section>

          <q-card-section class="text-bold flex row justify-center wrap">
            <p>
              <q-chip><q-icon name="call" color="green-7" size="24px" />Whatsapp</q-chip>
            </p>
            <p>
              <q-chip><q-icon name="facebook" color="blue-7" size="24px" />Facebook</q-chip>
            </p>
          </q-card-section>

          <q-card-section
            class="q-pt-lg text-bold q-pa-none q-ma-none text-grey-7"
            style="font-size: medium"
          >
            <p>
              <span><q-icon name="copyright" />2026 SHOP2MADA,<br /></span>
              <span class="text-overline">all right reserved.</span>
            </p>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import ShoppingCart from '@/components/ShoppingCart.vue'
import { useGameStore } from '@/stores/game.store'
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
const $q = useQuasar()

const $gameStore = useGameStore()
$gameStore.init()

const $shoppingCartStore = useShoppingCartStore()
const caroussel = ref(1)
const shoppingCart = ref(false)
</script>

<style lang="css" scoped>
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
