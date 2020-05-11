/* eslint-disable no-unused-vars */
import { userService } from '../../service/userService';

const participant = JSON.parse(localStorage.getItem('participant'));
const state = participant ? { status: { loggedIn: true }, participant } : { status: {}, participant: null };

const actions = {
    login({ commit }, { email, password }) {
        commit('loginRequest', { email });
        return userService.login(email, password)
    },
    logout({ commit }) {
        localStorage.removeItem('participant');
        commit('logout');
    },
    register({ commit }, { user }) {
        commit('registerRequest', user);
        return userService.register(user);
    }
}

const mutations = {
    loginRequest(state, user) {
        state.status = { logginIn: true };
        state.participant = null;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.participant = user;
    },
    loginFailure(state) {
        state.status = {};
        state.participant = null;
    },
    logout(state) {
        state.status = {};
        state.participant = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};