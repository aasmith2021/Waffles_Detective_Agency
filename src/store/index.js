import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    startPageFinished: false,
    suspects: [],
    currentSuspects: [],
    currentSuspectsChecked: [],
    leadingSuspects: [],
    leadingSuspectsChecked: [],
    notTheMurderer: [],
    notTheMurdererChecked: []
  },
  mutations: {
    SET_START_PAGE_TO_FINISHED(state) {
      state.startPageFinished = true;
    },
    UPDATE_USER_NAME(state, newUserName) {
      state.userName = newUserName;
    },
    SET_ALL_SUSPECTS(state, suspects) {
      state.suspects = suspects;
      state.currentSuspects = suspects;
    },
    MOVE_FROM_CS_TO_LS(state, suspect) {
      const indexOfSuspectInCS = state.currentSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.leadingSuspects.push(suspect);
      state.currentSuspects.splice(indexOfSuspectInCS, 1);
    },
    MOVE_FROM_CS_TO_NTM(state, suspect) {
      const indexOfSuspectInCS = state.currentSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.notTheMurderer.push(suspect);
      state.currentSuspects.splice(indexOfSuspectInCS, 1);
    },
    MOVE_FROM_LS_TO_CS(state, suspect) {
      const indexOfSuspectInLS = state.leadingSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.currentSuspects.push(suspect);
      state.leadingSuspects.splice(indexOfSuspectInLS, 1);
    },
    MOVE_FROM_LS_TO_NTM(state, suspect) {
      const indexOfSuspectInLS = state.leadingSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.notTheMurderer.push(suspect);
      state.leadingSuspects.splice(indexOfSuspectInLS, 1);
    },
    MOVE_FROM_NTM_TO_CS(state, suspect) {
      const indexOfSuspectInNTM = state.notTheMurderer.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.currentSuspects.push(suspect);
      state.notTheMurderer.splice(indexOfSuspectInNTM, 1);
    },
    MOVE_FROM_NTM_TO_LS(state, suspect) {
      const indexOfSuspectInNTM = state.notTheMurderer.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.leadingSuspects.push(suspect);
      state.notTheMurderer.splice(indexOfSuspectInNTM, 1);
    }
  },
  actions: {
  },
  modules: {
  },
  strict: true
})
