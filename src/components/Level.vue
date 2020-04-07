<template>
    <v-progress-circular
            :rotate="-90"
            :width="10"
            :size="80"
            :value="progress"
            color="#4B3309"
    ><span style="font-family: QuentinCaps; font-size: 36px; color: black;">{{showlevel}}</span></v-progress-circular>
</template>

<script>
    export default {
        name: "Level",
        props: ['level'],
        computed: {
            progress() {
                if(this.level.nextlevelexp()===Infinity)
                    return 100;
                return ((this.level.exp-this.level.baselevelexp())/(this.level.nextlevelexp()-this.level.baselevelexp())*100);
            },
            showlevel() {
                if(this.level.nextlevelexp()<Infinity) {
                    return this.level.level;
                }else{
                    return 'X';
                }
            }
        }
    }
</script>

<style lang="sass">
    .v-progress-circular__overlay
        transition: none !important
</style>