import { Language } from "../context/LanguageContext";

interface ITranslations {
    [key: string]: {
        [lang in Language]: string
    }
}

export const TRANSLATIONS: ITranslations = {
    profile: {
        ru: "Профиль",
        en: "Profile"
    },
    admin: {
        ru: "Администрирование",
        en: "Administration"
    },
    certificates: {
        ru: "Справки",
        en: "Certificates"
    },
    usefulservices: {
        ru: "Полезные сервисы",
        en: "Useful services"
    },
    events: {
        ru: "Мероприятия",
        en: "Events"
    },
    success: {
        ru: "Успех",
        en: "Success"
    },
    warning: {
        ru: "Предупреждение",
        en: "Warning"
    },
    info: {
        ru: "Информация",
        en: "Info"
    },
    error: {
        ru: "Ошибка",
        en: "Error"
    },
    typeEmailAndPassword: {
        ru: "Введите Email и пароль",
        en: "Type Email and password"
    },
    incorrectEmailOrPassword: {
        ru: "Неверный Email или пароль",
        en: "Incorrect Email or password"
    },
    loginHeader: {
        ru: "Вход в аккаунт",
        en: "Log in to your account"
    },
    login: {
        ru: "ВОЙТИ",
        en: "LOG IN"
    },
    password: {
        ru: "Пароль",
        en: "Password"
    },
    rememberMe: {
        ru: "Запомнить меня",
        en: "Remember me"
    },
    gender: {
        ru: "Пол",
        en: "Gender"
    },
    genderMale: {
        ru: "Мужской",
        en: "Male"
    },
    genderFemale: {
        ru: "Женский",
        en: "Female"
    },
    genderNotDefined: {
        ru: "Не указано",
        en: "Not Defined"
    },
    birthDate: {
        ru: "Дата рождения",
        en: "Date of Birth"
    },
    citizenship: {
        ru: "Гражданство",
        en: "Citizenship"
    },
    email: {
        ru: "Электронная почта",
        en: "Email"
    },
    personalDataHeader: {
        ru: "Личные данные",
        en: "Personal Data"
    },
    contactsHeader: {
        ru: "Контакты",
        en: "Contacts"
    },
    address: {
        ru: "Адрес",
        en: "Address"
    },
    phone: {
        ru: "Телефон",
        en: "Phone"
    },
    socialmedia: {
        ru: "Социальная сеть",
        en: "Social Media"
    },
    faculty: {
        ru: "Факультет",
        en: "Faculty"
    },
    group: {
        ru: "Группа",
        en: "Group"
    },
    educationBase: {
        ru: "База",
        en: "Base"
    },
    educationDirection: {
        ru: "Направление",
        en: "Direction"
    },
    educationProfile: {
        ru: "Профиль",
        en: "Profile"
    },
    educationQualification: {
        ru: "Квалификация",
        en: "Qualification"
    },
    educationForm: {
        ru: "Форма обучения",
        en: "Education form"
    },
    educationYears: {
        ru: "Года обучения",
        en: "Education years"
    },
    creditBookNumber: {
        ru: "Номер зачетной книги",
        en: "Credit book number"
    },
    course: {
        ru: "Курс",
        en: "Course"
    },
    education: {
        ru: "Образование",
        en: "Education"
    },
    work: {
        ru: "Работа",
        en: "Work"
    },
    uploadingProfilePhoto: {
        ru: "Загрузка фото профиля",
        en: "Uploading profile photo"
    },
    fetchProfileError: {
        ru: "Ошибка загрузки профиля",
        en: "Error while loading profile"
    },
    fetchError: {
        ru: "Ошибка загрузки данных",
        en: "Error while loading data"
    },
    fetchProfileSuccess: {
        ru: "Профиль успешно загружен",
        en: "Profile was loaded successfully"
    },
    uploadingProfilePhotoSuccess: {
        ru: "Фото профиля успешно загружено",
        en: "Profile photo was uploaded successfully"
    },
    uploadingProfilePhotoError: {
        ru: "Ошибка загрузки фото профиля",
        en: "Error while uploading profile photo"
    },
    zoom: {
        ru: "Масштаб",
        en: "Zoom"
    },
    upload: {
        ru: "Загрузить",
        en: "Upload"
    },
    uploading: {
        ru: "Загрузка...",
        en: "Uploading..."
    },
    cancel: {
        ru: "Отмена",
        en: "Cancel"
    },
    selectFileText: {
        ru: "Выбрать файл",
        en: "Select a file"
    },
    certificateCreated: {
        ru: "Создано",
        en: "Created"
    },
    certificateInProcess: {
        ru: "В работе",
        en: "In process"
    },
    certificateFinishedElectronic: {
        ru: "Готово",
        en: "Finished"
    },
    certificateFinishedPaper: {
        ru: "Заказано",
        en: "Ordered"
    },
    Electronic: {
        ru: "Электронная",
        en: "Electronic"
    },
    ForPlaceWhereNeeded: {
        ru: "для предъявления по месту требования",
        en: "For place where needed"
    },
    PensionForKazakhstan: {
        ru: "для пенсионных выплат",
        en: "For pension payments"
    },
    ForPlaceOfWork: {
        ru: "с места работы",
        en: "For place of work"
    },
    ForExperience: {
        ru: "о стаже",
        en: "For experience"
    },
    ForVisa: {
        ru: "на оформление визы",
        en: "For visa"
    },
    ForWorkBookCopy: {
        ru: "для копии трудовой книжки",
        en: "For work book copy"
    },
    Certificate: {
        ru: "Справка",
        en: "Certificate"
    },
    Signature: {
        ru: "Подпись",
        en: "Signature"
    },
    Paper: {
        ru: "Бумажная",
        en: "Paper"
    },
    certificateUnitLabel: {
        ru: "Справка от",
        en: "Certificate dated"
    },
    certificateType: {
        ru: "Тип справки",
        en: "Certificate type"
    },
    certificateFormingDateTime: {
        ru: "Дата и время формирования справки",
        en: "Certificate forming date and time"
    },
    certificateReceiveType: {
        ru: "Вид справки",
        en: "Certificate receive type"
    },
    select: {
        ru: "Выбрать",
        en: "Select"
    },
    main: {
        ru: "Главная",
        en: "Main"
    },
    certificateOrder: {
        ru: "Заказ справки",
        en: "Certificate order"
    },
    userType: {
        ru: "Тип пользователя",
        en: "User type"
    },
    student: {
        ru: "Студент",
        en: "Student"
    },
    employee: {
        ru: "Сотрудник",
        en: "Employee"
    },
    educationLevel: {
        ru: "Уровень образования",
        en: "Education level"
    },
    certificatesOrderTitle: {
        ru: "Заказать справку",
        en: "Order a certificate"
    },
    status: {
        ru: "Статус",
        en: "Status"
    },
    order: {
        ru: "Заказать",
        en: "Order"
    },
    MainPlace: {
        ru: "Основное место работы",
        en: "Main place"
    },
    PartTime: {
        ru: "Совместительство",
        en: "Part-time"
    },
    InnerPartTime: {
        ru: "Внутреннее совместительство",
        en: "Inner part-time"
    },
    Freelance: {
        ru: "Подработка",
        en: "Freelance"
    },
    post: {
        ru: "Должность",
        en: "Post"
    },
    rate: {
        ru: "Ставка",
        en: "Rate"
    },
    placeOfWork: {
        ru: "Место работы",
        en: "Place of work"
    },
    postType: {
        ru: "Тип должности",
        en: "Post type"
    },
    employmentType: {
        ru: "Вид занятости",
        en: "Employment type"
    },
    dateStart: {
        ru: "Дата приема на работу",
        en: "Date of employment"
    },
    dateEnd: {
        ru: "Дата увольнения",
        en: "Date of dismissal"
    },
    experience: {
        ru: "Стаж",
        en: "Experience"
    },
    certificateRequestCreated: {
        ru: "Заявка на справку создана",
        en: "Certificate request created"
    },
    fillAllFields: {
        ru: "Заполните все поля",
        en: "Fill all fields"
    },
    createCertificateError: {
        ru: "Ошибка создания справки",
        en: "Error creating certificate"
    },
    certificateAlreadyInWork: {
        ru: "Данный тип справки находится в работе, заказать новую нельзя",
        en: "This type of certificate is in process, you can't order a new one"
    },
    goToTheWebsite: {
        ru: "Перейти на сайт",
        en: "Go to the website"
    },
    termsOfDistribution : {
        ru: "Условия предоставления",
        en: "Terms of distribution"
    },
    exit: {
        ru: "Выйти",
        en: "Exit"
    },
    eventFinished: {
        ru: "Завершилось",
        en: "Finished"
    },
    eventDate: {
        ru: "Дата(ы) проведения",
        en: "Event date(s)"
    },
    eventFormat: {
        ru: "Формат мероприятия",
        en: "Event format"
    },
    noEventDate: {
        ru: "Нет даты проведения",
        en: "No event date"
    },
    Finished: {
        ru: "Завершилось",
        en: "Finished"
    },
    Draft: {
        ru: "Черновик",
        en: "Draft"
    },
    Actual: {
        ru: "Активное",
        en: "Actual"
    },
    Archive: {
        ru: "Архив",
        en: "Archive"
    },
    Online: {
        ru: "Онлайн",
        en: "Online"
    },
    Offline: {
        ru: "Офлайн",
        en: "Offline"
    },
    searchLabel: {
        ru: "Поиск",
        en: "Search"
    },
    searchButton: {
        ru: "Найти",
        en: "Search"
    },
    eventNameInputLabel: {
        ru: "Название мероприятия",
        en: "Event name"
    },
    eventDateInputLabel: {
        ru: "Дата проведения мероприятия",
        en: "Event date"
    },
    fetchEventsError: {
        ru: "Произошла ошибка при загрузке мероприятий",
        en: "There was an error loading events"
    },
    fetchEventError: {
        ru: "Произошла ошибка при загрузке мероприятия",
        en: "There was an error loading the event"
    },
    willParticipate: {
        ru: "Буду участвовать",
        en: "Will participate"
    },
    alreadyParticipate: {
        ru: "Участвую",
        en: "Participating"
    },
    participateEventError: {
        ru: "Произошла ошибка при регистрации на участие",
        en: "There was an error while registering for participation"
    },
    description: {
        ru: "Описание",
        en: "Description"
    },
    eventRegistrationLastDate: {
        ru: "Дата окончания регистрации",
        en: "Registration last date"
    },
    eventLink: {
        ru: "Ссылка",
        en: "Link"
    },
    successEventRegister: {
        ru: "Вы успешно зарегистрировались на мероприятие",
        en: "You have successfully registered for the event"
    },
    eventRegisterFailed: {
        ru: "Не удалось зарегистрироваться на мероприятие",
        en: "Failed to register for the event"
    },
    fullName: {
        ru: "ФИО",
        en: "Full Name"
    },
    phoneNumber: {
        ru: "Телефон",
        en: "Phone Number"
    },
    additionalInfo: {
        ru: "Дополнительная информация",
        en: "Additional Info"
    },
    saveModal: {
        ru: "Сохранить",
        en: "Save"
    },
    cancelModal: {
        ru: "Отменить",
        en: "Cancel"
    },
    eventRegistration: {
        ru: "Регистрация на мероприятие",
        en: "Event registration"
    },
    emptyNameWarning: {
        ru: "Введите ФИО",
        en: "Type your full name"
    },
    emptyPhoneWarning: {
        ru: "Введите номер телефона",
        en: "Type your phone number"
    },
    emptyEmailWarning: {
        ru: "Введите электронную почту",
        en: "Type your email"
    },
    invalidEmailWarning: {
        ru: "Введите корректную эл. почту",
        en: "Type the correct email"
    },
    adminLandingCardUsersTitle: {
        ru: "Пользователи",
        en: "Users"
    },
    adminLandingCardUsersDescription: {
        ru: "Страница предназначена для просмотра и фильтрации всех пользователей системы",
        en: "The page is designed to view and filter all users of the system"
    },
    adminLandingCardUSTitle: {
        ru: "Полезные сервисы",
        en: "Useful services"
    },
    adminLandingCardUSDescription: {
        ru: "Страница предназначена для просмотра, добавления, изменения и удаления полезных сервисов системы",
        en: "The page is designed to view, add, change and delete useful services in the system"
    },
    adminLandingCardEventsTitle: {
        ru: "Мероприятия",
        en: "Events"
    },
    adminLandingCardEventsDescription: {
        ru: "Страница предназначена для просмотра, добавления, изменения и удаления мероприятий в системе",
        en: "The page is designed to view, add, change and delete events in the system"
    },
    typeFullName: {
        ru: "Введите ФИО",
        en: "Type full name"
    },
    fetchUsersError: {
        ru: "Произошла ошибка при получении списка пользователей",
        en: "An error occurred while retrieving the list of users"
    },
    noUsersFound: {
        ru: "Пользователей не найдено",
        en: "No users found"
    },
    empty: {
        ru: "",
        en: ""
    },
    oopsTitle: {
        ru: "Упс...",
        en: "Oops..."
    },
    eventsTitle: {
        ru: "Мероприятия",
        en: "Events"
    },
    eventTitle: {
        ru: "Мероприятие",
        en: "Event"
    },
    loginTitle: {
        ru: "Вход",
        en: "Log in"
    },
    profileTitle: {
        ru: "Профиль",
        en: "Profile"
    },
    certificatesTitle: {
        ru: "Справки",
        en: "Certificates"
    },
    usefulServicesTitle: {
        ru: "Полезные сервисы",
        en: "Useful services"
    },
    adminLandingTitle: {
        ru: "Администрирование",
        en: "Administration"
    },
    adminUsersTitle: {
        ru: "Пользователи",
        en: "Users"
    },
    adminUSTitle: {
        ru: "Полезные сервисы",
        en: "Useful Services"
    },
    adminEventsTitle: {
        ru: "Мероприятия",
        en: "Events"
    },
}