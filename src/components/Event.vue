<template>
        <v-list-item three-line>
            <v-list-item-avatar tile size="80">
                <img :src="icon">
            </v-list-item-avatar>

            <v-list-item-content>
                <h2>{{ title }}</h2>
            </v-list-item-content>

            <v-list-item-action :key="index" v-for="(option,index) of options">
                <EventOption :option="option"></EventOption>
            </v-list-item-action>
        </v-list-item>
</template>

<script>
    import EventOption from "./EventOption";

    export default {
        name: "Event",
        props: ['title', 'description', 'icon', 'options'],
        components: {EventOption}
    }
</script>

<style scoped>

</style>