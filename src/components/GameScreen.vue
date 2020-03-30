<template>
    <v-row class="mx-3">
        <template v-for="gen in generators">
            <v-col :key="gen.name" class="col-md-6">
                <generator :name="gen.name" :icon="gen.icon" :progress="gen.progress" :value="gen.value" :desc="gen.desc"></generator>
            </v-col>
        </template>
    </v-row>
</template>

<script>
    import Generator from "@/components/Generator";
    import {mapGetters} from "vuex";
    export default {
        name: "GameScreen",
        components: {Generator},
        computed: {
            ...mapGetters(['generators'])
        }
    }
</script>

<style scoped>

</style>
