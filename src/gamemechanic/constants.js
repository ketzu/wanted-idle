import {End} from "./End";

export const storagename = "wanted-idle-v1";

export const tickrate = 100;

export const revolvercost = 30;

export const goalMoney = 5000;

export const ends = [
    new End("A Dead End.", "They finally cought up to you. There seems to be no escape: They'll put you on the noose.", require("@/assets/icons/galgen.png")),
    new End("Onwards.", "People had enough of you, they chased you away. Time to search a new home... shouldn't be too hard with your treasure.", require("@/assets/icons/carriage_people.png")),
    new End("This wasn't planned...", "... so wait, there's a medal somewhere around here for you. You actually went for the good path? I'm impressed, as are the people. They elect you their mayor.", require("@/assets/icons/medal.png"))
];



export const goodActions = {
    "Beg": 1,
    "Box": 0.5,
    "Gamble":0.2,
    "Telegraphing":5,
    "Treasure Hunt":1,
    "Dead-end Job":5,
    "Bounty Hunt":3,
    "Indians Trade":1
};

export const badActions = {
    "Pickpocket":2,
    "Box": 0.5,
    "Gamble":0.5,
    "Batter":5,
    "Rob People":3,
    "Steal Horse":3,
    "Burgle":7,
    "Assassinate":20,
    "Rob Graves":15,
    "Rob Bank":15,
    "Steal Cattle":10,
    "Dead-end Job":-1,
    "Print Money":7,
    "Bounty Hunt":-0.2,
    "Rob Train":15,
    "Terrorize":50,
    "Indians Trade":1,
    "Kidnap":20
};