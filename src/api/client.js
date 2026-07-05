import axios from 'axios'
import { attachAuthHeader, handleResponse, handleResponseError } from './interceptors'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(attachAuthHeader)
apiClient.interceptors.response.use(handleResponse, handleResponseError)
