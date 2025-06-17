import { NotFoundProps } from "./pages/NotFound/NotFound"

export const PAGE_TITLES: Record<string, string> = {
    '/': "eventsTitle",
    '/events': "eventsTitle",
    '/event/:id': "eventTitle",
    '/login': "loginTitle",
    '/profile': "profileTitle",
    '/certificates': "certificatesTitle",
    '/usefulservices': "usefulServicesTitle",
    '/admin': "adminLandingTitle",
    '/admin/users': "adminUsersTitle",
    '/admin/usefulservices': "adminUSTitle",
    '/admin/events': "adminEventsTitle"
}

export const BASE_ERROR_PAGE: NotFoundProps = {
    statusCode: 404,
    statusMessageRU: "Страница не найдена",
    statusMessageEN: "Page not found",
    description: "Вероятно, такой страницы не существует или вы ошиблись при вводе адреса в строку браузера"
}

export const API_URL = "https://lk-stud.api.kreosoft.space/api"

export const USEFUL_SERVICES_PAGE_PAGESIZE = 2

export const EVENTS_PAGE_PAGESIZE = 4