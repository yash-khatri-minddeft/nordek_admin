import { useCallback } from 'react'
import { walletService } from '../api/service/walletService'

export function useWallet() {
    const addWallet = useCallback(async ({ address, providerId }) => {
        try {
            await walletService.add({ address, providerId })
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    const getAllWallets = useCallback(async () => {
        try {
            return await walletService.getAll()
        } catch (err) {
            console.error(err)
        }
    }, [])

    const getWalletById = useCallback(async (id) => {
        try {
            return await walletService.getById(id)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const getWalletByAddress = useCallback(async (address) => {
        try {
            return await walletService.getByAddress(address)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const toggleWallet = useCallback(async ({ id, value }) => {
        try {
            await walletService.toggle({ id, value })
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    return {
        addWallet,
        getAllWallets,
        getWalletById,
        getWalletByAddress,
        toggleWallet,
    }
}
