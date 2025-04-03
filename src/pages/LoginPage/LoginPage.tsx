import BasicButton from "../../ui components/BasicButton/BasicButton"
import BasicInput from "../../ui components/BasicInput/BasicInput"
import ToggleSwitch from "../../ui components/ToggleSwitch/ToggleSwitch"
import LoginIllustration from "../../assets/images/Login-Illustration.svg"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import "./LoginPage.css"
import { ChangeEvent, useEffect, useState } from "react"
import { useAuthorization } from "../../context/AuthorizationContext"
import api from "../../api/api"
import { API_URL } from "../../constants"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"
import { useNotification } from "../../hooks/useNotification"
import { useProtectedRoute } from "../../hooks/useProtectedRoute"

type LoginCreds = {
    email: string,
    password: string,
    rememberMe: boolean
}

const LoginPage = () => {
    const [creds, setCreds] = useState<LoginCreds>({email: "", password: "", rememberMe: false})
    const [error, setError] = useState<string | null>(null)
    const [warning, setWarning] = useState<string | null>(null)
    const {login} = useAuthorization()
    const {showNotification, setShowNotification, handleClose} = useNotification(false)

    useEffect(() => {
        document.body.classList.add("body-style")

        return () => {
            document.body.classList.remove("body-style")
        }
    }, [])

    useProtectedRoute({
        redirectIfAuthorized: true,
        redirectTo: "/"
    })

    const handleType = (event: ChangeEvent<HTMLInputElement>) => {
        setCreds((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleRemember = (checked: boolean) => {
        setCreds((prev) => ({
            ...prev,
            "rememberMe": checked
        }))
    }

    const handleLogin = async () => {
        try {
            setError(null)
            setWarning(null)

            if (creds.email === '' || creds.password === "") {
                setWarning("Введите Email и пароль")
                setShowNotification(true)
                return
            }

            const response = await api.post(`${API_URL}/Auth/login`, {
                "email": creds.email,
                "password": creds.password,
                "rememberMe": creds.rememberMe
            })

            if (!response.data.loginSucceeded) {
                throw new Error
            }

            const {accessToken, refreshToken} = response.data
            login(accessToken, refreshToken)
        }
        catch (err) {
            setError("Неверный Email или пароль")
            setShowNotification(true)
        }
    }

    return (
        <>
            <LanguageSwitch/>
            <div className="login-wrapper">
                <div className="login">
                    <img src={LoginIllustration} className="login-illustration"/>
                    <div className="login-component">
                        <span className="login-component-header">Вход в аккаунт</span>
                        <div className="login-component-form">
                            <div className="inputs">
                                <BasicInput label="Электронная почта" type="email" name="email" onChange={handleType}/>
                                <BasicInput label="Пароль" type="password" name="password" onChange={handleType}/>
                            </div>
                            <div className="buttons">
                                <div className="remember-me-container">
                                    <ToggleSwitch name="rememberMe" onChange={handleRemember}/>
                                    <span className="remember-me-text">Запомнить меня</span>
                                </div>
                                <BasicButton innerText="ВОЙТИ" onClick={handleLogin}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showNotification && error && (
                <NotificationPopup type="error" innerText={error} onClose={handleClose}/>
            )}
            {showNotification && warning && (
                <NotificationPopup type="warning" innerText={warning} onClose={handleClose}/>
            )}
        </>
    )
}

export default LoginPage