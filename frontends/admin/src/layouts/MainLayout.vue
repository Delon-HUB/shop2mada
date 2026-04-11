<template>
  <q-layout view="hHh Lpr lff" container>
    <q-header>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Shop2MADA</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="500" bordered>
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
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
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
    path: '',
  },
  {
    icon: 'gamepad',
    label: 'Jeux',
    separator: true,
    path: '/games',
  },
  {
    icon: 'settings',
    label: 'Paramètres',
    separator: false,
  },
  {
    icon: 'logout',
    label: 'Se deconnecter',
    separator: false,
  },
]
</script>
