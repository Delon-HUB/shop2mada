<template>
  <div class="q-gutter-md flex wrap">
    <Order v-for="order in $orderStore.orders" :order="order" :key="order.id" />
  </div>
</template>

<script setup lang="ts">
import Order from '@/components/Order.vue'
import { useOrderStore } from '@/stores/order.store'

const $orderStore = useOrderStore()
</script>
