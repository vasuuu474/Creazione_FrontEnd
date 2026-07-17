import { create } from 'zustand'
import { login as apiLogin, register as apiRegister, getMe } from '@/api/endpoints/authApi'
import { normalizeUser } from '@/lib/userTransform'
import defaultPfp from '@/assets/default_pfp.png'

// ---------------------------------------------------------------------------
// Token persistence helpers — keeps the user logged in across page refreshes
// ---------------------------------------------------------------------------
const TOKEN_KEY = 'creazione_token'

function saveToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

function loadToken() {
  return localStorage.getItem(TOKEN_KEY) ?? null
}

// ---------------------------------------------------------------------------
// Default guest shape (used before login / after logout)
// ---------------------------------------------------------------------------
const guestUser = {
  id: null,
  name: 'Guest',
  email: '',
  role: 'Member',
  avatar: defaultPfp,
  phone: '',
  location: '',
  bioText: '',
  skills: [],
  languages: [],
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
export const useAuthStore = create((set, get) => ({
  currentUser: guestUser,
  token: loadToken(),   // rehydrate from localStorage on startup
  isInitialized: false,

  // ------------------------------------------------------------------
  // initialize — runs on app startup to fetch user profile if token exists
  // ------------------------------------------------------------------
  initialize: async () => {
    const token = get().token
    if (!token) {
      set({ isInitialized: true })
      return null
    }
    try {
      const meData = await getMe()
      const normalized = normalizeUser(meData)
      set({ currentUser: normalized, isInitialized: true })
      return normalized
    } catch (err) {
      // Token is likely expired or invalid
      saveToken(null)
      set({ currentUser: guestUser, token: null, isInitialized: true })
      return null
    }
  },
  register: async ({ firstName, lastName, email, password, mobileNumber }) => {
    const data = await apiRegister({ firstName, lastName, email, password, mobileNumber })
    // register returns { access_token, token_type, user }
    const normalized = normalizeUser(data.user)
    saveToken(data.access_token)
    set({ token: data.access_token, currentUser: normalized })
    return normalized
  },

  // ------------------------------------------------------------------
  // login — calls POST /auth/login (form-encoded), then GET /users/me
  // ------------------------------------------------------------------
  login: async (email, password) => {
    const tokenData = await apiLogin(email, password)
    // store token first so the next request can attach it
    saveToken(tokenData.access_token)
    set({ token: tokenData.access_token })
    // now fetch the user
    const meData = await getMe()
    const normalized = normalizeUser(meData)
    set({ currentUser: normalized })
    return normalized
  },

  // ------------------------------------------------------------------
  // setUser — used to merge partial updates (e.g. from profile edits)
  // ------------------------------------------------------------------
  setUser: (partial) =>
    set((state) => ({ currentUser: { ...state.currentUser, ...partial } })),

  // ------------------------------------------------------------------
  // logout
  // ------------------------------------------------------------------
  logout: () => {
    saveToken(null)
    set({ currentUser: guestUser, token: null })
  },

  // Helper to store the real user when switching to the demo user
  realUserBackup: null,

  // ------------------------------------------------------------------
  // DEV ONLY: demo toggle kept for UI testing without a real account
  // ------------------------------------------------------------------
  ...(import.meta.env.DEV && {
    switchUser: () => {
      const aris = {
        id: 'founder-1',
        name: 'Dr. Aris Thorne',
        email: 'aris.thorne@creazione.com',
        role: 'Chief Architect',
        avatar: '/src/assets/founder_aris.jpg',
        phone: '+1 (555) 012-3456',
        location: 'San Francisco, CA',
        bioText: 'Passionate technologist with over a decade of experience building scalable enterprise infrastructure.',
        skills: ['Kubernetes', 'Cloud Infrastructure', 'Rust', 'Distributed Systems'],
        languages: [
          { name: 'English', level: 'Native' },
          { name: 'German', level: 'Fluent' }
        ]
      }
      
      const current = get().currentUser
      let next
      
      if (current.email === aris.email) {
        // Toggling back to the real logged-in user (or guest if none)
        next = get().realUserBackup || guestUser
        set({ currentUser: next, realUserBackup: null })
      } else {
        // Toggling to Aris Thorne, save current user first
        next = aris
        set({ currentUser: aris, realUserBackup: current })
      }
      
      return next
    },
  }),
}))

