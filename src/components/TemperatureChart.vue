<template>
  <LineChart :chartData="nextDaysChartData" :options="optionsChart" class="line-chart" />
</template>

<script>
import { ref, computed, toRef } from 'vue'

import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(...registerables, ChartDataLabels);

export default {
  name: 'TemperatureChart',
  components: {
    LineChart,
  },
  props: {
    cityData: Object,
  },
  setup(props) {
    let cityData = toRef(props, 'cityData');

    let chartTemperatures = computed(() => cityData.value.daily.map(a => Math.round(a.temp.day)).slice(1, 7));

    let chartDays = computed(() => cityData.value.daily.map(a => new Date(a.dt * 1000).toLocaleString('en-us', {  weekday: 'short' })).slice(1, 7));

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