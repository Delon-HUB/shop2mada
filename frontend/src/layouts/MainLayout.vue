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
        <div style="display: flex; gap: 20px; justify-content: center">
          <div><router-view /></div>
          <div
            v-if="breading && $q.screen.gt.md"
            style="max-width: 25%; max-height: 600px; overflow: auto"
          >
            <q-card bordered>
              <q-card-section>
                PANIER <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus ad, voluptatem
                nulla aliquid dignissimos dolore quibusdam, corporis ex quo, magni praesentium ipsa
                odio provident iusto quidem minima quos rem doloribus a non aut deserunt! Vitae
                aperiam distinctio sed eligendi! Voluptatem temporibus quas culpa, nesciunt porro
                architecto, earum cumque pariatur possimus natus soluta maiores sint, laborum dolore
                enim expedita fugiat tempore. Enim temporibus ut impedit. Enim doloremque eos
                incidunt. Eligendi velit amet magnam sequi quidem neque vero illo, error tempora
                repellendus id, adipisci facere dolorem, cumque corrupti cum. Tempora sequi, quis
                quaerat odit veniam veritatis minus, illum officiis cupiditate tenetur quo!
              </q-card-section>
              <q-card-actions align="center">
                <q-btn rounded color="blue" bordered class="fit">Acheter</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
const covers = ref(1)
const breading = ref(true)

const $q = useQuasar()
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
