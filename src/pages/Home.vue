<template>
    <div class="landing-container">
      
      <!-- Хедер і опис -->
      <section class="hero">
        <h1>Crypto Layer 1 Insights Based on Real Blockchain Metrics</h1>
        <p>
          TrendChain допамагає обчислюти рейтинг для блокчейн-проєктів на основі їхньої активності,
          участі розробників, комісій, транзакцій та інших метрик.
        </p>
      </section>

        <!-- Карусель -->
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
  <h2>Наші переваги</h2>
  <ul>
    <li>
      <h3>🔍 Знаходь перспективні Layer 1 блокчейни</h3>
      <p>Аналізуй дані щодо MAU, транзакцій та активності — виявляй блокчейни на ранніх стадіях.</p>
    </li>
    <li>
      <h3>📈 Оцінюй недооцінені активи</h3>
      <p>Порівнюй показники блокчейнів і приймай більш обґрунтовані інвестиційні рішення.</p>
    </li>
    <li>
      <h3>🛠️ Отримуй інсайти по розробці</h3>
      <p>Вивчай, наскільки активно проєкт підтримується розробниками, і прогнозуй розвиток.</p>
    </li>
    <li>
      <h3>⚠️ Уникай сумнівних проєктів</h3>
      <p>Якщо активні користувачі та транзакції відсутні — ймовірно це SCAM.</p>
    </li>
  </ul>
</section>

  
      <!-- Чому важливо -->
      <section class="why">
        <h2>Чому метрики важливі?</h2>
        <p>
          Дані про активність користувачів, обсяги транзакцій, збори та участь розробників — це основа
          реальної оцінки блокчейну. ChainScore допоможе оцінити проєкт по суті, а не за хайпом.
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
        // Щоб зробити безкінечну прокрутку
        return [...this.logos, ...this.logos]
      }
    }
  }
  </script>
  










 <style>

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
  max-width: 600px; /* Обмежуємо ширину для 2 колонок */
  margin-left: auto;
  margin-right: auto;
}

.features h2 {
  text-align: center;
  margin-bottom: 30px;
}



.features ul {
  display: flex;

  flex-wrap: wrap; /* Дозволяє елементам переноситись на новий ряд */
  gap: 50px;
  padding: 0;
  list-style: none;
}

.features li {
  flex: 0 0 calc(50% - 50px);
  background: #1e1e1e;
  padding: 30px;
  border-radius: 15px;
  box-sizing: border-box;
font-size: 15px;
  height: auto;           /* Дозволяє адаптуватись по висоті */
  aspect-ratio: unset;    /* Вимикає квадратність */
}

.features h3 {
  margin-bottom: 10px;
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

/* Адаптація для мобільних пристроїв */
@media (max-width: 600px) {
  .features ul {
    grid-template-columns: 1fr; /* 1 колонка на малих екранах */
  }
}
</style>