import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class AuthService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async login(data) {
        return await this.httpService.post(apiUrls.auth.login, data)
    }
    async logout() {
        return await this.httpService.post(apiUrls.auth.logout)
    }
    async changePassword(data) {
        return await this.httpService.post(apiUrls.auth.changePassword, data)
    }
    async changePasswordByAdmin(data) {
        return await this.httpService.post(
            apiUrls.auth.changePasswordByAdmin,
            data
        )
    }
    async registerByAdmin(data) {
        return await this.httpService.post(apiUrls.auth.registerByAdmin, data)
    }
}

export const authService = new AuthService(httpService)

//
// {
//     "email": "admin@gmail.com",
//     "password": "qwerty123456"
// }
