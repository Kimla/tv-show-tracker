import axios from 'axios';
import {getShowData, getAuthHeader} from '@/helpers/helpers';

export const state = {
    myShows: [],
    popularShows: [],
};

export const getters = {
    myShows(state) {
        return state.myShows;
    },
    popularShows(state) {
        return state.popularShows;
    }
};

export const mutations = {
    setMyShows: (state, { myShows }) => {
        state.myShows = myShows;
    },
    addToMyShows: (state, { show }) => {
        state.myShows.push(show);
    },
    removeFromMyShows: (state, {show}) => {
        let shows = state.myShows;
        let newShows = []

        for (var i = 0; i < shows.length; i++) {
            if ( shows[i].tvmaze_id != show.id ) {
                newShows.push(shows[i]);
            }
        }

        state.myShows = newShows;
    },
    setPopularShows: (state, { shows }) => {
        state.popularShows = shows;
    },
};

export const actions = {
    loadPopularShows({ commit }) {
        const api = axios.create({
            baseURL: apiUrl,
            headers: getAuthHeader()
        });

        api.get('/popularShows')
        .then(function (response) {
            console.log(response);
            commit('setPopularShows', { shows: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    loadMyShows({ commit }) {
        const api = axios.create({
            baseURL: apiUrl,
            headers: getAuthHeader()
        });

        api.get('/userShows')
        .then(function (response) {
            console.log(response);
            commit('setMyShows', { myShows: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    addToMyShows({ commit, state }, { show }) {
        const data = getShowData(show);

        const api = axios.create({
            baseURL: apiUrl,
            headers: getAuthHeader()
        });

        api.post('/userShows', {
            ...data
        })
        .then(function (response) {
            console.log(response);
            commit('addToMyShows', { show: data })
        })
        .catch(function (error) {
            console.log(error.response);
        });
    },
    removeFromMyShows({ commit, state }, { show }) {
        const api = axios.create({
            baseURL: apiUrl,
            headers: getAuthHeader()
        });

        api.delete('/userShows?tvmaze_id='+show.id)
        .then(function (response) {
            console.log(response);
            commit('removeFromMyShows', { show: show })
        })
        .catch(function (error) {
            console.log(error.response);
        });
    },
};
