<template>
    <v-card color="#C4A56C">
        <v-list-item three-line ripple @click="click">
            <v-list-item-avatar
                    tile
                    size="80"
            >
                <img :src="icon">
            </v-list-item-avatar>

            <v-list-item-content>
                <div class="overline mb-4">{{((level.exp-level.baselevelexp())/(level.nextlevelexp()-level.baselevelexp())*100).toFixed(2)}}%</div>
                <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
                <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-progress-linear
                color="#4B3309"
                :indeterminate="active"
                height="15"
        ></v-progress-linear>
    </v-card>
</template>

<script>
    export default {
        name: "Action",
        props: ['title', 'icon', 'description', 'active', 'level', 'index'],
        computed: {
            levelprogress() {
                return this.currentexp
            }
        },
        methods: {
            click() {
                this.$store.dispatch('select', this.index);
            }
        }
    }
</script>

<style scoped>

</style>
<style lang="sass">
    .v-progress-linear__determinate
        transition: none !important
</style>
