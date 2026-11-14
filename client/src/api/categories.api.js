import api from "./api";

export async function all() {
    const response = await api.get(`/categories`);
    return response.data;
}