<template>
  <q-layout view="hHh Lpr lff" container>
    <q-header>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

        <q-item>
          <q-item-section>
            <q-item-label
              ><q-toolbar-title class="text-bold">Shop2MADA</q-toolbar-title></q-item-label
            >
            <q-item-label caption class="text-white"
              ><q-icon name="security" color="orange" />Administrateur</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
      <q-drawer v-model="drawer" :breakpoint="500" bordered>
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable v-ripple :to="menuItem.path">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator inset :key="'sep' + index" v-if="menuItem.separator" />
            </template>
            <q-expansion-item expand-separator label="Paramètres">
              <div>
                <q-item clickable v-ripple class="q-my-none q-py-none">
                  <q-item-section avatar>
                    <q-icon name="payments" />
                  </q-item-section>
                  <q-item-section>Mobile money</q-item-section>
                </q-item>
                <q-item clickable v-ripple class="q-my-none q-py-none">
                  <q-item-section avatar>
                    <q-icon name="phone" />
                  </q-item-section>
                  <q-item-section>Contacts</q-item-section>
                </q-item>
                <q-item clickable v-ripple class="q-my-none q-py-none">
                  <q-item-section avatar>
                    <q-icon name="security" />
                  </q-item-section>
                  <q-item-section>Sécurité</q-item-section>
                </q-item>
              </div>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/order.store'
import { usePaymentMethodStore } from '@/stores/paymentMethod.store'
import { ref } from 'vue'

const drawer = ref(false)

const menuList = [
  {
    icon: 'show_chart',
    label: 'Tableau de bord',
    separator: false,
    path: '/dashboard',
  },
  {
    icon: 'shopping_bag',
    label: 'Commandes',
    separator: false,
    path: '/orders',
  },
  {
    icon: 'gamepad',
    label: 'Jeux',
    separator: true,
    path: '/games',
  },
]

const $paymentMethodStore = usePaymentMethodStore()
const $orderStore = useOrderStore()
$paymentMethodStore.init()
$orderStore.init()

const refreshData = () => {
  $paymentMethodStore.init()
  $orderStore.init()
}
</script>
