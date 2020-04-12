export class Leveling {
    constructor() {
        this.level = 1;
        this.exp = 0;
        this.levelups = [
            0, 1000, 2000, 4000, 8000, 16000, 32000, Infinity
        ];
        this.boni = [
          0, 1, 1.05, 1.15, 1.3, 1.5, 2, 3
        ];
    }

    tick() {
        this.exp += 1;
        if(this.exp > this.levelups[this.level])
            this.level += 1;
    }

    bonus() {
        return this.boni[this.level];
    }

    nextlevelexp() {
        return this.levelups[this.level];
    }

    baselevelexp() {
        return this.levelups[this.level-1];
    }

    toJSON() {
        return {__objtype: "Leveling", ...this};
    }
}