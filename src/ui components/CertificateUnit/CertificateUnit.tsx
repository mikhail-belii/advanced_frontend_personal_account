import { useEffect, useState } from "react"
import api from "../../api/api"
import { API_URL } from "../../constants"
import { useLanguage } from "../../context/LanguageContext"
import formatDateTime from "../../utils/formatDateTime"
import CertificateDownloadButton from "../CertificateDownloadButton/CertificateDownloadButton"
import CertificateStatus, { CertificateReceiveType, CertificateStatusEnum, CertificateType } from "../CertificateStatus/CertificateStatus"
import "./CertificateUnit.css"

export type CertificateUnitProps = {
    status: CertificateStatusEnum,
    receiveType: CertificateReceiveType,
    type: CertificateType,
    createDate: string,
    formDate?: string,
    certificateId?: string,
    signatureId?: string,
}

const CertificateUnit = ({status, receiveType, type, createDate, formDate, certificateId, signatureId}: CertificateUnitProps) => {
    const {translate} = useLanguage()
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 901)
    const [isLessThan600, setIsLessThan600] = useState(window.innerWidth < 601)

    const handleDownloadSignature = async () => {
        try {
            const response = await api.get(`${API_URL}/files/${signatureId}`)
            const blob = new Blob([response.data], {type: "text/plain"})
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${signatureId}.txt`
            a.click()
            window.URL.revokeObjectURL(url)
        } 
        catch (e) {
            throw e
        }

    }

    const handleDownloadCertificate = async () => {
        try {
            const response = await api.get(`${API_URL}/files/${certificateId}`)
            const blob = new Blob([response.data], {type: "text/plain"})
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${certificateId}.txt`
            a.click()
            window.URL.revokeObjectURL(url)
        } 
        catch (e) {
            throw e
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 901)
            setIsLessThan600(window.innerWidth < 601)
        }
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            <div className="certificate-unit">
                <div className="certificate-unit-content">
                    <div className="certificate-unit-content-label">
                        {`${translate("certificateUnitLabel")} ${formatDateTime(createDate)}`}
                    </div>
                    <div className="certificate-unit-content-info">
                        <div className="certificate-unit-content-info-certificate-type">
                            {`${translate("certificateType")}: ${translate(type)}`}
                        </div>
                        {(status === "Finished" && receiveType === "Electronic") && (
                            <div className="certificate-unit-content-info-date">
                                {`${translate("certificateFormingDateTime")}: ${formDate}`}
                            </div>
                        )}
                        <div className="certificate-unit-content-info-receive-type">
                            {`${translate("certificateReceiveType")}: ${translate(receiveType)}`}
                        </div>
                        {(status === "Finished" && receiveType === "Electronic"
                        && certificateId && signatureId && isSmallScreen)
                        && (
                            <div className="certificate-unit-buttons">
                                <CertificateDownloadButton type="Signature" onClick={handleDownloadSignature}/>
                                <CertificateDownloadButton type="Certificate" onClick={handleDownloadCertificate}/>
                            </div>
                    )}
                    </div>
                </div>
                <div className="certificate-unit-buttons-and-status">
                    {(status === "Finished" && receiveType === "Electronic"
                        && certificateId && signatureId && !isSmallScreen)
                    && (
                        <>
                            <CertificateDownloadButton type="Signature" onClick={handleDownloadSignature}/>
                            <CertificateDownloadButton type="Certificate" onClick={handleDownloadCertificate}/>
                        </>
                    )}
                    <CertificateStatus status={status} receiveType={receiveType}/>
                </div>
            </div>
        </>
    )
}

export default CertificateUnit