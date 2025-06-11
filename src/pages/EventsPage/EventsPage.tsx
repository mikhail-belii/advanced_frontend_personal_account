import { useEffect, useState } from "react"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import "./EventsPage.css"
import BasicButton from "../../ui components/BasicButton/BasicButton"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FileDto } from "../../ui components/PersonalityCard/PersonalityCard"
import { PagedListMetaData } from "../UsefulServicesPage/UsefulServicesPage"
import { useNotification } from "../../hooks/useNotification"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"
import api from "../../api/api"
import { API_URL } from "../../constants"
import formatDateTime from "../../utils/formatDateTime"
import EventShortCard from "../../ui components/EventShortCard/EventShortCard"

export type EventType = "Open" | "Close"

export type EventFormat = "Online" | "Offline"

export type EventAuditory = "All" | "Students" | "Employees"

export type EventStatus = "Draft" | "Actual" | "Finished" | "Archive"

export type EventShortDto = {
    id: string,
    title?: string,
    description?: string,
    picture?: FileDto,
    isTimeFromNeeded?: boolean,
    dateTimeFrom?: string,
    isTimeToNeeded?: boolean,
    dateTimeTo?: string,
    type: EventType,
    format: EventFormat,
    auditory: EventAuditory,
    status: EventStatus
}

export interface IEventShortDtoPagedListWithMetadata {
    results?: EventShortDto[],
    metaData: PagedListMetaData
}

const EventsPage = () => {
    const {translate} = useLanguage()
    const {isAuthorized} = useAuthorization()
    const navigate = useNavigate()
    const [isHamburger, setIsHamburger] = useState(window.innerWidth < 1201)
    const [eventName, setEventName] = useState("")
    const [eventDate, seteventDate] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    let initialPageSize = Number(searchParams.get("pageSize")) || 2
    if (initialPageSize > 50) initialPageSize = 50
    const [events, setEvents] = useState<EventShortDto[]>([])
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
    const [pageSize, setPageSize] = useState(initialPageSize)
    const [totalPages, setTotalPages] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)
    const [logoUrls, setLogoUrls] = useState<{[id: string]: string}>({})

    useEffect(() => {
        const handleResize = () => {
            setIsHamburger(window.innerWidth < 1201)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const pageParam = Number(searchParams.get("page")) || 1
        let pageSizeParam = Number(searchParams.get("pageSize")) || 2
        if (pageSizeParam > 50) pageSizeParam = 50
        setCurrentPage(pageParam)
        setPageSize(pageSizeParam)
        setEventName(searchParams.get("name") || "")
        seteventDate(searchParams.get("eventDate") || "")
    }, [])

    useEffect(() => {
        let safePageSize = pageSize
        if (pageSize > 50) safePageSize = 50
        if (safePageSize !== pageSize) setPageSize(50)
        
        const params: {[key: string]: string} = {
            page: String(currentPage),
            pageSize: String(safePageSize)
        }
        
        if (eventName) params.name = eventName
        if (eventDate) params.eventDate = eventDate
        
        setSearchParams(params)
    }, [currentPage, pageSize, eventName, eventDate, setSearchParams])

    useEffect(() => {
        fetchEvents()
    }, [currentPage, pageSize, eventName, eventDate, isAuthorized])

    const fetchEvents = async () => {
        try {
            setError(null)
            const params = new URLSearchParams()
            params.append('page', String(currentPage))
            params.append('pageSize', String(pageSize))
            if (eventName) params.append('name', eventName)
            if (eventDate) params.append('eventDate', eventDate)

            const endpoint = isAuthorized ? '/events/public/auth' : '/events/public'
            const response = await api.get(`${API_URL}${endpoint}?${params.toString()}`)
            
            if (response.status === 200) {
                setEvents(response.data.results || [])
                setTotalPages(response.data.metaData?.pageCount || 1)
            }
        } 
        catch (e) {
            console.error(e)
            setError(translate("fetchEventsError"))
            setShowNotification(true)
        }
    }

    return (
        <div className="events-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="events-page-header">
                    {(isAuthorized && isHamburger) && <Sidebar/>}
                    {!isHamburger && <div className="events-header-name">{translate("eventsTitle")}</div>}
                    <div className="header-right-section">
                        {!isAuthorized && <BasicButton innerText={translate("login")} onClick={() => navigate("/login")}/>}
                        <LanguageSwitch/>
                    </div>
                </div>
                {isHamburger && <div className="events-header-name">{translate("eventsTitle")}</div>}
                <div className="events-page-path">
                    <p className="events-page-path-main">{`${translate("main")}`}</p>
                </div>

                <div className="events-page-content">
                    <div className="events-content">
                        <EventShortCard
                            id="123"
                            title="Заголовок"
                            dateTimeFrom="2025-01-01T15:00:00Z"
                            dateTimeTo="2025-01-05T15:00:00Z"
                            format="Online"
                            status="Actual"/>
                        <EventShortCard
                            id="12345"
                            title="Заголовок 2"
                            dateTimeFrom="2025-01-01T15:00:00Z"
                            format="Offline"
                            status="Actual"/>
                        <EventShortCard
                            id="12345"
                            title="Заголовок 3"
                            dateTimeTo="2025-01-05T15:00:00Z"
                            format="Offline"
                            status="Finished"/>
                    </div>
                </div>
            </div>
            {showNotification && error && (
                <NotificationPopup type="error" innerText={error} onClose={handleClose}/>
            )}
        </div>
    )
}

export default EventsPage