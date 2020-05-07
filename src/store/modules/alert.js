const state = {
    type: null,
    message: null,
    title: null
};

const actions = {
    success({ commit }, message, title) {
        commit('success', message, title);
    },
    error({ commit }, message, title) {
        commit('error', message, title);
    },
    clear({ commit }) {
        commit('clear');
    }
};

const mutations = {
    success(state, { message, title }) {
        state.type = 'alert-success';
        state.message = message;
        state.title = title;
    },
    error(state, { message, title }) {
        state.type = 'alert-danger';
        state.message = message;
        state.title = title;
    },
    clear(state) {
        state.type = null;
        state.message = null;
        state.title = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};