import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 // import axios from 'axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// Deprecated axios call
// axios.defaults.baseURL = process.env.VUE_APP_REMOTE_API;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
