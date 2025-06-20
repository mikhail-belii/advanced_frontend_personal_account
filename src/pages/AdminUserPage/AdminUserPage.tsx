import { useNavigate, useParams } from "react-router-dom"
import { useLanguage } from "../../context/LanguageContext"
import { useEffect, useState } from "react"
import { useAuthorization } from "../../context/AuthorizationContext"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import { Citizenship, Contact, FileDto, Gender, UserType } from "../../ui components/PersonalityCard/PersonalityCard"
import api from "../../api/api"
import { API_URL } from "../../constants"
import { useNotification } from "../../hooks/useNotification"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"
import ProfileDefault from "../../assets/icons/side-bar/Profile-Image-Blank.svg"
import "./AdminUserPage.css"
import PersonalityUnit from "../../ui components/PersonalityCard/PersonalityUnit/PersonalityUnit"

export type ProfileDto = {
    id: string,
    email?: string,
    lastName?: string,
    firstName?: string,
    patronymic?: string,
    birthDate: string,
    gender: Gender,
    avatar?: FileDto,
    citizenship: Citizenship,
    address?: string,
    contacts?: Contact[],
    userTypes?: UserType[]
}


const AdminUserPage = () => {
    const {id} = useParams()
    const {isAuthorized} = useAuthorization()
    const {translate} = useLanguage()
    const navigate = useNavigate()
    const [isHamburger, setIsHamburger] = useState(window.innerWidth < 1201)
    const [user, setUser] = useState<ProfileDto | null>(null)
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)

    useEffect(() => {
        const handleResize = () => {
            setIsHamburger(window.innerWidth < 1201)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        fetchProfileImage()
    }, [user])

    const fetchUser = async () => {
        try {
            setError(null)
            const response = await api.get(`${API_URL}/user/${id}`)
            if (response.status === 200) {
                setUser(response.data)
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchProfileError"))
            setShowNotification(true)
        }
    }

    const getUsersFullName = (user: ProfileDto) => {
        const fullName = `${user.lastName} ${user.firstName} ${user.patronymic}`
        return fullName
    }

    const fetchProfileImage = async () => {
        if (user && user.avatar) {
            try {
                const response = await api.get(`${API_URL}/files/${user.avatar.id}`, { 
                    responseType: 'blob' })
                if (response.status === 200) {
                    const blob = response.data
                    const url = URL.createObjectURL(blob)
                    setProfileImage(url)
                }
            }
            catch (e) {
                console.error(e)
                setError(translate("fetchProfileError"))
                setShowNotification(true)
            }
        }
    }

    return (
        <div className="admin-user-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="admin-user-page-header">
                    {(isAuthorized && isHamburger) && <Sidebar/>}
                    {!isHamburger && <div className="admin-user-header-name">{translate("adminLandingTitle")}</div>}
                    <LanguageSwitch/>
                </div>
                {isHamburger && <div className="admin-user-header-name">{translate("adminLandingTitle")}</div>}
                <div className="admin-user-page-path">
                    <p className="admin-user-page-path-main" onClick={() => navigate("/")}>{`${translate("main")} /`}</p>
                    <p className="admin-user-page-path-admin" onClick={() => navigate("/admin")}>{`${translate("adminLandingTitle")} /`}</p>
                    <p className="admin-user-page-path-admin-users" onClick={() => navigate("/admin/users")}>{`${translate("adminUsersTitle")} /`}</p>
                    {user && <p className="admin-user-page-path-admin-user">{getUsersFullName(user)}</p>}
                </div>

                <div className="admin-user-page-content">
                    {user && (
                        <>
                            <div className="admin-user-page-content-userName">
                                {getUsersFullName(user)}
                            </div>
                            <div className="admin-user-page-content-container">
                                <img src={profileImage || ProfileDefault} className="admin-user-page-content-container-image" alt="profile image"/>
                                <div className="admin-user-page-content-container-info">
                                    <div className="admin-user-page-content-container-info-data">
                                        <span className="admin-user-page-content-container-info-data-title">{translate("individualData")}</span>
                                        <PersonalityUnit
                                            label={translate("gender")}
                                            text={user.gender === "Male"
                                                ? translate("genderMale")
                                                : user.gender === "Female"
                                                ? translate("genderFemale")
                                                : translate("genderNotDefined")}/>
                                        <hr className="divider"/>
                                        <PersonalityUnit
                                            label={translate("birthDate")}
                                            text={new Date(user.birthDate).toLocaleDateString()}/>
                                        <hr className="divider"/>
                                        <PersonalityUnit
                                            label={translate("email")}
                                            text={user.email || ""}/>
                                    </div>

                                    <div className="admin-user-page-content-container-info-contacts">
                                    <span className="admin-user-page-content-container-info-contacts-title">{translate("contactsHeader")}</span>
                                        {user.contacts?.map((contact, index) => (
                                            <div key={contact.type}>
                                                <PersonalityUnit
                                                    label={translate(contact.type.toLowerCase())}
                                                    text={typeof contact.value === "string" ? contact.value : String(contact.value)}
                                                />
                                                {index < (user.contacts?.length ?? 0) - 1 ? (
                                                    <hr className="divider"/>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {showNotification && error && (
                <NotificationPopup type="error" innerText={error} onClose={handleClose}/>
            )}
        </div>
    )
}

export default AdminUserPage