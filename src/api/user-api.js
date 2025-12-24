import axios from "./axios";
import axiosRaw from "axios";

const originalRequest = axiosRaw.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const signup = async (data) => {
    const res = await axios.post("/signup", data);
    return res.data;
}
const login = async (email, password) => {
    const res = await axios.post("/login", { email, password });
    return res.data;
}
const refreshToken = async () => {
    const res = await originalRequest.get("/refresh-token");
    return res.data;
}
export { signup, login, refreshToken }