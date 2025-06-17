import { useNavigate } from "react-router-dom"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import { useEffect, useState } from "react"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import "./AdminLandingPage.css"
import AdminLandingCard from "../../ui components/AdminLandingCard/AdminLandingCard"
import UsersIcon from "../../assets/icons/Users_Icon.svg"
import UsefulServicesIcon from "../../assets/icons/UsefulServices_Icon.svg"
import EventsIcon from "../../assets/icons/Events_Icon.svg"


export type AdminLandingCards = {
    icon: string,
    title: string,
    description: string,
    path: string
}

export const AdminLandingCards: AdminLandingCards[] = [
    {
        icon: UsersIcon,
        title: "adminLandingCardUsersTitle",
        description: "adminLandingCardUsersDescription",
        path: "/admin/users"
    },
    {
        icon: UsefulServicesIcon,
        title: "adminLandingCardUSTitle",
        description: "adminLandingCardUSDescription",
        path: "/admin/usefulservices"
    },
    {
        icon: EventsIcon,
        title: "adminLandingCardEventsTitle",
        description: "adminLandingCardEventsDescription",
        path: "/admin/events"
    }
]


const AdminLandingPage = () => {
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

    return (
        <div className="admin-landing-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="admin-landing-page-header">
                    {(isAuthorized && isHamburger) && <Sidebar/>}
                    {!isHamburger && <div className="admin-landing-header-name">{translate("adminLandingTitle")}</div>}
                    <LanguageSwitch/>
                </div>
                {isHamburger && <div className="admin-landing-header-name">{translate("adminLandingTitle")}</div>}
                <div className="admin-landing-page-path">
                    <p className="admin-landing-page-path-main" onClick={() => navigate("/")}>{`${translate("main")} /`}</p>
                    <p className="admin-landing-page-path-admin-landing">{translate("adminLandingTitle")}</p>
                </div>

                <div className="admin-landing-page-content">
                    {AdminLandingCards.map(card => (
                        <AdminLandingCard
                            onClick={() => navigate(card.path)}
                            key={card.title}
                            icon={card.icon}
                            title={translate(card.title)}
                            description={translate(card.description)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminLandingPage