export class EventOption {
    constructor(text, icon, action, params, exclude) {
        this.text = text;
        this.icon = icon;

        this.action = action;
        this.params = params;

        if(exclude === undefined)
            this.exclude = [];
        else
            this.exclude = exclude;
    }
}