/* eslint-disable no-unused-vars */
import axios from 'axios';
import { BASE_URL } from '../vue.config';
import { authHeader } from './authHeader';

export const productService = {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getProductById
};

async function createProduct(company) {

    return await axios.post(`${BASE_URL}/api/product/create`, company, authHeader()).then(res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    });
}

async function getAllProducts() {
    return await axios.get(`${BASE_URL}/api/product/all`, authHeader()).then(res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data.result);
    });
}

async function deleteProduct(id) {
    return await axios.delete(`${BASE_URL}/api/product/delete/${id}`, authHeader()).then((res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    }));
}

async function updateProduct(company) {
    return await axios.put(`${BASE_URL}/api/product/edit/${company.Id}`, company, authHeader()).then((res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    }));
}

async function getProductById(id) {
    return await axios.get(`${BASE_URL}/api/product/${id}`, authHeader()).then((res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    }));
}