import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'
import * as shows from './modules/shows';
import * as notice from './modules/notice';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem("token"),
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
    mutations: {
        login: (state) => {
            state.isLoggedIn = true;
            router.replace("/");
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.isLoggedIn = false;
            router.replace("/");
        },
        setToken: (state, payload) => {
            this.token = payload;
        }
    },
    actions: {

    },
    modules: {
        shows,
        notice,
    }
});
