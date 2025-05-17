<template>
    <div class="landing-container">
      <div class="language-switcher-container">
        <LanguageSwitcher @language-change="changeLanguage" />
      </div>
      <!-- Хедер і опис -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1>{{ t.hero.title }}</h1>
            <p>{{ t.hero.description }}</p>
          </div>
          <div class="score-widget">
            <div class="score-container">
              <el-progress
                type="dashboard"
                :percentage="percentage2"
                :width="200"
                :stroke-width="15"
                :show-text="true"
                :color="customColors"
              >
                <template #default>
                  <div class="progress-content">
                    <span class="score-number">{{ displayNumber }}</span>
                  </div>
                </template>
              </el-progress>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Карусель логотипів -->
      <div class="carousel-wrapper">
        <div class="carousel-track" :style="{ animationDuration: logos.length * 2 + 's' }">
          <div v-for="(logo, index) in repeatedLogos" :key="index" class="carousel-logo">
            <div class="logo-bg">
              <img :src="logo" alt="Blockchain Logo" />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Особливості -->
      <section class="features">
        <h2>{{ t.features.title }}</h2>
        <div class="features-grid">
          <div v-for="(card, index) in t.features.cards" :key="index" class="feature-card">
            <div class="feature-icon">{{ ['💎', '🚀', '💡', '⚙️'][index] }}</div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </section>
  
      <!-- Чому важливо -->
      <section class="why">
        <div class="why-card">
          <div class="why-content">
            <h2>{{ t.why.title }}</h2>
            <p>{{ t.why.description }}</p>
          </div>
          <div class="graph-container">
            <img src="../assets/graph.jpg" alt="Twitter Score Graph" class="graph-image">
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { translations } from '../locales/translations'
import near from '../assets/near.svg'
import btc from '../assets/btc.svg'
import sol from '../assets/sol.svg'
import eth from '../assets/eth.svg'
import avax from '../assets/avax.svg'
import bnb from '../assets/bnb.svg'
import apt from '../assets/apt.svg'
import op from '../assets/op.svg'
import ltc from '../assets/ltc.svg'
import arb from '../assets/arb.svg'
import pol from '../assets/pol.svg'
import ftm from '../assets/ftm.svg'
import ton from '../assets/ton.svg'
import { ElProgress } from 'element-plus'
import 'element-plus/theme-chalk/el-progress.css'

const currentLanguage = ref('en')
const t = computed(() => translations[currentLanguage.value])

const changeLanguage = (lang) => {
  currentLanguage.value = lang
}

const logos = [
  near, btc, sol, eth, avax, bnb, apt,
  op, ltc, arb, pol, ftm, ton
]

const percentage2 = ref(0)
const currentNumber = ref(0)
let animationInterval = null

const customColors = [
  { color: '#FF0000', percentage: 20 },
  { color: '#FF4500', percentage: 40 },
  { color: '#FFA500', percentage: 60 },
  { color: '#FFD700', percentage: 80 },
  { color: '#4ADE80', percentage: 100 }
]

const repeatedLogos = [...logos, ...logos]

const displayNumber = computed(() => {
  return Math.round(currentNumber.value).toLocaleString()
})

const startProgressAnimation = () => {
  const duration = 2000 // тривалість анімації в мс
  const steps = 100
  const stepDuration = duration / steps
  const stepValue = 100 / steps

  percentage2.value = 0
  currentNumber.value = 0

  animationInterval = setInterval(() => {
    if (percentage2.value < 100) {
      percentage2.value = Math.min(percentage2.value + stepValue, 100)
      currentNumber.value = percentage2.value // Синхронізуємо число з прогресом
    } else {
      clearInterval(animationInterval)
    }
  }, stepDuration)
}

