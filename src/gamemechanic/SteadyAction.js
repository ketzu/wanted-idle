export class SteadyAction {
    constructor(ticks, payoff) {
        this.ticks = ticks;
        this.payoff = payoff;

        this.counter = 0;
    }

    tick() {
        this.counter += 1;

        if(this.counter >= this.ticks){
            this.counter = 0;
            return this.payoff;
        }
        return 0;
    }
}