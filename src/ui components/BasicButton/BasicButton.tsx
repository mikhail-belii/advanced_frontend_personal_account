import "./BasicButton.css"

type ButtonProps = {
    innerText?: string,
    isDisabled?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const BasicButton = ({innerText = "Text", isDisabled, onClick}: ButtonProps) => {
    return (
        <button type="button" disabled={isDisabled} className="basic-button" onClick={onClick}>{innerText}</button>
    )
}

export default BasicButton