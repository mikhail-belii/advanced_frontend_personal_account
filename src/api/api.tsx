import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants";
import { TokenPairDto } from "./models/models";
import { globalLogout } from "../context/AuthorizationContext";

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config

}, (error) => Promise.reject(error))

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: unknown) => void,
    reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token)
        }
        else {
            prom.reject(error)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(response => response,
    async (error) => {
        const request = error.config
        if (error.response?.status === 401 && !request._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        request.headers.Authorization = `Bearer ${token}`
                        return api(request)
                    })
                    .catch((err) => Promise.reject(err))
            }

            request._retry = true
            isRefreshing = true

            try {
                const refreshToken = localStorage.getItem("refreshToken")
                if (!refreshToken) {
                    throw new Error("Refresh token was not found")
                }

                const response = await axios.post(`${API_URL}/Auth/refresh`, {refreshToken}) 
                const pair: TokenPairDto = response.data

                const newAccessToken = pair.accessToken
                const newRefreshToken = pair.refreshToken

                if (newAccessToken && newRefreshToken) {
                    localStorage.setItem("accessToken", newAccessToken)
                    localStorage.setItem("refreshToken", newRefreshToken)

                    processQueue(null, newAccessToken)
                }

                request.headers.Authorization = `Bearer ${newAccessToken}`

                return api(request)
            }
            catch (refreshingError) {
                processQueue(refreshingError, null)

                if (globalLogout) {
                    globalLogout()
                }
                else {
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("refreshToken")
                    window.location.href = "/login"
                }
                return Promise.reject(refreshingError)
            }
            finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api