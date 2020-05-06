import axios from 'axios';
import { BASE_URL } from '../vue.config'
// import { authHeader } from './authHeader';

export const userService = {
    login,
    register
};

async function login(email, password) {
    console.trace('Function login ' + email + ', ' + password)
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
    const user = await handleResponse(response);
    if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
}

async function register(user) {
    return await axios.post(`${BASE_URL}/api/auth/register`, {user})
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}