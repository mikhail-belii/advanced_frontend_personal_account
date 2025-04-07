import { useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import Arrow_Down_Blue from "../../assets/icons/Arrow-down-blue.svg"
import Arrow_Up_Blue from "../../assets/icons/Arrow-up-blue.svg"
import PersonalityUnit from "../PersonalityCard/PersonalityUnit/PersonalityUnit"
import "./EducationCard.css"

export interface IEducationEntry {
    id: string,
    faculty: string,
    group: string,
    educationStatus: string,
    educationBase: string,
    educationDirection: string,
    educationProfile: string,
    educationQualification: string,
    educationLevel: string,
    educationForm: string,
    educationYears: string,
    creditBookNumber: string,
    course: number
}

const EducationCard = ({...props}: IEducationEntry) => {
    const [isOpen, setIsOpen] = useState(true)
    const {translate} = useLanguage()

    return (
        <>
            <div className="education-card">
                <div className="education-card-header" onClick={() => setIsOpen(!isOpen)}>
                    <div className="education-card-education-level">{props.educationLevel}</div>
                    <div className="education-card-status-and-arrow">
                        <div className="education-card-education-status">{props.educationStatus}</div>
                        <div className="education-card-arrow">
                            <img src={isOpen ? Arrow_Up_Blue : Arrow_Down_Blue} alt="Arrow"/>
                        </div>
                    </div>
                </div>
                <div className={`education-card-info ${isOpen ? "opened" : "closed"}`}>
                    <div className="education-card-info-row">
                        <PersonalityUnit label={translate("educationYears")} text={props.educationYears}/>
                        <PersonalityUnit label={translate("creditBookNumber")} text={props.creditBookNumber}/>
                    </div>
                    <hr className="divider"/>
                    <div className="education-card-info-row">
                        <PersonalityUnit label={translate("educationForm")} text={props.educationForm}/>
                        <PersonalityUnit label={translate("educationBase")} text={props.educationBase}/>
                    </div>
                    <hr className="divider"/>
                    <div className="education-card-info-row">
                        <PersonalityUnit label={translate("faculty")} text={props.faculty}/>
                        <PersonalityUnit label={translate("educationDirection")} text={props.educationDirection}/>
                    </div>
                    <hr className="divider"/>
                    <div className="education-card-info-row">
                        <PersonalityUnit label={translate("educationProfile")} text={props.educationProfile}/>
                        <PersonalityUnit label={translate("educationQualification")} text={props.educationQualification}/>
                    </div>
                    <hr className="divider"/>
                    <div className="education-card-info-row">
                        <PersonalityUnit label={translate("course")} text={String(props.course)}/>
                        <PersonalityUnit label={translate("group")} text={props.group}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EducationCard