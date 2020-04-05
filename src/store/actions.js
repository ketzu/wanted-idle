import Vue from 'vue';
import {Action} from "../gamemechanic/Action";
import {SteadyAction} from "../gamemechanic/SteadyAction";
import {ProbabilisticAction} from "../gamemechanic/ProbabilisticAction";

export const actionStore = {
    state: {
        active: undefined,
        unlockedactions: [],
        actions: {},
        unlocked: {}
    },
    getters: {
        begging: (state) => state.begging,
        actions: (state) => state.unlockedactions
    },
    mutations: {
        newGame(state) {
            state.unlockedactions = [];
            state.actions = {};
            state.unlocked = {};
            
            // base
            Vue.set(state.actions, "begging", new Action("Beg", "Placeholder Description Begging", require('@/assets/icons/metal_cup.png'), new ProbabilisticAction(), []));
            Vue.set(state.actions, "gamble", new Action("Gamble", "Placeholder Description Gamling", require('@/assets/icons/playing_cards.png'), new ProbabilisticAction(), [], []));
            Vue.set(state.actions, "thieving", new Action("Pickpocket", "Placeholder Description Pickpocketing", require('@/assets/icons/bag.png'), new ProbabilisticAction(), []));
            Vue.set(state.actions, "boxing", new Action("Box", "Placeholder Description Boxing", require('@/assets/icons/hand_hit.png'), new ProbabilisticAction(), []));

            // 1st level
            Vue.set(state.actions, "telegrapher", new Action("Telegraphing", "Placeholder Description Telegrapher", require('@/assets/icons/telegraph.png'), new SteadyAction(), [], [state.actions["begging"]]));
            Vue.set(state.actions, "mobster", new Action("Batter", "Placeholder Description Mobster", require('@/assets/icons/axe_indian.png'), new SteadyAction(), [], [state.actions["boxing"]]));
            Vue.set(state.actions, "rob", new Action("Rob People", "Placeholder Description Rob People", require('@/assets/icons/hand_gun.png'), new ProbabilisticAction(), [], [state.actions["thieving"]]));
            Vue.set(state.actions, "stealhorse", new Action("Steal Horse", "Placeholder Description Steal Horse", require('@/assets/icons/horse.png'), new ProbabilisticAction(), [], [state.actions["begging"], state.actions["thieving"]]));

            // 1+ level
            Vue.set(state.actions, "treasurehunt", new Action("Treasure Hunt", "Placeholder Description Treasure Hunt", require('@/assets/icons/compass.png'), new ProbabilisticAction(), [], [state.actions["telegrapher"], state.actions["begging"]]));

            Vue.set(state.actions, "breakin", new Action("Burgle", "Placeholder Description Burgling", require('@/assets/icons/cigar_box.png'), new ProbabilisticAction(), [], [state.actions["mobster"]]));
            Vue.set(state.actions, "assassinate", new Action("Assassinate", "Placeholder Description Asassinate", require('@/assets/icons/flying_bullet.png'), new ProbabilisticAction(), [], [state.actions["mobster"]]));
            Vue.set(state.actions, "graverobbery", new Action("Rob Graves", "Placeholder Description Rob Graves", require('@/assets/icons/skull_person.png'), new ProbabilisticAction(), [], [state.actions["treasurehunt"]]));
            Vue.set(state.actions, "robbank", new Action("Rob Bank", "Placeholder Description Rob Banks", require('@/assets/icons/gold_bar.png'), new ProbabilisticAction(), [], [state.actions["rob"]]));

            // leafs
            Vue.set(state.actions, "stealcattle", new Action("Steal Cattle", "Placeholder Description Steal Cattle", require('@/assets/icons/bull_head.png'), new ProbabilisticAction(), [], [state.actions["stealhorse"]], true));
            Vue.set(state.actions, "deadendjob", new Action("Dead-end Job", "Placeholder Description Dead End Job", require('@/assets/icons/hat_sherrif.png'), new SteadyAction(), [], [state.actions["telegrapher"]], true));
            Vue.set(state.actions, "printmoney", new Action("Print Money", "Placeholder Description Print Money", require('@/assets/icons/bag_money.png'), new SteadyAction(), [], [state.actions["treasurehunt"], state.actions["graverobbery"], state.actions["robbank"]], true));
            Vue.set(state.actions, "bountyhunter", new Action("Bounty Hunt", "Placeholder Description Bounty Hunter", require('@/assets/icons/wanted_poster_10000.png'), new ProbabilisticAction(), [], [state.actions["telegrapher"], state.actions["begging"]], true));
            Vue.set(state.actions, "robtrain", new Action("Rob Train", "Placeholder Description Rob Trains", require('@/assets/icons/train.png'), new ProbabilisticAction(), [], [state.actions["rob"]], true));
            Vue.set(state.actions, "terrorize", new Action("Terrorize", "Placeholder Description Terrorize", require('@/assets/icons/molotov.png'), new ProbabilisticAction(), [], [state.actions["assassinate"]], true));
            Vue.set(state.actions, "tradewithindians", new Action("Indians Trade", "Placeholder Description Trade", require('@/assets/icons/indian_boss_head_jewlery.png'), new SteadyAction(), [], [state.actions["gamble"], state.actions["breakin"]], true));
            Vue.set(state.actions, "kidnap", new Action("Kidnap", "Placeholder Description Kidnapping", require('@/assets/icons/lasso.png'), new ProbabilisticAction(), [], [state.actions["breakin"]], true));
        },
        tick(state) {
            if(state.active >= 0 && state.active < state.unlockedactions.length) {
                state.unlockedactions[state.active].tick();
            }
        },
        unlockAction(state, value) {
            if(state.unlocked[value] !== true) {
                Vue.set(state.unlockedactions, state.unlockedactions.length, state.actions[value]);
                state.unlocked[value] = true;
            }
        }
    },
    actions: {

    }
};