import api from "./api";

export async function all() {
    const response = await api.get(`/articles/all`);
    return response.data;
}