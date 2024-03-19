import axios from 'axios'
// import { apiUrls } from '../constants'

const baseUrl = process.env.REACT_APP_BASE_URL

const $client = axios.create({
    baseURL: baseUrl,
    headers: {
        'x-refresh-token': localStorage.getItem('refresh-token'),
    },
})

$client.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers['x-refresh-token'] = localStorage.getItem('refresh-token')
    return config
})
//
// $client.interceptors.response.use(
//     (config) => config,
//     (error) => {
//         const originalRequest = error.config
//         if (error.status === 401) {
//             const response = axios.post(`${baseUrl}${apiUrls.auth.refresh}`, {
//                 headers: {
//                     'x-refresh-token': localStorage.getItem('token'),
//                 },
//             })
//             localStorage.setItem('token', response.data.token)
//             return $client.request(originalRequest)
//         }
//     }
// )

export default $client
