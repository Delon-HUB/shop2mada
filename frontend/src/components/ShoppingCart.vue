<template>
  <q-layout view="hHr lpR fFr" container>
    <q-header>
      <q-toolbar>
        <q-item-label class="text-bold text-h6" flat no-caps
          ><q-icon name="shopping_cart" />Panier</q-item-label
        >
        <q-space />
        <q-btn flat v-close-popup dense>
          <q-icon name="delete" color="red" /><span color="white">Vider</span></q-btn
        >
        <q-btn flat v-close-popup round dense icon="close" @click="() => (model = !model)" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <q-card flat class="fit">
          <q-card-section class="q-pt-md">
            <q-list bordered>
              <q-item v-for="i in 20" clickable v-ripple>
                <q-item-section>Single line item</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

    <q-footer class="q-pa-md shadow-2 bg-white">
      <div class="q-gutter-md q-mb-md">
        <q-input rounded outlined v-model="text" placeholder="ID dans le jeux">
          <template v-slot:prepend>
            <q-icon name="contacts_product" />
          </template>
        </q-input>

        <q-input rounded outlined v-model="text" placeholder="Pseudo">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input rounded outlined v-model="text" placeholder="Téléphone">
          <template v-slot:prepend>
            <q-icon name="call" />
          </template>
        </q-input>
      </div>
      <q-btn no-caps color="blue" class="fit">Acheter</q-btn>
    </q-footer>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref()
const model = defineModel<boolean>()
</script>

<style scoped lang="css">
.q-header {
  margin: auto;
  background-color: #05668d;
  border-radius: 0px;
}
</style>
