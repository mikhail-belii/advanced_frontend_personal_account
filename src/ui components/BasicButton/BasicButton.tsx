import "./BasicButton.css"

type ButtonProps = {
    innerText?: string,
    isDisabled?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isWhite?: boolean
}

const BasicButton = ({innerText = "Text", isDisabled, onClick, isWhite = false}: ButtonProps) => {
    return (
        <button 
            type="button" 
            disabled={isDisabled} 
            className={`${isWhite ? "basic-white-button" : "basic-button"}`}
            onClick={onClick}>
                {innerText}
        </button>
    )
}

export default BasicButton