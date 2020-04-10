import Vue from 'vue';
import {Event} from '../gamemechanic/Event';
import {EventOption} from "../gamemechanic/EventOption";

// Event: title, icon, expectedTimeInSeconds, options
// Option: text, icon, action, params, exclude

export const eventStore = {
    state: {
        excluded: {},
        waiting: [],
        all: {}
    },
    getters: {
        events: (state) => state.waiting
    },
    mutations: {
        newGame(state) {
            state.excluded = {};
            state.all = {
                begToStealHorse: new Event("You see an unattended horse.", require("@/assets/icons/horse.png"), 60, [
                    new EventOption("Take it.", require("@/assets/icons/horse.png"), "unlockAction", "stealhorse", [] ),
                    new EventOption("Leave it.", require("@/assets/icons/metal_cup.png"))]),
            };
            state.waiting = [state.all['begToStealHorse']];
        },
        addEvent(state, value) {
            if(state.all[value] !== undefined)
                Vue.set(state.waiting, state.waiting.length, state.all[value]);
        },
        removeEvent(state, index) {
            Vue.delete(state.waiting, index);
        }
    },
    actions: {
        fulfilEvent({state, commit}, value) {
            console.log(value);
            const index = state.waiting.findIndex(e => e.title === value);
            if(index > -1)
                commit('removeEvent', index)
        }
    }
};