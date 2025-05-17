<template>
  <div class="language-switcher">
    <button 
      :class="{ active: currentLanguage === 'uk' }" 
      @click="switchLanguage('uk')"
    >
      UA
    </button>
    <button 
      :class="{ active: currentLanguage === 'en' }" 
      @click="switchLanguage('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentLanguage = ref('en')
const emit = defineEmits(['language-change'])

const switchLanguage = (lang) => {
  currentLanguage.value = lang
  emit('language-change', lang)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 8px;
}

.language-switcher button {
  padding: 6px 12px;
  border: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-switcher button.active {
  background: #ffffff;
  color: #121212;
}

.language-switcher button:hover {
  opacity: 0.8;
}
</style> 