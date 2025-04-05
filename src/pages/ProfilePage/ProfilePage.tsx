import { useEffect, useState } from "react"
import PersonalityCard, { IProfile } from "../../ui components/PersonalityCard/PersonalityCard"
import api from "../../api/api"
import { API_URL } from "../../constants"

const ProfilePage = () => {
    const [profile, setProfile] = useState<IProfile | null>(null)

    const fetchProfile = async () => {
        try {
            const response = await api.get(`${API_URL}/profile`)
            if (response.status === 200) {
                setProfile(response.data)
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])
    
    return (
        <>
            <div className="app-content">
                {profile ? (
                    <PersonalityCard {...profile}/>
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </>
    )
}

export default ProfilePage