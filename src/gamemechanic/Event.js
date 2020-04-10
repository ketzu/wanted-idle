import {tickrate} from "./constants";

export class Event {
    constructor(title, icon, expectedTimeInSeconds, options) {
        this.title = title;
        this.icon = icon;
        this.probability = tickrate / (expectedTimeInSeconds * 1000);

        this.options = options;
    }

    fires(probabilityBoost) {
        if(probabilityBoost === undefined)
            probabilityBoost = 1;
        const randomnes =  Math.random();
        return randomnes < (this.probability * probabilityBoost);
    }
}