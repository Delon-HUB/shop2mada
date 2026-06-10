<template>
  <div class="q-gutter-md flex items-start wrap">
    <Order v-for="order in $orderStore.orders" :order="order" :key="order._id" />
  </div>
</template>

<script setup lang="ts">
import Order from '@/components/Order.vue'
import { useOrderStore } from '@/stores/order.store'

const $orderStore = useOrderStore()
</script>
