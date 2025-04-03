import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserRole } from "../utils/jwt"
import api from "../api/api"
import { API_URL } from "../constants"

type AuthorizationContextType = {
    isAuthorized: boolean,
    login: (accessToken: string, refreshToken: string) => void,
    logout: () => void,
    userRole: string,
    profileImage: string | null
}

const AuthorizationContext = createContext<AuthorizationContextType | undefined>(undefined)

export var globalLogout: (() => void) | null = null

export const setGlobalLogout = (logout: (() => void) | null) => {
    globalLogout = logout
}

export const AuthorizationProvider = ({children}: {children: ReactNode}) => {
    const [isAuthorized, setIsAuthorized] = useState(() => {
        return !!localStorage.getItem("accessToken")
    })
    const [userRole, setUserRole] = useState(() => {
        const token = localStorage.getItem("accessToken")
        return token ? getUserRole(token) : "Default"
    })
    const [profileImage, setProfileImage] = useState<string | null>(() => {
        return localStorage.getItem("profileImage")
    })
    const navigate = useNavigate()

    const fetchProfileImage = async (token: string) => {
        try {
            const profile = await api.get(`${API_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const avatar = profile.data.avatar
            if (!avatar || avatar === null || !avatar.id) {
                console.error("Profile image wasn't found")
                return
            }
            const file = await api.get(`${API_URL}/Files/${avatar.id}`, {
                responseType: 'blob'
            })
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.data)
                reader.onloadend = () => {
                  const result = reader.result as string
                  resolve(result)
                }
                reader.onerror = (error) => reject(error)
            })
            localStorage.setItem("profileImage", base64)
            setProfileImage(base64)
        }
        catch (e) {
            console.error(e)
            throw e
        }
    }

    const login = async (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        setIsAuthorized(true)
        const role = getUserRole(accessToken)
        setUserRole(role)
        
        await fetchProfileImage(accessToken)
        if (localStorage.getItem("profileImage") && !profileImage) {
            setProfileImage(localStorage.getItem("profileImage"))
        }
        navigate("/")
    }

    const logout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("profileImage")
        setIsAuthorized(false)
        setUserRole("None")
        setProfileImage(null)
        navigate('/')
    }

    useEffect(() => {
        setGlobalLogout(logout)

        return () => {
            setGlobalLogout(null)
        }
    }, [logout])

    return (
        <AuthorizationContext.Provider value={{isAuthorized, login, logout, userRole, profileImage}}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export const useAuthorization = () => {
    const context = useContext(AuthorizationContext)
    if (!context) {
        throw new Error("Error")
    }
    return context
}