<template>
  <q-card class="my-card" flat bordered :class="$q.screen.lt.md ? 'my-card fit' : ''">
    <q-card-section>
      <p class="absolute text-bold" style="top: 0; right: 12px; transform: translateY(-50%)">
        <q-chip class="q-mx-none"
          >{{ new Date(props.order.createdAt).toLocaleDateString() }}
          {{ new Date(props.order.createdAt).toLocaleTimeString() }}</q-chip
        >
      </p>

      <div class="flex row q-gutter-sm">
        <p>
          <q-avatar size="32px">
            <img
              :src="((props.order.payment as IPayment).paymentMethod as IPaymentMethod).cover"
            /> </q-avatar
          ><span class="text-bold text-grey">{{
            ((props.order.payment as IPayment).paymentMethod as IPaymentMethod).name
          }}</span>
        </p>
        <q-space />
        <p class="text-h6 ellipsis">{{ payment.amount }}</p>
      </div>
      <p class="text-center">
        <q-chip class="fit">#Ref: {{ payment.paymentRef }}</q-chip>
      </p>
    </q-card-section>

    <q-card-section class="q-ma-none">
      <p>
        <q-select v-model="selectedPaymentStatus" :options="paymentStatusOptions" borderless>
          <template v-slot:selected>
            Statut de paiment:
            <q-chip
              v-if="selectedPaymentStatus"
              :color="paymentStatusColor"
              text-color="white"
              class="q-my-none q-ml-xs q-mr-none"
            >
              {{ selectedPaymentStatus }}
            </q-chip>
          </template>
        </q-select>
      </p>
      <p>
        <q-select v-model="selectedDeliveryStatus" :options="deliveryStatusOptions" borderless>
          <template v-slot:selected>
            Statut de livraison:
            <q-chip
              v-if="selectedDeliveryStatus"
              :color="deliveryStatusColor"
              text-color="white"
              class="q-my-none q-ml-xs q-mr-none"
            >
              {{ selectedDeliveryStatus }}
            </q-chip>
          </template>
        </q-select>
      </p>
      <p class="text-center q-ma-none q-pa-none" v-show="showBtnSave">
        <q-btn
          color="primary"
          rounded
          no-caps
          outline
          class="q-pa-none q-ma-none fit"
          label="Mettre à jour"
          @click="updateStatus"
        />
      </p>
    </q-card-section>

    <q-expansion-item
      icon="shopping_bag"
      :label="`Plus de détails `"
      :caption="`${props.order.orderItems.length} article(s)`"
    >
      <q-slide-transition>
        <div>
          <q-separator />
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab no-caps name="shop" label="Commande(s)" icon="shop" />
            <q-tab no-caps name="player" label="Joueur" icon="person" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="shop">
              <q-list>
                <div v-for="item in orderItems">
                  <q-item class="text-bold fit q-ma-none q-py-none">
                    <q-item-section>
                      <q-item-label>{{ item.name }} </q-item-label>
                      <q-item-label caption>P.U: {{ item.unitPrice }} ar </q-item-label>
                    </q-item-section>
                    <q-space />
                    <q-item-section class="text-right">
                      <q-item-label>{{ item.unitPrice * item.quantity }} ar </q-item-label>
                      <q-item-label caption>Qté: {{ item.quantity }} </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-ma-none q-py-none text-subtitle2" v-if="item.description">
                    <q-item-section>
                      <q-item-label>description: {{ item.description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                </div>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="player">
              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="grey" name="gamepad" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ props.order.playerId }}</q-item-label>
                    <q-item-label caption>ID du joueur</q-item-label>
                  </q-item-section>
                  <q-space />
                  <q-item-section class="text-right">
                    <q-item-label
                      ><q-btn
                        icon="content_copy"
                        flat
                        dense
                        color="primary"
                        @click="copyToClipboard(props.order.playerId)"
                    /></q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="grey" name="person" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ props.order.nickname }}</q-item-label>
                    <q-item-label caption>Pseudo</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="grey" name="call" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ props.order.contact }}</q-item-label>
                    <q-item-label caption>Contact</q-item-label>
                  </q-item-section>
                  <q-space />
                  <q-item-section class="text-right">
                    <q-item-label
                      ><q-btn
                        icon="content_copy"
                        flat
                        dense
                        color="primary"
                        @click="copyToClipboard(props.order.contact)"
                    /></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-slide-transition>
    </q-expansion-item>
  </q-card>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/order.store'
