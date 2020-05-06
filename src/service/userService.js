/* eslint-disable no-unused-vars */
import axios from 'axios';
import { BASE_URL } from '../vue.config';
// import { authHeader } from './authHeader';

export const userService = {
    login,
    register
};

async function login(email, password) {
    return await axios.post(`${BASE_URL}/api/auth/login`, { email, password }).then(res => {
        if (res.status !== 200) {
            if (res.status === 401) {
                localStorage.removeItem('user');
                return Promise.reject(res.data.message);
            }
            else if (res.status === 400) {
                return Promise.reject(res.data.message);
            }
        }
        if (res.data.token) localStorage.setItem('user', JSON.stringify(res.data.token));
        return Promise.resolve(res.data);
    });
}

async function register(user) {
    return await axios.post(`${BASE_URL}/api/auth/register`, { user }).then(res => {
        if (res.status !== 200) {
            if (res.status === (409 || 400)) {
                return Promise.reject(res.data.message);
            }
        }
        return Promise.resolve();
    })
}

function logout() {
    localStorage.removeItem('user');
}