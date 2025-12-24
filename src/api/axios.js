import axios from 'axios';
import { refreshToken } from './user-api';

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
                if (err.response?.status === 401) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/';
                }
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default instance