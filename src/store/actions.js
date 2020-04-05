import {Action} from "../gamemechanic/Action";
import {SteadyAction} from "../gamemechanic/SteadyAction";
import {ProbabilisticAction} from "../gamemechanic/ProbabilisticAction";

export const actionStore = {
    state: {
        active: undefined,
        actions: []
    },
    getters: {
        begging: (state) => state.begging,
        actions: (state) => state.actions
    },
    mutations: {
        /* eslint-disable no-unused-vars */
        newGame(state) {
            // base
            let begging = new Action("Begging", "", "", new ProbabilisticAction(), []);
            let gamble= new Action("Gamble", "", "", new ProbabilisticAction(), [], []);
            let thieving= new Action("Pickpocket", "", "", new ProbabilisticAction(), []);
            let boxing= new Action("Box", "", "", new ProbabilisticAction(), []);

            // 1st level
            let telegrapher= new Action("Telegraphing", "", "", new SteadyAction(), [], [begging]);
            let mobster= new Action("Batter", "", "", new SteadyAction(), [], [boxing]);
            let rob= new Action("Rob People", "", "", new ProbabilisticAction(), [], [thieving]);
            let stealhorse= new Action("Steal Horse", "", "", new ProbabilisticAction(), [], [begging, thieving]);

            // 1+ level
            let treasurehunt= new Action("Treasure Hunt", "", "", new ProbabilisticAction(), [], [telegrapher, begging]);

            let breakin= new Action("Burgle", "", "", new ProbabilisticAction(), [], [mobster]);
            let assassinate= new Action("Assassinate", "", "", new ProbabilisticAction(), [], [mobster]);
            let graverobbery= new Action("Rob Graves", "", "", new ProbabilisticAction(), [], [treasurehunt]);
            let robbank= new Action("Rob Bank", "", "", new ProbabilisticAction(), [], [rob]);

            // leafs
            let stealcattle= new Action("Steal Cattle", "", "", new ProbabilisticAction(), [], [stealhorse], true);
            let deadendjob= new Action("Dead-end Job", "", "", new SteadyAction(), [], [telegrapher], true);
            let printmoney= new Action("Print Money", "", "", new SteadyAction(), [], [treasurehunt, graverobbery, robbank], true);
            let bountyhunter= new Action("Bounty Hunt", "", "", new ProbabilisticAction(), [], [telegrapher, begging], true);
            let robtrain= new Action("Rob Train", "", "", new ProbabilisticAction(), [], [rob], true);
            let terrorize= new Action("Terrorize", "", "", new ProbabilisticAction(), [], [assassinate], true);
            let tradewithindians= new Action("Indians Trade", "", "", new SteadyAction(), [], [gamble, breakin], true);
            let kidnap= new Action("Kidnap", "", "", new ProbabilisticAction(), [], [breakin], true);
        },
        /* eslint-enable no-unused-vars */
        tick(state) {
            if(state.active !== undefined) {
                state.actions[state.active].tick();
            }
        }
    },
    actions: {

    }
};