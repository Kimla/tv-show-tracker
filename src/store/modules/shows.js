import axios from 'axios';
import {getShowData} from '@/helpers/helpers';

export const state = {
    myShows: [],
};

export const getters = {
    myShows(state) {
        return state.myShows;
    },
};

export const mutations = {
    SET_MY_SHOWS: (state, { myShows }) => {
        state.myShows = myShows;
    },
    ADD_TO_MY_SHOWS: (state, { show }) => {
        state.myShows.push(show);
    },
};

export const actions = {
    LOAD_MY_SHOWS({ commit }) {
        axios.get('http://localhost:8000/userShows')
        .then(function (response) {
            console.log(response);
            commit('SET_MY_SHOWS', { myShows: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    ADD_TO_MY_SHOWS({ commit, state }, { show }) {
        const data = getShowData(show);

        axios.post('http://localhost:8000/userShows', {
            ...data
        })
        .then(function (response) {
            console.log(response);
            commit('ADD_TO_MY_SHOWS', { show: data })
        })
        .catch(function (error) {
            console.log(error.response);
        });
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
};
