import {Leveling} from "./Leveling";

export class Action {
    constructor(title, description, icon, actionImplementation, events, predecessors, leaf) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.action = actionImplementation;
        if(events !== undefined)
            this.events = events;
        else
            this.events = [];

        // if it is a leaf, give it a bonus
        this.leafbonus = leaf?1.5:1;

        // this can level up
        this.level = new Leveling();

        if(predecessors !== undefined)
            this.predecessors = predecessors;
        else
            this.predecessors = [];

        this.reward = 0;
    }

    tick(actions) {
        this.level.tick();
        const prebonus =  Math.max(1, ...this.predecessors.map(p => actions[p].bonus()));
        this.reward += this.action.tick() * this.level.bonus() * prebonus * this.leafbonus;
    }

    retrieve() {
        const reward = this.reward;
        this.reward = 0;
        return reward;
    }

    bonus() {
        return this.level.bonus();
    }

    toJSON() {
        return {__objtype: "Action", ...this};
    }
}