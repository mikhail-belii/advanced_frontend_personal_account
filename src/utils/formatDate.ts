export const formatDate = (dateStr: string, lang: string) => {
    const date = new Date(dateStr)
    const formatter = new Intl.DateTimeFormat(lang, {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    return formatter.format(date)
}