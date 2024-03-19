export const calculateEarnedTokens = (liquidityPositions) => {
    if (liquidityPositions?.length === 0) return 0
    let result = 0
    liquidityPositions?.forEach((position) => {
        if (position?.liquidityTokenBalance) {
            result += Number(position?.liquidityTokenBalance)
        }
    })
    if (String(result).length > 12) {
        result = String(result).slice(0, 12)
    }
    return +result
}
