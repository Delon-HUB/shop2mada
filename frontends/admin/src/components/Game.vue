<template>
  <q-card flat bordered>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div>
          <q-img
            class="image"
            :src="'https://wallpapercat.com/w/full/b/8/e/1868764-3840x2160-desktop-4k-garena-free-fire-background-photo.jpg'"
          />
          <p class="text-center text-h6 text-bold">Free Fire</p>
        </div>
      </template>

      <template v-slot:after>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
          <q-tab name="add" icon="add" @click="() => console.log('open dialog')" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails" class="flex row wrap">
            <p v-for="i in 10">
              <article-item />
            </p>
            <div class="article q-pa-md">
                <q-btn class="fit" flat no-caps icon="add" color="grey" label="ajouter" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <p>alarms</p>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <p>movies</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleItem from './ArticleItem.vue'

const tab = ref('mails')
const splitterModel = ref(20)
</script>

<style scoped lang="css">
.article {
  width: 100%;
  max-width: 250px;
}
</style>
