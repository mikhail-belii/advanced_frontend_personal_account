import "./AdminLandingCard.css"

export type AdminLandingCardProps = {
    icon: string,
    title: string,
    description: string,
    onClick?: () => void
}

const AdminLandingCard = ({icon, title, description, onClick}: AdminLandingCardProps) => {
    

    return (
        <div className="admin-landing-card" onClick={onClick}>
            <div className="admin-landing-card-header">
                <img src={icon}/>
                <span>{title}</span>
            </div>
            <div className="admin-landing-card-body">
                {description}
            </div>
        </div>
    )
}

export default AdminLandingCard