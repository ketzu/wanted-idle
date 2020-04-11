import Vue from 'vue';
import {Event} from '../gamemechanic/Event';
import {EventOption} from "../gamemechanic/EventOption";
import {EventBus} from "../EventBus";

// Event: title, icon, expectedTimeInSeconds, options
// Option: text, icon, action, params, exclude

export const eventStore = {
    state: {
        unlocked: {},
        excluded: {},
        waiting: [],
        all: {},
        requirerevolver: {}
    },
    getters: {
        events: (state) => state.waiting,
        excludeds: (state) => state.excluded
    },
    mutations: {
        newGame(state) {
            state.unlocked = {};
            state.excluded = {};
            state.all = {
                begToStealHorse: new Event("You see an unattended horse.", require("@/assets/icons/horse.png"), 60, [
                    new EventOption("Take it.", require("@/assets/icons/horse.png"), "unlockAction", "stealhorse", ['begToStealHorse','thievToStealHorse'] ),
                    new EventOption("Leave it.", require("@/assets/icons/metal_cup.png"), "gainGoodness", "")]),
                begToTreasureHunt: new Event("You find a map with a big X marking some kind of spot.", require("@/assets/icons/map.png"), 240, [
                    new EventOption("Search.", require("@/assets/icons/scroll.png"), "unlockAction", "treasurehunt", ['begToTreasureHunt','telegrapherToTreasureHunt'] ),
                    new EventOption("Leave it.", require("@/assets/icons/metal_cup.png"), 'gainMoney', 1)]),
                begToTelegrapher: new Event("Someone has pitty on you and offers you a job.", require("@/assets/icons/sombrero.png"), 120, [
                    new EventOption("Accept.", require("@/assets/icons/telegraph.png"), "unlockAction", "telegrapher", ['begToTelegrapher'] ),
                    new EventOption("No thanks.", require("@/assets/icons/metal_cup.png"), 'gainMoney', 0.5)]),
                thievToStealHorse: new Event("That guy just left his horse without locking it!", require("@/assets/icons/cap.png"), 60, [
                    new EventOption("Take it.", require("@/assets/icons/saddle.png"), "unlockAction", "stealhorse", ['begToStealHorse','thievToStealHorse'] ),
                    new EventOption("Leave it.", require("@/assets/icons/bag.png"), 'gainMoney', 0.5)]),
                boxToMobster: new Event("Someone saw your talent and offered you a job!", require("@/assets/icons/texan_jewlery.png"), 60, [
                    new EventOption("Uhu....", require("@/assets/icons/axe_indian.png"), "unlockAction", "mobster", ['boxToMobster'] ),
                    new EventOption("Uh...no.", require("@/assets/icons/hand_hit.png"), "gainGoodness", "")]),
                stealHorseToStealCattle: new Event("Does that cow belong to anyone?", require("@/assets/icons/bull_head.png"), 240, [
                    new EventOption("Yes, me.", require("@/assets/icons/lasso.png"), "unlockAction", "stealcattle", ['stealHorseToStealCattle'] ),
                    new EventOption("Probably.", require("@/assets/icons/water_bottle.png"), "gainMoney", 2)]),
                telegrapherToDeadEnd: new Event("'Hey, want a new Job?'", require("@/assets/icons/hat_sherrif.png"), 90, [
                    new EventOption("Yes, Sir!", require("@/assets/icons/sherrif_badge.png"), "unlockAction", "deadendjob", ['telegrapherToDeadEnd'] ),
                    new EventOption("Hahahaha.", require("@/assets/icons/cactus_tequila.png"), 'gainMoney', -5)]),
                telegrapherToTreasureHunt: new Event("'Can you telegraph a Map?'", require("@/assets/icons/map.png"), 100, [
                    new EventOption("No...", require("@/assets/icons/cactus_tequila.png"), "gainGoodness", ""),
                    new EventOption("...yes!", require("@/assets/icons/shovel.png"), "unlockAction", "treasurehunt", ['begToTreasureHunt','telegrapherToTreasureHunt'] )]),
                mobsterToBreakIn: new Event("That guy you hit, wont be home tonight.", require("@/assets/icons/barn.png"), 100, [
                    new EventOption("Check it!", require("@/assets/icons/gold_ore.png"), "unlockAction", "breakin", ['mobsterToBreakIn'] ),
                    new EventOption("Poor guy.", require("@/assets/icons/rose.png"), "gainGoodness", "")]),
                breakInToKidnap: new Event("This house as a lonely sleeping kid.", require("@/assets/icons/boots.png"), 220, [
                    new EventOption("They'd pay!", require("@/assets/icons/rope.png"), "unlockAction", "kidnap", ['breakInToKidnap'] ),
                    new EventOption("Ooops...", require("@/assets/icons/chicken.png"), "gainMoney", 1)]),
                breakInToTrade: new Event("You found some native jewlery.", require("@/assets/icons/indian_boss_head_jewlery.png"), 100, [
                    new EventOption("Sell it", require("@/assets/icons/tippi.png"), "unlockAction", "tradewithindians", ['breakInToTrade','gambleToTrade'] ),
                    new EventOption("Too hot.", require("@/assets/icons/firewood_fire.png"), "gainGoodness", "")]),
                gambleToTrade: new Event("You won some native jewlery.", require("@/assets/icons/pipe_indian.png"), 150, [
                    new EventOption("Sell it", require("@/assets/icons/indian_carpet.png"), "unlockAction", "tradewithindians", ['breakInToTrade','gambleToTrade'] ),
                    new EventOption("Stay lucky!", require("@/assets/icons/horseshoe.png"), "gainGoodness", "")]),
                moneyToGamble: new Event("You're rich! Wanna risk some?.", require("@/assets/icons/playing_cards.png"), 100, [
                    new EventOption("I'm lucky!", require("@/assets/icons/cigar.png"), "unlockAction", "gamble", ['moneyToGamble'] ),
                    new EventOption("A trap!", require("@/assets/icons/bear_trap.png"), "gainGoodness", "")]),
                assassinateToTerrorize: new Event("Wanna try s'mthing ev'n more deprived?", require("@/assets/icons/dynamite.png"), 220, [
                    new EventOption("I'm lucky!", require("@/assets/icons/molotov.png"), "unlockAction", "terrorize", ['assassinateToTerrorize'] ),
                    new EventOption("I'll stay.", require("@/assets/icons/sniper_rifle.png"), "gainMoney", 5)]),
                robToRobBank: new Event("Why not follow the money?", require("@/assets/icons/gold_bar.png"), 160, [
                    new EventOption("Oh yeah!", require("@/assets/icons/hand_gun.png"), "unlockAction", "robbank", ['robToRobBank'] ),
                    new EventOption("Too dangerous.", require("@/assets/icons/hot_sauce.png"), "gainMoney", 5)]),
                robToRobTrain: new Event("Rich people like trains!", require("@/assets/icons/train.png"), 160, [
                    new EventOption("Let's ask them!", require("@/assets/icons/carriage_coal.png"), "unlockAction", "robtrain", ['robToRobTrain'] ),
                    new EventOption("Just...how?", require("@/assets/icons/white_flag.png"), "gainMoney", 5)]),
                robBankToPrintMoney: new Event("Hey, there's a press plate.", require("@/assets/icons/book.png"), 120, [
                    new EventOption("A federal crime?", require("@/assets/icons/cuffs.png"), "gainBadness", 5),
                    new EventOption("Hardly a crime!", require("@/assets/icons/bag_money.png"), "unlockAction", "printmoney", ['robBankToPrintMoney','treasureHuntToPrintMoney','robGraveToPrintMoney'] )]),
                treasureHuntToPrintMoney: new Event("You found a money press!", require("@/assets/icons/book.png"), 280, [
                    new EventOption("No prison!", require("@/assets/icons/cuffs.png"), "gainGoodness", ""),
                    new EventOption("Noone would know.", require("@/assets/icons/bag_money.png"), "unlockAction", "printmoney", ['robBankToPrintMoney','treasureHuntToPrintMoney','robGraveToPrintMoney'] )]),
                treasureHuntToRobGrave: new Event("Your treasure seems to be a grave.", require("@/assets/icons/signpost.png"), 160, [
                    new EventOption("Oh even better!", require("@/assets/icons/skull_person.png"), "unlockAction", "graverobbery", ['treasureHuntToRobGrave'] ),
                    new EventOption("That's sacred!", require("@/assets/icons/totem.png"), "gainGoodness", "")]),
                robGraveToPrintMoney: new Event("Was this a federal grave?", require("@/assets/icons/book.png"), 180, [
                    new EventOption("Rather the skulls!", require("@/assets/icons/skull_person.png"), "gainGoodness", ""),
                    new EventOption("A money press!", require("@/assets/icons/bag_money.png"), "unlockAction", "printmoney", ['robBankToPrintMoney','treasureHuntToPrintMoney','robGraveToPrintMoney'] )]),
                telegrapherToBountyHunter: new Event("You know the face of this client...", require("@/assets/icons/wanted_poster_10000.png"), 90, [
                    new EventOption("SHERRIF!", require("@/assets/icons/sherrif_badge.png"), "unlockAction", "bountyhunter", ['telegrapherToBountyHunter','begToBountyHunter'] ),
                    new EventOption("They're famous?", require("@/assets/icons/cap_trapper.png"), "gainGoodness", "")]),
                begToBountyHunter: new Event("You know the face of that bastard!", require("@/assets/icons/wanted_poster_10000.png"), 90, [
                    new EventOption("Let's ask!", require("@/assets/icons/hand_gun.png"), "unlockAction", "bountyhunter", ['telegrapherToBountyHunter','begToBountyHunter'] ),
                    new EventOption("Don't think so.", require("@/assets/icons/fishing_rod.png"), "gainMoney", 1)]),
                thievToRob: new Event("'What'cha doin there?'", require("@/assets/icons/donkey.png"), 90, [
                    new EventOption("Nothing...", require("@/assets/icons/hand_gun.png"), "unlockAction", "rob", ['thievToRob'] ),
                    new EventOption("Nothing!!", require("@/assets/icons/cactus.png"), "gainMoney", 0.3)]),
                mobsterToAssasinate: new Event("'Can ya' go n'further on th'a next?'", require("@/assets/icons/skull_person.png"), 90, [
                    new EventOption("Su'a!", require("@/assets/icons/shaving_knive.png"), "unlockAction", "assassinate", ['mobsterToAssasinate'] ),
                    new EventOption("Wha???", require("@/assets/icons/glass_bottle.png"), "gainMoney", 1)]),
                moneyToRevolver: new Event("Maybe you should buy a weapon?", require("@/assets/icons/revolver.png"), 1, [
                    new EventOption("Buy it!", require("@/assets/icons/holster_revolver.png"), "unlockRevolver", "", ['moneyToRevolver'] ),
                    new EventOption("No need.", require("@/assets/icons/dream_catcher.png"))])
            };
            state.waiting = [];
            state.requirerevolver = {
                mobsterToAssasinate: true,
                thievToRob: true,
                begToBountyHunter: true,
                telegrapherToBountyHunter: true
            };
        },
        addEvent(state, value) {
            if(state.all[value] !== undefined){
                Vue.set(state.waiting, state.waiting.length, state.all[value]);
                Vue.set(state.unlocked, value,  true);
            }
        },
        removeEvent(state, index) {
            Vue.delete(state.waiting, index);
        },
        excludeEvent(state, name) {
            Vue.set(state.excluded, name, true);
            const excludedindex = state.waiting.findIndex(e => e.title === state.all[name].title);
            if(excludedindex > -1){
                Vue.delete(state.waiting, excludedindex);
            }
        }
    },
    actions: {
        fulfilEvent({state, commit}, {eventtitle, optiontitle}) {
            const index = state.waiting.findIndex(e => e.title === eventtitle);
            if(index > -1){
                const optionindex = state.waiting[index].options.findIndex((e) => e.text === optiontitle);
                const exclusions = state.waiting[index].options[optionindex].exclude;
                commit('removeEvent', index);
                if(optionindex > -1){
                    for(let eventname of exclusions) {
                        commit('excludeEvent', eventname);
                    }
                }
            }
        },
        checkEvent({state, commit, rootState}, value) {
            if (state.all[value] !== undefined && state.excluded[value] !== true && state.unlocked[value] !== true) {
                if (state.requirerevolver[value] && !rootState.revolver)
                    return;
                if (state.all[value].fires()) {
                    commit('addEvent', value);
                    EventBus.$emit('EventFired', value);
                }
            }
        },
        testEvents({commit}) {
            const eventlist = ["begToStealHorse","begToTreasureHunt","begToTelegrapher","thievToStealHorse","boxToMobster","stealHorseToStealCattle","telegrapherToDeadEnd","telegrapherToTreasureHunt","mobsterToBreakIn","breakInToKidnap","breakInToTrade","gambleToTrade","moneyToGamble","assassinateToTerrorize","robToRobBank","robToRobTrain","robBankToPrintMoney","treasureHuntToPrintMoney","treasureHuntToRobGrave","robGraveToPrintMoney","telegrapherToBountyHunter","begToBountyHunter","thievToRob","mobsterToAssasinate","moneyToRevolver"];
            for(let ev of eventlist) {
                commit('addEvent', ev);
            }
        }
    }
};