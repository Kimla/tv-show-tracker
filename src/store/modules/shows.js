import axios from 'axios';
import {getShowData, getAuthHeader} from '@/helpers/helpers';

export const state = {
    myShows: [],
};

export const getters = {
    myShows(state) {
        return state.myShows;
    },
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
};

export const actions = {
    loadMyShows({ commit }) {
        const api = axios.create({
            baseURL: 'http://localhost:8000/',
            headers: getAuthHeader()
        });

        api.get('http://localhost:8000/userShows')
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
            baseURL: 'http://localhost:8000/',
            headers: getAuthHeader()
        });

        api.post('userShows', {
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
            baseURL: 'http://localhost:8000/',
            headers: getAuthHeader()
        });

        api.delete('http://localhost:8000/userShows?tvmaze_id='+show.id)
        .then(function (response) {
            console.log(response);
            commit('removeFromMyShows', { show: show })
        })
        .catch(function (error) {
            console.log(error.response);
        });
    },
};
