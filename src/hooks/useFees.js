import { useCallback } from 'react'
import { feesService } from '../api/service/feesSrvice'

export function useFees() {
    const setSwap = useCallback(async (data) => {
        try {
            await feesService.swap(data)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])
    const setRemoveLiquidity = useCallback(async (data) => {
        try {
            await feesService.removeLiquidity(data)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])
    const setAddLiquidity = useCallback(async (data) => {
        try {
            await feesService.addLiquidity(data)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    return { setSwap, setAddLiquidity, setRemoveLiquidity }
}
