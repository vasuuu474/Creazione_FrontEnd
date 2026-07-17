import { apiClient } from '../client'

/**
 * Fetch the logged-in user's profile.
 * Maps to GET /users/me on the backend.
 */
export const getProfile = () => apiClient.get('/users/me')

/**
 * Update the logged-in user's profile.
 * PUT /users/me — not implemented on the backend yet.
 * Returns a resolved promise so callers don't throw.
 */
export const updateProfile = (_payload) => Promise.resolve()

