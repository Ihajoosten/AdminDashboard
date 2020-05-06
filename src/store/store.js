import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './modules/alert';
import { userModule } from './modules/user';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        userModule
    }
});