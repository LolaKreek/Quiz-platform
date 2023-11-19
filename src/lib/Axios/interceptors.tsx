import axios from 'axios' 
import { store } from '../../store';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL
})

axiosInstance.interceptors.request.use(async request => {
    if(request.headers){
        const token = `Bearer ${store.getState().auth.token}`;
        request.headers.Authentication = token;
    }
    return request;
})