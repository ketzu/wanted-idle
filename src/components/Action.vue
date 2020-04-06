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
                <div class="overline mb-4">{{ Math.round(progress) }}%</div>
                <v-list-item-title class="headline mb-1">{{ name }}</v-list-item-title>
                <v-list-item-subtitle>{{ desc }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-progress-linear
                color="#4B3309"
                :value="progress"
                height="15"
        ></v-progress-linear>
    </v-card>
</template>

<script>
    export default {
        name: "Action",
        props: ['name', 'icon', 'progress', 'value', 'desc'],
        methods: {
            click() {
                this.$store.dispatch('selected', this.name);
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
