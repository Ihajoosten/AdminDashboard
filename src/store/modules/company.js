/* eslint-disable no-unused-vars */
import { companyService } from '../../service/companyService';
import Vue from 'vue';

const state = {
    companies: []
}

const actions = {
    async newCompany({ commit }, company) {
        const index = state.companies.length;
        const res = await companyService.createCompany(company);
        commit('addCompany', { index, company: res.object });
        return res;
    },
    async getCompanies({ commit }) {
        const companies = await companyService.getAllCompanies();
        commit('setCompanies', companies);
        return companies;
    },
    async deleteCompany({ commit }, company) {
        const res = await companyService.deleteCompany(company.Id);
        commit('deleteCompany', company);
        return res;
    },
    async updateCompany({ commit }, company) {
        const res = await companyService.updateCompany(company);
        commit('editCompany', company);
        return res;
    },
    async getCompanyById(_, id) {
        return await companyService.getCompanyById(id);
        // return Promise.resolve(res);
    }
}

const mutations = {
    setCompanies(state, fetchedCompanies) {
        state.companies = fetchedCompanies;
    },
    addCompany(state, { index, company }) {
        Vue.set(state.companies, index, company)
    },
    deleteCompany(state, payload) {
        const i = state.companies.map(item => item.Id).indexOf(payload.Id);
        state.companies.splice(i, 1);
    },
    editCompany(state, payload) {
        const i = state.companies.map(item => item.Id).indexOf(payload.Id);
        Vue.set(state.companies, i, payload);
    }
}


export const company = {
    namespaced: true,
    state,
    actions,
    mutations
};