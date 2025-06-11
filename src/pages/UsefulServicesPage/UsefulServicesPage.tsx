import { useEffect, useState } from "react"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import { FileDto } from "../../ui components/PersonalityCard/PersonalityCard"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import UsefulServiceCard from "../../ui components/UsefulServiceCard/UsefulServiceCard"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import { useSearchParams } from "react-router-dom"
import "./UsefulServicesPage.css"
import api from "../../api/api"
import { API_URL } from "../../constants"
import { useNotification } from "../../hooks/useNotification"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"
import PaginationArrowLeft from "../../assets/icons/Pagination_Arrow_Left.svg"
import PaginationArrowRight from "../../assets/icons/Pagination_Arrow_Right.svg"

export type PagedListMetaData = {
    pageCount: number,
    totalItemCount: number,
    pageNumber: number,
    pageSize: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    isFirstPage: boolean,
    isLastPage: boolean,
    firstItemOnPage: number,
    lastItemOnPage: number
}

export type UsefulServiceCategory = "ForAll" | "Students" | "Employees"

export type UsefulServiceDto = {
    id: string,
    category: UsefulServiceCategory,
    title?: string,
    description?: string,
    link?: string,
    termsOfDisctribution?: string,
    logo: FileDto
}

export interface IUsefulServiceDtoPagedListWithMetaData {
    results?: UsefulServiceDto[],
    metaData: PagedListMetaData
}

const UsefulServicesPage = () => {
    const {translate} = useLanguage()
    const {isAuthorized} = useAuthorization()
    const [isHamburger, setIsHamburger] = useState(window.innerWidth < 1201)
    const [searchParams, setSearchParams] = useSearchParams();
    let initialPageSize = Number(searchParams.get("pageSize")) || 2
    if (initialPageSize > 50) initialPageSize = 50
    const [usefulServices, setUsefulServices] = useState<UsefulServiceDto[]>([])
    const [userRoles, setUserRoles] = useState<string[] | null>(null)
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
        let safePageSize = pageSize
        if (pageSize > 50) safePageSize = 50
        if (safePageSize !== pageSize) setPageSize(50)
        setSearchParams({ page: String(currentPage), pageSize: String(safePageSize) })
    }, [currentPage, pageSize, setSearchParams])

    useEffect(() => {
        const pageParam = Number(searchParams.get("page")) || 1
        let pageSizeParam = Number(searchParams.get("pageSize")) || 2
        if (pageSizeParam > 50) pageSizeParam = 50
        setCurrentPage(pageParam)
        setPageSize(pageSizeParam)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null)
                await fetchUserRoles()
            }
            catch (e) {
                console.error(e)
                setError(translate("fetchProfileError"))
                setShowNotification(true)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (userRoles !== null) {
            const fetchServices = async () => {
                try {
                    setError(null)
                    await fetchUsefulServices(currentPage, pageSize)
                }
                catch (e) {
                    console.error(e)
                    setError(translate("fetchProfileError"))
                    setShowNotification(true)
                }
            }
            fetchServices()
        }
    }, [currentPage, pageSize, userRoles])

    useEffect(() => {
        const fetchLogos = async () => {
            const logosToFetch = usefulServices.filter(s => s.logo && s.logo.id && !logoUrls[s.logo.id])
            const newLogoUrls: {[id: string]: string} = {}
            await Promise.all(logosToFetch.map(async (service) => {
                try {
                    const response = await api.get(`${API_URL}/files/${service.logo.id}`, { 
                            responseType: 'blob' })
                    const blob = response.data
                    const url = URL.createObjectURL(blob)
                    newLogoUrls[service.logo.id] = url
                } 
                catch (e) {
                    newLogoUrls[service.logo.id] = ''
                }
            }))
            if (Object.keys(newLogoUrls).length > 0) {
                setLogoUrls(prev => ({...prev, ...newLogoUrls}))
            }
        }
        if (usefulServices.length > 0) {
            fetchLogos()
        }
    }, [usefulServices])

    const fetchUserRoles = async() => {
        try {
            const response = await api.get(`${API_URL}/profile`)
            if (response.status === 200) {
                const userRoles = response.data.userTypes
                setUserRoles(userRoles)
            }
        }
        catch (e) {
            console.error(e)
            throw e
        }
    }

    const fetchUsefulServices = async(page: number, pageSize: number) => {
        if (userRoles != null) {
            try {
                let categories: string[] = []
                if (userRoles.length === 0 ||
                    (userRoles.includes('Student') && userRoles.includes('Employee'))) {
                    categories = ['ForAll', 'Students', 'Employees']
                } 
                else if (userRoles.includes('Student')) {
                    categories = ['ForAll', 'Students']
                } 
                else if (userRoles.includes('Employee')) {
                    categories = ['ForAll', 'Employees']
                }
                const params = new URLSearchParams()
                params.append('page', String(page))
                params.append('pageSize', String(pageSize))
                categories.forEach(cat => params.append('categories', cat))
                const response = await api.get(`${API_URL}/usefulservices?${params.toString()}`)
                if (response.status === 200) {
                    setUsefulServices(response.data.results || [])
                    setTotalPages(response.data.metaData?.pageCount || 1)
                }
            }
            catch (e) {
                console.error(e)
                throw e
            }
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

    return (
        <div className="useful-services-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="useful-services-page-header">
                        {(isAuthorized && isHamburger) && <Sidebar/>}
                        {!isHamburger && <div className="useful-services-header-name">{translate("usefulServicesTitle")}</div>}
                        <LanguageSwitch/>
                </div>
                {isHamburger && <div className="useful-services-header-name">{translate("usefulServicesTitle")}</div>}
                <div className="useful-services-page-path">
                    <p className="useful-services-page-path-main">{`${translate("main")} /`}</p>
                    <p className="useful-services-page-path-useful-services">{translate("usefulServicesTitle")}</p>
                </div>

                <div className="useful-services-page-content">
                    <div className="useful-services-content">
                        {usefulServices.map((service) => {
                            let logoUrl = ''
                            if (service.logo && service.logo.id && logoUrls[service.logo.id]) {
                                logoUrl = logoUrls[service.logo.id]
                            }
                            return (
                                <UsefulServiceCard 
                                    key={service.id}
                                    title={service.title}
                                    description={service.description}
                                    link={service.link}
                                    termsOfDisctribution={service.termsOfDisctribution}
                                    logo={logoUrl}
                                />
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
                                        className={`pagination-btn${page === currentPage ? ' active' : ''}`}
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

export default UsefulServicesPage