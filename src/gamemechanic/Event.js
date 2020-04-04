export class Event {
    constructor(id, title, description, icon, options, probability) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.probability = probability;

        this.options = options;
    }
}