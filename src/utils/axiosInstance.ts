// utils/axiosInstance.ts (or utils/axiosInstance.js)
import axios from 'axios';
import { API_URL } from '@/config/api';
// Remove useRouter import from here

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Function to handle error redirection - now accepts router
const handleResponseError = (error: any, router: any) => { // router is now an argument
    if (typeof window !== 'undefined' && router) { // Ensure window and router exist
        if (error.response) {
            
            const statusCode = error.response.data.statusCode;
            const message = error.response.data.message;
            if (statusCode && message) {
                router.push(`/error?status=${statusCode}&message=${encodeURIComponent(message)}`);
            } else {
                router.push(`/error?message=${encodeURIComponent('An unexpected error occurred.')}`);
            }
        } else if (error.request) {
            router.push(`/error?message=${encodeURIComponent('No response received from the server.')}`);
        } else {
            router.push(`/error?message=${encodeURIComponent(error.message || 'Request setup error.')}`);
        }
    }
    
    return Promise.reject(error);
};


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        // We now just call the error handling function, passing the router later
        return handleResponseError(error, null); // Initially pass null, router will be provided when calling this
    }
);

export default axiosInstance;