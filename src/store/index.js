import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'
import * as notice from './modules/notice';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        myShows: [],
        isLoggedIn: !!localStorage.getItem("token"),
    },
    actions: {
        register({ commit }, payload) {
            axios.post('http://localhost:8000/register', {
                ...payload
            })
            .then(function (response) {
                console.log(response);
                if ( response.status === 200 && response.data.success ) {
                    localStorage.setItem("token", response.data.token);
                    commit('login');
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
        },
        login({ commit }, payload) {
            axios.post('http://localhost:8000/login', {
                ...payload
            })
            .then(function (response) {
                console.log(response);
                if ( response.status === 200 ) {
                    localStorage.setItem("token", response.data.token);
                    commit('login');
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
        },
        LOAD_MY_SHOWS({ commit }) {
            let myShows = localStorage.getItem("myShows");
            if ( myShows ) {
                myShows = JSON.parse(myShows);
                commit('SET_MY_SHOWS', { myShows: myShows })
            }
        },
        ADD_TO_MY_SHOWS({ commit, state }, { show }) {
            let myShows = localStorage.getItem("myShows");
            if ( !myShows ) {
                myShows = [];
            } else {
                myShows = JSON.parse(myShows);
            }
            myShows.push(show);
            localStorage.setItem("myShows", JSON.stringify(myShows));
            commit('ADD_TO_MY_SHOWS', { show: show })
        },
        REMOVE_FROM_MY_SHOWS({ commit, state }, { show }) {
            let myShows = localStorage.getItem("myShows");
            myShows = JSON.parse(myShows);
            let myShowsNew = [];
            for (var i = 0; i < myShows.length; i++) {
                if ( myShows[i].id != show.id ) {
                    myShowsNew.push(myShows[i]);
                }
            }

            localStorage.setItem("myShows", JSON.stringify(myShowsNew));
            commit('SET_MY_SHOWS', { myShows: myShowsNew })
        },
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
        SET_MY_SHOWS: (state, { myShows }) => {
            state.myShows = myShows;
        },
        ADD_TO_MY_SHOWS: (state, { show }) => {
            state.myShows.push(show);
        },
        setToken: (state, payload) => {
            this.token = payload;
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
    modules: {
        notice,
    }
});
