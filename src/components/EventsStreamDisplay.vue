<template>
    <div>
    </div>
</template>

<script>
    import {EventBus} from "../EventBus";
    import {mapGetters} from "vuex";

    const eventsounds = {
        begToStealHorse: new Audio(require('@/assets/sounds/error_01.mp3')),
        begToTreasureHunt: new Audio(require('@/assets/sounds/error_01.mp3')),
        begToTelegrapher: new Audio(require('@/assets/sounds/error_01.mp3')),
        thievToStealHorse: new Audio(require('@/assets/sounds/error_01.mp3')),
        boxToMobster: new Audio(require('@/assets/sounds/error_01.mp3')),
        stealHorseToStealCattle: new Audio(require('@/assets/sounds/error_01.mp3')),
        telegrapherToDeadEnd: new Audio(require('@/assets/sounds/error_01.mp3')),
        telegrapherToTreasureHunt: new Audio(require('@/assets/sounds/error_01.mp3')),
        mobsterToBreakIn: new Audio(require('@/assets/sounds/Selected 3.mp3')),
        breakInToKidnap: new Audio(require('@/assets/sounds/error_01.mp3')),
        breakInToTrade: new Audio(require('@/assets/sounds/error_01.mp3')),
        gambleToTrade: new Audio(require('@/assets/sounds/buy_cashregister_01.mp3')),
        moneyToGamble: new Audio(require('@/assets/sounds/chips_multi_slide_002.wav')),
        assassinateToTerrorize: new Audio(require('@/assets/sounds/woodexplode_01.mp3')),
        robToRobBank: new Audio(require('@/assets/sounds/error_01.mp3')),
        robToRobTrain: new Audio(require('@/assets/sounds/error_01.mp3')),
        robBankToPrintMoney: new Audio(require('@/assets/sounds/error_01.mp3')),
        treasureHuntToPrintMoney: new Audio(require('@/assets/sounds/error_01.mp3')),
        treasureHuntToRobGrave: new Audio(require('@/assets/sounds/error_01.mp3')),
        robGraveToPrintMoney: new Audio(require('@/assets/sounds/error_01.mp3')),
        telegrapherToBountyHunter: new Audio(require('@/assets/sounds/error_01.mp3')),
        begToBountyHunter: new Audio(require('@/assets/sounds/error_01.mp3')),
        thievToRob: new Audio(require('@/assets/sounds/error_01.mp3')),
        mobsterToAssasinate: new Audio(require('@/assets/sounds/error_01.mp3')),
        moneyToRevolver: new Audio(require('@/assets/sounds/error_01.mp3'))
    };

    export default {
        name: "EventsStreamDisplay",
        methods: {
            eventUnlocked(value) {
                console.log(value);
                if(eventsounds[value] instanceof Audio)
                    eventsounds[value].play();
            }
        },
        computed: {
            ...mapGetters(['effects', 'effectsvolume'])
        },
        mounted() {
            for(let sound in eventsounds){
                if(eventsounds[sound] instanceof Audio)
                    eventsounds[sound].volume = this.effectsvolume;
            }
            EventBus.$on('EventFired', this.eventUnlocked);
        },
        beforeDestroy() {
            EventBus.$off('EventFired', this.eventUnlocked);
        },
        watch: {
            effectsvolume (newvalue) {
                for(let sound in eventsounds){
                    if(eventsounds[sound] instanceof Audio)
                        eventsounds[sound].volume = newvalue;
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