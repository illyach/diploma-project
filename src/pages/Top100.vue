<template>
    <div class="table-wrapper">
    <div class="chainscore-table">
      <el-table 
        :data="sortedChains" 
        style="width: 100%" 
        border
        v-loading="loading"
        @sort-change="handleSortChange"
        class="pure-black-table"

      >
        <el-table-column prop="name" label="Blockchain" width="180" sortable fixed />
        
        <el-table-column prop="tvl" label="TVL ($)" width="150" sortable>
          <template #default="{row}">
            {{ row.tvl?.toLocaleString() || '—' }}
          </template>
        </el-table-column>
        
        <el-table-column prop="marketCapRank" label="Market Cap Rank" width="150" sortable>
          <template #default="{row}">
            {{ row.marketCapRank || '—' }}
          </template>
        </el-table-column>
        
        <el-table-column prop="fees30d" label="Fees 30d (M$)" width="150" sortable>
          <template #default="{row}">
            {{ row.fees30d ? (row.fees30d / 1_000_000).toFixed(2) : '—' }}
          </template>
        </el-table-column>
        
        <el-table-column prop="mau" label="MAU (M)" width="120" sortable>
          <template #default="{row}">
            {{ row.mau ? (row.mau / 1_000_000).toFixed(2) : '—' }}
          </template>
        </el-table-column>
        
        <el-table-column prop="twitterFollowers" label="Twitter (100K)" width="150" sortable>
          <template #default="{row}">
            {{ row.twitterFollowers ? (row.twitterFollowers / 100_000).toFixed(2) : '—' }}
          </template>
        </el-table-column>
        
        <el-table-column prop="weeklyDevsCore" label="Devs/Week" width="120" sortable>
          <template #default="{row}">
            {{ row.weeklyDevsCore || '—' }}
          </template>
        </el-table-column>
        
        <el-table-column prop="score" label="Score" width="120" sortable>
          <template #default="{row}">
            <el-tag :type="getScoreTagType(row.score)" effect="dark">
              {{ row.score }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import chainsData from '../assets/chain_stats.json'
  
  const chains = ref([])
  const loading = ref(true)
  const currentSort = ref({ prop: 'score', order: 'descending' })
  
  const calculateScore = (chain) => {
    const tvlScore = chain.tvl ? Math.min(Math.floor(chain.tvl / 100_000_000), 100) : 0
    const rankScore = chain.marketCapRank ? (1 / chain.marketCapRank) * 100 : 0
    const feesScore = chain.fees30d ? chain.fees30d / 1_000_000 : 0
    const mauScore = chain.mau ? chain.mau / 1_000_000 : 0
    const twitterScore = chain.twitterFollowers ? chain.twitterFollowers / 100_000 : 0
    const devsScore = chain.weeklyDevsCore ? chain.weeklyDevsCore / 15 : 0
    
    return Math.min(Math.ceil(tvlScore + rankScore + feesScore + mauScore + twitterScore + devsScore), 100)
  }
  
  const fetchData = async () => {
    try {
      loading.value = true
      
      // Fetch TVL data
      const llamaRes = await fetch('/api/llama/v2/chains')
      const llamaData = await llamaRes.json()
      
      // Fetch market data
      const [layer1Res, layer2Res] = await Promise.all([
        fetch('/api/coingecko/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=250&page=1'),
        fetch('/api/coingecko/api/v3/coins/markets?vs_currency=usd&category=layer-2&order=market_cap_desc&per_page=250&page=1')
      ])
      
      const layer1Data = await layer1Res.json()
      const layer2Data = await layer2Res.json()
      const combinedMarketData = [...layer1Data, ...layer2Data]
      
      // Combine all data sources
      chains.value = llamaData.map(chain => {
        const marketInfo = combinedMarketData.find(item => 
          item.name?.toLowerCase() === chain.name?.toLowerCase() || 
          item.symbol?.toLowerCase() === chain.tokenSymbol?.toLowerCase()
        )
        
        const statsInfo = chainsData.find(item =>
          item.name?.toLowerCase() === chain.name?.toLowerCase() ||
          item.symbol?.toLowerCase() === chain.tokenSymbol?.toLowerCase()
        )
        
        const chainData = {
          name: chain.name,
          symbol: chain.tokenSymbol,
          tvl: chain.tvl,
          marketCapRank: marketInfo?.market_cap_rank,
          fees30d: null,
          mau: statsInfo?.MAU || 0,
          twitterFollowers: statsInfo?.TWITTER_FOLLOWERS || 0,
          weeklyDevsCore: statsInfo?.WEEKLY_DEVS_CORE || 0,
          score: 0
        }
        
        // Initial score calculation without fees
        chainData.score = calculateScore(chainData)
        
        return chainData
      })
      
      // Fetch fees data for top 50 chains only (to avoid rate limits)
      const topChains = chains.value.slice(0, 50)
      const feesPromises = topChains.map(chain => 
        fetch(`/api/llama/overview/fees/${chain.name}?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees`)
          .then(res => res.json())
          .then(data => ({
            name: chain.name,
            fees30d: data.total30d || 0
          }))
          .catch(() => ({
            name: chain.name,
            fees30d: 0
          }))
      )
      
      const feesResults = await Promise.all(feesPromises)
      feesResults.forEach(result => {
        const chain = chains.value.find(c => c.name === result.name)
        if (chain) {
          chain.fees30d = result.fees30d
          chain.score = calculateScore(chain) // Recalculate with fees
        }
      })
      
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }
  
  const sortedChains = computed(() => {
    const prop = currentSort.value.prop
    const order = currentSort.value.order
    
    return [...chains.value].sort((a, b) => {
      // Handle null values
      if (a[prop] === null || a[prop] === undefined) return order === 'ascending' ? 1 : -1
      if (b[prop] === null || b[prop] === undefined) return order === 'ascending' ? -1 : 1
      
      // Numeric comparison
      if (order === 'ascending') {
        return a[prop] - b[prop]
      } else {
        return b[prop] - a[prop]
      }
    })
  })
  
  const handleSortChange = ({ prop, order }) => {
    currentSort.value = { prop, order }
  }
  
  const getScoreTagType = (score) => {
    if (score >= 40) return 'success'
    if (score >= 15) return 'warning'
    return 'danger'
  }
  
  onMounted(() => {
    fetchData()
  })
  </script>
  
  <style scoped>
.table-wrapper {
  background-color: #000;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 40px;
}

.chainscore-dark-table {
  --el-table-border-color: #333;
  --el-table-header-bg-color: #111;
  --el-table-row-hover-bg-color: #211338;
  --el-table-current-row-bg-color: #211338;
  --el-table-bg-color: #000;
  --el-table-text-color: #e0e0e0;
  --el-table-header-text-color: #fff;
}

/* ::v-deep потрібен для scoped стилів */
.chainscore-dark-table ::v-deep .el-table__row {
  background-color: #232323;
  color: #e0e0e0;
}

.chainscore-dark-table ::v-deep .el-table__header th {
  background-color: #111;
  color: #fff;
  font-weight: bold;
}

.chainscore-dark-table ::v-deep .el-table__body tr:hover > td {
  background-color: #211338 !important;
}

.chainscore-dark-table ::v-deep .el-loading-mask {
  background-color: rgba(0, 0, 0, 0.7);
}


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

.pure-black-table ::v-deep .el-table__body tr:hover > td {
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
