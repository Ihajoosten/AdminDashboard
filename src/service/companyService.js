/* eslint-disable no-unused-vars */
import axios from 'axios';
import { BASE_URL } from '../vue.config';
import { authHeader } from './authHeader';

export const companyService = {
    createCompany,
    getAllCompanies,
    deleteCompany,
    updateCompany,
    getCompanyById
};

async function createCompany(company) {

    return await axios.post(`${BASE_URL}/api/company/create`, company, authHeader()).then(res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    });
}

async function getAllCompanies() {
    return await axios.get(`${BASE_URL}/api/company/all`, authHeader()).then(res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data.result);
    });
}

async function deleteCompany(id) {
    return await axios.delete(`${BASE_URL}/api/company/delete/${id}`, authHeader()).then((res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    }));
}

async function updateCompany(company) {
    return await axios.put(`${BASE_URL}/api/company/edit/${company.Id}`, company, authHeader()).then((res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    }));
}

async function getCompanyById(id) {
    return await axios.get(`${BASE_URL}/api/company/${id}`, authHeader()).then((res => {
        if (res.status !== 200) {
            if (res.status === (401 || 400 || 500)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve(res.data);
    }));
}