import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import createStore from './store';
import './scss/main.scss';
import VueRouter from 'vue-router'
import router from './routes/router';

Vue.use(VueRouter);

Vue.config.productionTip = false;
new Vue({
  store: createStore(),
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
