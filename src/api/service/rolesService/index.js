import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class RolesService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async getList() {
        return await this.httpService.get(apiUrls.roles.list)
    }
    async getMyRoles() {
        return await this.httpService.get(apiUrls.roles.myRoles)
    }
}

export const rolesService = new RolesService(httpService)
