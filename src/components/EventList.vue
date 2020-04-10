<template>
    <v-row class="mx-3" v-if="events.length > 0">
        <v-col cols="12">
            <v-card color="#C4A56C" class="mx-5" outlined style="border-color: black;">
                <v-card-title>
                    <h2>Decisions</h2>
                </v-card-title>
                <v-card-text>
                    <v-list color="#C4A56C" dense>
                        <template v-for="event of events">
                            <Event :key="event.title" :icon="event.icon" :title="event.title" :description="event.description" :options="event.options"></Event>
                        </template>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import Event from "./Event";
    import {mapGetters} from "vuex";

    export default {
        name: "EventList",
        components: {Event},
        computed: {
            ...mapGetters(['events'])
        }
    }
</script>

<style scoped>

</style>