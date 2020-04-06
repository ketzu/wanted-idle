import Vue from "vue";

export const eventStore = {
    state: {
        excluded: {},
        active: [],
        all: {}
    },
    getters: {
    },
    mutations: {
        newGame(state) {
            state.excluded = {};
            state.unlock = {};

            Vue.set(state.unlock, "begToTalking", 5);
        },
        addEvent(state, value) {
            state.unlock[value] = true;
        }
    },
    actions: {
    }
};