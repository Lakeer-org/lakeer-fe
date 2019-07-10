import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import router from './router'
import {store} from './store/store.js'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(Notifications);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: 'places'
  }
});

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
