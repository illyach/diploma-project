<template>
  <div class="table-wrapper">
    <table class="custom-table">
      <thead>
      <tr>
        <th>Market</th>
        <th>Value</th>
        <th @click="sortTable('entry')">Entry Price</th>
        <th @click="sortTable('close')">Close Price</th>
        <th @click="sortTable('fees')">Total Fees</th>
        <th @click="sortTable('funding')">Funding</th>
        <th @click="sortTable('pnl')">Realized PnL</th>
        <th @click="sortTable('open')">Open Date</th>
        <th @click="sortTable('closeDate')">Close Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in sortedData" :key="index">
        <td>{{ row.market }}</td>
        <td>
          <div>{{ row.value }}</div>
          <div :class="getValueClass(row.valueChange)">
            {{ row.valueChange }}
          </div>
        </td>
        <td>{{ row.entry }}</td>
        <td>{{ row.close }}</td>
        <td>{{ row.fees }}</td>
        <td>{{ row.funding }}</td>
        <td :class="getPnlClass(row.pnl)">{{ row.pnl }}</td>
        <td>{{ row.open }}</td>
        <td>{{ row.closeDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tableData = [ /* ...твої дані... */ ]

const sortBy = ref('entry')
const sortOrder = ref(1) // 1 – за зростанням, -1 – за спаданням

const sortedData = computed(() => {
  return [...tableData].sort((a, b) => {
    if (a[sortBy.value] > b[sortBy.value]) return 1 * sortOrder.value
    if (a[sortBy.value] < b[sortBy.value]) return -1 * sortOrder.value
    return 0
  })
})

const sortTable = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = -sortOrder.value
  } else {
    sortBy.value = field
    sortOrder.value = 1
  }
}

const getPnlClass = (value) => (value > 0 ? 'green' : value < 0 ? 'red' : '')
const getValueClass = (value) => (value.startsWith('-') ? 'red' : 'green')
</script>


<style scoped>
.table-wrapper {
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 10px;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 14px;
}

.custom-table th,
.custom-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #2a2a2a;
  cursor: pointer;
}

.custom-table th {
  position: relative;
}

.custom-table th::after {
  content: ' ⇅';
  position: absolute;
  right: 0.5rem;
}

.green {
  color: #2ee06b;
}

.red {
  color: #e03e3e;
}

.custom-table tbody tr:hover {
  background-color: #2a2a2a;
}
</style>
