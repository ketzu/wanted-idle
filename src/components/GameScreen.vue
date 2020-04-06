<template>
    <v-row class="mx-3">
        <template v-for="action in actions">
            <v-col :key="action.name" class="col-md-6">
                <action :name="action.name" :icon="action.icon" :progress="action.progress" :value="action.value" :desc="action.description"></action>
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
            ...mapGetters(['actions'])
        }
    }
</script>

<style scoped>

</style>
