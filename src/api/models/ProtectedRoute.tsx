import { ReactNode } from "react"
import { useAuthorization } from "../../context/AuthorizationContext"
import { Navigate } from "react-router-dom"

export type ProtectedRouteProps = {
    children: ReactNode,
    requiredRoles?: string[]
}

const ProtectedRoute = ({children, requiredRoles}: ProtectedRouteProps) => {
    const {isAuthorized, userRole} = useAuthorization()

    if (!isAuthorized) {
        return <Navigate to="/" replace/>
    }

    if (requiredRoles && !requiredRoles.includes(userRole)) {
        return <Navigate to="/" replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute