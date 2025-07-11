<template>
  <apexchart type="bar" height="280" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// IMPORTANT: ensure vue3-apexcharts & apexcharts are installed: npm i apexcharts vue3-apexcharts
// @ts-ignore - vue3-apexcharts may not have TS declarations in the project yet
import VueApexCharts from 'vue3-apexcharts'

// Register globally if not done elsewhere
// (in main.ts you can app.use(ApexCharts))

const series = ref([
  {
    name: 'Revenue (THB)',
    data: [12000, 15000, 18000, 22000, 25000, 21000, 23000, 24000, 26000, 28000, 30000, 32000]
  }
])

const chartOptions = ref({
  chart: {
    toolbar: { show: false }
  },
  xaxis: {
    categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  },
  colors: ['#3b82f6'],
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString()
    }
  }
})
</script> 