import { useState } from "react";
import Arrow_Down_Blue from "../../assets/icons/Arrow-down-blue.svg"
import Arrow_Up_Blue from "../../assets/icons/Arrow-up-blue.svg"
import { IEmployeePost } from "../EmployeeCard/EmployeeCard";
import { useLanguage } from "../../context/LanguageContext";
import PersonalityUnit from "../PersonalityCard/PersonalityUnit/PersonalityUnit";
import { departmentsToString } from "../../pages/CertificatesPage/CertificatesPage";
import "./EmployeePostCard.css"
import { formatDate } from "../../utils/formatDate";

const EmployeePostCard = ({...props}: IEmployeePost) => {
    const [isOpen, setIsOpen] = useState(true)
    const {translate, language} = useLanguage()

    return (
        <>
            <div className="employee-post-card">
                <div className="employee-post-card-header" onClick={() => setIsOpen(!isOpen)}>
                    <div className="employee-post-card-post-name">{props.postName.name}</div>
                    <div className="employee-post-card-arrow">
                        <img src={isOpen ? Arrow_Up_Blue : Arrow_Down_Blue} alt="Arrow"/>
                    </div>
                </div>
                <div className={`employee-post-card-info ${isOpen ? "opened" : "closed"}`}>
                    <div className="employee-post-card-info-row">
                        <PersonalityUnit label={translate("employmentType")} text={translate(props.employmentType)}/>
                        <PersonalityUnit label={translate("rate")} text={props.rate.toString()}/>
                    </div>
                    <hr className="divider"/>
                    <div className="employee-post-card-info-row">
                        <PersonalityUnit label={translate("placeOfWork")} text={props.departments ? departmentsToString(props.departments) : ""}/>
                    </div>
                    <hr className="divider"/>
                    <div className="employee-post-card-info-row">
                        <PersonalityUnit label={translate("postType")} text={props.postType.name || ""}/>
                    </div>
                    <hr className="divider"/>
                    <div className="employee-post-card-info-row">
                        <PersonalityUnit label={translate("dateStart")} text={formatDate(props.dateStart || "", language) || "—"}/>
                        <PersonalityUnit label={translate("dateEnd")} text={formatDate(props.dateEnd || "", language) || "—"}/>
                    </div>
                    <hr className="divider"/>
                </div>
            </div>
        </>
    )
}

export default EmployeePostCard