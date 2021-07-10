import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from 'jwt-decode';


const apiEndpoint = apiUrl + "/auth";

export function login(email, password) {
    return http.post(apiEndpoint, { email, password })
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt)
    }
    catch (ex) {
        return null
    }
}
export function getToken() {
    return localStorage.getItem('token')
}

export function isLoggedIn() {
    try {
        const token = getToken()
        if(token) return true;
    }
    catch (ex) {
        return false
    }
}
