<template>
  <q-layout view="hHr lpR fFr" container class="bg-white">
    <q-header>
      <q-toolbar>
        <q-item-label class="text-bold text-h6" flat no-caps
          ><q-icon name="payments" />Paiement</q-item-label
        >
        <q-space />
        <q-btn flat rounded v-close-popup icon="close" @click="() => (model = false)" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-card flat class="text-black">
          <p class="text-bold">1. Choisissez le mode de paiement</p>
          <div class="flex row wrap justify-start q-mb-md text-caption">
            <q-item
              clickable
              v-ripple
              class="bg-grey-3 q-ma-xs q-pa-none"
              @click="() => ($shoppingCartStore.lastSelectedPaymentMethod = pm)"
              v-for="pm in paymentMethods"
              :key="pm._id"
              :active="selectedPaymentMethod?._id == pm._id"
              :style="selectedPaymentMethod?._id == pm._id ? 'border: 2px solid #05668d' : ''"
            >
              <q-card bordered flat style="width: 9em" class="q-pa-xs text-center">
                <q-item-section>
                  <q-item-label class="text-center">
                    <q-avatar rounded size="64px">
                      <img :src="pm.cover" />
                    </q-avatar>
                  </q-item-label>
                  <q-item-label>{{ pm.name }}</q-item-label>
                </q-item-section>
              </q-card>
            </q-item>
          </div>

          <div v-if="selectedPaymentMethod">
            <q-card bordered flat class="bg-grey-3" style="border: 2px dashed grey">
              <p class="text-bold q-mx-xs q-mt-xs">Envoyer l'argent:</p>
              <ul class="q-ma-none">
                <li>
                  Via :
                  <q-chip class="text-bold"
                    ><q-avatar> <img :src="selectedPaymentMethod?.cover" /> </q-avatar
                    >{{ selectedPaymentMethod?.name }}</q-chip
                  >
                </li>
                <li>
                  Sur le numéro:
                  <q-chip class="text-bold"> {{ selectedPaymentMethod?.phone }}</q-chip>
                </li>
                <li>
                  Nom du compte:
                  <q-chip class="text-bold"> {{ selectedPaymentMethod?.account_name }}</q-chip>
                </li>
                <li>
                  Montant à payer:
                  <q-chip class="text-bold"> {{ $shoppingCartStore.getTotal() }} Ar</q-chip>
                </li>
              </ul>
            </q-card>
          </div>
        </q-card>

        <q-card flat class="text-black q-mt-md">
          <p class="text-bold">2. Confirmation du paiement</p>
          <p class="text-caption">
            Veuillez entrer la référence de votre transaction pour confirmer le paiement.
          </p>
          <p>
            <q-input rounded outlined v-model="paymentRef" label="Référence de la transaction">
              <template v-slot:prepend>
                <q-icon name="receipt" />
              </template>
            </q-input>
          </p>
        </q-card>

        <q-footer class="bg-white">
          <p class="q-ma-md">
            <q-btn
              no-caps
              color="blue"
              class="fit"
              @click="
                () => {
                  emits('finished', paymentRef)
                  model = false
                }
              "
              >Confirmer ma commande</q-btn
            >
          </p>
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import type { IPaymentMethod } from '@shared/Types/Interfaces'
import { computed, ref } from 'vue'

const emits = defineEmits(['finished'])
const $shoppingCartStore = useShoppingCartStore()
$shoppingCartStore.init()
const model = defineModel<boolean>()
const paymentMethods = computed<IPaymentMethod[]>(() => $shoppingCartStore.paymentMethods || [])
const selectedPaymentMethod = computed<IPaymentMethod | null>(
  () => $shoppingCartStore.lastSelectedPaymentMethod || null,
)

const paymentRef = ref()
</script>

<style scoped>
.q-header {
  margin: auto;
  background-color: #05668d;
  border-radius: 0px;
}
</style>
