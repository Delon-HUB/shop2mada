<template>
  <div>
    <div>
      <section>
        <q-carousel
          style="height: 20vh"
          v-model="carousel"
          padding
          animated
          infinite
          autoplay
          control-type="unelevated"
        >
          <q-carousel-slide
            v-for="game in games"
            :img-src="game.cover"
            :name="game._id"
            :key="game._id"
          >
            <p class="absolute-bottom text-bold text-overline">
              <q-chip class="text-primary bg-white">Livraison rapide</q-chip>
              <q-chip class="text-primary bg-white">Interface simple</q-chip>
              <q-chip class="text-primary bg-white">Paiement via mobile money</q-chip>
              <q-chip class="text-primary bg-white">Support disponible</q-chip>
            </p>
          </q-carousel-slide>
        </q-carousel>
      </section>
    </div>

    <div class="q-gutter-md flex flex-center">
      <q-card flat class="q-pa-md" :class="$q.screen.gt.md ? 'my-card' : ''">
        <p class="text-h6">Bienvenue !</p>
        <p>
          Cette plateforme parmet l'achat d'articles virtuels pour plusieurs jeux. De nouveau
          catalogues seront ajoutés régulièrement.
        </p>
        <p class="text-h6">Choisissez votre jeu</p>
        <div
          class="flex wrap bg-grey-1 q-py-md rounded-borders"
          :class="$q.screen.gt.md ? 'flex-start' : 'justify-evenly'"
        >
          <q-item
            class="q-pa-none col-5 q-mx-xs q-my-xs"
            v-for="game in games"
            :key="game._id"
            flat
            no-caps
            clickable
            @click="
              () => {
                router.push('/offers')
                $gameStore.currentGame = game
              }
            "
          >
            <game :game="game" />
          </q-item>
        </div>
        <p class="q-mt-lg text-center">
          <a class="text-primary" href="#">Contacter-nous</a> pour nous suggérer de nouveaux
          catalogues.
        </p>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Game from '@/components/Game.vue'
import router from '@/router'
import { useGameStore } from '@/stores/game.store'
import type { IGame } from '@shared/Types/Interfaces'
import { computed, ref, watch } from 'vue'

const $gameStore = useGameStore()
const games = computed<IGame[]>(() => $gameStore.games)
const carousel = ref(games.value[0]?._id)
watch(
  () => $gameStore.games,
  () => (carousel.value = $gameStore.games[0]?._id),
)
</script>

<style scoped lang="css">
.my-card {
  width: fit-content;
  max-width: 75%;
}
</style>
