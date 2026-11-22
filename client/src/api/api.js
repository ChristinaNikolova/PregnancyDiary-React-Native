import axios from "axios"

// todo add constants
const BASE_URL = "http://192.168.2.100:3030";

export const API_PATHS = {
    AUTH: `${BASE_URL}/auth`,
    ARTICLES: `${BASE_URL}/articles`,
    CATEGORIES: `${BASE_URL}/categories`,
    USERS: `${BASE_URL}/users`,
};

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;