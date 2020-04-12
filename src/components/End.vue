<template>
    <v-row class="mx-3">
        <v-col cols="12">
            <v-card color="#C4A56C" class="mx-5" outlined style="border-color: black;">
                <v-card-text>
                    <v-row>
                        <v-col cols="4">
                            <v-img :src="end.icon" contain max-height="200"></v-img>
                        </v-col>
                        <v-col cols="8">
                            <h2>{{end.title}}</h2>

                            <br>

                            {{ end.text }}

                            <v-list color="#C4A56C" dense>
                                <v-list-item two-line>
                                    <v-list-item-avatar tile>
                                        <v-img :src="require('@/assets/icons/pocket_watch.png')" contain max-height="30"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{(playtime/60).toFixed(0)}} min {{(playtime % 60).toFixed(0)}} s</v-list-item-title>
                                        <v-list-item-subtitle>Time taken</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-avatar tile>
                                        <v-img :src="require('@/assets/icons/sherrif_badge.png')" contain max-height="30"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{goodness}}</v-list-item-title>
                                        <v-list-item-subtitle>Goodness Rating</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-avatar tile>
                                        <v-img :src="require('@/assets/icons/wanted_poster_10000.png')" contain max-height="30"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{badness}}</v-list-item-title>
                                        <v-list-item-subtitle>Badness Rating</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-avatar tile>
                                        <v-img :src="require('@/assets/icons/revolver.png')" contain max-height="30"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{revolver}} ({{revolver?'spent':'saved'}} {{revolvercost}}$)</v-list-item-title>
                                        <v-list-item-subtitle>Revolver Aquired</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-avatar tile>
                                        <v-img :src="require('@/assets/icons/signpost.png')" contain max-height="30"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{endsReached}} / {{ends.length}}</v-list-item-title>
                                        <v-list-item-subtitle>Different Ends Reached</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-avatar tile>
                                        <v-img :src="require('@/assets/icons/skull_person.png')" contain max-height="30"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{timesReachedEnd}}</v-list-item-title>
                                        <v-list-item-subtitle>Times the End was Reached</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {mapGetters} from "vuex";
    import {tickrate, revolvercost, ends} from "../gamemechanic/constants";

    export default {
        name: "End",
        computed: {
            ...mapGetters(['end', 'ticks', 'goodness', 'badness', 'revolver', 'endsReached', 'timesReachedEnd']),
            tickrate() {
                return tickrate;
            },
            playtime() {
                return this.ticks*tickrate/1000;
            },
            revolvercost() {
                return revolvercost;
            },
            ends() {
                return ends;
            }
        }
    }
</script>

<style scoped>

</style>