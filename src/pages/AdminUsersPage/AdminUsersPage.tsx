import { useNavigate } from "react-router-dom"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import { useEffect, useState } from "react"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import "./AdminUsersPage.css"
import AlphabetSelector from "../../ui components/AlphabetSelector/AlphabetSelector"


const AdminUsersPage = () => {
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
        <div className="admin-users-page">
                {(isAuthorized && !isHamburger) && <Sidebar/>}
                <div className="app-content">
                    <div className="admin-users-page-header">
                        {(isAuthorized && isHamburger) && <Sidebar/>}
                        {!isHamburger && <div className="admin-users-header-name">{translate("adminLandingTitle")}</div>}
                        <LanguageSwitch/>
                    </div>
                    {isHamburger && <div className="admin-users-header-name">{translate("adminLandingTitle")}</div>}
                    <div className="admin-users-page-path">
                        <p className="admin-users-page-path-main" onClick={() => navigate("/")}>{`${translate("main")} /`}</p>
                        <p className="admin-users-page-path-admin" onClick={() => navigate("/admin")}>{`${translate("adminLandingTitle")} /`}</p>
                        <p className="admin-users-page-path-admin-users">{translate("adminUsersTitle")}</p>
                    </div>

                    <div className="admin-users-page-content">
                        <AlphabetSelector
                            onLetterSelect={(letter) => console.log(letter)}/>
                    </div>
                </div>
        </div>
    )
}

export default AdminUsersPage