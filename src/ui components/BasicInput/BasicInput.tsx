import { useState } from "react"
import ClearIcon from "../../assets/icons/Close_Circle.svg"
import "./BasicInput.css"

type InputProps = {
    label: string,
    supportingText?: string,
    placeholder?: string,
    onChange?: (value: string) => void,
    showSearchIcon?: boolean,
    searchIcon?: React.ReactNode
}

const BasicInput = ({label, supportingText, placeholder, onChange, showSearchIcon = false, searchIcon}: InputProps) => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)
        if (onChange) {
            onChange(value)
        }
    }

    const clearInput = () => {
        setInputValue('')
        if (onChange) {
            onChange('')
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
                    value={inputValue}
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