// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://6e71-49-228-246-185.ngrok-free.app',
    headers: {
        'ngrok-skip-browser-warning': 'true',
    },
});

export default axiosInstance;
