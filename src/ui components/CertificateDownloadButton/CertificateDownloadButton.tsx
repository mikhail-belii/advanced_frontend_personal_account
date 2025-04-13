import Download_Package_Blue from "../../assets/icons/Download-Package-Blue.svg"
import Download_Package_White from "../../assets/icons/Download-Package-White.svg"
import { useLanguage } from "../../context/LanguageContext"
import "./CertificateDownloadButton.css"

export type CertificateDownloadType = "Certificate" | "Signature"

export type CertificateDownloadButtonProps = {
    type: CertificateDownloadType,
    onClick?: () => void
}

const CertificateDownloadButton = ({type, onClick}: CertificateDownloadButtonProps) => {
    const {translate} = useLanguage()

    return (
        <div className={`certificate-download-button ${type === "Certificate" ? "certificate" : "signature"}`} onClick={onClick}>
            <img src={type === "Certificate" ? Download_Package_White : Download_Package_Blue} alt="Download" draggable="false"/>
            <span>{translate(type)}</span>
        </div>
    )
}

export default CertificateDownloadButton