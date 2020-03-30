<template>
  <v-app style="background: #785C29;">
    <v-app-bar
      app
      color="#785C29"
      dark
      elevation="0"
    >
      <div class="d-flex align-center">
        <img src="@/assets/icons/revolver.png" height="55">
        <img src="@/assets/logo.png" height="35">
        <img src="@/assets/icons/revolver.png" height="55" style="transform: scaleX(-1);">
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <span class="display-1">
          <span style="font-family: QuentinCaps; color: black;">
          {{ value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </span>
        </span>
        <img src="@/assets/icons/bag_money.png" height="45" style="margin-top: -8px;">
      </div>
    </v-app-bar>

    <v-content>
      <v-progress-linear class="my-2" v-if="started"
              color="#4B3309"
              background-color="#C4A56C"
              :value="value/10000*100"
              height="40"
              style="font-family: QuentinCaps;"
      >{{ Math.floor(value) }} of {{ goal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</v-progress-linear>

      <GameMenu v-if="!started" v-on:selected="start"></GameMenu>
      <GameScreen v-else></GameScreen>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import GameMenu from "@/components/GameMenu";
import GameScreen from "@/components/GameScreen";

export default {
  name: 'App',

  components: {
    GameScreen,
    GameMenu,
  },
  computed: {
    value() {
      return this.$store.getters.currency;
    },
    ...mapGetters(['int', 'str', 'dex', 'initialized', 'goal'])
  },
  methods: {
    start() {
      this.started = true;

      let last = null;
      let progress = 0;
      const self = this;
      const tickrate = this.$store.getters.tickrate;

      function tick(timestamp) {
        if(!last) last = timestamp;
        progress += timestamp - last;
        if(progress > tickrate) {
          progress -= tickrate;
          self.$store.dispatch('tick');
        }
        window.requestAnimationFrame(tick);
      }
      window.requestAnimationFrame(tick);
    }
  },

  data: () => ({
    started: false
  }),
};
</script>
