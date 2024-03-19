import { apiUrls } from '../../constants'
import { httpService } from '../httpServise'

class UsersService {
    constructor(httpService) {
        this.httpService = httpService
    }

    async getMyself() {
        return await this.httpService.get(apiUrls.users.myUser)
    }

    async getById(id) {
        return await this.httpService.get(
            apiUrls.users.getUserById.replace('{id}', `${id}`)
        )
    }

    async getAll() {
        return await this.httpService.get(apiUrls.users.getAllUsers)
    }

    async delete(id) {
        return await this.httpService.delete(
            apiUrls.users.deleteUser.replace('{id}', `${id}`)
        )
    }

    async editByAdmin(data) {
        return await this.httpService.put(apiUrls.users.editByAdmin, data)
    }

    async editByMe(data) {
        return await this.httpService.put(apiUrls.users.editByMe, data)
    }
}

export const usersService = new UsersService(httpService)
