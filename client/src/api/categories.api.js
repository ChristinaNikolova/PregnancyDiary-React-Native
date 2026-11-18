import api, { API_PATHS } from "./api";

export async function all() {
    const response = await api.get(`${API_PATHS.CATEGORIES}`);
    return response.data;
}