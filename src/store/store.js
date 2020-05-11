import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './modules/alert';
import { user } from './modules/user';
import { company } from './modules/company';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        user,
        company
    }
});