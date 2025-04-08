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
    oopsTitle: {
        ru: "Упс...",
        en: "Oops..."
    },
    homeTitle: {
        ru: "Главная",
        en: "Home"
    },
    loginTitle: {
        ru: "Вход",
        en: "Log in"
    },
    profileTitle: {
        ru: "Профиль",
        en: "Profile"
    },
}