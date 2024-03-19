import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class TokensService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async getToken(address) {
        return await this.httpService.get(
            apiUrls.tokens.getByAddress.replace('{address}', `${address}`)
        )
    }
    async saveToken(data) {
        return await this.httpService.put(apiUrls.tokens.saveToken, data)
    }
}

export const tokensService = new TokensService(httpService)