import { EDeliveryStatus, EPaymentStatus } from '@/Types/Enums'
import type { IOrderItem, IOrder, IPayment, IPaymentMethod } from '@/Types/Interfaces'
import { copyToClipboard } from 'quasar'
import { computed, ref } from 'vue'

const tab = ref<string>('shop')
const props = defineProps<{ order: IOrder }>()
const payment = computed<IPayment>(() => props.order.payment as IPayment)
const orderItems = ref<IOrderItem[]>(props.order.orderItems)

const paymentStatusOptions = ref<EPaymentStatus[]>(Object.values(EPaymentStatus))
const selectedPaymentStatus = ref<EPaymentStatus>(payment.value.paymentStatus)

const deliveryStatusOptions = ref<EDeliveryStatus[]>(Object.values(EDeliveryStatus))
const selectedDeliveryStatus = ref<EDeliveryStatus>(props.order.deliveryStatus)

const colorStatus = (status: EPaymentStatus | EDeliveryStatus): string => {
  switch (status) {
    case EPaymentStatus.PENDING:
      return 'orange'
    case EPaymentStatus.FAILED:
      return 'red'
    case EPaymentStatus.PAID:
      return 'green'
    case EPaymentStatus.REFUNDED:
      return 'red'
    case EDeliveryStatus.CANCELLED:
      return 'red'
    case EDeliveryStatus.DELIVERED:
      return 'green'
    default:
      return 'white'
  }
}

const paymentStatusColor = computed(() => colorStatus(selectedPaymentStatus.value))
const deliveryStatusColor = computed(() => colorStatus(selectedDeliveryStatus.value))

const showBtnSave = computed<'PAYMENT' | 'DELIVERY' | 'PAYMENT_DELIVERY' | undefined>(() =>
  payment.value.paymentStatus != selectedPaymentStatus.value &&
  props.order.deliveryStatus != selectedDeliveryStatus.value
    ? 'PAYMENT_DELIVERY'
    : props.order.deliveryStatus != selectedDeliveryStatus.value
      ? 'DELIVERY'
      : payment.value.paymentStatus != selectedPaymentStatus.value
        ? 'PAYMENT'
        : undefined,
)

const $orderStore = useOrderStore()
const updateStatus = async () => {
  if (showBtnSave.value == 'PAYMENT_DELIVERY') {
    const pUpdated = await $orderStore.updatedPaymentStatus(payment.value._id, {
      paymentStatus: selectedPaymentStatus.value,
    })
    props.order.payment = {
      ...payment.value,
      paymentStatus: pUpdated.paymentStatus,
      updatedAt: pUpdated.updatedAt,
    }

    const oUpdated = await $orderStore.updatedDeliveryStatus(props.order._id, {
      deliveryStatus: selectedDeliveryStatus.value,
    })
    props.order.deliveryStatus = oUpdated.deliveryStatus
    props.order.updatedAt = oUpdated.updatedAt
  } else if (showBtnSave.value == 'PAYMENT') {
    const pUpdated = await $orderStore.updatedPaymentStatus(payment.value._id, {
      paymentStatus: selectedPaymentStatus.value,
    })
    props.order.payment = {
      ...payment.value,
      paymentStatus: pUpdated.paymentStatus,
      updatedAt: pUpdated.updatedAt,
    }
  } else if (showBtnSave.value == 'DELIVERY') {
    const pUpdated = await $orderStore.updatedDeliveryStatus(props.order._id, {
      deliveryStatus: selectedDeliveryStatus.value,
    })
    props.order.deliveryStatus = pUpdated.deliveryStatus
    props.order.updatedAt = pUpdated.updatedAt
  }
}
</script>

<style scoped lang="css">
.my-card {
  width: fit-content;
  min-width: 340px;
}

p {
  margin: 0px;
  padding: 0px;
}
</style>
