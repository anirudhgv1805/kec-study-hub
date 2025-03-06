import axios from 'axios';
import { useEffect } from 'react';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useAxiosInstance = () => {
    const  jwtToken = localStorage.getItem("jwtToken");

    useEffect(() => {
        console.log("At axios instance"+jwtToken)
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                if (jwtToken) {
                    config.headers['Authorization'] = `Bearer ${jwtToken}`;
                    console.log("jwt is there");
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    console.log('Unauthorized access, redirecting to login...');
                    window.location.href = '/register';
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [jwtToken]);

    return axiosInstance;
};
