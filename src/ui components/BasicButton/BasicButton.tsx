import "./BasicButton.css"

type ButtonProps = {
    innerText?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const BasicButton = ({innerText = "Text", onClick}: ButtonProps) => {
    return (
        <button type="button" className="basic-button" onClick={onClick}>{innerText}</button>
    )
}

export default BasicButton