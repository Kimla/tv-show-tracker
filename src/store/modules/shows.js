import axios from 'axios';

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
        let myShows = localStorage.getItem("myShows");
        if ( myShows ) {
            myShows = JSON.parse(myShows);
            commit('SET_MY_SHOWS', { myShows: myShows })
        }
    },
    ADD_TO_MY_SHOWS({ commit, state }, { show }) {
        console.log(show);

        let image = false;

        if ( show.image ) {
            image = show.image.medium.replace(/^http:\/\//i, 'https://');
        }

        const data = {
            'title': show.name,
            'image': image,
            'genres': show.genres.join(", "),
            'tvmaze_id': show.id,
        }

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

        console.log(data);

        /*
        let myShows = localStorage.getItem("myShows");
        if ( !myShows ) {
            myShows = [];
        } else {
            myShows = JSON.parse(myShows);
        }
        myShows.push(show);
        localStorage.setItem("myShows", JSON.stringify(myShows));

        */
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
