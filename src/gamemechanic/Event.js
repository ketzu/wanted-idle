import {tickrate} from "./constants";

export class Event {
    constructor(id, title, description, icon, expectedTimeInSeconds, options) {
        this.id = id;
        this.title = title;
        this.description = description;
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