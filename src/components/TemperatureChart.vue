<template>
  <LineChart :chartData="nextDaysChartData" :options="optionsChart" class="line-chart" />
</template>

<script>
import { ref, computed } from 'vue'
import { store } from '../store/store.js'

import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(...registerables, ChartDataLabels);

export default {
  name: 'TemperatureChart',
  components: {
    LineChart,
  },
  setup() {    
    let chartTemperatures = computed(() => store.nextDays.map(a => a.temp.day));

    let chartDays = computed(() => store.nextDays.map(a => a.dayname));

    let optionsChart = ref({
      responsive: true,
      layout: {
        padding: {
          top: 40,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
        datalabels: {
          align: 'end',
          labels: {
            value: {
              color: '#f0f0f0',
            }
          },
        }
      },
      elements: {
        point: {
          pointStyle: 'line',
          radius: 3,
          borderWidth: 1,
          backgroundColor: "#f0f0f0",
        },
        line: {
          borderColor: "#f0f0f0",
          borderWidth: 2,
          fill: true,
          backgroundColor: "transparent",
          tension: 0.3
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: "#f0f0f0",
          }
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: "#f0f0f0",
            display: false,
          }
        }
      }
    });

    let nextDaysChartData = computed(() => ({
      labels: chartDays.value,
      datasets: [
        {
          data: chartTemperatures.value
        },
      ],
    }));

    return {
      optionsChart, nextDaysChartData,
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  max-height: 140px;
}
</style>