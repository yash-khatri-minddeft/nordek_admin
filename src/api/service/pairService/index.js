import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class PairService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async getPair(token0, token1) {
        return await this.httpService.get(apiUrls.pairs.getPair, {
            params: { token0, token1 },
        })
    }
    async getHiddenList() {
        return await this.httpService.get(apiUrls.pairs.hiddenPairs)
    }
    async savePair(data) {
        return await this.httpService.put(apiUrls.pairs.savePair, data)
    }
    async lockPair(data) {
        return await this.httpService.post(apiUrls.pairs.lock, data)
    }
    async unlockPair(data) {
        return await this.httpService.post(apiUrls.pairs.unlock, data)
    }
}

export const pairsService = new PairService(httpService)
