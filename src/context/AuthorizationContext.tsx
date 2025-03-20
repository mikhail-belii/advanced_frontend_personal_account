import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type AuthorizationContextType = {
    isAuthorized: boolean,
    login: (accessToken: string, refreshToken: string) => void,
    logout: () => void
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

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        setIsAuthorized(true)
    }

    const logout = () => {
        const navigate = useNavigate()
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setIsAuthorized(false)
        navigate('/')
    }

    useEffect(() => {
        setGlobalLogout(logout)

        return () => {
            setGlobalLogout(null)
        }
    }, [logout])

    return (
        <AuthorizationContext.Provider value={{isAuthorized, login, logout}}>
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