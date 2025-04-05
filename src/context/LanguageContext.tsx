import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { TRANSLATIONS } from "../utils/translations"

export type Language = "ru" | "en"

interface LanguageContextType {
    language: Language,
    setLanguage: (language: Language) => void,
    translate: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem("language") as Language) || "ru"
    })

    useEffect(() => {
        localStorage.setItem("language", language)
    }, [language])

    const translate = (key: string) => {
        return TRANSLATIONS[key]?.[language] || key
    }

    return (
        <LanguageContext.Provider value={{language, setLanguage, translate}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error("Error")
    }
    return context
}