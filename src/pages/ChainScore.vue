<script setup>
import ProgresBar from '../components/ProgresBar.vue';
import { ref, watch } from 'vue';

const input = ref('');
const showProgress = ref(false);
const targetTvl = ref(0);
const originalTvl = ref(null);

watch(input, async (newVal) => {
  if (!newVal) {
    showProgress.value = false;
    return;
  }

  try {
    const res = await fetch('https://api.llama.fi/v2/chains');
    const data = await res.json();

    const found = data.find((item) =>
      item.name.toLowerCase() === newVal.toLowerCase()
    );

    if (found && found.tvl) {
      originalTvl.value = found.tvl;
      targetTvl.value = Math.min(Math.floor(found.tvl / 100_000_000), 100);
      showProgress.value = true;
    } else {
      showProgress.value = false;
      originalTvl.value = null;
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    showProgress.value = false;
    originalTvl.value = null;
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
      <ProgresBar :target="targetTvl" />
      <p class="tvl-text">TVL: {{ originalTvl.toLocaleString() }} $</p>
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
