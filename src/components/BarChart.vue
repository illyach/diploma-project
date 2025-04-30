<!-- components/BarChart.vue -->
<template>
    <div style="width: 90%; margin: 40px auto;">
      <h3 style="color: white; text-align: center;">{{ label }}</h3>
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    props: {
      data: Array,
      label: String
    },
    computed: {
      chartData() {
        return {
          labels: this.data.map(item => item.name),
          datasets: [{
            label: this.label,
            backgroundColor: '#a855f7',
            borderRadius: 5,
            data: this.data.map(item => item.value)
          }]
        }
      },
      chartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { ticks: { color: 'white' } },
            y: { ticks: { color: 'white' } }
          }
        }
      }
    }
  }
  </script>
  