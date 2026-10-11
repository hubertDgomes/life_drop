import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})


export const signup = async (formData) => {
    try {
        const res = await api.post('/api/signup', formData)
        return res.data
    }
    catch (err) {
        console.log(err.response?.data?.message || err.message || "Sign up failed")
        throw err
    }
}

export const login = async ({ email, password }) => {
    try {
        const res = await api.post("/api/login", { email, password });
        return res.data;
    } catch (err) {
        console.log(err.response?.data?.message || err.message || "Login failed");
        throw err;
    }
}

export const logout = async () => {
    try {
        const res = await api.post("/api/logout");
        return res.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

export const getMe = async () => {
    try {
        const res = await api.get("/api/getme");
        return res.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

export default { signup, login, logout, getMe };