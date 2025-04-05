import "./PersonalityUnit.css"

export type PersonalityUnitProps = {
    label: string,
    text: string
}

const PersonalityUnit = ({label, text}: PersonalityUnitProps) => {
    return (
        <>
            <div className="personality-unit">
                <span className="personality-unit-label">{label}</span>
                <span className="personality-unit-text">{text}</span>
            </div>
        </>
    )
}

export default PersonalityUnit