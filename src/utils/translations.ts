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