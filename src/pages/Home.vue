<template>
    <div class="landing-container">
      <!-- Хедер і опис -->
      <section class="hero">
        <h1>Рейтинг блокчейнів на основі реальних метрик</h1>
        <p>
          TrendChain допомагає обчислювати рейтинг блокчейн-проєктів за їх активністю, розробкою,
          комісіями, транзакціями та іншими показниками.
        </p>
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
        <h2>Що дає TrendChain?</h2>
        <ul>
          <li>
            <h3>🔍 Виявлення потенціалу</h3>
            <p>Знаходь перспективні Layer 1 блокчейни за MAU, транзакціями та активністю мережі.</p>
          </li>
          <li>
            <h3>📈 Недооцінені активи</h3>
            <p>Порівнюй метрики блокчейнів і приймай розумніші інвестиційні рішення.</p>
          </li>
          <li>
            <h3>🛠️ Інсайти по розробці</h3>
            <p>Аналізуй активність розробників і прогнозуй розвиток проєкту.</p>
          </li>
          <li>
            <h3>⚠️ Анти-SCAM захист</h3>
            <p>Проєкти без активності користувачів і транзакцій — ймовірно SCAM. Ми це виявляємо.</p>
          </li>
        </ul>
      </section>
  
      <!-- Чому важливо -->
      <section class="why">
        <h2>Чому це важливо?</h2>
        <p>
          Метрики користувачів, обсяг транзакцій, збори й активність розробників — це справжні
          показники якості блокчейну. TrendChain дає оцінку по суті, а не за хайпом.
        </p>
      </section>
    </div>
  </template>
  
  <script scoped>
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

export default {
  name: 'LandingPage',
  data() {
    return {
      logos: [
        near, btc, sol, eth, avax, bnb, apt,
        op, ltc, arb, pol, ftm, ton
      ]
    }
  },
  computed: {
    repeatedLogos() {
      return [...this.logos, ...this.logos]
    }
  },
  mounted() {
    fetch('https://api.coingecko.com/api/v3/global')
      .then(res => res.json())
      .then(data => {
        const marketCaps = data.data.total_market_cap
        console.log('total_market_cap:', marketCaps)

        // Спосіб обчислення суми №1
        const sum = Object.values(marketCaps).reduce((acc, val) => acc + val, 0)
        console.log('Сума total_market_cap:', sum)
      })
      .catch(error => {
        console.error('Помилка при запиті до CoinGecko:', error)
      })
  }
}
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
    text-align: center;
    margin-bottom: 40px;
  }
  
  .hero h1 {
    font-size: 2rem;
    font-weight: 700;
  }
  
  .hero p {
    font-size: 1.1rem;
    color: #ccc;
    max-width: 600px;
    margin: 10px auto;
  }
  
  .features {
    margin: 40px 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .features h2 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .features ul {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 0;
    list-style: none;
  }
  
  .features li {
    flex: 0 0 calc(50% - 20px);
    background: #1e1e1e;
    padding: 40px;
    border-radius: 15px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  .features h3 {
    margin-bottom: 10px;
    font-size: 22px;
  }
  
  .features p {
    font-size: 15px;
    line-height: 1.6;
  }
  
  .why {
    margin: 60px 0;
    text-align: center;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    color: #ddd;
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
  
  @media (max-width: 600px) {
    .features ul {
      display: block;
    }
    
    .features li {
      flex: 0 0 100%;
      margin-bottom: 20px;
    }
  }
  </style>