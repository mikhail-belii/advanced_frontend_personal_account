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
import { useLanguage } from "../../context/LanguageContext"

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
    const {translate} = useLanguage()
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
                setWarning(translate("typeEmailAndPassword"))
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
            setError(translate("incorrectEmailOrPassword"))
            setShowNotification(true)
        }
    }

    return (
        <>
            <div className="login-page-language-switch">
                <LanguageSwitch/>
            </div>
            <div className="login-wrapper">
                <div className="login">
                    <img src={LoginIllustration} className="login-illustration"/>
                    <div className="login-component">
                        <span className="login-component-header">{translate("loginHeader")}</span>
                        <div className="login-component-form">
                            <div className="inputs">
                                <BasicInput label={translate("email")} type="email" name="email" onChange={handleType}/>
                                <BasicInput label={translate("password")} type="password" name="password" onChange={handleType}/>
                            </div>
                            <div className="buttons">
                                <div className="remember-me-container">
                                    <ToggleSwitch name="rememberMe" onChange={handleRemember}/>
                                    <span className="remember-me-text">{translate("rememberMe")}</span>
                                </div>
                                <BasicButton innerText={translate("login")} onClick={handleLogin}/>
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