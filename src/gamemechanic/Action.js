import {Leveling} from "./Leveling";

export class Action {
    constructor(title, description, icon, actionImplementation, events, predecessors, leaf) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.action = actionImplementation;
        this.events = events;

        // if it is a leaf, give it a bonus
        this.leafbonus = leaf?1.5:1;

        // this can level up
        this.level = new Leveling();

        if(predecessors !== undefined)
            this.predecessors = predecessors;
        else
            this.predecessors = [];
    }

    tick() {
        this.level.tick();
        const prebonus =  Math.max(1, ...this.predecessors.map(p => p.bonus()));
        return this.action.tick() * this.level.bonus() * prebonus * this.leafbonus;
    }

    bonus() {
        return this.level.bonus();
    }
}