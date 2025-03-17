import { createContext, ReactNode, useContext, useEffect, useState } from "react"

export type Language = "ru" | "en"

interface LanguageContextType {
    language: Language,
    setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem("language") as Language) || "ru"
    })

    useEffect(() => {
        localStorage.setItem("language", language)
    }, [language])

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
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