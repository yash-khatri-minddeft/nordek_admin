import { ethers } from 'ethers'

export const sumFloats = (a, b) => {
    return ethers.utils.formatEther(
        ethers.utils.parseEther(a).add(ethers.utils.parseEther(b)).toString()
    )
}
