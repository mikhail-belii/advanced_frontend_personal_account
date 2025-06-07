import ArrowIcon from "../../assets/icons/Arrow_Up_Right_Icon.svg"
import "./RedirectionButton.css"

export type RedirectionButtonProps = {
    text: string,
    link: string
}

const RedirectionButton = ({text, link}: RedirectionButtonProps) => {
    const getValidUrl = (url: string) => {
        if (/^https?:\/\//i.test(url)) {
            return url
        }
        return `https://${url}`
    }

    return (
        <div className="redirection-button" onClick={() => window.open(getValidUrl(link), "_blank")}>
            <span className="redirection-button-text">{text}</span>
            <span className="redirection-button-icon">
                <img src={ArrowIcon} alt="arrow-icon"/>
            </span>
        </div>
    )
}

export default RedirectionButton