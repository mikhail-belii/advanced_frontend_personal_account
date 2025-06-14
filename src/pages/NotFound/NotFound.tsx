import { useEffect } from "react"
import ERROR_LINE1 from "../../assets/images/Error-Line1.png"
import ERROR_LINE2 from "../../assets/images/Error-line2.png"
import BasicButton from "../../ui components/BasicButton/BasicButton"
import "./NotFound.css"
import { useNavigate } from "react-router-dom"

export type NotFoundProps = {
    statusCode: number,
    statusMessageEN: string,
    statusMessageRU: string,
    description: string
}

const NotFound = ({statusCode, statusMessageEN, statusMessageRU, description}: NotFoundProps) => {
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add("body-style")

        return () => {
            document.body.classList.remove("body-style")
        }
    }, [])

    const handleButtonClick = () => {
        navigate('/')
    }

    return (
        <>
            <div className="status-code">{statusCode}</div>
            <div className="status-message-container">
                <div className="status-messages">
                    <div className="status-message">{statusMessageEN}</div>
                    <div className="status-message">{statusMessageRU}</div>
                </div>
                <div className="go-home-button">
                    <BasicButton innerText="ВЕРНУТЬСЯ НА ГЛАВНУЮ" onClick={handleButtonClick}/>
                </div>
            </div>
            <div className="description-container">
                <div className="what-happened">Что случилось?</div>
                <div className="description">{description}</div>
            </div>
            <img src={ERROR_LINE1} alt="ERROR" className="error-line-1"/>
            <img src={ERROR_LINE2} alt="ERROR" className="error-line-2"/>
        </>
    )
}

export default NotFound