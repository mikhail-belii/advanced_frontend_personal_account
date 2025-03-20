import { ChangeEvent, useState } from "react"
import ClearIcon from "../../assets/icons/Close_Circle.svg"
import "./BasicInput.css"

type InputProps = {
    label: string,
    supportingText?: string,
    placeholder?: string,
    type?: "button" | "date" | "datetime-local" | "email" | "file" | "number" | "password" | "radio" | "range" |
    "search" | "submit" | "tel" | "text" | "time" | "url",
    name?: string,
    value?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    showSearchIcon?: boolean,
    searchIcon?: React.ReactNode
}

const BasicInput = ({label, supportingText, placeholder, type = "text", name, value, onChange, showSearchIcon = false, searchIcon}: InputProps) => {
    const [inputValue, setInputValue] = useState(value || "")

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        if (onChange) {
            onChange(event)
        }
    }

    const clearInput = () => {
        setInputValue('')
        if (onChange) {
            onChange({
                target: { value: "", name: name || "" }
            } as ChangeEvent<HTMLInputElement>)
        }
    }

    return (
        <div className="basic-input-container">
            <label className="basic-input-label">{label}</label>
            <div className="basic-input-wrapper">
                {showSearchIcon && (
                    <div className="basic-input-search-icon">
                        {searchIcon}
                    </div>
                )}

                <input
                    type={type}
                    name={name}
                    value={value !== undefined? value: inputValue}
                    onChange={handleInputChange}
                    className="basic-input"
                    placeholder={placeholder}/>
                {inputValue && (
                    <button 
                        className="basic-input-clear-button" 
                        onClick={clearInput}
                        type="button">
                            <img src={ClearIcon} className="clear-button"/>
                    </button>
                )}
            </div>
            {supportingText && (
                <span className="basic-input-supporting-text">{supportingText}</span>
            )}
        </div>
    )
}

export default BasicInput