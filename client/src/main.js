import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import i18n from './locales/index';

axios.defaults.timeout = 10000;
// 开发环境注释该语句
axios.defaults.baseURL = 'http://47.100.168.127:4359/';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
