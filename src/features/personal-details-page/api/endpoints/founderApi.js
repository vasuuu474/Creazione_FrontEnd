import { apiClient } from '../client'

export const contactFounder = (payload) => apiClient.post('/founder/contact', payload)
