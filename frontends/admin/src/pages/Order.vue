<template>
  <div v-if="text.trim()" class="q-gutter-md flex items-start flex-center wrap q-mt-xl">
    <Order
      v-if="searchResult.length > 0"
      v-for="order in searchResult"
      :order="order"
      :key="order._id"
    />
    <p v-else>Aucun résultat corréspondant</p>
  </div>
  <div v-else class="q-gutter-lg flex wrap q-mt-xl">
    <Order class="self-start" v-for="order in $orderStore.orders" :order="order" :key="order._id" />
  </div>
  <q-page-sticky expand position="top" class="bg-grey-1">
    <q-toolbar class="q-px-xs flex flex-center">
      <q-input
        debounce="500"
        dense
        standout
        outlined
        rounded
        v-model="text"
        input-class="text-center text-bold "
        class="fit"
        style="max-width: 48em; border-radius: 24px"
        placeholder="ex: référence, numéro,etc..."
      >
        <template v-slot:append>
          <q-icon v-if="text === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
        </template>
      </q-input>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup lang="ts">
import Order from '@/components/Order.vue'
import { useOrderStore } from '@/stores/order.store'
import type { IOrder, IPayment } from '@/Types/Interfaces'
import { ref, watch } from 'vue'

const $orderStore = useOrderStore()
const searchResult = ref<IOrder[]>([])
const text = ref<string>('')

watch(
  () => text.value.trim(),
  () => {
    searchResult.value = $orderStore.orders.filter(
      (o) =>
        (o.payment as IPayment).paymentRef
          .toLocaleLowerCase()
          .includes(text.value.trim().toLocaleLowerCase()) || o.contact.includes(text.value.trim()),
    )
  },
)
</script>
