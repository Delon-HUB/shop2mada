<template>
  <q-card flat class="q-pa-md">
    <q-item>
      <q-item-section>
        <q-item-label class="q-mb-md text-bold">Recette mensuelle</q-item-label> </q-item-section
      ><q-item-section>
        <q-item-label class="text-right q-mb-md text-bold">2026</q-item-label>
      </q-item-section>
    </q-item>
    <canvas id="myChart" class="graph"></canvas>
  </q-card>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import { onMounted, watch } from 'vue'

const props = defineProps<{ data: number[] }>()

onMounted(() => {
  const labels = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Aoû',
    'Sep',
    'Oct',
    'Nov',
    'Déc',
  ]
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Recette',
        data: props.data,
        borderWidth: 1.5,
      },
    ],
  }
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }

  const chart = new Chart(document.getElementById('myChart') as HTMLCanvasElement, {
    type: 'bar',
    data: data,
    options: config.options,
  })

  watch(
    () => props.data,
    (newData) => {
      chart.data = {
        labels: labels,
        datasets: [
          {
            label: 'Recette',
            data: newData,
            borderWidth: 1.5,
          },
        ],
      }
      chart.update()
    },
  )
})
</script>

<style scoped lang="css">
.graph {
  width: 100%;
  max-height: 400px;
}
</style>
