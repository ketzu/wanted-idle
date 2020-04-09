<template>
    <v-container fluid>
        <v-row justify="center" class="mx-3">
            <v-col align="center" cols="6" v-if="initialized" class="pa-3">
                <v-card color="#C4A56C" class="py-3" ripple @click="select" outlined style="border-color: black;">
                    <span class="display-1">
                        Continue
                    </span>
                </v-card>
            </v-col>
            <v-col align="center" cols="6" class="pa-3">
                <v-card color="#C4A56C" class="py-3" ripple @click="newGame" outlined style="border-color: black;">
                    <span class="display-1">
                        New Game
                    </span>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "GameMenu",
        computed: {
            ...mapGetters(['int', 'str', 'dex', 'initialized'])
        },
        methods: {
            newGame() {
                this.$store.dispatch('init');
                this.select();
            },
            select() {
                this.$emit('selected');
            }
        }
    }
</script>

<style scoped>

</style>
