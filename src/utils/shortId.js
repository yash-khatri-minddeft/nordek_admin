export const shortId = (str, chars = 3) => {
    return `${str.substring(0, chars)}...${str.substring(str.length - 3)}`
}
