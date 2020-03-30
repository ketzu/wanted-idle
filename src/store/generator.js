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

// let g = new Generator();
