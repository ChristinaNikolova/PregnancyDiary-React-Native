import api, { API_PATHS } from "./api";

export async function all() {
    const response = await api.get(`${API_PATHS.ARTICLES}/all`);
    return response.data;
}

export async function getById(id) {
    const response = await api.get(`${API_PATHS.ARTICLES}/${id}`);
    return response.data;
}