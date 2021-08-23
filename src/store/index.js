import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    stolenObjects: ['Graeter\'s ice cream', 'pretzels', 'cinnamon roasted almonds', 'hamburgers', 'Skyline Chili', 'LaRosa\'s Pizza', 'cotton candy', 'hot dogs', 'funnel cakes', 'Savannah Soft Serve ice cream cones', 'lemonade'],
    stolenObject: '',
    startPageFinished: false,
    exitGame: false,
    suspects: [],
    currentSuspects: [],
    leadingSuspects: [],
    notTheThief: [],
    thief: {},
    accusationsRemaining: 2
  },
  mutations: {
    SET_STOLEN_OBJECT(state, stolenObject) {
      state.stolenObject = stolenObject;
    },
    SET_START_PAGE_TO_FINISHED(state) {
      state.startPageFinished = true;
    },
    SET_EXIT_GAME_TO_TRUE(state) {
      state.exitGame = true;
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
    SET_THIEF(state, thief) {
      state.thief = thief;
    },
    MOVE_FROM_CS_TO_LS(state, suspect) {
      const indexOfSuspectInCS = state.currentSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.leadingSuspects.push(suspect);
      state.currentSuspects.splice(indexOfSuspectInCS, 1);
    },
    MOVE_FROM_CS_TO_NTT(state, suspect) {
      const indexOfSuspectInCS = state.currentSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.notTheThief.push(suspect);
      state.currentSuspects.splice(indexOfSuspectInCS, 1);
    },
    MOVE_FROM_LS_TO_CS(state, suspect) {
      const indexOfSuspectInLS = state.leadingSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.currentSuspects.push(suspect);
      state.leadingSuspects.splice(indexOfSuspectInLS, 1);
    },
    MOVE_FROM_LS_TO_NTT(state, suspect) {
      const indexOfSuspectInLS = state.leadingSuspects.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.notTheThief.push(suspect);
      state.leadingSuspects.splice(indexOfSuspectInLS, 1);
    },
    MOVE_FROM_NTT_TO_CS(state, suspect) {
      const indexOfSuspectInNTT = state.notTheThief.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.currentSuspects.push(suspect);
      state.notTheThief.splice(indexOfSuspectInNTT, 1);
    },
    MOVE_FROM_NTT_TO_LS(state, suspect) {
      const indexOfSuspectInNTT = state.notTheThief.findIndex((element) => {
        return element.name === suspect.name;
      });

      state.leadingSuspects.push(suspect);
      state.notTheThief.splice(indexOfSuspectInNTT, 1);
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
