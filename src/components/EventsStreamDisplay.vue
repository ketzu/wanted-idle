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

    const eventsounds = [
    ];

    export default {
        name: "EventsStreamDisplay",
        data: function () {
            return {
                gaindvalues: [],
                idstore: 0
            }
        },
        methods: {
            eventUnlocked() {
                for(let sound of eventsounds)
                    sound.play();
            }
        },
        computed: {
            ...mapGetters(['effects', 'effectsvolume'])
        },
        mounted() {
            for(let sound of eventsounds){
                sound.volume = this.effectsvolume;
            }
            EventBus.$on('EventFired', this.eventUnlocked);
        },
        beforeDestroy() {
            EventBus.$off('EventFired', this.eventUnlocked);
        },
        watch: {
            effectsvolume (newvalue) {
                for(let sound of eventsounds){
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