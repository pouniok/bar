import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/style.css'

import * as VueGoogleMaps from "vue2-google-maps";
import vuetify from './plugins/vuetify';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBaB_maY309YYrKlFDFkKzfleCuPKc_MsY",
    libraries: "places"
  }
});


Vue.prototype.moment = moment

Vue.use(Vuex)

Vue.config.productionTip = false

Vue.filter('pluralize', (word, amount) => (amount > 1 || amount == 0) ? `${word}s` : word)

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
