export class Leveling {
    constructor() {
        this.level = 1;
        this.exp = 0;
        this.levelups = [
            0, 1000, 2000, 4000, 8000, 16000, Infinity
        ];
        this.bonus = [
          0, 1, 1.05, 1.15, 1.3, 1.5, 2
        ];
    }

    tick() {
        this.exp += 1;
        if(this.exp > this.levelups[this.level])
            this.level += 1;
    }

    bonus() {
        return this.bonus[this.level];
    }
}