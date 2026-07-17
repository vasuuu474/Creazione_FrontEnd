/**
 * userTransform.js
 *
 * Converts the backend's snake_case UserRead shape into the camelCase shape
 * the rest of the frontend expects. Only add fields here as the backend grows.
 *
 * Backend UserRead (from app/schemas/user.py):
 *   user_id, first_name, middle_name, last_name, email,
 *   mobile_number, status, created_at, updated_at
 *
 * Frontend shape (used by useAuthStore / useProfileStore):
 *   id, name, email, phone, location, bioText, avatar, skills, languages
 */
export function normalizeUser(apiUser) {
  if (!apiUser) return null

  const fullName = [apiUser.first_name, apiUser.middle_name, apiUser.last_name]
    .filter(Boolean)
    .join(' ')

  return {
    // Identity
    id: apiUser.user_id,
    firstName: apiUser.first_name ?? '',
    lastName: apiUser.last_name ?? '',
    name: fullName,
    email: apiUser.email ?? '',

    // Optional fields (not returned by /users/me yet, but kept for forward compat)
    phone: apiUser.mobile_number ?? '',
    location: apiUser.location ?? '',
    bioText: apiUser.bio ?? '',
    avatar: apiUser.profile_picture ?? null,
    linkedinUrl: apiUser.linkedin_url ?? '',
    githubUrl: apiUser.github_url ?? '',
    experienceLevel: apiUser.experience_level ?? '',

    // Will be populated by dedicated endpoints when they exist
    skills: apiUser.skills ?? [],
    languages: apiUser.languages ?? [],

    // Metadata
    status: apiUser.status ?? 'active',
    role: apiUser.role ?? 'Member',
  }
}
