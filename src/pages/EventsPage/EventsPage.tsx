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
import { API_URL, EVENTS_PAGE_PAGESIZE } from "../../constants"
import EventShortCard from "../../ui components/EventShortCard/EventShortCard"
import PaginationArrowLeft from "../../assets/icons/Pagination_Arrow_Left.svg"
import PaginationArrowRight from "../../assets/icons/Pagination_Arrow_Right.svg"
import BasicInput from "../../ui components/BasicInput/BasicInput"

export type EventType = "Open" | "Close"

export type EventFormat = "Online" | "Offline"

export type EventAuditory = "All" | "Students" | "Employees"

export type EventStatus = "Draft" | "Actual" | "Finished" | "Archive"

export type EventShortDto = {
    id: string,
    title?: string,
    description?: string,
    picture: FileDto,
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
    const [eventDate, setEventDate] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    let initialPageSize = Number(searchParams.get("pageSize")) || EVENTS_PAGE_PAGESIZE
    if (initialPageSize > 50) initialPageSize = 50
    const [events, setEvents] = useState<EventShortDto[]>([])
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
    const [pageSize, setPageSize] = useState(initialPageSize)
    const [totalPages, setTotalPages] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)
    const [logoUrls, setLogoUrls] = useState<{[id: string]: string}>({})
    const [localEventName, setLocalEventName] = useState("")
    const [localEventDate, setLocalEventDate] = useState("")

    useEffect(() => {
        const handleResize = () => {
            setIsHamburger(window.innerWidth < 1201)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (!localEventName && !localEventDate && (eventName || eventDate)) {
            setEventName("")
            setEventDate("")
            setCurrentPage(1)
        }
    }, [localEventName, localEventDate])

    useEffect(() => {
        const pageParam = Number(searchParams.get("page")) || 1
        let pageSizeParam = Number(searchParams.get("pageSize")) || EVENTS_PAGE_PAGESIZE
        if (pageSizeParam > 50) pageSizeParam = 50
        setCurrentPage(pageParam)
        setPageSize(pageSizeParam)
        setEventName(searchParams.get("name") || "")
        setEventDate(searchParams.get("eventDate") || "")
        setLocalEventName(searchParams.get("name") || "")
        setLocalEventDate(searchParams.get("eventDate") || "")
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

    useEffect(() => {
        const fetchLogos = async () => {
            const logosToFetch = events.filter(e => e.picture && e.picture.id && !logoUrls[e.picture.id])
            const newLogoUrls: {[id: string]: string} = {}
            await Promise.all(logosToFetch.map(async (event) => {
                try {
                    const response = await api.get(`${API_URL}/files/${event.picture.id}`, { 
                            responseType: 'blob' })
                    const blob = response.data
                    const url = URL.createObjectURL(blob)
                    newLogoUrls[event.picture.id] = url
                } 
                catch (e) {
                    newLogoUrls[event.picture.id] = ''
                }
            }))
            if (Object.keys(newLogoUrls).length > 0) {
                setLogoUrls(prev => ({...prev, ...newLogoUrls}))
            }
        }
        if (events.length > 0) {
            fetchLogos()
        }
    }, [events])

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

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const getPagination = () => {
        const pages = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } 
        else {
            if (currentPage <= 3) {
                pages.push(1,2,3,4,5)
                pages.push('dots')
                pages.push(totalPages)
            } 
            else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('dots')
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
            } 
            else {
                pages.push(1)
                pages.push('dots')
                pages.push(currentPage-1, currentPage, currentPage+1)
                pages.push('dots')
                pages.push(totalPages)
            }
        }
        return pages
    }

    const handleSearch = () => {
        setEventName(localEventName)
        setEventDate(localEventDate)
        setCurrentPage(1)
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
                    <div className="events-page-search-container">
                        <span className="events-page-search-container-label">
                            {translate("searchLabel")}
                        </span>
                        <div className="events-page-search-container-name">
                            <BasicInput
                                label={translate("eventNameInputLabel")}
                                type="text"
                                value={localEventName}
                                onChange={(e) => setLocalEventName(e.target.value)}/>
                            <BasicButton
                                innerText={translate("searchButton")}
                                onClick={handleSearch}/>
                        </div>
                        <div className="events-page-search-container-date">
                            <BasicInput
                                label={translate("eventDateInputLabel")}
                                type="date"
                                value={localEventDate}
                                onChange={(e) => setLocalEventDate(e.target.value)}/>
                        </div>
                    </div>

                    <div className="events-content">
                        {events.map(event => {
                            let logoUrl = ''
                            if (event.picture && event.picture.id && logoUrls[event.picture.id]) {
                                logoUrl = logoUrls[event.picture.id]
                            }
                            return (
                                <EventShortCard
                                    key={event.id}
                                    id={event.id}
                                    title={event.title}
                                    picture={logoUrl}
                                    dateTimeFrom={event.dateTimeFrom}
                                    dateTimeTo={event.dateTimeTo}
                                    format={event.format}
                                    status={event.status}/>
                            )
                        })}
                    </div>

                    <div className="pagination-container">
                        <div className="pagination-arrow-left">
                            <button
                                className="pagination-arrow"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <img src={PaginationArrowLeft} alt="left" />
                            </button>
                        </div>
                        <div className="pagination-pages">
                            {getPagination().map((page, idx) =>
                                page === 'dots' ? (
                                    <span key={"dots"+idx} className="pagination-dots">...</span>
                                ) : (
                                    <button
                                        key={page}
                                        className={`pagination-btn${page === currentPage ? ' active-blue' : ''}`}
                                        onClick={() => handlePageChange(Number(page))}
                                        disabled={page === currentPage}
                                    >
                                        {page}
                                    </button>
                                )
                            )}
                        </div>
                        <div className="pagination-arrow-right">
                            <button
                                className="pagination-arrow"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <img src={PaginationArrowRight} alt="right" />
                            </button>
                        </div>
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