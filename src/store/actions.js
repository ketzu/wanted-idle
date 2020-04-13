import Vue from 'vue';
import {Action} from "../gamemechanic/Action";
import {SteadyAction} from "../gamemechanic/SteadyAction";
import {ProbabilisticAction} from "../gamemechanic/ProbabilisticAction";
import {EventBus} from "../EventBus"
import {badActions, goodActions, tickrate} from "../gamemechanic/constants";

export const actionStore = {
    state: {
        active: undefined,
        unlockedactions: [],
        actions: {},
        unlocked: {}
    },
    getters: {
        active: (state) => state.active,
        actions: (state) => state.unlockedactions.map(u => state.actions[u])
    },
    mutations: {
        newGame(state) {
            state.active = undefined;

            state.actions = {
                // base
                begging: new Action("Beg", "Not breaking laws is hard... Please?", "metal_cup", new ProbabilisticAction(0.0091, 3.64), ["begToStealHorse","begToTreasureHunt","begToTelegrapher","begToBountyHunter"]),
                thieving: new Action("Pickpocket", "A quick hand can feed you well.", "bag", new ProbabilisticAction(0.00705,4.72), ["thievToStealHorse","thievToRob"]),
                boxing: new Action("Box", "It hurts, but it's a job!", "hand_hit", new SteadyAction(60,2), ["boxToMobster"]),
                gamble: new Action("Gamble", "High risk; High reward.", "playing_cards", new ProbabilisticAction(0.00012,1500), ["gambleToTrade"]),
                // 1st level
                telegrapher: new Action("Telegraphing", "It's boring but honest work!", "telegraph", new SteadyAction(100,4.8), ["telegrapherToDeadEnd","telegrapherToTreasureHunt","telegrapherToBountyHunter"], ["begging"]),
                mobster: new Action("Batter", "Someone has to beat them to a pulp.", "axe_indian", new SteadyAction(50,2.4), ["mobsterToBreakIn","mobsterToAssasinate"], ["boxing"]),
                rob: new Action("Rob People", "You're in the business of wealth redistribution.", "hand_gun", new ProbabilisticAction(0.00835,5.76), ["robToRobBank","robToRobTrain"], ["thieving"]),
                stealhorse: new Action("Steal Horse", "Oh this one? It's a rescue.", "horse", new ProbabilisticAction(0.00293,16.4), ["stealHorseToStealCattle"], ["begging", "thieving"]),

                // 1+ level
                treasurehunt: new Action("Treasure Hunt", "Let's hope there won't be any snakes.", "compass", new ProbabilisticAction(0.00151,39.48), ["treasureHuntToPrintMoney","treasureHuntToRobGrave"], ["telegrapher", "begging"]),

                breakin: new Action("Burgle", "They won't be homeless without this jewelery!", "cigar_box", new ProbabilisticAction(0.00855,2.2), ["breakInToKidnap","breakInToTrade"], ["mobster"]),
                assassinate: new Action("Assassinate", "It's better than buying politicians!?", "flying_bullet", new ProbabilisticAction(0.0009,100), ["assassinateToTerrorize"], ["mobster"]),
                graverobbery: new Action("Rob Graves", "Is this considered a raid?", "skull_person", new ProbabilisticAction(0.0014,64.22), ["robGraveToPrintMoney"], ["treasurehunt"]),
                robbank: new Action("Rob Bank", "My name is Banks. Rob Banks.", "gold_bar", new ProbabilisticAction(0.00195,44.4), ["robBankToPrintMoney"], ["rob"]),

                // leafs
                stealcattle: new Action("Steal Cattle", "They had thousands! They won't miss this one!", "bull_head", new ProbabilisticAction(0.00825,9.48), [], ["stealhorse"], true),
                deadendjob: new Action("Dead-end Job", "I'm not one of the bad ones!", "hat_sherrif", new SteadyAction(100,8), [], ["telegrapher"], true),
                printmoney: new Action("Print Money", "Non-violent crimes shouldn't be punished!", "bag_money", new SteadyAction(20,2), [], ["treasurehunt", "graverobbery", "robbank"], true),
                bountyhunter: new Action("Bounty Hunt", "Oh yeah! Catching them bad guys!", "wanted_poster_10000", new ProbabilisticAction(0.00435,18.84), [], ["telegrapher", "begging"], true),
                robtrain: new Action("Rob Train", "Couldn't find a mail coach?", "train", new ProbabilisticAction(0.0064,15), [], ["rob"], true),
                terrorize: new Action("Terrorize", "Asymmetric warfare pays well.", "molotov", new ProbabilisticAction(0.00112,88.88), [], ["assassinate"], true),
                tradewithindians: new Action("Trade with Natives", "Not every law is moral.", "indian_boss_head_jewlery", new SteadyAction(200,20), [], ["gamble", "breakin"], true),
                kidnap: new Action("Kidnap", "At least you are not killing anyone.", "lasso", new ProbabilisticAction(0.00167,60), [], ["breakin"], true),
            };

            state.unlockedactions = [
                "begging",
                "thieving",
                "boxing"
            ];
            state.unlocked = {
                begging: true,
                thieving: true,
                boxing: true
            };
        },
        progress(state) {
            state.actions[state.unlockedactions[state.active]].tick(state.actions);
        },
        unlockAction(state, value) {
            Vue.set(state.unlockedactions, state.unlockedactions.length, value);
            state.unlocked[value] = true;
        },
        setActive(state, value) {
            if(value>= 0 && value < state.unlockedactions.length)
                state.active = value;
        }
    },
    actions: {
        tick({dispatch, commit, state, rootState}){
            if(state.active >= 0 && state.active < state.unlockedactions.length) {
                commit('progress');
                let curaction = state.actions[state.unlockedactions[state.active]];
                const reward = curaction.retrieve();
                if(reward !== 0){
                    commit('addCurrency', reward);
                    EventBus.$emit('gainedCurrency', reward);
                }

                if(goodActions[curaction.title] !== undefined)
                    commit('addGoodness', goodActions[curaction.title]);
                if(badActions[curaction.title] !== undefined)
                    commit('addBadness', badActions[curaction.title]);

                if(rootState.ticks < tickrate * 10)
                    return;
                for(let eventname of curaction.events) {
                    dispatch('checkEvent', eventname);
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