<template>
    <v-card color="#C4A56C" :elevation="active?10:1">
        <v-list-item three-line ripple @click="click">
            <v-list-item-avatar
                    tile
                    size="80"
            >
                <img :src="icon">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
                <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
            </v-list-item-content>

            <Level :level="level"></Level>
        </v-list-item>

        <v-progress-linear
                color="#4B3309"
                :indeterminate="active && action.counter === undefined"
                :value="action.counter*100/action.ticks || 0"
                height="15"
        ></v-progress-linear>
    </v-card>
</template>

<script>
    import Level from "./Level";
    export default {
        name: "Action",
        components: {Level},
        props: ['title', 'icon', 'description', 'active', 'level', 'index', 'action'],
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
