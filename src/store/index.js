import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    postcodes: [],
    ages: [],
    industries: [],
  },
  getters,
  mutations,
});
