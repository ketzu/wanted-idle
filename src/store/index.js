import Vue from 'vue'
import Vuex from 'vuex'
import {actionStore} from "./actions";
import {eventStore} from "./events";
import {EventBus} from "../EventBus";
import {ends, revolvercost, goalMoney} from "../gamemechanic/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialized: false,
    ticks: 0,
    dotick: false,
    money: 0,
    revolver: false,
    music: true,
    effects: true,
    musicvolume: 0.25,
    effectsvolume: 1,
    goodyshoes: 0,
    badguy: 0,
    selectedEnd: -1
  },
  getters: {
    initialized: (state) => state.initialized,
    money: (state) => state.money,
    ticks: (state) => state.ticks,
    dotick: (state) => state.dotick,
    revolver: (state) => state.revolver,
    music: (state) => state.music,
    effects: (state) => state.effects,
    musicvolume: (state) => state.musicvolume,
    effectsvolume: (state) => state.effectsvolume,
    goodness: (state) => state.goodyshoes,
    badness: (state) => state.badguy,
    goalMoney: () => goalMoney,
    end: (state) => state.selectedEnd > -1? ends[state.selectedEnd] : undefined,
    finished: (state) => state.selectedEnd > -1
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
      state.dotick = false;
      state.goodyshoes = 0;
      state.badguy = 0;
      state.money = 0;
      state.ticks = 0;
      state.revolver = false;
      state.selectedEnd = -1;
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
    },
    startTicking(state) {
      state.dotick = true;
    },
    stopTicking(state) {
      state.dotick = false;
    },
    setEnd(state, value) {
      state.selectedEnd = value;
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

      if(state.money >= goalMoney) {
          commit('stopTicking');
          if(state.badguy > state.goodyshoes + 100) {
            commit('setEnd', 0);
          }else if(state.badguy === 0) {
            commit('setEnd', 2);
          }else{
            commit('setEnd', 1);
          }
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
