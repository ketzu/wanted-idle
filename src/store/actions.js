import Vue from 'vue';
import {Action} from "../gamemechanic/Action";
import {SteadyAction} from "../gamemechanic/SteadyAction";
import {ProbabilisticAction} from "../gamemechanic/ProbabilisticAction";
import {EventBus} from "../EventBus"

export const actionStore = {
    state: {
        active: undefined,
        unlockedactions: [],
        actions: {},
        unlocked: {}
    },
    getters: {
        active: (state) => state.active,
        actions: (state) => state.unlockedactions
    },
    mutations: {
        newGame(state) {
            state.actions = {
                // base
                begging: new Action("Beg", "Placeholder Description Begging", require('@/assets/icons/metal_cup.png'), new ProbabilisticAction(0.0091, 0.91), ["begToStealHorse","begToTreasureHunt","begToTelegrapher","beggingToBountyHunter"]),
                thieving: new Action("Pickpocket", "Placeholder Description Pickpocketing", require('@/assets/icons/bag.png'), new ProbabilisticAction(0.00705,1.18), ["thievToStealHorse","thievToRob"]),
                boxing: new Action("Box", "Placeholder Description Boxing", require('@/assets/icons/hand_hit.png'), new SteadyAction(60,0.5), ["boxToMobster"]),
                gamble: new Action("Gamble", "Placeholder Description Gamling", require('@/assets/icons/playing_cards.png'), new ProbabilisticAction(0.00004,300), ["gambleToTrade"]),
            };

            // 1st level
            Vue.set(state.actions, "telegrapher", new Action("Telegraphing", "Placeholder Description Telegrapher", require('@/assets/icons/telegraph.png'), new SteadyAction(100,1.2), ["telegrapherToDeadEnd","telegrapherToTreasureHunt","telegrapherToBountyHunter"], [state.actions["begging"]]));
            Vue.set(state.actions, "mobster", new Action("Batter", "Placeholder Description Mobster", require('@/assets/icons/axe_indian.png'), new SteadyAction(100,1.2), ["mobsterToBreakIn","mobsterToAssasinate"], [state.actions["boxing"]]));
            Vue.set(state.actions, "rob", new Action("Rob People", "Placeholder Description Rob People", require('@/assets/icons/hand_gun.png'), new ProbabilisticAction(0.00835,1.44), ["robToRobBank","robToRobTrain"], [state.actions["thieving"]]));
            Vue.set(state.actions, "stealhorse", new Action("Steal Horse", "Placeholder Description Steal Horse", require('@/assets/icons/horse.png'), new ProbabilisticAction(0.00293,4.1), ["stealHorseToStealCattle"], [state.actions["begging"], state.actions["thieving"]]));

                // 1+ level
            Vue.set(state.actions, "treasurehunt", new Action("Treasure Hunt", "Placeholder Description Treasure Hunt", require('@/assets/icons/compass.png'), new ProbabilisticAction(0.00095,16.84), ["treasureHuntToPrintMoney","treasureHuntToRobGrave"], [state.actions["telegrapher"], state.actions["begging"]]));

            Vue.set(state.actions, "breakin", new Action("Burgle", "Placeholder Description Burgling", require('@/assets/icons/cigar_box.png'), new ProbabilisticAction(0.00855,1.8), ["breakInToKidnap","breakInToTrade"], [state.actions["mobster"]]));
            Vue.set(state.actions, "assassinate", new Action("Assassinate", "Placeholder Description Asassinate", require('@/assets/icons/flying_bullet.png'), new ProbabilisticAction(0.00045,50), ["assassinateToTerrorize"], [state.actions["mobster"]]));
            Vue.set(state.actions, "graverobbery", new Action("Rob Graves", "Placeholder Description Rob Graves", require('@/assets/icons/skull_person.png'), new ProbabilisticAction(0.0007,32.11), ["robGraveToPrintMoney"], [state.actions["treasurehunt"]]));
            Vue.set(state.actions, "robbank", new Action("Rob Bank", "Placeholder Description Rob Banks", require('@/assets/icons/gold_bar.png'), new ProbabilisticAction(0.00195,11.1), ["robBankToPrintMoney"], [state.actions["rob"]]));

                // leafs
            Vue.set(state.actions, "stealcattle", new Action("Steal Cattle", "Placeholder Description Steal Cattle", require('@/assets/icons/bull_head.png'), new ProbabilisticAction(0.00825,2.37), [], [state.actions["stealhorse"]], true));
            Vue.set(state.actions, "deadendjob", new Action("Dead-end Job", "Placeholder Description Dead End Job", require('@/assets/icons/hat_sherrif.png'), new SteadyAction(100,2), [], [state.actions["telegrapher"]], true));
            Vue.set(state.actions, "printmoney", new Action("Print Money", "Placeholder Description Print Money", require('@/assets/icons/bag_money.png'), new SteadyAction(20,0.5), [], [state.actions["treasurehunt"], state.actions["graverobbery"], state.actions["robbank"]], true));
            Vue.set(state.actions, "bountyhunter", new Action("Bounty Hunt", "Placeholder Description Bounty Hunter", require('@/assets/icons/wanted_poster_10000.png'), new ProbabilisticAction(0.00435,4.61), [], [state.actions["telegrapher"], state.actions["begging"]], true));
            Vue.set(state.actions, "robtrain", new Action("Rob Train", "Placeholder Description Rob Trains", require('@/assets/icons/train.png'), new ProbabilisticAction(0.0064,3.75), [], [state.actions["rob"]], true));
            Vue.set(state.actions, "terrorize", new Action("Terrorize", "Placeholder Description Terrorize", require('@/assets/icons/molotov.png'), new ProbabilisticAction(0.00056,44.44), [], [state.actions["assassinate"]], true));
            Vue.set(state.actions, "tradewithindians", new Action("Indians Trade", "Placeholder Description Trade", require('@/assets/icons/indian_boss_head_jewlery.png'), new SteadyAction(200,5), [], [state.actions["gamble"], state.actions["breakin"]], true));
            Vue.set(state.actions, "kidnap", new Action("Kidnap", "Placeholder Description Kidnapping", require('@/assets/icons/lasso.png'), new ProbabilisticAction(0.00167,15), [], [state.actions["breakin"]], true));

            state.unlockedactions = [
                state.actions["begging"],
                state.actions["thieving"],
                state.actions["boxing"]
            ];
            state.unlocked = {
                begging: true,
                thieving: true,
                boxing: true
            };
        },
        progress(state) {
            state.unlockedactions[state.active].tick();
        },
        unlockAction(state, value) {
            Vue.set(state.unlockedactions, state.unlockedactions.length, state.actions[value]);
            state.unlocked[value] = true;
        },
        setActive(state, value) {
            if(value>= 0 && value < state.unlockedactions.length)
                state.active = value;
        }
    },
    actions: {
        tick({commit, state}){
            if(state.active >= 0 && state.active < state.unlockedactions.length) {
                commit('progress');
                const reward = state.unlockedactions[state.active].retrieve();
                if(reward !== 0){
                    commit('addCurrency', reward);
                    EventBus.$emit('gainedCurrency', reward);
                }
                for(let eventname of state.unlockedactions[state.active].events) {
                    commit('checkEvent', eventname);
                }
            }
        },
        unlockAction({commit, state}, value) {
            if(state.unlocked[value] !== true) {
                commit('unlockAction', value);
            }
        },
        select({commit}, value) {
            commit('setActive', value);
        }
    }
};