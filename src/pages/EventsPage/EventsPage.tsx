import { useEffect, useState } from "react"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import "./EventsPage.css"
import BasicButton from "../../ui components/BasicButton/BasicButton"
import { useNavigate } from "react-router-dom"


const EventsPage = () => {
    const {translate} = useLanguage()
    const {isAuthorized} = useAuthorization()
    const navigate = useNavigate()
    const [isHamburger, setIsHamburger] = useState(window.innerWidth < 1201)

    useEffect(() => {
        const handleResize = () => {
            setIsHamburger(window.innerWidth < 1201)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleLoginButtonClick = () => {
        navigate("/login")
    }

    return (
        <div className="events-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="events-page-header">
                    {(isAuthorized && isHamburger) && <Sidebar/>}
                    {!isHamburger && <div className="events-header-name">{translate("eventsTitle")}</div>}
                    <div className="header-right-section">
                        {!isAuthorized && <BasicButton innerText={translate("login")} onClick={handleLoginButtonClick}/>}
                        <LanguageSwitch/>
                    </div>
                </div>
                {isHamburger && <div className="events-header-name">{translate("eventsTitle")}</div>}
                <div className="events-page-path">
                    <p className="events-page-path-main">{`${translate("main")}`}</p>
                </div>


            </div>
        </div>
    )
}

export default EventsPage