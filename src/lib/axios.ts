import { ENDPOINTS } from './endpoints';
import axios, { AxiosError } from 'axios';

const axiosService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
    withCredentials: true
});

// Flag to prevent multiple concurrent refresh calls
let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

axiosService.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const config = error.config!;

        // If 401 and we haven’t already tried refreshing
        //@ts-ignore
        if (status === 401 && !config._retry) {
            //@ts-ignore
            config._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    // Grab the current refresh token from cookies
                    const refresh = document.cookie
                        .split('; ')
                        .find((row) => row.startsWith('refresh='))
                        ?.split('=')[1]!;

                    await axiosService.post(ENDPOINTS.auth.refresh, { refresh });
                    isRefreshing = false;

                    // Retry all the requests queued during the refresh
                    pendingRequests.forEach((cb) => cb());
                    pendingRequests = [];
                } catch {
                    // If refresh fails, redirect to login
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            }

            // Queue this request until the refresh is done, then retry
            return new Promise((resolve) => {
                pendingRequests.push(() => {
                    resolve(axiosService(config));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosService;
