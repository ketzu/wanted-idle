<template>
    <v-row class="mx-3">
        <v-col cols="12">
            <v-card color="#C4A56C" class="mx-5" outlined style="border-color: black;">
                <v-card-title>
                    <h2>Volume</h2>
                </v-card-title>
                <v-card-text>
                    <v-slider
                            v-model="music"
                            color="black"
                            prepend-icon="fas fa-music"
                            track-color="#785C29"
                    ></v-slider>
                    <v-slider
                            v-model="effcts"
                            color="black"
                            prepend-icon="fas fa-volume-up"
                            track-color="#785C29"
                    ></v-slider>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col align="center" cols="6">
            <v-card color="#C4A56C" class="mx-5" outlined style="border-color: black;">
                <v-card-title>
                    <h2>Reset Data</h2>
                </v-card-title>
                <v-card-text>
                    <v-btn @click="hardreset" depressed color="red darken-4" x-large>
                        On your own risk.
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col align="center" cols="6">
            <v-card color="#C4A56C" class="mx-5" outlined style="border-color: black;">
                <v-card-title>
                    <h2>Credits</h2>
                </v-card-title>
                <v-card-text>
                    A game by <br> David of <a href="http://shittyidle.com">"ShittyIdle Studio"</a>
                    <br><br>
                    The awesome music was made by
                    <br>
                    <a href="http://anttismusic.blogspot.fi">Antti Luode</a>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import {storagename} from "../gamemechanic/constants";

    export default {
        name: "Settings",
        computed: {
            ...mapGetters(['musicvolume', 'effectsvolume']),
            music: {
                get: function () {
                    return this.musicvolume*100;
                },
                set: function (volume) {
                    this.setmusic(volume/100);
                }
            },
            effcts: {
                get: function () {
                    return this.effectsvolume*100;
                },
                set: function (volume) {
                    this.seteffects(volume/100);
                }
            }
        },
        methods: {
            ...mapMutations(['seteffects', 'setmusic']),
            hardreset() {
                // Hard Reset: Delete State
                localStorage.removeItem(storagename);
                // Reload page
                location.reload();
            }
        }
    }
</script>

<style scoped>

</style>