<template>
  <div class="app-container">
    <HeaderLayout/>
    <main class="main-content">
      <router-view />
    </main>
    <FooterLayout/>
  </div>
</template>

<script setup>
import FooterLayout from './layots/FooterLayout.vue';
import HeaderLayout from './layots/HeaderLayout.vue';
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #111;
  color: #eee;
  font-family: 'Poppins', sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px 0;
}
</style>