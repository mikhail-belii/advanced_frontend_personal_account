import { NotFoundProps } from "./pages/NotFound/NotFound"

export const PAGE_TITLES: Record<string, string> = {
    '/': "homeTitle",
    '/login': "loginTitle",
    '/profile': "profileTitle"
}

export const BASE_ERROR_PAGE: NotFoundProps = {
    statusCode: 404,
    statusMessageRU: "Страница не найдена",
    statusMessageEN: "Page not found",
    description: "Вероятно, такой страницы не существует или вы ошиблись при вводе адреса в строку браузера"
}

export const API_URL = "https://lk-stud.api.kreosoft.space/api"