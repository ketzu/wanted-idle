import {tickrate} from "./constants";

export class Event {
    constructor(title, icon, expectedTimeInSeconds, options) {
        this.title = title;
        this.icon = icon;
        this.probability = 1 / (expectedTimeInSeconds * tickrate);

        this.options = options;
    }

    tick(probabilityBoost) {
        if(probabilityBoost === undefined)
            probabilityBoost = 1;
        return Math.random() < (this.probability * probabilityBoost);
    }
}