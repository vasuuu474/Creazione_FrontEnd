import { apiClient, formClient } from '../client'

/**
 * Register a new user.
 * POST /auth/register  (JSON body)
 * Returns: { access_token: string, token_type: string, user: UserRead }
 */
export const register = (payload) =>
  apiClient.post('/auth/register', {
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    password: payload.password,
    middle_name: payload.middleName ?? undefined,
    mobile_number: payload.mobileNumber ?? undefined,
  })

/**
 * Log in an existing user.
 * POST /auth/login  (form-encoded — OAuth2PasswordRequestForm)
 * The backend field is `username` (not `email`).
 * Returns: { access_token: string, token_type: string }
 */
export const login = (email, password) => {
  const params = new URLSearchParams()
  params.append('username', email)   // backend expects "username"
  params.append('password', password)
  return formClient.post('/auth/login', params)
}

/**
 * Fetch the currently authenticated user's profile.
 * GET /users/me  (requires Authorization: Bearer <token>)
 * Returns: UserRead { user_id, first_name, last_name, email, status, ... }
 */
export const getMe = () => apiClient.get('/users/me')
