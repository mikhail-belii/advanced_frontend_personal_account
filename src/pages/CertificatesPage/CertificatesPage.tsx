import { useEffect, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { useAuthorization } from "../../context/AuthorizationContext"
import { useNotification } from "../../hooks/useNotification"
import Sidebar from "../../ui components/Sidebar/Sidebar"
import LanguageSwitch from "../../ui components/LanguageSwitch/LanguageSwitch"
import { API_URL } from "../../constants"
import api from "../../api/api"
import "./CertificatesPage.css"
import { CertificateReceiveType, CertificateStatusEnum, CertificateType } from "../../ui components/CertificateStatus/CertificateStatus"
import { FileDto, UserType } from "../../ui components/PersonalityCard/PersonalityCard"
import PersonalityUnit from "../../ui components/PersonalityCard/PersonalityUnit/PersonalityUnit"
import BasicSelect from "../../ui components/BasicSelect/BasicSelect"
import BasicButton from "../../ui components/BasicButton/BasicButton"
import CertificateUnit from "../../ui components/CertificateUnit/CertificateUnit"
import { IEducationEntry } from "../../ui components/EducationCard/EducationCard"
import { NotificationPopup } from "../../ui components/NotificationPopup/NotificationPopup"
import { AxiosError } from "axios"
import { IEmployeePost } from "../../ui components/EmployeeCard/EmployeeCard"
import { useNavigate } from "react-router-dom"

export type DepartmentDto = {
    id: string,
    name?: string,
    parentId?: string,
    email?: string
}

export type BaseDictionaryDto = {
    id: string,
    name?: string
}

export type EmploymentTypesEnum = "MainPlace" | "PartTime" | "InnerPartTime" | "Freelance"

export type UserRoleEnum = "Student" | "Employee"

export type EnumDto = {
    value: number,
    name?: string,
    displayName?: string
}

export type CertificateStaffTypeEnum = "ForPlaceOfWork" | "ForExperience" | "ForVisa" | "ForWorkBookCopy"

export type CertificateCreateDto = {
    type?: CertificateType,
    staffType?: CertificateStaffTypeEnum,
    usertype?: UserRoleEnum,
    educationEntryId?: string,
    employeePostId?: string,
    receiveType?: CertificateReceiveType,
}

export interface ICertificate {
    id: string,
    status: CertificateStatusEnum
    statusEnumDto: EnumDto,
    type?: CertificateType,
    staffType?: CertificateStaffTypeEnum,
    typeEnumDto: EnumDto,
    staffTypeEnumDto?: EnumDto,
    userType: UserRoleEnum,
    userTypeEnumDto: EnumDto,
    certificateFile?: FileDto,
    signatureFile?: FileDto,
    dateOfForming?: string,
    receiveType: CertificateReceiveType,
    receiveTypeEnumDto: EnumDto,
}

const CertificatesPage = () => {
    const {translate} = useLanguage()
    const {isAuthorized} = useAuthorization()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState<UserRoleEnum | null>(null)
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 901)
    const [isHamburger, setIsHamburger] = useState(window.innerWidth < 1201)
    const [isLessThan600, setIsLessThan600] = useState(window.innerWidth < 601)
    const [userTypes, setUserTypes] = useState<UserRoleEnum[] | null>(null)
    const [educationEntries, setEducationEntries] = useState<IEducationEntry[] | null>(null)
    const [activeEducationEntry, setActiveEducationEntry] = useState<IEducationEntry | null>(null)
    const [employeePosts, setEmployeePosts] = useState<IEmployeePost[] | null>(null)
    const [activeEmployeePost, setActiveEmployeePost] = useState<IEmployeePost | null>(null)
    const [certificates, setCertificates] = useState<ICertificate[] | null>(null)
    const [certificateCreateProps, setCertificateCreateProps] = useState<CertificateCreateDto>({
        usertype: undefined,
        receiveType: undefined
    })

    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [warning, setWarning] = useState<string | null>(null)
    const {showNotification, setShowNotification, handleClose} = useNotification(false)

    const fetchUserRoles = async () => {
        try {
            const response = await api.get(`${API_URL}/profile`)
            if (response.status === 200) {
                setUserTypes(response.data.userTypes)
                setActiveSection(response.data.userTypes.includes("Student") ? "Student" : "Employee")
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchProfileError"))
            setShowNotification(true)
        }
    }

    const fetchEducationEntries = async () => {
        try {
            setError(null)
            setCertificates(null)

            const response = await api.get(`${API_URL}/profile/student`)
            if (response.status === 200) {
                let entries: IEducationEntry[] = []
                response.data.educationEntries.forEach((entry: any) => {
                    entries.push({
                        id: entry.id,
                        faculty: entry.faculty.name,
                        group: entry.group.name,
                        educationStatus: entry.educationStatus.name,
                        educationBase: entry.educationBase.name,
                        educationDirection: entry.educationDirection.name,
                        educationProfile: entry.educationProfile.name,
                        educationQualification: entry.educationQualification.name,
                        educationLevel: entry.educationLevel.name,
                        educationForm: entry.educationForm.name,
                        educationYears: entry.educationYears.name,
                        creditBookNumber: entry.creditBooknumber,
                        course: entry.course
                    })
                })
                setEducationEntries(entries)
                setActiveEducationEntry(entries[0] || null)
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchProfileError"))
            setShowNotification(true)
        }
    }

    const fetchEmployeePosts = async () => {
        try {
            setError(null)
            setCertificates(null)

            const response = await api.get(`${API_URL}/profile/employee`)
            if (response.status === 200) {
                setEmployeePosts(response.data.posts)
                setActiveEmployeePost(response.data.posts[0] || null)
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchProfileError"))
            setShowNotification(true)
        }
    }

    const fetchCertificates = async (userType: UserType, ownerId: string) => {
        try {
            const response = await api.get(`${API_URL}/certificates/userType/${userType}/entity/${ownerId}`)
            if (response.status === 200) {
                setCertificates(response.data)
            }
        }
        catch (e) {
            console.error(e)
            setError(translate("fetchCertificatesError"))
            setShowNotification(true)
        }
    }

    const createCertificate = async () => {
        setError(null)
        setSuccess(null)
        setWarning(null)

        const payload = {
            userType: activeSection,
            receiveType: certificateCreateProps.receiveType,
            ...(activeSection === "Student" && {
                type: certificateCreateProps.type,
                educationEntryId: activeEducationEntry?.id
            }),
            ...(activeSection === "Employee" && {
                staffType: certificateCreateProps.staffType,
                employeePostId: activeEmployeePost?.id
            })
        }
        
        if (
            (activeSection === "Student" && (!payload.type || !payload.receiveType || !payload.educationEntryId)) ||
            (activeSection === "Employee" && (!payload.staffType || !payload.receiveType || !payload.employeePostId))
          ) {
            setWarning(translate("fillAllFields"))
            setShowNotification(true)
            return
        }

        try {
            const response = await api.post(`${API_URL}/certificates`, payload)
            if (response.status === 200) {
                setSuccess(translate("certificateRequestCreated"))
                setShowNotification(true)

                if (activeSection === "Student" && activeEducationEntry) {
                    fetchCertificates("Student", activeEducationEntry.id)
                } 
                else if (activeSection === "Employee" && activeEmployeePost) {
                    fetchCertificates("Employee", activeEmployeePost.id)
                }
            }
        }
        catch (e) {
            console.error(e)
            if (e instanceof AxiosError) {
                if (e.response?.status === 400) {
                    setWarning(translate("certificateAlreadyInWork"))
                }
                else {
                    setError(translate("createCertificateError"))
                }
            }
            setShowNotification(true)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 901)
            setIsHamburger(window.innerWidth < 1201)
            setIsLessThan600(window.innerWidth < 601)
        }
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        fetchUserRoles()
    }, [])

    useEffect(() => {
        if (activeSection === "Student") {
            fetchEducationEntries()
        } 
        else if (activeSection === "Employee") {
            fetchEmployeePosts()
        }
    }, [activeSection])

    useEffect(() => {
        if (activeSection === "Student" && activeEducationEntry) {
            fetchCertificates("Student", activeEducationEntry.id)
        }
        else if (activeSection === "Employee" && activeEmployeePost) {
            fetchCertificates("Employee", activeEmployeePost.id)
        }
    }, [activeSection, activeEducationEntry, activeEmployeePost])

    return (
        <div className="certificates-page">
            {(isAuthorized && !isHamburger) && <Sidebar/>}
            <div className="app-content">
                <div className="certificates-page-header">
                    {(isAuthorized && isHamburger) && <Sidebar/>}
                    {!isHamburger && <div className="certificates-header-name">{translate("certificatesTitle")}</div>}
                    <LanguageSwitch/>
                </div>
                {isHamburger && <div className="certificates-header-name">{translate("certificatesTitle")}</div>}
                <div className="certificates-page-path">
                    <p className="certificates-page-path-main" onClick={() => navigate("/")}>{`${translate("main")} /`}</p>
                    <p className="certificates-page-path-certificate-order">{translate("certificateOrder")}</p>
                </div>
                <div className="certificates-subheader-name">{translate("certificateOrder")}</div>
                <div className="certificates-page-content">
                    {(userTypes && userTypes.length > 1 && !isLessThan600) && (
                        <div className="certificates-user-role-navigation">
                            <div className={`certificates-user-role-navigation-item${activeSection === "Student" ? " active" : ""}`} 
                                onClick={() => {
                                    setActiveSection("Student")
                                    setActiveEmployeePost(null)
                                    setCertificateCreateProps({ 
                                        usertype: "Student", 
                                        receiveType: undefined, 
                                        staffType: undefined, 
                                        type: undefined 
                                    })
                                }}>{translate("student")}</div>
                            <div className={`certificates-user-role-navigation-item${activeSection === "Employee" ? " active" : ""}`} 
                                onClick={() => {
                                    setActiveSection("Employee")
                                    setActiveEducationEntry(null)
                                    setCertificateCreateProps({ 
                                        usertype: "Employee", 
                                        receiveType: undefined, 
                                        staffType: undefined, 
                                        type: undefined 
                                    })
                                }}>{translate("employee")}</div>
                        </div>
                    )}
                    {(userTypes && userTypes.length > 1 && isLessThan600) && (
                        <BasicSelect
                            label={translate("userType")}
                            options={userTypes.map((type) => ({
                                value: type,
                                text: translate(type.toLowerCase()),
                            }))}
                            neededEmptyValue={false}
                            onChange={(event) => {
                                setActiveSection(event.target.value as UserRoleEnum)
                                setActiveEmployeePost(null)
                                setCertificateCreateProps({ 
                                    usertype: event.target.value as UserRoleEnum, 
                                    receiveType: undefined, 
                                    staffType: undefined, 
                                    type: undefined 
                                })
                            }}/>
                    )}
                    <div className="certificates-info">
                        {(educationEntries && activeSection === "Student") && (
                            <>
                            <div className="certificates-education-entry-navigation">
                                {educationEntries.map((entry, index) => (
                                    <div key={index} className={`certificates-education-entry-navigation-item${activeEducationEntry?.id === entry.id ? " active" : ""}`} 
                                        onClick={() => setActiveEducationEntry(entry)}>
                                            <span className="certificates-education-entry-navigation-item-faculty">{entry.faculty}</span>
                                            <span className="certificates-education-entry-navigation-item-education-level">{`${translate("educationLevel")}: ${entry.educationLevel}`}</span>
                                            <span className="certificates-education-entry-navigation-item-status">{`${translate("status")}: ${entry.educationStatus}`}</span>
                                    </div>
                                ))}
                            </div>
                            {activeEducationEntry && (
                                <div className="certificates-education-entry-info">
                                    <div className="certificates-education-entry-info-row">
                                        <PersonalityUnit label={translate("educationLevel")} text={activeEducationEntry.educationLevel}/>
                                        <PersonalityUnit label={translate("status")} text={activeEducationEntry.educationStatus}/>
                                    </div>
                                    <hr className="divider"/>
                                    <div className="certificates-education-entry-info-row">
                                        <PersonalityUnit label={translate("faculty")} text={activeEducationEntry.faculty}/>
                                    </div>
                                    <hr className="divider"/>
                                    <div className="certificates-education-entry-info-row">
                                        <PersonalityUnit label={translate("educationDirection")} text={activeEducationEntry.educationDirection}/>
                                        <PersonalityUnit label={translate("group")} text={activeEducationEntry.group}/>
                                    </div>
                                    <hr className="divider"/>
                                </div>
                            )}
                            <div className="certificates-order-container">
                                <span className="certificates-order-container-title">{translate("certificatesOrderTitle")}</span>
                                <div className="certificates-order-container-interactive">
                                    <BasicSelect
                                    label={translate("certificateType")}
                                    options={[
                                        {value: "ForPlaceWhereNeeded", text: translate("ForPlaceWhereNeeded")},
                                        {value: "PensionForKazakhstan", text: translate("PensionForKazakhstan")}
                                    ]}
                                    onChange={(event) =>
                                        setCertificateCreateProps((prev) => ({
                                            ...prev,
                                            type: event.target.value as CertificateType,
                                        }))}/>
                                    <BasicSelect
                                        label={translate("certificateReceiveType")}
                                        options={[
                                            {value: "Electronic", text: translate("Electronic")},
                                            {value: "Paper", text: translate("Paper")}
                                        ]}
                                        onChange={(event) =>
                                            setCertificateCreateProps((prev) => ({
                                                ...prev,
                                                receiveType: event.target.value as CertificateReceiveType,
                                            }))}/>
                                    <BasicButton
                                        innerText={translate("order")}
                                        onClick={createCertificate}/>
                                </div>
                            </div>
                            <div className="certificates-info-certificates">
                                {certificates && (
                                    certificates.map((certificate, index) => (
                                        <CertificateUnit
                                            key={index}
                                            status={certificate.status}
                                            type={certificate.type ?? "ForPlaceWhereNeeded"}
                                            receiveType={certificate.receiveType}
                                            createDate={certificate.dateOfForming!}
                                            formDate={certificate.signatureFile ? getDateFromFileName(certificate.signatureFile) ?? certificate.dateOfForming!: certificate.dateOfForming!}
                                            certificateId={certificate.certificateFile?.id}
                                            signatureId={certificate.signatureFile?.id}/>))

                                )}
                            </div>
                            </>
                        )}

                        {(employeePosts && activeSection === "Employee") && (
                            <>
                            <div className="certificates-employee-post-navigation">
                                {employeePosts.map((post, index) => (
                                    <div key={index} className={`certificates-employee-post-navigation-item${activeEmployeePost?.id === post.id ? " active" : ""}`} 
                                        onClick={() => setActiveEmployeePost(post)}>
                                            <span className="certificates-employee-post-navigation-item-postName">{post.postName.name}</span>
                                            <span className="certificates-employee-post-navigation-item-employmentType">{translate(post.employmentType)}</span>
                                    </div>
                                ))}
                            </div>
                            {activeEmployeePost && (
                                <div className="certificates-employee-post-info">
                                    <div className="certificates-employee-post-info-row">
                                        <PersonalityUnit label={translate("post")} text={activeEmployeePost.postName.name || ""}/>
                                        <PersonalityUnit label={translate("rate")} text={activeEmployeePost.rate.toString()}/>
                                    </div>
                                    <hr className="divider"/>
                                    <div className="certificates-employee-post-info-row">
                                        <PersonalityUnit label={translate("placeOfWork")} text={activeEmployeePost.departments ? departmentsToString(activeEmployeePost.departments) : ""}/>
                                    </div>
                                    <hr className="divider"/>
                                    <div className="certificates-employee-post-info-row">
                                        <PersonalityUnit label={translate("postType")} text={activeEmployeePost.postType.name || ""}/>
                                        <PersonalityUnit label={translate("employmentType")} text={translate(activeEmployeePost.employmentType)}/>
                                    </div>
                                    <hr className="divider"/>
                                </div>
                            )}
                            <div className="certificates-order-container">
                                <span className="certificates-order-container-title">{translate("certificatesOrderTitle")}</span>
                                <div className="certificates-order-container-interactive">
                                    <BasicSelect
                                        label={translate("certificateType")}
                                        options={[
                                            {value: "ForPlaceOfWork", text: translate("ForPlaceOfWork")},
                                            {value: "ForExperience", text: translate("ForExperience")},
                                            {value: "ForVisa", text: translate("ForVisa")},
                                            {value: "ForWorkBookCopy", text: translate("ForWorkBookCopy")}
                                        ]}
                                        onChange={(event) =>
                                            setCertificateCreateProps((prev) => ({
                                                ...prev,
                                                staffType: event.target.value as CertificateStaffTypeEnum,
                                            }))}/>
                                    <BasicSelect
                                        label={translate("certificateReceiveType")}
                                        options={[
                                            {value: "Electronic", text: translate("Electronic")},
                                            {value: "Paper", text: translate("Paper")}
                                        ]}
                                        onChange={(event) =>
                                            setCertificateCreateProps((prev) => ({
                                                ...prev,
                                                receiveType: event.target.value as CertificateReceiveType,
                                            }))}/>
                                    <BasicButton
                                        innerText={translate("order")}
                                        onClick={createCertificate}/>
                                </div>
                            </div>
                            <div className="certificates-info-certificates">
                                {certificates && (
                                    certificates.map((certificate, index) => (
                                        <CertificateUnit
                                            key={index}
                                            status={certificate.status}
                                            type={certificate.staffType ?? "ForPlaceOfWork"}
                                            receiveType={certificate.receiveType}
                                            createDate={certificate.dateOfForming!}
                                            formDate={certificate.signatureFile ? getDateFromFileName(certificate.signatureFile) ?? certificate.dateOfForming! : certificate.dateOfForming!}
                                            certificateId={certificate.certificateFile?.id}
                                            signatureId={certificate.signatureFile?.id}/>))

                                )}
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {showNotification && error && (
                <NotificationPopup type="error" innerText={error} onClose={handleClose}/>
            )}
            {showNotification && warning && (
                <NotificationPopup type="warning" innerText={warning} onClose={handleClose}/>
            )}
            {showNotification && success && (
                <NotificationPopup type="success" innerText={success} onClose={handleClose}/>
            )}
        </div>
    )
}

export default CertificatesPage

export const departmentsToString = (departments: DepartmentDto[]) => {
    return departments.map(department => department.name).join(", ")
}

const getDateFromFileName = (file: FileDto): string | null => {
    let res: string | null = null
    if (file.name) {
        res = file.name.replace("Certificate_", "").replace("Signature_", "")
    }
    return res
}