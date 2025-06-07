import { useEffect, useState } from "react"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import { FileDto } from "../../ui components/PersonalityCard/PersonalityCard"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import UsefulServiceCard from "../../ui components/UsefulServiceCard/UsefulServiceCard"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import { useNavigate } from "react-router-dom"
import "./UsefulServicesPage.css"
import api from "../../api/api"
import { API_URL } from "../../constants"
import { useNotification } from "../../hooks/useNotification"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"

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
    const navigate = useNavigate();
    const [usefulServices, setUsefulServices] = useState<UsefulServiceDto[]>([])
    const [userRoles, setUserRoles] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/", { replace: true });
        }
    }, [isAuthorized, navigate]);

    useEffect(() => {
        const handleResize = () => {
            setIsHamburger(window.innerWidth < 1201)
        }
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null)
                await fetchUserRoles()
                await fetchUsefulServices(currentPage, pageSize)
            }
            catch (e) {
                console.error(e)
                setError(translate("fetchProfileError"))
                setShowNotification(true)
            }
        }
        fetchData()
    }, [currentPage, pageSize])

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
        try {
            const response = await api.get(`${API_URL}/usefulservices?page=${page}&pageSize=${pageSize}`)
            if (response.status === 200) {
                setUsefulServices(response.data.results || [])
                setTotalPages(response.data.metaData?.pageCount || 1)
            }
        }
        catch (e) {}
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
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
                        {usefulServices.map((service) => (
                            <UsefulServiceCard 
                                key={service.id}
                                title={service.title}
                                description={service.description}
                                link={service.link}
                                termsOfDisctribution={service.termsOfDisctribution}
                                logo={typeof service.logo === "string" ? service.logo : service.logo?.name || ""}
                            />
                        ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                style={{
                                    margin: "0 4px",
                                    padding: "6px 12px",
                                    background: page === currentPage ? "#375fff" : "#fff",
                                    color: page === currentPage ? "#fff" : "#375fff",
                                    border: "1px solid #375fff",
                                    borderRadius: 4,
                                    cursor: "pointer"
                                }}
                                disabled={page === currentPage}
                            >
                                {page}
                            </button>
                        ))}
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