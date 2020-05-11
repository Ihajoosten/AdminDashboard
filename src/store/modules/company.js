/* eslint-disable no-unused-vars */
import { companyService } from '../../service/companyService';
import Vue from 'vue';

const state = {
    companies: []
}

const actions = {
    newCompany({ commit }, company) {
        const index = state.companies.length;
        commit('addCompany', { index, company });
        return companyService.createCompany(company);
    },
    async getCompanies({ commit }) {
        const companies = await companyService.getAllCompanies();
        commit('setCompanies', companies);
        return companies;
    },
    deleteCompany({ commit }, id) {
        return companyService.deleteCompany(id);
    }
}

const mutations = {
    setCompanies(state, fetchedCompanies) {
        state.companies = fetchedCompanies;
    },
    addCompany(state, { index, company }) {
        return Vue.set(state.companies, index, company)
    }
}


export const company = {
    namespaced: true,
    state,
    actions,
    mutations
};