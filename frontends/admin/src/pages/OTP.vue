<template>
  <q-card bordered flat class="card">
    <q-card-section class="text-center">
      <div class="text-h6 text-bold q-mb-lg">Vérification d'identité</div>
      <div>
        <div>
          <p>
            Entrez le code reçu par e-mail pour continuer. Si vous ne le voyez pas, vérifiez vos
            spams ou réessayez plus tard.
          </p>
        </div>
        <p><o-t-p v-model="otp" :length="4" /></p>
        <div class="q-my-lg">
          <p>
            <q-btn
              size="1.2em"
              no-caps
              flat
              rounded
              class="fit text-white bg-primary"
              :loading="verifying"
              :disabled="otp.length < 4"
              @click="verifyOTP()"
              >Vérifier</q-btn
            >
          </p>
        </div>
        <div>
          Vous n'avez pas reçu de code ?
          <span v-if="counter === 0"
            ><q-btn
              no-caps
              flat
              class="text-red"
              label="renvoyer"
              @click="resendOTP"
              :loading="resending"
            />
          </span>
          <span v-else style="color: red">
            {{ counter >= 60 ? `${Math.floor(counter / 60)}min ${counter % 60}s` : `${counter}s` }}
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import OTP from '@/components/OTP.vue'
import { useAuthStore } from '@/stores/Auth.store'
import { ref } from 'vue'

const verifying = ref<boolean>(false)
const resending = ref<boolean>(false)

const counter = ref<number>(0)
const otp = ref<string>('')

const $authStore = useAuthStore()
const verifyOTP = async () => {
  verifying.value = true
  try {
    await $authStore.verifyOTP($authStore.email, otp.value)
  } catch (error) {
    console.error(error)
  }
  verifying.value = false
}

const resendOTP = async () => {
  resending.value = true
  try {
    await $authStore.resendOTP($authStore.email)
    counter.value = 90
    const interval = setInterval(() => {
      if (counter.value > 0) counter.value--
      else clearInterval(interval)
    }, 1000)
  } catch (error) {
    console.error(error)
  }
  resending.value = false
}
</script>
