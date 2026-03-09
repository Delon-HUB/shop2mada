<template>
  <p class="text-h5 text-bold q-mx-md">Jeux disponibles</p>
  <div class="gamelist">
    <div v-for="game in games" :key="game.id" class="q-ma-md">
      <q-btn flat no-caps class="q-pa-none game" :to="`/offers?game_id=${game.id}`">
        <q-card flat bordered class="fit">
          <q-card-section class="q-pa-none">
            <q-img class="image" :src="game.image" />
            <p class="text-center text-h6 text-bold">{{ game.name }}</p>
          </q-card-section>
        </q-card>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const games = ref([
  {
    id: '1',
    name: 'Free Fire',
    image:
      'https://wallpapercat.com/w/full/f/a/4/1868530-1920x1200-desktop-hd-garena-free-fire-background.jpg',
  },
  {
    id: '2',
    name: 'PUBG',
    image: 'https://wallpapercave.com/wp/wp2208719.jpg',
  },
  {
    id: '3',
    name: 'Clash of Clans',
    image: 'https://wallpapers.com/images/hd/clash-of-clans-the-wizard-an0jszy0voljyl8p.jpgs',
  },
])
</script>

<style scoped lang="css">
.gamelist {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.game {
  width: 300px;
  max-width: 350px;
  background-color: #ecf8f8;
}

.image {
  background-size: cover !important;
  background-position: center top !important;
  max-height: 150px;
}
</style>
