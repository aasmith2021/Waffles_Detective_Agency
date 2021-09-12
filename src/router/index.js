import Vue from 'vue'
import VueRouter from 'vue-router'
import Notepad from '../views/Notepad.vue'
import SearchForClues from '../views/SearchForClues.vue'
import Suspects from '../views/Suspects.vue'
import Solve from '../views/Solve.vue'
import Loading from '../views/Loading.vue'
import ExitGame from '../views/ExitGame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Suspects',
    component: Suspects
  },
  {
    path: '/search',
    name: 'SearchForClues',
    component: SearchForClues
  },
  {
    path: '/notepad',
    name: 'Notepad',
    component: Notepad
  },
  {
    path: '/solve',
    name: 'Solve',
    component: Solve
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/exit',
    name: 'ExitGame',
    component: ExitGame
  }
]

const router = new VueRouter({
  routes
})

export default router
