import Vue from 'vue';
import {Event} from '../gamemechanic/Event';
import {EventOption} from "../gamemechanic/EventOption";

// Event: title, icon, expectedTimeInSeconds, options
// Option: text, icon, action, params, exclude

export const eventStore = {
    state: {
        excluded: {},
        waiting: [],
        all: {},
        requirerevolver: {}
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
                begToTreasureHunt: new Event("You find a map with a big X marking some kind of spot.", require("@/assets/icons/map.png"), 240, [
                    new EventOption("Search.", require("@/assets/icons/scroll.png"), "unlockAction", "treasurehunt", [] ),
                    new EventOption("Leave it.", require("@/assets/icons/metal_cup.png"))]),
                begToTelegrapher: new Event("Someone has pitty on you and offers you a job.", require("@/assets/icons/sombrero.png"), 120, [
                    new EventOption("Accept.", require("@/assets/icons/telegraph.png"), "unlockAction", "telegrapher", [] ),
                    new EventOption("No thanks.", require("@/assets/icons/metal_cup.png"))]),
                thievToStealHorse: new Event("That guy just left his horse without locking it!", require("@/assets/icons/cap.png"), 60, [
                    new EventOption("Take it.", require("@/assets/icons/saddle.png"), "unlockAction", "stealhorse", [] ),
                    new EventOption("Leave it.", require("@/assets/icons/bag.png"))]),
                boxToMobster: new Event("Someone saw your talent and offered you a job!", require("@/assets/icons/texan_jewlery.png"), 60, [
                    new EventOption("Uhu....", require("@/assets/icons/axe_indian.png"), "unlockAction", "mobster", [] ),
                    new EventOption("Uh...no.", require("@/assets/icons/hand_hit.png"))]),
                stealHorseToStealCattle: new Event("Does that cow belong to anyone?", require("@/assets/icons/bull_head.png"), 240, [
                    new EventOption("Yes, me.", require("@/assets/icons/lasso.png"), "unlockAction", "stealcattle", [] ),
                    new EventOption("Probably.", require("@/assets/icons/water_bottle.png"))]),
                telegrapherToDeadEnd: new Event("'Hey, want a new Job?'", require("@/assets/icons/hat_sherrif.png"), 90, [
                    new EventOption("Yes, Sir!", require("@/assets/icons/sherrif_badge.png"), "unlockAction", "deadendjob", [] ),
                    new EventOption("Hahahaha.", require("@/assets/icons/cactus_tequila.png"))]),
                telegrapherToTreasureHunt: new Event("'Can you telegraph a Map?'", require("@/assets/icons/map.png"), 100, [
                    new EventOption("No...", require("@/assets/icons/cactus_tequila.png")),
                    new EventOption("...yes!", require("@/assets/icons/shovel.png"), "unlockAction", "treasurehunt", [] )]),
                mobsterToBreakIn: new Event("That guy you hit, wont be home tonight.", require("@/assets/icons/barn.png"), 100, [
                    new EventOption("Check it!", require("@/assets/icons/gold_ore.png"), "unlockAction", "breakin", [] ),
                    new EventOption("Poor guy.", require("@/assets/icons/rose.png"))]),
                breakInToKidnap: new Event("This house as a lonely sleeping kid.", require("@/assets/icons/boots.png"), 220, [
                    new EventOption("They'd pay!", require("@/assets/icons/rope.png"), "unlockAction", "kidnap", [] ),
                    new EventOption("Ooops...", require("@/assets/icons/chicken.png"))]),
                breakInToTrade: new Event("You found some native jewlery.", require("@/assets/icons/indian_boss_head_jewlery.png"), 100, [
                    new EventOption("Sell it", require("@/assets/icons/tippi.png"), "unlockAction", "tradewithindians", [] ),
                    new EventOption("Too hot.", require("@/assets/icons/firewood_fire.png"))]),
                gambleToTrade: new Event("You won some native jewlery.", require("@/assets/icons/pipe_indian.png"), 150, [
                    new EventOption("Sell it", require("@/assets/icons/indian_carpet.png"), "unlockAction", "tradewithindians", [] ),
                    new EventOption("Stay lucky!", require("@/assets/icons/horseshoe.png"))]),
                moneyToGamble: new Event("You're rich! Wanna risk some?.", require("@/assets/icons/playing_cards.png"), 100, [
                    new EventOption("I'm lucky!", require("@/assets/icons/cigar.png"), "unlockAction", "Gamble", [] ),
                    new EventOption("A trap!", require("@/assets/icons/bear_trap.png"))]),
                assassinateToTerrorize: new Event("Wanna try s'mthing ev'n more deprived?", require("@/assets/icons/dynamite.png"), 220, [
                    new EventOption("I'm lucky!", require("@/assets/icons/molotov.png"), "unlockAction", "terrorize", [] ),
                    new EventOption("I'll stay.", require("@/assets/icons/sniper_rifle.png"))]),
                robToRobBank: new Event("Why not follow the money?", require("@/assets/icons/gold_bar.png"), 160, [
                    new EventOption("Oh yeah!", require("@/assets/icons/hand_gun.png"), "unlockAction", "robbank", [] ),
                    new EventOption("Too dangerous.", require("@/assets/icons/hot_sauce.png"))]),
                robToRobTrain: new Event("Rich people like trains!", require("@/assets/icons/train.png"), 160, [
                    new EventOption("Let's ask them!", require("@/assets/icons/carriage_coal.png"), "unlockAction", "robtrain", [] ),
                    new EventOption("Just...how?", require("@/assets/icons/white_flag.png"))]),
                robBankToPrintMoney: new Event("Hey, there's a press plate.", require("@/assets/icons/book.png"), 120, [
                    new EventOption("A federal crime?", require("@/assets/icons/cuffs.png")),
                    new EventOption("Hardly a crime!", require("@/assets/icons/bag_money.png"), "unlockAction", "printmoney", [] )]),
                treasureHuntToPrintMoney: new Event("You found a money press!", require("@/assets/icons/book.png"), 280, [
                    new EventOption("A federal crime!", require("@/assets/icons/cuffs.png")),
                    new EventOption("Noone woudl know.", require("@/assets/icons/bag_money.png"), "unlockAction", "printmoney", [] )]),
                treasureHuntToRobGrave: new Event("Rich people like trains!", require("@/assets/icons/train.png"), 160, [
                    new EventOption("Let's ask them!", require("@/assets/icons/carriage_coal.png"), "unlockAction", "graverobbery", [] ),
                    new EventOption("Just...how?", require("@/assets/icons/white_flag.png"))]),
                robGraveToPrintMoney: new Event("Was this a federal grave?", require("@/assets/icons/book.png"), 180, [
                    new EventOption("Rather the skulls!", require("@/assets/icons/skull_person.png")),
                    new EventOption("A money press!", require("@/assets/icons/bag_money.png"), "unlockAction", "printmoney", [] )]),
                telegrapherToBountyHunter: new Event("You know the face of this client...", require("@/assets/icons/wanted_poster_10000.png"), 90, [
                    new EventOption("SHERRIF!", require("@/assets/icons/sherrif_badge.png"), "unlockAction", "bountyhunter", [] ),
                    new EventOption("They're famous?", require("@/assets/icons/cap_trapper.png"))]),
                beggingToBountyHunter: new Event("You know the face of that bastard!", require("@/assets/icons/wanted_poster_10000.png"), 90, [
                    new EventOption("Let's ask!", require("@/assets/icons/hand_gun.png"), "unlockAction", "bountyhunter", [] ),
                    new EventOption("Don't think so.", require("@/assets/icons/fishing_rod.png"))]),
                thievToRob: new Event("'What'cha doin there?", require("@/assets/icons/donkey.png"), 90, [
                    new EventOption("Nothing...", require("@/assets/icons/hand_gun.png"), "unlockAction", "rob", [] ),
                    new EventOption("Nothing!!", require("@/assets/icons/cactus.png"))]),
                mobsterToAssasinate: new Event("'Can ya' go n'further on th'a next?'", require("@/assets/icons/skull_person.png"), 90, [
                    new EventOption("Su'a!", require("@/assets/icons/shaving_knive.png"), "unlockAction", "assassinate", [] ),
                    new EventOption("Wha???", require("@/assets/icons/glass_bottle.png"))]),
                moneyToRevolver: new Event("'Can ya' go n'further on th'a next?'", require("@/assets/icons/revolver.png"), 90, [
                    new EventOption("Buy it!", require("@/assets/icons/holster_revolver.png"), "unlockAction", "", [] ),
                    new EventOption("No need.", require("@/assets/icons/dream_catcher.png"))])
            };
            state.waiting = [];
            state.requirerevolver = {
                mobsterToAssasinate: true,
                thievToRob: true,
                beggingToBountyHunter: true,
                telegrapherToBountyHunter: true
            };
        },
        addEvent(state, value) {
            if(state.all[value] !== undefined)
                Vue.set(state.waiting, state.waiting.length, state.all[value]);
        },
        removeEvent(state, index) {
            Vue.delete(state.waiting, index);
        },
        excludeEvent(state, name) {
            Vue.set(state.excluded, name, true);
        }
    },
    actions: {
        fulfilEvent({state, commit}, value) {
            const index = state.waiting.findIndex(e => e.title === value);
            if(index > -1)
                commit('removeEvent', index)
        },
        checkEvent({state, commit, rootState}, value) {
            if(state.all[value] !== undefined && state.excluded[value] !== true) {
                if(state.requirerevolver[value] && !rootState.revolver)
                    return;
                if(state.all[value].fires()) {
                    commit('addEvent', value);
                }
            }
        }
    }
};