<template>
  <div class="offer_menu">
    <p>
      <q-btn
        no-caps
        outline
        rounded
        label="Rechargement"
        icon="electric_bolt"
        :style="tab == 'rechargement' ? { color: 'blue' } : {}"
        @click="() => (tab = 'rechargement')"
      />
    </p>
    <p>
      <q-btn
        no-caps
        outline
        rounded
        label="Abonnement"
        icon="electric_bolt"
        :style="tab == 'abonnement' ? { color: 'blue' } : {}"
        @click="() => (tab = 'abonnement')"
      />
    </p>
    <p>
      <q-btn
        no-caps
        outline
        rounded
        label="Largage"
        icon="electric_bolt"
        :style="tab == 'largage' ? { color: 'blue' } : {}"
        @click="() => (tab = 'largage')"
      />
    </p>
    <p>
      <q-btn
        no-caps
        outline
        rounded
        label="Level up"
        icon="electric_bolt"
        :style="tab == 'level up' ? { color: 'blue' } : {}"
        @click="() => (tab = 'level up')"
      />
    </p>
  </div>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="rechargement">
      <div class="text-h6">rechargement</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="alarms">
      <div class="text-h6">Alarms</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="movies">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>

  <div class="gamelist">
    <div v-for="i in 10" :key="i" class="q-ma-md">
      <q-card flat bordered class="game">
        <q-card-section class="q-pa-none">
          <q-img
            class="image"
            src="https://wallpapercat.com/w/full/f/a/4/1868530-1920x1200-desktop-hd-garena-free-fire-background.jpg"
          />
          <p class="text-center text-h6 text-bold">Free Fire</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const slide = ref(1)
const tab = ref('rechargement')
</script>

<style lang="css" scoped>
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
  max-height: 120px;
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
