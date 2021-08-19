import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    startPageFinished: false
  },
  mutations: {
    SET_START_PAGE_TO_FINISHED(state) {
      state.startPageFinished = true;
    },
    UPDATE_USER_NAME(state, newUserName) {
      state.userName = newUserName;
    }
  },
  actions: {
  },
  modules: {
  },
  strict: true
})
