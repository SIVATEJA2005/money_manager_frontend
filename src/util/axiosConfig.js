import axios from "axios";
import { BASE_URL } from "./ApiEndPoints";

// Create axios instance
const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// List of endpoints that do NOT require a token
const excludeEndPoints = ["/login", "/register", "/status", "/activate", "/health"];

// Request interceptor
axiosConfig.interceptors.request.use(
    (config) => {
        // Check if the request URL matches any excluded endpoint
        const shouldSkipToken = excludeEndPoints.some((endpoint) =>
            config.url?.includes(endpoint)
        );

        if (!shouldSkipToken) {
            const accessToken = localStorage.getItem("token");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401 && !window.location.pathname.includes("login")) {
                // Redirect to login page if unauthorized
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.log("Server error");
            }
        } else if (error.code === "ECONNABORTED") {
            console.log("Request timeout. Please try again.");
        }

        return Promise.reject(error);
    }
);

export default axiosConfig;
