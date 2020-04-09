<template>
    <div class="display-1">
        <span :key="value.id" v-for="(value,index) of gaindvalues">
            <span :style="'z-index:'+(22+index)+'; font-family: QuentinCaps; color: black; position:fixed; margin-top:-20px;'" class="fadeInAndOut">
                <v-icon color="black" style="margin-top:-15px;">fas fa-plus</v-icon>
                {{ value.value.toFixed(2) }}
            </span>
        </span>
    </div>
</template>

<script>
    import {EventBus} from "../EventBus";
    import {mapGetters} from "vuex";

    const coinsounds = [
        new Audio(require('@/assets/sounds/coin_1.wav')),
        new Audio(require('@/assets/sounds/coin_2.wav')),
        new Audio(require('@/assets/sounds/coin_3.wav')),
        new Audio(require('@/assets/sounds/coin_4.wav')),
        new Audio(require('@/assets/sounds/coin_5.wav')),
        new Audio(require('@/assets/sounds/coin_6.wav'))
    ];

    export default {
        name: "EventStreamDisplay",
        data: function () {
            return {
                gaindvalues: [],
                idstore: 0
            }
        },
        methods: {
            gainedCurrency(value) {
                this.gaindvalues.push({value: value, id: this.idstore});
                this.idstore += 1;
                setTimeout(() => this.gaindvalues.shift(), 2000);

                if(this.effects)
                    coinsounds[Math.floor(Math.random()*coinsounds.length)].play();
            }
        },
        computed: {
            ...mapGetters(['effects', 'effectsvolume'])
        },
        mounted() {
            for(let sound of coinsounds){
                sound.volume = this.effectsvolume;
            }
            EventBus.$on('gainedCurrency', this.gainedCurrency);
        },
        beforeDestroy() {
            EventBus.$off('gainedCurrency', this.gainedCurrency);
        },
        watch: {
            effectsvolume (newvalue) {
                for(let sound of coinsounds){
                    sound.volume = newvalue;
                }
            }
        }
    }
</script>

<style scoped>
    .fadeInAndOut {
        opacity: 1;
        animation: fade 2s linear;
        animation: moveup 2s linear;
    }

    @keyframes moveup {
        from {bottom: 0px;}
        to {bottom: 60px;}
    }

    @keyframes fade {
        0%,100% { opacity: 0 }
        10%,30% { opacity: 1 }
    }
</style>