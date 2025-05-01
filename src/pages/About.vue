<template>
    <div class="black-table-container">
      <!-- Перемикач між таблицею та графіками -->
      <div style="margin: 20px auto; text-align: center;">
        <el-radio-group v-model="viewMode" size="medium">
          <el-radio label="table">Таблиця</el-radio>
          <el-radio label="charts">Графіки</el-radio>
        </el-radio-group>
      </div>
  
      <!-- Відображення графіків або таблиці на основі вибору -->
      <div v-if="viewMode === 'charts'" class="charts-container">
        <BarChart :data="chartData('MAU')" label="Monthly Active Users" />
        <BarChart :data="chartData('DAILY_TXNS')" label="Daily Transactions" />
        <BarChart :data="chartData('FEES')" label="Fees (USD)" />
        <BarChart :data="chartData('WEEKLY_DEVS_CORE')" label="Weekly Core Developers" />
      </div>
  
      <el-table
        v-if="viewMode === 'table'"
        :data="filteredData"
        style="width: 90%; margin: 20px auto;"
        border
        highlight-current-row
        :default-sort="{ prop: 'DAILY_TXNS', order: 'descending' }"
        @sort-change="handleSortChange"
        class="pure-black-table"
      >
        <el-table-column prop="name" label="Blockchain" width="180" sortable />
        <el-table-column prop="DAILY_TXNS" label="Daily Transactions" sortable :formatter="formatNumber" />
        <el-table-column prop="MAU" label="Monthly Active Users" sortable :formatter="formatNumber" />
        <el-table-column prop="FEES" label="Fees" sortable :formatter="formatCurrency" />
        <el-table-column prop="WEEKLY_DEVS_CORE" label="Core Devs" sortable />
        <el-table-column prop="TWITTER_FOLLOWERS" label="Twitter Followers" sortable :formatter="formatNumber" />
      </el-table>
    </div>
  </template>
  
  
  <script>
  import chainsData from '../assets/chain_stats.json'
  import BarChart from '../components/BarChart.vue'
  
  export default {
    components: { BarChart },
    data() {
      return {
        tableData: chainsData,
        filteredData: [...chainsData],
        sortOptions: {
          prop: 'DAILY_TXNS',
          order: 'descending'
        },
        viewMode: 'table' // Початковий режим відображення: таблиця
      }
    },
    methods: {
      formatNumber(row, column, cellValue) {
        return cellValue ? cellValue.toLocaleString() : 'N/A'
      },
      formatCurrency(row, column, cellValue) {
        return cellValue ? `$${cellValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : 'N/A'
      },
      handleSortChange({ prop, order }) {
        this.sortOptions = { prop, order }
        this.filteredData.sort((a, b) => {
          const valA = a[prop] || 0
          const valB = b[prop] || 0
          return order === 'ascending' ? valA - valB : valB - valA
        })
      },
      chartData(metric) {
        return this.filteredData.map(item => ({
          name: item.name || 'Unknown',
          value: typeof item[metric] === 'number' ? item[metric] : 0
        }))
      },
    },
    created() {
      this.handleSortChange(this.sortOptions)
    }
  }
  </script>
  
  
  <style scoped>
  .black-table-container {
    background-color: #000;
    min-height: 100vh;
    padding: 20px;
  }
  
  /* Pure black table styles */
  .pure-black-table {
    --el-table-border-color: #333;
    --el-table-header-bg-color: #111;
    --el-table-row-hover-bg-color: #222;
    --el-table-current-row-bg-color: #222;
    --el-table-bg-color: #000;
    --el-table-text-color: #e0e0e0;
    --el-table-header-text-color: #fff;
  }
  
  .pure-black-table ::v-deep .el-table__row {
    background-color: #232323;
    color: #e0e0e0;
  }
  
  .pure-black-table ::v-deep .el-table__header th {
    background-color: #111;
    color: #fff;
    font-weight: bold;
  }
  
  .pure-black-table ::v-deep .el-table__body tr:hover>td {
    background-color: #211338 !important;
  }
  
  .pure-black-table ::v-deep .el-table--border {
    border: 1px solid #333;
  }
  
  .pure-black-table ::v-deep .el-table--border th {
    border-bottom: 1px solid #333;
  }
  
  .pure-black-table ::v-deep .el-table--border td {
    border-bottom: 1px solid #333;
  }
  </style>