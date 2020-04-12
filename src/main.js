import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import {storagename} from "./gamemechanic/constants";

Vue.config.productionTip = false;

store.subscribe((mutation, state) => {
  localStorage.setItem(storagename, JSON.stringify({...state, time: (new Date()).getTime()}));
});

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
