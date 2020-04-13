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

export const images = {
    metal_cup: require('@/assets/icons/metal_cup.png'),
    bag: require('@/assets/icons/bag.png'),
    hand_hit: require('@/assets/icons/hand_hit.png'),
    playing_cards: require('@/assets/icons/playing_cards.png'),
    telegraph: require('@/assets/icons/telegraph.png'),
    axe_indian: require('@/assets/icons/axe_indian.png'),
    hand_gun: require('@/assets/icons/hand_gun.png'),
    horse: require('@/assets/icons/horse.png'),
    compass: require('@/assets/icons/compass.png'),
    cigar_box: require('@/assets/icons/cigar_box.png'),
    flying_bullet: require('@/assets/icons/flying_bullet.png'),
    skull_person: require('@/assets/icons/skull_person.png'),
    gold_bar: require('@/assets/icons/gold_bar.png'),
    bull_head: require('@/assets/icons/bull_head.png'),
    hat_sherrif: require('@/assets/icons/hat_sherrif.png'),
    bag_money: require('@/assets/icons/bag_money.png'),
    wanted_poster_10000: require('@/assets/icons/wanted_poster_10000.png'),
    train: require('@/assets/icons/train.png'),
    molotov: require('@/assets/icons/molotov.png'),
    indian_boss_head_jewlery: require('@/assets/icons/indian_boss_head_jewlery.png'),
    lasso: require('@/assets/icons/lasso.png')
};

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