import { useAuthStore } from '@/store/useAuthStore'

export function attachAuthHeader(config) {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export function handleResponse(response) {
  return response.data
}

export function handleResponseError(error) {
  if (error.response?.status === 401) {
    useAuthStore.getState().logout()
  }

  const message = error.response?.data?.message || error.message || 'Unexpected network error'
  return Promise.reject(new Error(message))
}
