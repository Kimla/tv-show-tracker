import {getShowData, api} from '@/helpers/helpers';

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
    removeAllShow(state) {
        state.myShows = [];
    }
};

export const actions = {
    loadPopularShows({ commit }) {
        api.get('/popularShows')
        .then(function (response) {
            commit('setPopularShows', { shows: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    loadMyShows({ commit }) {
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
