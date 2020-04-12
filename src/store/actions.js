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
                begging: new Action("Beg", "Not breaking laws is hard... Please?", require('@/assets/icons/metal_cup.png'), new ProbabilisticAction(0.0091, 1.82), ["begToStealHorse","begToTreasureHunt","begToTelegrapher","begToBountyHunter"]),
                thieving: new Action("Pickpocket", "A quick hand can feed you well.", require('@/assets/icons/bag.png'), new ProbabilisticAction(0.00705,2.36), ["thievToStealHorse","thievToRob"]),
                boxing: new Action("Box", "It hurts, but it's a job!", require('@/assets/icons/hand_hit.png'), new SteadyAction(60,1), ["boxToMobster"]),
                gamble: new Action("Gamble", "High risk; High reward.", require('@/assets/icons/playing_cards.png'), new ProbabilisticAction(0.00008,1000), ["gambleToTrade"]),
                // 1st level
                telegrapher: new Action("Telegraphing", "It's boring but honest work!", require('@/assets/icons/telegraph.png'), new SteadyAction(100,2.4), ["telegrapherToDeadEnd","telegrapherToTreasureHunt","telegrapherToBountyHunter"], ["begging"]),
                mobster: new Action("Batter", "Someone has to beat them to a pulp.", require('@/assets/icons/axe_indian.png'), new SteadyAction(100,2.4), ["mobsterToBreakIn","mobsterToAssasinate"], ["boxing"]),
                rob: new Action("Rob People", "You're in the business of wealth redistribution.", require('@/assets/icons/hand_gun.png'), new ProbabilisticAction(0.00835,2.88), ["robToRobBank","robToRobTrain"], ["thieving"]),
                stealhorse: new Action("Steal Horse", "Oh this one? It's a rescue.", require('@/assets/icons/horse.png'), new ProbabilisticAction(0.00293,8.2), ["stealHorseToStealCattle"], ["begging", "thieving"]),

                // 1+ level
                treasurehunt: new Action("Treasure Hunt", "Let's hope there won't be any snakes.", require('@/assets/icons/compass.png'), new ProbabilisticAction(0.00151,19.74), ["treasureHuntToPrintMoney","treasureHuntToRobGrave"], ["telegrapher", "begging"]),

                breakin: new Action("Burgle", "They won't be homless without this jewlery!", require('@/assets/icons/cigar_box.png'), new ProbabilisticAction(0.00855,3.6), ["breakInToKidnap","breakInToTrade"], ["mobster"]),
                assassinate: new Action("Assassinate", "It's better than buying politicians!?", require('@/assets/icons/flying_bullet.png'), new ProbabilisticAction(0.0009,50), ["assassinateToTerrorize"], ["mobster"]),
                graverobbery: new Action("Rob Graves", "Is this considered a raid?", require('@/assets/icons/skull_person.png'), new ProbabilisticAction(0.0014,32.11), ["robGraveToPrintMoney"], ["treasurehunt"]),
                robbank: new Action("Rob Bank", "My name is Banks. Rob Banks.", require('@/assets/icons/gold_bar.png'), new ProbabilisticAction(0.00195,22.2), ["robBankToPrintMoney"], ["rob"]),

                // leafs
                stealcattle: new Action("Steal Cattle", "They had thousands! They won't miss this one!", require('@/assets/icons/bull_head.png'), new ProbabilisticAction(0.00825,4.74), [], ["stealhorse"], true),
                deadendjob: new Action("Dead-end Job", "I'm not one of the bad ones!", require('@/assets/icons/hat_sherrif.png'), new SteadyAction(100,4), [], ["telegrapher"], true),
                printmoney: new Action("Print Money", "Non-violent crimes shouldn't be punished!", require('@/assets/icons/bag_money.png'), new SteadyAction(20,1), [], ["treasurehunt", "graverobbery", "robbank"], true),
                bountyhunter: new Action("Bounty Hunt", "Oh yeah! Cathing them bad guys!", require('@/assets/icons/wanted_poster_10000.png'), new ProbabilisticAction(0.00435,9.42), [], ["telegrapher", "begging"], true),
                robtrain: new Action("Rob Train", "Couldn't find a mail coach?", require('@/assets/icons/train.png'), new ProbabilisticAction(0.0064,7.5), [], ["rob"], true),
                terrorize: new Action("Terrorize", "Asymmetric warfare pays well.", require('@/assets/icons/molotov.png'), new ProbabilisticAction(0.00112,44.44), [], ["assassinate"], true),
                tradewithindians: new Action("Trade with Natives", "Not every law is moral.", require('@/assets/icons/indian_boss_head_jewlery.png'), new SteadyAction(200,10), [], ["gamble", "breakin"], true),
                kidnap: new Action("Kidnap", "At least you are not killing anyone.", require('@/assets/icons/lasso.png'), new ProbabilisticAction(0.00167,30), [], ["breakin"], true),
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