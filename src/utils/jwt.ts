import { jwtDecode } from "jwt-decode";

interface ITokenPayload {
    role?: string,
    [key: string]: any
}

export const getUserRole = (token: string): string => {
    try {
        const decodedToken: ITokenPayload = jwtDecode(token)
        return decodedToken.role || "Default"
    }
    catch (e) {
        console.error(e)
        return "Default"
    }
}