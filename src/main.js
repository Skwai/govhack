// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import 'whatwg-fetch';

import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.productionTip = false;

(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
})();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
