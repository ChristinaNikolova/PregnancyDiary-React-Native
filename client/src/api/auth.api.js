import api from "./api";

export async function register(firstName, lastName, email, password) {
    const response = await api.post(`/auth/register`, { firstName, lastName, email, password });
    return response.data;
};