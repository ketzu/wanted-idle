export class Requirement {
    constructor(int, str, dex, gold) {
        this.int = int;
        this.str = str;
        this.dex = dex;
        this.gold = gold;
    }
}

export class Improvement {
    constructor(maxint, maxstr, maxdex) {
        this.int = maxint;
        this.str = maxstr;
        this.dex = maxdex;
        this.amount = 0;
        if(maxint>0) this.amount += 1;
        if(maxstr>0) this.amount += 1;
        if(maxdex>0) this.amount += 1;
        if(this.amount === 0) this.amount = 100;
    }
}

export class Generator {
    constructor(name, description, icon, rate, value, spread, requires, improves) {
        this.name = name;
        this.icon = icon;
        this.rate = rate;
        this.value = value;
        this.spread = spread;
        this.desc = description;
        this.requires = requires;
        this.improves = improves;

        this.progress = 0;
        this.store = 0;
    }

    can_activate(int, str, dex, gold) {
        return int >= this.requires.int
            && str >= this.requires.str
            && dex >= this.requires.dex
            && gold >= this.requires.gold;
    }

    tick() {
        this.progress += this.rate;
        if(this.progress >= 100.0) {
            this.progress = 0;
            this.store += this.value + (Math.random()-0.5) * this.spread;
        }
    }

    retrieve() {
        let tmp = this.store;
        this.store = 0;
        return tmp;
    }
}

let generators = [
    new Generator("Beg", "Ask and you shall receive.", require('@/assets/icons/metal_cup.png'), 0.05, 0.6, 0.4, new Requirement(5,5,5,0), new Improvement(40,15,15)),
    new Generator("Thievery", "Try to get some coins without getting noticed.", require('@/assets/icons/bag.png'), 0.15, 0.2, 0.1, new Requirement(5,5,15,0), new Improvement(25,15,35)),
    new Generator("Boxing", "Hit and get hit in the underground arena.", require('@/assets/icons/hand_hit.png'), 0.15, 0.2, 0.1, new Requirement(5,15,5,0), new Improvement(15,35,25)),

    new Generator("Robbing", "Try to rob some travelers.", require('@/assets/icons/hand_gun.png'), 0.3, 9, 3, new Requirement(10,25,15,3), new Improvement(0,50,40)),
    new Generator("Smuggle Alcohol", "There was never a time, when alcohol didn't sell.", require('@/assets/icons/cactus_tequila.png'), 0.15, 17, 3, new Requirement(25,15,15,2), new Improvement(55,20,20)),
    new Generator("Steal Horses", "Are people actually paying attention to horses?", require('@/assets/icons/horse.png'), 0.3, 7.5, 1.8, new Requirement(15,15,30,0), new Improvement(20,35,50)),

    new Generator("Poker", "Bet, bluff and win... or lose.", require('@/assets/icons/playing_cards.png'), 0.35, 15, 24, new Requirement(25,15,15,20), new Improvement(75,0,35)),
    new Generator("Kidnapping", "This one should be worth something to someone!", require('@/assets/icons/lasso.png'), 0.08, 43, 15, new Requirement(25,15,40,10), new Improvement(35,0,70)),
    new Generator("Train Robbery", "Just take from the rich.", require('@/assets/icons/train.png'), 0.175, 30, 4, new Requirement(15,50,30,0), new Improvement(20,65,50)),

    new Generator("Bounty Hunt", "You could be rich with just making it once.", require('@/assets/icons/wanted_poster_10000.png'), 0.0005, 6000, 5000, new Requirement(25,50,50,3), new Improvement(45,65,75)),

    new Generator("Deal Drug", "Everyone will be your friend.", require('@/assets/icons/package.png'), 0.2, 50, 30, new Requirement(75,15,35,30), new Improvement(95,0,55)),
    new Generator("Assasinate", "There is always someone willing to pay for you.", require('@/assets/icons/flying_bullet.png'), 0.04, 240, 60, new Requirement(25,25,60,20), new Improvement(45,0,90)),
    new Generator("Bank Robbery", "Just take from the richest.", require('@/assets/icons/gold_bar.png'), 0.1, 90, 40, new Requirement(15,70,50,0), new Improvement(30,95,50)),

    new Generator("Print Fake Money", "Who can tell the difference anyways?", require('@/assets/icons/bag_money.png'), 0.35, 12, 24, new Requirement(85,45,55,100), new Improvement(115,0,85)),
    new Generator("Plunder Military", "They don'tk now what to do with it!", require('@/assets/icons/cannon.png'), 0.08, 35, 15, new Requirement(45,75,80,100), new Improvement(65,85,110)),
    new Generator("Terrorise", "Extreme Money requires extreme measures.", require('@/assets/icons/molotov.png'), 0.175, 24, 4, new Requirement(50,85,60,100), new Improvement(70,105,75))
];