import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Map from '../views/Map.vue'
import Suspects from '../views/Suspects.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
