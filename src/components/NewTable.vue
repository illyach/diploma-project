<template>
  <el-table
      :data="tableData"
      :default-sort="{ prop: 'price', order: 'descending' }"

      style="width: 100%"
  >
    <el-table-column prop="date" label="Date" sortable width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" :formatter="formatter" />
    <el-table-column
        prop="price"
        label="Price"
        sortable
        :sort-method="sortByPrice"
        width="120"
    />

  </el-table>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'

const sortByPrice = (a: User, b: User) => a.price - b.price

interface User {
  date: string
  name: string
  address: string
  price: number
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    price: 1200,
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    price: 980,
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    price: 1350,
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    price: 1100,
  },
]
</script>
