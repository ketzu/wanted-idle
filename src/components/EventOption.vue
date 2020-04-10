<template>
    <div v-ripple @click="fire">
        <v-col align="center" justify="center" class="px-4 py-1" style="border: 1px solid black; border-radius: 5px;">
            <v-row align="center" justify="center">
                <v-img :src="option.icon" contain max-height="60" max-width="60"></v-img>
            </v-row>
            <v-row align="center" justify="center">
                {{option.text}}
            </v-row>
        </v-col>
    </div>
</template>

<script>
    export default {
        name: "EventOption",
        props: ['option'],
        methods: {
            fire() {
                if(this.option.action !== undefined)
                    this.$store.dispatch(this.option.action, this.option.params);

                if(this.option.exclude !== undefined)
                    for(let excluded of this.option.exclude) {
                        this.$store.dispatch('excludeEvents', excluded);
                    }

                this.$emit('fulfilled');
            }
        }
    }
</script>

<style scoped>

</style>