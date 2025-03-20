import { ChangeEvent, useState } from "react"
import "./ToggleSwitch.css"

type ToggleSwitchProps = {
    name?: string,
    onChange?: (checked: boolean) => void
}

const ToggleSwitch = ({name, onChange}: ToggleSwitchProps) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        const state = event.target.checked
        setIsChecked(state)
        if (onChange) {
            onChange(state)
        }
    }

    return (
        <>
            <input name={name} type="checkbox" className="toggle-button" checked={isChecked} onChange={handleToggle}/>
        </>
    )
}

export default ToggleSwitch