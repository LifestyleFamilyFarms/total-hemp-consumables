const pad = (value: number) => value.toString().padStart(2, "0")

export const parseLocalDateTime = (dateISO: string, time: string) => {
  const [year, month, day] = dateISO.split("-").map(Number)
  const [hours, minutes] = time.split(":").map(Number)
  return new Date(year, (month || 1) - 1, day || 1, hours || 0, minutes || 0, 0, 0)
}

export const diffMinutes = (start: Date, end: Date) => {
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000))
}

export const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000)
}

export const formatLocalISOString = (date: Date) => {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())
  const offsetMinutes = -date.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? "+" : "-"
  const absOffset = Math.abs(offsetMinutes)
  const offsetHours = pad(Math.floor(absOffset / 60))
  const offsetMins = pad(absOffset % 60)

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMins}`
}
