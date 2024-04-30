export const formatDate = (date: string | Date) => {
    const formatter= new Intl.DateTimeFormat()

    return formatter.format(new Date(date))
}