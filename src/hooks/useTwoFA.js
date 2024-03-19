import { useCallback } from 'react'
import { twoFAService } from '../api/service/twoFAservice'

export function useTwoFA() {
    const generateLink = useCallback(async () => {
        try {
            return await twoFAService.generateLink()
        } catch (err) {
            console.error(err)
        }
    }, [])

    const setOtp = useCallback(async (data) => {
        try {
            await twoFAService.setOtp(data)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    const disable = useCallback(async (data) => {
        try {
            await twoFAService.disable(data)
            return true
        } catch (err) {
            console.error(err)
            return err
        }
    }, [])

    const disableByAdmin = useCallback(async (data) => {
        try {
            return await twoFAService.disableByAdmin(data)
        } catch (err) {
            console.error(err)
        }
    }, [])

    return { generateLink, setOtp, disable, disableByAdmin }
}
