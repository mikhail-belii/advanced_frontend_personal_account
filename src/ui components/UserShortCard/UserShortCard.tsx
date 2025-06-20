import { useLanguage } from '../../context/LanguageContext'
import { ProfileShortDto } from '../../pages/AdminUsersPage/AdminUsersPage'
import './UserShortCard.css'

const UserShortCard = ({ email, lastName, firstName, patronymic, birthDate }: ProfileShortDto) => {
    const {translate} = useLanguage()
    
    const getFullName = () => {
        return `${lastName || ''} ${firstName || ''} ${patronymic || ''}`.trim()
    }

    return (
        <div className="user-short-card">
            <span className="user-short-card-name">{getFullName()}</span>
            <span className="user-short-card-birthdate">
                <span className="user-short-card-label">{`${translate("birthDate")}: `}</span>
                <span className="user-short-card-text">{new Date(birthDate).toLocaleDateString()}</span>
            </span>
            <span className="user-short-card-email">
                <span className="user-short-card-label">{`Email: `}</span>
                <span className="user-short-card-text">{email}</span>
            </span>
        </div>
    )
}

export default UserShortCard