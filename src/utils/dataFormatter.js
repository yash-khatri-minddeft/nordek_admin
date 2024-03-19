export const dataFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    timeZoneName: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
})
