import {Leveling} from "./Leveling";

export class Action {
    constructor(id, title, description, icon, action, events) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.action = action;
        this.events = events;

        this.level = new Leveling();
    }

    tick() {
        this.level.tick();
        return this.action.tick() * this.level.bonus();
    }

    bonus() {
        return this.level.bonus();
    }
}