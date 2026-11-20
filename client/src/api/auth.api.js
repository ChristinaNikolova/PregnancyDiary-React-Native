import api, { API_PATHS } from "./api";

// export async function register(firstName, lastName, email, password) {
//     const response = await api.post(`${API_PATHS.AUTH}/register`, { firstName, lastName, email, password });
//     return response.data;
// };

export async function login(email, password) {
    const response = await api.post(`${API_PATHS.AUTH}/login`, { email, password });
    return response.data;
};

export async function logout() {
    const response = await api.get(`${API_PATHS.AUTH}/logout`);
    // TODO 204!!!!
    return response.data;
}