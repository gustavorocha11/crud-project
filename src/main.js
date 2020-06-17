import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import router from './router';
import store from './store';

// name is optional
Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(VueTheMask);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
