import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class TwoFAService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async generateLink() {
        return await this.httpService.post(apiUrls.otp.generateUri)
    }

    async setOtp(data) {
        return await this.httpService.post(apiUrls.otp.setOtp, data)
    }

    async disable(data) {
        return await this.httpService.post(apiUrls.otp.disable, data)
    }

    async disableByAdmin(data) {
        return await this.httpService.post(apiUrls.otp.disableByAdmin, data)
    }
}

export const twoFAService = new TwoFAService(httpService)
