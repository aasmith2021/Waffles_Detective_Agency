import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    startPageFinished: false,
    suspects: [],
    currentSuspects: [],
    leadingSuspects: [],
    notTheMurderer: [],
    murderer: {},
    accusationsRemaining: 2
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
    },
    SET_ALL_CURRENT_SUSPECTS(state, suspects) {
      state.currentSuspects = suspects;
    },
    SET_MURDERER(state, murderer) {
      state.murderer = murderer;
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
    },
    DECREMENT_ACCUSATIONS_REMAINING(state) {
      state.accusationsRemaining--;
    }
  },
  actions: {
  },
  modules: {
  },
  strict: true
})
