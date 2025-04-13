import { useState } from "react";
import Arrow_Down_Blue from "../../assets/icons/Arrow-down-blue.svg"
import Arrow_Up_Blue from "../../assets/icons/Arrow-up-blue.svg"
import { useLanguage } from "../../context/LanguageContext";
import { Experience } from "../EmployeeCard/EmployeeCard";
import PersonalityUnit from "../PersonalityCard/PersonalityUnit/PersonalityUnit";
import "./EmployeePostExpCard.css"

const EmployeePostExpCard = ({props}: {props: Experience[]}) => {
    const [isOpen, setIsOpen] = useState(true)
    const {translate, language} = useLanguage()

    const groupedExperiences = []
    for (let i = 0; i < props.length; i += 2) {
        groupedExperiences.push(props.slice(i, i + 2))
    }

    return (
        <>
            <div className="employee-post-exp-card">
                <div className="employee-post-exp-card-header" onClick={() => setIsOpen(!isOpen)}>
                    <div className="employee-post-exp-card-header-text">{translate("experience")}</div>
                    <div className="employee-post-exp-card-arrow">
                        <img src={isOpen ? Arrow_Up_Blue : Arrow_Down_Blue} alt="Arrow"/>
                    </div>
                </div>
                <div className={`employee-post-exp-card-info ${isOpen ? "opened" : "closed"}`}>
                    {groupedExperiences.map((group, rowIndex) => (
                        <div key={rowIndex}>
                        <div className="employee-post-exp-card-info-row">
                            {group.map((experience, index) => (
                                <PersonalityUnit
                                    key={index}
                                    label={experience.type || ""}
                                    text={`${experience.years} ${getCorrectDeclension("year", experience.years, language)} ${experience.months} ${getCorrectDeclension("month", experience.months, language)}`}
                                />
                            ))}
                        </div>
                        <hr className="divider"/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default EmployeePostExpCard

export const getCorrectDeclension = (word: "year" | "month", number: number, language: string): string => {
    if (language === "ru") {
        if (word === "year") {
            const lastDigit = number % 10
            const lastTwoDigits = number % 100

            if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
                return "лет"
            }
            if (lastDigit === 1) {
                return "год"
            }
            if (lastDigit >= 2 && lastDigit <= 4) {
                return "года"
            }
            return "лет"
        }
        
        if (word === "month") {
            const lastDigit = number % 10
            const lastTwoDigits = number % 100

            if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
                return "месяцев"
            }
            if (lastDigit === 1) {
                return "месяц"
            }
            if (lastDigit >= 2 && lastDigit <= 4) {
                return "месяца"
            }
            return "месяцев"
        }
    }
    
    if (word === "year") {
        return number === 1 ? "year" : "years"
    }
    if (word === "month") {
        return number === 1 ? "month" : "months"
    }
    
    return ""
}