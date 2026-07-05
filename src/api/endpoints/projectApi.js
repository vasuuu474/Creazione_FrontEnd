import { apiClient } from '../client'

export const getProject = () => apiClient.get('/projects/current')

export const updateProject = (project) =>
  apiClient.put(`/projects/${project.id ?? 'current'}`, project)
