<template>
  <q-card flat bordered class="flex flex-center justify-between">
    <q-card flat class="rounded-borders q-pa-md">
      <q-item-label overline class="text-center q-mb-md"
        ><q-icon name="payments" color="primary" size="24px" />
        <span style="font-size: 1.2rem">Paiements</span></q-item-label
      >
      <div class="q-gutter-md flex flex-center">
        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section class="text-center text-bold">
              <q-item-label>
                <q-knob
                  show-value
                  class="q-ma-md"
                  v-model="payments.filter((p) => p.paymentStatus == EPaymentStatus.PENDING).length"
                  size="50px"
                  :thickness="0.5"
                  :max="payments.length"
                  :min="0"
                  readonly
                  color="orange"
                />
              </q-item-label>
              <q-item-label overline>En attente</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section class="text-center text-bold">
              <q-item-label
                ><q-knob
                  show-value
                  class="q-ma-md"
                  v-model="payments.filter((p) => p.paymentStatus == EPaymentStatus.PAID).length"
                  size="50px"
                  :thickness="0.5"
                  :max="payments.length"
                  :min="0"
                  readonly
                  color="positive"
              /></q-item-label>
              <q-item-label overline>Payé</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section class="text-center text-bold">
              <q-item-label
                ><q-knob
                  show-value
                  class="q-ma-md"
                  v-model="payments.filter((p) => p.paymentStatus == EPaymentStatus.FAILED).length"
                  size="50px"
                  :thickness="0.5"
                  :max="payments.length"
                  :min="0"
                  readonly
                  color="negative"
              /></q-item-label>
              <q-item-label overline>Échoué</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section class="text-center text-bold">
              <q-item-label
                ><q-knob
                  show-value
                  class="q-ma-md"
                  v-model="
                    payments.filter((p) => p.paymentStatus == EPaymentStatus.REFUNDED).length
                  "
                  size="50px"
                  :thickness="0.5"
                  :max="payments.length"
                  :min="0"
                  readonly
                  color="grey"
              /></q-item-label>
              <q-item-label overline>Remboursé</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </q-card>

    <q-card flat class="rounded-borders q-pa-md">
      <q-item-label overline class="text-center q-mb-md"
        ><q-icon name="local_shipping" color="primary" size="24px" />
        <span style="font-size: 1.2rem">Livraisons</span></q-item-label
      >
      <div class="q-gutter-md flex flex-center">
        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section class="text-center text-bold">
              <q-item-label
                ><q-knob
                  show-value
                  class="q-ma-md"
                  v-model="
                    $orderStore.orders.filter((o) => o.deliveryStatus == EDeliveryStatus.PENDING)
                      .length
                  "
                  size="50px"
                  :thickness="0.5"
                  :max="$orderStore.orders.length"
                  :min="0"
                  color="orange"
              /></q-item-label>
              <q-item-label overline>En attente</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section class="text-center text-bold">
              <q-item-label
                ><q-knob
                  show-value
                  class="q-ma-md"
                  v-model="
                    $orderStore.orders.filter((o) => o.deliveryStatus == EDeliveryStatus.DELIVERED)
                      .length
                  "
                  size="50px"
                  :thickness="0.5"
                  :max="$orderStore.orders.length"
                  :min="0"
                  color="positive"
              /></q-item-label>
              <q-item-label overline>Livré</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section class="text-center text-bold">
              <q-item-label
                ><q-knob
                  show-value
                  class="q-ma-md"
                  v-model="
                    $orderStore.orders.filter((o) => o.deliveryStatus == EDeliveryStatus.CANCELLED)
                      .length
                  "
                  size="50px"
                  :thickness="0.5"
                  :max="$orderStore.orders.length"
                  :min="0"
                  color="negative"
              /></q-item-label>
              <q-item-label overline>Annulé</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </q-card>
  </q-card>

  <q-card class="q-my-md" bordered flat>
    <Chart :data="getData" />
  </q-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Chart from '@/components/Chart.vue'
import { useOrderStore } from '@/stores/order.store'
import type { IPayment } from '@/Types/Interfaces'
import { EDeliveryStatus, EPaymentStatus } from '@/Types/Enums'

const $orderStore = useOrderStore()
const payments = computed(() => $orderStore.orders.map((o) => o.payment as IPayment))

const getData = computed<number[]>((): number[] => {
  const currentYear = new Date(Date.now()).getFullYear()
  const data: number[] = new Array(12).fill(0)
  const paids = payments.value.filter(
    (p) =>
      p.paymentStatus == EPaymentStatus.PAID && new Date(p.createdAt).getFullYear() == currentYear,
  )
  paids.forEach((p) => {
    const month = new Date(p.updatedAt).getMonth()
    data[month]! += p.amount
  })

  return data
})
</script>

<style scoped lang="css">
.my-card {
  max-width: 200px;
}
</style>
