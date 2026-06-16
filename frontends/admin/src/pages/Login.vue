<template>
  <q-card bordered flat style="width: fit-content">
    <q-card-section class="text-center">
      <div class="text-bold q-mb-lg">S'authentifier</div>
      <p v-if="displayError" class="text-negative">{{ errorMessage }}</p>
      <q-form>
        <q-input
          color="green"
          class="q-mb-md"
          outlined
          rounded
          v-model="userCredential.email"
          type="email"
          label="Votre email"
          :debounce="1_000"
          :rules="[
            () =>
              /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(
                userCredential.email || '',
              ) || 'Veuillez entrer une adresse e-mail valide',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          color="green"
          rounded
          outlined
          type="password"
          v-model="userCredential.password"
          label="Votre mot de passe"
        >
          <template v-slot:prepend>
            <q-icon name="key" />
          </template>
        </q-input>

        <div class="row">
          <div>
            <q-checkbox v-model="forgiveMe" label="se souvenir de moi" color="teal" />
          </div>
          <div>
            <q-btn no-caps flat class="text-red" label="Mot de passe oublié" />
          </div>
        </div>
        <div class="q-my-md">
          <q-btn
            size="1.2em"
            no-caps
            flat
            rounded
            class="fit text-white text-bold bg-primary"
            v-on:click="loginHandler(userCredential)"
            :loading="loading"
            :disable="!canSend"
            >Se connecter</q-btn
          >
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/Auth.store'
import type { IUser } from '@/Types/Interfaces'
import { computed, reactive, ref, watch } from 'vue'

const canSend = computed(() =>
  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(userCredential.email || ''),
)
const loading = ref<boolean>(false)
const userCredential = reactive<Partial<IUser>>({
  email: '',
  password: '',
})
const forgiveMe = ref<boolean>(false)

const $authStore = useAuthStore()
const errorMessage = computed<string>(() => $authStore.ERROR_MESSAGE)
const displayError = ref<boolean>(false)

const loginHandler = async (userCredential: Partial<IUser>) => {
  loading.value = true
  try {
    const { accessToken, verified } = await (await $authStore.login(userCredential)).data
    $authStore.setEmail(userCredential.email!.trim())
    $authStore.setToken(accessToken)
    if (verified) router.push({ path: '/' })
    else router.push({ path: '/auth/verify-identity' })
  } catch (error) {
    displayError.value = true
  }
  loading.value = false
}

watch(
  () => displayError.value,
  (newVal) => {
    if (newVal) {
      setTimeout(() => (displayError.value = false), 3_000)
    }
  },
)
</script>
