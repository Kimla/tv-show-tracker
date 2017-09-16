export const state = {
    notice: false,
    noticeTimeout: false,
};

export const getters = {
    notice(state) {
        return state.notice;
    },
};

export const mutations = {
    hideNotice: (state) => {
        state.notice = false;
    },
    showNotice: (state, payload) => {
        state.notice = payload;
    },
};

export const actions = {
    showNotice: ({ commit }, payload) => {
         commit('showNotice', payload);

         clearTimeout(state.noticeTimeout);

         state.noticeTimeout = setTimeout(function () {
             commit('hideNotice');
         }, 4000);
    },
};
