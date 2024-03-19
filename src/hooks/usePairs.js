import { useCallback } from 'react'
import { pairsService } from '../api/service/pairService'

export function usePairs() {
    const getPair = useCallback(async (token0, token1) => {
        try {
            return await pairsService.getPair(token0, token1)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const getHiddenPairsList = useCallback(async () => {
        try {
            return await pairsService.getHiddenList()
        } catch (err) {
            console.error(err)
        }
    }, [])

    const savePair = useCallback(async (data) => {
        try {
            return await pairsService.savePair(data)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const lockPair = useCallback(async (data) => {
        try {
            return await pairsService.lockPair(data)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const unlockPair = useCallback(async (data) => {
        try {
            return await pairsService.unlockPair(data)
        } catch (err) {
            console.error(err)
        }
    }, [])

    return { getPair, getHiddenPairsList, savePair, lockPair, unlockPair }
}
