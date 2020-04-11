import Vue from 'vue'
import Vuex from 'vuex'
import {actionStore} from "./actions";
import {eventStore} from "./events";
import {EventBus} from "../EventBus";
import {revolvercost} from "../gamemechanic/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialized: false,
    ticks: 0,
    money: 0,
    revolver: false,
    music: true,
    effects: true,
    musicvolume: 0.25,
    effectsvolume: 1,
    goodyshoes: 0,
    badguy: 0
  },
  getters: {
    initialized: (state) => state.initialized,
    money: (state) => state.money,
    ticks: (state) => state.ticks,
    revolver: (state) => state.revolver,
    music: (state) => state.music,
    effects: (state) => state.effects,
    musicvolume: (state) => state.musicvolume,
    effectsvolume: (state) => state.effectsvolume,
    goodness: (state) => state.goodyshoes,
    badness: (state) => state.badguy
  },
  mutations: {
    toggleffects(state) {
      state.effects = !state.effects;
    },
    addGoodness(state, value){
      state.goodyshoes += value;
    },
    addBadness(state, value){
      state.badguy += value;
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
      state.goodyshoes = 0;
      state.badness = 0;
      state.money = 0;
      state.ticks = 0;
      state.revolver = false;
      state.initialized = true;
    },
    addCurrency(state, value) {
      state.money += value;
    },
    tick(state){
      state.ticks += 1;
    },
    unlockRevolver(state) {
      state.revolver = true;
      state.money -= revolvercost;
    }
  },
  actions: {
    init({commit}) {
      commit('newGame');
    },
    tick({state, commit, dispatch}) {
      commit('tick');
      if(state.money > 10) {
        dispatch('checkEvent', "moneyToGamble");
      }
      if(state.money > revolvercost) {
        dispatch('checkEvent', "moneyToRevolver");
      }
    },
    gainMoney({commit}, value){
      commit('addCurrency', value);
      EventBus.$emit('gainedCurrency', value);
    },
    unlockRevolver({commit}) {
      commit('unlockRevolver');
    },
    gainGoodness({commit}){
      commit('addGoodness', 1);
    },
    gainBadness({commit}, value){
      commit('addBadness', value);
    }
  },
  modules: {
    events: eventStore,
    actions: actionStore
  }
})
