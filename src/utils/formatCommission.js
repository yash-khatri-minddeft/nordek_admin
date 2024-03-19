export const formatCommission = (str) => {
    if (!str.length) return '0'
    if (str === '0.0') return '0'
    if (str.length === 1 && str === '0') return '0'

    const indexOfDot = str.split('').findIndex((char) => char === '.')

    if (indexOfDot === -1) return str

    const numberBeforeDot = Number(str.slice(0, indexOfDot))

    if (indexOfDot !== -1 && !isNaN(numberBeforeDot) && numberBeforeDot > 0) {
        return parseFloat(str)?.toFixed(1)
    }

    const index = str
        .split('')
        .findIndex((char) => char !== '0' && char !== '.' && char !== ',')
    return parseFloat(str)?.toFixed(index - 1)
}
