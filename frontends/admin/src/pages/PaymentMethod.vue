<template>
  <div class="q-gutter-md flex items-start wrap">
    <MobileMoney
      v-for="pm in $paymentMethodStore.paymentMethods"
      :payment-method="pm"
      :key="pm.id"
    />
  </div>
</template>

<script setup lang="ts">
import MobileMoney from '@/components/MobileMoney.vue'
import { usePaymentMethodStore } from '@/stores/paymentMethod.store'

const $paymentMethodStore = usePaymentMethodStore()
</script>
