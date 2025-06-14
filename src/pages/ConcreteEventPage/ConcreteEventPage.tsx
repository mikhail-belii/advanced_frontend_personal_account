import { useEffect, useState } from "react"
import { FileDto } from "../../ui components/PersonalityCard/PersonalityCard"
import { EventAuditory, EventFormat, EventStatus, EventType } from "../EventsPage/EventsPage"
import { useNotification } from "../../hooks/useNotification"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/api"
import { API_URL } from "../../constants"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import "./ConcreteEventPage.css"
import BasicButton from "../../ui components/BasicButton/BasicButton"
import ArrowDown from "../../assets/icons/Arrow-down.svg"
import ArrowUp from "../../assets/icons/Arrow-up.svg"
import PersonalityUnit from "../../ui components/PersonalityCard/PersonalityUnit/PersonalityUnit"
import formatDateTime from "../../utils/formatDateTime"
import Map from "../../ui components/Map/Map"

export type EventDto = {
    id: string,
    title?: string,
    description?: string,
    picture: FileDto,
    isTimeFromNeeded: boolean,
    dateTimeFrom?: string,
    isTimeToNeeded: boolean,
    dateTimeTo?: string,
    type: EventType,
    format: EventFormat,
    auditory: EventAuditory,
    status: EventStatus,
    link?: string,
    addressName?: string,
    latitude?: number,
    longitude?: number,
    isRegistrationRequired: boolean,
    registrationLastDate?: string
}

