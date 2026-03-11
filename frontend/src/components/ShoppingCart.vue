<template>
  <q-card flat bordered class="fit">
    <q-card-section class="q-pt-none" style="position: sticky; top: 0">
      <q-item class="q-pa-none">
        <q-item-section>
          <q-item-label class="text-bold text-h6"
            ><q-icon name="shopping_cart" color="blue" />Panier</q-item-label
          >
        </q-item-section>
        <q-space />
        <q-item-section>
          <q-item-label class="text-right"
            ><q-btn flat icon-right="delete" color="red"
          /></q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-list bordered>
        <q-item v-for="i in 20" clickable v-ripple>
          <q-item-section>Single line item</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions align="center" style="position: absolute; bottom: 0; left: 0; right: 0">
      <q-btn no-caps color="blue" class="fit">Acheter</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts"></script>
