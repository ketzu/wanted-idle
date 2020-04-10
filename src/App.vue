<template>
  <v-app style="background: #785C29;">
    <v-app-bar
      app
      color="#785C29"
      dark
      elevation="0"
    >
      <div class="d-flex align-center">
        <v-btn icon @click="$store.commit('toggleffects')" class="px-4 mx-2">
          <v-icon large color="black" v-if="effects">fas fa-volume-up</v-icon>
          <v-icon large color="black" v-else>fas fa-volume-mute</v-icon>
        </v-btn>
        <v-btn icon @click="$store.commit('togglmusic')" class="px-4">
          <v-icon large color="grey darken-3" v-if="!music" style="position: absolute; z-index:99;">fas fa-slash</v-icon>
          <v-icon large color="black" style="position: absolute;">fas fa-music</v-icon>
        </v-btn>
        <v-btn icon @click="settings=!settings" class="px-4 mx-2">
          <v-icon large color="black" style="position: absolute;">fas fa-cogs</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <MoneyStreamDisplay></MoneyStreamDisplay>

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
              style="font-family: QuentinCaps; border-top: thin solid black; border-bottom: thin solid black;"
      >{{ Math.floor(value) }} of {{ "10000".toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</v-progress-linear>

      <Settings v-if="settings"></Settings>
      <GameMenu v-if="!started" v-on:selected="start"></GameMenu>
      <EventList v-if="started"></EventList>
      <GameScreen v-if="started"></GameScreen>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import GameMenu from "@/components/GameMenu";
import GameScreen from "@/components/GameScreen";
import {tickrate} from "./gamemechanic/constants";
import MoneyStreamDisplay from "./components/MoneyStreamDisplay";
import Settings from "./components/Settings";
import EventList from "./components/EventList";

export default {
  name: 'App',

  components: {
    EventList,
    Settings,
    MoneyStreamDisplay,
    GameScreen,
    GameMenu,
  },
  data: () => ({
    started: false,
    musicfile: new Audio(require('@/assets/sounds/bg_antti.mp3')),
    settings: false
  }),
  computed: {
    value() {
      return this.$store.getters.money;
    },
    ...mapGetters(['initialized','music','effects','musicvolume','effectsvolume'])
  },
  methods: {
    start() {
      if(this.started)
        return;
      this.started = true;

      let last = null;
      let progress = 0;
      const self = this;

      this.musicfile.volume = this.musicvolume;
      this.musicfile.loop = true;
      if(this.music)
        this.musicfile.play();

      function tick(timestamp) {
        if(!last) last = timestamp;
        progress += timestamp - last;
        last = timestamp;
        if(progress > tickrate) {
          progress -= tickrate;
          self.$store.dispatch('tick');
        }
        window.requestAnimationFrame(tick);
      }
      window.requestAnimationFrame(tick);
    }
  },
  watch: {
    music (newvalue) {
      if(newvalue){
        this.musicfile.play();
      }else{
        this.musicfile.pause();
      }
    },
    musicvolume (newvalue) {
      this.musicfile.volume = newvalue;
    }
  }
};
</script>
