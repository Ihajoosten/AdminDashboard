/* eslint-disable no-unused-vars */
import { userService } from '../../service/userService';
import { router } from '../../routes';
import LoginModal from '../../components/user/Login.vue';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });

        userService.login(email, password).then(res => {
            console.log(state.user.status)
            commit('loginSuccess', res.token)
            dispatch('alert/success', res.message, { root: true });
            console.log(state.user.status)
        }).catch(err => {
            commit('loginFailure', err);
            dispatch('alert/error', err.response.data.message, { root: true });
        });
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
}

const mutations = {
    loginRequest(state, user) {
        state.status = { loggedIn: false };
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