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
    revolver: false,
    music: true,
    effects: true,
    musicvolume: 1,
    effectsvolume: 1
  },
  getters: {
    initialized: (state) => state.initialized,
    money: (state) => state.money,
    tickrate: (state) => state.tickrate,
    revolver: (state) => state.revolver,
    music: (state) => state.music,
    effects: (state) => state.effects,
    musicvolume: (state) => state.musicvolume,
    effectsvolume: (state) => state.effectsvolume
  },
  mutations: {
    toggleffects(state) {
      state.effects = !state.effects;
    },
    togglmusic(state) {
      state.music = !state.music;
    },
    setmusic(state, volume){
      state.musicvolume = volume;
    },
    seteffects(state, volume){
      state.effectsvolume = volume;
    },
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
