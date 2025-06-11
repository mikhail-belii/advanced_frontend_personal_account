import { EventFormat, EventStatus } from "../../pages/EventsPage/EventsPage"
import BlankImage from "../../assets/images/Image_Blank.jpg"
import { useLanguage } from "../../context/LanguageContext"
import formatDateTime from "../../utils/formatDateTime"
import "./EventShortCard.css"


export type EventShortCardProps = {
    id: string,
    title?: string,
    picture?: string,
    dateTimeFrom?: string,
    dateTimeTo?: string,
    format: EventFormat,
    status: EventStatus
}

const EventShortCard = ({id, title, picture, dateTimeFrom, dateTimeTo, format, status}: EventShortCardProps) => {
    const {translate} = useLanguage()

    const getEventDate = () => {
        if (dateTimeFrom === null && dateTimeTo === null) {
            return translate("noEventDate")
        }
        let eventDate = "";
        if (dateTimeFrom) {
            eventDate = formatDateTime(dateTimeFrom);
        }
        if (dateTimeTo) {
            if (!dateTimeFrom) {
                eventDate = `NOPE - ${formatDateTime(dateTimeTo)}`;
            }
            else {
                eventDate += ` - ${formatDateTime(dateTimeTo)}`;
            }
        }
        return eventDate;
    }

    const handleClick = () => {

    }

    return (
        <div className="event-short-card" onClick={handleClick}>
            <div className="event-short-card-picture">
                <img src={picture || BlankImage} alt="picture"/>
            </div>
            <div className="event-short-card-content">
                <div className="event-short-card-content-title">
                    {title}
                </div>

                <div className="event-short-card-content-info">
                    {status === "Finished" && 
                        <div className="event-short-card-content-info-finished">
                            {translate("eventFinished")}
                        </div>}
                    <div className="event-short-card-content-info-unit">
                        <span className="event-short-card-content-info-label">{translate("eventDate")}</span>
                        <span className="event-short-card-content-info-text">{getEventDate()}</span>
                    </div>
                    <div className="event-short-card-content-info-unit">
                        <span className="event-short-card-content-info-label">{translate("eventFormat")}</span>
                        <span className="event-short-card-content-info-text">{translate(format)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventShortCard