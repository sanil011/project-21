import axios from "axios";
import tokenServices from "../services/token-services";
// Create Axios instance
const instance = axios.create({
    baseURL: "https://play-247.in/games/",
    headers: {
        "Content-Type": "application/json",
    },
});

// ========== Helper Functions ==========

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem("lucky-game-user") || "{}");
    } catch (e) {
        return {};
    }
};

const setStoredUser = (newToken) => {
    // 1. Get the existing value from localStorage
    const userData = JSON.parse(localStorage.getItem('lucky-game-user'));

    // 2. Update only the JWT token
    userData.jwt = newToken;

    // 3. Save it back to localStorage
    localStorage.setItem('lucky-game-user', JSON.stringify(userData));

};

const refreshToken = async () => {
    const user = getStoredUser();
    if (!user?.refreshToken) {
        throw new Error("No refresh token available.");
    }

    const res = await axios.post(
        "https://play-247.in/games/rest/v1/user/generateRefreshToken",
        { refreshToken: user.refreshToken }
    );
    return res.data?.jwt;
};

const logout = () => {
    tokenServices.removeUser();
    // localStorage.removeItem("lucky-game-user");
    window.location.href = "/login";
};

// ========== Token Refresh Queue ==========

let isRefreshing = false; // Flag to indicate if the token refresh is in progress
let failedQueue = []; // Queue to store requests that failed due to token expiration

// Function to process the queue and retry requests with the new token
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        error ? prom.reject(error) : prom.resolve(token);
    });
    failedQueue = []; // Clear the queue after processing
};

// ========== Axios Interceptor ==========

// Request Interceptor: Attach the token to requests
instance.interceptors.request.use(
    async (config) => {
        const user = getStoredUser();
        const jwt = user?.jwt;

        if (jwt) {
            // If the token exists, set it in the Authorization header
            config.headers["Authorization"] = `Bearer ${jwt}`;
        } else {
            // If there's no token, call the logout function
            console.log("sanil no token found");
            logout();
            // Optionally throw an error to prevent the request from being sent
            return Promise.reject(new Error("No token found. User has been logged out."));
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// Response Interceptor: Handle 403 (expired token) and retry with new token
instance.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalConfig = err.config;
        console.log("sanil",err,originalConfig);
        if (err.response && err.response.status === 403) {
            if (originalConfig._retry) {
                // If the request has already been retried, log out
                console.log("sanil originalConfig",originalConfig)
                logout();
                return Promise.reject(err);
            }

            originalConfig._retry = true; // Mark the original request as retried

            // Check if the refresh process is already in progress
            if (!isRefreshing) {
                isRefreshing = true; // Set the flag to prevent multiple refresh requests

                try {
                    // Attempt to refresh the token
                    console.log("sanil refreshToken");
                    const newToken = await refreshToken();
                    setStoredUser(newToken);
                   
                    // Retry the original request with the new token
                    originalConfig.headers["Authorization"] = `Bearer ${newToken}`;

                    // Process and resolve any queued requests
                    processQueue(null, newToken);

                    return instance(originalConfig); // Retry the original failed request
                } catch (refreshError) {
                    // If token refresh fails, process the queue with the error and log out
                    processQueue(refreshError, null);
                    logout();
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false; // Reset the flag once refresh is done
                }
            } else {
                // If a refresh request is already in progress, queue the current request
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalConfig.headers["Authorization"] = `Bearer ${token}`;
                            resolve(instance(originalConfig)); // Retry the request with the new token
                        },
                        reject: (err) => reject(err),
                    });
                });
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
