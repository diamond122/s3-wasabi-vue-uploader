import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import createStore from './store';

Vue.config.productionTip = false;
new Vue({
  store: createStore(),
  vuetify,
  render: h => h(App),
}).$mount('#app');
