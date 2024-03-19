import { useCallback } from 'react'
import { Contract, ethers } from 'ethers'
import { FACTORY_ABI } from '../constants/factory-abi'

const rpcUrl = process.env.REACT_APP_RPC_URL

export function useFactory() {
    const FACTORY_ADDRESS = process.env.REACT_APP_FACTORY_ADDRESS

    const factory = new Contract(
        FACTORY_ADDRESS,
        FACTORY_ABI,
        new ethers.providers.JsonRpcProvider(rpcUrl)
    )

    const getFees = useCallback(async () => {
        try {
            const swapBN = await factory.swapFeeBP()
            const addLiquidityBN = await factory.addLiquidityFeeBP()
            const removeLiquidityBN = await factory.removeLiquidityFeeBP()

            const swapFee = ethers.utils.formatUnits(swapBN, 2)
            const addLiquidityFee = ethers.utils.formatUnits(addLiquidityBN, 2)
            const removeLiquidityFee = ethers.utils.formatUnits(
                removeLiquidityBN,
                2
            )

            return { swapFee, addLiquidityFee, removeLiquidityFee }
        } catch (err) {
            console.error(err)
        }
    }, [])

    return {
        getFees,
    }
}
