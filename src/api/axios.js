import axios from 'axios';
import { refreshToken } from './user-api';
import { store } from '../redux/store';
import { Logout } from '../redux/slices/userSlice';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});


instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Gọi API refresh token (cookie HTTP-only sẽ tự gửi kèm)
                const res = await refreshToken()
                const newAccessToken = res.DT.access_token;
                localStorage.setItem('access_token', newAccessToken);

                // Gắn lại token mới vào request cũ
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (err) {
                // ✅ 1. Dispatch Logout để set isAuthenticated = false
                store.dispatch(Logout());

                // ✅ 2. Xóa localStorage (clear Redux Persist)
                localStorage.clear();

                // ✅ 3. Redirect về "/"
                window.location.href = '/';

                // ✅ 4. Stop vòng lặp
                return new Promise(() => { });
            }
        }

        return Promise.reject(error);
    }
);

export default instance