import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useLanguage } from "../../context/LanguageContext"
import { useEffect, useState } from "react"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import "./AdminUsersPage.css"
import AlphabetSelector from "../../ui components/AlphabetSelector/AlphabetSelector"
import BasicInput from "../../ui components/BasicInput/BasicInput"
import SearchIconBlue from "../../assets/icons/Search_Magnifying_Glass_Blue.svg"
import BasicButton from "../../ui components/BasicButton/BasicButton"
import HamburgerBlackIcon from "../../assets/icons/Hamburger_Black_Icon.svg"
import HamburgerBlueIcon from "../../assets/icons/Hamburger_Blue_Icon.svg"
import GridBlackIcon from "../../assets/icons/More_Grid_Black_Icon.svg"
import GridBlueIcon from "../../assets/icons/More_Grid_Blue_Icon.svg"
import { PagedListMetaData } from "../UsefulServicesPage/UsefulServicesPage"
import api from "../../api/api"
import { ADMIN_USERS_PAGE_PAGESIZE, API_URL } from "../../constants"
import { useNotification } from "../../hooks/useNotification"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"
import PaginationArrowLeft from "../../assets/icons/Pagination_Arrow_Left.svg"
import PaginationArrowRight from "../../assets/icons/Pagination_Arrow_Right.svg"
import UserShortCard from "../../ui components/UserShortCard/UserShortCard"

export type ProfileShortDto = {
    id: string,
    email?: string,
    lastName?: string,
    firstName?: string,
    patronymic?: string,
    birthDate: string
}

export interface ProfileShortDtoPagedListWithMetadata {
    results?: ProfileShortDto[],
    metaData: PagedListMetaData
}

const AdminUsersPage = () => {
    const {translate} = useLanguage()
    const {isAuthorized} = useAuthorization()
    const navigate = useNavigate()
    const [isHamburger, setIsHamburger] = useState(window.innerWidth < 1201)
    const [displayType, setDisplayType] = useState<"column" | "grid">("column")
    const [users, setUsers] = useState<ProfileShortDto[] | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [userName, setUserName] = useState<string>("")
    const [userFirstLetter, setUserFirstLetter] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(ADMIN_USERS_PAGE_PAGESIZE)
    const [searchName, setSearchName] = useState("")
    const [searchLetter, setSearchLetter] = useState("")
    const [totalPages, setTotalPages] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)

    useEffect(() => {
        const handleResize = () => {
            setIsHamburger(window.innerWidth < 1201)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const pageParam = Number(searchParams.get("page")) || 1
        let pageSizeParam = Number(searchParams.get("pageSize")) || ADMIN_USERS_PAGE_PAGESIZE
        if (pageSizeParam > 50) pageSizeParam = 50
        const nameParam = searchParams.get("name") || ""
        const letterParam = searchParams.get("filterLastName") || ""

        setCurrentPage(pageParam)
        setPageSize(pageSizeParam)
        setSearchName(nameParam)
        setSearchLetter(letterParam)
        setUserName(nameParam)
        setUserFirstLetter(letterParam)
    }, [])

    useEffect(() => {
        const params: {[key: string]: string} = {
            page: String(currentPage),
            pageSize: String(pageSize),
        }
        if (searchName) params.name = searchName
        if (searchLetter) params.filterLastName = searchLetter
        setSearchParams(params, { replace: true })
    }, [currentPage, pageSize, searchName, searchLetter, setSearchParams])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setError(null)
                const params = new URLSearchParams()
                params.append('page', String(currentPage))
                params.append('pageSize', String(pageSize))
                if (searchName.trim() !== "") {
                    params.append("name", searchName)
                }
                if (searchLetter.trim() !== "") {
                    params.append("filterLastName", searchLetter)
                }
                
                const response = await api.get(`${API_URL}/user/list?${params.toString()}`)
                if (response.status === 200) {
                    setUsers(response.data.results)
                    setTotalPages(response.data.metaData.pageCount || 1)
                }
                else {
                    setError(translate("fetchUsersError"))
                    setShowNotification(true)
                }
            }
            catch (e) {
                console.error(e)
                setError(translate("fetchUsersError"))
                setShowNotification(true)
            }
        }
        fetchUsers()
    }, [currentPage, pageSize, searchName, searchLetter, translate])

    const handleSearch = () => {
        setSearchName(userName)
        setSearchLetter(userFirstLetter)
        setCurrentPage(1)
    }

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value
        setUserName(newName)

        if (newName.trim() === "") {
            setSearchName("")
            setCurrentPage(1)
        }
    }

    const handleLetterSelect = (letter: string) => {
        if (userFirstLetter === letter) {
            setUserFirstLetter("")
        } else {
            setUserFirstLetter(letter)
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

    console.log(users)

    return (
        <div className="admin-users-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="admin-users-page-header">
                    {(isAuthorized && isHamburger) && <Sidebar/>}
                    {!isHamburger && <div className="admin-users-header-name">{translate("adminLandingTitle")}</div>}
                    <LanguageSwitch/>
                </div>
                {isHamburger && <div className="admin-users-header-name">{translate("adminLandingTitle")}</div>}
                <div className="admin-users-page-path">
                    <p className="admin-users-page-path-main" onClick={() => navigate("/")}>{`${translate("main")} /`}</p>
                    <p className="admin-users-page-path-admin" onClick={() => navigate("/admin")}>{`${translate("adminLandingTitle")} /`}</p>
                    <p className="admin-users-page-path-admin-users">{translate("adminUsersTitle")}</p>
                </div>

                <div className="admin-users-page-content">
                    <div className="admin-users-page-content-search">
                        <div className="admin-users-page-content-search-up">
                            <BasicInput
                            label=""
                            placeholder={translate("typeFullName")}
                            showSearchIcon={true}
                            searchIcon={SearchIconBlue}
                            value={userName}
                            onChange={handleUserNameChange}/>
                            <BasicButton
                                innerText={translate("searchButton")}
                                onClick={handleSearch}/>
                        </div>

                        <div className="admin-users-page-content-search-down">
                            <AlphabetSelector
                                selectedLetter={userFirstLetter}
                                onLetterSelect={handleLetterSelect}/>
                            
                            <div className="admin-users-page-content-search-down-display-buttons">
                                <img 
                                    src={displayType === "column" ? 
                                        HamburgerBlueIcon : HamburgerBlackIcon} alt="hamburger"
                                    onClick={() => setDisplayType("column")}/>
                                <img 
                                    src={displayType === "grid" ? 
                                        GridBlueIcon : GridBlackIcon} alt="grid"
                                    onClick={() => setDisplayType("grid")}/>
                            </div>
                        </div>
                    </div>

                    <div className={`admin-users-content ${displayType}`}>
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <div>
                                    <UserShortCard key={user.id} {...user} />
                                    <hr className="divider"/>
                                </div>
                        ))
                        ) : (
                            <p>{translate("noUsersFound")}</p>
                        )}
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

export default AdminUsersPage