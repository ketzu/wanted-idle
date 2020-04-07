<template>
    <v-progress-circular
            :rotate="-90"
            :width="10"
            :size="80"
            :value="value"
            color="#4B3309"
    ><span style="font-family: QuentinCaps; font-size: 36px; color: black;">{{level.level}}</span></v-progress-circular>
</template>

<script>
    export default {
        name: "Level",
        props: ['level'],
        computed: {
            progress() {
                return ((this.level.exp-this.level.baselevelexp())/(this.level.nextlevelexp()-this.level.baselevelexp())*100);
            }
        },
        data () {
            return {
                interval: {},
                value: 0,
            }
        },
        beforeDestroy () {
            clearInterval(this.interval)
        },
        mounted () {
            this.interval = setInterval(() => {
                this.value = this.progress;
            }, 600)
        },
    }
</script>

<style scoped>
    .v-progress-circular
    .v-progress-circular--indeterminate
    .v-progress-circular__overlay {
        transition: none !important;
    }
</style>