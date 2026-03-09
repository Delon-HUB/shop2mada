<template>
  <q-layout view="lHh lpr lFf" container class="layout">
    <q-header class="header">
      <q-toolbar>
        <q-avatar>
          <img src="../../public/logo.png" />
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
    </q-header>

    <q-page-container class="page-container">
      <q-page class="q-pa-none">
        <q-card class="q-ma-md cover">
          <q-carousel
            v-model="slide"
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
              class="image"
              :name="1"
              img-src="https://wallpapercave.com/wp/wp5175839.jpg"
            />
            <q-carousel-slide
              class="image"
              :name="2"
              img-src="https://wallpapercat.com/w/full/f/a/4/1868530-1920x1200-desktop-hd-garena-free-fire-background.jpg"
            />
            <q-carousel-slide
              class="image"
              :name="3"
              img-src="https://wallpapercat.com/w/full/8/1/1/1868685-1920x1200-desktop-hd-garena-free-fire-background.jpg"
            />
            <q-carousel-slide
              class="image"
              :name="4"
              img-src="https://wallpaperaccess.com/full/2390977.jpg"
            />
          </q-carousel>
        </q-card>
        <div>
          <h1 class="text-h6 text-bold q-ma-md">Jeux disponibles</h1>
        </div>
        <div class="gamelist">
          <div v-for="i in 10" :key="i" class="q-ma-md">
            <q-card flat bordered class="game">
              <q-card-section class="q-pa-none">
                <q-carousel v-model="slide" animated infinite autoplay style="max-height: 120px">
                  <q-carousel-slide
                    class="image"
                    :name="1"
                    img-src="https://wallpapercave.com/wp/wp5175839.jpg"
                  />
                  <q-carousel-slide
                    class="image"
                    :name="2"
                    img-src="https://wallpapercat.com/w/full/f/a/4/1868530-1920x1200-desktop-hd-garena-free-fire-background.jpg"
                  />
                  <q-carousel-slide
                    class="image"
                    :name="3"
                    img-src="https://wallpapercat.com/w/full/8/1/1/1868685-1920x1200-desktop-hd-garena-free-fire-background.jpg"
                  />
                  <q-carousel-slide
                    class="image"
                    :name="4"
                    img-src="https://wallpaperaccess.com/full/2390977.jpg"
                  />
                </q-carousel>
                <p class="text-center text-h6 text-bold">Free Fire</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const slide = ref(1)
</script>

<style lang="css" scoped>
@media (max-width: 1200px) {
  .layout {
    width: 100%;
    height: 100vh;
  }
}

@media (min-width: 1201px) {
  .layout {
    width: 70%;
    height: 100vh;
    margin: auto;
  }
}

.header {
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

.page-container {
  margin: auto;
  background-color: white;
}
</style>
