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

const ProfilePage = () => {
    const {translate} = useLanguage()
    const {fetchProfileImage} = useAuthorization()
    const [profile, setProfile] = useState<IProfile | null>(null)
    const [educationEntries, setEducationEntries] = useState<IEducationEntry[] | null>(null)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
        }
    }

    const fetchEducationEntries = async () => {
        try {
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
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleUploadSuccess = async (fileId: string) => {
        try {
            const updateResponse = await api.put(`${API_URL}/profile/avatar`, {
                fileId
            })

            if (updateResponse.status === 200) {
                fetchProfile()
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    
    return (
        <>
            <div className="app-content">
                <div className="profile-header">
                    <div className="profile-header-name">{translate("profileTitle")}</div>
                    <LanguageSwitch/>
                </div>
                <div className="profile-content">

                    {profile ? (
                        <PersonalityCard {...profile} onImageClick={() => setIsModalOpen(true)}/>
                    ) : (
                        <p>Loading</p>
                    )}
                    <div className="profile-activity">
                        <div className="profile-activity-username">
                            {`${profile?.lastName || ""} ${profile?.firstName || ""} ${profile?.patronymic || ""}`}
                        </div>
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
        </>
    )
}

export default ProfilePage