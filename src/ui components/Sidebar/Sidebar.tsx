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

const Sidebar = () => {
    const [isExtended, setIsExtended] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { userRole, profileImage } = useAuthorization()

    const navItems = [
        {
            id: "profile",
            text: "Профиль",
            path: "/profile",
            iconBlack: ProfileBlack,
            iconBlue: ProfileBlue
        },
        ...(userRole === "Admin" ? [{
            id: "admin",
            text: "Администрирование",
            path: "/admin",
            iconBlack: AdministrationBlack,
            iconBlue: AdministrationBlue
        }] : []),
        {
            id: "certificates",
            text: "Справки",
            path: "/certificates",
            iconBlack: CertificatesBlack,
            iconBlue: CertificatesBlue
        },
        {
            id: "usefulservices",
            text: "Полезные сервисы",
            path: "/usefulservices",
            iconBlack: UsefulServicesBlack,
            iconBlue: UsefulServicesBlue
        },
        {
            id: "events",
            text: "Мероприятия",
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
                        alt={item.text}
                        />
                    </span>
                    <span className="nav-text">{item.text}</span>
                    </button>
                )
                })}
            </nav>
        </div>
      )
}

export default Sidebar