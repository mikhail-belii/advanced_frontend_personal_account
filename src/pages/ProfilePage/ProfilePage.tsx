import { useEffect, useState } from "react"
import PersonalityCard, { IProfile } from "../../ui components/PersonalityCard/PersonalityCard"
import api from "../../api/api"
import { API_URL } from "../../constants"
import EducationCard, { IEducationEntry } from "../../ui components/EducationCard/EducationCard"
import "./ProfilePage.css"
import { useLanguage } from "../../context/LanguageContext"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import ProfileActivityNavigationButton from "../../ui components/ProfileActivityNavigationButton/ProfileActivityNavigationButton"
import ImageCropModal from "../../ui components/ImageCropModal/ImageCropModal"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useNotification } from "../../hooks/useNotification"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"

const ProfilePage = () => {
    const {translate} = useLanguage()
    const {fetchProfileImage} = useAuthorization()
    const [profile, setProfile] = useState<IProfile | null>(null)
    const [educationEntries, setEducationEntries] = useState<IEducationEntry[] | null>(null)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 901)

    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 901)
        }
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])
    

    const fetchProfile = async () => {
        try {
            const response = await api.get(`${API_URL}/profile`)
            if (response.status === 200) {
                setProfile(response.data)

                const token = localStorage.getItem("accessToken")
                if (token) {
                    fetchProfileImage(token)
                }

                if (response.data.userTypes.includes("Student")) {
                    fetchEducationEntries()
                    setActiveSection("education")
                }
            }
        }
        catch (e) {
            console.error(e)
            throw e
        }
    }

    const fetchEducationEntries = async () => {
        try {
            setError(null)

            const response = await api.get(`${API_URL}/profile/student`)
            if (response.status === 200) {
                let entries: IEducationEntry[] = []
                response.data.educationEntries.map((entry: { id: any; faculty: { name: any }; group: { name: any }; educationStatus: { name: any }; educationBase: { name: any }; educationDirection: { name: any }; educationProfile: { name: any }; educationQualification: { name: any }; educationLevel: { name: any }; educationForm: { name: any }; educationYears: { name: any }; creditBooknumber: any; course: any }) => {
                    let newEntry: IEducationEntry = {
                        id: entry.id,
                        faculty: entry.faculty.name,
                        group: entry.group.name,
                        educationStatus: entry.educationStatus.name,
                        educationBase: entry.educationBase.name,
                        educationDirection: entry.educationDirection.name,
                        educationProfile: entry.educationProfile.name,
                        educationQualification: entry.educationQualification.name,
                        educationLevel: entry.educationLevel.name,
                        educationForm: entry.educationForm.name,
                        educationYears: entry.educationYears.name,
                        creditBookNumber: entry.creditBooknumber,
                        course: entry.course
                    }
                    entries.push(newEntry)
                })
                setEducationEntries(entries)
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchProfileError"))
            setShowNotification(true)
        }
    }

    useEffect(() => {
        try {
            setError(null)
            setSuccess(null)
            fetchProfile()
            setSuccess(translate("fetchProfileSuccess"))
            setShowNotification(true)
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchProfileError"))
            setShowNotification(true)
        }
        
    }, [])

    const handleUploadSuccess = async (fileId: string) => {
        try {
            setError(null)
            setSuccess(null)

            const updateResponse = await api.put(`${API_URL}/profile/avatar`, {
                fileId
            })

            if (updateResponse.status === 200) {
                fetchProfile()
            }
            setSuccess(translate("uploadingProfilePhotoSuccess"))
            setShowNotification(true)
        }
        catch (e) {
            console.error(e)
            setError(translate("uploadingProfilePhotoError"))
            setShowNotification(true)
        }
    }
    
    return (
        <>
            <div className="app-content">
                <div className="profile-header">
                    <div className="profile-header-name">{translate("profileTitle")}</div>
                    <LanguageSwitch/>
                </div>
                {isSmallScreen && (
                        <div className="profile-activity-username">
                            {`${profile?.lastName || ""} ${profile?.firstName || ""} ${profile?.patronymic || ""}`}
                        </div>
                    )}
                <div className="profile-content">

                    {profile ? (
                        <PersonalityCard {...profile} onImageClick={() => setIsModalOpen(true)}/>
                    ) : (
                        <p>Loading</p>
                    )}
                    <div className="profile-activity">
                        {!isSmallScreen && (
                            <div className="profile-activity-username">
                                {`${profile?.lastName || ""} ${profile?.firstName || ""} ${profile?.patronymic || ""}`}
                            </div>
                        )}

                        <div className="profile-activity-navigation">
                            {educationEntries && (
                                <ProfileActivityNavigationButton 
                                    text={translate("education")}
                                    isActive={activeSection === "education"}
                                    onClick={() => setActiveSection("education")}/>
                            )}
                        </div>
                        {educationEntries ? (
                            educationEntries.map(entry => 
                                <EducationCard key={entry.id} {...entry}/>
                            )
                        ) : (
                            <p>Loading</p>
                        )}
                    </div>
                </div>
                <ImageCropModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUploadSuccess={handleUploadSuccess}/>
            </div>
            {showNotification && success && (
                <NotificationPopup type="success" innerText={success} onClose={handleClose}/>
            )}
            {showNotification && error && (
                <NotificationPopup type="error" innerText={error} onClose={handleClose}/>
            )}
        </>
    )
}

export default ProfilePage