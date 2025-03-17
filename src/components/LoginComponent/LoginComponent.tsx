import BasicButton from "../../ui components/BasicButton/BasicButton"
import BasicInput from "../../ui components/BasicInput/BasicInput"
import ToggleSwitch from "../../ui components/ToggleSwitch/ToggleSwitch"
import LoginIllustration from "../../assets/images/Login-Illustration.svg"
import "./LoginComponent.css"

const LoginComponent = () => {
    return (
        <>
            <div className="login">
                <img src={LoginIllustration} className="login-illustration"/>
                <div className="login-component">
                    <span className="login-component-header">Вход в аккаунт</span>
                    <BasicInput label="Электронная почта"/>
                    <BasicInput label="Пароль"/>
                    <div className="remember-me-container">
                        <ToggleSwitch/>
                        <span className="remember-me-text">Запомнить меня</span>
                    </div>
                    <BasicButton innerText="ВОЙТИ"/>
                </div>
            </div>
        </>
    )
}

export default LoginComponent