import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import EmotionEntry from '../views/EmotionEntry.vue'
import History from '../views/History.vue'
import AuthChoice from '../components/AuthChoice.vue'

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
    path: '/emotion-entry',
    name: 'EmotionEntry',
    component: EmotionEntry
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthChoice
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
