<template>
  <q-card class="my-card text-center" flat bordered :class="$q.screen.lt.md ? 'my-card fit' : ''">
    <q-card-section class="q-mb-none q-pa-none q-pt-md">
      <p>
        <q-avatar size="64px">
          <img :src="props.paymentMethod.cover" />
        </q-avatar>
      </p>
      <p class="text-bold">
        {{ props.paymentMethod.name }}
      </p>
      <p class="text-grey">
        <q-toggle
          :label="paymentMethodTmp.activate ? 'Disponible' : 'Indisponible'"
          color="primary"
          v-model="paymentMethodTmp.activate"
        />
      </p>
    </q-card-section>

    <q-card-section class="q-ma-none q-pb-none">
      <div v-if="editMode">
        <p>
          <q-input
            outlined
            v-model="paymentMethodTmp.phone"
            label="Numéro téléphone"
            class="q-mb-md"
          />
        </p>
        <p>
          <q-input
            outlined
            v-model="paymentMethodTmp.account_name"
            label="Nom du compte associé"
            class="q-mb-md"
          />
        </p>
      </div>
      <div v-else>
        <div style="font-size: large">
          <p>{{ props.paymentMethod.phone }}</p>
          <p>{{ props.paymentMethod.account_name }}</p>
        </div>
        <p style="font-size: x-small" class="text-grey">
          Dérnière modification
          {{ new Date(props.paymentMethod.updatedAt).toLocaleDateString() }}
        </p>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat no-caps color="primary" @click="updatePaymentMethod" v-if="showBtnSave"
        >Enregistrer</q-btn
      >
      <q-btn
        flat
        no-caps
        @click="editMode = !editMode"
        :label="editMode ? 'Annuler' : 'Modifier'"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { usePaymentMethodStore } from '@/stores/paymentMethod.store'
import type { IPaymentMethod } from '@/Types/Interfaces'
import { computed, ref, watch } from 'vue'

const $paymentMethodStore = usePaymentMethodStore()
const props = defineProps<{ paymentMethod: IPaymentMethod }>()
const editMode = ref<boolean>(false)

const paymentMethodTmp = ref<Partial<IPaymentMethod>>({
  phone: props.paymentMethod.phone,
  account_name: props.paymentMethod.account_name,
  activate: props.paymentMethod.activate,
})

const showBtnSave = computed(
  () =>
    paymentMethodTmp.value.account_name != props.paymentMethod.account_name ||
    paymentMethodTmp.value.phone != props.paymentMethod.phone ||
    paymentMethodTmp.value.activate != props.paymentMethod.activate,
)

watch(
  () => editMode.value,
  () => {
    paymentMethodTmp.value = {
      phone: props.paymentMethod.phone,
      account_name: props.paymentMethod.account_name,
      activate: props.paymentMethod.activate,
    }
  },
)

watch(
  () => props.paymentMethod,
  () =>
    (paymentMethodTmp.value = {
      phone: props.paymentMethod.phone,
      account_name: props.paymentMethod.account_name,
      activate: props.paymentMethod.activate,
    }),
)

const updatePaymentMethod = () => {
  $paymentMethodStore.update(props.paymentMethod._id, paymentMethodTmp.value)
  editMode.value = false
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
