import { ChangeEvent, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import "./BasicSelect.css"

export type SelectOption = {
    value: string,
    text: string
}

export type BasicSelectProps = {
    label: string,
    options: SelectOption[],
    value?: string,
    neededEmptyValue?: boolean,
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
}

const BasicSelect = ({label, options, value, neededEmptyValue = true, onChange}: BasicSelectProps) => {
    const [inputValue, setInputValue] = useState(value || "")
    const {translate} = useLanguage()
    
    const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setInputValue(event.target.value)
        if (onChange) {
            onChange(event)
        }
    }

    return (
        <div className="basic-select-container">
            <label className="basic-select-label">{label}</label>
            <div className="basic-select-wrapper">
                <select className="basic-select" value={inputValue} onChange={handleInputChange}>
                    {neededEmptyValue && <option value="">{translate("select")}</option>}
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default BasicSelect