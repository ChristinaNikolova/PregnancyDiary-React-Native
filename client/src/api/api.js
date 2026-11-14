import axios from "axios"

// TODO base
const api = axios.create({
    baseURL: "http://192.168.2.100:3030",
    headers: {
        'Content-Type': 'application/json',
    },
});

// const api = axios.create({
//     ...base.defaults,
//     baseURL: `${base.defaults.baseURL}/categories`,
// });

export default api;