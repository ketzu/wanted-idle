function normal01(x) {
    return 535.334*Math.pow(x,9)-2409.006*Math.pow(x,8)+4404.405*Math.pow(x,7)-4173.389*Math.pow(x,6)+2176.255*Math.pow(x,5)-628.182*Math.pow(x,4)+104.473*Math.pow(x,3)-9.218*Math.pow(x,2)+0.326*x
}

function normal(x) {
    return normal01(x) * 2 - 1;
}

export class ProbabilisticAction {
    constructor(probability, payoff) {
        this.probability = probability;
        this.payoff = payoff;
    }

    tick() {
        if(Math.random() < this.probability){
            return this.payoff + this.payoff * 0.3 * normal(Math.random());
        }
        return 0;
    }
}