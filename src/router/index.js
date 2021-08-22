import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Map from '../views/Map.vue'
import Suspects from '../views/Suspects.vue'
import Solve from '../views/Solve.vue'
import Loading from '../views/Loading.vue'
import ExitGame from '../views/ExitGame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/suspects',
    name: 'Suspects',
    component: Suspects
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
