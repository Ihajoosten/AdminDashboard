/* eslint-disable no-unused-vars */
import { userService } from '../../service/userService';
import { router } from '../../routes';
import LoginModal from '../../components/user/Login.vue';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
    login({ commit }, { email, password }) {
        commit('loginRequest', { email });
        return userService.login(email, password)
    },
    logout({ commit }) {
        localStorage.removeItem('user');
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
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
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

export const userModule = {
    namespaced: true,
    state,
    actions,
    mutations
};