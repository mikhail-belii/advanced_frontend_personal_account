import "./ProfileActivityNavigationButton.css"

export type ProfileActivityNavigationButtonProps = {
    text: string,
    isActive: boolean | null
    onClick?: () => void
}

const ProfileActivityNavigationButton = ({text, isActive, onClick}: ProfileActivityNavigationButtonProps) => {
    return (
        <div className={`profile-activity-nagivation-button${isActive? " active": ""}`} onClick={onClick}>
            {text}
        </div>
    )
}

export default ProfileActivityNavigationButton