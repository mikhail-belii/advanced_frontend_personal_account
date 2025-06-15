import { useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import BasicButton from "../BasicButton/BasicButton"
import "./RegistrationModal.css"
import Modal from "react-modal"
import { PatternFormat } from "react-number-format"
import BasicInput from "../BasicInput/BasicInput"

type RegistrationModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: RegistrationData) => void
}

export type RegistrationData = {
    name: string
    phone: string
    email: string
    additionalInfo: string
}

const RegistrationModal = ({ isOpen, onClose, onSubmit }: RegistrationModalProps) => {
    const { translate } = useLanguage()
    const [formData, setFormData] = useState<RegistrationData>({
        name: "",
        phone: "",
        email: "",
        additionalInfo: ""
    })

    const handleSubmit = () => {
        onSubmit(formData)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}>
            <span className="modal-title">{translate("eventRegistration")}</span>
            <form>
                <div className="form-group">
                    <BasicInput
                        label={translate("fullName")}
                        type="text"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div className="form-group phone-input">
                    <label htmlFor="phone">{translate("phoneNumber")}</label>
                    <PatternFormat
                        format="+7 (###) ###-##-##"
                        mask="_"
                        value={formData.phone}
                        onValueChange={(values) => {
                            setFormData({...formData, phone: values.value})
                        }}
                        placeholder="+7 (___) ___-__-__"/>
                </div>
                <div className="form-group">
                    <BasicInput
                        label={translate("email")}
                        type="text"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                <div className="form-group">
                    <BasicInput
                        label={translate("additionalInfo")}
                        type="text"
                        onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}/>
                </div>
                <div className="modal-buttons">
                    <BasicButton
                        innerText={translate("saveModal")}
                        onClick={handleSubmit}
                    />
                    <BasicButton
                        innerText={translate("cancelModal")}
                        onClick={onClose}
                        isWhite={true}
                        color="grey"
                    />
                </div>
            </form>
        </Modal>
    )
}

export default RegistrationModal 