<template>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <q-item-label header>Contacts</q-item-label>

      <q-item v-ripple @click="openFacebook">
        <q-item-section avatar top>
          <q-avatar icon="facebook" text-color="primary" size="64px" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Facebook</q-item-label>
          <p v-if="editFacebook">
            <q-input
              outlined
              v-model="facebook"
              label="Coller ici le lien de vôtre profile facebook"
              class="q-mb-md"
            />
          </p>
          <q-item-label caption v-else>{{ facebook }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="flex row">
            <p v-if="editFacebook">
              <q-btn icon="check" color="positive" flat @click="" />
            </p>
            <p>
              <q-btn
                :icon="editFacebook ? 'close' : 'edit'"
                flat
                @click="editFacebook = !editFacebook"
              />
            </p>
          </div>
        </q-item-section>
      </q-item>

      <q-item v-ripple @click="openWhatsapp">
        <q-item-section avatar top>
          <q-avatar icon="call" text-color="green" size="64px" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Watsapp</q-item-label>
          <p v-if="editWhatsapp">
            <q-input
              outlined
              v-model="whatsapp"
              label="entrer votre numéro whatsapp"
              class="q-mb-md"
              mask="### ## ### ##"
            />
          </p>
          <q-item-label v-else caption>{{ whatsapp }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="flex row">
            <p v-if="editWhatsapp">
              <q-btn icon="check" flat @click="" color="positive" />
            </p>
            <p>
              <q-btn
                :icon="editWhatsapp ? 'close' : 'edit'"
                flat
                @click="editWhatsapp = !editWhatsapp"
              />
            </p>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const editFacebook = ref<boolean>(false)
const editWhatsapp = ref<boolean>(false)
const facebook = ref<string>('https://www.facebook.com/delon.nicolas.2026')
const whatsapp = ref<string>('034 27 900 37')

const openWhatsapp = () => {
  window.open(`https://wa.me/${whatsapp.value}`, '_blank')
}

const openFacebook = () => {
  window.open(facebook.value, '_blank')
}
</script>
