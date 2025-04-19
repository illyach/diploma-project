<template>

  <div>
    <h1>Layer-1 Coinsss</h1>
    <p>Перевір консоль для перегляду результатів 🔍</p>

  </div>
</template>

<script>


export default {
  mounted() {
    this.fetchLayer1Coins();
    this.askTokenMetrics();
  },
  methods: {
    fetchLayer1Coins() {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-pdG5QrQsVUweY4PgcnDoQ3X3'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          console.log('Layer-1 Coins:', data);
        })
        .catch(err => {
          console.error('Error fetching Layer-1 data:', err);
        });
    },

    askTokenMetrics() {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          api_key: 'tm-f7536ce8-2d7f-443c-a4fb-3dbea0ad17d9', // 🔒 Замінити на твій реальний ключ
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{ user: 'what the most popular chain by active users?' }]
        })
      };

      fetch('https://api.tokenmetrics.com/v2/tmai', options)
        .then(res => res.json())
        .then(res => {
          console.log('Token Metrics AI Response:', res);
        })
        .catch(err => {
          console.error('Error fetching Token Metrics response:', err);
        });
    }
  }
};
</script>
