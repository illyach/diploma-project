<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ target: number }>();

const percentage = ref(0);

const animateTo = (to: number) => {
  percentage.value = 0;
  const step = () => {
    if (percentage.value < to) {
      percentage.value += 1;
      requestAnimationFrame(step);
    } else {
      percentage.value = to;
    }
  };
  step();
};

watch(
  () => props.target,
  (newVal) => {
    if (typeof newVal === 'number') animateTo(newVal);
  },
  { immediate: true }
);

const getColor = (value: number) => {
  if (value <= 25) return '#ff4d4f';
  if (value <= 50) return '#ffa500';
  if (value <= 75) return '#fadb14';
  return '#52c41a';
};
</script>

<template>
  <div class="demo-progress">
    <el-progress
      type="dashboard"
      :percentage="percentage"
      :color="getColor"
      :width="360"
    />
  </div>
</template>
