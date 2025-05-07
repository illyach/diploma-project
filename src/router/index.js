// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Metrics from '../pages/Metrics.vue'
import ChainScore from '../pages/ChainScore.vue'
import AiHelper from '../pages/AiHelper.vue'
import Top100 from '../pages/Top100.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/top100',
    name: 'Top100',
    component: Top100
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: Metrics
  },
  {
    path: '/chainscore',
    name: 'ChainScore',
    component: ChainScore
  },
  {
    path: '/aihelper',
    name: 'AiHelper',
    component: AiHelper
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
