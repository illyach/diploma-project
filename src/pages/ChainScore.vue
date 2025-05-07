<script setup>
import ProgresBar from '../components/ProgresBar.vue';
import { ref, watch, computed } from 'vue';
import chainsData from '../assets/chain_stats.json';

const input = ref('');
const showProgress = ref(false);
const targetTvl = ref(0);
const originalTvl = ref(null);
const marketCapRank = ref(null);
const fees30d = ref(null);

// Нові змінні для додаткових метрик
const mau = ref(null);
const twitterFollowers = ref(null);
const weeklyDevsCore = ref(null);

const finalScore = computed(() => {
  const tvlScore = targetTvl.value || 0;
  const rankScore = marketCapRank.value ? (1 / marketCapRank.value) * 100 : 0;
  const feesScore = fees30d.value ? fees30d.value / 1_000_000 : 0;

  const mauScore = mau.value ? mau.value / 1_000_000 : 0;
  const twitterScore = twitterFollowers.value ? twitterFollowers.value / 100_000 : 0;
  const devsScore = weeklyDevsCore.value ? weeklyDevsCore.value / 15 : 0;

  console.log("fees", feesScore, "rank", rankScore, "tvl", tvlScore, "mau", mauScore, "tw", twitterScore, "devs", devsScore);

  const total = tvlScore + rankScore + feesScore + mauScore + twitterScore + devsScore;
  return Math.min(Math.ceil(total), 100);
});

watch(input, async (newVal) => {
  if (!newVal) {
    showProgress.value = false;
    return;
  }

  try {
    const llamaRes = await fetch('/api/llama/v2/chains');
    const llamaData = await llamaRes.json();

    const found = llamaData.find((item) => {
      const nameMatch = item.name?.toLowerCase() === newVal.toLowerCase();
      const symbolMatch = item.tokenSymbol?.toLowerCase() === newVal.toLowerCase();
      return nameMatch || symbolMatch;
    });

    const layer1Res = await fetch('/api/coingecko/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=250&page=1');
    const layer2Res = await fetch('/api/coingecko/api/v3/coins/markets?vs_currency=usd&category=layer-2&order=market_cap_desc&per_page=250&page=1');

    const [layer1Data, layer2Data] = await Promise.all([layer1Res.json(), layer2Res.json()]);
    const combinedData = [...layer1Data, ...layer2Data];

    const market = combinedData.find((item) => {
      const nameMatch = item.name?.toLowerCase() === newVal.toLowerCase();
      const symbolMatch = item.symbol?.toLowerCase() === newVal.toLowerCase();
      return nameMatch || symbolMatch;
    });

    if (found && found.tvl) {
      originalTvl.value = found.tvl;
      targetTvl.value = Math.min(Math.floor(found.tvl / 100_000_000), 100);
      showProgress.value = true;
      const feesRes = await fetch(`/api/llama/overview/fees/${found.name}?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees`);
      const feesData = await feesRes.json();
      fees30d.value = feesData.total30d || 0;
    } else {
      originalTvl.value = null;
      targetTvl.value = 0;
      showProgress.value = true;
    }

    marketCapRank.value = market?.market_cap_rank ?? null;

    // Зчитуємо дані з JSON
    const fromStats = chainsData.find(item => 
      item.name?.toLowerCase() === newVal.toLowerCase() || item.symbol?.toLowerCase() === newVal.toLowerCase()
    );

    if (fromStats) {
      mau.value = fromStats.MAU || 0;
      twitterFollowers.value = fromStats.TWITTER_FOLLOWERS || 0;
      weeklyDevsCore.value = fromStats.WEEKLY_DEVS_CORE || 0;
    } else {
      mau.value = twitterFollowers.value = weeklyDevsCore.value = 0;
    }

    // Якщо нічого не знайдено
    if (!found && !market && !fromStats) {
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
      placeholder="Введи назву блокчейна / тікер"
    />

    <div v-if="showProgress" class="score-section">
      <ProgresBar :target="finalScore" />
      <p class="tvl-text">TVL: {{ originalTvl?.toLocaleString() || '—' }} $</p>
      <p class="tvl-text">Rank: {{ marketCapRank || '—' }}</p>
      <p class="tvl-text">Fees(30d): {{ fees30d ? (fees30d / 1_000_000).toFixed(2) : '—' }} M $</p>
      <p class="tvl-text">MAU: {{ mau ? (mau / 1_000_000).toFixed(2) + ' M' : '—' }}</p>
      <p class="tvl-text">Twitter: {{ twitterFollowers ? (twitterFollowers / 100_000).toFixed(2) : '—' }}</p>
      <p class="tvl-text">Devs/Week: {{ weeklyDevsCore ? (weeklyDevsCore / 15).toFixed(2) : '—' }}</p>
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
