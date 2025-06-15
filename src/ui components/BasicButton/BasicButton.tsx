import "./BasicButton.css"

export type ButtonColor = "grey" | "blue"

type ButtonProps = {
    innerText?: string,
    isDisabled?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isWhite?: boolean,
    color?: ButtonColor
}

const BasicButton = ({innerText = "Text", isDisabled, onClick, isWhite = false, color}: ButtonProps) => {
    return (
        <button 
            type="button" 
            disabled={isDisabled} 
            className={`${isWhite ? `basic-white-button ${color}` : "basic-button"}`}
            onClick={onClick}>
                {innerText}
        </button>
    )
}

export default BasicButton