import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios';

Vue.prototype.$axios = axios;

Vue.use(Vuetify, {
  theme: {
    primary: '#FF5722',
    secondary: '#a4c9e1',
    accent: '#84FFFF',
    error: '#f44336',
    warning: '#ff9135',
    info: '#0097A7',
    success: '#4caf50'
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
