import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class FeesService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async swap(data) {
        return await this.httpService.post(apiUrls.fees.swap, data)
    }
    async removeLiquidity(data) {
        return await this.httpService.post(apiUrls.fees.removeLiquidity, data)
    }
    async addLiquidity(data) {
        return await this.httpService.post(apiUrls.fees.addLiquidity, data)
    }
}

export const feesService = new FeesService(httpService)
