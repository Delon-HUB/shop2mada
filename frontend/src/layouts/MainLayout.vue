<template>
  <q-layout view="hHr lpR lff" container>
    <q-drawer side="right" v-model="drawer" :width="500" :breakpoint="200">
      <q-card flat bordered class="fit">
        <q-card-section class="q-pt-none" style="position: sticky; top: 0">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-item-label class="text-bold text-h6"
                ><q-icon name="shopping_cart" color="blue" />Panier</q-item-label
              >
            </q-item-section>
            <q-space />
            <q-item-section>
              <q-item-label class="text-right"
                ><q-btn flat icon-right="delete" color="red"
              /></q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-list bordered>
            <q-item v-for="i in 20" clickable v-ripple>
              <q-item-section>Single line item</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="center" style="position: absolute; bottom: 0; left: 0; right: 0">
          <q-btn no-caps color="blue" class="fit">Acheter</q-btn>
        </q-card-actions>
      </q-card>
    </q-drawer>

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
        <q-btn flat @click="drawer = !drawer" icon="shopping_cart" no-caps>Panier</q-btn>
      </q-toolbar>

      <q-toolbar>
        <q-card flat class="cover fit q-ma-md q-mb-none">
          <q-carousel
            v-model="covers"
            padding
            animated
            infinite
            autoplay
            control-type="unelevated"
            arrows
            control-color="gray"
            style="max-height: 250px"
          >
            <q-carousel-slide
              class="carousel"
              :name="1"
              img-src="https://wallpapercave.com/wp/wp5175839.jpg"
            />
            <q-carousel-slide
              class="carousel"
              :name="2"
              img-src="https://wallpapercat.com/w/full/f/a/4/1868530-1920x1200-desktop-hd-garena-free-fire-background.jpg"
            />
            <q-carousel-slide
              class="carousel"
              :name="3"
              img-src="https://wallpapercat.com/w/full/8/1/1/1868685-1920x1200-desktop-hd-garena-free-fire-background.jpg"
            />
            <q-carousel-slide
              class="carousel"
              :name="4"
              img-src="https://wallpaperaccess.com/full/2390977.jpg"
            />
          </q-carousel>
        </q-card>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="split">
          <div class="fit">
            <router-view />
          </div>
          <div v-if="shoppingCart && $q.screen.gt.md" style="max-width: 25%; overflow: auto"></div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
const covers = ref(1)
const shoppingCart = ref(true)

const drawer = ref(false)

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

.gamelist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.game {
  width: 300px;
  max-width: 350px;
  border-radius: 16px;
  background-color: #ecf8f8;
}

.image {
  border-radius: 12px 12px 0px 0px;
  background-size: cover !important;
  background-position: center top !important;
}

.carousel {
  background-size: cover !important;
  background-position: center top !important;
}

.offer_menu {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.split {
  display: flex;
  gap: 20px;
  align-items: stretch;
}
</style>
