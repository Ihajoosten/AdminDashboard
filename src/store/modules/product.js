/* eslint-disable no-unused-vars */
import { productService } from '../../service/productService';
import Vue from 'vue';

const state = {
    products: []
}

const actions = {
    async newProduct({ commit }, product) {
        const index = state.products.length;
        const res = await productService.createProduct(product);
        commit('addProduct', { index, product: res.object });
        return res;
    },
    async getProducts({ commit }) {
        const products = await productService.getAllProducts();
        commit('setProducts', products);
        return products;
    },
    async deleteProduct({ commit }, product) {
        const res = await productService.deleteProduct(product.Id);
        commit('deleteProduct', product);
        return res;
    },
    async updateProduct({ commit }, product) {
        const res = await productService.updateProduct(product);
        commit('editProduct', product);
        return res;
    },
    async getProductById(id) {
        return await productService.getProductById(id);
    }
}

const mutations = {
    setProducts(state, fetchedProducts) {
        state.products = fetchedProducts;
    },
    addProduct(state, { index, product }) {
        Vue.set(state.products, index, product)
    },
    deleteProduct(state, payload) {
        const i = state.products.map(item => item.Id).indexOf(payload.Id);
        state.products.splice(i, 1);
    },
    editProduct(state, payload) {
        const i = state.products.map(item => item.Id).indexOf(payload.Id);
        Vue.set(state.products, i, payload);
    }
}


export const product = {
    namespaced: true,
    state,
    actions,
    mutations
};