<template>
  <div class="items">
    <q-item class="text-bold fit">
      <q-item-section>
        <q-item-label>{{ (orderItem.article as IArticle).name }} </q-item-label>
        <q-item-label caption> {{ (orderItem.article as IArticle).price }} ar </q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="text-bold" style="max-width: 180px">
      <q-item-label>
        <q-input
          input-class="text-center"
          type="number"
          outlined
          v-model="props.orderItem.quantity"
          min="1"
        >
          <template v-slot:prepend>
            <q-btn
              rounded
              dense
              flat
              icon="remove"
              color="grey"
              class="bg-grey-3"
              @click="
                () =>
                  props.orderItem.quantity && props.orderItem.quantity > 1
                    ? props.orderItem.quantity--
                    : (props.orderItem.quantity = 1)
              "
            />
          </template>
          <template v-slot:append>
            <q-btn
              rounded
              dense
              flat
              icon="add"
              color="blue"
              class="bg-light-blue-1"
              @click="
                () =>
                  props.orderItem.quantity != undefined
                    ? props.orderItem.quantity++
                    : (props.orderItem.quantity = 1)
              "
            /> </template
        ></q-input>
      </q-item-label>
    </q-item>
    <q-item class="text-center">
      <q-btn
        icon="backspace"
        color="red-3"
        rounded
        dense
        flat
        @click="() => $shoppingCartStore.remove((orderItem.article as IArticle).id)"
      />
    </q-item>
  </div>
</template>

<script setup lang="ts">
import { type IArticle, type IOrderItem } from '@shared/Types/Interfaces'
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'

const props = defineProps<{
  orderItem: IOrderItem
}>()

const $shoppingCartStore = useShoppingCartStore()
</script>

<style scoped lang="css">
.q-item,
.q-item-label {
  padding: 4px;
}

.items {
  display: flex;
  justify-content: flex-end;
}
</style>
