<template>
    <v-row class="mx-3">
        <template v-for="(action, index) in actions">
            <v-col :key="action.name" class="col-md-6">
                <action :title="action.title" :icon="action.icon" :description="action.description" :active="index === active" :level="action.level" :index="index"></action>
            </v-col>
        </template>
    </v-row>
</template>

<script>
    import Action from "@/components/Action";
    import {mapGetters} from "vuex";
    export default {
        name: "GameScreen",
        components: {Action},
        computed: {
            ...mapGetters(['actions', 'active'])
        }
    }
</script>

<style scoped>

</style>
