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

    fire(commit) {
        if(this.action !== undefined)
            commit(this.action, this.params);

        for(let excluded of this.exclude) {
            commit('excludeEvents', excluded);
        }
    }
}