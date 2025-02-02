import Vue from 'vue'
import Vuex from 'vuex'
import {actionStore} from "./actions";
import {eventStore} from "./events";
import {EventBus} from "../EventBus";
import {ends, revolvercost, goalMoney, storagename} from "../gamemechanic/constants";
import {ProbabilisticAction} from "../gamemechanic/ProbabilisticAction";
import {SteadyAction} from "../gamemechanic/SteadyAction";
import {Action} from "../gamemechanic/Action";
import {Leveling} from "../gamemechanic/Leveling";

Vue.use(Vuex);

let kongapi = undefined;

export default new Vuex.Store({
  state: {
    minticks: Infinity,
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
    selectedEnd: -1,
    timesReachedEnd: 0,
    endsReached: {}
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
    finished: (state) => state.selectedEnd > -1,
    endsReached: (state) => Array.from(ends.keys()).map((n) => state.endsReached[n] === true? 1 : 0).reduce((a,b) => a+b, 0),
    timesReachedEnd: (state) => state.timesReachedEnd
  },
  mutations: {
    loadFromStore(state) {
      let deserialized = JSON.parse(localStorage.getItem(storagename),(key, value) => {
          if(typeof value !== 'object' || value === null)
            return value;
          if(value.__objtype !== undefined) {
            switch (value.__objtype) {
              case "Leveling": {
                let ret = new Leveling();
                ret.level = value.level;
                ret.exp = value.exp;
                return ret;
              }
              case "ProbabilisticAction": return new ProbabilisticAction(value.probability, value.payoff);
              case "SteadyAction": {
                let ret = new SteadyAction(value.ticks, value.payoff);
                ret.counter = value.counter;
                return ret;
              }
              case "Action": {
                // using icon here sucks!
                let ret = new Action(value.title, value.description, value.icon, value.action, value.events, value.predecessors, value.leaf);
                ret.level = value.level;
                return ret;
              }
            }
          }
          return value;
        });

        this.replaceState(
            Object.assign(state, deserialized)
        );

        state.dotick = false;
    },
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
      state.timesReachedEnd += 1;
      state.endsReached[value] = true;
      state.selectedEnd = value;
      if(state.minticks > state.ticks) {
        state.minticks = state.ticks;
      }
    }
  },
  actions: {
    init({commit}) {
      commit('newGame');
    },
    tick({state, commit, dispatch, getters}) {
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
        if(state.minticks !== Infinity)
          kongapi.stats.submit("minticks", state.minticks);
        kongapi.stats.submit("timesReachedEnd", getters['timesReachedEnd']);
        kongapi.stats.submit("endsReached", getters['endsReached']);
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
    },
    loadKongAPI({state, getters}) {
      // eslint-disable-next-line no-undef
      kongregateAPI.loadAPI(()=>{
        // eslint-disable-next-line no-undef
        kongapi=kongregateAPI.getAPI();
        if(state.minticks !== Infinity)
          kongapi.stats.submit("minticks", state.minticks);
        kongapi.stats.submit("timesReachedEnd", getters['timesReachedEnd']);
        kongapi.stats.submit("endsReached", getters['endsReached']);
      });
    }
  },
  modules: {
    events: eventStore,
    actions: actionStore
  }
})
