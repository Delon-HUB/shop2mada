<template>
  <q-layout view="lHh lpr lFf" container>
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
      </q-toolbar>

      <q-card flat class="q-ma-md q-mb-none cover">
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
    </q-header>

    <q-page-container>
      <q-page class="q-pa-none q-pt-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const covers = ref(1)
</script>

<style lang="css" scoped>
.header {
  background-color: white;
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
</style>
