import axios from "axios";
import { AppConfig } from '../AppConfig';

export const Axios = axios.create({
    baseURL: AppConfig.ENVIRONMENT.DEV.baseUrl,
    headers: {
        "accepts":"application/json"
    }
});

Axios.interceptors.request.use(
    config => {
        const token = AppConfig.GetToken({type: 'string'});
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)