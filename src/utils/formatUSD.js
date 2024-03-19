import numeral from 'numeral'

export const formatUSD = (value) => {
    if (typeof value === 'string') value = Number(value)
    if (value === 0) return '0.00'
    if (value < 1e-3) return '<0.001'
    if (value < 0.01) return numeral(value).format('0.000a')
    return numeral(value).format('0.00a')
}