const ConcreteEventPage = () => {
    const {id} = useParams()
    const {translate} = useLanguage()
    const {isAuthorized} = useAuthorization()
    const navigate = useNavigate()
    const [isHamburger, setIsHamburger] = useState(window.innerWidth < 1201)
    const [error, setError] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)
    const [event, setEvent] = useState<EventDto | null>(null)
    const [eventImage, setEventImage] = useState<string | null>(null)
    const [isParticipant, setIsParticipant] = useState<boolean | null>(null)
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            setIsHamburger(window.innerWidth < 1201)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        fetchEvent()
    }, [])

    useEffect(() => {
        fetchEventImage()
    }, [event])

    const fetchEvent = async () => {
        try {
            setError(null)
            const response = await api.get(`${API_URL}/events/public/${id}`)

            if (response.status === 200) {
                setEvent(response.data)
                if (isAuthorized) {
                    await fetchParticipating()
                }
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchEventError"))
            setShowNotification(true)
        }
    }

    const fetchParticipating = async () => {
        try {
            setError(null)
            const response = await api.get(`${API_URL}/events/is_participant/${id}`)

            if (response.status === 200) {
                setIsParticipant(response.data.isParticipating)
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchEventError"))
            setShowNotification(true)
        }
    }

    const fetchEventImage = async () => {
        if (event) {
            try {
                const response = await api.get(`${API_URL}/files/${event.picture.id}`, { 
                    responseType: 'blob' })
                if (response.status === 200) {
                    const blob = response.data
                    const url = URL.createObjectURL(blob)
                    setEventImage(url)
                }
            }
            catch (e) {
                console.error(e)
                setError(translate("fetchEventError"))
                setShowNotification(true)
            }
        }
    }

    const handleParticipateInner = async () => {
        try {

        }
        catch (e) {
            console.error(e)
            setError(translate("participateEventError"))
            setShowNotification(true)
        }
    }

    const handleParticipateExternal = async () => {
        try {

        }
        catch (e) {
            console.error(e)
            setError(translate("participateEventError"))
            setShowNotification(true)
        }
    }

    const getEventDate = () => {
        if (event?.dateTimeFrom === null && event?.dateTimeTo === null) {
            return translate("noEventDate")
        }
        let eventDate = "";
        if (event?.dateTimeFrom) {
            eventDate = formatDateTime(event?.dateTimeFrom);
        }
        if (event?.dateTimeTo) {
            if (!event?.dateTimeFrom) {
                eventDate = `NOPE - ${formatDateTime(event?.dateTimeTo)}`;
            }
            else {
                eventDate += ` - ${formatDateTime(event?.dateTimeTo)}`;
            }
        }
        return eventDate;
    }

    return (
        <div className="event-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="event-page-header">
                    {(isAuthorized && isHamburger) && <Sidebar/>}
                    {!isHamburger && <div className="events-header-name">{translate("eventsTitle")}</div>}
                    <div className="header-right-section">
                        {!isAuthorized && <BasicButton innerText={translate("login")} onClick={() => navigate("/login")}/>}
                        <LanguageSwitch/>
                    </div>
                </div>
                {isHamburger && <div className="useful-services-header-name">{translate("eventsTitle")}</div>}
                <div className="event-page-path">
                    <p className="event-page-path-main">{`${translate("main")} /`}</p>
                    <p className="event-page-path-event-title">{event?.title}</p>
                </div>

                <div className="event-page-content">
                    {event && 
                        (
                            <div className="event-content">
                                <div className="event-content-header">
                                    <span className="event-content-header-title">
                                        {event?.title}
                                    </span>
                                    {(isAuthorized && !isParticipant && event.isRegistrationRequired) && 
                                        <BasicButton
                                            innerText={translate("willParticipate")}
                                            onClick={handleParticipateInner}/>}
                                    {(!isAuthorized && event.isRegistrationRequired) && 
                                        <BasicButton
                                            innerText={translate("willParticipate")}
                                            onClick={handleParticipateExternal}/>}
                                    {(isAuthorized && isParticipant && event.isRegistrationRequired) && 
                                        <BasicButton
                                            innerText={translate("alreadyParticipate")}
                                            isDisabled={true}
                                            isWhite={true}/>}
                                </div>

                                <div className="event-content-body">
                                    <div className="event-content-body-up">
                                        <div className="event-content-body-up-title" 
                                            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                                            <div className="event-content-body-up-title-t">
                                                {translate("description")}
                                            </div>
                                            <div className="event-content-body-up-title-a">
                                                <img src={isDescriptionOpen ? ArrowUp : ArrowDown} alt="Arrow"/>
                                            </div>
                                        </div>
                                        <div className={`event-content-body-up-desc ${isDescriptionOpen ? "opened" : "closed"}`}>
                                            {event.description}
                                        </div>
                                        {eventImage && <img src={eventImage} className="event-content-body-up-image" alt="image"/>}
                                    </div>
                                    <div className="event-content-body-down">

                                        {event.registrationLastDate && (
                                            <>
                                                <div className="event-content-body-down-row">
                                                    <PersonalityUnit
                                                        label={translate("eventRegistrationLastDate")}
                                                        text={formatDateTime(event.registrationLastDate)}/>
                                                </div>
                                                <hr className="divider"/>
                                            </>
                                        )}
                                        {event.format === "Offline" ? (
                                            <>
                                                <div className="event-content-body-down-row">
                                                    <PersonalityUnit
                                                        label={translate("eventDate")}
                                                        text={getEventDate()}/>
                                                    <PersonalityUnit
                                                        label={translate("eventFormat")}
                                                        text={translate(event.format)}/>
                                                </div>
                                                <hr className="divider"/>
                                                <div className="event-content-body-down-row">
                                                    <PersonalityUnit
                                                        label={translate("address")}
                                                        text={event.addressName ?? "—"}/>
                                                    <div className="event-content-body-down-img">
                                                        {event.latitude && event.longitude && (
                                                            <Map 
                                                                latitude={event.latitude}
                                                                longitude={event.longitude}
                                                                addressName={event.addressName}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : <>
                                                <div className="event-content-body-down-row">
                                                    <PersonalityUnit
                                                        label={translate("eventDate")}
                                                        text={getEventDate()}/>
                                                </div>
                                                <hr className="divider"/>
                                                <div className="event-content-body-down-row">
                                                    <PersonalityUnit
                                                        label={translate("eventFormat")}
                                                        text={translate(event.format)}/>
                                                    <PersonalityUnit
                                                        label={translate("eventLink")}
                                                        text={event.link ?? "—"}/>
                                                </div>
                                        </>}
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ConcreteEventPage
