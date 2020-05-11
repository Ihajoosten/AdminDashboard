/* eslint-disable no-unused-vars */
export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('participant'));
    let config

    if (token) {
        return config = { headers: { 'Authorization': 'Bearer ' + token } };
    } else {
        return config = {};
    }
}