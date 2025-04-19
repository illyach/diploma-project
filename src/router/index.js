// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import ChainScore from '../pages/ChainScore.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/chainscore',
    name: 'ChainScore',
    component: ChainScore
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
