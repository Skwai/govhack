// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import 'whatwg-fetch';

import Vue from 'vue';
import App from './App';
import store from './store';

(async () => {
  try {
    if (!('serviceWorker' in navigator)) {
      throw Error('browser does not support serviceWorker');
    }
    const registration = await navigator.serviceWorker.register('/static/service-worker.js');
    console.log(registration);
  } catch (err) {
    console.log(`Service worker registration failed, error: ${err}`);
  }
})();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
