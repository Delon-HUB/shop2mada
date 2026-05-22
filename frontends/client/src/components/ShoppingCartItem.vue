<template>
  <div class="items">
    <q-item class="text-bold fit">
      <q-item-section>
        <q-item-label>{{ article.name }} </q-item-label>
        <q-item-label caption> {{ article.price }} ar </q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="text-bold" style="max-width: 180px">
      <q-item-label>
        <q-input
          input-class="text-center"
          type="number"
          outlined
          v-model="props.article.quantity"
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
                  props.article.quantity && props.article.quantity > 1
                    ? props.article.quantity--
                    : (props.article.quantity = 1)
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
                  props.article.quantity != undefined
                    ? props.article.quantity++
                    : (props.article.quantity = 1)
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
        @click="() => $shoppingCartStore.remove(article.id)"
      />
    </q-item>
  </div>
</template>

<script setup lang="ts">
import { type IArticle } from '@shared/Types/Interfaces'
import { useShoppingCartStore } from '@/stores/ShoppingCartStore'

const props = defineProps<{
  article: IArticle & { quantity: number }
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
