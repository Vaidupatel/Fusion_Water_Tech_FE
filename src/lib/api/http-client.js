import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "../../constants/tokenKey";
import { clearLocalStorage } from "../utils/localStorage";

// Create axios instance with base configuration
const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000000,
});

// Request interceptor
Axios.interceptors.request.use((config) => {
    const token = Cookies.get(AUTH_TOKEN_KEY);

    if (config.data instanceof FormData) {
        config.headers = {
            ...config.headers,
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
        };
    } else {
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        };
    }

    return config;
});

// Response interceptor
Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message === "Unauthorized"
        ) {
            console.log(`error 401`, error.response.data.message);
            Cookies.remove(AUTH_TOKEN_KEY);
            clearLocalStorage()
            window.location.href = "/admin/login";
        }

        if (error.response && error.response.status === 502) {
            Cookies.remove(AUTH_TOKEN_KEY);
            window.location.reload();
        }

        return Promise.reject(error);
    }
);

// HTTP client class for API requests
export class HttpClient {
    static async get(url, params) {
        const response = await Axios.get(url, { params });
        return response.data;
    }

    static async post(url, data, options) {
        const response = await Axios.post(url, data, options);
        console.log('response :>> ', response);
        return response.data;
    }

    static async put(url, data) {
        const response = await Axios.put(url, data);
        return response.data;
    }

    static async patch(url, data) {
        const response = await Axios.patch(url, data);
        return response.data;
    }

    static async delete(url) {
        const response = await Axios.delete(url);
        return response.data;
    }
}

export default Axios;