import Vue from 'vue'
import Vuex from 'vuex'
import {actionStore} from "./actions";
import {eventStore} from "./events";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialized: false,
    ticks: 0,
    money: 0,
    revolver: false
  },
  getters: {
    initialized: (state) => state.initialized,
    money: (state) => state.money,
    tickrate: (state) => state.tickrate,
    revolver: (state) => state.revolver
  },
  mutations: {
    newGame(state) {
      state.money = 0;
      state.ticks = 0;
      state.initialized = true;
      state.revolver = false;
    },
    addCurrency(state, value) {
      state.money += value;
    },
    tick(state){
      state.ticks += 1;
    }
  },
  actions: {
    init({commit}) {
      commit('newGame');
    },
    tick({commit}) {
      commit('tick');
      // const tickspermin = 60*1000/state.tickrate;
    }
  },
  modules: {
    events: eventStore,
    actions: actionStore
  }
})
