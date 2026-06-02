import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EmotionEntry from '../views/EmotionEntry.vue'
import History from '../views/History.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/emotion-entry',
    name: 'EmotionEntry',
    component: EmotionEntry
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
