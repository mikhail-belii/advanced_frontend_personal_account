import { useLanguage } from "../../context/LanguageContext"
import "./CertificateStatus.css"

export type CertificateStatusEnum = "Created" | "InProcess" | "Finished"
export type CertificateReceiveType = "Electronic" | "Paper"
export type CertificateType = "ForPlaceWhereNeeded" | "PensionForKazakhstan"

export type CertificateStatusProps = {
    status: CertificateStatusEnum,
    receiveType: CertificateReceiveType
}

const CertificateStatus = ({status, receiveType}: CertificateStatusProps) => {
    const {translate} = useLanguage()
    const statusTranslations: Record<CertificateStatusEnum, string> = {
        Created: translate("certificateCreated"),
        InProcess: translate("certificateInProcess"),
        Finished: receiveType === "Electronic" ? translate("certificateFinishedElectronic") : translate("certificateFinishedPaper")
    }
    const bgColor = (() => {
        switch (status) {
            case "Created":
                return "#9c9c9c";
            case "InProcess":
                return "#f69d1e";
            case "Finished":
                return "#46b34a";
            default:
                return "#fff";
        }
    })();

    return (
        <>
            <div className="certificate-status" style={{backgroundColor: bgColor}}>
                {statusTranslations[status]}
            </div>
        </>
    )
}

export default CertificateStatus