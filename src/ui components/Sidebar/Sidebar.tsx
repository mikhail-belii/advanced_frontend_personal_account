import { useState } from "react"
import "./Sidebar.css"
import { useLocation, useNavigate } from "react-router-dom"
import ProfileBlack from "../../assets/icons/side-bar/Navbar/Black/Sidebar-Profile-Black.svg"
import AdministrationBlack from "../../assets/icons/side-bar/Navbar/Black/Sidebar-Administration-Black.svg"
import CertificatesBlack from "../../assets/icons/side-bar/Navbar/Black/Sidebar-Certificates-Black.svg"
import UsefulServicesBlack from "../../assets/icons/side-bar/Navbar/Black/Sidebar-UsefulServices-Black.svg"
import EventsBlack from "../../assets/icons/side-bar/Navbar/Black/Sidebar-Events-Black.svg"
import ProfileBlue from "../../assets/icons/side-bar/Navbar/Blue/Sidebar-Profile-Blue.svg"
import AdministrationBlue from "../../assets/icons/side-bar/Navbar/Blue/Sidebar-Administration-Blue.svg"
import CertificatesBlue from "../../assets/icons/side-bar/Navbar/Blue/Sidebar-Certificates-Blue.svg"
import UsefulServicesBlue from "../../assets/icons/side-bar/Navbar/Blue/Sidebar-UsefulServices-Blue.svg"
import EventsBlue from "../../assets/icons/side-bar/Navbar/Blue/Sidebar-Events-Blue.svg"
import ProfileDefault from "../../assets/icons/side-bar/Profile-Image-Blank.svg"
import CollapsedIcon from "../../assets/icons/side-bar/Sidebar-Collapsed-Icon.svg"
import ExtendedIcon from "../../assets/icons/side-bar/Sidebar-Extended-Icon.svg"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"

const Sidebar = () => {
    const [isExtended, setIsExtended] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { userRole, profileImage } = useAuthorization()
    const {translate} = useLanguage()

    const navItems = [
        {
            id: "profile",
            path: "/profile",
            iconBlack: ProfileBlack,
            iconBlue: ProfileBlue
        },
        ...(userRole === "Admin" ? [{
            id: "admin",
            path: "/admin",
            iconBlack: AdministrationBlack,
            iconBlue: AdministrationBlue
        }] : []),
        {
            id: "certificates",
            path: "/certificates",
            iconBlack: CertificatesBlack,
            iconBlue: CertificatesBlue
        },
        {
            id: "usefulservices",
            path: "/usefulservices",
            iconBlack: UsefulServicesBlack,
            iconBlue: UsefulServicesBlue
        },
        {
            id: "events",
            path: "/events",
            iconBlack: EventsBlack,
            iconBlue: EventsBlue
        }
    ]
    
    const toggleSidebar = () => {
        setIsExtended(!isExtended)
    }

    return (
        <div className={`sidebar ${isExtended ? 'extended' : 'collapsed'}`}>
            <button className="extend-button" onClick={toggleSidebar}>
              <img src={isExtended ? ExtendedIcon : CollapsedIcon} alt="Icon"/>
            </button>

            <div className="profile-icon">
                <img src={profileImage || ProfileDefault} alt="Profile" />
            </div>
    
            <nav className="sidebar-nav">
                {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path)
                return (
                    <button
                    key={item.id}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}>
                    <span className="nav-icon">
                        <img
                        src={isActive ? item.iconBlue : item.iconBlack}
                        alt={translate(item.id)}
                        />
                    </span>
                    <span className="nav-text">{translate(item.id)}</span>
                    </button>
                )
                })}
            </nav>
        </div>
      )
}

export default Sidebar