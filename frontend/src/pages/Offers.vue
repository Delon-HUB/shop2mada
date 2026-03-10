<template>
  <div class="offer">
    <p v-for="offer in offers" :key="offer.id" class="text-h5 text-bold q-mx-md">
      <q-btn
        no-caps
        outline
        rounded
        :label="offer.name"
        icon="electric_bolt"
        :style="tab == offer.name ? { color: 'blue' } : {}"
        @click="() => (tab = offer.name)"
      />
    </p>
  </div>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel v-for="offer in offers" :name="offer.name" class="gamelist">
      <q-card flat bordered class="article q-ma-md" v-for="i in 10" :key="i">
        <q-card-section
          class="q-pa-none"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <p class="text-center text-overline text-blue">+100 diamonds</p>
          <p class="text-center text-h6 text-bold">2500 ar</p>
          <p>
            <q-btn outline rounded no-caps color="blue" style="width: 200px">Ajouter</q-btn>
          </p>
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tab = ref('rechargement')

const offers = ref([
  {
    id: '1',
    game_id: '1',
    name: 'rechargement',
    articles: [
      {
        id: '1',
        name: '+100 diamonds',
        price: 2500,
      },
    ],
  },
  {
    id: '2',
    game_id: '1',
    name: 'Level up',
    articles: [
      {
        id: '1',
        name: 'niveau 10',
        price: 2500,
      },
    ],
  },
  {
    id: '3',
    game_id: '1',
    name: 'abonnement',
    articles: [
      {
        id: '1',
        name: '+100 diamonds',
        price: 2500,
      },
    ],
  },
  {
    id: '4',
    game_id: '1',
    name: 'largage',
    articles: [
      {
        id: '1',
        name: '+100 diamonds',
        price: 2500,
      },
    ],
  },
])
</script>

<style lang="css" scoped>
.gamelist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.article {
  width: 300px;
  max-width: 350px;
  background-color: #ecf8f8;
}

.image {
  background-size: cover !important;
  background-position: center top !important;
  max-height: 120px;
}

.carousel {
  background-size: cover !important;
  background-position: center top !important;
}

.offer {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
