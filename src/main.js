import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import { store } from './store/index.js';
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
