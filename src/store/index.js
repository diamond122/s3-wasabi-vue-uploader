import Vue from 'vue';
import Vuex from 'vuex';
import AppModule from '../store/app';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    modules: {
      $_app: AppModule,
    },
  });
}
