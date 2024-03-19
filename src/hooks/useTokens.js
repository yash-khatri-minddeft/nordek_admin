import { useCallback } from 'react'
import { tokensService } from '../api/service/tokensService'

export function useTokens() {
    const getToken = useCallback(async (address) => {
        try {
            return await tokensService.getToken(address)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const saveToken = useCallback(async (data) => {
        try {
            return await tokensService.saveToken(data)
        } catch (err) {
            console.error(err)
        }
    }, [])

    return { getToken, saveToken }
}
