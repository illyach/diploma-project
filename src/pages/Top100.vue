<template>
    <div class="chainscore-table">
      <el-table :data="sortedChains" style="width: 100%" border>
        <el-table-column prop="name" label="Blockchain" width="180" sortable />
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
        <el-table-column prop="score" label="Score" width="120" sortable>
          <template #default="{row}">
            <el-tag :type="getScoreTagType(row.score)">
              {{ row.score }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const chains = ref([])
  const loading = ref(true)
  
  const calculateScore = (tvl, rank, fees) => {
    const tvlScore = tvl ? Math.min(Math.floor(tvl / 100_000_000), 100) : 0
    const rankScore = rank ? (1 / rank) * 100 : 0
    const feesScore = fees ? fees / 1_000_000 : 0
    return Math.min(Math.ceil(tvlScore + rankScore + feesScore), 100)
  }
  
  const fetchData = async () => {
    try {
      loading.value = true
      
      // Fetch TVL data
      const llamaRes = await fetch('/api/llama/v2/chains')
      const llamaData = await llamaRes.json()
      
      // Fetch market data
      const [layer1Res, layer2Res] = await Promise.all([
        fetch('/api/coingecko/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en'),
        fetch('/api/coingecko/api/v3/coins/markets?vs_currency=usd&category=layer-2&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en')
      ])
      
      const layer1Data = await layer1Res.json()
      const layer2Data = await layer2Res.json()
      const combinedMarketData = [...layer1Data, ...layer2Data]
      
      // Combine data and calculate scores
      chains.value = llamaData.map(chain => {
        const marketInfo = combinedMarketData.find(item => 
          item.name?.toLowerCase() === chain.name?.toLowerCase() || 
          item.symbol?.toLowerCase() === chain.tokenSymbol?.toLowerCase()
        )
        
        return {
          name: chain.name,
          tvl: chain.tvl,
          marketCapRank: marketInfo?.market_cap_rank,
          fees30d: null, // Will be fetched separately
          score: calculateScore(chain.tvl, marketInfo?.market_cap_rank, 0)
        }
      })
      
      // Fetch fees data for top 50 chains
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
          chain.score = calculateScore(chain.tvl, chain.marketCapRank, chain.fees30d)
        }
      })
      
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }
  
  const sortedChains = computed(() => {
    return [...chains.value].sort((a, b) => b.score - a.score)
  })
  
  const getScoreTagType = (score) => {
    if (score >= 80) return 'success'
    if (score >= 50) return 'warning'
    return 'danger'
  }
  
  onMounted(() => {
    fetchData()
  })
  </script>
  
  <style scoped>
  .chainscore-table {
    margin-top: 40px;
    padding: 20px;
    background: #121212;
    border-radius: 8px;
  }
  
  :deep(.el-table) {
    background-color: transparent;
    color: #f5f5f5;
  }
  
  :deep(.el-table th) {
    background-color: #1e1e1e;
    color: #f5f5f5;
  }
  
  :deep(.el-table tr) {
    background-color: #1e1e1e;
  }
  
  :deep(.el-table--border) {
    border-color: #444;
  }
  
  :deep(.el-table--border th) {
    border-color: #444;
  }
  
  :deep(.el-table--border td) {
    border-color: #444;
  }
  
  :deep(.el-table__empty-block) {
    background-color: #1e1e1e;
  }
  </style>