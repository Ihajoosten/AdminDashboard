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
    return await axios.post(`${BASE_URL}/api/auth/register`, { user })
}

function logout() {
    localStorage.removeItem('user');
}

function handleResponse(res) {
    if (res.status !== 200) {
        if (res.status === 401) {
            logout();
            location.reload(true);
        }
        else if (res.status === 400) {
            return Promise.reject(res.data.message)
        }
        const error = (res.data && res.data.message) || res.statusText;
        return Promise.reject(error);
    }
    return Promise.resolve(res.data);
}