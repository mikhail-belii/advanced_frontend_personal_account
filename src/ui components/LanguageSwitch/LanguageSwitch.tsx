import RUSSIA from "../../assets/icons/RUSSIA.svg"
import ENGLISH from "../../assets/icons/ENGLISH.svg"
import ARROW_DOWN from "../../assets/icons/Arrow-down.svg"
import ARROW_UP from "../../assets/icons/Arrow-up.svg"
import { Language, useLanguage } from "../../context/LanguageContext"
import { useEffect, useRef, useState } from "react"
import "./LanguageSwitch.css"

const LanguageSwitch = () => {
    const {language, setLanguage} = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 376)
    const dropdown = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 376)
        }
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleLanguageSwitch = (language: Language) => {
        setLanguage(language)
        setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutsideDropdown = (event: MouseEvent) => {
            if (dropdown.current && !dropdown.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutsideDropdown)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown)
        }
    }, [isOpen])

    const languages = [
        {
            value: "ru",
            label: "Русский",
            img: RUSSIA
        },
        {
            value: "en",
            label: "English",
            img: ENGLISH
        },
    ]

    return (
        <div className="language-switch" ref={dropdown}>
            <div className="selected-language" onClick={() => setIsOpen(!isOpen)}>
                {!isSmallScreen && (
                    <span className="language-text">{languages.find((lang) => lang.value === language)?.label}</span>
                )}
                <div className="icons">
                    <img src={languages.find((lang) => lang.value === language)?.img} alt={language} className="flag"/>
                    <img src={isOpen? ARROW_UP: ARROW_DOWN} className="language-switch-arrow"/>
                </div>
            </div>
            {isOpen && (
                <ul className="language-select">
                    {languages.map(lang => (
                        <li key={lang.value} 
                        onClick={() => handleLanguageSwitch(lang.value as Language)} 
                        className={language === lang.value ? "active dropdown-language" : "dropdown-language"}>
                            <span>{lang.label}</span>
                            <img src={lang.img} alt={lang.label} className="flag"/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LanguageSwitch