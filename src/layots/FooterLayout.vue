
<template>
<footer class="site-footer">
    <div class="footer-container">
      <div class="footer-section">
        <div class="logo-section" >
          <img src="../assets/line-graph-with-arrow-svgrepo-com.svg" alt="Logo" class="logo" />
          <h3 class="logo-text">TrendChain</h3>
        </div>
        <p>Discover crypto gems at an early stage</p>
        <p class="copyright">© 2025 TrendChain All rights reserved</p>
      </div>
  
      <div class="footer-section">
        <h4>Projects</h4>
        <ul>
          <li><a href="#">AI Helper</a></li>
          <li><a href="#">Metrics</a></li>
          <li><a href="#">Top 100</a></li>
          <li><a href="#">ChainScore</a></li>
        </ul>
      </div>
  
      <div class="footer-section">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Add Project</a></li>
          <li><a href="#">Advertisement</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
  
      <div class="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Documentation</a></li>
        </ul>
      </div>
  
      <div class="footer-section">
        <h4>Social</h4>
        <div class="social-links">
          <a href="#"><i class="fab fa-twitter"></i> Twitter</a>
          <a href="#"><i class="fab fa-telegram"></i> Telegram</a>
        </div>
      </div>
    </div>
  </footer>
</template>
  <style scoped>

.logo {
    height: 32px;
    width: 32px;
  }
  .logo-section {

    display: flex;
    align-items: center;
    gap: 12px;
  }

  .site-footer {
    background-color: #121212;
    color: #f5f5f5;
    padding: 40px 0;
    font-family: 'Inter', sans-serif;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    padding: 0 20px;
  }
  
  .footer-section h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #fff;
  }
  
  .footer-section h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #fff;
  }
  
  .footer-section p {
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .copyright {
    color: #888;
    font-size: 0.9rem;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section li {
    margin-bottom: 10px;
  }
  
  .footer-section a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section a:hover {
    color: #fff;
  }
  
  .social-links a {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  
  .social-links i {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
  </style>