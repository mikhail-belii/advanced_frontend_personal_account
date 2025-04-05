import "./NotificationPopup.css"
import INFO from "../../assets/icons/notification-popup/Info.svg"
import SUCCESS from "../../assets/icons/notification-popup/Circle-Check.svg"
import ERROR from "../../assets/icons/notification-popup/Close-Circle.svg"
import WARNING from "../../assets/icons/notification-popup/Circle-Warning.svg"
import CLOSE_BLUE from "../../assets/icons/notification-popup/Close-Blue.svg"
import CLOSE_GREEN from "../../assets/icons/notification-popup/Close-Green.svg"
import CLOSE_RED from "../../assets/icons/notification-popup/Close-Red.svg"
import CLOSE_ORANGE from "../../assets/icons/notification-popup/Close-Orange.svg"
import { useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"

type NotificationPopupType = {
    type: "info" | "success" | "error" | "warning",
    innerText: string,
    onClose?: () => void,
    lifeTime?: number
}

const config = {
    info: {
        icon: INFO,
        closeIcon: CLOSE_BLUE,
        color: "#2196F3"
    },
    success: {
        icon: SUCCESS,
        closeIcon: CLOSE_GREEN,
        color: "#39882C"
    },
    error: {
        icon: ERROR,
        closeIcon: CLOSE_RED,
        color: "#FF5757"
    },
    warning: {
        icon: WARNING,
        closeIcon: CLOSE_ORANGE,
        color: "#E78400"
    },
}

export const NotificationPopup = ({type, innerText, onClose, lifeTime = 3000}: NotificationPopupType) => {
    const {translate} = useLanguage()
    const {icon, closeIcon, color} = config[type]
    const text = translate(type)

    useEffect(() => {
        if (lifeTime > 0) {
            const timer = setTimeout(() => {
                if (onClose) {
                    onClose()
                }
            }, lifeTime)

            return () => clearTimeout(timer)
        }
    }, [lifeTime, onClose])

    return (
        <>
            <div className={`popup-container popup-container-${type}`}>
                <div className="popup-header-wrapper">
                    <div className="popup-header">
                        <div className="header-left">
                            <img src={icon} className="popup-icon"/>
                            <span className="popup-text" style={{color: color}}>{text}</span>
                        </div>
                        <div className="header-right">
                            <img src={closeIcon} className="popup-close" onClick={onClose}/>
                        </div>
                    </div>
                </div>
                <div className="popup-info">
                    <span className="popup-inner-text">{innerText}</span>
                </div>
            </div>
        </>
    )
}