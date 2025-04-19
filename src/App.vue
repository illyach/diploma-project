<template>
<HeaderLayout/>
  <router-view />
</template>

<script setup>

import HeaderLayout from './layots/HeaderLayout.vue';
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #111; /* можеш змінити під стиль */
  color: #eee;
  font-family: 'Poppins', sans-serif;
}
</style>
