<template>
    <header class="header">
      <div class="container">
        <RouterLink to="/" >
        <div class="logo-section" >
          <img src="../assets/line-graph-with-arrow-svgrepo-com.svg" alt="Logo" class="logo" />
          <span class="logo-text">TrendChain</span>
        </div>
     </RouterLink>
        <nav class="nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.route"
            class="nav-link"
          >
            {{ item.name }}
          </RouterLink>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  const navItems = [
    { name: 'TVL', route: '/about' },
    { name: 'CHAINS', route: '/about' },
    { name: 'AI HELPER', route: '/aihelper' },
    { name: 'CHAINSCORE', route: '/chainscore' },
  ]
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  .header {
    background-color: #000;
    color: #999;
    font-family: 'Poppins', sans-serif;
    padding: 16px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .logo {
    height: 32px;
    width: 32px;
  }
  
  .logo-text {
    font-size: 20px;
    font-weight: 600;
    color: white;
  }
  
  .nav {
    display: flex;
    gap: 24px;
  }
  
  .nav-link {
    text-decoration: none;
    color: #999;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: white;
  }
span,
a,
.nav-link,
.logo-section,
.nav-link:visited,
.logo-link,
.logo-link:visited {

  text-decoration: none;
}
  </style>
  