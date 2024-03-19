import $client from '../../client'

class HttpService {
    constructor() {
        this.client = $client
    }

    get Client() {
        return this.client
    }

    async get(url, config) {
        const { data } = await this.client.get(url, config)
        return data
    }
    async post(url, requestData, config) {
        const { data } = await this.client.post(url, requestData, config)
        return data
    }
    async put(url, requestData, config) {
        const { data } = await this.client.put(url, requestData, config)
        return data
    }
    async patch(url, requestData, config) {
        const { data } = await this.client.patch(url, requestData, config)
        return data
    }
    async delete(url, config) {
        return await this.client.delete(url, config)
    }
}

export const httpService = new HttpService()