onMounted(() => {
  startProgressAnimation()

  fetch('https://api.coingecko.com/api/v3/global')
    .then(res => res.json())
    .then(data => {
      const marketCaps = data.data.total_market_cap
      console.log('total_market_cap:', marketCaps)
      const sum = Object.values(marketCaps).reduce((acc, val) => acc + val, 0)
      console.log('Сума total_market_cap:', sum)
    })
    .catch(error => {
      console.error('Помилка при запиті до CoinGecko:', error)
    })
})

onBeforeUnmount(() => {
  if (animationInterval) clearInterval(animationInterval)
})
</script>

  
  <style scoped>
  .demo-progress .el-progress--line {
    margin-bottom: 15px;
    max-width: 600px;
  }
  .demo-progress .el-progress--circle {
    margin-right: 15px;
  }
  
  .landing-container {
    padding: 40px 20px;
    background-color: #121212;
    font-family: 'Inter', sans-serif;
    color: #f5f5f5;
  }
  
  .hero {
    padding: 0 20px;
    background-color: #121212;
  }
  
  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
  
  .hero-text {
    flex: 1;
    max-width: 600px;
  }
  
  .hero h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
  }
  
  .hero p {
    font-size: 1.2rem;
    color: #A0A0A0;
    line-height: 1.6;
  }
  
  .score-widget {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .score-container {
    background: #1E1E1E;
    border-radius: 20px;
    padding: 50px;
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .progress-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .score-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
  }
  
  .score-label {
    text-align: center;
    color: #fff;
    font-size: 1.1rem;
  }
  
  .monitoring-text {
    color: #A0A0A0;
    font-size: 0.9rem;
    margin-top: 5px;
  }
  
  .empty-center {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: #1E1E1E;
  }
  
  .features {
    margin: 80px 0;
    padding: 0 20px;
  }
  
  .features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 60px;
    color: #ffffff;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .feature-card {
    background: #1E1E1E;
    border-radius: 20px;
    padding: 40px;
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #ffffff;
  }
  
  .feature-card p {
    font-size: 1rem;
    line-height: 1.6;
    color: #A0A0A0;
  }
  
  .why {
    margin: 120px 0;
    padding: 0 20px;
  }
  
  .why-card {
    background: #1E1E1E;
    border-radius: 20px;
    padding: 40px;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    gap: 80px;
    align-items: center;
  }
  
  .why-content {
    flex: 1;
    margin:0px 0px 20px 30px;
  }
  
  .why-content h2 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 25px;
    color: #ffffff;
  }
  
  .why-content p {
    font-size: 1rem;
    line-height: 1.6;
    color: #A0A0A0;
    margin-bottom: 20px;
  }
  
  .why-content p:last-child {
    margin-bottom: 0;
  }
  
  .graph-container {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .graph-image {
    max-width: 600px;
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .carousel-wrapper {
    overflow: hidden;
    margin-top: 60px;
    background: #121212;
    padding: 20px 0;
  }
  
  .carousel-track {
    display: flex;
    gap: 30px;
    animation: scroll-left linear infinite;
  }
  
  .carousel-logo .logo-bg {
    width: 170px;
    height: 80px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .carousel-logo img {
    max-height: 60px;
    max-width: 120px;
  }
  
  @keyframes scroll-left {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 1024px) {
    .hero-content {
      flex-direction: column;
      text-align: center;
    }

    .hero h1 {
      font-size: 2.5rem;
    }

    .score-container {
      margin-top: 40px;
    }

    .why-card {
      flex-direction: column;
      text-align: center;
      gap: 40px;
      padding: 40px;
    }

    .why-content h2 {
      font-size: 1.8rem;
    }

    .graph-image {
      max-width: 100%;
    }
  }
  
  :deep(.el-progress-dashboard) {
    .el-progress-dashboard__track {
      stroke: #2C2C2C;
    }
    .el-progress-dashboard__path {
      stroke: linear-gradient(90deg, #FF6B00 0%, #FFB800 50%, #4ADE80 100%);
      stroke-linecap: round;
    }
  }

  .language-switcher-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  </style>