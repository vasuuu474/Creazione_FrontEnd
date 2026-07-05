import { apiClient } from '../client'

export const fetchMembers = () => apiClient.get('/members')

export const createMember = (member) => apiClient.post('/members', member)

export const updateMember = (id, patch) => apiClient.patch(`/members/${id}`, patch)

export const deleteMember = (id) => apiClient.delete(`/members/${id}`)
