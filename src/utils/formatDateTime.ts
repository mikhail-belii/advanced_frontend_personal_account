const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }
    return new Intl.DateTimeFormat("ru-RU", { ...options, timeZone: "UTC" }).format(date).replace(",", "");
}

export default formatDateTime