import axios from 'axios'
import { JWT_TOKEN } from "../api/auth/const";

export const apiAxios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 60000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
})

apiAxios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(JWT_TOKEN)}`

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

apiAxios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    switch (error.response.status) {
      case 403:
        router.push('/')
        break
      case 404:
        router.push('/not-found')
        break
      default:
        return Promise.reject(error)
    }
  },
)
