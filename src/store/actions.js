import {Action} from "../gamemechanic/Action";

export const actionStore = {
    state: {
        begging: undefined,
        telegrapher: undefined,
        deadendjob: undefined,
        treasurehunt: undefined,
        bountyhunter: undefined,

        boxing: undefined,
        gamble: undefined,
        tradewithindians: undefined,
        graverobbery: undefined,

        thieving: undefined,
        stealhorse: undefined,
        stealcattle: undefined,
        rob: undefined,
        mobster: undefined,
        breakin: undefined,
        printmoney: undefined,

        kidnap: undefined,
        assassinate: undefined,
        terrorize: undefined,
        robbank: undefined,
        robtrain: undefined
    },
    getters: {
        begging: (state) => state.begging,
    },
    mutations: {
        newGame(state) {
            state.begging = new Action();
            state.telegrapher= new Action();
            state.deadendjob= new Action();
            state.treasurehunt= new Action();
            state.bountyhunter= new Action();

            state.boxing= new Action();
            state.gamble= new Action();
            state.tradewithindians= new Action();
            state.graverobbery= new Action();

            state.thieving= new Action();
            state.stealhorse= new Action();
            state.stealcattle= new Action();
            state.rob= new Action();
            state.mobster= new Action();
            state.breakin= new Action();
            state.printmoney= new Action();

            state.kidnap= new Action();
            state.assassinate= new Action();
            state.terrorize= new Action();
            state.robbank= new Action();
            state.robtrain= new Action();
        },
    },
    actions: {

    }
};