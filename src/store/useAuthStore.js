import { create } from 'zustand'
import defaultPfp from '@/assets/default_pfp.png'

const defaultUser = {
  name: 'New User',
  email: 'newuser@creazione.com',
  role: 'Member',
  avatar: defaultPfp,
  phone: '',
  location: '',
  bioText: '',
  skills: [],
  languages: []
}

const userAris = {
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

export const useAuthStore = create((set, get) => ({
  currentUser: defaultUser,
  createdUser: defaultUser,
  token: null,

  // NEW: called from Login/SignUp on submit, so the real user (not a
  // hardcoded demo user) flows through the rest of the app.
  setUser: (user) => set((state) => {
    const nextUser = { ...state.currentUser, ...user }
    return {
      currentUser: nextUser,
      createdUser: nextUser
    }
  }),

  // Demo-only: toggles between the two seeded users so the founder-only
  // UI paths (workspace settings) can be exercised without a real login flow.
  // Keep for now during dev, but this should be removed once real auth
  // (setUser above) is wired end-to-end from Login/SignUp.
  switchUser: () => {
    const created = get().createdUser || defaultUser
    const next = get().currentUser.email === userAris.email ? created : userAris
    set({ currentUser: next })
    return next
  },

  logout: () => set({ currentUser: defaultUser, createdUser: defaultUser, token: null }),
}))
