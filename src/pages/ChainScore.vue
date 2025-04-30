<script setup>
import ProgresBar from '../components/ProgresBar.vue';
import { ref, watch, computed } from 'vue';

const input = ref('');
const showProgress = ref(false);
const targetTvl = ref(0);
const originalTvl = ref(null);
const marketCapRank = ref(null);

// Обрахунок підсумкового балу
const finalScore = computed(() => {
  const tvlScore = targetTvl.value || 0;
  const rankScore = marketCapRank.value ? (1 / marketCapRank.value) * 100 : 0;
  return Math.min(Math.ceil(tvlScore + rankScore), 100);
});

watch(input, async (newVal) => {
  if (!newVal) {
    showProgress.value = false;
    return;
  }

  try {
    const res = await fetch('/api/llama/v2/chains');
    const data = await res.json();

    const found = data.find((item) => {
      const nameMatch = item.name?.toLowerCase() === newVal.toLowerCase();
      const symbolMatch = item.tokenSymbol?.toLowerCase() === newVal.toLowerCase();
      return nameMatch || symbolMatch;
    });

    const marketRes = await fetch('/api/coingecko/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en');

    const marketData = await marketRes.json();

    const market = marketData.find((item) => {
      const nameMatch = item.name?.toLowerCase() === newVal.toLowerCase();
      const symbolMatch = item.symbol?.toLowerCase() === newVal.toLowerCase();
      return nameMatch || symbolMatch;
    });

    if (found && found.tvl) {
      originalTvl.value = found.tvl;
      targetTvl.value = Math.min(Math.floor(found.tvl / 100_000_000), 100);
      showProgress.value = true;
    } else {
      originalTvl.value = null;
      targetTvl.value = 0;
      showProgress.value = true;
    }

    if (market && market.market_cap_rank) {
      marketCapRank.value = market.market_cap_rank;
    } else {
      marketCapRank.value = null;
    }

    // Якщо не знайдено нічого — виставляємо оцінку 2
    if (!found && !market) {
      targetTvl.value = 0;
      marketCapRank.value = 50; // (1/50)*100 = 2
      showProgress.value = true;
    }

  } catch (err) {
    console.error('Error fetching data:', err);
    showProgress.value = false;
    originalTvl.value = null;
    targetTvl.value = 0;
    marketCapRank.value = null;
  }
});
</script>

<template>
  <div class="chainscore-wrapper">
    <el-input
      v-model="input"
      style="width: 240px"
      placeholder="Введи назву блокчейна"
    />

    <div v-if="showProgress" class="score-section">
      <ProgresBar :target="finalScore" />
      <p class="tvl-text">TVL: {{ originalTvl?.toLocaleString() || '—' }} $</p>
      <p class="tvl-text">Rank: {{ marketCapRank || '—' }}</p>
      <p class="tvl-text">Score: {{ finalScore }}</p>
    </div>
  </div>
</template>

<style scoped>
.chainscore-wrapper {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-section {
  margin-top: 30px;
  text-align: center;
}

.tvl-text {
  margin-top: 12px;
  font-size: 20px;
  font-weight: 500;
  color: #42b983;
}
</style>
