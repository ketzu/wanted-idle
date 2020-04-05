export class ProbabilisticAction {
    constructor(probability, payoff) {
        this.probability = probability;
        this.payoff = payoff;
    }

    tick() {
        if(Math.random() > this.probability){
            return this.payoff;
        }
        return 0;
    }
}