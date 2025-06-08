import { useLanguage } from "../../context/LanguageContext"
import RedirectionButton from "../RedirectionButton/RedirectionButton"
import "./UsefulServiceCard.css"
import BlankImage from "../../assets/images/Image_Blank.jpg"

export type UsefulServiceCardProps = {
    title?: string,
    description?: string,
    link?: string,
    termsOfDisctribution?: string,
    logo: string
}

const UsefulServiceCard = ({title, description, link, termsOfDisctribution, logo}: UsefulServiceCardProps) => {
    const {translate} = useLanguage()
    
    return (
        <div className="useful-service-card">
            <div className="useful-service-card-title">
                {title}
            </div>
            <div className="useful-service-card-description">
                {description}
            </div>
            <div className="useful-service-card-image">
                <img src={logo || BlankImage} alt="logo" />
            </div>
            <div className="useful-service-card-redirect">
                <RedirectionButton text={translate("goToTheWebsite")} link={link || "example.com"} />
            </div>
            <div className="useful-service-card-terms-of-distribution">
                <span className="useful-service-card-terms-of-distribution-title">
                    {translate("termsOfDistribution")}
                </span>
                <span className="useful-service-card-terms-of-distribution-text">
                    {termsOfDisctribution}
                </span>
            </div>
        </div>
    )
}

export default UsefulServiceCard