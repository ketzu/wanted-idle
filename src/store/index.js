import Vue from 'vue'
import Vuex from 'vuex'
import {Generator, Improvement, Requirement} from "@/store/generator";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialized: false,
    ticks: 0,
    goal: 10000,
    currency: 0,
    intelligence: 0,
    dexterity: 0,
    strength: 0,
    generators: [],
    unusedgenerators: [],
    activegen: -1,
    tickrate: 50
  },
  getters: {
    initialized: (state) => state.initialized,
    currency: (state) => state.currency,
    generators: (state) => state.generators,
    int: (state) => state.intelligence,
    dex: (state) => state.dexterity,
    str: (state) => state.strength,
    goal: (state) => state.goal,
    tickrate: (state) => state.tickrate
  },
  mutations: {
    newGame(state) {
      let _maxstat = 20;
      state.intelligence = 5 + Math.round(Math.random() * _maxstat);
      state.dexterity = 5 + Math.round(Math.random() * _maxstat);
      state.strength = 5 + Math.round(Math.random() * _maxstat);

      state.currency = 0;

      state.generators = [];

      let generators = [
        new Generator("Beg", "Ask and you shall receive.", require('@/assets/icons/metal_cup.png'), 0.05, 0.6, 0.4, new Requirement(5,5,5,0), new Improvement(40,15,15)),
        new Generator("Thievery", "Try to get some coins without getting noticed.", require('@/assets/icons/bag.png'), 0.15, 0.2, 0.1, new Requirement(5,5,15,0), new Improvement(25,15,35)),
        new Generator("Boxing", "Hit and get hit in the underground arena.", require('@/assets/icons/hand_hit.png'), 0.15, 0.2, 0.1, new Requirement(5,15,5,0), new Improvement(15,35,25)),

        new Generator("Robbing", "Try to rob some travelers.", require('@/assets/icons/hand_gun.png'), 0.3, 9, 3, new Requirement(10,25,15,3), new Improvement(0,50,40)),
        new Generator("Smuggle Alcohol", "There was never a time, when alcohol didn't sell.", require('@/assets/icons/cactus_tequila.png'), 0.15, 17, 3, new Requirement(25,15,15,2), new Improvement(55,20,20)),
        new Generator("Steal Horses", "Are people actually paying attention to horses?", require('@/assets/icons/horse.png'), 0.3, 7.5, 1.8, new Requirement(15,15,30,0), new Improvement(20,35,50)),

        new Generator("Poker", "Bet, bluff and win... or lose.", require('@/assets/icons/playing_cards.png'), 0.35, 15, 24, new Requirement(25,15,15,20), new Improvement(75,0,35)),
        new Generator("Kidnapping", "This one should be worth something to someone!", require('@/assets/icons/lasso.png'), 0.08, 43, 15, new Requirement(25,15,40,10), new Improvement(35,0,70)),
        new Generator("Train Robbery", "Just take from the rich.", require('@/assets/icons/train.png'), 0.175, 30, 4, new Requirement(15,50,30,0), new Improvement(20,65,50)),

        new Generator("Bounty Hunt", "You could be rich with just making it once.", require('@/assets/icons/wanted_poster_10000.png'), 0.0005, 6000, 5000, new Requirement(25,50,50,3), new Improvement(45,65,75)),

        new Generator("Deal Drug", "Everyone will be your friend.", require('@/assets/icons/package.png'), 0.2, 50, 30, new Requirement(75,15,35,30), new Improvement(95,0,55)),
        new Generator("Assasinate", "There is always someone willing to pay for you.", require('@/assets/icons/flying_bullet.png'), 0.04, 240, 60, new Requirement(25,25,60,20), new Improvement(45,0,90)),
        new Generator("Bank Robbery", "Just take from the richest.", require('@/assets/icons/gold_bar.png'), 0.1, 90, 40, new Requirement(15,70,50,0), new Improvement(30,95,50)),

        new Generator("Print Fake Money", "Who can tell the difference anyways?", require('@/assets/icons/bag_money.png'), 0.35, 12, 24, new Requirement(85,45,55,100), new Improvement(115,0,85)),
        new Generator("Plunder Military", "They don'tk now what to do with it!", require('@/assets/icons/cannon.png'), 0.08, 35, 15, new Requirement(45,75,80,100), new Improvement(65,85,110)),
        new Generator("Terrorise", "Extreme Money requires extreme measures.", require('@/assets/icons/molotov.png'), 0.175, 24, 4, new Requirement(50,85,60,100), new Improvement(70,105,75))
      ];

      for(let gen of generators) {
        Vue.set(state.unusedgenerators, state.unusedgenerators.length, gen);
      }

      state.activegen = -1;

      state.ticks = 0;

      state.initialized = true;
    },
    addCurrency(state, {value}) {
      state.currency += value;
    },
    activate(state, index) {
      state.activegen = index;
    },
    updateGenerator(state) {
      let value = 0;
      state.generators[state.activegen].tick();
      value += state.generators[state.activegen].retrieve();
      state.currency += value;
    },
    addGenerators(state, generators) {
      for(let index of generators.reverse()) {
        Vue.set(state.generators, state.generators.length, state.unusedgenerators[index]);
        Vue.delete(state.unusedgenerators, index);
      }
    },
    tick(state){
      state.ticks += 1;
    },
    incIntelligence(state){
      state.intelligence += 1;
    },
    incStrength(state){
      state.strength += 1;
    },
    incDexterity(state){
      state.dexterity += 1;
    }
  },
  actions: {
    init({commit}) {
      commit('newGame');
    },
    tick({commit, state}) {
      commit('tick');

      // add new generators
      let add_genetarors = [];
      for(let i=0; i<state.unusedgenerators.length; i+=1) {
        const gen = state.unusedgenerators[i];
        if(gen.can_activate(state.intelligence, state.strength, state.dexterity, state.currency)) {
          add_genetarors.push(i);
        }
      }
      if(add_genetarors.length > 0)
        commit('addGenerators', add_genetarors);

      // compute actual tick stuff
      if(0 <= state.activegen && state.activegen < state.generators.length) {
        commit('updateGenerator');
        const improvement = state.generators[state.activegen].improves;
        const tickspermin = 60*1000/state.tickrate;
        const probability = 10/(tickspermin*improvement.amount);
        if(improvement.int > state.intelligence) {
          const roll = Math.random();
          if(roll <= probability) {
            commit('incIntelligence');
          }
        }
        if(improvement.dex > state.dexterity) {
          const roll = Math.random();
          if(roll <= probability) {
            commit('incDexterity');
          }
        }
        if(improvement.str > state.strength) {
          const roll = Math.random();
          if(roll <= probability) {
            commit('incStrength');
          }
        }
      }
    },
    selected({commit, state}, name) {
      for(let i=0; i<state.generators.length; i+=1) {
        if(state.generators[i].name == name) {
          commit('activate', i);
        }
      }
    }
  },
  modules: {
  }
})
