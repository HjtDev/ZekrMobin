import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const csrftoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];
    if (csrftoken) {
        config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (err) => {
        if(err.response && err.response.status === 429) {
            console.warn('Too many requests...');
            toast.error('درخواست های زیادی از طرف شما ارسال شده است لطفا کمی صبر کنید.');
            toast.warning('دسترسی شما به طور موقت محدود شد.')
            return Promise.resolve({  data: null, status: 429, handled: true });
        }
        return Promise.reject(err);
    }
)

export const refreshCSRF = async () => {
    try {
        await api.get('user/csrf/');
    } catch (err) {
        console.error(err.response?.data || err.message);
    }
};

export default api;
