export const eventStore = {
    state: {
        begToTel: undefined,
        begToStealHorse: undefined,
        begToTreasureHunt: undefined,
        begToBountyHunt: undefined,

        thievToStealHorse: undefined,
        thievToRob: undefined,

        boxingToMobster: undefined,
        stealHorseToCattle: undefined,

        moneyToGamble: undefined,
        moneyToRevolver: undefined,

        mobsterToBreakIn: undefined,
        mobsterToAssassinate: undefined,

        telegrapherToDeadEndJob: undefined,
        telegrapherToTreasureHunt: undefined,
        telegrapherToBountyHunter: undefined,

        gambleToTradeWithIndians: undefined,

        breakInToTradeWithIndians: undefined,
        breakInToKidnap: undefined,

        treasureHuntToGraveRobbery: undefined,
        treasureHuntToPrintMoney: undefined,

        graveRobberyToPrintMoney: undefined,

        robToRobTrain: undefined,
        robToRobBank: undefined,

        assassinateToTerrorize: undefined,

        robBankToPrintMoney: undefined
    },
    getters: {
        unlocked: (state) => {
            return state.unlockTelegrapher;
        }
    },
    mutations: {
        newGame(state) {
            state.unlockTelegrapher = undefined;
        },
    },
    actions: {

    }
};