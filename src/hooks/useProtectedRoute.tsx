import { useNavigate } from "react-router-dom"
import { useAuthorization } from "../context/AuthorizationContext"
import { useEffect } from "react"

type ProtectedRouteProps = {
    redirectIfAuthorized?: boolean,
    redirectTo: string
}

export const useProtectedRoute = ({redirectIfAuthorized = false, redirectTo = '/'}: ProtectedRouteProps) => {
    const {isAuthorized} = useAuthorization()
    const navigate = useNavigate()

    useEffect(() => {
        if (redirectIfAuthorized && isAuthorized) {
            navigate(redirectTo, {replace: true})
        }
    }, [isAuthorized, navigate, redirectIfAuthorized, redirectTo])
}