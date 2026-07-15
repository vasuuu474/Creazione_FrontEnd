import { create } from 'zustand'

const userElizabeth = {
  name: 'Elizabeth Vance',
  email: 'elizabeth.vance@creazione.com',
  role: 'UX Strategy',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
}

const userAris = {
  name: 'Dr. Aris Thorne',
  email: 'aris.thorne@creazione.com',
  role: 'Chief Architect',
  avatar: '/src/assets/founder_aris.jpg',
}

export const useAuthStore = create((set, get) => ({
  currentUser: userElizabeth,
  token: null,

  // Demo-only: toggles between the two seeded users so the founder-only
  // UI paths (workspace settings) can be exercised without a real login flow.
  switchUser: () => {
    const next = get().currentUser.email === userElizabeth.email ? userAris : userElizabeth
    set({ currentUser: next })
    return next
  },

  logout: () => set({ currentUser: userElizabeth, token: null }),
}))
