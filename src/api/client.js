import axios from 'axios'
import { attachAuthHeader, handleResponse, handleResponseError } from './interceptors'

// Standard JSON client — used by every endpoint except login
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(attachAuthHeader)
apiClient.interceptors.response.use(handleResponse, handleResponseError)

// Form-encoded client — used only by POST /auth/login (OAuth2PasswordRequestForm)
export const formClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

formClient.interceptors.response.use(handleResponse, handleResponseError)

