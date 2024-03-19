import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class WalletService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async add({ address, providerId }) {
        return await this.httpService.put(apiUrls.wallets.addWallet, {
            address,
            providerId,
        })
    }

    async getAll() {
        return await this.httpService.get(apiUrls.wallets.getAllWallets)
    }

    async getByAddress(address) {
        return await this.httpService.get(
            apiUrls.wallets.address.replace('{address}', `${address}`)
        )
    }

    async getById(id) {
        return await this.httpService.get(
            apiUrls.wallets.getWalletById.replace('{id}', `${id}`)
        )
    }

    async toggle(data) {
        return await this.httpService.patch(apiUrls.wallets.toggle, data)
    }
}

export const walletService = new WalletService(httpService)
