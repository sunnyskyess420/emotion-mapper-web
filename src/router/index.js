import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EmotionEntry from '../views/EmotionEntry.vue'
import History from '../views/History.vue'
import CopingSkillsMenu from '../views/CopingSkillsMenu.vue'

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
  },
  {
    path: '/coping-skills-menu',
    name: 'CopingSkillsMenu',
    component: CopingSkillsMenu
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

