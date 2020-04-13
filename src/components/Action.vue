<template>
    <v-card color="#C4A56C" :raised="active" :outlined="!active" style="border-color: black;">
        <v-list-item three-line ripple @click="click">
            <v-list-item-avatar
                    tile
                    size="80"
            >
                <img :src="icon_path">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
                <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
            </v-list-item-content>

            <Level :level="level"></Level>
        </v-list-item>

        <v-progress-linear
                color="#4B3309"
                :value="action.counter*100/action.ticks || 0"
                height="15"
                buffer-value="0"
                :stream="active && action.counter === undefined"
        ></v-progress-linear>
    </v-card>
</template>

<script>
    import Level from "./Level";
    import {images} from "../gamemechanic/constants";

    export default {
        name: "Action",
        components: {Level},
        props: ['title', 'icon', 'description', 'active', 'level', 'index', 'action'],
        computed: {
            icon_path() {
                return images[this.icon];
            }
        },
        methods: {
            click() {
                this.$store.dispatch('select', this.index);
            }
        }
    }
</script>

<style scoped>
.v-progress-linear {
    transition: none !important;
}
</style>
