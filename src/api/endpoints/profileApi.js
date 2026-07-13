import { apiClient } from '../client'

export const getProfile = () => apiClient.get('/profile/current')

export const updateProfile = (profile) =>
  apiClient.put(`/profile/${profile.id ?? 'current'}`, profile)
