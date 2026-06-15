<template>
  <div class="row justify-center q-gutter-sm otp-container">
    <q-input
      v-for="(digit, index) in otp"
      :key="index"
      v-model="otp[index]"
      type="tel"
      mask="#"
      maxlength="1"
      outlined
      dense
      input-class="text-center text-h6 text-bold"
      class="otp-input"
      @update:model-value="onInput(index)"
      @keydown.backspace="onBackspace(index, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const otp = ref<string[]>(Array(4).fill(''))
let modelValue = defineModel<string>('modelValue', { default: '' })

const computedOtp = computed({
  get: () => otp.value,
  set: (val: string) => {
    modelValue.value = val
  },
})

const onInput = (index: number) => {
  const inputElements = document.querySelectorAll<HTMLInputElement>('.otp-input input')

  if (otp.value[index] && index < otp.value.length - 1) {
    inputElements[index + 1]?.focus()
  }
  computedOtp.value = otp.value.join('')
}

const onBackspace = (index: number, event: KeyboardEvent) => {
  if (!otp.value[index] && event.key === 'Backspace' && index > 0) {
    const inputElements = document.querySelectorAll<HTMLInputElement>('.otp-input input')
    inputElements[index - 1]?.focus()
  }
}

onMounted(() => {
  const inputElements = document.querySelectorAll<HTMLInputElement>('.otp-input input')
  inputElements[0]?.focus()
})
</script>

<style scoped>
.otp-container {
  flex-wrap: wrap;
  max-width: 400px;
  margin: auto;
}

.otp-input {
  width: 50px;
  height: 50px;
}

@media (max-width: 600px) {
  .otp-input {
    width: 50px;
    height: 50px;
  }
}
</style>
