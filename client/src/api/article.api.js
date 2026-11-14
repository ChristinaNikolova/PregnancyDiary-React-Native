import api from "./api";

export async function all() {
    const response = await api.get(`/articles/all`);
    return response.data;
}

export async function getById(id) {
    const response = await api.get(`/articles/${id}`);
    return response.data;
}