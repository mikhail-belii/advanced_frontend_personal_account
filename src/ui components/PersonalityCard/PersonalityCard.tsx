import "./PersonalityCard.css"
import ProfileDefault from "../../assets/icons/side-bar/Profile-Image-Blank.svg"
import PersonalityUnit from "./PersonalityUnit/PersonalityUnit"
import { useAuthorization } from "../../context/AuthorizationContext"
import { formatDate } from "../../utils/formatDate"
import { useLanguage } from "../../context/LanguageContext"

export type Avatar = {
    id: string,
    name: string | null,
    extension: string,
    size: number
}

export type Citizenship = {
    id: string,
    name: string | null,
    code: string | null
}

export type ContactType = "Phone" | "Email" | "SocialMedia"

export type Contact = {
    value: string | null,
    type: ContactType
}

export type UserType = "Student" | "Employee"

export type Gender = "NotDefined" | "Male" | "Female"

export interface IProfile {
    id: string,
    email: string | null,
    lastName: string | null,
    firstName: string | null,
    patronymic: string | null,
    birthDate: string | null,
    gender: Gender,
    avatar: Avatar,
    citizenship: Citizenship,
    address: string | null,
    contacts: Contact[] | null,
    userTypes: UserType[] | null,
}

export interface IPersonalityCardProps extends IProfile {
    onImageClick: () => void
}

const PersonalityCard = ({onImageClick, ...props}: IPersonalityCardProps) => {
    const {profileImage} = useAuthorization()
    const {language, translate} = useLanguage()

    const personalData = {
        [translate("gender")]:
          props.gender === "Male"
            ? translate("genderMale")
            : props.gender === "Female"
            ? translate("genderFemale")
            : translate("genderNotDefined"),
        [translate("birthDate")]: formatDate(props.birthDate!, language) || props.birthDate,
        [translate("citizenship")]: props.citizenship?.name || translate("notDefined"),
        [translate("email")]: props.email,
    }

    const personalDataEntries = Object.entries(personalData)
    const contacts = props.contacts || []

    return (
        <div className="personality-card">
            <div className="personality-card-profile-image" onClick={onImageClick}>
                <img src={profileImage || ProfileDefault} alt="Profile Image"/>
            </div>
            <div className="personality-card-personal-data">
                <div className="personality-card-personal-data-header">{translate("personalDataHeader")}</div>
                <div className="personality-card-personal-data-units">
                    {personalDataEntries.map(([key, value], index) => (
                        <div key={key}>
                            <PersonalityUnit
                            label={key}
                            text={typeof value === "string" ? value : String(value)}/>
                            {index < personalDataEntries.length - 1 && <hr className="divider"/>}
                        </div>
                    ))}
                </div>
            </div>
            {(contacts.length > 0 || props.address) && (
                <div className="personality-card-contacts">
                    <div className="personality-card-contacts-header">{translate("contactsHeader")}</div>
                    <div className="personality-card-contacts-units">
                        {contacts.map((contact, index) => (
                            <div key={contact.type}>
                                <PersonalityUnit
                                    label={translate(contact.type.toLowerCase())}
                                    text={typeof contact.value === "string" ? contact.value : String(contact.value)}
                                />
                                {index < contacts.length - 1 || (index === contacts.length - 1 && props.address) ? (
                                    <hr className="divider"/>
                                ) : null}
                            </div>
                        ))}
                        {props.address && (
                            <PersonalityUnit
                                key={props.address}
                                label={translate("address")}
                                text={props.address}/>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PersonalityCard