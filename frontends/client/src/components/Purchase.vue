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
              :active="paymentMethod == 'MVOLA'"
              @click="() => (paymentMethod = 'MVOLA')"
            >
              <q-card
                bordered
                :style="paymentMethod == 'MVOLA' ? 'border: 2px solid #05668d' : ''"
                flat
                style="width: 9em"
                class="q-pa-xs text-center"
              >
                <q-item-section>
                  <q-item-label class="text-center">
                    <q-avatar rounded size="64px">
                      <img
                        src="https://mvola-telma.en.aptoide.com/_next/image?url=https://cdn.aptoide.com/imgs/0/c/d/0cd0c68fb872f077c7204bbdddb3fdc0_icon.png&w=3840&q=75"
                      />
                    </q-avatar>
                  </q-item-label>
                  <q-item-label>MVola</q-item-label>
                </q-item-section>
              </q-card>
            </q-item>

            <q-item
              clickable
              v-ripple
              class="bg-grey-3 q-ma-xs q-pa-none"
              :active="paymentMethod == 'ORANGE_MONEY'"
              @click="() => (paymentMethod = 'ORANGE_MONEY')"
            >
              <q-card
                bordered
                :style="paymentMethod == 'ORANGE_MONEY' ? 'border: 2px solid #05668d' : ''"
                flat
                style="width: 9em"
                class="q-pa-xs text-center"
              >
                <q-item-section>
                  <q-item-label class="text-center">
                    <q-avatar rounded size="64px">
                      <img
                        src="https://i.pinimg.com/originals/3b/d8/bd/3bd8bdd06c49b4c19aee3a167c5a83cb.jpg"
                      />
                    </q-avatar>
                  </q-item-label>
                  <q-item-label>Orange Money</q-item-label>
                </q-item-section>
              </q-card>
            </q-item>

            <q-item
              clickable
              v-ripple
              class="bg-grey-3 q-ma-xs q-pa-none"
              :active="paymentMethod == 'AIRTEL_MONEY'"
              @click="() => (paymentMethod = 'AIRTEL_MONEY')"
            >
              <q-card
                bordered
                :style="paymentMethod == 'AIRTEL_MONEY' ? 'border: 2px solid #05668d' : ''"
                flat
                style="width: 9em"
                class="q-pa-xs text-center"
              >
                <q-item-section>
                  <q-item-label class="text-center">
                    <q-avatar rounded size="64px">
                      <img
                        src="https://www.agenceecofin.com/images/2017/05/04/airtel_madagascar.png"
                      />
                    </q-avatar>
                  </q-item-label>
                  <q-item-label>Airtel Money</q-item-label>
                </q-item-section>
              </q-card>
            </q-item>
          </div>

          <div>
            <q-card bordered flat class="bg-grey-3" style="border: 2px dashed grey">
              <p class="text-bold q-mx-xs q-mt-xs">Envoyer l'argent:</p>
              <ul class="q-ma-none">
                <li>
                  Via :
                  <q-chip class="text-bold"
                    ><q-avatar>
                      <img
                        src="https://mvola-telma.en.aptoide.com/_next/image?url=https://cdn.aptoide.com/imgs/0/c/d/0cd0c68fb872f077c7204bbdddb3fdc0_icon.png&w=3840&q=75"
                      /> </q-avatar
                    >MVola</q-chip
                  >
                </li>
                <li>Sur le numéro: <q-chip class="text-bold"> 034 12 345 67</q-chip></li>
                <li>Nom du compte: <q-chip class="text-bold"> RAKOTO jean</q-chip></li>
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
            <q-input rounded outlined v-model="text" label="Référence de la transaction">
              <template v-slot:prepend>
                <q-icon name="receipt" />
              </template>
            </q-input>
          </p>
        </q-card>

        <q-footer class="bg-white">
          <p class="q-ma-md">
            <q-btn no-caps color="blue" class="fit">Confirmer ma commande</q-btn>
          </p>
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'
import { ref } from 'vue'

const $shoppingCartStore = useShoppingCartStore()
const model = defineModel<boolean>()
const paymentMethod = ref<'MVOLA' | 'AIRTEL_MONEY' | 'ORANGE_MONEY'>()
const text = ref()
</script>

<style scoped>
.q-header {
  margin: auto;
  background-color: #05668d;
  border-radius: 0px;
}
</style>
